export function checkVisible(elm) {
  var rect = elm.getBoundingClientRect()
  var viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  )
  return !(rect.bottom < 200 || rect.top - viewHeight >= -200)
}

export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[ ]/g, '-')
    .replace(/["|'|,|_]/g, '')
}
