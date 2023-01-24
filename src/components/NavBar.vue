<template>
  <nav class="w-full px-4 text-white shadow-xl">
    <div class="mx-auto flex max-w-2xl items-center">
      <RouterLink to="/">
        <div class="flex items-center gap-3 py-2">
          <Icon
            icon="line-md:sun-rising-twotone-loop"
            class="h-6 w-6" />
          <p>The Local Weather</p>
        </div>
      </RouterLink>

      <div class="flex flex-1 justify-end gap-2">
        <Icon
          icon="heroicons-outline:information-circle"
          class="h-6 w-6 cursor-pointer duration-150 hover:text-gray-400"
          @click="toggleModal" />
        <Icon
          icon="mdi:map-marker-plus-outline"
          class="h-6 w-6 cursor-pointer duration-150 hover:text-gray-400" />
      </div>

      <!-- Information Modal -->
      <BaseModal
        :isShow="isShow"
        @closeModal="toggleModal">
        <section>
          <h1>About</h1>
          The Local Weather allows you to track the current and future weather
          of cities of your choosing.
        </section>
        <section>
          <h1>How it works:</h1>
          <ol class="list-decimal pl-6">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
            <li>
              Track the city by clicking on the "+" icon in the top right. This
              will save the city to view at a later time on the home page.
            </li>
          </ol>
        </section>
        <section>
          <h1>Removing a city</h1>
          If you no longer wish to track a city, simply select the city within
          the home page. At the bottom of the page, there will be am option to
          delete the city.
        </section>
      </BaseModal>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { Icon } from '@iconify/vue';
import BaseModal from '@components/BaseModal.vue';

let isShow = $ref(false);
const toggleModal = () => {
  isShow = !isShow;
};
</script>
