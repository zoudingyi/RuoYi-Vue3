<template>
  <el-tooltip :content="content" placement="top" v-bind="otherProp">
    <slot></slot>
    <template #content>
      <slot name="content"></slot>
    </template>
  </el-tooltip>
</template>

<script setup>
const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  otherProp: {
    type: Object,
    default: {}
  }
});
</script>

<style lang="scss" scoped></style>
