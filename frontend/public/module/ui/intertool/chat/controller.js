import eventListener from '../../../core/event.js'
import intertool from '../intertool.js'
import chat from './chat.js'

// 添加模块元素
intertool.registerElement(chat.element)

// 添加监听事件
eventListener.on('character:reload', (information) => {
  chat.reload({
    userName: information.user_name,
    userSubtitle: information.user_subtitle,
    characterName: information.ai_name,
    characterSubtitle: information.ai_subtitle,
    ThinkingMessage: information.thinking_message,
  })
})
eventListener.on('character:waitting', () => {
  chat.changeToCharactertWaittingModule()
})
eventListener.on('character:thinking', () => {
  chat.changeToCharactertThinkingModule()
})
eventListener.on('character:talking', (message) => {
  console.log(message)
  chat.changeToCharactertTalkingModule(message.motionText, message.message)
})

// 触发监听事件
chat.addSendMessageFunction(() => {
  eventListener.emit('character:thinking')
  eventListener.emit('chat:send', chat.text)
})
chat.addNextMessageFunction(() => {
  eventListener.emit('chat:next')
})

// 添加元素样式
const url = import.meta.url.replace('controller.js', 'chat.css')
const html = `<link rel="stylesheet" href="${url}">`
document.querySelector('head').insertAdjacentHTML('beforeend', html)