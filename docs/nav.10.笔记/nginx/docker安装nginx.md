# Docker安装nginx  
查询nginx版本  
`docker search nginx`  
拉取最新的nginx版本镜像  
`docker pull nginx`  

## 创建挂载目录  
`mkdir -p /data/nginx/html /data/nginx/conf /data/nginx/logs`   

## 启动一个有挂载目录的镜像  
`docker run -d -p 80:80 --name nginx -v /data/nginx/html:/usr/share/nginx/html -v /data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /data/nginx/logs:/var/log/nginx nginx  
`
> -p 80:80： 将容器的 80 端口映射到主机的 80 端口。  
> --name nginx：将容器命名为 nginx。  
> /data/nginx/html:/usr/share/nginx/html：将我们自己创建的 /data/nginx/html 目录挂载到容器的 /usr/share/nginx/html。  
> /data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf：将我们自己创建的 nginx.conf 挂载到容器的 /etc/nginx/nginx.conf。  
> /data/nginx/logs:/var/log/nginx：将我们自己创建的 logs 挂载到容器的 /var/log/nginx。  
  
## 修改配置文件  
打开nginx.conf  
`sudo vi /data/nginx/conf/nginx.conf`  
内容如下：  
```
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```
在http{}里的最后面加入   
>站点目录为上面自己nginx,把所有的静态网页放到这里就可以访问了。  
```
#下面是server虚拟主机的配置
 server
  {
    listen 80;#监听端口
    server_name localhost;#域名
    index index.html index.htm;
    root /usr/share/nginx/html;#站点目录
  }

```
## 修改成功后重启nginx容器  
`docker restart nginx`  
把前端的静态文件放到/data/nginx/html 下就可以访问了。  