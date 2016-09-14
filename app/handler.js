import defaultHandler from './handlers/defaultHandler'
import textHandler from './handlers/textHandler'
let handler = (xml)=>{
	let {MsgType} = xml
	if(!MsgType) return
	// more about MsgType: http://mp.weixin.qq.com/wiki/17/f298879f8fb29ab98b2f2971d42552fd.html
	switch(MsgType){
		// 订阅的时候会触发'event'
		case 'event':
		case 'text':
			return textHandler(xml)
		case 'image':
		case 'voice':
		case 'video':
		case 'shortvideo':
		case 'location':
		case 'link':
		default:
		// 这里的defaultHandler是一个Promise对象
			return defaultHandler(xml)
	}
}
export {handler}
export default handler
