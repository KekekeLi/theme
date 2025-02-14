<template>
  <div class="theme-config">
    <div class="theme-config-title">主题配置</div>
    <div class="theme-config-content">
      <div class="theme-config-item">
        <span class="theme-config-label">主题风格：</span>
        <el-radio-group v-model="themeStyle" @change="changeThemeStyle">
          <el-radio v-for="item in themeColors" :key="item.color" :label="item.color" :title="item.themeName" :style="{ color: item.color }">{{ item.themeName }}</el-radio>
        </el-radio-group>
      </div>
      <div class="theme-config-item">
        <span class="theme-config-label">主题颜色：</span>
        <el-color-picker v-model="layoutThemeColor" @change="changeThemeColor"></el-color-picker>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';
import { useElementPlusTheme } from 'use-element-plus-theme';
import { ElMessage } from 'element-plus';


import { BridgeCore, ThemeModule, FontModule } from "@like_kk/bridge-core";

// const bridge = useBridge()
// const theme = ref('#409EFF')

// const updateTheme = (color) => {
//   bridge.theme.updatePrimary(color)
// }
// 初始化
const bridge = new BridgeCore({
  allowedOrigins: ['http://localhost:5173'],
  secretKey: '345'
})

const themeModule = new ThemeModule(bridge)
const fontModule = new FontModule(bridge)

// 更新主题示例
themeModule.updatePrimary('#FF0000')

// const layoutThemeColor = useStorage('layout-theme-color', '#409EFF');  // 默认主题色

// const { changeTheme } = useElementPlusTheme(layoutThemeColor.value);  // 初始化主题色

// const themeColors = [
//   { color: '#1b2a47', themeName: '道奇蓝' },
//   { color: '#722ed1', themeName: '深紫罗兰色' },
//   { color: '#eb2f96', themeName: '深粉色' },
//   { color: '#f5222d', themeName: '猩红色' },
//   { color: '#fa541c', themeName: '橙红色' },
//   { color: '#13c2c2', themeName: '绿宝石' },
//   { color: '#52c41a', themeName: '酸橙绿' },
// ];

// const themeStyle = ref('');

// const changeThemeColor = (color: string) => {
//     themeStyle.value = '';
//     changeTheme(color);
//     layoutThemeColor.value = color;  // 保存主题色
// }


// const changeThemeStyle = (color: string) => {
//     layoutThemeColor.value = color; 
//     changeTheme(color); // 保存主题色
//     console.log(layoutThemeColor, 'layoutThemeColor.value');
//     console.log(localStorage.getItem('layout-theme-color'), 'localStorage.getItem(layout-theme-color)');
// }

// const saveThemeConfig = () => {
//     ElMessage.success('主题配置保存成功');
// }
</script>

<style scoped>
.theme-config {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 100%;
}

.theme-config-label {
  font-size: 14px;
  margin-right: 10px;
}

.theme-config-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.theme-config-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.theme-config-item {
  display: flex;
  align-items: center;
}

.theme-config-label {
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
}

.theme-config-button {
    margin-top: 100px;
}
</style>