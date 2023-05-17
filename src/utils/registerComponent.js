import Cookies from 'js-cookie';
import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn'; // 中文语言
import 'element-plus/dist/index.css';

// 全局组件
import Tooltip from '@/components/Tooltip';
import SearchForm from '@/components/SearchForm';
import BaseTable from '@/components/BaseTable';
import Pagination from '@/components/Pagination';
import PrimarySearch from '@/components/PrimarySearch';
import PrimaryContainer from '@/components/PrimaryContainer';

export default function installComponents(app) {
  // 使用element-plus 并且设置全局的大小
  app.use(ElementPlus, {
    locale: locale,
    // 支持 large、default、small
    size: Cookies.get('size') || 'default'
  });

  // 全局组件挂载
  app.component('Tooltip', Tooltip);
  app.component('SearchForm', SearchForm);
  app.component('BaseTable', BaseTable);
  app.component('Pagination', Pagination);
  app.component('PrimarySearch', PrimarySearch);
  app.component('PrimaryContainer', PrimaryContainer);
}
