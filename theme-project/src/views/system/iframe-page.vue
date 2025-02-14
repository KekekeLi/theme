<template>
  <div class="iframe-page">
    <iframe :src="url" frameborder="0" width="100%" height="100%"></iframe>
  </div>
</template>


<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const url = ref('http://localhost:5173/#/theme-groups')

</script>

<style>
.iframe-page {
  height: 100%;
}
</style>