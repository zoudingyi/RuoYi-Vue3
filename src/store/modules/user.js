import { getToken, removeToken } from '@/utils/auth';
import { getUserInfo, getPermissions } from '@/api/login';
const isDev = import.meta.env.DEV;

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '',
    roles: [],
    permissions: [], // 用户当前拥有的权限
    allPermissions: [
      {
        id: 0,
        key: 'demo', // 主页（与后端约定的key）
        permission: 'demo:user:page' // 自定义权限名称
      }
    ] // 权限系统设定的所有权限
  }),
  actions: {
    // 登录 oauth2页面会自动存储cookie
    login() {
      location.href = `/oauth2/login?callback=${location.href}`;
    },
    // 获取用户信息
    getInfo() {
      return new Promise(async resolve => {
        const userInfo = {
          userName: 'admin',
          roles: ['admin'],
          // permissions: ['*:*:*'] // 超级管理权限
          permissions: ['demo:user:page', 'demo:user:edit'] // 开发中可自行配置权限进行测试
        };

        // 生产环境 （需要测试生产环境流程可以删掉这层if判断）
        if (!isDev) {
          const { data: info } = await getUserInfo();
          const { data: permissionsArr } = await getPermissions();
          this.assignPermissions(permissionsArr); // 如果后端没有做获取权限id的接口则取消这一步，并把权限系统对应的权限id配置在allPermissions里
          userInfo.userName = info.name;
          userInfo.roles = ['user']; // 权限系统都是页面和功能级别的权限，暂时不用roles
          userInfo.permissions = this.fetchPermissions(info.authlist);
        }

        const { userName, roles, permissions } = userInfo;
        this.name = userName;
        this.roles = roles;
        this.permissions = permissions;
        resolve(userInfo);
      });
    },
    // 根据用户拥有的权限ID获取相应的页面权限
    fetchPermissions(permissionIDs) {
      const permissions = [];
      this.allPermissions.forEach(item => {
        if (permissionIDs.includes(item.id)) {
          permissions.push(item.permission);
        }
      });
      return permissions;
    },
    // 获取权限对应的ID并赋值（由于ID可能会变，所以要从后端获取具体ID）
    assignPermissions(permissions) {
      this.allPermissions.forEach(item => {
        item.id = permissions[item.key];
      });
    },
    // 退出系统
    logOut() {
      return new Promise(resolve => {
        this.token = '';
        this.roles = [];
        this.permissions = [];
        removeToken();
        resolve();
      });
    }
  }
});

export default useUserStore;
