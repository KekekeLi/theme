import { createApp } from 'vue';
import { createPinia } from 'pinia';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';
import router from './router';
import { usePermissStore } from './store/permiss';
import 'element-plus/dist/index.css';
import './assets/css/icon.css';
import { BridgeCore } from '@like_kk/bridge-core'
import { ThemeModule, FontModule } from '@like_kk/bridge-core'
import { THEME_CONFIG_KEY } from '@/utils/storeVariable'
const bridge = new BridgeCore({
	allowedOrigins: ['http://localhost:5173'],
  secretKey: '123'
})

// 初始化模块
new ThemeModule(bridge, THEME_CONFIG_KEY)
new FontModule(bridge)

const app = createApp(App);
app.use(createPinia());
app.use(router);

// 注册elementplus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
// 自定义权限指令
const permiss = usePermissStore();
app.directive('permiss', {
    mounted(el, binding) {
        if (binding.value && !permiss.key.includes(String(binding.value))) {
            el['hidden'] = true;
        }
    },
});

app.mount('#app');
