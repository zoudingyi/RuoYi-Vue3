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
    permissions: [],
    allRoles: [
      // {
      //   id: 353,
      //   label: 'admin'
      // }
    ] // 与后端约定的所有角色列表
  }),
  actions: {
    // 登录 oauth2页面会自动存储cookie
    login() {
      location.href = `/oauth2/login?callback=${location.href}`;
    },
    // 获取用户信息
    getInfo() {
      return new Promise(async resolve => {
        let response = null;
        if (!isDev) response = await getUserInfo();
        const data = {
          user: {
            userName: response?.data.name ?? 'developer',
            avatar: response?.data.avatar ?? defAva
          },
          roles: isDev ? ['admin'] : this.rolesMatch(response),
          permissions: ['*:*:*']
        };

        const { user, roles, permissions } = data;
        if (roles && roles.length > 0) {
          // 验证返回的roles是否是一个非空数组
          this.roles = roles;
          this.permissions = permissions;
        } else {
          this.roles = ['common'];
        }
        this.name = user.userName;
        this.avatar = user.avatar;
        resolve(data);
      });
    },
    // 判断用户有哪些角色
    rolesMatch(response) {
      return response.data.role_id_list.map(roleId => {
        const index = this.allRoles.findIndex(item => item.id == roleId);
        if (index != -1) {
          return this.allRoles[index].label;
        }
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
