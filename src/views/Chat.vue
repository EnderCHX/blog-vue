<script setup>
import {onMounted, ref} from "vue";
import {Chat} from "@/api/chat.js";
import config from '@/config/global.js'
import {TestAccessToken} from "@/api/auth.js";
import {useMessage} from "naive-ui";
import {useRouter} from "vue-router";

const socket = ref()
const chats = ref([])
const msg = ref('')

const send = ()=>{
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
  if (TestAccessToken() === 'Unauthorized') {
    useMessage().error('请先登录')
    useRouter().push('/login')
    return
  }
  socket.value = new WebSocket(config.BlogApiUrl + '/chat' + '?token=Bearer ' + sessionStorage.getItem('access_token'))

  socket.value.onopen = () => {
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
    }
    console.log(chats.value)
  }
})

</script>

<template>
<n-layout class="chat-main" v-for="(chat, index) in chats" :key="index">
[{{chat.chat_id}}] {{chat.username}} said to {{chat.reply_chat_id}} at {{chat.created_at}} : {{chat.content}}
</n-layout>
<n-layout class="input">
  <n-input style="width: 90%" v-model:value="msg" />
  <n-button style="width: 10%" @click="send">发送</n-button>
</n-layout>
</template>

<style scoped>
.chat-main {
  height: 100%;
  border: black 1px solid ;
}


.input {
  width: 80%;
  padding: 1px;
  bottom: 6%;
  position: fixed;
  display: flex;
  flex-direction: column;
}
</style>