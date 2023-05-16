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
      <base-table
        ref="tableRef"
        type="selection"
        :data="tableData"
        :loading="loading"
        :columns="columns"
        :otherProp="{
          defaultSort: { prop: 'totaltime', order: 'ascending' }
        }"
      >
        <!-- 自定义slot -->
        <template #pos="{ scope }">
          {{ scope.row.pos }} ({{ scope.row.points }})
        </template>
        <template #rider="{ scope }">
          {{ scope.row.number }}
          <span style="font-weight: bold">{{ scope.row.rider }}</span>
        </template>
        <!-- 自定义表头 -->
        <template #nationHeader>
          <el-icon><Location /></el-icon>
          Nation
        </template>
      </base-table>
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
import { getRemoteAPI, getList } from '@/api/demo.js';
import { splitDateRange } from '@/utils/ruoyi';
import { Edit, Location } from '@element-plus/icons-vue';
const message = inject('$modal');

const EditIcon = shallowRef(Edit);
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
const columns = ref([
  {
    prop: 'pos',
    label: 'Pos.',
    slot: true
  },
  {
    prop: 'rider',
    label: 'Rider',
    slot: true
  },
  {
    prop: 'nation',
    label: 'Nation',
    slotHeader: 'nationHeader'
  },
  {
    prop: 'team',
    width: '240px',
    label: 'Team'
  },
  {
    prop: 'bike',
    label: 'Motorcycle'
  },
  {
    prop: 'totaltime',
    label: 'Total Time',
    props: {
      sortable: true
    }
  },
  {
    prop: 'kmh',
    label: 'Km/h'
  },
  {
    prop: 'date',
    label: 'Date',
    width: '160px',
    format: 'formatDate'
  },
  {
    label: '操作',
    buttons: [
      {
        text: '编辑',
        loading: 'loading',
        props: {
          icon: EditIcon
        },
        click: row => {
          row.loading = true;
          setTimeout(() => {
            row.loading = false;
          }, 2000);
        }
      }
    ]
  }
]);

const { loading, tableData, pages, total, getTableData } = useTable(
  getRemoteAPI,
  {
    tableRef,
    searchParams,
    // custom pages
    // pages: {
    //   page: 1,
    //   limit: 20
    // },
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
  console.log('searchParams :>> ', searchParams);
  // set 'manualReset' can use manual reset
  if (type === 'reset') {
    // to do something
  }
  getTableData();
};
const handleAdd = () => {
  const selected = tableRef.value.baseTableRef.getSelectionRows();
  console.log('selected :>> ', selected);
  message.success('成功！');
};
</script>

<style lang="scss" scoped></style>
