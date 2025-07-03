class Buttons {
  constructor() {
    this.container = document.createElement('div')
    this.container.id = 'intertool-buttons'
  }
  get element() {
    return this.container
  }
  registerButton(id, name, callback) {
    const button = document.createElement('button')
    button.className = id
    button.textContent = name
    button.addEventListener('click', callback)
    this.container.append(button)
  }
}
const buttons = new Buttons()
export default buttons