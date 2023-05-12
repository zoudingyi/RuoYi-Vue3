import request from '@/utils/request';

// 获取用户详细信息
export function getUserInfo() {
  return request({
    url: '/oauth2/get_user_info',
    method: 'get'
  });
}

// 获取系统权限id列表
export function getPermissions() {
  return request({
    url: '/permissions',
    method: 'get'
  });
}
