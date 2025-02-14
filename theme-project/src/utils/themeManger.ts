import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
class ThemeManager {
    themes: any; // 主题列表
    currentTheme: any; // 当前主题
  constructor() {
    this.themes = useStorage('theme-config', [])
    this.currentTheme = ref(useStorage('current-theme', {}))
  }

  addTheme(newTheme) {
    if (!this.validateTheme(newTheme)) return
    this.themes.value.push(newTheme)
  }

  applyTheme(themeName) {
    const theme = this.themes.value.find(t => t.name === themeName)
    Object.entries(theme.variables).forEach(([key, val]) => {
      document.documentElement.style.setProperty(key, val as string)
    })
    this.currentTheme.value = theme
    this.syncToIframe(theme) // 触发通信层
  }

  // 默认主题配置
  getDefaultThemes() {
    return [{
      name: 'default',
      label: '默认主题',
      variables: {
        '--primary-color': '#1890ff',
        '--secondary-color': '#52c41a',
        '--font-size-base': '14px'
      }
    }]
  }

  // 主题配置验证
  validateTheme(themes) {
    return themes.filter(theme => {
      return (
        typeof theme.name === 'string' &&
        typeof theme.label === 'string' &&
        theme.variables && 
        Object.keys(theme.variables).every(k => k.startsWith('--'))
      )
    })
  }

  syncToIframe(theme) {
    const iframe = document.getElementById('content-frame');
    (iframe as HTMLIFrameElement).contentWindow.postMessage({
      type: 'THEME_UPDATE',
      payload: theme
    }, '*')
  }
}