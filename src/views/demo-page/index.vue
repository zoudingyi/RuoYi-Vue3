<template>
  <div class="app-container">
    <primary-search>
      <search-form
        :formItems="formItems"
        v-model:formData="searchParams"
        @updateData="handleUpdateData"
        manualReset
      />
    </primary-search>
    <primary-container>
      <template #tableHeader>
        <el-button type="primary" size="default" @click="">添加</el-button>
      </template>
      <!-- <base-table></base-table> -->
      <el-table
        :data="tableData"
        v-loading="loading"
        ref="tableRef"
        height="100%"
        border
        stripe
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

const tableRef = ref(null);
const formItems = reactive({
  input: {
    component: 'input',
    label: '搜索',
    placeholder: '请输入'
    // disabled: true
  },
  select: {
    component: 'select',
    label: '下拉',
    placeholder: '请选择',
    props: {
      // disabled: true,
      multiple: true
    },
    options: [
      {
        label: '全部',
        value: '全部'
      },
      {
        label: '单品',
        value: '单品'
      },
      {
        label: '套装',
        value: '套装'
      }
    ]
  },
  radio: {
    component: 'radio-group',
    label: '按钮',
    options: [
      {
        label: '全部',
        value: ''
      },
      {
        label: '可用',
        value: '1'
      },
      {
        label: '停用',
        value: '0'
      }
    ]
  },
  cascader: {
    component: 'cascader',
    label: '级联',
    options: [
      {
        value: 'guide',
        label: 'Guide',
        children: [
          {
            value: 'disciplines',
            label: 'Disciplines',
            children: [
              {
                value: 'consistency',
                label: 'Consistency'
              },
              {
                value: 'feedback',
                label: 'Feedback'
              },
              {
                value: 'efficiency',
                label: 'Efficiency'
              },
              {
                value: 'controllability',
                label: 'Controllability'
              }
            ]
          },
          {
            value: 'navigation',
            label: 'Navigation',
            children: [
              {
                value: 'side nav',
                label: 'Side Navigation'
              },
              {
                value: 'top nav',
                label: 'Top Navigation'
              }
            ]
          }
        ]
      }
    ]
  },
  datePicker: {
    component: 'date-picker',
    props: {
      type: 'datetimerange'
    },
    label: '日期范围'
  }
});
const searchParams = reactive({
  input: '',
  select: '',
  radio: '',
  cascader: [],
  datePicker: []
});
const { loading, tableData, pages, total, getTableData } = useTable(getApps, {
  tableRef,
  searchParams,
  onPreprocess: () => {
    console.log('onPreprocess');
    return Promise.resolve();
  },
  onSuccess: () => {
    console.log('onSuccess');
  },
  onFinally: () => {
    console.log('onFinally');
  }
});
const handleUpdateData = type => {
  if (type === 'reset') {
    // to do something
  }
  getTableData();
};
</script>

<style lang="scss" scoped></style>
