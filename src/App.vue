<template>
  <div class="min-h-screen bg-sky-600">
    <NavBar />
    <RouterView />
  </div>
</template>

<script setup>
import NavBar from '@components/NavBar.vue';
import { RouterView } from 'vue-router';
</script>
