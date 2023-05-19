<template>
  <div class="primary-container">
    <div class="table-header">
      <slot name="header"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.primary-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  overflow-x: hidden;
  background-color: #ffffff;
  border: 1px solid #e4e7ed;
  box-shadow: 0 0 12px #0000000d;
  .table-header {
    .el-button {
      margin-bottom: 15px;
    }
    .el-button + .el-button {
      margin-left: 15px;
    }
  }
}
</style>
