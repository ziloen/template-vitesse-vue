<template>
  <n-config-provider :theme="darkTheme" abstract>
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>


<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { NMessageProvider, NConfigProvider, darkTheme } from 'naive-ui'


useHead({
  title: 'Vite Vue',
  meta: [
    // Webpage description
    { name: 'description', content: 'Vite Vue Starter Template' },
    // Dark color scheme
    { name: 'color-scheme', content: 'dark light' },
    // Disable Chromium auto translate
    { name: 'google', content: 'notranslate' },
  ]
})

</script>