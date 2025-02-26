<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  comments: {
    type: Array,
    default: () => []
  }
});
</script>

<template>
  <div class="mt-6">
    <h3 class="text-lg font-semibold mb-3 text-gray-800">댓글 ({{ comments.length }})</h3>

    <div v-if="comments.length === 0" class="text-gray-500 py-4 text-center">
      댓글이 없습니다.
    </div>

    <div v-else class="space-y-3">
      <div
          v-for="comment in comments"
          :key="comment.idx"
          class="bg-gray-50 rounded shadow-md"
      >
        <div class="flex justify-start gap-2 items-center">
          <div class="p-2 text-sm text-gray-700">작성자: {{ comment.writer }}</div>
          <span class="p-2 bg-blue-500 text-sm text-white">#{{ comment.idx }}</span>
          <p class="p-2 text-sm text-gray-800">{{ comment.content }}</p>
        </div>

      </div>
    </div>
  </div>
</template>