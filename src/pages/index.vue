<template>
  <div class="flex col items-center">
    <Motion class="py-4" />

    <SvgIcon name="favicon" class="text-50px text-blue" />

    <Counter :initial="0" />

    <div>
      <testMsg />
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { useI18n } from '~/composables'

const { t } = useI18n()

const testMsg = t('useTTest', {
  link: h('a', { class: 'text-blue' }),
  // name: 'useTTest'
  name: h('span', { class: 'text-green' }, 'Dynamic Name')
})
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