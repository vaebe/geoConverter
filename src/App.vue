<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const PageFooter = defineAsyncComponent(() => import('@/components/Footer.vue'))
</script>

<template>
  <PageFooter />
</template>

<style scoped>
</style>
