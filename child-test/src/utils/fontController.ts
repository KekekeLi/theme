class FontController {
  baseSize: number
  currentScale: number
    constructor() {
      this.baseSize = 14
      this.currentScale = 1
    }
  
    setFontSize(size: number) {
      this.currentScale = size
      document.documentElement.style.fontSize = 
        `${this.currentScale}px`
      
      // 同步到iframe
      const iframe = document.getElementById('content-frame');
      (iframe as HTMLIFrameElement).contentWindow.postMessage({
        type: 'FONT_SCALE',
        payload: 'updateSize'
      }, '*')
    }
  
    loadFont(fontFamily) {
      
      document.documentElement.style.setProperty(
        '--font-family-base', 
        `'${fontFamily}', sans-serif`
      )
    }
  }