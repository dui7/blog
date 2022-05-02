### 使用nexus搭建maven私服

>Nexus优点为什么要构建Nexus私服？好处列几点：Nexus在代理远程仓库的同时维护本地仓库，以降低中央仓库的负荷,节省外网带宽和时间，Nexus私服就可以满足这样的需要。Nexus是一套“开箱即用”的系统不需要数据库，它使用文件系统加Lucene来组织数据。Nexus使用ExtJS来开发界面，利用Restlet来提供完整的REST APIs，并能通过插件和各种IDE集成。Nexus支持WebDAV与LDAP安全身份认证。Nexus还提供了强大的仓库管理功能，构件搜索功能，它基于REST，提供友好的UI，占用较少的内存，基于简单文件系统而非数据库。
#### 安装环境 系统：Ubuntu16.04 LTS 
#### 前置条件：
>1.安装jdk
>2.nexus仓库管理器，分为两个版本，Nexus Repository Manager OSS 和 Nexus Repository Manager Pro。前者可以免费使用，相比后者，功能缺少一些，但是不影响我们搭建maven私服。所以就选择OSS版本。软件下载地址：[nexus官网下载地址](https://www.sonatype.com/download-oss-sonatype)
>选择Ubuntu的版本进行下载
![nexus01](http://www.ruciya.com/upload/2020/04/nexus01-ac28c0a2cd524731b175ae15facec375.png)
### 正式安装
1. 解压下载好的nexus，解压到/usr/local目录下。
![nexus03](http://www.ruciya.com/upload/2020/04/nexus02-9158ca43d87b4fae9b285c4e878ce389.png)
![nexus03](http://www.ruciya.com/upload/2020/04/nexus03-cae8d62cad564b2bbec893a8ce3e73da.png)
2. 建立软链接
![nexus04](http://www.ruciya.com/upload/2020/04/nexus04-60bca6f2468946c3ba215291db8f573f.png)
3. 配置环境变量
`sudo vim /etc/profile`
![nexus05](http://www.ruciya.com/upload/2020/04/nexus05-d025adddb6f743f1a21b9cd9d5477b4f.png)
重启环境变量
`source /etc/profile`
查看是否配置成功
`echo $NEXUS_HOME`
![nexus06](http://www.ruciya.com/upload/2020/04/nexus06-8a2b864524f94bc780faa3d4cc69cb34.png)

4. 为防止端口冲突，进入nexus/etc文件修改配置文件nexus-default.properties
![nexus07](http://www.ruciya.com/upload/2020/04/nexus07-36a97a5acdb94cffbd65e94bb27d13fa.png)
默认端口为8081，在此将端口8081修改为9696
![nexus08](http://www.ruciya.com/upload/2020/04/nexus08-e357442ee13748229e72b3f72377879a.png)

5. 若是你的jdk环境变量是自己安装的，需更改jdk目录，修改/bin/nexus
![nexus09](http://www.ruciya.com/upload/2020/04/nexus09-b37162b0395b487b9d28f787166fc97a.png)
打开后，在INSTALL4J_JAVA_HOME_OVERRIDE = "填写安装jdk的目录"，并把#注释打开
![nexus10](http://www.ruciya.com/upload/2020/04/nexus10-8d7e183344a74f48995ac03335c39a12.png)
6. 在bin目录下执行
`./nexus start` //开启
`./nexus stop` //停止
`./nexus restart` //重启
![nexus11](http://www.ruciya.com/upload/2020/04/nexus11-dd16bb093c774ac1a263fd708364767a.png)
启动成功，打开浏览器可以访问。
![nexus12](http://www.ruciya.com/upload/2020/04/nexus12-0aa9fce133404e219408fd98ebeead3c.png)
7. 账号admin，密码admin123，进行登录。