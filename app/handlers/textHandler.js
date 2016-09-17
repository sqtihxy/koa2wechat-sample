import {WeReply} from 'koa2wechat'
import {currentWeather} from './getWeather'

let textHandler = (xml)=>{
	let weReply = new WeReply()

	let {FromUserName,ToUserName} = xml

	let meta = {from:ToUserName,to:FromUserName,ts:new Date().getTime()}

	let textObj = {
		meta:meta,
		type:"text",
		content:''
	}
	let imageObj = {
		meta:meta,
		type:'image',
		mediaId:"mediaId"
	}
	let voiceObj = {
		meta:meta,
		type:'voice',
		mediaId:"mediaId"
	}
	let videoObj = {
		meta:meta,
		type:'video',
		mediaId:"mediaId",
		title:"title",	//*
		desc:"desc"	//*
	}
	let musicObj = {
		meta:meta,
		type:'music',
		title:"title",	//*
		desc:"desc"	//*
	}
	let newsObj = {
		meta:meta,
		type:'news',
		articles:[
			{		
				title:"title1",
				desc:" description 1",
				picUrl:" pic url",
				url:" origin url"
			},
			{		
				title:"title2",
				desc:"description2",
				picUrl:" pic url",
				url:" origin url"
			}
		]
	}

	let content = xml.Content.trim()
	let actions = content.split(',')
	console.log("actions array : ",actions)
	switch(actions[0].trim()){
		case 'tq':
			return currentWeather.byName(actions.slice(1))
			.then(content=>{
				console.log(content)
				textObj.content = content
				textObj.meta.ts = new Date().getTime()

				// 把Promise 返回回去
				return Promise.resolve(weReply.genXML(textObj))
			})
		case 'image':
			return Promise.resolve(weReply.genXML(imageObj))
		case 'voice':
			return Promise.resolve(weReply.genXML(voiceObj))
		case 'video':
			return Promise.resolve(weReply.genXML(videoObj))
		case 'music':
			return Promise.resolve(weReply.genXML(musicObj))
		case 'news':
			return Promise.resolve(weReply.genXML(newsObj))
		default:
			textObj.content = 'https://github.com/chux0519'
	}
	return Promise.resolve(weReply.genXML(textObj))

}

// let xml = {
// 	FromUserName:"from",
// 	ToUserName:"to",
// 	Content:"image"
// }
// textHandler(xml).then(res=>console.log(res))

export default textHandler