# Docker安装Jenkins

1. 拉取镜像  
`docker pull jenkins`  
2. 在宿主机创建目录/data/jenkins/  
`sudo mkdir -p /data/jenkins`  
3. 修改目录权限  
`sudo chown -R 1000 /data/jenkins/`  
4. 运行镜像  
`sudo docker run -itd -p 7070:8080 -p 50000:50000 --name jenkins --privileged=true  -v /data/jenkins:/var/jenkins_home jenkins`  
5. 查看密码  
`cat /data/jenkins/secrets/initialAdminPassword`  
![docker_jenkins_01](/assets/note/jenkins/docker_jenkins_01-9b6cc6695fdd4b6ea7ed5bb5f6ef0b78.png)  
6. 登录ip:7070,输入密码，点击Continue  
![docker_jenkins_03](/assets/note/jenkins/docker_jenkins_03-28aabaebe2b34d25926308fbf806f6e9.png)  
7. 我不默认安装插件，所以点X关闭，要是默认安装，选择Install suggested plugins  
![docker_jenkins_02](/assets/note/jenkins/docker_jenkins_02-90cf9993bdf247d6b583ca0390c8080b.png)  
# 更新为最新版本  
1. 将下载好的jenkins.war 放在宿主机/data/jenkins/目录下  
![docker_jenkins_04](/assets/note/jenkins/docker_jenkins_04-1bb6b615d4f64dd689df0276d2385214.png)  
2. 进入容器  
`docker exec -it -u root 69bf3354fade bash`  
>69bf3354fade为容器id  
3. 查看容器中jenkins war包的位置，并备份原来的war包  
    - 3.1 查看jenkins位置  
`whereis jenkins`  
    - 3.2 进入到jenkins文件目录  
`cd /usr/share/jenkins`  
    - 3.3 备份之前的jenkins.war  
`cp jenkins.war jenkinsBAK.war`  
4. 将/data/jenkins/下的jenkins.jar  复制到容器 /usr/share/jenkins下覆盖  
`sudo docker cp /data/jenkins/jenkins.war 69bf3354fade://usr/share/jenkins`  
5. 退出容器  
`exit`  
6. 重启容器  
`docker restart 69bf3354fade`  