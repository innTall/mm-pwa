<script setup>
import HeaderBar from './components/HeaderBar.vue';
import FooterBar from './components/FooterBar.vue';
</script>

<template>
  <div class="flex flex-col h-screen">
    <header class="w-full top-0 p-2 z-20 bg-gray-900">
      <HeaderBar />
    </header>
    <main class="flex-1 overflow-auto px-2">
      <RouterView />
    </main> 
    <footer class="w-full h-12 p-2 left-0 z-10 bg-gray-900">
      <FooterBar />
    </footer>
  </div>
</template>
<style scoped></style>