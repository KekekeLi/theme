type ModuleHandler = (payload: any) => void;

export class CoreBridge {
  private modules: Map<string, ModuleHandler> = new Map();
  private allowedOrigins: string[];
  
  constructor(config: { origins: string[] }) {
    this.allowedOrigins = config.origins;
    this.initMessageListener();
  }

  // 初始化消息监听
  private initMessageListener() {
    window.addEventListener('message', (e) => {
      if (!this.validateOrigin(e.origin)) return;
      
      try {
        const { type, payload } = JSON.parse(e.data);
        this.routeMessage(type, payload);
      } catch (err) {
        this.handleError('INVALID_MSG_FORMAT', err);
      }
    });
  }

  // 消息路由
  private routeMessage(type: string, payload: any) {
    const handler = this.modules.get(type);
    handler?.(payload);
  }

  // 模块注册
  registerModule(moduleType: string, handler: ModuleHandler) {
    this.modules.set(moduleType, handler);
  }

  // 安全验证
  private validateOrigin(origin: string): boolean {
    return this.allowedOrigins.includes(origin);
  }

  // 错误处理
  private handleError(code: string, error: Error) {
    console.error(`[CoreBridge Error ${code}]`, error);
  }

  // 双向通信
  sendMessage(target: Window, type: string, payload: any) {
    target.postMessage(JSON.stringify({
      type,
      payload,
      metadata: {
        timestamp: Date.now(),
        source: 'child'
      }
    }), '*');
  }
}