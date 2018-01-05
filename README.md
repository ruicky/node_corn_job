# Node版任务定时执行

    使用bootstrap3作为前端页面，sqllite3为本地数据库。

![demo.png](./doc/demo.png)


# 快速开始

+ `git clone https://github.com/ruicky/node_corn_job.git`    
+ `cd node_corn && npm install`
+ `npm start`

# 层级结构说明

```shell

```

# 数据表

### 定时任务表(cornJobs)

字段 | 字段类型 | 字段说明  
------- | ------- | -------  
id      | INTEGER | id(PRIMARY KEY AUTOINCREMENT)  
jobName | NVARCHAR(100) | 任务名称  
jobRule | VARCHAR(255) | 任务规则 
requestUrl | VARCHAR(255) | 请求地址 
requestMethod  | VARCHAR(100) | 请求方法 
requestHeaders | NVARCHAR(200) | 请求模拟头  
requestParams  | NVARCHAR(200) | 请求参数 
description | NVARCHAR(150) | 描述 
created | INTEGER | 创建时间 
updated | INTEGER | 更新时间


### 历史表(history)

字段 | 字段类型 | 字段说明   
------- | ------- | -------  
id      | INTEGER | id(PRIMARY KEY AUTOINCREMENT)  
jobId   | INTEGER | 任务ID  
content | NVARCHAR(500) | 内容
created | INTEGER | 创建时间 
updated | INTEGER | 更新时间  



