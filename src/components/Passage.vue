<script setup>
import {marked} from 'marked'
import { ref, onMounted } from 'vue';
import global from '@/config/global'
import axios from 'axios'

const props = defineProps({
    passage_id: {
        type: String,
        required: true
    }
})

const passageContext = ref('')

const getContent = async () => {
  console.log('adsa')
  const response = await axios.get(`${global.BlogApiUrl}/post/${props.passage_id}`)
  console.log(response)
  if (response.status !== 200) {
    return
  }

  passageContext.value = marked(response.data.data.content)

}

onMounted(async () => {
  await getContent()
})
</script>

<template>
  <n-layout-content class="passage-context" v-html="passageContext"></n-layout-content>
</template>

<style scoped>
.passage-context {
  border: solid 1px black;
}

.passage-context ::v-deep(img) {
  width: 100%;
}

.passage-context h1 {
  color: red;
}
</style>