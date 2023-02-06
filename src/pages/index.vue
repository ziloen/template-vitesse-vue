<template>
  <div>
    <div class="i-carbon-campsite text-4xl inline-block" />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank">Vitesse Lite</a>
    </p>
    <p>
      <em class="text-sm op75">Opinionated Vite Starter Template</em>
    </p>

    <Motion tag="div" class="py-4" />

    <input
      id="input"
      v-model="userName"
      placeholder="What's your name?"
      type="text"
      autocomplete="false"
      @keydown.enter="go"
    />

    <div>
      <button class="m-3 text-sm btn" @click="go">Go</button>
    </div>

    <Counter :initial="0" />
  </div>
</template>

<script setup lang="ts">
const userName = ref('')

const router = useRouter()
function go() {
  if (userName.value)
    router.push(`/hi/${encodeURIComponent(userName.value)}`)
}
</script>

<style scoped lang="scss">
#input {
  @apply px-4 py-2 text-center w-250px bg-transparent border border-rounded border-gray-200 dark: border-gray-700 outline-none active:outline-none;
}
</style>


<!-- json / json5 / yaml -->
<route lang="json">
{
  "meta": {
    "requiresAuth": false
  }
}
</route>