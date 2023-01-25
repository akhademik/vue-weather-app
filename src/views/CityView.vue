<template>
  <Suspense>
    <AsyncCityView />
    <template #fallback>
      <Spinner />
    </template>
  </Suspense>
</template>

<script setup>
import Spinner from '@atoms/Spinner.vue';
import AsyncCityView from '@components/AsyncCityView.vue';
</script>
