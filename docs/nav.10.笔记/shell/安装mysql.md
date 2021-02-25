# 离线安装Mysql  
1. 执行shell安装mysql，创建一个install_mysql.sh，输入下面的脚本代码。  
``` shell  
vim install_mysql.sh  
```  
  
2. 赋予脚本权限  
``` shell  
sudo chmod +x install_mysql.sh  
```  
  
3. install_mysql.sh脚本代码如下  
```bash
G_COLOR_RED=1
G_COLOR_GREEN=2
G_COLOR_BLUE=6
G_COLOR_YELLOW=3
G_COLOR_WHITE=7
G_COLOR_BLACK=0

###########   used for colorful output  #########

echoo(){

##      code    color
##      0:      黑色
##      1:      红色
##      2:      浅绿
##      3:      黄色
##      4:      蓝色
##      5:      洋红
##      6:      青色
##      7:      白色
##      8:      深绿


local str fcolor bcolor newline

if [ "$1" = "-n" ];then
        newline=n
        shift
else
        newline=""
fi

str=$1
fcolor=$2
bcolor=$3

if [ -z "$fcolor" ];then
       echo "$1"

else
      if [[ $fcolor -lt 0 || $fcolor -gt 8 ]];then
              fcolor=7
      fi
      
      if [[ $bcolor -lt 0 || $bcolor -gt 8 ]];then
              bcolor=0
      fi
      
      fcolor=3${fcolor:=7}
      bcolor=4${bcolor:=0}
      
      echo -e$newline "\e[1;${fcolor};${bcolor}m$str\e[0m"
fi
}

echoe(){

echo >&2 $(echoo "$@")

}

color(){
local row col str fcolor bcolor

row=$1
col=$2
str=$3
fcolor=$4
bcolor=$5

tput sc

tput cup $row $col 
echoo -n "$str" $fcolor $bcolor

tput rc

}

#######################################################
#######################################################
#######################################################
#######################################################
#######################################################

clear

cat <<EOF



EOF

if [ $(command -v yum) ];then
    install_tool='yum'
elif [ $(command -v apt-get) ];then
    install_tool='apt-get'
fi

#####  check if already have mysql installed   ########

echo -n "check if already have mysql installed ... "
sleep 0.2 

if [ -e /usr/local/mysql  ];then
	echoo " not pass " 1 0
	echo "mysql have already installed ,before your installation, please remove old installation first "
	exit
fi
echoo " pass " 2 0 

#####  check the mysql installation package   ##########

$install_tool install -y libaio || $install_tool install -y libaio1
$install_tool install -y libnuma || $install_tool install -y libnuma1

echo -n "check the installation package ...      "
sleep 0.2 

if [ -z "$(ls /tmp |grep mysql.*.tar.gz)" ];then
	echoo " not pass" 1 0 
	echo " the installation package does not exists, we download now " 
	echo " your system word length is : $(getconf LONG_BIT) "
	case $(getconf LONG_BIT) in
	32)
		echo "we choose [mysql-5.7.18-linux-glibc2.5-i686.tar.gz]"
		download_url=https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.18-linux-glibc2.5-i686.tar.gz
	;;

	*)
		echo "we choose [mysql-5.7.18-linux-glibc2.5-x86_64.tar.gz]"
		download_url=https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.18-linux-glibc2.5-x86_64.tar.gz
	;;
	esac

	wget -P /tmp $download_url
	if [ $? -ne 0 ];then
		echoo "download mysql failed, please check the url:http://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.18-linux-glibc2.5-i686.tar.gz " 1 0
		echo "installation terminated"
		exit
	fi
else
	echoo " pass " 2 0
	sleep 1
fi

#####  create tmp directory for unpackage   ##########

echo -n "create tmp directory ... "
sleep 0.2 
pid=$$
tmp_dir=/tmp/$(date "+%Y%m%d")_$pid

mkdir -p $tmp_dir
echoo " pass " 2 0

#####  unpackage   ###########

install_pkg="$(ls /tmp | grep 'mysql.*.tar.gz')"
echo "unpackage $install_pkg  ... "

tar -zxvf /tmp/$install_pkg -C $tmp_dir 

echo "unpackage $(echoo " pass " 2 0)"


#####  get the pkg directory name   #####

echo -n "get the installation directory name ... "
sleep 0.5 

pkg_dir=$(ls -F $tmp_dir |grep '^.*/$' )

if [ -z "$pkg_dir" ];then
	echoo " not pass " 1 0
	echo "can not get package directory name"
	exit
fi

echoo " pass " 2 0 

#####  check system group:mysql   ########

echo -n "check system group:mysql ... "
sleep 1

if [ -z "$(cat /etc/group |grep 'mysql' )" ];then
	groupadd mysql
	echoo " pass " 2 0 
	echo "the group does not exists , we created group mysql"
else
	echoo " pass " 2 0
fi

#####  check system user:mysql   ########

echo -n "check system user:mysql ... "
sleep 0.5 

if [ -z "$(cat /etc/passwd |grep 'mysql' )"  ];then
	useradd -g mysql mysql
	echoo " pass " 2 0 
	echo "the user does not exists , we created user mysql"
else
	echoo " pass " 2 0
fi


#####  install the mysql directory   ######

echo -n "install the mysql directory ... "
sleep 0.5 

mv $tmp_dir/$pkg_dir  /usr/local/mysql


echoo " pass " 2 0

#####  change the owner of the mysql directory to mysql #######

echo -n "change the owner of the directory to mysql user ... "
sleep 1 

chown -R mysql:mysql /usr/local/mysql 

echoo " pass " 2 0

#####  create data directory for mysql   #####

echo -n "create data directory for mysql ... " 
sleep 0.2

mkdir -p /data/mysql/{data,tmp,logs}
mkdir -p /tmp/mysql
chown -R mysql:mysql /data/mysql
chown -R mysql:mysql /tmp/mysql

echoo " pass " 2 0 

#####  generate my.cnf file  #####

echo -n "generate my.cnf ... "
sleep 0.2

if [ -e /etc/my.cnf  ];then
	mv /etc/my.cnf /etc/old.my.cnf
fi


cat <<EOF >/etc/my.cnf

[client]
port=3306
socket=/tmp/mysql/mysql.sock

[mysqld]
server_id=$(echo "$(hostname -I |awk '{print$1}'| awk -F . '{print$4}')")
port=3306
user=mysql
basedir=/usr/local/mysql
datadir=/data/mysql/data
tmpdir=/data/mysql/tmp
socket=/tmp/mysql/mysql.sock

log-bin=/data/mysql/logs/mysql-bin
log-error=/data/mysql/logs/error.log
slow-query-log-file=/data/mysql/logs/slow.log
skip-external-locking
skip-name-resolve
log-slave-updates
log_bin_trust_function_creators=1
event_scheduler=1
binlog_format=row
sync_binlog=1
innodb_flush_log_at_trx_commit=1
expire_logs_days=7
collation-server = utf8_bin
init-connect='SET NAMES utf8'
character-set-server = utf8

key_buffer_size         = 512M
max_allowed_packet      = 128M
thread_stack            = 192K
thread_cache_size       = 256
read_buffer_size        = 1M
sort_buffer_size        = 2M
join_buffer_size        = 1M
tmp_table_size          = 256M
max_heap_table_size     = 256M

innodb_buffer_pool_size=1G
innodb_open_files=10240
innodb_file_per_table=1
transaction-isolation=READ-COMMITTED
EOF

echoo " pass " 2 0 

#####  setting the environment variables   #######

echo -n "setting the environment variables ... "

echo "PATH=\$PATH:/usr/local/mysql/bin" >>/etc/profile
source /etc/profile

echoo " pass " 2 0

#####  initialize the mysql ######

echo  "initialize the mysql ... "

/usr/local/mysql/bin/mysqld --initialize --user=mysql --basedir=/usr/local/mysql --datadir=/data/mysql/data --log-error=/data/mysql/logs/error.log

echo "initialize the mysql ... $(echoo "pass" 2 0) "


#####  configure the mysqld service   #####

echo -n "configure mysqld service ... "
sleep 0.5

ln -sf /usr/local/mysql/bin/mysql /usr/bin
ln -sf /usr/local/mysql/bin/mysqldump /usr/bin
ln -sf /usr/local/mysql/bin/mysqlbinlog /usr/bin
ln -sf /usr/local/mysql/bin/mysql_config_editor /usr/bin
ln -sf /usr/local/mysql/bin/mysqladmin /usr/bin
ln -sf /usr/local/mysql/bin/mysqlcheck /usr/bin

sed 's/^basedir=/basedir=\/usr\/local\/mysql/g;s/^datadir=/datadir=\/data\/mysql\/data/g' /usr/local/mysql/support-files/mysql.server >/etc/init.d/mysqld
chmod 755 /etc/init.d/mysqld



echoo " pass " 2 0 


service mysqld start

#####  get initial password

pass=$(grep -Po '(?<=A temporary password is generated for root@localhost: ).*' /data/mysql/logs/error.log)
echo "pass:$pass"

#####  security setting  #####
/usr/local/mysql/bin/mysql_tzinfo_to_sql /usr/share/zoneinfo/ >$tmp_dir/tmz.sql
echoo " please change root user password : alter user 'root'@'localhost' identified by 'xxxxxxx';" 3 0
echoo " and then install timezone support : source $tmp_dir/tmz.sql" 3 0
mysql -uroot -p$pass -D mysql


echo -n "security setting"
echoo " pass " 2 0

#####  install timezone support
echo -n "timezone install "
echoo " pass " 2 0

#####  cleaning installation temp file   #####
echo -n "cleaning installation temp file "
rm -rf $tmp_dir

echoo " pass " 2 0 

echo "installation success "
```

