class Delta {
  constructor() {
    this.container = document.createElement('div')
    this.container.id = 'animation-delta'
    this.container.innerHTML = `
      <img></img>
      <audio></audio>
    `
  }
  get element() {
    return this.container
  }
  start(endFunction) {
    this.playAudio()
    this.playAnimation()
    clearTimeout(this.startEndFunction)
    this.startEndFunction = setTimeout(() => {endFunction()}, 1200)
    
  }
  stop(endFunction) {}
  playAnimation() {
    let url = import.meta.url.replace('delta.js', 'delta.webp')
    this.container.querySelector('img').src = `${url}?${Date.now()}`
  }
  playAudio() {
    let url = import.meta.url.replace('delta.js', 'delta.wav')
    this.container.querySelector('audio').src = `${url}?${Date.now()}`
    this.container.querySelector('audio').play()
  }

}
const delta = new Delta()
export default delta