import { EMOTION_CONFIG } from './config.js'
class Character  {
  constructor() {
    this.information = {
      characterId: '',
      characterName: '',
      buttleLeft: '',
      buttleTop: '',
      offset: '',
      scale: '',
    }
    this.container = document.createElement('div')
    this.container.id = 'character'
    this.container.innerHTML = `
      <div class="content">
        <div class="character">
          <img class="character-image">
          <audio class="character-audio"></audio>
        </div>
        <div class="bubble">
          <img class="bubble-image">
          <audio class="bubble-audio"></audio>
        </div>
      </div>
    `
  }
  get element() {
    return this.container
  }
  set characterUrl(url) {
    this.container.querySelector('.character-image').src = url
  }
  set noticeUrl(url) {
    this.container.querySelector('.notice').src = url
  }
  set CharacterShinyValue(value) {
    this.container.querySelector('.character-image').style.filter = `drop-shadow(rgb(255, 255, 255) 0px 0px ${value}px)`
  }
  reload(information) {
    this.information = information
    const bubble = this.container.querySelector('.bubble')
    bubble.style.left = `${this.information.buttleLeft}px`
    bubble.style.top = `${this.information.buttleTop}px`
    this.changeToCharactertWaittingModule()
  }
  changeToCharactertWaittingModule() {
    this.changeToCharacterModule('正常')
  }
  changeToCharactertThinkingModule() {
    this.changeToCharacterModule('AI思考')

  }
  changeToCharactertTalkingModule(emotion) {
    this.changeToCharacterModule(emotion)
  }
  changeToCharacterModule(emotion) {
    this.container.querySelector('.character-image').src = `${EMOTION_CONFIG[emotion].avatar}?${Date.now()}`

    const bubbleImage = EMOTION_CONFIG[emotion].bubbleImage
    if (bubbleImage != 'none') {
      this.container.querySelector('.bubble-image').src = `${bubbleImage}?${Date.now()}`
    }
    const audio = EMOTION_CONFIG[emotion].audio
    if (bubbleImage != 'none') {
      this.container.querySelector('.bubble-audio').src = `${audio}?${Date.now()}`
      this.container.querySelector('.bubble-audio').play()
    }


  }
  setCharacterVolume(value) {
    this.container.querySelector('.character-audio').volume = value
  }
  setBubbleVolume(value) {
    this.container.querySelector('.bubble-audio').volume = value
  }
  characterAudioPlay() {
    const audio = this.container.querySelector('.character-audio')
    audio.currentTime = 0
    audio.play()
  }
  bubbleAudioPlay() {
    const audio = this.container.querySelector('.bubble-audio')
    audio.currentTime = 0
    audio.play()
  }
}
const character = new Character()
export default character