import menu from '../menu.js'
import save from './save.js'

// 添加菜单页面
menu.registerPage('save', '🎬存档', save.element)

// 添加页面样式
const url = import.meta.url.replace('controller.js', 'save.css')
const html = `<link rel="stylesheet" href="${url}">`
document.querySelector('head').insertAdjacentHTML('beforeend', html)
