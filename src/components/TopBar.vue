<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <n-flex justify="center" class="top-bar">
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
    </n-flex>
</template>

<style scoped>
.item {
  border: solid 1px white;
}
</style>