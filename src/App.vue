<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const GeoCoordinateConversion = defineAsyncComponent(() => import('@/views/geoCoordinateConversion/index.vue'))
const PageHeader = defineAsyncComponent(() => import('@/components/Header.vue'))
const PageFooter = defineAsyncComponent(() => import('@/components/Footer.vue'))
</script>

<template>
  <el-scrollbar style="height: 100%">
    <PageHeader />
    <div class="layout">
      <GeoCoordinateConversion />
    </div>
    <PageFooter />
  </el-scrollbar>
</template>

<style scoped>
.layout{
    width: 80vw;
    height: 100vh;
    margin: 0 auto;
}
</style>
