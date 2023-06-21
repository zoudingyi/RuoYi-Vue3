<template>
  <!-- 基础table封装 适用常规场景 -->
  <el-table ref="baseTableRef" height="100%" border>
    <slot name="beginColumn" />
    <el-table-column
      v-for="(attrs, index) in columns"
      v-bind="attrs"
      :key="index"
    >
      <template v-if="attrs.slotHeader" #header="scope">
        <slot :name="attrs.slotHeader" :scope="scope" />
      </template>
      <template #default="scope">
        <template v-if="attrs.slot">
          <slot :name="attrs.slot" :scope="scope" />
        </template>
        <template v-else-if="attrs.buttons">
          <el-button
            v-for="btn in attrs.buttons"
            v-show="!scope.row[btn.hide]"
            :key="btn.text"
            :loading="scope.row[btn.loading]"
            :disabled="scope.row[btn.disabled]"
            type="primary"
            link
            v-bind="btn.attrs"
            @click="btn.click(scope.row, scope)"
          >
            {{ btn.text }}
          </el-button>
        </template>
        <template v-else>
          {{ deStructure(scope.row, attrs) }}
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import * as utils from '@/utils';

const baseTableRef = ref(null);
const props = defineProps({
  columns: {
    type: Array,
    default: []
  }
});

// 解构数据层级（支持xx.xx）、format数据
const deStructure = (row, { prop, format }) => {
  if (!prop) return '';
  const keys = prop.split('.');
  let data = row;
  for (let i = 0; i < keys.length; i++) {
    data = data[keys[i]] ?? '';
    if (data === '') break;
  }
  if (format) {
    if (typeof format === 'function') {
      return format(data);
    }
    return utils[format](data);
  }
  return data;
};

defineExpose({ baseTableRef });
</script>

<style lang="scss" scoped></style>
