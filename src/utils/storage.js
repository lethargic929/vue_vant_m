// 本地数据的封装以及处理
export const setItem = (key,val) => {
  // 若数据不是object则返回原数据
  if(typeof key === 'object') {
    val = JSON.stringify(val)
  }else {
    window.localStorage.setItem(key,val)
  }
}
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  }
  catch (err) {
    return data
  }
}
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
