class World {
  constructor() {
    this.container = document.createElement('div')
    this.container.id = 'menu-world'
    this.container.innerHTML = `
      <div></div>
    `
  }
  get element() {
    return this.container
  }
}
const world = new World()
export default world