### 获取昨天日期  
```  
curdate="`date -d "yesterday" +%Y%m%d`";  
echo $curdate;  
```  
  
  
  
[kl@root ~]$ date -d "now" +%Y-%m-%d2015-10-10  
[kl@root ~]$ date -d "today" +%Y-%m-%d2015-10-10   
### 昨天  
[kl@root ~]$ date -d "yesterday" +%Y-%m-%d2015-10-09  
[kl@root ~]$ date -d "1 days ago" +%Y-%m-%d2015-10-09  
### 前天  
[kl@root ~]$ date -d "2 days ago" +%Y-%m-%d2015-10-08  
  
#### 获取两个日期之间相差的天数  
[kl@root ~]$ day1=2015-10-10  
[kl@root ~]$ day2=2015-09-27  
[kl@root ~]$   
[kl@root ~]$ time1=`date +%s -d "$day1"`  
[kl@root ~]$ time2=`date +%s -d "$day2"`  
[kl@root ~]$   
[kl@root ~]$ days=$((($time1-$time2)/86400))  
[kl@root ~]$ echo $days  
13  
  
#### 传入一个日期，获取N天前的日期  
[kl@root ~]$ day1=2015-10-10  
##先将传入的2015-10-10转换成精确到秒的时间戳  
[kl@root ~]$ time1=`date +%s -d "$day1"`  
[kl@root ~]$ echo $time1  
1444406400  
#### 在利用时间戳减去3天的秒数(3*86400秒)，得到3天前的时间戳  
[kl@root ~]$ time2=$(($time1-3*86400))  
[kl@root ~]$ echo $time2  
1444147200  
#### 将3天前的时间戳转换成日期  
[kl@root ~]$ day2=$(date +%Y-%m-%d -d "1970-01-01 UTC $time2 seconds")  
[kl@root ~]$ echo $day2  
2015-10-07  