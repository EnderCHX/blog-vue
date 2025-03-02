<script setup>
import { onMounted, ref, watch } from 'vue'
import global from '@/config/global'

const title = ref('')
const content = ref('')

const tags = ref([])
const tagsSet = new Set()

const NewPost = async () => {
    let url = global.blogApiUrl + '/newpost'
    let token = sessionStorage.getItem('access_token')
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
            title: title.value,
            content: content.value,
            tags: tags.value
        })
    })
    let data = await response.json()
    console.log(data)
    if (response.ok) {
        ElMessage({
            message: '发布成功',
            type: 'success',
        })
    } else {
        ElMessage({
            message: '发布失败,' + data.message,
            type: 'error',
        })
    }
}

watch(tags, () => {
    if (tagsSet.has(tags.value[tags.value.length - 1])) {
        tags.value.pop()
    } else {
        tagsSet.add(tags.value[tags.value.length - 1])
    }
})

onMounted(() => {
    sessionStorage.setItem('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaXNzIjoiY2h4Yy5jYyIsImV4cCI6MTczODEzODYxOSwiaWF0IjoxNzM4MTM1MDE5fQ.dXawAX3AvXO1I6eA9kHgcA8Pm2XjGD70SfZ-ZA7_rUI')
})
</script>

<template>
    <n-input
        v-model="title"
        placeholder="标题"
        clearable
    />
    <n-input
        v-model="content"
        type="textarea"
        placeholder="正文"
        clearable
    />
    <n-input
        v-model="tags"
        clearable
        placeholder="标签"
    />
    <n-button type="primary" @click="NewPost">发布</n-button>
</template>