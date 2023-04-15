<template>
  <n-config-provider
    :theme="darkTheme"
    abstract
  >
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </n-config-provider>
</template>


<script setup lang="ts">
import { NMessageProvider, NConfigProvider, darkTheme } from 'naive-ui'
</script>