<script setup>
import {ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import {Register} from '@/api/auth'
import {useMessage} from 'naive-ui'

const username = ref("")
const password = ref("")
const password2 = ref("")
const email = ref("")
const avatar = ref("")
const signature = ref("")
const errorVisibility = ref("none")
const message = useMessage()

const router = useRouter()

const routeToLogin = () => {
    router.push("/login")
}

const register = async () => {
  let status = await Register(username.value, password.value, email.value, avatar.value, signature.value)
  if (status === true) {
    message.success("注册成功, 请登录")
    sleep(1000)
    router.push('/login')
  } else {
    message.error("注册失败 "+ status.msg)
  }
}

watch([password, password2], () => {
  console.log(password.value, password2.value)
  if (password.value !== password2.value) {
    errorVisibility.value = ""
    console.log("密码不一致")
  } else {
    errorVisibility.value = "none"
    console.log("密码一致")
  }
})


</script>

<template>

    <n-layout>
      <n-input type="text" v-model:value="username" placeholder="用户名"/>
      <n-input type="text" v-model:value="email" placeholder="邮箱"/>
      <n-input type="text" v-model:value="avatar" placeholder="头像图片链接"/>
      <n-input type="text" v-model:value="signature" placeholder="签名"/>
      <n-input type="password" v-model:value="password" placeholder="密码"/>
      <n-alert type="error" :style="{display: errorVisibility}" >👆两次密码不一样👇</n-alert>
      <n-input type="password" v-model:value="password2" placeholder="重复密码"/>
      <n-button type="primary" @click="register">注册</n-button>
      <n-button type="primary" @click="routeToLogin">登录</n-button>
    </n-layout>

</template>

