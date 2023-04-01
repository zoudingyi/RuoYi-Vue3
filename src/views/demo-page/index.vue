<template>
  <div class="app-container">
    <primary-search>search</primary-search>
    <primary-container>
      <el-table :data="tableData" border stripe height="100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" label="name"></el-table-column>
        <el-table-column prop="sex" label="sex"></el-table-column>
      </el-table>

      <pagination
        v-model:page="pagesData.page"
        v-model:pageSize="pagesData.pageSize"
        :total="pagesData.total"
        @pageChange="getTableData"
      />
    </primary-container>
  </div>
</template>

<script setup>
import { getOptions } from '@/api/login';
const message = inject('$message');

const tableData = ref([{ name: 'zdy', sex: 'man' }]);
const pagesData = reactive({
  page: 1,
  pageSize: 20,
  total: 100
});
const getTableData = () => {
  getOptions().then(res => {});
  console.log('pagesData :>> ', pagesData);
};
</script>

<style lang="scss" scoped></style>
