<template>
  <nav text-xl mt-6 inline-flex gap-2>
    <ThemeToggle />

    <a
      icon-btn
      i-carbon-logo-github
      rel="noreferrer"
      href="https://github.com/antfu/vitesse-lite"
      target="_blank"
      title="GitHub"
    />
  </nav>
</template>

<script lang="ts" setup>
import ThemeToggle from './ThemeToggle.vue'
</script>