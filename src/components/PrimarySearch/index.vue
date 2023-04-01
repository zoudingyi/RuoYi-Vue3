<template>
  <div class="primary-search">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.primary-search {
  padding: 18px 18px 0;
  margin-bottom: 10px;
  border-radius: 4px;
  overflow-x: hidden;
  background-color: #ffffff;
  border: 1px solid #e4e7ed;
  box-shadow: 0 0 12px #0000000d;
}
::v-deep .el-form .el-form-item {
  margin-bottom: 18px;
  > .el-form-item__label {
    font-weight: 500;
  }
}
</style>
