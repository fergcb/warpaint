<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="flex p-4">
    <RouterLink to="/" class="font-bold text-xl sm:text-2xl text-pink-600">Warpaint</RouterLink>
    <nav class="flex gap-4 text-sm sm:text-base sm:gap-8 mr-2 sm:mr-8 ml-auto">
      <RouterLink to="/paints" class="grid content-center border-b-2 border-transparent hover:border-pink-500 px-2">Paints</RouterLink>
      <a href="https://github.com/fergcb/warpaint" target="_blank" class="grid content-center border-b-2 border-transparent hover:border-pink-500 px-2">GitHub</a>
      <a href="/api/v1" class="hidden sm:grid content-center border-b-2 border-transparent hover:border-pink-500 px-2">API</a>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>

</style>
