<script setup xmlns="http://www.w3.org/1999/html">
import {ref, onMounted, watch  } from 'vue'
import global from "@/config/global.js";
import dayjs from "dayjs";

const textarea = ref('')
const comments = ref([])

const props = defineProps({
  passage_id: {
    type: String,
    required: true
  }
})

const GetComments = async () => {
  const response = await fetch(`${global.blogApiUrl}/comments/passage/${props.passage_id}`)
  const data = await response.json()
  comments.value = data.data
}

const FormatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

onMounted(async () => {
  GetComments()
})

watch(
    async () => props.passage_id,
    (passage_id) => {
      GetComments()
    }
)

</script>

<template>
  <n-card class="comment-card">
    <n-text>
      输入评论
    </n-text>
    <n-input
        v-model:value="textarea"
        autosize
        type="textarea"
        placeholder="输入文字，支持markdown"
    />
    <n-button type="primary" @click="NewComment">评论</n-button>
    <n-card v-for="(comment, index) in comments " :key="index">
      <n-text>
        {{ comment.username }} <br>
        {{ FormatDate(comment.created_at) }} <br>
        {{ comment.content }} <br>
        <n-button type='plain'>回复</n-button>
        <n-button type='plain' disabled>删除</n-button>
      </n-text>
    </n-card>
  </n-card>
</template>

<style scoped>

.comment-card {
  display: flex;
  flex-direction: column;
}

</style>