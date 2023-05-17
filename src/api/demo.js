import request from '@/utils/request';

export function getRemoteAPI(data) {
  return new Promise(resolve => {
    console.log('data :>> ', data);
    const respones = {
      data: {
        list: [
          {
            id: 1,
            pos: 1,
            points: '25',
            rider: 'Alex RINS',
            riderDetails:
              'Álex Rins Navarro is a Spanish Grand Prix motorcycle racer for the LCR Honda Castrol in the MotoGP class.',
            number: 42,
            nation: 'SPA',
            team: 'Team SUZUKI ECSTAR',
            bike: 'SUZUKI',
            totaltime: "41'22.250",
            kmh: '156.8',
            date: '2022-11-06T15:24:31.641987+08:00'
          },
          {
            id: 2,
            pos: 2,
            points: '20',
            rider: 'Brad BINDER',
            number: 33,
            nation: 'RSA',
            team: 'Red Bull KTM Factory Racing',
            bike: 'KTM',
            totaltime: "41'22.646",
            kmh: '156.8',
            date: '2022-11-06T15:24:31.641987+08:00'
          },
          {
            id: 3,
            pos: 3,
            points: '16',
            rider: 'Jorge MARTIN',
            number: 89,
            nation: 'SPA',
            team: 'Prima Pramac Racing',
            bike: 'DUCATI',
            totaltime: "41'23.309",
            kmh: '156.7',
            date: '2022-11-06T15:24:31.641987+08:00'
          },
          {
            id: 4,
            pos: 4,
            points: '13',
            rider: 'Fabio QUARTARARO',
            number: 20,
            nation: 'FRA',
            team: 'Monster Energy Yamaha MotoGP',
            bike: 'YAMAHA',
            totaltime: "41'24.161",
            kmh: '156.7',
            date: '2022-11-06T15:24:31.641987+08:00'
          }
        ],
        total: 4
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
