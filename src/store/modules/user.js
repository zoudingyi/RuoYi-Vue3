import { getToken, removeToken } from '@/utils/auth';
import { getUserInfo } from '@/api/login';
import defAva from '@/assets/images/profile.jpg';
const isDev = import.meta.env.DEV;

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
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
          user: {
            userName: 'admin',
            avatar: defAva
          },
          roles: ['admin'],
          // permissions: ['*:*:*']
          permissions: ['demo:user:page', 'demo:user:add']
        };

        // 生产环境
        if (!isDev) {
          const { data: info } = await getUserInfo();
          const { data: permissionsArr } = await getPermissions();
          this.assignPermissions(permissionsArr);
          userInfo.user.userName = info.name;
          userInfo.roles = ['user'];
          userInfo.permissions = this.fetchPermissions(info.authlist);
        }

        const { user, roles, permissions } = userInfo;
        this.name = user.userName;
        this.avatar = user.avatar;
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
