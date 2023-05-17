# manage-system-template

![Node.js v16](https://img.shields.io/badge/node->=16-green.svg)

管理系统

> 这是一个基于[RuoYi-Vue3](https://github.com/yangzongzhuan/RuoYi-Vue3)二次开发的管理系统，使用 Vue3 & Vite、Pinia、Element Plus 开发。它根据我司使用情况简化成系统模板，只包含了搭建后台一些必要的基础功能，登录改为 oauth2 登录。

## 登录说明

### 开发登录

打开线上地址登录 oauth2 后获取 token。本地调试的时候在根目录新建 .env.development.local 文件，复制下面的代码进去，并把获取到的 token 填到 VITE_APP_TOKEN 里即可。（如果当前 cookie 里存了过期的 token 记得先删除）

```javaScript
# your key

VITE_APP_TOKEN = ''
```

### 线上登录

线上登录会通过跳转 oauth2 页面自动获取 token，不需要做任何改动。

## 前端运行

```bash
# 克隆项目
git clone https://github.com/zoudingyi/RuoYi-Vue3

# 进入项目目录
cd RuoYi-Vue3

# 安装依赖
yarn

# 启动服务
yarn dev
```

## 编译打包

```bash
# 构建生产环境
yarn build:prod

# 构建测试环境
yarn build:stage

# 格式化代码
yarn lint
```

更多说明请看：[文档地址](http://doc.ruoyi.vip)
