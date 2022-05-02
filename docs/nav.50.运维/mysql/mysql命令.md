# Mysql命令

## 数据库创建
创建test数据库
CREATE DATABASE IF NOT EXISTS test DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_general_ci;
## 数据库导入
导入test.sql文件到test数据库
mysql -uroot -proot -D test < test.sql;
