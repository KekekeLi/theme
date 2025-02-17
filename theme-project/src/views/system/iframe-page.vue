<template>
  <div class="iframe-page">
    <iframe :src="url" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { THEME_CONFIG_KEY } from '@/utils/storeVariable';
import { ThemeModule } from '@like_kk/bridge-core';
import { ElMessage } from 'element-plus';
import { useBridgeStore } from '@/store/bridge';

const url = ref('http://localhost:5174/#/')

const bridgeStore = useBridgeStore()
const themeModule = new ThemeModule(bridgeStore.bridge, THEME_CONFIG_KEY)

bridgeStore.currentThemeConfig && themeModule.updateTheme(bridgeStore.currentThemeConfig)

</script>

<style>
.iframe-page {
  height: 100%;
}
</style>