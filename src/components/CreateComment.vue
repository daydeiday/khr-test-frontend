<script setup>
import { ref } from 'vue';
import { useCommentStore } from '../stores/useCommentStore';
import { useBoardStore } from '../stores/useBoardStore';

const commentStore = useCommentStore();
const boardStore = useBoardStore();

const content = ref('');
const writer = ref('');

const submitComment = async () => {
  if (!content.value || !writer.value) {
    alert('댓글 내용과 작성자를 입력해주세요!');
    return;
  }

  const boardIdx = boardStore.currentBoard?.idx;

  if (!boardIdx) {
    alert('게시글 정보를 불러올 수 없습니다.');
    return;
  }

  try {
    await commentStore.createComment(content.value, writer.value, boardIdx);
    alert('댓글이 성공적으로 등록되었습니다.');
    content.value = '';
    writer.value = '';
  } catch (err) {
    alert('댓글 등록에 실패했습니다.');
  }
};
</script>

<template>
  <div class="bg-white shadow-md rounded-lg p-4 mt-4">
    <h3 class="text-lg font-semibold mb-2">댓글 작성</h3>
    <input
        v-model="content"
        type="text"
        placeholder="댓글을 입력하세요"
        class="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
        v-model="writer"
        type="text"
        placeholder="작성자 이름"
        class="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
        @click="submitComment"
        class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
    >
      댓글 등록
    </button>
  </div>
</template>


