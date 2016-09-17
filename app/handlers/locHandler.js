import {WeReply} from 'koa2wechat'
import {currentWeather} from './getWeather'


let locHandler = (xml)=>{
    // 返回image voice video
	let weReply = new WeReply()
    // image voice video 类型 均有MediaId
	let {
            FromUserName,ToUserName,
            Location_X:lat,Location_Y:lon
        } = xml

	let meta = {from:ToUserName,to:FromUserName,ts:new Date().getTime()}

    let textObj = {
		meta:meta,
		type:"text",
		content:''
	}

    return currentWeather.byGeo(lat,lon)
                .then(content=>{
                    console.log(content)
                    textObj.content = content
                    textObj.meta.ts = new Date().getTime()

                    // 把Promise 返回回去
                    return Promise.resolve(weReply.genXML(textObj))
                })

}

export default locHandler