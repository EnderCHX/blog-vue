<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
      <RouterLink to="/">
        <n-avatar size="medium" src="https://chxc.cc/img/chx.png" />
      </RouterLink>

      <RouterLink to="/">
        <n-button>Home</n-button>
      </RouterLink>

      <RouterLink to="/about">
        <n-button>About</n-button>
      </RouterLink>

      <RouterLink to="/login">
        <n-button>login</n-button>
      </RouterLink>

      <RouterLink to="/chat">
        <n-button>chat</n-button>
      </RouterLink>

</template>

<style scoped>
</style>