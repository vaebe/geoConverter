import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import gcoord from 'gcoord'
import type { CRSTypes } from 'gcoord'
import ClipboardJS from 'clipboard'
import testGeoJson from '../../../public/testGeoJson.json'
import { isJSONString, isMultiDimensionalArray, isValidGeoJSON } from '@/utils/tool.ts'

export const coordinateSystemsObj = {
  WGS84: {
    type: 'WGS84',
    format: '[lng,lat]',
    info: 'WGS-84坐标系，GPS设备获取的经纬度坐标',
  },
  GCJ02: {
    type: 'GCJ02',
    format: '[lng,lat]',
    info: 'GCJ-02坐标系，google中国地图、soso地图、aliyun地图、mapabc地图和高德地图所用的经纬度坐标',
  },
  BD09: {
    type: 'BD09',
    format: '[lng,lat]',
    info: 'BD-09坐标系，百度地图采用的经纬度坐标',
  },
  BD09LL: {
    type: 'BD09LL',
    format: '[lng,lat]',
    info: '同BD09',
  },
  BD09MC: {
    type: 'BD09MC',
    format: '[x,y]',
    info: 'BD-09米制坐标，百度地图采用的米制坐标，单位：米',
  },
  BD09Meter: {
    type: 'BD09Meter',
    format: '[x,y]',
    info: '同BD09MC',
  },
  Baidu: {
    type: 'Baidu',
    format: '[lng,lat]',
    info: '百度坐标系，BD-09坐标系别名，同BD-09',
  },
  BMap: {
    type: 'BMap',
    format: '[lng,lat]',
    info: '百度地图，BD-09坐标系别名，同BD-09',
  },
  AMap: {
    type: 'AMap',
    format: '[lng,lat]',
    info: '高德地图，同GCJ-02',
  },
  WebMercator: {
    type: 'WebMercator',
    format: '[x,y]',
    info: 'Web Mercator投影，墨卡托投影，同EPSG3857，单位：米',
  },
  WGS1984: {
    type: 'WGS1984',
    format: '[lng,lat]',
    info: 'WGS-84坐标系别名，同WGS-84',
  },
  EPSG4326: {
    type: 'EPSG4326',
    format: '[lng,lat]',
    info: 'WGS-84坐标系别名，同WGS-84',
  },
  EPSG3857: {
    type: 'EPSG3857',
    format: '[x,y]',
    info: 'Web Mercator投影，同WebMercator，单位：米',
  },
  EPSG900913: {
    type: 'EPSG900913',
    format: '[x,y]',
    info: 'Web Mercator投影，同WebMercator，单位：米',
  },
}

const defaultCodeText = JSON.stringify(testGeoJson)

export function useGeoCoordinateConversion() {
  const oldCodeText = ref(defaultCodeText)
  const newCodeText = ref('')

  const oldCodeType = ref<CRSTypes>(gcoord.WGS84)
  const newCodeType = ref<CRSTypes>(gcoord.GCJ02)

  // 多维数组坐标转换
  const transformCoordinateSystemMultiDimensionalArray = (arr: any[], oldCodeType: CRSTypes, newCodeType: CRSTypes) => {
    const verify = arr.every(item => Array.isArray(item) && item.length <= 3 && item.every((t: any) => typeof t === 'number'))

    if (!verify) {
      ElMessage.warning('二维数组的子元素需要为数组、子元素数据小于三个且为数字！')
      return
    }

    const data = arr.map(item => gcoord.transform(item, gcoord[oldCodeType], gcoord[newCodeType]))
    newCodeText.value = JSON.stringify(data)
  }

  // 转换坐标系
  const transformCoordinateSystem = () => {
    newCodeText.value = ''

    if (!oldCodeText.value) {
      ElMessage.warning('需要转换的坐标信息不存在！')
      return
    }

    if (!isJSONString(oldCodeText.value)) {
      ElMessage.warning('数据格式不正确，请输入 js 数组或 geoJson 格式数据！')
      return
    }

    const formatOldCode = JSON.parse(oldCodeText.value)

    // 多维数组
    if (isMultiDimensionalArray(formatOldCode)) {
      transformCoordinateSystemMultiDimensionalArray(formatOldCode, oldCodeType.value, newCodeType.value)
      return
    }

    if (!Array.isArray(formatOldCode) && !isValidGeoJSON(formatOldCode)) {
      ElMessage.warning('数据格式不正确，请输入 js 数组或 geoJson 格式数据！')
      return
    }

    const data = gcoord.transform(oldCodeText.value, gcoord[oldCodeType.value], gcoord[newCodeType.value])

    newCodeText.value = JSON.stringify(data)
  }

  const initClipboard = () => {
    const clipboard = new ClipboardJS('.clipboardBtn')

    clipboard.on('success', (e) => {
      ElMessage.success('复制成功！')
      e.clearSelection()
    })

    clipboard.on('error', (e) => {
      // 数据存在，复制失败进行提示！
      if (e.text)
        ElMessage.warning('复制失败！')
      else
        ElMessage.warning('需要复制的数据为空！')
    })
  }

  return {
    oldCodeText,
    oldCodeType,
    newCodeText,
    newCodeType,
    transformCoordinateSystem,
    initClipboard,
  }
}
