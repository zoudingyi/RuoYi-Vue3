<template>
  <!-- 适合element常规搜索组件：input select cascader date-time-piker radio checkbox -->
  <el-form :model="searchParams" ref="search-form" :size="size">
    <div class="grid-container">
      <div class="grid-item" v-for="(value, key) in showFormItems" :key="key">
        <el-form-item :label="value.label">
          <component
            :is="`el-${value.component}`"
            v-model.trim="searchParams[key]"
            v-bind="value.props"
            :options="value.component === 'cascader' ? value.options : []"
            :placeholder="value.placeholder"
            :clearable="value.clearable ?? true"
            @change="val => handleChange(key, val)"
            :default-time="defaultTime"
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
            <template v-if="value.component === 'radio-group'">
              <el-radio-button
                v-for="(item, index) in value.options"
                :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-radio-button>
            </template>
            <template v-if="value.component === 'checkbox-group'">
              <el-checkbox-button
                v-for="(item, index) in value.options"
                :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </el-checkbox-button>
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
import { throttle, deepClone } from '@/utils';

const emit = defineEmits(['updateData', 'update:formData', 'change']);
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
  },
  // 手动重置搜索内容
  manualReset: {
    type: Boolean,
    default: false
  }
});

// 默认初始搜索值
const defaultSearchParams = deepClone(props.formData);
const defaultTime = [
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59)
];
const columnMax = ref(4);
const showFormItems = computed(() => {
  const items = {};
  Object.keys(props.formItems).forEach(key => {
    if (!props.formItems[key].hidden) {
      items[key] = props.formItems[key];
    }
  });
  return items;
});
const searchParams = computed({
  get: () => props.formData,
  set: val => emit('update:formData', val)
});
const getButtonSpan = computed(() => {
  const spanNum =
    columnMax.value -
    (Object.keys(showFormItems.value).length % columnMax.value);
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

const search = () => emit('updateData', 'search');

const reset = () => {
  // 重置为初始值
  if (!props.manualReset) {
    Object.keys(searchParams.value).forEach(key => {
      searchParams.value[key] = defaultSearchParams[key];
    });
  }
  emit('updateData', 'reset');
};
const handleChange = (key, val) => emit('change', { key, val });

onMounted(() => {
  resize();
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
      .el-form-item__label {
        font-weight: 700;
      }
      .el-checkbox-button__inner {
        font-weight: normal;
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
