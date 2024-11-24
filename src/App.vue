<script setup>
import HeaderBar from './components/HeaderBar.vue';
</script>
<template>
  <div class="">
    <header class="sticky top-0 w-full p-1 z-20 items-center bg-gray-900">
      <HeaderBar />
    </header>
    <RouterView />
  </div>
</template>
<style scoped></style>