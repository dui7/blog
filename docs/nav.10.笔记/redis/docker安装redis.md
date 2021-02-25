# docker安装redis   
在根目录下创建挂载目录  
```shell  
mkdir -p /docker/redis/{conf,data}  
```  
进入到挂载目录  
```shell  
cd /docker/redis  
```  
拉取镜像，可根据自己所需拉取，我拉取的是我目前最新的  
```shell  
docker pull redis  
```  
运行镜像，生成容器  
```shell
docker run -d --privileged=true -p 6379:6379 -v $pwd/conf/redis.conf:/etc/redis/redis.conf -v $pwd/data:/data --name redis redis redis-server /etc/redis/redis.conf --appendonly yes
```

>$pwd指当前的目录  
>-v 挂载
>--privileged=true 授予权限   
>--appendonly yes 持久化数据