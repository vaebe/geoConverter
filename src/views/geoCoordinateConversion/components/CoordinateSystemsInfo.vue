<script setup lang="ts">
import type { PropType } from 'vue'

interface PropInfoType {
  type: string
  format: string
  info: string
}

defineProps({
  info: {
    type: Object as PropType<PropInfoType>,
    default: () => {
      return {
        type: '',
        format: '',
        info: '',
      }
    },
  },
})
</script>

<template>
  <div>
    <p>{{ info.type }}</p>
    <p>{{ info.format }}</p>
    <p>{{ info.info }}</p>
  </div>
</template>

<style scoped>

</style>
