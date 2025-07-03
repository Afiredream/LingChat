class Menu {
  constructor() {
    this.container = document.createElement('div')
    this.container.id = 'menu'
    this.container.innerHTML = `
      <div class="content">
        <div class="header">
          <div class="title">
            <div class="name">设置菜单</div>
            <div class="status">正在连接到服务器...</div>
          </div>
          <div class="tabs"></div>
        </div>
        <div class="body"></div>
        <div class="footer">
          <button class="close big-button">关闭</button>
        </div>
      </div>
    `
    const container = this.container
    function showPage(id) {

      const pageList = container.querySelector('.body').children
      for (const page of pageList) {
        page.style.display = 'none'
      }
      container.querySelector(`#page-${id}`).style.display = 'block'
      
    }

    this.addTab = (id, name) => {
      const tab = document.createElement('button')
      tab.id = `tab-${id}`
      tab.className = 'tab'
      tab.textContent = name
      tab.addEventListener('click', (event) => {
        showPage(id)
      })
      this.container.querySelector('.tabs').append(tab)
    }
    this.addPage = (id, element) => {
      const page = document.createElement('div')
      page.id = `page-${id}`
      page.style.display = 'none'
      page.className = 'page'
      page.append(element)
      this.container.querySelector('.body').append(page)
    }

  }
  get element() {
    return this.container
  }
  set connectionStatus(status) {
    const statusElemnet = this.container.querySelector('.status')
    if (status == 'open') {
      statusElemnet.textContent = '✅ 已连接服务器'
    } else if (status == 'dead') {
      statusElemnet.textContent = '❌ 无法连接服务器'
    } else if (status == 'error') {
      statusElemnet.textContent = '⚠️ 连接异常'
    }
  }

  registerPage(id, name, element) {
    this.addTab(id, name)
    this.addPage(id, element)
  }
  addCloseEvent(eventFunction) {
    this.container.querySelector('.close').addEventListener('click', event => {
      eventFunction()
    })
  }
  close() {
    this.container.remove()
  }

}

const menu = new Menu()
export default menu