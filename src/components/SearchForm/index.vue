<template>
  <!-- 只适合常用的搜索组件：input select cascader date-time-piker -->
  <el-form :model="searchParams" ref="search-form" :size="size">
    <div class="grid-container">
      <div class="grid-item" v-for="(value, key) in formItems" :key="key">
        <el-form-item :label="value.label">
          <component
            :is="`el-${value.component}`"
            v-model.trim="searchParams[key]"
            v-bind="value.props"
            :options="value.component === 'cascader' ? value.options : []"
            :placeholder="value.placeholder"
            :clearable="value.clearable ?? true"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          >
            <template #default="{ data }" v-if="value.component === 'cascader'">
              <span>{{ data.label }}</span>
            </template>
            <template v-if="value.component === 'select'">
              <el-option
                v-for="(item, index) in value.options"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </template>
          </component>
        </el-form-item>
      </div>
      <div class="grid-item grid-item-button" :style="getButtonSpan">
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </div>
    </div>
  </el-form>
</template>

<script setup>
import { throttle } from '@/utils';

const props = defineProps({
  size: {
    type: String,
    default: 'default'
  },
  formData: {
    type: Object,
    default: {}
  },
  formItems: {
    type: Object,
    default: {}
  }
});

const columnMax = ref(4);

const emit = defineEmits();
const searchParams = computed({
  get: () => props.formData,
  set: val => emit('update:formData', val)
});
const getButtonSpan = computed(() => {
  const spanNum =
    columnMax.value - (Object.keys(props.formItems).length % columnMax.value);
  return { 'grid-column': 'span ' + spanNum };
});

const resize = () => {
  const width = document.body.clientWidth;
  switch (!!width) {
    case width > 1360:
      columnMax.value = 4;
      break;
    case width > 992 && width <= 1360:
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

const search = () => emit('updata');
const reset = () => {
  Object.keys(searchParams.value).forEach(key => {
    if (Array.isArray(searchParams.value[key])) {
      searchParams.value[key] = [];
    } else {
      searchParams.value[key] = '';
    }
  });
  emit('updata');
};

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
    :deep(.el-form-item) {
      .el-select,
      .el-input,
      .el-cascader {
        width: 100%;
      }
    }
  }
  .grid-item-button {
    // grid-column: span 2;
    :deep(.el-form-item) .el-form-item__content {
      justify-content: flex-end;
    }
  }
}

@media screen and (max-width: 1360px) {
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
