class Save {
  constructor() {
    this.container = document.createElement('div')
    this.container.id = 'menu-save'
    this.container.innerHTML = `
      <div class="body">
            <div class="menu-section">
              <div class="menu-item-big">
                <div class="save-list-container">
                  <h4>⚙️ 存档管理</h4>
                  <div class="line"></div>
                  <!-- 对话列表插入点 -->
                  <div id="conversation-list"></div>
                </div>
              </div>
              <div class="menu-item">
                <div class="save-create-container">
                  <h4>🎀 新建对话</h4>
                  <div class="line"></div>
                  <div class="upload-input-container">
                    <h4>输入标题：</h4>
                    <input
                      type="text"
                      id="new-convo-title"
                      placeholder="请输入对话标题..."
                    />
                    <button id="create-convo-btn" class="save-btn">
                      写入新存档
                    </button>
                  </div>
                </div>
              </div>
              <div class="menu-item">
                <h4>📥 上传日志文档载入对话</h4>
                <div class="line"></div>
                <div class="upload-area">
                  <input type="file" id="log-upload" accept=".log,.txt" />
                  <button id="upload-btn">上传日志文件</button>
                  <div id="upload-status"></div>
                </div>
              </div>
            </div>
          </div>
    `
  }
  get element() {
    return this.container
  }
}
const save = new Save()
export default save