<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <div class="bg-gray-100">
    <header class="flex justify-stretch align-center bg-blue-600 text-white shadow">
      <router-link :to="`/`" class="container mx-auto px-4 py-4">
        <h1 class="text-white text-xl font-bold hover:text-blue-200">2월 26일 게시판-댓글 테스트</h1>
      </router-link>

        <router-link :to="`/create`" class=" w-24 m-auto p-2 mr-2 rounded-lg border-blue-500  bg-white text-black hover:bg-blue-100">
          글쓰기
        </router-link>


    </header>

    <main class="container mx-auto p-4 mt-6">
      <router-view></router-view>
    </main>
  </div>
</template>