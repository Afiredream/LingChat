import eventListener from '../../../core/event.js'
import request from '../../../core/request.js'
import menu from '../menu.js'
import background from './background.js'

// 添加菜单页面
menu.registerPage('background', '🏜️背景', background.element)

// 添加监听事件
eventListener.on('background:url', (url) => {
  background.setBackgroundUrl(url)
})
eventListener.on('character:shiny', (value) => {
  background.shinyLevel = value
})
eventListener.on('character:reload', (value) => {
  background.setCharacterUrl(`/api/v1/chat/character/get_avatar/正常.png?${Date.now()}`)
})
 
// 加载可选背景图片列表
try {
  const list = await request.backgroundList()
  const url = `/api/v1/chat/background/background_file/${list[0].image_path}`
  for (const info of list) {
    const url = `/api/v1/chat/background/background_file/${info.image_path}`
    background.registerSelectOption(info.title, url, () => {
      eventListener.emit('background:url', url)
    })
  }
} catch (error) {
  console.error(error)
}
background.shinySetting((value) => {
  eventListener.emit('character:shiny', value)
})
eventListener.emit('background:default')

// 添加页面样式
const url = import.meta.url.replace('controller.js', 'background.css')
const html = `<link rel="stylesheet" href="${url}">`
document.querySelector('head').insertAdjacentHTML('beforeend', html)
