<script setup lang="ts">
import type { Paint } from '@/types';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { reactive, watch, ref, computed } from 'vue';
import throttle from 'lodash.throttle';

type Match = Paint & {
  hsl: [number, number, number]
  rgb: [number, number, number]
}

const match = ref<Match | undefined>(undefined)

const props = defineProps<{
  target: { rgb: [number, number, number] } | { hsl: [number, number, number] } | { hex: string }
  compare?: { rgb: [number, number, number] } | { hsl: [number, number, number] } | { hex: string }
}>()

const emit = defineEmits(['change-match'])

const queryVars = reactive({
  types: ['base', 'layer'],
  similarTo: {
    maxDistance: 100,
    target: props.target,
  },
})

const { error, onError, onResult } = useQuery<{ paints: Match[] }>(gql`
  query($similarTo: SimilarColour, $types: [String]) {
    paints(similarTo: $similarTo, types: $types, metallic: false) {
      id
      name
      range
      type
      metallic
      hex
      rgb
      hsl
      distance
    }
  }
`, queryVars)

onError(console.error)
onResult((res) => {
  if (res.data !== undefined) {
    match.value = res.data.paints[0]
    emit("change-match", match.value)
  }
})

watch(() => props.target, throttle(target => {
  queryVars.similarTo.target = target
}, 300))

const targetCSS = computed(() => {
  const compare = props.compare ?? props.target
  if ('rgb' in compare) return `rgb(${compare.rgb.join()})`
  if ('hsl' in compare) {
    const [h, s, l] = compare.hsl
    return `hsl(${h}deg, ${s}%, ${l}%)`
  }
  if ('hex' in compare) return compare.hex
  return 'black'
})
</script>

<template>
  <div class="inline-block">
    <div v-if="error">Failed to find a colour match.</div>
    <div v-else-if="match !== undefined" class="bg-stone-100 rounded p-2 pr-8">
      <div class="flex gap-2">
        <div class="w-12 h-12 rounded flex overflow-hidden">
          <div class="h-12 w-1/2" :style="{ backgroundColor: targetCSS}"></div>
          <div class="h-12 w-1/2" :style="{ backgroundColor: match.hex }"></div>
        </div>
        <div>
          <RouterLink :to="`/paint/${match.id}`" class="-mb-1 font-semibold hover:underline hover:text-pink-600">{{ match.name }}</RouterLink>
          <div class="text-sm">
            <span>{{ match.range }}</span>
            {{ ' ' }}
            <span class="text-pink-600">{{ match.type }}</span>
            {{ ' ' }}
            <span v-if="match.metallic" class="text-stone-500">(metallic)</span>
          </div>
        </div>
      </div>
      <div>
        <ul class="text-sm">
          <li>
            <span class="text-stone-600 font-semibold">Hex:</span>
            {{ ' ' }}
            <span>{{  match.hex }}</span>
          </li>
          <li>
            <span class="text-stone-600 font-semibold">RGB:</span>
            {{ ' ' }}
            <span>{{  match.rgb.join(', ') }}</span>
          </li>
          <li>
            <span class="text-stone-600 font-semibold">HSL:</span>
            {{ ' ' }}
            <span>{{  match.hsl.join(', ') }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>Hello</div>
  </div>
</template>