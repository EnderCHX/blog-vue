<template>

    <n-layout>
      <n-input type="text" v-model:value="username"/>
      <n-input type="text" v-model:value="email"/>
      <n-input type="text" v-model:value="avatar"/>
      <n-input type="text" v-model:value="signature"/>
      <n-input type="password" v-model:value="password"/>
      <n-input type="password" v-model:value="password2"/>
      <n-button type="primary" @click="login">注册</n-button>
      <n-button type="primary" @click="routeToLogin">登录</n-button>
    </n-layout>

</template>

<script setup>
import {ref} from "vue"
import {useRouter} from "vue-router"

const username = ref("")
const password = ref("")
const password2 = ref("")
const email = ref("")
const avatar = ref("")
const signature = ref("")

const router = useRouter()


</script>