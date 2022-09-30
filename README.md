# ruoyi-admin-template

> 这是一个基于[RuoYi-Vue3](https://github.com/yangzongzhuan/RuoYi-Vue3)简化后的 vue admin 管理后台。它根据我司使用情况简化，只包含了搭建后台一些必要的东西，登录改为 oauth2 登录。

## 平台简介

- 本仓库为前端技术栈 [Vue3](https://v3.cn.vuejs.org) + [Element Plus](https://element-plus.org/zh-CN) + [Vite](https://cn.vitejs.dev) 版本。
- 配套后端代码仓库地址[RuoYi-Vue](https://gitee.com/y_project/RuoYi-Vue) 或 [RuoYi-Vue-fast](https://github.com/yangzongzhuan/RuoYi-Vue-fast) 版本。
- 前端技术栈（[Vue2](https://cn.vuejs.org) + [Element](https://github.com/ElemeFE/element) + [Vue CLI](https://cli.vuejs.org/zh)），请移步[RuoYi-Vue](https://gitee.com/y_project/RuoYi-Vue/tree/master/ruoyi-ui)。

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

## 登录说明

线上使用 oauth2 登录。本地调试的时候在根目录新建 .env.development.local 文件，并填上自己的 token

```
# your key

VITE_APP_TOKEN = ''
```

文档地址：http://doc.ruoyi.vip
