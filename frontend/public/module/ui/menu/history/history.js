class History {
  constructor() {
    this.container = document.createElement('div')
    this.container.id = 'menu-history'
    this.container.innerHTML = `
      <div class="memory big-section">
        <h4>🎵 以下是你们的回忆~</h4>
        <div class="line"></div>
        <div class="memory-list">暂无对话记录</div>
      </div>
    `
  //   const history = `
  //   <div class="history-item">
  //     <p><strong>${this.user_name}:</strong> ${conv.userMessage}</p>
  //     ${conv.aiResponses
  //       .map((res) => `<p><strong>${this.ai_name}:</strong> ${res}</p>`)
  //       .join("")}
  //   </div>
  // `
  }
  get element() {
    return this.container
  }


}

const history = new History()
export default history