<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="flex p-4">
    <RouterLink to="/" class="font-bold text-2xl text-pink-600 hidden lg:inline-block">Warpaint</RouterLink>
    <nav class="flex gap-8 mr-8 ml-auto">
      <RouterLink to="/" class="border-b-2 border-transparent hover:border-pink-500 px-2">GitHub</RouterLink>
      <a href="/api/v1" class="border-b-2 border-transparent hover:border-pink-500 px-2">API</a>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>

</style>
