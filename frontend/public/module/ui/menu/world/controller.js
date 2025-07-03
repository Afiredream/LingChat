import menu from '../menu.js'
import world from './world.js'

// 添加菜单页面
menu.registerPage('world', '🌆地图', world.element)

// 添加页面样式
const url = import.meta.url.replace('controller.js', 'world.css')
const html = `<link rel="stylesheet" href="${url}">`
document.querySelector('head').insertAdjacentHTML('beforeend', html)
