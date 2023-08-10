<template>
  <div class="flex col items-center">
    <Motion class="py-4" />

    <Counter :initial="0" />

    <div>{{ t("hello", { name: "World" }) }}</div>

    <div>{{ t("contactUsLink", { link: (text: string) => h("a", { class: "link-btn" }, text) }) }}</div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { h } from 'vue'

const { t } = useI18n()
</script>

<style scoped lang="scss"></style>

<!-- json / json5 / yaml -->
<route lang="json">
{
  "meta": {
    "requiresAuth": false
  }
}
</route>