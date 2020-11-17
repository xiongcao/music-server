# koa2-sequelize-rest

## 简介
<br/> 

### 1.简述
- 使用koa + sequelize + mysql搭建的 Node 后端 REST风格 的脚手架。
- 对实体、接口请求、响应数据等，都进行了封装，加入了登录校验、密码加密、swagger等功能。

### 2.技术栈
- **koa2：** Koa 是一个新的 web 框架，由 Express 幕后的原班人马打造， 致力于成为 web 应用和 API 开发领域中的一个更小、更富有表现力、更健壮的基石。 通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。 Koa 并没有捆绑任何中间件， 而是提供了一套优雅的方法，帮助您快速而愉快地编写服务端应用程序。

- **sequelize：**  Sequelize 是一个基于 promise 的 Node.js ORM, 目前支持 Postgres, MySQL, MariaDB, SQLite 以及 Microsoft SQL Server. 它具有强大的事务支持, 关联关系, 预读和延迟加载,读取复制等功能。

- **crypto：** 提供了加密功能，包括对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。

- **nunjucks：** JavaScript 专用的功能丰富、强大的模板引擎。

### 3.项目目录
```bash
├── controllers                                # 控制器层，处理请求、响应数据
    ├── IndexController.js                     # 首页-请求页面
    ├── LoginController.js                     # 登录-处理登录、注册、cookies、session
├── db                                         # 数据库相关配置
    ├── config-default.js                      # 数据库默认配置
    ├── config-override.js                     # 生产环境数据库配置
    ├── config-test.js                         # 开发环境数据库配置
    ├── config.js                              # 整合生产与开发的数据库配置
    ├── db.js                                  # 数据模型实例公共字段处理
    ├── init-db.js                             # 数据实例与数据库字段映射处理
    ├── model.js                               # 数据实例与数据库字段映射处理
├── models                                     # 数据库表-模型实例的关系映射
    ├── User.js                                # 用户实例
├── public                                     # swagger-ui
├── service                                    # 业务层，操作数据库，处理数据
    ├── UserService.js                         # 处理用户的业务数据
├── static                                     # 资源文件，包括img、js、css、icon静态文件
    ├── css
    ├── images
    ├── js
├── utils                                      # 工具函数
├── views                                      # 页面
    ├── base.html                              # 页面主结构，包括公共文件、头部、尾部，其他页面只需继承此页面即可
    ├── index.html                             # 首页，商品相关
    ├── register.html                          # 注册页
    ├── signin.html                            # 登录页
├── .gitignore                                 # git提交限制
├── app.js                                     # 程序主文件
├── controller.js                              # 处理控制器的中间件
├── package.json                               # 项目依赖
├── README.md                                  # 项目介绍
├── rest.js                                    # 处理响应的中间件
├── static-files.js                            # 处理静态文件的中间件
├── templating.js                              # 处理模板引擎的中间件
```
 
 ## 待完善
 - 权限管理、路由拦截；
 - 定义全局的状态及状态码，如成功、未找到、未登录、无权限等等；
 - WebSocket通信。

## 使用
<br/>

### 1.克隆

``` bash
  git clone git@github.com:xiongcao/koa2-sequelize-rest.git
```

### 2.下载相关依赖

``` bash
  yarn
```

or

``` bash
  npm i
```
### 3.运行

``` bash
  yarn dev
```