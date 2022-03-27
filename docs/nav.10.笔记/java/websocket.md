# websocket

1. 导入依赖
```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-websocket</artifactId>
        </dependency>
```
2. 配置WebConfig
```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

@Configuration
public class WebConfig {
    /**
     * 支持websocket
     * 如果不使用内置tomcat，则无需配置
     * @return
     */
    @Bean
    public ServerEndpointExporter createServerEndExporter(){
        return new ServerEndpointExporter();
    }
}

```
