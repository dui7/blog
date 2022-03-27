# Tcp Demo
## TcpServer
``` go
package main

import (
	"bytes"
	"fmt"
	"log"
	"net"
	"runtime"
	"strconv"
	"time"
)

/**
来自远程ip: 127.0.0.1:10568 的消息: hello!i am client !
来自远程ip: 127.0.0.1:10568 的消息:
来自远程ip: 127.0.0.1:10568 的消息:

conn关闭后有两次空白输出，是因为三次握手机制 accept到空白内容了
*/
func main() {
	addr, err := net.ResolveTCPAddr("tcp", "127.0.0.1:9088")
	dealErrorWithExist(err)
	tcpListen, err := net.ListenTCP("tcp", addr)
	dealErrorWithExist(err)
	fmt.Println("tcp服务器端启动:  ", addr.String())
	for {
		conn, err := tcpListen.Accept()
		if err != nil {
			continue
		}
		//加go 编程高性能并发服务器端  
		go handlerConn(conn)
	}
}

func handlerConn(conn net.Conn) {
	//**********************************  
	defer fmt.Println("当前用户 ", conn.RemoteAddr(), " 主动断开链接！")
	defer conn.Close() //正常链接情况下，handlerConn不会释放出来到这里 当客户端强制断开，才会return到这里，吧当前conn关闭  
	fmt.Println("新链接了一个客户端", conn.RemoteAddr())
	//**********************************  
	//获取客户端信息 info，并返回 info+服务器时间  
	var buf [1024]byte
	for {
		readSize, err := conn.Read(buf[0:])
		dealErrorWithReturn(err)
		remoteAddr := conn.RemoteAddr()
		gorid := GetGoroutineID()

		fmt.Println("协程id: "+strconv.FormatUint(gorid, 10)+" 来自远程ip:", remoteAddr, " 的消息:", string(buf[0:readSize]))

		_, err2 := conn.Write([]byte(string(buf[0:readSize]) + " " + time.Now().String()))
		//一定要执行下面的return 才能监听到客户端主动断开，服务器端对本次conn进行close处理 dealErrorWithReturn不能达到这个效果。
		if err2 != nil {
			return
		}
	}
}
func GetGoroutineID() uint64 {
	b := make([]byte, 64)
	runtime.Stack(b, false)
	b = bytes.TrimPrefix(b, []byte("goroutine "))
	b = b[:bytes.IndexByte(b, ' ')]
	n, _ := strconv.ParseUint(string(b), 10, 64)
	return n
}
func dealErrorWithExist(err error) {
	//有异常会停止进程  
	if err != nil {
		log.Fatal("运行异常", err)
	}
}
func dealErrorWithReturn(err error) {
	//有异常会停止进程  
	if err != nil {
		return
	}
}
```

## TcpClient
``` go
package main

import (
	"fmt"
	"log"
	"net"
	"os"
	"strconv"
	"time"
)

func main() {
	clientStop := false
	var buf [1024]byte
	//关于buf大小设置 参考：https://segmentfault.com/q/1010000021544230

	addr, err := net.ResolveTCPAddr("tcp", "127.0.0.1:9088")
	if err != nil {
		log.Fatal("运行异常", err)
	}
	dialTCP, err := net.DialTCP("tcp", nil, addr)
	if err != nil {
		log.Fatal("运行异常", err)
	}

	var i int64 = 1
	for {
		clientStop = false //实时更新系统是否接到关闭信号 可能是通过界面传递到某个配置文件或表字段里
		//到这里说明和服务器链接成功
		_, err2 := dialTCP.Write([]byte("hello!i am client msg!" + strconv.FormatInt(i, 10)))
		//此时不会结束for 一次写失败可以继续，看具体业务对异常信息的处理机制
		if err2 != nil {
			dialTCP.Close()
			log.Fatal(err2)
		}
		//获取服务器端返回的信息
		read, err3 := dialTCP.Read(buf[0:])
		//从服务器端获取信息失败，就要及时打断进程
		if err3 != nil {
			dialTCP.Close()
			log.Fatal(err3)
		}

		if clientStop {
			// 程序通过 信号量 clientStop 控制客户端链接是否关闭
			dialTCP.Close()
			os.Exit(0)
		}
		fmt.Println("客户端主动从服务器第", i, "次获取到的信息:", string(buf[0:read]))

		time.Sleep(time.Duration(2) * time.Second)
		i++
	}

}
```