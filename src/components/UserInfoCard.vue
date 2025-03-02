<script setup>
import {ref} from 'vue'


const userName = ref('CHX')
const avatarUrl = ref('https://chxc.cc/img/chx.png')
const access_token = ref('')
const refresh_token = ref('')

const Login = async () => {
  if (localStorage.getItem('if_login') === 'true') {
    refresh_token.value = localStorage.getItem('refresh_token')
    access_token.value = sessionStorage.getItem('access_token')
  } else {}
}


</script>

<template>
  <n-card >
    <n-avatar lazy size="medium" :src="avatarUrl" />
    <n-text>{{userName}}</n-text>
  </n-card>
</template>

<style scoped>

</style>