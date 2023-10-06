<script setup lang="ts">
import { coordinateSystemsObj } from '../useGeoCoordinateConversion.ts'

const tableData = Object.values(coordinateSystemsObj)
</script>

<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="type" label="坐标系" width="180" />
    <el-table-column prop="format" label="数据个数" width="180" />
    <el-table-column prop="info" label="描述" />
  </el-table>
</template>

<style scoped>

</style>
