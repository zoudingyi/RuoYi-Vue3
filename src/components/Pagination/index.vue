<template>
  <div class="pagination-container" :class="{ hidden: hidden }">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
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
import { scrollTo } from '@/utils/scroll-to';

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
  autoScroll: {
    type: Boolean,
    default: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits();

const currentPage = computed({
  get: () => props.page,
  set: val => emit('update:page', val)
});
const pageSize = computed({
  get: () => props.pageSize,
  set: val => emit('update:pageSize', val)
});

const handleChange = () => {
  emit('pageChange');
  if (props.autoScroll) scrollTo(0, 800);
};
</script>

<style lang="scss" scoped>
.pagination-container.hidden {
  display: none;
}
</style>
