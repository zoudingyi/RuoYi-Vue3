<template>
  <div>
    <el-form :model="formData" ref="search-form" size="default">
      <div class="grid-container">
        <div class="grid-item" v-for="item in formItems" :key="item.prop">
          <el-form-item label="搜索">
            <el-input v-model="formData[item.prop]"></el-input>
            <!-- TODO 完善列表 同步值 -->
            <!-- <component></component> -->
          </el-form-item>
        </div>
        <div class="grid-item grid-item-button" :style="getButtonSpan">
          <el-form-item>
            <el-button type="primary" @click="">搜索</el-button>
            <el-button>重置</el-button>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { throttle } from '@/utils';

const props = defineProps({
  formData: {
    type: Object,
    default: {}
  },
  formItems: {
    type: Object,
    default: []
  }
});

const columnMax = ref(4);
const getButtonSpan = computed(() => {
  const spanNum = columnMax.value - (props.formItems.length % columnMax.value);
  return { 'grid-column': 'span ' + spanNum };
});
const resize = () => {
  const width = document.body.clientWidth;
  switch (!!width) {
    case width > 1200:
      columnMax.value = 4;
      break;
    case width > 992 && width <= 1200:
      columnMax.value = 3;
      break;
    case width > 768 && width <= 992:
      columnMax.value = 2;
      break;
    case width <= 768:
      columnMax.value = 1;
      break;

    default:
      break;
  }
};
const listenResize = throttle(resize, 100, 250);

onMounted(() => {
  window.addEventListener('resize', listenResize, false);
});
onUnmounted(() => {
  window.removeEventListener('resize', listenResize, false);
});
</script>

<style lang="scss" scoped>
.grid-container {
  display: grid;
  gap: 0px 20px;
  grid-template-columns: repeat(4, minmax(0px, 1fr));
  .grid-item {
    grid-column: span 1;
  }
  .grid-item-button {
    // grid-column: span 2;
    :deep(.el-form-item) .el-form-item__content {
      justify-content: flex-end;
    }
  }
}

@media screen and (max-width: 1200px) {
  .grid-container {
    grid-template-columns: repeat(3, minmax(0px, 1fr));
  }
}

@media screen and (max-width: 992px) {
  .grid-container {
    grid-template-columns: repeat(2, minmax(0px, 1fr));
  }
}

@media screen and (max-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(1, minmax(0px, 1fr));
  }
}
</style>
