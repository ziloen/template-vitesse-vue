<template>
  <button icon-btn @click="toggleDark()">
    <div dark:i-carbon-moon i-carbon-sun />
  </button>
</template>

<script lang="ts" setup>
import { toggleDark } from '~/composables'
</script>