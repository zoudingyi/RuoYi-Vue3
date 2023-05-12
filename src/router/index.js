import {
  createWebHistory,
  createWebHashHistory,
  createRouter
} from 'vue-router';
/* Layout */
import Layout from '@/layout';
import useUserStore from '@/store/modules/user';

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/index',
    hidden: true,
    children: [
      {
        path: '/index',
        component: () => import('@/views/index'),
        name: 'Index',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ],
    beforeEnter: (to, from) => {
      // 可做首页路由判断，进入首页自动重定向到某个有权限的路由
      const { permissions } = useUserStore();
      if (permissions.includes('demo:user:page')) {
        return { name: 'Demo1' };
      }
      if (permissions.length === 0) {
        return { path: '/401' };
      }
      return true;
    }
  }
];

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [
  {
    path: '/demo-page',
    component: Layout,
    alwaysShow: true,
    permissions: ['demo:user:page', 'demo:user:edit'], // 可以不设置父级权限，请确保当前权限至少含一个子级权限，不然会单独显示一个父级菜单。
    meta: {
      title: '一级菜单',
      icon: 'user'
    },
    beforeEnter: to => {
      // 导航栏重定向 （由于动态渲染路由，就不能通过redirect重定向到固定路由，可以在这里做条件判断，重定向到拥有权限的路由）
      if (to.fullPath === '/demo-page') {
        const permissions = useUserStore().permissions;
        if (permissions.includes('demo:user:page')) {
          return { name: 'Demo1' };
        }
      }
      return true;
    },
    children: [
      {
        path: 'demo1',
        component: () => import('@/views/demo-page/index'),
        name: 'Demo1',
        permissions: ['demo:user:page'],
        meta: {
          title: '二级菜单1-1',
          icon: 'user'
        }
      },
      {
        path: 'demo2',
        name: 'Demo2',
        permissions: ['demo:user:edit'],
        meta: {
          title: '二级菜单1-2',
          icon: 'user'
        },
        component: () => import('@/views/demo-page/other')
      }
    ]
  }
];

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(), // hash router
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;
