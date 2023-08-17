<script setup lang="ts">
import type { Paint } from '@/types';

defineProps<{
  paint: Paint
}>()
</script>

<template>
  <li>
    <RouterLink :to="`/paint/${paint.id}`" class="group flex gap-2 items-center py-1 px-2 bg-stone-100 hover:bg-pink-50 rounded">
      <div class="w-12 h-12 rounded" :style="{ backgroundColor: paint.hex }"></div>
      <div>
        <div class="-mb-1">
          <span class="font-semibold group-hover:underline group-hover:text-pink-600">{{ paint.name }}</span>
        </div>
        <div class="text-sm">
          <span>{{ paint.range }}</span>
          {{ ' ' }}
          <span class="text-pink-600">{{ paint.type }}</span>
          {{ ' ' }}
          <span v-if="paint.metallic" class="text-stone-500">(metallic)</span>
        </div>
      </div>
    </RouterLink>
  </li>
</template>
