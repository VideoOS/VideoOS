### 1、安装docker
Centos/RHEL系统执行:
```shell
$ yum install docker docker-compose -y
```

Ubuntu/Debian系统执行:
```shell
$ apt-get install docker docker-compose 
```
## 2、下载启动脚本
```shell
$ git clone https://github.com/VideoOS/VideoOS.git
```

## 3、DNS绑定VideoOS-Open访问的域名或者绑定本地hosts
```shell
$ vim /etc/hosts
```
将OS-Open服务器绑定一个域名，`192.168.x.x`是部署的服务器地址
```
192.168.x.x  demo.os-open.com
```

## 4、设置访问的域名
```shell
$ cd VideoOS/docker
$ vim .env
```
将DOMAIN_NAME后面的域名改成你dns绑定的域名或者本地hosts文件里面绑定的域名
```
DOMAIN_NAME=demo.os-open.com:18080
```

## 5、启动服务
```shell
$ docker-compose up -d 
```

## 6、访问服务
打开浏览器输入绑定的域名：http://demo.os-open.com:18080 
默认账号密码：`admin/admin123`
