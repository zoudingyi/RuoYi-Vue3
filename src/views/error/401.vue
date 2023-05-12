<template>
  <div class="errPage-container">
    <el-row style="align-items: center">
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">OOPS!</h1>
        <h2>很抱歉，您暂时无法进入该系统...</h2>
        <h6>您没有任何菜单权限，请联系管理员进行权限配置。</h6>
        <el-button type="primary" size="default" @click="logOut" link>
          退出登录
        </el-button>
      </el-col>
      <el-col :span="12">
        <img
          :src="errGif"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import errImage from '@/assets/401_images/401.gif';
import useUserStore from '@/store/modules/user';

const userStore = useUserStore();
const errGif = ref(errImage + '?' + +new Date());

function logOut() {
  userStore.logOut().then(() => {
    location.href = '/';
  });
}
</script>

<style lang="scss" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }
  .pan-gif {
    margin: 0 auto;
    display: block;
  }
  .pan-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }
  .list-unstyled {
    font-size: 14px;
    li {
      padding-bottom: 5px;
    }
    a {
      color: #008489;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
