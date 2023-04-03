import request from '@/utils/request';

// 获取用户详细信息
export function getUserInfo() {
  return request({
    url: '/oauth2/get_user_info',
    method: 'get'
  });
}

export function getApps(params) {
  return request({
    url: '/app',
    method: 'get',
    params
  });
}
