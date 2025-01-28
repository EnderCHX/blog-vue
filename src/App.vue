<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TopBar from '@/components/TopBar.vue'

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
            运行时间
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
