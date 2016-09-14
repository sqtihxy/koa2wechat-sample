import Koa from 'koa'

// middle ware
import {WeConnector,WeHandler} from 'koa2wechat'
// util class
import {Wechat,WeReply} from 'koa2wechat'

import {weconfig} from './config/config'

import handler from './app/handler'

const app = new Koa()
const wechat = new Wechat(weconfig)

app
// connect and reply
.use(WeConnector(weconfig.token))
// handle and gen response xml string
.use(WeHandler(handler))

app.listen(3000,()=>{
	console.log('Listening on port 3000')
})
