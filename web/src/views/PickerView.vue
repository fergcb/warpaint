<script setup lang="ts">
import { ColorPicker } from 'vue-accessible-color-picker/unstyled'
import { ref, computed, watch } from 'vue'
import ColourMatch from '@/components/ColourMatch.vue';
import { useRoute, useRouter } from 'vue-router';
import type { Paint } from '@/types';
import throttle from 'lodash.throttle';

const route = useRoute();
const router = useRouter();

const colourMatch = ref<Paint | undefined>(undefined)

const colour = ref({
  r: (parseInt(route.query.r as string, 10) / 255) || 0,
  g: (parseInt(route.query.g as string, 10) / 255) || 0,
  b: (parseInt(route.query.b as string, 10) / 255) || 0
})

const colourHSL = ref({
  h: 0, s: 0, l: 0,
});

const colourRGB = computed((): [number, number, number] => {
  const { r, g, b } = colour.value;
  return [
    Math.round(r * 255),
    Math.round(g * 255),
    Math.round(b * 255),
  ]
})

watch(colourRGB, throttle((rgb) => {
  const [r, g, b] = rgb;
  router.replace({ query: { r, g, b } })
}, 500))

const complement = computed(()  => {
  const { h, s, l } = colourHSL.value
  const c: [number, number, number] = [
    (Math.round(h * 360) + 180) % 360,
    Math.round(s * 100),
    Math.round(l * 100),
  ]
  return c
})

function updateColour(e: any) {
  colour.value = e.colors.rgb;
  colourHSL.value = e.colors.hsl;
}
</script>

<template>
  <main class="p-4">
    <h1 class="text-2xl font-semibold mb-4 text-stone-600">Colour Picker</h1>
    <ColorPicker
      id="picker"
      :color="colour"
      @color-change="updateColour"
      :visible-formats="['rgb', 'hsl', 'hex']"
      default-format="rgb"
      alpha-channel="hide"
    />
    <h2 class="text-lg font-semibold text-pink-600 mt-4">Closest Match:</h2>
    <ColourMatch :target="{ rgb: colourRGB }" @change-match="match => colourMatch = match" class="inline-block" />
    <div v-if="colourMatch !== undefined">
      <h2 class="text-lg font-semibold text-pink-600 mt-4">Complementary Colour:</h2>
      <ColourMatch :target="{ hsl: complement }" :compare="{ hex: colourMatch.hex }"/>
    </div>
  </main>
</template>

<style>
.vacp-color-picker {
  @apply bg-stone-100 rounded p-2 w-full md:max-w-[min(50%,32rem)];
}

.vacp-color-space {
  @apply block w-full h-48 md:h-64 rounded overflow-hidden;
}

.vacp-color-space-thumb {
  @apply border-2 w-6 h-6 rounded-full -translate-x-1/2 translate-y-1/2;
}

.vacp-range-input-label-text {
  @apply sr-only;
}

#picker-hue-slider {
  @apply rounded w-full mt-2;

  -webkit-appearance: none;
}

#picker-hue-slider::-webkit-slider-runnable-track {
  @apply rounded;

  background: linear-gradient(90deg,
    hsl(0, 100%, 50%),
    hsl(30, 100%, 50%),
    hsl(60, 100%, 50%),
    hsl(90, 100%, 50%),
    hsl(120, 100%, 50%),
    hsl(150, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(210, 100%, 50%),
    hsl(240, 100%, 50%),
    hsl(270, 100%, 50%),
    hsl(300, 100%, 50%),
    hsl(330, 100%, 50%),
    hsl(360, 100%, 50%)
  );
}

#picker-hue-slider::-webkit-slider-thumb {
  @apply w-5 h-5 bg-transparent rounded-full;
  -webkit-appearance: none;

  border: 2px solid black;
}

.vacp-visually-hidden {
  @apply sr-only;
}

.vacp-copy-button {
  @apply bg-pink-600 text-stone-100 p-2 rounded flex gap-2 items-center justify-center text-sm w-full mb-2;
}

.vacp-copy-button::after {
  content: 'Copy to clipboard'
}

.vacp-color-inputs {
  @apply flex w-full;
}

.vacp-color-input-group {
  @apply grid grid-cols-3 flex-grow;
}

.vacp-color-input-label {
  @apply text-center;
}

.vacp-color-input-label[for=picker-color-hex] {
  @apply col-span-3;
}

.vacp-color-input {
  @apply max-w-[6ch] sm:max-w-[7ch] px-2 py-0 rounded text-center;
}

.vacp-color-input#picker-color-hex {
  @apply max-w-full;
}

.vacp-color-input-label-text {
  @apply block;
}

.vacp-format-switch-button {
  @apply bg-pink-600 text-stone-100 p-2 rounded flex items-center justify-center text-sm w-8 sm:w-14;
}
</style>