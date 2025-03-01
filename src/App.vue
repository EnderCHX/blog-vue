<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import TopBar from '@/components/TopBar.vue'

const timeStart = Date.parse("2025-01-19 23:54:59.379")

const timeServeRun = ref((Date.now() - timeStart)/1000/60/60/24)

</script>

<template>

  <el-aside class="main-aside">
    <el-card>
      访问量<br>
      运行时间 {{ timeServeRun }} 天
    </el-card>
  </el-aside>

  <el-container class="app">
      <el-header class="top-bar">
        <TopBar />
      </el-header>

      <div class="main">
        <el-main class="main-content">
          <RouterView />
        </el-main>
      </div>

      <el-footer class="foot-bar">
        <p>备案</p>
      </el-footer>
  </el-container>

</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;

  .top-bar {
    height: 5%;
    padding: 0;
  }

  .main {
    height: 90%;
    display: flex;

    .main-content{
      width: 80%;
    }
  }

  .foot-bar {
    height: 5%;
  }
}

.main-aside{
  width: 20%;
  float: right;
  height: 100%;
}
</style>
