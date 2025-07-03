import EventBus from '../../core/event.js'
import background from './background.js'

// 添加模块元素
document.body.append(background.element)
const Backgroundurl = import.meta.url.replace('controller.js', 'LingChat.png')
// 添加监听事件
  // 背景图片
  EventBus.on('background:default', () => {
    EventBus.emit('background:url', Backgroundurl)
  })
  EventBus.on('background:url', (url) => {
    background.setBackgroundUrl(url)
  })
  // 背景音乐
  EventBus.on('backmusic:url', (url) => {
    background.setBackmusicUrl(url)
  })
  EventBus.on('backmusic:volume', (value) => {
    background.setBackmusicVolume(value/100)
  })
  EventBus.on('backmusic:play', () => {
    background.BackmusicPlay()
  })
  EventBus.on('backmusic:pause', () => {
    background.backmusicPause()
  })
  EventBus.on('backmusic:stop', () => {
    background.backmusicStop()
  })


// 添加元素样式
const url = import.meta.url.replace('controller.js', 'background.css')
const html = `<link rel="stylesheet" href="${url}">`
document.querySelector('head').insertAdjacentHTML('beforeend', html)


