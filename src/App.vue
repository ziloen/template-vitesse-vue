<template>
  <n-message-provider>
    <main class="font-sans px-4 py-10 text-center text-gray-700 dark:text-gray-200">
      <router-view />
      <!-- <Footer /> -->
    </main>
  </n-message-provider>
</template>


<script setup lang="ts">
import { NMessageProvider } from 'naive-ui'
</script>