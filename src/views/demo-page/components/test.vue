<template>
  <div>
    <el-button type="" @click="add">add</el-button>
    <br />
    <input v-model="curPage" />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['page']);
const emit = defineEmits(['update:page']);

const curPage = computed({
  get: () => props.page,
  set: value => emit('update:page', value)
});
const add = () => {
  curPage.value++;
};
</script>

<style lang="scss" scoped></style>
