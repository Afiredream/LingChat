class Ears {
  constructor() {
    this.default = {
      text: '你的小可爱正在准备中'
    }
    this.container = document.createElement('div')
    this.container.id = 'animation-ears'
    this.container.innerHTML = `
        <div class="ears">
          <div class="ear ear-left"></div>
          <div class="ear ear-right"></div>
        </div>
        <div class="text">${this.default.text}</div>
    `
  }
  get element() {
    return this.container

  }
  set text(text) {
    this.container.querySelector('.text').textContent = text
  }
  stop(endFunction) {
    this.container.addEventListener('transitionend', event => {
      endFunction()
    })
    this.container.style.opacity = '0'
  }
}
const ears = new Ears()
export default ears