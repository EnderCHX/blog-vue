import {ref} from 'vue'
import {defineStore} from "pinia";

export const useConfig = defineStore('config', () => {
  const BlogApiUrl = ref('https://api.blog.hrbeu.top')
  const PassportApiUrl = ref('https://api.passport.hrbeu.top')
  return {BlogApiUrl, PassportApiUrl}
})