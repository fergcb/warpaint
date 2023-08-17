<script setup lang="ts">
import SimilarColours from '@/components/SimilarColours.vue';

import { useRoute } from 'vue-router';
import { useQuery } from "@vue/apollo-composable";
import gql from 'graphql-tag'
import { reactive, watch } from 'vue';

const route = useRoute()

const queryVars = reactive({
  id: route.params.id
});

const { result, loading, error } = useQuery(gql`
  query($id: String!) {
    paint(id: $id) {
      id
      name
      range
      type
      metallic
      hex
      rgb
      hsl
    }
  }
`, queryVars)

watch(() => route.params.id, async id => {
  queryVars.id = id
})
</script>

<template>
  <main class="p-4">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Failed to fetch data.</div>
    <div v-else>
      <h1 class="text-2xl font-semibold mb-2 text-stone-600">{{ result.paint.name }}</h1>
      <div class="flex flex-col sm:flex-row gap-4">
        <div>
          <div class="rounded-lg w-full sm:w-64 h-32 sm:h-64" :style="{ backgroundColor: result.paint.hex }"></div>
          <RouterLink
            :to="`/picker?r=${result.paint.rgb[0]}&g=${result.paint.rgb[1]}&b=${result.paint.rgb[2]}`"
            class="bg-pink-600 text-stone-100 rounded p-2 inline-block mt-2 text-sm w-full sm:w-64 text-center"
          >
            Open in Colour Matcher
          </RouterLink>
        </div>
        <ul>
          <li>
            <span class="font-semibold text-pink-600">Range:</span>
            {{ ' ' }}
            <span>{{ result.paint.range }}</span>
          </li>
          <li>
            <span class="font-semibold text-pink-600">Type:</span>
            {{ ' ' }}
            <span class="capitalize">{{ result.paint.type }}</span>
          </li>
          <li>
            <span class="font-semibold text-pink-600">Metallic:</span>
            {{ ' ' }}
            <span>{{ result.paint.metallic ? 'yes' : 'no' }}</span>
          </li>
          <li>
            <span class="font-semibold text-pink-600">Colours:</span>
            <ul class="pl-8">
              <li>
                <span class="font-semibold text-stone-600">Hex:</span>
                {{ ' ' }}
                <span>{{ result.paint.hex }}</span>
              </li>
              <li>
                <span class="font-semibold text-stone-600">RGB:</span>
                {{ ' ' }}
                <span>{{ result.paint.rgb.join(", ") }}</span>
              </li>
              <li>
                <span class="font-semibold text-stone-600">HSL:</span>
                {{ ' ' }}
                <span>{{ result.paint.hsl.join(", ") }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <SimilarColours :id="result.paint.id" :target="result.paint.hex" class="mt-6" />
    </div>
  </main>
</template>
