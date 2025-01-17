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
      <template #header>
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
        v-loading="loading"
        :data="fetchTableData"
        :columns="columns"
        :defaultSort="{ prop: 'totaltime', order: 'ascending' }"
        @selection-change="handleSelectionChange"
        @sort-change="hanldeSortChange"
      >
        <template #beginColumn>
          <el-table-column type="selection" width="50" align="center" />
        </template>
        <!-- 自定义slot -->
        <template #pos="{ scope }">
          {{ scope.row.pos }} ({{ scope.row.points }})
        </template>
        <template #rider="{ scope }">
          {{ scope.row.number }}
          <el-tooltip
            :content="scope.row.riderDetails"
            placement="top"
            :disabled="!scope.row.riderDetails"
          >
            <span style="font-weight: bold">{{ scope.row.rider }}</span>
          </el-tooltip>
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
    slot: 'pos'
  },
  {
    prop: 'rider',
    label: 'Rider',
    slot: 'rider'
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
    sortable: true
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
    width: '160px',
    buttons: [
      {
        text: '编辑',
        loading: 'loading',
        attrs: {
          icon: EditIcon
        },
        click: row => {
          // 加载loading
          row.loading = true;
          setTimeout(() => {
            row.loading = false;
          }, 2000);
        }
      },
      {
        text: '隐藏按钮',
        hide: 'isHide',
        click: row => {
          // 条件渲染按钮
          row.isHide = true;
          setTimeout(() => {
            row.isHide = false;
          }, 2000);
        }
      }
    ]
  }
]);

// 视情况是否需要对数据进行处理
const fetchTableData = computed(() => {
  return tableData.value.map(row => ({
    ...row,
    isHide: row.pos % 2
  }));
});

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
  message.success(`已选择${selected.length}个`);
};

const handleSelectionChange = val => {
  console.log('val :>> ', val);
};
const hanldeSortChange = val => {
  console.log('val :>> ', val);
};
</script>

<style lang="scss" scoped></style>
