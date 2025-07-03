import eventListener from '../../../core/event.js'
import request from '../../../core/request.js'
import menu from '../menu.js'
import character from './character.js'

// 添加菜单页面
menu.registerPage('character', '🐺角色', character.element)

async function reload() {
  try {
    const list = await request.characterGetAll()
    for (const info of list) {
      info.avatar = `/api/v1/chat/character/character_file/${encodeURIComponent(info.avatar_path)}`
      character.registerCharacter(info)
    }
  } catch (error) {
    console.log(error)
  }
}reload()

// 添加事件函数
character.addCharacterSelectFunction((id) => {
  request.characterSelect(1, id)
  .then(() => {
    request.informationGet(1)
    .then(information => {
      eventListener.emit('character:reload', information)
    })
  })
})

// 添加模块事件
character.addRefreshButtonFunction(() => {
  character.clearCharacters()
  reload()
})
character.addWorkshopButtonFunction(() => {
  window.open('https://github.com/SlimeBoyOwO/LingChat/discussions', '_blank')
})

// 添加页面样式
const url = import.meta.url.replace('controller.js', 'character.css')
const html = `<link rel="stylesheet" href="${url}">`
document.querySelector('head').insertAdjacentHTML('beforeend', html)
