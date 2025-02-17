<template>
    <div class="theme-preview">
      <h2>主题色预览</h2>
      
      <!-- 按钮展示区 -->
      <div class="preview-section">
        <h3>按钮</h3>
        <div class="preview-content">
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
        </div>
      </div>
  
      <!-- 文字链接展示区 -->
      <div class="preview-section">
        <h3>文字链接</h3>
        <div class="preview-content">
          <el-link type="primary">主要链接</el-link>
          <el-link type="success">成功链接</el-link>
          <el-link type="warning">警告链接</el-link>
          <el-link type="danger">危险链接</el-link>
        </div>
      </div>
  
      <!-- 表单元素展示区 -->
      <div class="preview-section">
        <h3>表单元素</h3>
        <div class="preview-content">
          <el-input v-model="input" placeholder="请输入内容" />
          <el-switch v-model="switchValue" />
          <el-slider v-model="sliderValue" />
          <el-radio-group v-model="radio">
            <el-radio :label="1">选项1</el-radio>
            <el-radio :label="2">选项2</el-radio>
          </el-radio-group>
        </div>
      </div>
  
      <!-- 进度条展示区 -->
      <div class="preview-section">
        <h3>进度条</h3>
        <div class="preview-content">
          <el-progress :percentage="50" />
          <el-progress :percentage="70" type="success" />
          <el-progress :percentage="80" type="warning" />
          <el-progress :percentage="90" type="danger" />
        </div>
      </div>
  
      <!-- Tag 标签展示区 -->
      <div class="preview-section">
        <h3>标签</h3>
        <div class="preview-content">
          <el-tag>默认标签</el-tag>
          <el-tag type="success">成功标签</el-tag>
          <el-tag type="warning">警告标签</el-tag>
          <el-tag type="danger">危险标签</el-tag>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const input = ref('')
  const switchValue = ref(true)
  const sliderValue = ref(50)
  const radio = ref(1)
  </script>
  
  <style scoped>
  .theme-preview {
    padding: 24px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }
  
  .preview-section {
    margin-bottom: 32px;
  }
  
  .preview-section h3 {
    margin-bottom: 16px;
    font-size: 16px;
    color: #333;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }
  
  .preview-content {
    display: flex;
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .preview-content .el-input {
    width: 220px;
  }
  
  .preview-content .el-slider {
    width: 300px;
  }
  
  .preview-content .el-progress {
    width: 200px;
  }
  </style>