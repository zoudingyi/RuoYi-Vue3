<template>
  <div class="app-container">
    <primary-search>
      <search-form
        v-model:formData="searchParams"
        :formItems="formItems"
        @updateData="handleUpdateData"
        @change="handleChange"
      />
    </primary-search>
    <primary-container>
      <template #tableHeader>
        <el-button
          v-if="$auth.hasPermi('demo:user:edit')"
          type="primary"
          size="default"
          @click="handleAdd"
        >
          添加
        </el-button>
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
        <el-table-column prop="status" label="status"></el-table-column>
        <el-table-column
          prop="created_at"
          label="created_time"
        ></el-table-column>
      </el-table>
      <pagination
        v-model:page="pages.page"
        v-model:pageSize="pages.limit"
        :total="total"
        @pageChange="getTableData"
      />
    </primary-container>
  </div>
</template>

<script setup>
import { useTable } from '@/hooks/useTable';
import { getRemoteAPI, getList } from '@/api/demo.js';
import { splitDateRange } from '@/utils/ruoyi';
const message = inject('$modal');

const tableRef = ref(null);
const formItems = reactive({
  input: {
    component: 'input',
    label: '搜索',
    placeholder: '请输入'
    // hidden: true
    // disabled: true
  },
  select: {
    component: 'select',
    label: '下拉',
    placeholder: '请选择',
    props: {
      // disabled: true,
      // multiple: true
    },
    options: [
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
    props: {
      // disabled: true,
      // multiple: true
    },
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
  checkbox: {
    component: 'checkbox-group',
    label: '多选',
    props: {
      // disabled: true,
      // multiple: true
    },
    options: [
      {
        label: '选项1',
        value: '1'
      },
      {
        label: '选项2',
        value: '2'
      },
      {
        label: '选项3',
        value: '3'
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
      type: 'datetimerange',
      'value-format': 'YYYY-MM-DD HH:mm:ss'
    },
    label: '日期范围'
  }
});
const searchParams = reactive({
  input: '',
  select: '',
  radio: '',
  checkbox: [],
  cascader: [],
  datePicker: [],
  starTime: '',
  endTime: ''
});

const { loading, tableData, pages, total, getTableData } = useTable(
  getRemoteAPI,
  {
    tableRef,
    searchParams,
    pages: {
      page: 1,
      limit: 20
    },
    onPreprocess: () => {
      console.log('onPreprocess');
      return Promise.resolve();
    },
    onSuccess: res => {
      console.log('onSuccess');
    },
    onFinally: () => {
      console.log('onFinally');
    }
  }
);
const handleChange = ({ key, val }) => {
  if (key === 'datePicker') {
    splitDateRange(searchParams, val, ['starTime', 'endTime']);
  }
};
const handleUpdateData = type => {
  if (type === 'reset') {
    // to do something
  }

  console.log('searchParams :>> ', searchParams);
  // getTableData();
};
const handleAdd = () => {
  message.error('成功！');
};
</script>

<style lang="scss" scoped></style>
