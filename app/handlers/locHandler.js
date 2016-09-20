import {WeReply} from 'koa2wechat'
import {currentWeather} from './getWeather'


let locHandler = (xml)=>{
	let weReply = new WeReply()
    // 获取经纬度，xml内容参考：http://mp.weixin.qq.com/wiki/17/f298879f8fb29ab98b2f2971d42552fd.html#.E5.9C.B0.E7.90.86.E4.BD.8D.E7.BD.AE.E6.B6.88.E6.81.AF
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