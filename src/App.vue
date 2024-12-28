<script setup>
import HeaderBar from './components/HeaderBar.vue';
import FooterBar from './components/FooterBar.vue';
import ModalRemove from './components/layouts/ModalRemove.vue';
</script>

<template>
  <div class="flex flex-col h-screen">
    <header class="w-full h-12 top-0 left-0 fixed p-2 z-20 bg-gray-900">
      <HeaderBar />
    </header>
    <main class="flex-1 mt-16 mb-12 overflow-hidden px-2">
      <RouterView />
      <ModalRemove />
    </main>
    <footer class="w-full h-12 bottom-0 left-0 fixed p-2 z-10 bg-gray-900">
      <FooterBar />
    </footer>
  </div>
</template>
<style scoped></style>