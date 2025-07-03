class Text {
  constructor() {
    this.default = {
      exampleText: '钦灵 Chat，测试文本显示速度',
      textSpeed: 10,
    }
    this.container = document.createElement('div')
    this.container.id = 'menu-text'
    this.container.innerHTML = `
      <div class="speed small-section">
        <h4>⚡ 文字显示速度</h4>
        <div class="line"></div>
        <div class="speed-section">
          <div class="slider">
            <span>慢</span>
            <input
              id="menu-text-speed-slider"
              type="range"
              min="1"
              max="100"
              value="150"
            />
            <span>快</span>
          </div>
        </div>
      </div>
      <div class="text small-section">
        <h4>📝 显示样本</h4>
        <div class="line"></div>
        <div class="text-section">
          <span class="text-message"></span>
        </div>
      </div>
    `
    
    const exampleText = (dialogue) => {
      const words = dialogue.split('')
      let word = ''
      let taper = setInterval(() => {
        if (words[0]) {
          word = word + words.shift()
          this.container.querySelector('.text-message').textContent = word
        } else {
          clearInterval(taper)
          exampleText(this.default.exampleText)
        }
      }, 1000/this.default.textSpeed)
    }
    exampleText(this.default.exampleText)
    
  }
  get element() {
    return this.container
  }
  set textSpeed(value) {
    this.default.textSpeed = value
  }
  addTextSpeedFunction(callback) {
    const slider = this.container.querySelector('#menu-text-speed-slider')
    slider.addEventListener('input', (event) => {
      callback(slider.value)
    })
  }
}
const text = new Text()
export default text