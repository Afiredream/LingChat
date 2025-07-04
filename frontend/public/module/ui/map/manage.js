// 调度模块
const EventBus = window.EventBus
import map from './map.js'

// 加载样式
const url = import.meta.url.replace('manage.js', 'map.css')
const html = `<link rel="stylesheet" href="${url}">`
document.head.insertAdjacentHTML('beforeend', html)

// 添加监听事件
EventBus.on('map:open', () => {
  document.body.append(map.element)
})
EventBus.on('map:reload', (information) => {
  // 暂时的对象没有接入后端
  information = {
    url: '',
    marks: [
      {
        id: '',
        X: '',
        Y: '',
      },
    ]
  }
  map.reload(information)
})

// 添加触发事件
map.goto((id) => {
  EventBus.emit('map:goto', id)
})