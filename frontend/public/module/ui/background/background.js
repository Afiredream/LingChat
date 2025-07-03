class Background {
  constructor() {
    this.container = document.createElement('div')
    this.container.id = 'background'
    this.container.innerHTML = `
      <img>
      <audio></audio>
    `
  }
  get element() {
    return this.container
  }
  setBackgroundDefault(callback) {
    callback(this.default.imgUrl)
  }
  setBackgroundUrl(url) {
    this.container.querySelector('img').src = url
  }
  setBackmusicUrl(url) {
    this.container.querySelector('audio').src = url
  }
  setBackmusicVolume(value) {
    this.container.querySelector('audio').volume = value
  }
  backmusicPlay() {
    this.container.querySelector('audio').play()
  }
  backmusicPause() {
    this.container.querySelector('audio').pause()
  }
  backmusicStop() {
    this.container.querySelector('audio').pause()
    this.container.querySelector('audio').currentTime = 0
  }
}
const background = new Background()
export default background