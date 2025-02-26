<script setup>
import {onMounted, computed} from 'vue';
import { useRouter } from 'vue-router';
import { useBoardStore } from '/src/stores/useBoardStore.js';

const router = useRouter();
const boardStore = useBoardStore();


const boardList = computed(() => boardStore.getBoardList);
const loading = computed(() => boardStore.isLoading);
const error = computed(() => boardStore.error);


onMounted(async () => {
  await boardStore.fetchBoardList();
});
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">게시판 목록</h1>

    <div v-if="loading" class="flex justify-center my-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <div v-else>
      <div class="bg-gray-100 px-4 py-2 rounded-t-lg grid grid-cols-12 font-semibold text-gray-700">
        <div class="col-span-1">번호</div>
        <div class="col-span-5">제목</div>
        <div class="col-span-3">작성자</div>
        <div class="col-span-2">댓글 수</div>
        <div class="col-span-1">보기</div>
      </div>

      <div v-for="board in boardList" :key="board.idx" class="border-b border-gray-200 px-4 py-3 grid grid-cols-12 hover:bg-gray-50">
        <div class="col-span-1 font-medium text-gray-800">{{ board.idx }}</div>
        <div class="col-span-5 font-medium text-gray-800">{{ board.title }}</div>
        <div class="col-span-3 text-gray-600">{{ board.writer }}</div>
        <div class="col-span-2 text-center">
          <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{{ board.commentCount }}</span>
        </div>
        <div class="col-span-1">
          <router-link :to="`/board/${board.idx}`" class="text-blue-500 hover:text-blue-700">
            보기
          </router-link>
        </div>
      </div>

      <div v-if="boardList.length === 0" class="py-8 text-center text-gray-500">
        게시글이 없습니다.
      </div>
    </div>
  </div>
</template>