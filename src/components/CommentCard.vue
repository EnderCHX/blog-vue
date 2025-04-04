<script setup>
import {ref, onMounted, watch  } from 'vue'
import global from "@/config/global.js"
import dayjs from "dayjs"
import { useMessage } from 'naive-ui'
import {NewComment} from '@/api/comment'

const textarea = ref('')
const comments = ref([])
const message = useMessage()

const props = defineProps({
  passage_id: {
    type: String,
    required: true
  }
})

const GetComments = async () => {
  const response = await fetch(`${global.BlogApiUrl}/comments/passage/${props.passage_id}`)
  const data = await response.json()
  comments.value = data.data
}

const SendComment = async () => {
  if (textarea.value === '') {
    message.warning('评论不能为空')
    return
  }
  let data = {
    passage_id: props.passage_id,
    content: textarea.value
  }
  let res = await NewComment(data)
  if (res.success) {
    message.success('评论成功')
    GetComments()
    textarea.value = ''
  } else {
    message.error('评论失败 '+ res.msg)
  }
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
    <n-button type="primary" @click="SendComment">评论</n-button>
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