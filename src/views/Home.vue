<script setup>
import { ref, onMounted } from 'vue'
import PassageCard from '@/components/PassageCard.vue'
import Global from '@/config/global.js'

const passages = ref([])
const tags = ref([])

const GetPassages = async () => {
  let url = Global.blogApiUrl + '/posts/'
  const response = await fetch(url)
  const data = await response.json()
  passages.value = data.data
}
const GetTags = async () => {
  for (let i = 0; i < passages.value.length; i++) {
    let url = Global.blogApiUrl + "/post/" + passages.value[i].passage_id + '/tags'
    const response = await fetch(url)
    const data = await response.json()
    tags.value.push(data.data)
  }
}

onMounted(async () => {
    await GetPassages()
    await GetTags()
})
</script>

<template>
  <el-scrollbar height="400px">
    <div v-for="(passage, index) in passages || []" :key="index" class="passage-list">
      <RouterLink v-bind:to="`/post/${passage.passage_id}`">
        <PassageCard :author="passage.author_username" :title="passage.title" :tags="tags[index]" :created_at="passage.created_at" :updated_at="passage.updated_at" />
      </RouterLink>  
      <br>
    </div>
  </el-scrollbar>
</template>

<style scoped>
.passage-list {
  margin-bottom: 20px;
}
</style>