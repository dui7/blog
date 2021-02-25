### Docker安装nginx并设置挂载目录到宿主机  
查询nginx版本  
`docker search nginx`  
拉取nginx1.16版本镜像  
`docker pull nginx:1.16`  
启动镜像生成容器  
`docker run --name nginx-test -p 80:80 -d nginx`  
创建挂载目录  
`mkdir -p /data/static /data/nginx/conf`  
复制容器里的conf到宿主机。6dd4380ba708为CONTAINER ID  
`docker cp 6dd4380ba708:/etc/nginx/nginx.conf /data/nginx/conf/nginx.conf`  
停止容器  
`docker stop 6dd4380ba708`  
删除容器  
`docker rm 6dd4380ba708`  
重新启动一个有挂载目录的镜像  
`docker run -d -p 80:80 --name visi-nginx -v /data/static:/usr/share/nginx/html -v /data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf -v /data/nginx/logs:/var/log/nginx nginx  
`
> -p 80:80： 将容器的 80 端口映射到主机的 80 端口。  
> --name visi-nginx：将容器命名为 visi-nginx。  
> /data/static:/usr/share/nginx/html：将我们自己创建的 /data/static 目录挂载到容器的 /usr/share/nginx/html。  
> /data/nginx/conf/nginx.conf:/etc/nginx/nginx.conf：将我们自己创建的 nginx.conf 挂载到容器的 /etc/nginx/nginx.conf。  
> /data/nginx/logs:/var/log/nginx：将我们自己创建的 logs 挂载到容器的 /var/log/nginx。  
  
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

把前端的静态文件放到/data/staic 下就可以访问了。  