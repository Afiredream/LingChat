import eventListener from "./core/event.js"
import request from "./core/request.js"

request.informationGet(1)
.then(information => {
  eventListener.emit('character:reload', information)
})

import { ChatSocket } from './core/connection.js'
const protocol = window.location.protocol === "https:" ? "wss" : "ws";
const host = window.location.hostname;
const port = window.location.port || (protocol === "wss" ? "443" : "80");
const wsUrl = `${protocol}://${host}:${port}/ws`;
const socket = new ChatSocket(wsUrl);
eventListener.on('chat:send', (text) => {
  
  socket.send({
    type: "message",
    content: text,
  })
})
const list = []
socket.onmessage((message) => {
  const chat = JSON.parse(message.data)
  if (chat.type == 'reply') {
    list.push(chat)
    if (chat.partIndex +1 == chat.totalParts) {
      startChat()
    }
  }
})
function startChat() {
  if (list[0]) {
    eventListener.emit('character:talking', list.shift())
  } else {
    eventListener.emit('character:waitting')
  }
}
eventListener.on('chat:next', () => {
  startChat()
})

// 加载样式
const url = import.meta.url.replace('init.js', 'style.css')
const html = `<link rel="stylesheet" href="${url}">`
document.querySelector('head').insertAdjacentHTML('beforeend', html)