import eventListener from '../../core/event.js'
import intertool from './intertool.js'
document.querySelector('body').append(intertool.element)


import './buttons/controller.js'
import './chat/controller.js'

const chat = document.createElement('div')
chat.id = 'intertool-chat'
intertool.registerElement(chat)

const url = import.meta.url.replace('controller.js', 'intertool.css')
const html = `<link rel="stylesheet" href="${url}">`
document.querySelector('head').insertAdjacentHTML('beforeend', html)
