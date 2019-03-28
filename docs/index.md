# 简介

## 项目构成
VideoOS open由5个项目组成

* [iOS端SDK](http://docs.videojj.com/docs/videoos-ios-sdk) 
* [安卓端SDK](http://docs.videojj.com/docs/videoos-android-sdk) 
* [控制台](http://docs.videojj.com/docs/videoos-console) 
* [服务端](http://docs.videojj.com/docs/videoos-server) 
* [lua小程序](http://docs.videojj.com/docs/videoos-lua-app)

### 移动端SDK
移动端SDK提供用户在自己的移动端APP视频播放器上接入小程序的能力，要求开发者具有一定的移动端开发能力

### 控制台
控制台提供创建小程序，管理投放等日常运营功能

### 服务端
服务端为移动端SDK和控制台提供API

### lua小程序
视频小程序基于[LuaViewSDK](https://github.com/alibaba/LuaViewSDK)，一个小程序由若干lua脚本文件加一个json配置文件组成

!!! note
    如果是使用Video++提供的[云服务](https://os-saas.videojj.com)，只需要接入移动端SDK；如果需要本地化部署，另外需要单独部署服务端和控制台。

## 开源
项目代码已经在github开源：[https://github.com/VideoOS](https://github.com/VideoOS)

## 关于PC Web端
新版本的VideoOS open聚焦移动端开发，暂不支持PC Web端，如果你的产品形态是PC Web，那么请移步[VideoOS 老版本](oldversion.md)

## 快速启动
本地化部署流程相对比较复杂，适用于有一定开发和运维能力的技术团队。为了便于测试，我们提供了 Docker Compose 的快速启动方式，你可以按照以下流程快速搭建一个测试环境。

### 1、安装docker
Centos/RHEL系统执行:
```shell
$ yum install docker docker-compose -y
```

Ubuntu/Debian系统执行:
```shell
$ apt-get install docker docker-compose 
```

### 2、下载启动脚本
```shell
$ git clone https://github.com/VideoOS/VideoOS.git
```

### 3、DNS绑定VideoOS-Open访问的域名或者绑定本地hosts
```shell
$ vim /etc/hosts
```
将OS-Open服务器绑定一个域名，`192.168.x.x`是部署的服务器地址
```
192.168.x.x  demo.os-open.com
```

### 4、设置访问的域名
```shell
$ cd VideoOS/docker
$ vim .env
```
将DOMAIN_NAME后面的域名改成你dns绑定的域名或者本地hosts文件里面绑定的域名
```
DOMAIN_NAME=demo.os-open.com:18080
```

### 5、启动服务
```shell
$ docker-compose up -d 
```

### 6、访问服务
打开浏览器输入绑定的域名：http://demo.os-open.com:18080 
默认账号密码：`admin/admin123`
