<script setup>
import {onMounted, onUnmounted, ref} from "vue"
import config from '@/config/global.js'
import {TestAccessToken} from "@/api/auth.js";
import {useMessage} from "naive-ui"
import {useRouter} from "vue-router"

const socket = ref()
const chats = ref([])
const msg = ref('')
const userNum = ref(0)
const users = ref([])
const message = useMessage()
const router = useRouter()

const send = ()=>{
  if (msg.value === '') {
    message.warning('请输入内容')
    return
  }
  let data_send = {
    option: 'chat',
    data: {
      content: msg.value
    }
  }
  socket.value.send(JSON.stringify(data_send))
  msg.value = ''
}

onMounted(async ()=>{
  if (await TestAccessToken() === 'Unauthorized') {
    message.error('请先登录')
    setTimeout(()=>{}, 1000)
    router.push('/login')
    return
  }
  let url = encodeURI(config.BlogApiUrl + '/chat' + '?token=Bearer ' + sessionStorage.getItem('access_token'))
  socket.value = new WebSocket(url)

  socket.value.onopen = () => {
    message.info(localStorage.getItem('username') + ' 加入聊天室')
    console.log(localStorage.getItem('username') + ' 加入聊天室')
  }
  socket.value.onmessage = (event) => {
    let data = JSON.parse(event.data)
    if (data.option === 'chats') {
      data.data.slice().reverse().forEach(item => {
        chats.value.push(item)
      })
    } else if (data.option === 'chat') {
      chats.value.push(data.data)
    } else if (data.option === 'user_join') {
      if (data.data.username !== localStorage.getItem('username')) {
        message.info(data.data.username + ' 加入聊天室')
      }
    } else if (data.option === 'user_leave') {
        message.warning(data.data.username + ' 离开聊天室')
    } else if (data.option === 'user_num') {
      userNum.value = data.data.user_num
      let users_ = Object.entries(data.data.users)
      users.value = []
      users_.forEach(item => {
        users.value.push({
          label: item[0],
          value: item[1]
        })
      })
      console.log(users.value)
    } else if (data.option === 'ping') {
      socket.value.send(JSON.stringify({
        option: 'pong'
      }))
    }
  }
  socket.value.onclose = () => {
    message.warning('连接关闭')
    console.log('连接关闭')
  }
})

onUnmounted(()=>{
  socket.value.close()
})

</script>

<template>
<n-layout class="chat-main" v-for="(chat, index) in chats" :key="index">
  [{{chat.chat_id}}] {{chat.username}} said to {{chat.reply_chat_id}} at {{chat.created_at}} : {{chat.content}}
</n-layout>

<n-form class="input" @submit.prevent="send">
  <n-form-item>
    <n-dropdown trigger="click" :options="users" >
      <n-button>当前在线 {{ userNum }}</n-button>
    </n-dropdown>
  </n-form-item>
  <n-form-item><n-input v-model:value="msg" /></n-form-item>
  <n-form-item><n-button attr-type="submit" type="primary" >发送</n-button></n-form-item>
</n-form>
</template>

<style scoped>
.chat-main {
  height: 100%;
  width: 100%;
  border: black 1px solid ;
}


.input {
  width: 100%;
  padding: 1px;
  bottom: 2%;
  right: 0;
  left: 0;
  position: fixed;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
}
</style>