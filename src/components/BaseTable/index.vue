<template>
  <el-table
    ref="baseTableRef"
    v-loading="loading"
    v-bind="otherProp"
    :data="tableData"
    :height="height"
    :border="border"
    @selection-change="handleSelectionChange"
    @select-all="hanldeSelectAll"
  >
    <!-- selection / index / expand -->
    <el-table-column v-if="type" :type="type" width="50" align="center" />
    <el-table-column
      v-for="(item, index) in columns"
      :key="index"
      v-bind="item.props"
      :label="item.label"
      :width="item.width"
    >
      <template #default="scope">
        {{ deStructure(scope.row, item.prop) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
const emit = defineEmits(['selectionChange']);
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

const deStructure = (row, prop) => {
  const keys = prop.split('.');
  let data = row;
  for (let i = 0; i < keys.length; i++) {
    data = data[keys[i]] ?? '';
    if (data === '') break;
  }
  return data;
};
const handleSelectionChange = val => emit('selectionChange', val);
const hanldeSelectAll = val => emit('selectAll', val);
</script>

<style lang="scss" scoped></style>
