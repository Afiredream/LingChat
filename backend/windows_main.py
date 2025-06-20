import os
import asyncio
import json
import uvicorn
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from core.service_manager import service_manager
from core.frontend_manager import FrontendManager
# from core.logger import initialize_logger, log_info, log_error, log_text
from core.new_logger import logger
from api.chat_history import router as chat_history_router

load_dotenv()

# ============= 初始化核心组件 =============
app = FastAPI()
logo = [
    "", 
    "", 
    "█╗       ██╗ ███╗   ██╗  ██████╗      █████╗ ██╗  ██╗  █████╗  ████████╗",
    "██║      ██║ ████╗  ██║ ██╔════╝     ██╔═══╝ ██║  ██║ ██╔══██╗ ╚══██╔══╝",
    "██║      ██║ ██╔██╗ ██║ ██║  ███╗    ██║     ███████║ ███████║    ██║   ",
    "██║      ██║ ██║╚██╗██║ ██║   ██║    ██║     ██╔══██║ ██╔══██║    ██║   ",
    "███████╗ ██║ ██║ ╚████║ ╚██████╔╝     █████╗ ██║  ██║ ██║  ██║    ██║   ",
    "╚══════╝ ╚═╝ ╚═╝  ╚═══╝  ╚═════╝      ╚════╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝    ╚═╝   "
    ]

# ============= 保留你的原始 WebSocket 处理逻辑 =============
async def handle_websocket_message(websocket, data):
    """完全复用你原有的消息处理逻辑"""
    if data.get('type') == 'message':
        # logger.client_message(data)
        responses = await service_manager.ai_service.process_message(data.get('content', ''))
        for response in responses:
            await websocket.send_json(response)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            message = await websocket.receive()
            # 首先检查是否是断开消息
            if message.get('type') == 'websocket.disconnect':
                logger.info(f"客户端断开连接，代码: {message.get('code')}")
            else:
                print(message)
                data = json.loads(message["text"])

                if data.get('type') == 'ping':
                    await websocket.send_json({"type": "pong"})
                elif data.get('type') == 'message':
                    # 添加错误处理
                    try:
                        responses = await service_manager.ai_service.process_message(data.get('content', ''))
                        
                        # 处理responses为None的情况
                        if responses is None:
                            logger.error("AI服务返回了None响应")
                            error_response = {
                                "type": "reply",
                                "emotion": "sad",
                                "originalTag": "错误",
                                "message": "抱歉，处理您的消息时出现了问题。",
                                "motionText": "困惑",
                                "audioFile": None,
                                "originalMessage": data.get('content', ''),
                                "isMultiPart": False,
                                "partIndex": 0,
                                "totalParts": 1
                            }
                            await websocket.send_json(error_response)
                        else:
                            # 正常发送响应
                            for response in responses:
                                await websocket.send_json(response)
                    except Exception as e:
                        logger.error(f"处理消息时发生异常: {e}")
                        try:
                            # 发送错误响应
                            await websocket.send_json({
                                "type": "reply",
                                "emotion": "sad",
                                "originalTag": "错误",
                                "message": f"处理消息时出错: {str(e)}",
                                "motionText": "困惑",
                                "audioFile": None,
                                "originalMessage": data.get('content', ''),
                                "isMultiPart": False,
                                "partIndex": 0,
                                "totalParts": 1
                            })
                        except:
                            logger.error("无法发送错误响应")
            
                    
    except WebSocketDisconnect:
        print("客户端断开连接")
    except Exception as e:
        logger.error(f"WebSocket连接错误: {e}")
        try:
            await websocket.close(code=1011, reason=f"内部错误: {str(e)}")
        except:
            pass

# ============= 新增 HTTP 路由 =============
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 你的前端地址
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_history_router)

# ============= 保留前端服务 =============
frontend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'frontend', 'public')

@app.get("/")
async def index():
    return FileResponse(os.path.join(frontend_dir, "pages", "index.html"))

@app.get("/about")
async def about():
    return FileResponse(os.path.join(frontend_dir, "pages", "about.html"))

# 静态文件服务（处理其他未匹配的请求）
app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="static")

# ============= 启动逻辑 =============
async def main():
    for line in logo:
        print(line)
    print("")

    config = uvicorn.Config(
        app,
        host=os.getenv('BACKEND_BIND_ADDR', '0.0.0.0'),
        port=int(os.getenv('BACKEND_PORT', '8765')),
        log_level="info"
    )
    server = uvicorn.Server(config)
    try:
        print("正在启动HTTP服务器...")
        server_task = asyncio.create_task(server.serve())
        
        while not server.started:
            await asyncio.sleep(0.1)
                
        import subprocess
        import sys
        
        root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        lingchat_exe = os.path.join(root_dir, "frontend", "LingChatWeb.exe")
        
        if os.path.exists(lingchat_exe):
            subprocess.Popen(lingchat_exe)
        else:
            logger.error(f"错误: 找不到 {lingchat_exe}")
        await server_task
        
    except Exception as e:
        logger.error(f"服务器启动错误: {e}")

if __name__ == "__main__":
    asyncio.run(main())

