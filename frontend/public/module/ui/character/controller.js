import EventBus from '../../core/event.js'
import request from '../../core/request.js'
import character from './character.js'

// 添加元素样式
const url = import.meta.url.replace('controller.js', 'character.css')
const html = `<link rel="stylesheet" href="${url}">`
document.querySelector('head').insertAdjacentHTML('beforeend', html)

// 添加模块元素
document.body.append(character.element)

// 添加事件监听
EventBus.on('character:reload', (information) => {
  character.reload({
    characterId: information.character_id,
    characterName: information.ai_name,
    buttleLeft: information.bubble_left,
    buttleTop: information.bubble_top,
    offset: information.offset,
    scale: information.scale,
  })
})
EventBus.on('character:waitting', () => {
  character.changeToCharactertWaittingModule()
})
EventBus.on('character:thinking', () => {
  character.changeToCharactertThinkingModule()
})
EventBus.on('character:talking', (information) => {
  character.changeToCharactertTalkingModule(information.emotion)
})
EventBus.on('character:shiny', (value) => {
  character.CharacterShinyValue = value
})
EventBus.on('character:volume', (value) => {
  character.setCharacterVolume(value/100)
})
EventBus.on('character:play', () => {
  character.characterAudioPlay()
})
EventBus.on('bubble:volume', (value) => {
  character.setBubbleVolume(value/100)
})
EventBus.on('bubble:play', () => {
  character.bubbleAudioPlay()
})

