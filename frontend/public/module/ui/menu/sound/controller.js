import EventBus from '../../../core/event.js'
import menu from '../menu.js'
import sound from './sound.js'

// 添加菜单页面
menu.registerPage('sound', '🔊声音', sound.element)

// 添加监听事件
sound.addBackmusicSoundVolumeFunction( value => {
  EventBus.emit('backmusic:volume', value)
})
sound.addCharacterSoundTestFunction( value => {
  EventBus.emit('character:volume', value)
})
sound.addBubbleSoundVolumeFunction( value => {
  EventBus.emit('bubble:volume', value)
})
sound.addCharacterSoundTestFunction(() => {
  EventBus.emit('character:play')
})
sound.addBubbleSoundTestFunction(() => {
  EventBus.emit('bubble:play')
})
// 添加页面样式
const url = import.meta.url.replace('controller.js', 'sound.css')
const html = `<link rel="stylesheet" href="${url}">`
document.querySelector('head').insertAdjacentHTML('beforeend', html)
