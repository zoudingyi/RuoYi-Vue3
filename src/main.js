import { createApp } from 'vue';

import '@/assets/styles/index.scss'; // global css

import App from './App';
import store from './store';
import router from './router';
import directive from './directive'; // directive

// 注册插件、组件
import plugins from './plugins'; // plugins
import registerComponents from './utils/registerComponent'; // components

// svg图标
import 'virtual:svg-icons-register';
import SvgIcon from '@/components/SvgIcon';
import elementIcons from '@/components/SvgIcon/svgicon';

import './permission'; // permission control

const app = createApp(App);

app.component('svg-icon', SvgIcon);

app.use(router);
app.use(store);
app.use(plugins);
app.use(registerComponents);
app.use(elementIcons);

directive(app);

app.mount('#app');
