<script setup>


const props = defineProps({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: false
    },
    created_at: {
        type: String,
        required: true
    },
    updated_at: {
        type: String,
        required: true
    }
})

</script>

<template>
    <n-card class="passage-card">
      <n-flex vertical>
        <n-text>作者：{{ author }}</n-text>
        <n-text>标题：{{ title }}</n-text>
        <n-text>标签：{{ tags }}</n-text>
        <n-text>创建时间：{{ created_at }}</n-text>
        <n-text>更新时间：{{ updated_at }}</n-text>
      </n-flex>

    </n-card>
</template>

<style scoped>
.passage-card {
  border: solid 1px black;
}
</style>