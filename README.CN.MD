
# mock-api-cli , 一个模拟 后端接口的 命令行工具

> 现在不少公司都是前后端分离的开发模式了, 后端只提供 api 接口, 前端负责渲染数据 ; 那么问题来了, 前后端开发是并行的, 如何在后端接口无法调用的情况下 快速而顺利的完成前端的开发任务呢? 想啊想, 我们前端可以使用 nodejs/koa 搭建一个 restapi 服务, 当然这些搭建的过程都是重复性, 我们不妨把它封装成一个工具, 便于日后使用, 减少重复劳动; 于是, 这个工具 : mock-api-cli 诞生了...

### 功能特性
* 支持 CORS 跨域接口
* 支持 get, post 等多种请求方法
* 支持使用 CommonJS 规范, 定义
* 支持JSON 文件, 定义一个或者多个 api接口
* 支持端口动态检测, 自动更换端口
* 支持静态文件服务器
* 支持 文件改动后自动重启服务器 
* 支持自动打开浏览器预览 api 接口

部分效果如下:

![](https://raw.githubusercontent.com/iceyangcc/mock-api-cli/master/images/cli-h.png)

## 立即使用 mock-api-cli 

### 安装

```text
npm install -g mock-api-cli

or yarn global add mock-api-cli (推荐)
```

### 指南

```text
cd your-work-directory
mock-api-cli -h (或者使用 mac -h)
```
> 

#### 注意:  你可以使用 "mac"命令替换 "mock-api-cli"命令

#### 在终端命令行中使用
```text
mock-api-cli --port 3008 --watch -o
```

#### 创建文件
你可以在 工作目录下 创建 js, json文件, 文件中的内容 包含 api相关信息, 如 type, path, res 等字段, 定义好之后使用 
mock-api-cli 相关命令即可, 开启api服务器


#### 文件中的API定义说明

* path: 请求路径
* res:  响应报文数据, 可以是一个对象(一个 api), 或者 数组 (多个 api)
* type: 某个接口的请求方法, 例如 'get', 'post', 'put', 'delete', 'options'

#### 实例1: 
dirname/user.js (use CommonJS)

```text
module.exports = {
  path: '/user',
  res: {
    code: Math.random() > .5 ? 200 : 400,
    data: {
      username: 'iceyangcc',
      npm: 'https://www.npmjs.com/package/mock-api-cli'
    }
  }
}
由于 是 js文件, 所以你可以自定义一些操作, 例如随机变量, 或者自己的逻辑
```

#### 实例2 
list.json 

```text
[
  {
    path: '/detail/:id',
    type: 'post',
    res: {

    }
  },
  {
    path: '/login',
    type: 'post',
    res: {

    }
  }
]

ps: 不符合 字段规范的对象将会被忽略
```

源码地址 , 访问 https://github.com/iceyangcc/mock-api-cli, 喜欢的话帮忙 Star 一下啦, 

### 技术栈
* koa / middleware
* shell

### 了解更多
[我的新版博客: http://blog.nodejs.tech](http://blog.nodejs.tech)
#####  
[github](https://github.com/iceyangcc)

### 关于
本人前端 码农一枚...

### 联系我
iceyangcc@sina.com





