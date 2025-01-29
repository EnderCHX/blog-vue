<script setup>
import {ref} from 'vue'
import { useRoute } from 'vue-router';
import Passage from '@/components/Passage.vue'

const passage_id = ref(useRoute().params.id)
</script>

<template>
    <Passage :passage_id="passage_id" class="display"/>
</template>

<style scoped>
.display {
    display: block;
    width: 100%;
}
img {
    width: 100%;
}
</style>