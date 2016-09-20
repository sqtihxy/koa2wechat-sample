import {WeReply} from 'koa2wechat'
// WeReply是一个类，用于创建各类返回信息，生成对应的xml字符串
const welcomeMsg = 
`该项目为koa2wechat的演示项目
实现功能：
	1.发送‘tq,城市’，即可查询城市的实时天气
	2.发送‘image’，将收到一张图片
	3.发送‘video’，将收到一段视频
	4.发送‘news’，将收到一条图文回复
	5.发送‘voice’，将收到一段语音
	6.发送图片、语音到此公众号，将会返回发送的消息
	7.分享地图位置到此公众号，将会返回该经纬度的实时天气情况
	8.其他情况将会返回指引
koa2wechat是koa2的中间件，已经开源，代码在：
	https://github.com/chux0519/koa2wechat
此项目也已经开源，代码在：
	https://github.com/chux0519/koa2wechat-sample
欢迎大家fork和star
作者邮箱：chuxdesign@hotmail.com
`

// 返回一个Promise对象
let defaultHandler = (xml)=>{
	// 获取来源FromUserName，在回复信息中将其设置为目的地 `to`
	// 获取我们公众号的标识ToUserName，在回复信息中将其设置为发送地 `from`
	let {FromUserName,ToUserName} = xml

	// 这里可以插入需要执行的业务逻辑代码，比如判断消息来源是谁，他回复了什么类型的数据之类的


	// 实例化wereaply
	let weReply = new WeReply()

	// 生成回复将会使用到的meta信息，包括 本机`from`， 目标`to`， 时间戳`ts`（时间戳非必选项）
	let meta = {from:ToUserName,to:FromUserName,ts:new Date().getTime()}
	// 回复文本类型的数据，要构造选项`type` 和 回复内容`content` 以及上面获取的 meta 信息
	let textRpl = {
		meta:meta,
		type:"text",
		content:welcomeMsg
	}
	// 传入回复选项，生成相应的xml字符串
	let rpl = weReply.genXML(textRpl)
	// 把Promise 返回回去
	return Promise.resolve(rpl)
}



export default defaultHandler
