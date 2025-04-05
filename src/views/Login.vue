<script setup>
import {ref} from 'vue'
import {useMessage} from 'naive-ui'
import { Login } from '@/api/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')

const message = useMessage()
const route = useRouter()
const login = async () => {
  let status = await Login(username.value, password.value)
  if (status === true) {
    message.success('登录成功')
    route.push('/')
    setTimeout(()=>{window.location.reload()}, 1)
  } else {
    message.error('登录失败 ', status.msg)
  }
}

const routeToRegister = () => {
  route.push('/register')
}

</script>

<template>

    <n-layout>
      <n-input type="text" v-model:value="username" placeholder="用户名"/>
      <n-input type="password" v-model:value="password" placeholder="密码"/>
      <n-button type="primary" @click="login">登录</n-button>
      <n-button type="primary" @click="routeToRegister">注册</n-button>
    </n-layout>

</template>

<style scoped>

</style>