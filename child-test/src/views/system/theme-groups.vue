<template>
    <!-- <div class="theme-config">
      <div class="theme-config-title">我是iframe主题组配置</div>
      <div class="theme-config-title">主题组配置</div>
      <div class="theme-config-content">
        <div class="theme-config-item">
          <span class="theme-config-label">已有主题风格：</span>
          <div class="theme-groups-list">
            <el-card v-for="(theme, index) in savedThemes" 
                    :key="index" 
                    class="theme-group-card"
                    :class="{ active: currentThemeIndex === index }"
                    @click="applyTheme(theme, index)">
              <div class="theme-colors-preview">
                <div class="color-preview">
                  <div class="color-block" :style="{ backgroundColor: theme.primary }"></div>
                  <span class="color-desc">默认</span>
                </div>
                <div class="color-preview">
                  <div class="color-block" :style="{ backgroundColor: theme.success }"></div>
                  <span class="color-desc">成功</span>
                </div>
                <div class="color-preview">
                  <div class="color-block" :style="{ backgroundColor: theme.error }"></div>
                  <span class="color-desc">错误</span>
                </div>
                <div class="color-preview">
                  <div class="color-block" :style="{ backgroundColor: theme.warn }"></div>
                  <span class="color-desc">警告</span>
                </div>
              </div>
              <div class="theme-name">{{ theme.name }}</div>
              <el-button type="danger" 
                        size="small" 
                        class="delete-btn"
                        :disabled="index === 0"
                        @click.stop="deleteTheme(index)">删除</el-button>
            </el-card>
          </div>
        </div>
  
        <div class="theme-config-group">
          <div class="theme-config-item">
            <span class="theme-config-label">主题名称：</span>
            <el-input class="theme-config-input" v-model="currentTheme.name" placeholder="请输入主题名称"></el-input>
          </div>
            <div class="theme-config-group">
                <div class="theme-config-item">
                    <span class="theme-config-label">默认主题色：</span>
                    <el-color-picker v-model="themeGroup.primary" @change="(color) => changeThemeGroupColor('primary', color)"></el-color-picker>
                </div>
                <div class="theme-config-item">
                    <span class="theme-config-label">成功状态色：</span>
                    <el-color-picker v-model="themeGroup.success" @change="(color) => changeThemeGroupColor('success', color)"></el-color-picker>
                </div>
                <div class="theme-config-item">
                    <span class="theme-config-label">错误状态色：</span>
                    <el-color-picker v-model="themeGroup.error" @change="(color) => changeThemeGroupColor('error', color)"></el-color-picker>
                </div>
                <div class="theme-config-item">
                    <span class="theme-config-label">警告状态色：</span>
                    <el-color-picker v-model="themeGroup.warn" @change="(color) => changeThemeGroupColor('warn', color)"></el-color-picker>
                </div>
            </div>
        </div>
      </div>
      <div class="theme-config-buttons">
        <el-button size="large" type="primary" @click="saveThemeConfig">保存为新主题</el-button>
        <el-button size="large" type="success" @click="updateTheme" :disabled="currentThemeIndex === -1">更新当前主题</el-button>
      </div>
    </div> -->
  </template>
  <script setup lang="ts">
  import { ref, reactive, watch } from 'vue';
  import { useStorage } from '@vueuse/core';
  import { useElementPlusTheme } from 'use-element-plus-theme';
  import { ElMessage } from 'element-plus';
  
  interface ThemeGroup {
    name: string;
    primary: string;
    success: string;
    error: string;
    warn: string;
  }
  
  // 主题色组存储
  const themeGroup = reactive({
    primary: useStorage('theme-primary', '#409EFF').value,
    success: useStorage('theme-success', '#67C23A').value,
    error: useStorage('theme-error', '#F56C6C').value,
    warn: useStorage('theme-warn', '#E6A23C').value,
  });

  // 保存所有主题色组
  const savedThemes = useStorage<ThemeGroup[]>('saved-theme-groups', []);
  const currentThemeIndex = ref(-1);

  
  // 当前编辑的主题
  const currentTheme = reactive({
    name: '',
    ...themeGroup
  });

  const { changeTheme } = useElementPlusTheme(themeGroup.primary);
  
  // 监听主题色变化，同步到当前主题
  watch(themeGroup, (newValues) => {
    Object.assign(currentTheme, newValues);
  }, { deep: true });
  
  // 应用主题
  const applyTheme = (theme: ThemeGroup, index: number) => {
    currentThemeIndex.value = index;
    Object.keys(theme).forEach(key => {
      if (key !== 'name' && key in themeGroup) {
        themeGroup[key as keyof typeof themeGroup] = theme[key as keyof ThemeGroup];
      }
    });
    currentTheme.name = theme.name;
    changeTheme(theme.primary);
  };
  
  // 保存新主题
  const saveThemeConfig = () => {
    if (!currentTheme.name) {
      ElMessage.warning('请输入主题名称');
      return;
    }
    if (savedThemes.value.some(theme => theme.name === currentTheme.name)) {
      ElMessage.warning('主题名称已存在');
      return;
    }

    if (savedThemes.value.length >= 5) { 
      ElMessage.warning('最多只能保存5个主题');
      return;
    }
    savedThemes.value.push({
      name: currentTheme.name,
      primary: themeGroup.primary,
      success: themeGroup.success,
      error: themeGroup.error,
      warn: themeGroup.warn,
    });
    useStorage(`theme-primary`, 'primary').value = themeGroup.primary;
    ElMessage.success('主题保存成功');
  };

  // 修改主题色组
  const changeThemeGroupColor = (type: keyof Omit<ThemeGroup, 'name'>, color: string) => {
    themeGroup[type] = color;
    // useStorage(`theme-${type}`, color).value = color;
    if (type === 'primary') {
      changeTheme(color);
    }
  };
  
  // 更新当前主题
  const updateTheme = () => {
    if (currentThemeIndex.value === -1) return;
    savedThemes.value[currentThemeIndex.value] = {
      name: currentTheme.name,
      primary: themeGroup.primary,
      success: themeGroup.success,
      error: themeGroup.error,
      warn: themeGroup.warn,
    };
    ElMessage.success('主题更新成功');
  };
  
  // 删除主题
  const deleteTheme = (index: number) => {
    savedThemes.value.splice(index, 1);
    if (currentThemeIndex.value === index) {
      currentThemeIndex.value = -1;
      currentTheme.name = '';
    }
    ElMessage.success('主题删除成功');
  };
  
  // ... 保持原有的其他代码 ...
  </script>
  
  <style scoped>
  .theme-config {
    padding: 24px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    min-height: calc(100vh - 48px);
  }
  
  .theme-config-title {
    font-size: 20px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .theme-config-content {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  .theme-groups-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 16px;
    align-items: flex-start;
  }

  .theme-group-card {
    width: 240px;  /* 设置固定宽度 */
    flex-shrink: 0; /* 防止卡片被压缩 */
  }
  
  .theme-group-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  
  .theme-group-card.active {
    border: 2px solid var(--el-color-primary);
    box-shadow: 0 0 0 2px rgba(var(--el-color-primary-rgb), 0.1);
  }
  
  .theme-colors-preview {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
    padding: 8px;
    background-color: #f9fafb;
    border-radius: 6px;
  }
  
  .color-block {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .theme-name {
    font-size: 15px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 12px;
  }
  
  .delete-btn {
    position: absolute;
    right: 12px;
    top: 12px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  .theme-group-card:hover .delete-btn {
    opacity: 1;
  }
  
  .theme-config-group {
    background-color: #f9fafb;
    border-radius: 8px;
    padding: 24px;
  }
  
  .theme-config-item {
    display: flex;
    align-items: center;
  }
  
  .theme-config-item:last-child {
    margin-bottom: 0;
  }
  
  .theme-config-label {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    width: 120px;
    margin-right: 16px;
  }
  
  .theme-config-buttons {
    display: flex;
    gap: 16px;
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid #e5e7eb;
  }
  
  /* 颜色选择器样式优化 */
  .el-color-picker {
    margin-right: 16px;
  }
  
  /* 按钮样式优化 */
  .el-button--large {
    padding: 12px 24px;
    font-weight: 500;
  }

  .el-card {
    padding: 10px;
  }

  .el-card__body {
    padding: 0
  }

  .theme-name {
    margin-bottom: 0;
  }

  .color-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .color-desc {
    font-size: 12px;
    color: #666;
  }

  .theme-config-input {
    width: 300px;
  }
  </style>