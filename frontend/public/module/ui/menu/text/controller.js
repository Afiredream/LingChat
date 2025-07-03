import eventListener from '../../../core/event.js'
import menu from '../menu.js'
import text from './text.js'

// 添加菜单页面
menu.registerPage('text', '📄文本', text.element)

text.addTextSpeedFunction((textSpeedValue) => {
  eventListener.emit('text:speed', textSpeedValue)
})

eventListener.on('text:speed', (textSpeed) => {
  text.textSpeed = textSpeed
})

// 添加页面样式
const url = import.meta.url.replace('controller.js', 'text.css')
const html = `<link rel="stylesheet" href="${url}">`
document.querySelector('head').insertAdjacentHTML('beforeend', html)
