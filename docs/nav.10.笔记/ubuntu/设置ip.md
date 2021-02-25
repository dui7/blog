# Ubuntu配置ip地址

1. 修改为静态ip，打开配置文件
```
sudo vim /etc/network/interfaces
```
```shell
 auto eth0
 iface eth0 inet static
 address 192.168.1.110  #配置没有被使用的ip地址
 netmask 255.255.255.0
 gateway 192.168.1.1 #写入网关地址
 dns-nameservers 8.8.8.8 #写dns解析地址
```
>eth0为网卡号


2. 执行重启命令,有可能不好使，可以重启电脑
```
 /etc/init.d/networking restart
```

3. 若设置ip成功访问不了外网，但是可以访问外网ip则编辑resolv.conf

```
sudo vim /etc/resolv.conf
```
4. 输入以下内容
```shell
nameserver 8.8.8.8      //google的域名解析服务器
nameserver 114.114.114.114   //联通的域名解析服务器
```
