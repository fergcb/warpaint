<script setup lang="ts">
import PageControls from '../components/PageControls.vue'
import { useQuery } from "@vue/apollo-composable";
import gql from 'graphql-tag'
import { type Ref, reactive } from "vue";

interface Paint {
  range: string
  name: string
  type: string
  metallic: boolean
  hex: string
}

const queryVars = reactive({
  page: 0,
  types: ["air", "base", "contrast", "dry", "glaze", "layer", "shade", "spray", "technical", "texture"],
  metallic: undefined,
  sortBy: [
    { "field": "colour", "order": "asc" }
  ] 
})

const sortModes = {
  "Colour (Ascending)": [{ field: 'colour', order: 'asc' }],
  "Colour (Descending)": [{ field: 'colour', order: 'desc' }],
  "Name (Ascending)": [{ field: 'name', order: 'asc' }],
  "Name (Descending)": [{ field: 'name', order: 'desc' }],
  "Type (Ascending)": [{ field: 'type', order: 'asc' }],
  "Type (Descending)": [{ field: 'type', order: 'desc' }],
}

const { result, loading, error, onError } = useQuery(gql`
  query($sortBy: [Sort], $page: Int, $types: [String], $metallic: Boolean) {
    paints(sortBy: $sortBy, page: $page, types: $types, metallic: $metallic) {
      page
      pageCount
      totalCount
      hasNext
      hasPrev
      first
      last
      items {
        range
        name
        type
        metallic
        hex
      }
    }
  }
`, queryVars)

onError((e) => {
  console.log(e)
})

function nextPage() {
  queryVars.page += 1
}

function prevPage() {
  queryVars.page -= 1
}

const data: Ref<{
  paints: {
    page: number,
    pageCount: number,
    totalCount: number,
    hasNext: boolean,
    hasPrev: boolean,
    first: number,
    last: number,
    items: Paint[]
  }
}> = result

function clean(str: string): string {
  return str
    .replace("'", '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
}

function id(paint: Paint) {
  return `${clean(paint.range)}_${clean(paint.type)}_${clean(paint.name)}`
}
  
</script>

<template>
  <main class="p-4">
    <h1 class="text-2xl font-semibold mb-4">Paints</h1>
    <div class="grid grid-cols-10 grid-rows-[auto/auto] gap-2 mb-4">
        <div class="bg-stone-100 rounded p-3 row-span-1 col-span-10 lg:col-span-4 lg:row-span-2 xl:col-span-2">
          <h2 class="text-base font-semibold text-pink-600 mb-2">Paint Type</h2>
          <div class="grid grid-cols-4 lg:grid-cols-2 text-sm">
            <div>
              <input type="checkbox" id="chkTypeAir" value="air" v-model="queryVars.types">
              <label for="chkTypeAir" class="ms-1">Air</label>
            </div>
            <div>
              <input type="checkbox" id="chkTypeBase" value="base" v-model="queryVars.types">
              <label for="chkTypeBase" class="ms-1">Base</label>
            </div>
            <div>
              <input type="checkbox" id="chkTypeContrast" value="contrast" v-model="queryVars.types">
              <label for="chkTypeContrast" class="ms-1">Contrast</label>
            </div>
            <div>
              <input type="checkbox" id="chkTypeDry" value="dry" v-model="queryVars.types">
              <label for="chkTypeDry" class="ms-1">Dry</label>
            </div>
            <div>
              <input type="checkbox" id="chkTypeGlaze" value="glaze" v-model="queryVars.types">
              <label for="chkTypeGlaze" class="ms-1">Glaze</label>
            </div>
            <div>
              <input type="checkbox" id="chkTypeLayer" value="layer" v-model="queryVars.types">
              <label for="chkTypeLayer" class="ms-1">Layer</label>
            </div>
            <div>
              <input type="checkbox" id="chkTypeShade" value="shade" v-model="queryVars.types">
              <label for="chkTypeShade" class="ms-1">Shade</label>
            </div>
            <div>
              <input type="checkbox" id="chkTypeSpray" value="spray" v-model="queryVars.types">
              <label for="chkTypeSpray" class="ms-1">Spray</label>
            </div>
            <div>
              <input type="checkbox" id="chkTypeTechnical" value="technical" v-model="queryVars.types">
              <label for="chkTypeTechnical" class="ms-1">Technical</label>
            </div>
            <div>
              <input type="checkbox" id="chkTypeTexture" value="texture" v-model="queryVars.types">
              <label for="chkTypeTexture" class="ms-1">Texture</label>
            </div>
          </div>
        </div>
        <div class="bg-stone-100 rounded p-3 row-span-1 col-span-5 lg:col-span-3 text-sm">
          <h2 class="text-base font-semibold text-pink-600 mb-2">Metallics</h2>
          <div class="flex gap-4 md:gap-8">
            <div>
              <input type="radio" id="chkMetallicInclude" :value="undefined" v-model="queryVars.metallic">
              <label for="chkMetallicInclude" class="ms-1">Include</label>
            </div>
            <div>
              <input type="radio" id="chkMetallicExclude" :value="false" v-model="queryVars.metallic">
              <label for="chkMetallicExclude" class="ms-1">Exclude</label>
            </div>
            <div>
              <input type="radio" id="chkMetallicOnly" :value="true" v-model="queryVars.metallic">
              <label for="chkMetallicOnly" class="ms-1">Only</label>
            </div>
          </div>
        </div>
        <div class="hidden lg:block row-span-2 col-span-3 xl:col-span-4"></div>
        <div class="bg-stone-100 rounded p-3 row-span-1 col-span-5 lg:row-span-1 lg:col-span-3">
          <h2 class="text-base font-semibold text-pink-600 mb-2">Sort By</h2>
          <select class="text-sm py-1 px-3 w-full" v-model="queryVars.sortBy">
            <option v-for="(value, key) in sortModes" :key="key" :value="value">{{ key }}</option>
          </select>
        </div>
      </div>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error !== null" class="bg-red-100 border border-red-300 rounded-md py-2 px-4 text-red-600">Failed to load data.</div>
    <div v-else>      
      <PageControls
        :page="data.paints.page"
        :pageCount="data.paints.pageCount"
        :totalCount="data.paints.totalCount"
        :first="data.paints.first"
        :last="data.paints.last"
        :hasNext="data.paints.hasNext"
        :hasPrev="data.paints.hasPrev"
        @prev="prevPage"
        @next="nextPage"
      />
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        <li v-for="paint of data.paints.items" :key="id(paint)" class="flex gap-2 items-center py-1 px-2 bg-stone-100 rounded">
          <div class="w-12 h-12 rounded" :style="{ backgroundColor: paint.hex }"></div>
          <div>
            <div class="-mb-1">
              <span class="font-semibold">{{ paint.name }}</span>
            </div>
            <div class="text-sm">
              <span>{{ paint.range }}</span>
              {{ ' ' }}
              <span class="text-pink-600">{{ paint.type }}</span>
              {{ ' ' }}
              <span v-if="paint.metallic" class="text-stone-500">(metallic)</span>
            </div>
          </div>
        </li>
      </ul>
      <PageControls
        :page="data.paints.page"
        :pageCount="data.paints.pageCount"
        :totalCount="data.paints.totalCount"
        :first="data.paints.first"
        :last="data.paints.last"
        :hasNext="data.paints.hasNext"
        :hasPrev="data.paints.hasPrev"
        @prev="prevPage"
        @next="nextPage"
      />
    </div>
  </main>
</template>