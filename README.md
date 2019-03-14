## VideoOS
开源视频小程序 http://videojj.com/videoos-open/

### 项目构成
VideoOS open由5个项目组成 
- VideoOS iOS端SDK：[VideoOS-iOS-SDK](https://github.com/VideoOS/VideoOS-iOS-SDK)
- VideoOS 安卓端SDK：[VideoOS-Android-SDK](https://github.com/VideoOS/VideoOS-Android-SDK)
- VideoOS 控制台：[VideoOS-console](https://github.com/VideoOS/VideoOS-console)
- VideoOS 服务端：[VideoOS-server](https://github.com/VideoOS/VideoOS-server)
- VideoOS lua小程序：[VideoOS-lua-app](https://github.com/VideoOS/VideoOS-lua-app)


移动端SDK提供用户在自己的移动端APP视频播放器上接入小程序的能力，要求开发者具有一定的移动端开发能力；控制台提供创建小程序，管理投放等日常运营功能；服务端为移动端SDK和控制台提供API。
如果是使用Video++提供的云服务，只需要接入移动端SDK；如果需要本地化部署，另外需要单独部署服务端和控制台。

---

### VideoOS快速启动
```
1、安装docker
# Centos/RHEL系统执行:
shell> yum install docker docker-compose -y 

# Ubuntu/Debian系统执行:
shell> apt-get install docker docker-compose 


2、下载启动脚本

shell> git clone https://github.com/VideoOS/VideoOS.git

3、DNS绑定VideoOS-Open访问的域名或者绑定本地hosts

shell> vim /etc/hosts
# 将OS-Open服务器绑定一个域名
# 192.168.x.x 是部署的服务器地址

192.168.x.x  demo.os-open.com

4、设置访问的域名

shell> cd VideoOS/docker
shell> vim .env
# 将DOMAIN_NAME后面的域名改成你dns绑定的域名或者本地hosts文件里面绑定的域名

DOMAIN_NAME=demo.os-open.com:18080

5、启动服务

shell> docker-compose up -d 

6、访问服务
# 打开浏览器输入绑定的域名：http://demo.os-open.com:18080
# 默认账号密码：admin/admin123
```
