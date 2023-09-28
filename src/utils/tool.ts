// 是否是 json 字符串
export function isJSONString(str: string) {
  try {
    JSON.parse(str)
    return true
  }
  catch (e) {
    return false
  }
}

// 简单校验是否是geoJson
export function isValidGeoJSON(obj: Record<string, any>) {
  if (obj && obj.type === 'FeatureCollection' && Array.isArray(obj.features)) {
    for (const feature of obj.features) {
      if (feature.type !== 'Feature' || !feature.geometry || !feature.properties)
        return false
    }
    return true
  }
  else {
    return false
  }
}

// 判断是否是多维数组
export function isMultiDimensionalArray(arr: any[]) {
  if (Array.isArray(arr))
    return !!(arr.length > 0 && Array.isArray(arr[0]))
  else
    return false
}
