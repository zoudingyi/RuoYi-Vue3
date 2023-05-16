<template>
  <!-- 基础table封装 适用常规场景 -->
  <el-table
    ref="baseTableRef"
    v-loading="loading"
    v-bind="otherProp"
    :data="tableData"
    :height="height"
    :border="border"
    @selection-change="handleSelectionChange"
    @sort-change="hanldeSortChange"
  >
    <!-- selection / index / expand -->
    <el-table-column v-if="type" :type="type" width="50" align="center" />
    <el-table-column
      v-for="item in columns"
      :key="item.id"
      v-bind="item.props"
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
    >
      <template v-if="item.slotHeader" #header="scope">
        <slot :name="item.slotHeader" :scope="scope"></slot>
      </template>
      <template #default="scope">
        <template v-if="item.slot">
          <slot :name="item.prop" :scope="scope"></slot>
        </template>
        <template v-else-if="item.buttons">
          <el-button
            v-for="button in item.buttons"
            v-show="!scope.row[button.hide]"
            :key="button.text"
            type="primary"
            link
            :loading="scope.row[button.loading]"
            :disabled="scope.row[button.disabled]"
            v-bind="button.props"
            @click="button.click(scope.row, scope)"
          >
            {{ button.text }}
          </el-button>
        </template>
        <template v-else>
          {{ deStructure(scope.row, item) }}
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import * as utils from '@/utils';

const baseTableRef = ref(null);
const emit = defineEmits(['selectionChange', 'sortChange']);
const props = defineProps({
  loading: {
    type: Boolean,
    default: true
  },
  columns: {
    type: Array,
    default: []
  },
  tableData: {
    type: Array,
    default: []
  },
  otherProp: {
    type: Object,
    default: {}
  },
  height: {
    type: [String, Number],
    default: '100%'
  },
  border: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: ''
  }
});

// 解构数据层级（支持xx.xx）、format数据
const deStructure = (row, { prop, format }) => {
  const keys = prop.split('.');
  let data = row;
  for (let i = 0; i < keys.length; i++) {
    data = data[keys[i]] ?? '';
    if (data === '') break;
  }
  if (format) {
    return utils[format](data);
  }
  return data;
};

// 可自行添加 Table 事件
const handleSelectionChange = val => emit('selectionChange', val);
const hanldeSortChange = val => emit('sortChange', val);

defineExpose({ baseTableRef });
</script>

<style lang="scss" scoped></style>
