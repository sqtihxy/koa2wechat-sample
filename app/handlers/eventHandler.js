import {WeReply} from 'koa2wechat'


const guideText = `欢迎关注koa2wehcat示例程序，回复‘tq,城市名称’就可以获取城市的实时天气状况`

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