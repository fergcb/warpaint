<script setup lang="ts">
import type { Paint } from '@/types';
import PaintListItem from '@/components/PaintListItem.vue';


defineProps<{
  paints: Paint[]
}>()
</script>

<template>
  <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
    <PaintListItem v-for="paint of paints" :key="paint.id" :paint="paint" />
  </ul>
</template>
