<script setup>
import { Icon } from '@iconify/vue';
import getCity from '@utils/getCity';
import { useRouter } from 'vue-router';

const router = useRouter();
let timeOut = $ref(null);
let searchQuery = $ref(null);
let queryResults = $ref(null);
let isSearchErr = $ref(false);

const handleCityPreview = result => {
  const { place_name, geometry } = result;
  const lat = geometry.coordinates[1];
  const lon = geometry.coordinates[0];
  const [city, state] = place_name.split(',');
  router.push({
    name: 'cityView',
    params: {
      city: city.replaceAll(' ', ''),
      state: state.replaceAll(' ', ''),
    },
    query: {
      lat: lat,
      lon: lon,
      preview: true,
    },
  });
};

const handleInputSearch = () => {
  clearTimeout(timeOut);
  timeOut = setTimeout(async () => {
    if (searchQuery !== null) {
      try {
        queryResults = await getCity(searchQuery);
      } catch {
        isSearchErr = true;
      }
      return;
    }
    queryResults = null;
  }, 300);
};
</script>

<template>
  <div class="px-4 py-3">
    <div class="mx-auto max-w-2xl text-white">
      <input
        v-model="searchQuery"
        type="text"
        class="w-full border-b border-gray-400/60 bg-transparent placeholder-white outline-none"
        placeholder="Search the city..."
        @input="handleInputSearch" />
      <ul
        v-if="queryResults"
        class="mt-2 rounded-lg bg-white/20 px-2 py-1">
        <p
          v-if="isSearchErr"
          class="py-2 px-2">
          Sorry, something went wrong, please try again.
        </p>
        <p
          v-if="!isSearchErr && queryResults.length === 0"
          class="py-2 px-2">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="result in queryResults"
            :key="result.id"
            class="group flex cursor-pointer items-center"
            @click="handleCityPreview(result)">
            <Icon icon="ic:round-arrow-right" />
            <p class="group-hover:text-red-300">{{ result.place_name }}</p>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
