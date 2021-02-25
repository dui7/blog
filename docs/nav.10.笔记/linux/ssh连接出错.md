# ssh Host key verification failed.
通过ssh连接服务器，
$ ssh -p 22 root@192.168.1.130

## 错误信息
```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ECDSA key sent by the remote host is
SHA256:HDjXJvu0VYXWF+SKMZjSGn4FQmg/+w6eV9ljJvIXpx0.
Please contact your system administrator.
Add correct host key in /Users/wangdong/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in /Users/wangdong/.ssh/known_hosts:46
ECDSA host key for 108.61.163.242 has changed and you have requested strict checking.
Host key verification failed.
```
## 解决方法

```
ssh-keygen -R 192.168.1.130
```

