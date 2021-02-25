# ubuntu离线shell安装jdk  
## 下载jdk：jdk-8u231-linux-x64.tar.gz  
## 编写shell脚本  
```shell
#!/bin/bash
#offline jdk install
curDir=${HOME}
mkdir ${curDir}/soft
ipath=${curDir}/soft
installpath=$(cd `dirname $0`; pwd)
j=`whereis java`
java=$(echo ${j} | grep "jdk")


if [[ "$java" != "" ]]
then
    echo "java was installed!"
else
    echo "java not installed!"
    echo "解压 jdk-*-linux-x64.tar.gz"
    tar -zxvf jdk-*-linux-x64.tar.gz >/dev/null 2>&1
    cd jdk* && jdkname=`pwd | awk -F '/' '{print $NF}'`
    echo "获取jdk版本: ${jdkname}"
    cd ${installpath}
    echo "获取当前目录:${installpath}"
    mv ${jdkname} ${ipath}
    echo "转移${jdkname}文件到${ipath}安装目录"
    echo "jdk安装目录:${ipath}/${jdkname}"
    echo "#java jdk" >> /etc/profile
    echo "export JAVA_HOME=${ipath}/${jdkname}" >> /etc/profile
    echo 'export JRE_HOME=${JAVA_HOME}/jre' >> /etc/profile
    echo 'export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib' >> /etc/profile
    echo 'export PATH=${JAVA_HOME}/bin:$PATH' >> /etc/profile
    source /etc/profile > /dev/null 2>&1
    echo "jdk 安装完毕!"
    source /etc/profile
fi



```
