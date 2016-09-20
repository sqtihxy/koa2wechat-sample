import {WeReply} from 'koa2wechat'


const guideText = 
`欢迎关注此公众号，该项目为koa2wechat的演示项目
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
let eventHandler = (xml)=>{
    let weReply = new WeReply()

    let {FromUserName,ToUserName,Event} = xml

    let meta = {from:ToUserName,to:FromUserName,ts:new Date().getTime()}

    let textObj = {
        meta:meta,
        type:"text",
        content:Event
    }
    // 订阅事件，如果用户订阅，则发送指引信息
    if(Event === 'subscribe'){
        textObj.content = guideText
    }
    return Promise.resolve(weReply.genXML(textObj))
}


export default eventHandler