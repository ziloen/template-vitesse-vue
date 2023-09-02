<script lang="tsx">
export default defineComponent((
  props,
  { slots, emit, expose }
) => {

  return () => (
    <div class="tsx-sfc">
      123
    </div>
  )
})
</script>


<style scoped>
.tsx-sfc {
  color: red;
}
</style>