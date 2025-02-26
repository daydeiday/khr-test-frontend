<script setup>
import { onMounted, onUnmounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useBoardStore } from '/src/stores/useBoardStore.js';
import CommentList from '/src/components/CommentList.vue';
import CreateComment from "./CreateComment.vue";

const route = useRoute();
const boardStore = useBoardStore();

const board = computed(() => boardStore.getCurrentBoard);
const loading = computed(() => boardStore.isLoading);
const error = computed(() => boardStore.error);

const fetchData = async () => {
  const boardId = parseInt(route.params.id);
  if (!isNaN(boardId)) {
    await boardStore.fetchBoardDetail(boardId);
  }
};

onMounted(fetchData);
// onMounted(() => {
//   console.log('Route params:', route.params); // 콘솔에 route 파라미터 출력
//   const boardId = route.params.id;
//   console.log('boardId = route.params.id:', boardId); // 콘솔에 boardId 출력
//   boardStore.fetchBoardDetail(boardId);
// });


// route 파라미터가 변경되면 데이터 다시 불러오기
watch(() => route.params.id, fetchData);

// 컴포넌트가 언마운트될 때 현재 게시글 정보 초기화
onUnmounted(() => {
  boardStore.clearCurrentBoard();
});
</script>


<template>
  <div class="container mx-auto px-4 py-6">
    <div v-if="loading" class="flex justify-center my-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <div v-else-if="board">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">{{ board.title }}</h1>
        <router-link to="/" class="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded">
          목록으로
        </router-link>
      </div>

      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="border-b border-gray-200 bg-gray-50 py-3 px-6">
          <div class="flex justify-between items-center">
            <span class="font-medium text-gray-700">작성자: {{ board.writer }}</span>
            <span class="text-sm text-gray-500">게시글 번호: {{ board.idx }}</span>
          </div>
        </div>

        <div class="p-6">
          <div class="prose max-w-none">
            <p class="text-gray-800 whitespace-pre-line">{{ board.content }}</p>
          </div>
        </div>
      </div>

      <!-- 댓글 컴포넌트 -->
      <CommentList :comments="board.commentList" />
      <CreateComment></CreateComment>
    </div>

    <div v-else class="text-center py-8 text-gray-500">
      게시글을 찾을 수 없습니다.
    </div>
  </div>
</template>