class Map {
  constructor() {
    this.information = {
      url: '',
      marks: [
        {
          id: '',
          X: '',
          Y: '',
        },
      ]
    }
    this.function = {
      destination: () => {},
    }
    this.container = document.createElement('div')
    this.id = 'map'
    this.container.innerHTML = `
      <img class="map">
      <div class="marks"></div>
      <button class="close">关闭</button>
    `
    this.container.querySelector('.close').addEventListener('click', (event) => {
      this.container.remove()
    })
  }
  get element() {
    return this.container
  }
  reload(information) {
    this.container.querySelector('.map').src = information.url
    for (const mark of information.marks) {
      this.addMark(mark.X, mark.Y)
    }

  }
  addMark(id, X, Y) {
    const mark = document.createElement('div')
    mark.className = 'mark'
    this.container.querySelector('.marks').append(mark)
    mark.addEventListener('click', (event) => {
      this.function.destination(id)
    })
  }
  goto(callback) {
    this.function.destination = callback
  }
}
const map = new Map()
export default map