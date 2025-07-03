import eventListener from '../../core/event.js'
import menu from './menu.js'

// 添加页面模块
import './character/controller.js'
import './text/controller.js'
import './background/controller.js'
import './sound/controller.js'
import './save/controller.js'
import './history/controller.js'

// 添加监听事件
eventListener.on('menu:open', () => {
  eventListener.emit('animation:start', {id: 'delta',endFunction: () => {
    document.body.append(menu.element)
  }})
})
eventListener.on('menu:close', () => {
  eventListener.emit('animation:start', {id: 'delta',endFunction: () => {
    menu.close()
  }})
})
eventListener.on('connection:open', () => {
  menu.connectionStatus = 'open'
})
eventListener.on('connection:dead', () => {
  menu.connectionStatus = 'dead'
})
eventListener.on('connection:error', (error) => {
  menu.connectionStatus = 'error'
})

// 添加关闭事件
menu.addCloseEvent(() => {
  eventListener.emit('menu:close')
})


// 添加元素样式
function addCssTag(file) {
  const url = import.meta.url.replace('controller.js', file)
  const html = `<link rel="stylesheet" href="${url}">`
  document.querySelector('head').insertAdjacentHTML('beforeend', html)
}
addCssTag('menu.css')
addCssTag('widget.css')
