# manage-system

![Node.js v16](https://img.shields.io/badge/node->=16-green.svg)

管理系统

> 这是一个基于[RuoYi-Vue3](https://github.com/yangzongzhuan/RuoYi-Vue3)简化后的 vue admin 管理后台。它根据我司使用情况简化，只包含了搭建后台一些必要的东西，登录改为 oauth2 登录。

## 登录说明

### 开发登录

打开 [oauth2 页面](https://oauth2.mundossp.com/adm/#/admin/password)。登录并获取个人信息里的 key（或者去线上地址登录后获取 token）。本地调试的时候在根目录新建 .env.development.local 文件，复制下面的代码，并把自己的 key 填到 VITE_APP_TOKEN 里即可。

```
# your key

VITE_APP_TOKEN = ''
```

### 线上登录

线上登录会通过跳转 oauth2 页面自动获取 token 然后登录，不需要做任何改动。

## 前端运行

```bash
# 克隆项目
git clone https://github.com/zoudingyi/RuoYi-Vue3

# 进入项目目录
cd RuoYi-Vue3

# 安装依赖
yarn --registry=https://registry.npmmirror.com

# 启动服务
yarn dev

# 构建测试环境 yarn build:stage
# 构建生产环境 yarn build:prod
# 前端访问地址 http://localhost:80
```

更多说明请看：[文档地址](http://doc.ruoyi.vip)
