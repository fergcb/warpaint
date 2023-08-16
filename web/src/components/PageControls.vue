<script setup lang="ts">
  defineProps<{
    page: number,
    pageCount: number,
    totalCount: number,
    first: number,
    last: number,
    hasPrev: boolean,
    hasNext: boolean,
  }>()

  const emit = defineEmits(['prev', 'next'])
</script>

<template>
  <div class="mb-3">
    <div class="flex gap-4 justify-center items-center">
      <button :disabled="!hasPrev" @click="emit('prev')" class="text-pink-600 hover:underline disabled:text-stone-300 disabled:no-underline text-xl">🡸</button>
      <span class="pb-1">{{ page + 1 }} / {{ pageCount }}</span>
      <button :disabled="!hasNext" @click="emit('next')" class="text-pink-600 hover:underline disabled:text-stone-300 disabled:no-underline text-xl">🡺</button>
    </div>
    <div class="text-stone-500 text-center text-sm">
      Showing items {{ first + 1 }} to {{ last }} of {{ totalCount }}
    </div>
  </div>
</template>
