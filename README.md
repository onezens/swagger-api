# swagger-api
通过swagger和express搭建的一个api服务器和api接口测试服务器。

### 使用
1. 安装依赖库： `npm install`
2. 确保mysql服务器运行，并且创建`mydb`数据库
3. 启动：`node index.js`
4. 浏览器访问 [http://localhost:3000/](http://localhost:3000/)，如果登录，会到登录页面，注册用户
5. 注册后到swagger-doc首页

### 添加新接口
`/routes/api` : 文件夹下的模块，用来管理API接口处理逻辑
`/routes/site` : 文件夹下的模块，用来管理网页界面显示，登录注册逻辑



### 效果图
![swagger-doc](http://src.onezen.cc/git/rm/3.gif)


**swagger官方demo**
[http://petstore.swagger.io/?_ga=2.90583642.133282654.1506132980-4471684.1504004116](http://petstore.swagger.io/?_ga=2.90583642.133282654.1506132980-4471684.1504004116)
