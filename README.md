# chat-server

使用socket.io搭建一个即使通讯服务的demo。客户端端使用`Vite2 + Vue3 + socket.io-client`，后端使用`express4 + socket.io`。该仓库是**服务端源**码仓库。

- [客户端源码](https://github.com/nikolausliu/chat-app)
- [服务端源码](https://github.com/nikolausliu/chat-server)
- [在线访问](https://nikolausliu.top/chat-app/)

目前实现的功能很简单：

- [x] 所有访问这个项目的用户默认进入同一个房间
- [x] 所有用户进入房间后，socketId作为他的昵称，同时从项目的头像池里随机取一个头像作为他的头像
- [x] 用户进入房间和离开房间后向所有用户广播
- [x] 所有进入房间的用户都可以发送消息，消息会向所有用户广播
- [x] 目前只能发文字

因为写这个demo的目的就是想看下socket是怎么玩得，所以只实现了最简单的功能，我现在能想到的一些功能比如：

- [ ] 实现用户注册登录
- [ ] 用户搜索
- [ ] 用户有好友列表，并能添加其它用户为好友
- [ ] 可以和好友发起聊天
- [ ] 可以创建群聊和销毁群聊
- [ ] 聊天记录同步

先占坑吧，以后有时间再慢慢实现吧，最近太忙了。

# 部署

另外值得一提的是部署。客户端和服务端代码都通过github actions完成，可以直接在`.github/workflows`中查看对应的`yml`配置文件

客户端是部署在`gh-pages`分支上，这是github赋予所有仓库的能力，不了解gh-pages的可以自己搜一下了解下是怎么回事。整个部署的流程大概是：

- 配置pnpm环境(第三方action pnpm/action-setup@v2.1.0)
- 代码检出(第三方action actions/checkout@v2)
- 安装依赖(pnpm i)
- 构建代码(pnpm build)
- 把构建产物部署到gh-pages分支(第三方action peaceiris/actions-gh-pages@v3)

部署完成后就可以通过`https://nikolausliu.github.io/chat-app`访问了，我把我的域名`nikolausliu.top`解析到了我的阿里云服务器公网IP，然后在服务器里通过nginx配置了代理，把域名转发到`nikolasuliu.top`，所以我的这个项目也可以通过`https://nikolausliu.top/chat-app`来访问了。

服务端是部署在了我的阿里云服务器，部署的大致流程是：

- 代码检出
- 设置node版本
- 我这个express服务不需要构建，所以把需要的源码文件上传到阿里云服务器指定文件夹(第三方action appleboy/scp-action@master)
- ssh远程连接阿里云服务器，cd进目标目录，安装依赖并重启pm2(第三方action appleboy/ssh-action@master)


