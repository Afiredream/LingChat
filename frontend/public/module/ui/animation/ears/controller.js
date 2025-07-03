import animation from "../animation.js"
import ears from './ears.js'

// 添加元素样式
const url = import.meta.url.replace('controller.js', 'ears.css')
const html = `<link rel="stylesheet" href="${url}">`
document.querySelector('head').insertAdjacentHTML('beforeend', html)

const information = {
  id: 'ears',
  element: ears.element,
  startFunction: (endFunction) => {},
  stopFunction: (endFunction) => {
    ears.stop(endFunction)
  },
}
animation.registerAnimation(information)
ears.text = '灵灵正在梳妆打扮'

