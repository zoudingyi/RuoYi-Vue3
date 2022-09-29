import { getToken, setToken, removeToken } from '@/utils/auth';
import defAva from '@/assets/images/profile.jpg';

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  }),
  actions: {
    // 登录
    login() {
      // oauth2页面会自动存储cookie
      location.href = `/oauth2/login?callback=${location.href}`;
      // return new Promise((resolve) => {
      //   setToken(res.token);
      //   this.token = res.token;
      //   resolve();
      // });
    },
    // 获取用户信息
    // getInfo() {
    //   return new Promise((resolve, reject) => {
    //     getInfo().then(res => {
    //       const user = res.user
    //       const avatar = (user.avatar == "" || user.avatar == null) ? defAva : import.meta.env.VITE_APP_BASE_API + user.avatar;

    //       if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         this.roles = res.roles
    //         this.permissions = res.permissions
    //       } else {
    //         this.roles = ['ROLE_DEFAULT']
    //       }
    //       this.name = user.userName
    //       this.avatar = avatar;
    //       resolve(res)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    getInfo() {
      return new Promise(resolve => {
        const res = {
          user: {
            admin: true,
            userName: 'zdy',
            avatar: ''
          },
          roles: ['admin', 'common'],
          permissions: ['*:*:*']
        };
        const { user } = res;
        const avatar =
          user.avatar == '' || user.avatar == null
            ? defAva
            : import.meta.env.VITE_APP_BASE_API + user.avatar;

        if (res.roles && res.roles.length > 0) {
          // 验证返回的roles是否是一个非空数组
          this.roles = res.roles;
          this.permissions = res.permissions;
        } else {
          this.roles = ['ROLE_DEFAULT'];
        }
        this.name = user.userName;
        this.avatar = avatar;
        resolve(res);
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
