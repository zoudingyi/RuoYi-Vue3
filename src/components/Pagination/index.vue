<template>
  <div class="pagination-container" :class="{ hidden: hidden }">
    <el-pagination
      :background="background"
      v-model:current-page="curPage"
      v-model:page-size="curPageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :pager-count="pagerCount"
      :total="total"
      @size-change="handleChange"
      @current-change="handleChange"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  total: {
    required: true,
    type: Number
  },
  page: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 20
  },
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 30, 50];
    }
  },
  // 移动端页码按钮的数量端默认值5
  pagerCount: {
    type: Number,
    default: document.body.clientWidth < 992 ? 5 : 7
  },
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper'
  },
  background: {
    type: Boolean,
    default: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:page', 'update:pageSize', 'pageChange']);

const curPage = computed({
  get: () => props.page,
  set: val => emit('update:page', val)
});
const curPageSize = computed({
  get: () => props.pageSize,
  set: val => emit('update:pageSize', val)
});

const handleChange = () => emit('pageChange');
</script>

<style lang="scss" scoped>
.pagination-container.hidden {
  display: none;
}
</style>
