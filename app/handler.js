import defaultHandler from './handlers/defaultHandler'
import textHandler from './handlers/textHandler'
import eventHandler from './handlers/eventHandler'
import echoHandler from './handlers/echoHandler'
import locHandler from './handlers/locHandler'


let handler = (xml)=>{
	let {MsgType} = xml
	if(!MsgType) return
	// more about MsgType: http://mp.weixin.qq.com/wiki/17/f298879f8fb29ab98b2f2971d42552fd.html
	switch(MsgType){
		// 订阅的时候会触发'event'
		case 'event':
			return eventHandler(xml)
		case 'text':
			return textHandler(xml)
		case 'image':
		case 'voice':
		case 'video':
			return echoHandler(xml)				
		case 'shortvideo':
			return defaultHandler(xml)
		case 'location':
			return locHandler(xml)
		case 'link':
		default:
		// 这里的defaultHandler是一个Promise对象
			return defaultHandler(xml)
	}
}

// let xml = {
// 	FromUserName:"from",
// 	ToUserName:"to",
// 	MsgType:"text",
// 	Content:"image"
// }
// handler(xml).then(res=>console.log(res))

export {handler}
export default handler
