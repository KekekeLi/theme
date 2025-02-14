import { CoreBridge } from '../coreBridge';
import { ThemeModule } from '../themeModule';
import { FontModule } from '../fontModule';
// 主应用初始化
const coreBridge = new CoreBridge({
    origins: ['https://main-app-domain.com']
  });
  
  // 注册模块
  const themeModule = new ThemeModule(coreBridge);
  const fontModule = new FontModule(coreBridge);