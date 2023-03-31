import tab from './tab';
import auth from './auth';
import cache from './cache';
import modal from './modal';
import download from './download';

export default function installPlugins(app) {
  // 页签操作
  app.config.globalProperties.$tab = tab; // Options API
  app.provide('$tab', tab); // Composition API
  // 认证对象
  app.config.globalProperties.$auth = auth;
  app.provide('$auth', auth);
  // 缓存对象
  app.config.globalProperties.$cache = cache;
  app.provide('$cache', cache);
  // 模态框对象
  app.config.globalProperties.$modal = modal;
  app.provide('$modal', modal);
  // 下载文件
  // app.config.globalProperties.$download = download
}
