<script setup>
import {marked} from 'marked'
import { ref, onMounted } from 'vue';
import global from '@/config/global'

const props = defineProps({
    passage_id: {
        type: String,
        required: true
    }
})

const passageContext = ref('')

const getContent = async () => {
    const response = await fetch(`${global.blogApiUrl}/post/${props.passage_id}`)
    const data = await response.json()
    passageContext.value = marked(data.data.content)
}

onMounted(async () => {
    await getContent()
})
</script>

<template>
    <div v-html="passageContext" class="passage-context"></div>
</template>
