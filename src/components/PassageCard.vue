<template>
    <el-card>
        <p>作者：{{ author }}</p>
        <p>标题：{{ title }}</p>
        <p>标签：{{ tags }}</p>
    </el-card>
</template>

<script>
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
    }
})
</script>