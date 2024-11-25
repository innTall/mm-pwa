<script setup>
//import { RouterLink } from 'vue-router';
import HeaderBar from './components/HeaderBar.vue';
/*
import { onMounted, ref } from 'vue';
import AuthPage from './views/AuthPage.vue'
import { supabase } from './supabase.js'

const session = ref()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session
  })
})
*/
</script>
<template>
  <div class="">
    <header class="sticky top-0 w-full p-1 z-20 items-center bg-gray-900">
      <HeaderBar />
    </header>
    <RouterView />
    <!-- div class="">
      <RouterView v-if="session" :session="session" />
      <AuthPage v-else />
    </div -->
  </div>
</template>
<style scoped></style>