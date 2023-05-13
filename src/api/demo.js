import request from '@/utils/request';

export function getRemoteAPI(data) {
  return new Promise(resolve => {
    console.log('data :>> ', data);
    const respones = {
      data: {
        list: [
          {
            created_at: '2023-05-13T15:24:31.641987+08:00',
            created_by_name: '',
            updated_at: '2023-05-13T16:20:18.187529+08:00',
            updated_by_name: '彭峰',
            group_id: 0,
            company_id: 0,
            DeletedAt: null,
            id: '1349675548930346',
            name: 'Gayan Prasanga',
            status: 'ACTIVE',
            daily_limit: 50,
            card_num: 1,
            advertiser_by: 2194,
            advertiser_by_name: '合作方',
            currency: 'USD',
            limit_type: 3,
            time_zone_name: 'Asia/Colombo',
            time_zone: 5,
            remark: '',
            businesses: null
          },
          {
            created_at: '2023-05-13T15:24:27.545243+08:00',
            created_by_name: '',
            updated_at: '2023-05-13T15:24:27.545243+08:00',
            updated_by_name: '',
            group_id: 0,
            company_id: 0,
            DeletedAt: null,
            id: '715535746544356',
            name: 'Sajjad Malik',
            status: 'ACTIVE',
            daily_limit: 50.83344912512059,
            currency: 'PKR',
            limit_type: 3,
            time_zone_name: 'Asia/Karachi',
            time_zone: 5,
            remark: '',
            businesses: null
          }
        ],
        total: 2
      },
      no: 0
    };
    setTimeout(() => {
      resolve(respones);
    }, 1000);
  });
}

export function getList(data) {
  return request({
    url: '/ads/list',
    method: 'post',
    data
  });
}
