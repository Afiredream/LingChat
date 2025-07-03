class Sound {
  constructor() {
    this.container = document.createElement('div')
    this.container.id = 'menu-sound'
    this.container.innerHTML = `
      <div class="character small-section">
        <h4>👩 角色音量</h4>
        <div class="line"></div>
        <div class="character-section">
          <div class="slider">
            <span>弱</span>
            <input
              class="character-slider"
              type="range" min="0" max="100" step="1" value="50"
            />
            <span>强</span>
          </div>
        </div>
      </div>
      <div class="bubble small-section">
        <h4>💬 气泡音量</h4>
        <div class="line"></div>
        <div class="bubble-section">
          <div class="slider">
            <span>弱</span>
            <input
              class="bubble-slider"
              type="range" min="0" max="100" step="1" value="50"
            />
            <span>强</span>
          </div>
        </div>
      </div>
      <div class="backmusic small-section">
        <h4>🎶 背景音量</h4>
        <div class="line"></div>
        <div class="backmusic-section">
          <div class="slider">
            <span>弱</span>
            <input
              class="backmusic-slider"
              type="range" min="0" max="100" step="1" value="50"
            />
            <span>强</span>
          </div>
        </div>
      </div>
      <div class="test small-section">
        <h4>🔊 音量测试设置</h4>
        <div class="line"></div>
        <div class="test-section">
          <div class="test-button">
            <button class="test-character big-button">测试角色音量</button>
          </div>
          <div class="test-button">
            <button class="test-bubble big-button">测试气泡音量</button>
          </div>
        </div>
      </div>
      <div class="music big-section">
        <h4>⚙ 背景音乐设置</h4>
        <div class="line"></div>
        <div class="music-section">
          <div class="music-controls">
            <button class="music-play"> ▶/⏸ 播放/暂停</button>
            <button class="music-stop"> ■ 停止</button>
            <span id="music-name">未选择音乐</span>
          </div>
          <div class="music-list"></div>
          <div class="music-add">
            <button class="music-get">➕ 添加音乐</button>
            <input
              type="file"
              class="music-upload"
              accept=".mp3, .wav, .flac, .webm, .weba, .ogg, .m4a"
            />
          </div>
        </div>
      </div>
    `
  }
  get element() {
    return this.container
  }

  // 添加角色对话音量修改时触发的函数
  addCharacterSoundVolumeFunction(callback) {
    const slider = this.container.querySelector('.character-slider')
    slider.addEventListener('input', (event) => {
      callback(slider.value)
    })
  }
  addBubbleSoundVolumeFunction(callback) {
    const slider = this.container.querySelector('.bubble-slider')
    slider.addEventListener('input', (event) => {
      callback(slider.value)
    })
  }
  // 添加背景音乐音量修改时触发的函数
  addBackmusicSoundVolumeFunction(callback) {
    const slider = this.container.querySelector('.character-slider')
    slider.addEventListener('input', (event) => {
      callback(slider.value)
    })
  }
  addCharacterSoundTestFunction(callback) {
    const button = this.container.querySelector('.test-character')
    button.addEventListener('click', (event) => {
      callback()
    })
  }
  addBubbleSoundTestFunction(callback) {
    const button = this.container.querySelector('.test-bubble')
    button.addEventListener('click', (event) => {
      callback()
    })
  }
  addBackmusicPlayFunction(callback) {

  }
  addBackmusicPauseFunction(callback) {

  }
  addBackmusicStopFunction(callback) {

  }
  addBackmusicDeleteFunction(callback) {

  }
  addBackmusicUploadFunction(callback) {

  }
//   <div id="Music-list" class="Music-List b">
//   <div class="Music-List da">
//     <div>只因你太美 - 蔡徐坤</div>
//     <div>
//       <button class="button Music-List db">删除</button>
//     </div>
//   </div>
// </div>
}
const sound = new Sound()
export default sound