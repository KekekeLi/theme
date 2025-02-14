// 外层应用代码 
const iframes = document.querySelectorAll('iframe');
 
function updateTheme(theme) {
  iframes.forEach(iframe => {
    iframe.contentWindow.postMessage({
      type: 'THEME_UPDATE',
      data: theme 
    }, '*');
  });
}
 
function updateFontSize(fontSize) {
  iframes.forEach(iframe => {
    iframe.contentWindow.postMessage({
      type: 'FONT_SIZE_UPDATE',
      data: fontSize 
    }, '*');
  });
}