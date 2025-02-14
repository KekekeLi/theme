import { CoreBridge } from './coreBridge';

export class ThemeModule {
    private core: CoreBridge;
    private stylesheet: CSSStyleSheet;
  
    constructor(core: CoreBridge) {
      this.core = core;
      this.initStylesheet();
      this.registerHandlers();
    }
  
    // 初始化样式表
    private initStylesheet() {
      const style = document.createElement('style');
      document.head.appendChild(style);
      this.stylesheet = style.sheet as CSSStyleSheet;
    }
  
    // 注册消息处理器
    private registerHandlers() {
      this.core.registerModule('THEME_UPDATE', (payload) => {
        this.applyTheme(payload.variables);
      });
    }
  
    // 应用主题变量
    applyTheme(variables: Record<string, string>) {
      this.stylesheet.insertRule(`
        :root {
          ${Object.entries(variables)
            .map(([k, v]) => `${k}: ${v};`)
            .join('\n')}
        }
      `, 0);
      
      // 清理旧规则
      if (this.stylesheet.cssRules.length > 1) {
        this.stylesheet.deleteRule(1);
      }
    }
  }