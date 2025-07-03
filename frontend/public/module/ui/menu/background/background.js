class Background {
  constructor() {
    this.container = document.createElement('div')
    this.container.id = 'menu-background'
    this.container.innerHTML = `
      <div class="select big-section">
        <h4 class="title">🎨 背景选择</h4>
        <div class="line"></div>
        <div class="select-list"></div>
        <button class="select-upload">上传自定义背景</button>
        <button class="select-default">重置为默认背景</button>
      </div>
      <div class="shiny big-section">
        <h4 class="title">💫 角色圣光扩散设置</h4>
        <div class="line"></div>
        <div class="shiny-section">
          <div class="slider">
            <span>弱</span>
            <input
              class="shiny-slider"
              type="range"
              min="0"
              max="50"
              step="1"
              value="18"
            />
            <span>强</span>
          </div>
          <div class="shiny-text">
            <div class="shiny-text">圣光效果预览</p>
            <div class="shiny-preview">
              <img class="shiny-img">
              <img class="shiny-character">
            </div>
          <div>
        </div>
      </div>
    `
  }
  get element() {
    return this.container
  }
  registerSelectOption(name, url, callback) {
    const option = document.createElement('div')
    option.className = 'select-card'
    option.innerHTML = `
      <div class="select-image">
        <img class="select-image" src="${url}" alt="${name}">
      </div>
      <div class="select-title" data-title="${name}">
        <button class="select-button small-button">选择</button>
      </div>
    `
    option.querySelector('.select-button').addEventListener('click', (event) => {
      for (const opt of this.container.querySelectorAll('.select-button')) {
        opt.textContent = '选择'
      }
      option.querySelector('.select-button').textContent = '✓ 已选择'
      callback()
    })
    this.container.querySelector('.select-list').append(option)
  }

  setBackgroundUrl(url) {
    this.container.querySelector('.shiny-img').src = url
  }
  setCharacterUrl(url) {
    this.container.querySelector('.shiny-character').src = url
  }
  shinySetting(callback) {
    this.container.querySelector('.shiny-slider').addEventListener('input', () => {
      const value = this.container.querySelector('.shiny-slider').value
      callback(value)
    })
  }

  set shinyLevel(value) {
    this.container.querySelector('.shiny-character').style.filter = `drop-shadow(rgb(255, 255, 255) 0px 0px ${value}px)`
  }
  addBackgroundDefaultFunction(callback) {
    const button = this.container.querySelector('.select-default')
    button.addEventListener('click', (event) => {
      callback()
    })
  }
}

const background = new Background()
export default background