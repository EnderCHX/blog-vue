<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import TopBar from '@/components/TopBar.vue'

const timeStart = Date.parse("2025-01-19 23:54:59.379")

const timeServeRun = ref((Date.now() - timeStart)/1000/60/60/24)

</script>

<template>
  <el-container class="app">
      <el-header class="top-bar">
        <TopBar />
      </el-header>

      <div class="main">
        <el-main>
          <RouterView />
        </el-main>

        <el-aside>
          <el-card>
            访问量<br>
            运行时间 {{ timeServeRun }} 天
          </el-card>
        </el-aside>
      </div>

      <el-footer>
        <p>备案</p>
      </el-footer>
  </el-container>

</template>

<style scoped>
.app {
  height: 100vh;
}

.main {
  display: flex;
}
</style>
