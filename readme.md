# 木鱼功德网 服务端 [KOA2][MySQL][Redis]

[![zzCq7d.png](https://s1.ax1x.com/2022/12/27/zzCq7d.png)](https://imgse.com/i/zzCq7d)

## 20250716更新
今天上了下github看到这个项目，怎么也想不通我大学时候怎么会弄出这么无聊的项目，我也是无语了...

## 关联前端项目
+ GitLab: https://gitlab.com/xcfstudio/woodfish-app
+ GitHub: https://github.com/xcfstudio/woodfish-app
+ Gitee: https://gitee.com/xcfstudio/woodfish-app

## 前言
本项目是作者的创作型实验项目，旨在打造干净、清爽的小而美的应用。本项目主要功能是积分制敲木鱼，并进行排行，多用户在线敲木鱼功德系统， 基于Koa2开发。数据使用`MySQL`存储，`Redis`做缓存，提高性能。

注: windows用户必须在`gitbash`中运行脚本, 不然会出错。如无法正常执行脚本, 请自行阅读脚本, 根据脚本内容手动操作。

## 启动项目

### 安装依赖
```shell
# npm
npm install

# yarn
yarn install
```

### 配置数据库

1. 搭建redis、mysql环境:
可通过docker搭建，也可直接安装
2. 修改项目配置文件:
   配置文件位于`项目根目录/config`, 修改`mySQL.ts`与`redis.ts`, 使其符合当前环境
3. 创建数据库: 手动建立名称为`woodfish`的数据库。SQL语句示例: `CREATE SCHEMA 'woodfish' ;`

### 调试项目
**生成密钥:**

执行脚本文件: 
```shell
sh ./secretKey/genSecretKey.sh
```
或拷贝已有的密钥至此文件夹, 根据脚本内的文件名进行命名。


**启动调试：**
```shell
  npm run dev
```
  开发模式, 基于`nodemon`,  文件发生改动自动重启服务。配置文件在`项目根目录/nodemon.json`

**同步模型:**

 `GET`请求`/api/system/syncmodels`, 数秒后完成模型同步。此接口只能访问一次便锁定, 若需再次同步，需删除`项目根目录/tag/db.lock`

### 编译
```shell
npm run build
```
编译结果在`dist`目录中生成, 脚本会在编译结果中生成密钥, 如不需要可修改`项目根目录/build.sh`, 或自行替换编译结果中的密钥

### 生产环境
```shell
npm run production
```
注: 此命令需要编译后再运行

使用`pm2`开多进程, web进程默认开6个, 定时任务开一个。

项目内置了`pm2`, 但是建议全局安装一个`pm2`:
```shell
sudo npm i pm2 -g
```

**`pm2`常用指令：**
[`pm2`官方文档](https://www.npmjs.com/package/pm2)

## 关于作者

Eric Xie，前端开发者与工业设计师，擅长TS全栈开发、UI设计。个人网站：[https://xiecangfeng.com](https://xiecangfeng.com)
