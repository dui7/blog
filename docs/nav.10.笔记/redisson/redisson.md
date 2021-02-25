# redisson



## 配置化redissonconfig  

```java
import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.ResourceUtils;

import java.io.IOException;

@Configuration
public class RedissonConfig {
    @Value("${spring.redisson.config}")
    private String redissonConfig;
    @Bean
    public RedissonClient redisson() throws IOException {
        Config config = Config.fromYAML(ResourceUtils.getFile(redissonConfig));
        return Redisson.create(config);
    }
}
```



## 分布式锁代码  

```java
    @Autowired
    private RedissonClient redissonClient;

		@Scheduled(cron = "0 */10 * * * ?")
    @Transactional(rollbackFor = Exception.class)
    public void syncTerminalData() throws IOException {
        log.error("定时任务启动");
        RLock lock = redissonClient.getLock("syncTerminalLock");
        boolean getLock = false;
        try {
            if (getLock = lock.tryLock(0, 5, TimeUnit.SECONDS)) {
                terminalService.syncTerminal();
            } else {
                log.info("Redisson分布式锁没有获取到锁");

            }
        } catch (InterruptedException e) {
            log.error("Redisson 获取分布式锁异常", e);
        } finally {
            if (!getLock) {
                return;
            }
            lock.unlock();
        }

    }
```




## 配置文件  
redisson-local.yml

```yaml
clusterServersConfig:
  idleConnectionTimeout: 10000
  pingTimeout: 1000
  connectTimeout: 10000
  timeout: 3000
  retryAttempts: 3
  retryInterval: 1500
  reconnectionTimeout: 3000
  failedAttempts: 3
  password: passw0ord
  subscriptionsPerConnection: 5
  clientName: null
  loadBalancer: !<org.redisson.connection.balancer.RoundRobinLoadBalancer> {}
  slaveSubscriptionConnectionMinimumIdleSize: 1
  slaveSubscriptionConnectionPoolSize: 50
  slaveConnectionMinimumIdleSize: 32
  slaveConnectionPoolSize: 64
  masterConnectionMinimumIdleSize: 32
  masterConnectionPoolSize: 64
  readMode: "SLAVE"
  nodeAddresses:
    - "redis://redis-cluster-0.redis-cluster.ruci-dev.svc.cluster.local:6379"
    - "redis://redis-cluster-1.redis-cluster.ruci-dev.svc.cluster.local:6379"
    - "redis://redis-cluster-2.redis-cluster.ruci-dev.svc.cluster.local:6379"
    - "redis://redis-cluster-3.redis-cluster.ruci-dev.svc.cluster.local:6379"
    - "redis://redis-cluster-4.redis-cluster.ruci-dev.svc.cluster.local:6379"
    - "redis://redis-cluster-5.redis-cluster.ruci-dev.svc.cluster.local:6379"
  scanInterval: 1000
threads: 0
nettyThreads: 0
codec: !<org.redisson.codec.JsonJacksonCodec> {}
"transportMode": "NIO"
```

application-local.yml  

``` yaml
spring:
  messages:
    encoding: UTF-8
    basename: i18n/messages
  servlet:
    multipart:
      max-file-size: 4000MB
      max-request-size: 4000MB
      enabled: true

  redis:
    cluster:
      nodes: redis-cluster-0.redis-cluster.ruci-dev.svc.cluster.local:6379,redis-cluster-1.redis-cluster.ruci-dev.svc.cluster.local:6379,redis-cluster-2.redis-cluster.ruci-dev.svc.cluster.local:6379,redis-cluster-3.redis-cluster.ruci-dev.svc.cluster.local:6379,redis-cluster-4.redis-cluster.ruci-dev.svc.cluster.local:6379,redis-cluster-5.redis-cluster.ruci-dev.svc.cluster.local:6379
      max-redirects: 3
    timeout: 6000ms
    lettuce:
      pool:
        min-idle: 1
        max-idle: 5
        max-active: 5
        max-wait: 1000ms
    password: passw0ord
    jedis:
      pool:
        max-active: 1000  # 连接池最大连接数（使用负值表示没有限制）
        max-wait: -1ms      # 连接池最大阻塞等待时间（使用负值表示没有限制）
        max-idle: 10      # 连接池中的最大空闲连接
        min-idle: 5       # 连接池中的最小空闲连接
    redisson:
      config: classpath:redisson-dev.yml
```

