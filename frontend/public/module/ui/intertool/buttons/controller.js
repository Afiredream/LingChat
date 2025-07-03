import eventListener from '../../../core/event.js'
import intertool from '../intertool.js'
import buttons from './buttons.js'

// 添加模块元素
intertool.registerElement(buttons.element)

// 添加主页菜单按钮
buttons.registerButton('menu', '菜单', () => {
  eventListener.emit('menu:open')
})

// 添加元素样式
const url = import.meta.url.replace('controller.js', 'buttons.css')
const html = `<link rel="stylesheet" href="${url}">`
document.querySelector('head').insertAdjacentHTML('beforeend', html)