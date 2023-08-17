<script setup lang="ts">
import PaintList from '@/components/PaintList.vue'

import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from 'graphql-tag'

const props = defineProps<{
  id: string,
  target: string
}>()

interface Paint {
  id: string,
  range: string,
  name: string,
  type: string,
  metallic: boolean,
  hex: string
}

const { result, loading, error, onError } = useQuery<{ paints: Paint[] }>(gql`
  query($similarTo: SimilarColour) {
    paints(limit: 20, similarTo: $similarTo) {
      id
      range
      name
      type
      metallic
      hex
    }
  }
`, {
  similarTo: {
    maxDistance: 15,
    target: {
      hex: props.target
    }
  }
})

onError(console.error)

const paints = computed(() => {
  return result.value?.paints?.filter(paint => paint.id !== props.id) ?? []
})

</script>

<template>
  <section>
    <h2 class="text-lg font-semibold text-pink-600 mb-2">Similar Colours</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Failed to fetch similar colours.</div>
    <PaintList v-else :paints="paints" />
  </section>
</template>
