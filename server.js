import Koa from 'koa'

// middle ware
import {WeConnector,WeHandler} from 'koa2wechat'
// util class
import {Wechat,WeReply} from 'koa2wechat'

import {weconfig} from './config/config'

const app = new Koa()
const wechat = new Wechat(weconfig)

app
// connect and reply
.use(WeConnector(weconfig.token))
// handle and gen response xml string
.use(WeHandler(null))

app.listen(80,()=>{
	console.log('Listening on port 80')
})
