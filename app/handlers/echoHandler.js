import {WeReply} from 'koa2wechat'

let echoHandler = (xml)=>{
    // 返回image voice video
	let weReply = new WeReply()
    // image voice video 类型 均有MediaId
	let {FromUserName,ToUserName,MsgType,MediaId} = xml

	let meta = {from:ToUserName,to:FromUserName,ts:new Date().getTime()}

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

    if(MsgType === 'image'){
        // 接受到来此客户端的图片消息，返回这张图片
        imageObj.mediaId = MediaId
        return Promise.resolve(weReply.genXML(imageObj))
    }
    else if(MsgType === 'voice'){
        voiceObj.mediaId = MediaId
        return Promise.resolve(weReply.genXML(voiceObj))        
    }
    else if(MsgType === 'video'){
        videoObj.mediaId = MediaId
        videoObj.title = '返回同样的视频'
        videoObj.desc = '返回同样的视频'        
        return Promise.resolve(weReply.genXML(videoObj))        
    }
}

export default echoHandler