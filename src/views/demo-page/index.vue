<template>
  <div class="app-container">
    <primary-search>
      <el-input v-model="searchParams.data" size="default" clearable></el-input>
    </primary-search>
    <primary-container>
      <template #tableHeader>
        <el-button type="primary" size="default" @click="update">btn</el-button>
      </template>
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        stripe
        height="100%"
      >
        <el-table-column type="index" width="50" />
        <el-table-column prop="name" label="name"></el-table-column>
        <el-table-column prop="edituser" label="sex"></el-table-column>
      </el-table>
      <pagination
        v-model:page="pages.page"
        v-model:pageSize="pages.pageSize"
        :total="total"
        @pageChange="getTableData"
      />
    </primary-container>
  </div>
</template>

<script setup>
import { useTable } from '@/hooks/useTable';
import { getApps } from '@/api/login';
// const message = inject('$message');

const searchParams = reactive({
  data: 1
});
const { loading, tableData, pages, total, getTableData, update } = useTable(
  getApps,
  {
    searchParams
  }
);
</script>

<style lang="scss" scoped></style>
