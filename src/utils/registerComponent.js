import Cookies from 'js-cookie';
import ElementPlus from 'element-plus';
import { ElMessage } from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn'; // 中文语言

// 分页组件
import Pagination from '@/components/Pagination';

import { download } from '@/utils/request';

export default function installComponents(app) {
  // 使用element-plus 并且设置全局的大小
  app.use(ElementPlus, {
    locale: locale,
    // 支持 large、default、small
    size: Cookies.get('size') || 'default'
  });

  // 全局组件挂载
  app.component('Pagination', Pagination);

  // 全局方法挂载 Options API写法 this调用
  app.config.globalProperties.download = download;

  // Composition API写法，用provide、inject方法实现全局调用 尽量避免使用getCurrentInstance().proxy  https://github.com/vuejs/vue/issues/12596
  app.provide('$message', ElMessage);
}