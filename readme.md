#koa2wechat-sample

koa2wechat 的演示项目

#####环境依赖
node v4.4.4+
npm v3.10.6
babel v6.14.0

#####实现功能
- 根据配置自动接入公众号
- 默认自动回复各类型消息
    * 发送‘tq,城市’，即可查询城市的实时天气（文本）
	* 发送‘image’，将收到一张图片
	* 发送‘video’，将收到一段视频
	* 发送‘news’，将收到一条图文回复
	* 发送‘voice’，将收到一段语音
	* 发送图片、语音到此公众号，将会返回发送的消息
	* 分享地图位置到此公众号，将会返回该经纬度的实时天气情况
	* 其他情况将会返回指引

#####快速开始
######开始之前：
需要申请开发者账号：http://mp.weixin.qq.com/
需要有一个开放80端口的域名。（这里有个小技巧），后面再说。
```bash
	git clone https://github.com/chux0519/koa2wechat-sample.git
```
```bash
    npm install && npm run server
```
**注意：默认是在本机的3000端口开放，部署到服务器时改为80，开发环境作者是将3000端口映射到外网80端口的**
######关于域名：
我知道的办法由下面几种：
1. 每次把代码传到服务器上调试是最直接的，但是这样往往十分痛苦。
2. 用过[Localtunnel](https://github.com/localtunnel/localtunnel)，不稳定，每次都要重新起
3. 尝试过ngrok,反正没成功
4. 最推荐，也是最近发现的方法，但是有一定局限性：
	* 电脑所在局域网路由器是分配到外网ip的（一部分用拨号的光猫不满足）
	* 有一个花生壳账号（免费的就行，注册就能用）
	* 路由器支持设置端口转发和动态DNS（大部分都支持）

 **方法就是：**在路由器设置动态DNS为花生壳服务器，然后设置端口转发将开发机的3000端口（根据喜好用哪一个）映射到外网80端口，之后就在微信平台里面设置自己的花生壳域名即可。这是目前我发现的最稳定的方法。（开发机可以设置为固定局域网ip）
 
#####说明
按照koa2wechat的接入方法接入后，需要根据业务需求来写一些代码。用于替换默认的handler.
#####项目结构：
```
koa2wechat-sample
├── app
│   ├── handler.js（handler的入口）
│   └── handlers
│       ├── defaultHandler.js（默认handler）
│       ├── echoHandler.js（回声/返回用户发来的voice/image）
│       ├── eventHandler.js（事件handler，主要处理订阅事件）
│       ├── getWeather.js（业务逻辑，根据城市名称/经纬度查询天气）
│       ├── locHandler.js（用户分享地理位置时的handler）
│       └── textHandler.js（文本handler，处理用户发送的文本消息）
├── config
│   ├── config.sample.js（配置文件示例）
│   └── token.txt（文本的方式存储access_token）
├── package.json
└── server.js(主文件)

```
#####演示公众号：
 <img src="http://mmbiz.qpic.cn/mmbiz_jpg/oruMlMibbW0fpyNFohCUlhZNCFzyLdI1MIzlOU9ibZ6HB9HicZprqoWwjyhIM3eIicgmF7jcIYF8O8VOLQuCvzF4yw/0" width = "200" height = "200" alt="二维码" align=center />