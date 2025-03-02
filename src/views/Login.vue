<script setup>
import {ref} from 'vue'
import {useMessage} from 'naive-ui'
import auth from '../api/auth'

const username = ref('')
const password = ref('')

const message = useMessage()

const login = async () => {
  let data = await auth.Login(username.value, password.value)
  console.log(data)
  if (data.code === "Success") {
    localStorage.setItem('refresh_token', data.data.refresh_token)
    sessionStorage.setItem('access_token', data.data.access_token)
    message.success('登录成功')
  } else {
    message.error('登录失败 '+ data.message)
  }

}

</script>

<template>
  <n-dialog-provider>
    <n-message-provider>
      <n-layout>
        <n-input type="text" v-model:value="username"/>
        <n-input type="password" v-model:value="password"/>
        <n-button type="primary" @click="login">登录</n-button>
      </n-layout>
    </n-message-provider>
  </n-dialog-provider>

</template>

<style scoped>

</style>