<script setup>
import { onMounted, ref, watch } from 'vue'
import {NewPost}  from '@/api/post.js'
import {useMessage} from 'naive-ui'

const title = ref('')
const content = ref('')
const message = useMessage()

const tags = ref([])
const tagsSet = new Set()

const newPost = async () => {
    let res = await NewPost({
        title: title.value,
        content: content.value,
        tags: tags.value,
    })
    let data = await res
    console.log(data)
    if (res.success) {
      message.success('发布成功')
    } else {
      message.error('发布失败 '+ data.message)
    }
}

watch(tags, () => {
    if (tagsSet.has(tags.value[tags.value.length - 1])) {
        tags.value.pop()
    } else {
        tagsSet.add(tags.value[tags.value.length - 1])
    }
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
    <n-dynamic-tags v-model:value="tags" />
    <n-button type="primary" @click="newPost">发布</n-button>
</template>