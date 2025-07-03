class Animation {
  constructor() {
    this.animation = {}
    this.active = {}
    this.container = document.createElement('div')
    this.container.id = 'animation'
  }
  get element() {
    return this.container
  }
  start(info) {
    this.active = this.animation[info.id]
    this.container.append(this.active.element)
    this.active.startFunction(() => {
      info.endFunction()
    })
  }
  stop() {
    this.active.stopFunction(() => {
      this.active.element.remove()
    })
  }
  registerAnimation(information) {
    this.animation[information.id] = information
  }
  close() {
    this.container.remove()
  }
}
const animation = new Animation()
export default animation
