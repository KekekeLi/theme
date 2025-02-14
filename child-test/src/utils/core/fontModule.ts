import { CoreBridge } from './coreBridge';

export class FontModule {
    private core: CoreBridge;
    private baseSize: number = 14;
  
    constructor(core: CoreBridge) {
      this.core = core;
      this.registerHandlers();
    }
  
    private registerHandlers() {
      this.core.registerModule('FONT_UPDATE', (payload) => {
        this.setGlobalSize(payload.size);
      });
    }
  
    setGlobalSize(size: number) {
      this.baseSize = size;
      document.documentElement.style.fontSize = 
        `${this.baseSize}px`;
    }
  }