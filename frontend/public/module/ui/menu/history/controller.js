import menu from '../menu.js'
import history from './history.js'

// 添加菜单页面
menu.registerPage('history', '📖对话历史', history.element)



// 添加页面样式
const url = import.meta.url.replace('controller.js', 'history.css')
const html = `<link rel="stylesheet" href="${url}">`
document.querySelector('head').insertAdjacentHTML('beforeend', html)
