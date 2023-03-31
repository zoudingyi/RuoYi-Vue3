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

<style lang="scss" scoped></style>
