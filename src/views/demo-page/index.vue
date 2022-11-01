<template>
  <div class="app-container">
    <el-button type="" @click="getList">console</el-button>
    <Test v-model:page="page"></Test> {{ page }}
  </div>
</template>
<script>
export default {
  created() {
    this.$message.success('this.$message');
  }
};
</script>

<script setup>
import { getOptions } from '@/api/login';
import Test from './components/test.vue';
const message = inject('$message');

const page = ref(0);

const getList = () => {
  console.log('page :>> ', page.value);
  // const params = getQueryObject();
  // console.log('params :>> ', params);
  // getOptions().then(res => {
  //   console.log('res :>> ', res);
  //   message.success('11111');
  // });
};
</script>

<style lang="scss" scoped></style>
