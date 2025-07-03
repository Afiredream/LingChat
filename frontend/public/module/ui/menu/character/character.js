class Character {
  constructor() {
    this.function = {
      characterSelect: () => {},
    }
    this.container = document.createElement('div')
    this.container.id = 'menu-character'
    this.container.innerHTML = `
      <div class="select big-section">
        <h4>🎭 角色列表</h4>
        <div class="line"></div>
        <div class="select-options"></div>
      </div>
      <div class="refresh small-section">
        <h4>🎶 刷新人物列表</h4>
        <div class="line"></div>
        <div class="refresh-section">
          <button class="refresh-button big-button">点我刷新~</button>
        </div>
      </div>
      <div class="workshop small-section">
        <h4>📙 创意工坊</h4>
        <div class="line"></div>
        <div class="workshop-section">
          <button href="" class="workshop-button big-button">进入“创意工坊”</button>
        </div>
      </div>
    `
  }
  get element() {
    return this.container
  }
  registerCharacter(character) {
    const e = document.createElement('div')
    e.innerHTML =  `
      <div class="select-card">
        <div class="select-avatar">
          <img class="select-img" src="${character.avatar}" alt="${character.title}" >
        </div>
        <div class="select-information">
          <div class="select-name">${character.title}</div>
          <div class="select-description">${character.info}</div>
          <button class="select-button" data-character-id="${character.character_id}">选择</button>
        </div>
      </div>
    `
    e.querySelector('.select-button').addEventListener('click', (event) => {
      this.function.characterSelect(character.character_id)
      const es = this.container.querySelectorAll('.select-button')
      for (const a of es) {
        a.textContent = '选择'
      }
      e.querySelector('.select-button').textContent = '✓ 已选择'
    })
    this.container.querySelector('.select-options').append(e)
  }
  addCharacterSelectFunction(callback) {
    this.function.characterSelect = callback
  }
  addRefreshButtonFunction(callback) {
    const button = this.container.querySelector('.refresh-button')
    button.addEventListener('click', (event) => {
      callback()
    })
  }
  addWorkshopButtonFunction(callback) {
    const button = this.container.querySelector('.workshop-button')
    button.addEventListener('click', (event) => {
      callback()
    })
  }
  clearCharacters() {
    this.container.querySelector('.select-options').innerHTML = ''
  }

}

const character = new Character()
export default character