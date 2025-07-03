import eventListener from '../../core/event.js'
import animation from './animation.js'

// 添加元素样式
const url = import.meta.url.replace('controller.js', 'animation.css')
const html = `<link rel="stylesheet" href="${url}">`
document.querySelector('head').insertAdjacentHTML('beforeend', html)

document.body.append(animation.element)

import './ears/controller.js'
import './delta/controller.js'

// 添加监听事件
eventListener.on('animation:start', (info) => {
  animation.start(info)
}) // 动画启动
eventListener.on('animation:stop', (id) => {
  animation.stop(id)
}) // 动画停止





