import tab from './tab';
import auth from './auth';
import cache from './cache';
import modal from './modal';
// import download from './download';
// import { download } from '@/utils/request';

// 全局方法挂载
export default function installPlugins(app) {
  // 页签操作
  app.config.globalProperties.$tab = tab; // Options API写法 this调用
  app.provide('$tab', tab); // Composition API写法，用provide、inject方法实现全局调用 尽量避免使用getCurrentInstance().proxy  https://github.com/vuejs/vue/issues/12596
  // 认证对象
  app.config.globalProperties.$auth = auth;
  app.provide('$auth', auth);
  // 缓存对象
  app.config.globalProperties.$cache = cache;
  app.provide('$cache', cache);
  // 模态框对象
  app.config.globalProperties.$modal = modal;
  app.provide('$modal', modal);

  // TODO 下载文件
  // app.config.globalProperties.$download = download
  // app.config.globalProperties.download = download;
}
