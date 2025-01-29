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
    <el-card>
        <p>作者：{{ author }}</p>
        <p>标题：{{ title }}</p>
        <p>标签：{{ tags }}</p>
        <p>创建时间：{{ created_at }}</p>
        <p>更新时间：{{ updated_at }}</p>
    </el-card>
</template>
