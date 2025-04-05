<script setup>
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router';
import {jwtDecode} from "jwt-decode";

const userName = ref('CHX')
const avatarUrl = ref('https://chxc.cc/img/chx.png')
const signature = ref('未登录，点击登录')
const logoutVisiblity = ref('none')
const loginVisiblity = ref('')

const router = useRouter()

onMounted(() => {
  let refresh_token = localStorage.getItem("refresh_token")
  if (refresh_token !== null) {
    logoutVisiblity.value = 'none'
    let payload = jwtDecode(refresh_token)

    console.log(payload)
    userName.value = payload.username
    avatarUrl.value = payload.avatar
    signature.value = payload.signature
    localStorage.setItem('username', payload.username)
    localStorage.setItem('avatar', payload.avatar)
    localStorage.setItem('signature', payload.signature)
    logoutVisiblity.value = ''
    loginVisiblity.value = 'none'
  } else {
    logoutVisiblity.value = 'none'
    loginVisiblity.value = ''
  }
})

const logout = () => {
  localStorage.removeItem("refresh_token")
  sessionStorage.removeItem("access_token")
  window.location.reload()
}

const login = () => {
  router.push('/login')
}

</script>

<template>
  <n-card >
    <n-avatar lazy size="medium" :src="avatarUrl" />
    <n-text>{{userName}}</n-text>
    <n-text>{{signature}}</n-text>
    <n-button @click="logout" :style="{display : logoutVisiblity}">登出</n-button>
    <n-button @click="login" :style="{display : loginVisiblity}">登录</n-button>
  </n-card>
</template>

<style scoped>

</style>