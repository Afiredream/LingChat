import animation from "../animation.js"
import delta from './delta.js'

// 添加元素样式
const url = import.meta.url.replace('controller.js', 'delta.css')
const html = `<link rel="stylesheet" href="${url}">`
document.querySelector('head').insertAdjacentHTML('beforeend', html)


const information = {
  id: 'delta',
  element: delta.element,
  startFunction: (endFunction) => {
    delta.start(() => {endFunction()})
  },
  stopFunction: (endFunction) => {
    delta.stop(() => {endFunction()})
  },
}
animation.registerAnimation(information)