<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { coordinateSystemsObj, useGeoCoordinateConversion } from './useGeoCoordinateConversion.ts'

const CoordinateSystemsInfo = defineAsyncComponent(() => import('./components/CoordinateSystemsInfo.vue'))

const { oldCodeText, oldCodeType, newCodeText, newCodeType, transformCoordinateSystem } = useGeoCoordinateConversion()
</script>

<template>
  <el-input
    v-model="oldCodeText"
    :autosize="{ minRows: 20 }"
    type="textarea"
    placeholder="请输入待转换的坐标支持数组、geoJson 格式的数据"
  />

  <el-row :gutter="10" justify="center" class="my-4">
    <el-select v-model="oldCodeType" placeholder="请选择坐标系类型">
      <el-option
        v-for="item in Object.values(coordinateSystemsObj)"
        :key="item.type"
        :label="item.type"
        :value="item.type"
      />
    </el-select>

    <el-button class="mx-2" type="info">
      转换为
    </el-button>

    <el-select v-model="newCodeType" placeholder="请选择坐标系类型">
      <el-option
        v-for="item in Object.values(coordinateSystemsObj)"
        :key="item.type"
        :label="item.type"
        :value="item.type"
      />
    </el-select>

    <el-button class="ml-2" type="primary" @click="transformCoordinateSystem">
      开始转换
    </el-button>
  </el-row>

  <el-input
    v-model="newCodeText"
    :autosize="{ minRows: 20 }"
    type="textarea"
    placeholder="转换后数据"
  />
</template>

<style scoped>

</style>
