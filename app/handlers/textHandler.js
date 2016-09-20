import {WeReply} from 'koa2wechat'
import {currentWeather} from './getWeather'

// 默认的引导标语
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

// 文本handler
let textHandler = (xml)=>{
	// 用于生成回复xml string 的工厂
	let weReply = new WeReply()

	// 获取客户端请求
	let {FromUserName,ToUserName} = xml

	// 拼接回复内容的meta信息
	let meta = {from:ToUserName,to:FromUserName,ts:new Date().getTime()}

	//创建各种类型的回复
	let textObj = {
		meta:meta,
		type:"text",
		content:''
	}
	// 图片
	let imageObj = {
		meta:meta,
		type:'image',
		mediaId:"gDXKafwJuUvlm1Lz38TO2tLtAGOUU28tRKd_VXeyVdcDnlGtMlerOg8SeEvECoHd"
	}
	// 语音
	let voiceObj = {
		meta:meta,
		type:'voice',
		mediaId:"Lcd7om4VfglHkD-Cvo6E9Ik_5l1fx6jTnixa9Mi8qYHY5cNmLPIUVk8MXjXYC10G"
	}
	// 视频
	let videoObj = {
		meta:meta,
		type:'video',
		mediaId:"LnFqDNEdJXP8Mt8lfcrKckzvFfJcIuHQNWv039vuqZA",
		title:"越南",
		desc:"GF"	
	}
	// 音乐
	let musicObj = {
		meta:meta,
		type:'music',
		title:"title",	//*非必选项
		desc:"desc"	//*非必选项
	}
	// 图文
	let newsObj = {
		meta:meta,
		type:'news',
		articles:[
			{		
				title:"title1",
				desc:" description 1",
				picUrl:"http://mmbiz.qpic.cn/mmbiz_png/oruMlMibbW0fpyNFohCUlhZNCFzyLdI1MqnZB3ib69AMwaniaRf8lK0Av3cyvSZxneFKL8cLca67JShM4Wz1ibXjsQ/0?wx_fmt=png",
				url:"https://github.com/chux0519"
			},
			{		
				title:"title2",
				desc:" description 2",
				picUrl:"http://mmbiz.qpic.cn/mmbiz_png/oruMlMibbW0fpyNFohCUlhZNCFzyLdI1MqnZB3ib69AMwaniaRf8lK0Av3cyvSZxneFKL8cLca67JShM4Wz1ibXjsQ/0?wx_fmt=png",
				url:"https://github.com/chux0519"
			}
		]
	}

	// 先去除客户端发来消息中的空格
	let content = xml.Content.trim()
	// 用逗号分割（判断是否是天气查询）
	let actions = content.split(',')
	// 打印内容
	console.log("actions array : ",actions)
	// 根据业务分发处理逻辑
	switch(actions[0].trim()){
		// 查询天气
		case 'tq':
			return currentWeather.byName(actions.slice(1))
			.then(content=>{
				console.log(content)
				textObj.content = content
				textObj.meta.ts = new Date().getTime()

				// 把Promise 返回回去
				return Promise.resolve(weReply.genXML(textObj))
			})
		// 回复图片
		case 'image':
			return Promise.resolve(weReply.genXML(imageObj))
		// 回复语音
		case 'voice':
			return Promise.resolve(weReply.genXML(voiceObj))
		// 回复视频
		case 'video':
			return Promise.resolve(weReply.genXML(videoObj))
		// 回复音乐
		case 'music':
			return Promise.resolve(weReply.genXML(musicObj))
		// 回复图文
		case 'news':
			return Promise.resolve(weReply.genXML(newsObj))
		// 默认回复引语
		default:
			textObj.content = welcomeMsg
	}
	return Promise.resolve(weReply.genXML(textObj))

}


export default textHandler