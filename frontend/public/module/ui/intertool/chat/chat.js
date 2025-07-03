class Chat {
  constructor() {
    this.activeFunction = () => {}
    this.sendMessageFunction = () => {}
    this.nextMessageFunction = () => {}
    this.value = {
      text: '',
    }
    this.information = {
      userName: '',
      userSubtitle: '',
      characterName: '',
      characterSubtitle: '',
      ThinkingMessage: '',
    }
    this.container = document.createElement('div')
    this.container.id = 'intertool-chat'
    this.container.innerHTML = `
      <div class="content">
        <div class="head">
          <div class="title"></div>
          <div class="subtitle"></div>
          <div class="emotion"></div>
        </div>
        <div class="line"></div>
        <div class="body">
          <textarea class="text "placeholder="请在这里输入消息..."></textarea>
          <button class="button" disabled>▼</button>
        </div>
      </div>
    `
    
    // 对话框输入时 有内容则允许按钮点击 无内容则禁止按钮点击
    this.container.querySelector('.text').addEventListener('input', () => {
      if (this.container.querySelector('.text').value) {
        this.container.querySelector('.button').disabled = false
      } else {
        this.container.querySelector('.button').disabled = true
      }
    })

    // 点击按钮 = 运行活动函数
    this.container.querySelector('.button').addEventListener('click', () => {
      this.activeFunction()
      
    })

    // 敲击回车 = 点击按钮
    this.container.querySelector('.text').addEventListener('keypress', (event) => {
      if (event.keyCode === 13) {
        event.preventDefault()
        this.container.querySelector('.button').click()
      }
    })

  }
  get element() {
    return this.container
  }
  get text() {
    return this.container.querySelector('.text').value
  }
  reload(information) {
    this.information = information
    this.changeToCharactertWaittingModule()
  }
  changeToCharactertWaittingModule() {

    this.container.querySelector('.title').textContent = this.information.userName
    this.container.querySelector('.subtitle').textContent = this.information.userSubtitle
    this.container.querySelector('.emotion').textContent = ''
    this.container.querySelector('.text').value = ''
    this.container.querySelector('.text').placeholder = "请在这里输入消息..."
    
    this.activeFunction = this.sendMessageFunction // 设置活动函数为发送消息
    this.container.querySelector('.text').disabled = false // 设置对话框允许编辑
    this.container.querySelector('.button').disabled = true // 设置按钮禁止触发
  }
  changeToCharactertThinkingModule() {

    this.container.querySelector('.title').textContent = this.information.characterName
    this.container.querySelector('.subtitle').textContent = this.information.characterSubtitle
    this.container.querySelector('.emotion').textContent = ''
    this.container.querySelector('.text').value = ''
    this.container.querySelector('.text').placeholder = this.information.ThinkingMessage

    this.activeFunction = () => {} // 设置活动函数为空的函数
    this.container.querySelector('.text').disabled = true // 设置对话框禁止编辑
    this.container.querySelector('.button').disabled = true // 设置按钮禁止触发

  }
  changeToCharactertTalkingModule(emotion, text) {

    this.container.querySelector('.title').textContent = this.information.characterName
    this.container.querySelector('.subtitle').textContent = this.information.characterSubtitle
    this.container.querySelector('.emotion').textContent = emotion
    this.container.querySelector('.text').value = ''
            this.container.querySelector('.text').placeholder = ''
    this.playCharacterDialogue(text)

    this.activeFunction = this.nextMessageFunction // 设置活动函数为下条信息
    this.container.querySelector('.text').disabled = true // 设置对话框禁止编辑
    this.container.querySelector('.button').disabled = true // 设置按钮允许触发
  }
  addSendMessageFunction(sendMessageFunction) {
    this.sendMessageFunction = sendMessageFunction
  }
  addNextMessageFunction(nextMessageFunction) {
    this.nextMessageFunction = nextMessageFunction
  }
  playCharacterDialogue(dialogue) {
    const words = dialogue.split('')
    let word = ''
    let taper = setInterval(() => {
      if (words[0]) {
        word = word + words.shift()
        this.container.querySelector('.text').value = word
      } else {
        clearInterval(taper)
        this.container.querySelector('.button').disabled = false
      }
    }, 100)

  }
}
const chat = new Chat()
export default chat