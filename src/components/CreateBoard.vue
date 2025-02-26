<script setup>
import { ref } from 'vue';
import { useBoardStore } from '../stores/useBoardStore';

const boardStore = useBoardStore();

const title = ref('');
const content = ref('');
const writer = ref('');

const submitBoard = async () => {
  if (!title.value || !content.value || !writer.value) {
    alert('제목, 내용, 작성자를 입력해주세요!');
    return;
  }

  try {
    await boardStore.createBoard(title.value, content.value, writer.value);
    alert('게시글이 성공적으로 등록되었습니다.');
    title.value = '';
    content.value = '';
    writer.value = '';
  } catch (err) {
    alert('게시글 등록에 실패했습니다.');
  }
};
</script>


<template>
  <div class="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
    <h2 class="text-xl font-bold mb-4">새 게시글 작성</h2>
    <input
        v-model="title"
        type="text"
        placeholder="제목을 입력하세요"
        class="w-full border border-gray-300 rounded-md p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
    />
    <textarea
        v-model="content"
        placeholder="내용을 입력하세요"
        class="w-full border border-gray-300 rounded-md p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        rows="4"
    ></textarea>
    <input
        v-model="writer"
        type="text"
        placeholder="작성자 이름"
        class="w-full border border-gray-300 rounded-md p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"
    />
    <button
        @click="submitBoard"
        class="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-200"
    >
      게시글 등록
    </button>
  </div>
</template>

