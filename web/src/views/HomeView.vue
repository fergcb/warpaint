<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="grid justify-center px-4 md:mt-16">
    <section>
      <h1 class="text-5xl font-bold text-pink-600">Warpaint</h1>
      <p class="max-w-[64ch] text-xl italic">Warpaint is a collection of tools for working with data about popular miniature wargaming paints.</p>
    </section>
    <section>
      <h2 class="text-3xl font-semibold text-pink-400 mt-8 mb-2">Explore Paints</h2>
      <p class="mb-4">Search the paint database with a web interface.</p>
      <RouterLink to="paints" class="bg-pink-500 text-stone-50 px-3 py-1 rounded inline-block transition-colors hover:bg-pink-400">Explore now</RouterLink>
    </section>
    <section>
      <h2 class="text-3xl font-semibold text-pink-400 mt-8 mb-2">Colour Matcher</h2>
      <p class="mb-4">Find the closest paint for any colour.</p>
      <RouterLink to="picker" class="bg-pink-500 text-stone-50 px-3 py-1 rounded inline-block transition-colors hover:bg-pink-400">Try it</RouterLink>
    </section>
    <section>
      <h2 class="text-3xl font-semibold text-pink-400 mt-8 mb-2">GraphQL API</h2>
      <p class="max-w-[64ch] mb-2">Warpaint is powered by its <a href="/api/v1" class="text-pink-600 hover:underline">GraphQL API</a>. The API vends data about miniature paints, including their names, brands, Hex/RGB/HSL colour values, and their similarity to other paints.</p>
      <p class="max-w-[64ch]">For more info, check out the <a href="https://github.com/fergcb/warpaint" class="text-pink-600 hover:underline">Warpaint GitHub repository</a>.</p>
    </section>
  </main>
</template>
