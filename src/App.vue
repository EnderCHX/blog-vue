<script setup>
import { RouterView, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import TopBar from '@/components/TopBar.vue'
import CommentCard from "@/components/CommentCard.vue";
import {darkTheme} from "naive-ui";
import UserInfoCard from "@/components/UserInfoCard.vue";

const timeStart = Date.parse("2025-01-19 23:54:59.379")

const timeServeRun = ref((Date.now() - timeStart)/1000/60/60/24)
const commentVisibility = ref("none")
const watchingPassageId = ref("b633cd4f40f08ba688238bbfe94b51dd")

const route = useRoute()

const LoadComment = (path) => {
  let p = path.split("/")
  console.log(p)
  if (p[1] === "post") {
    commentVisibility.value = ""
    watchingPassageId.value = p[2]
  } else {
    commentVisibility.value = "none"
  }
}

watch(
    () => route.path,
    (path) => {
      console.log(path)
      LoadComment(path)
    }
)

</script>

<template>

  <n-config-provider :theme="lightTheme" class="app">
    <n-dialog-provider>
      <n-message-provider>
        <n-layout has-sider>
          <n-back-top />
            <n-layout class="main">
              <n-layout class="top-bar">
                <TopBar />
              </n-layout>

              <n-layout class="main-content">
                <n-scrollbar>
                  <RouterView />
                </n-scrollbar>
              </n-layout>

              <n-layout class="foot-bar">
                <n-text>备案</n-text>
              </n-layout>
            </n-layout>

          <n-layout-sider class="main-aside">
            <UserInfoCard />
            <n-card>
              访问量<br>
              运行时间 {{ timeServeRun }} 天
            </n-card>

            <CommentCard class="comment-card" :style="{display: commentVisibility}" v-bind:passage_id="watchingPassageId" />
          </n-layout-sider>
        </n-layout>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
}
.main {
  border: solid 1px red;

  width: 100vh;
  display: flex;
  flex-direction: column;


  .top-bar {
    flex-direction: row;
    justify-content: space-between;
    border: solid 1px white;
    height: 5%;
  }

  .main-content{
    border: solid 1px white;
    height: 90%;
    overflow: hidden;
  }

  .foot-bar {
    border: solid 1px white;
    height: 5%;
  }
}

.main-aside{
  width: 20%;
  height: 100%;
}

</style>
