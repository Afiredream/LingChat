class Intertool {
  constructor() {
    this.container = document.createElement('div')
    this.container.id = 'intertool'
    this.container.innerHTML = `
      <div class="context"></div>
    `
  }
  get element() {
    return this.container
  }
  registerElement(element) {
    this.container.querySelector('.context').append(element)
  }
}
const intertool = new Intertool()
export default intertool