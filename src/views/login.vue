<template>
  <div
    v-loading.fullscreen.lock="true"
    element-loading-text="正在进行OAuth2登录..."
    element-loading-background="#2d3a4b"
  ></div>
</template>

<script setup>
import useUserStore from '@/store/modules/user';
import { setToken } from '@/utils/auth';

const userStore = useUserStore();
const router = useRouter();
const redirect = ref(undefined);
const isDev = import.meta.env.DEV;
const token = import.meta.env.VITE_APP_TOKEN;

function oauth2Login() {
  console.log('object :>> ', isDev, token);
  if (isDev) {
    setToken(token);
    router.push({ path: redirect.value || '/' });
  } else {
    // 调用action的登录方法
    userStore.login();
  }
}
oauth2Login();
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('../assets/images/login-background.jpg');
  background-size: cover;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 40px;

    input {
      height: 40px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 40px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 40px;
  padding-left: 12px;
}
</style>
