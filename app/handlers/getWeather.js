import axios from 'axios'
import {weather as config} from '../../config/config.js'

let getWeather = (actions)=>{
	console.log("now getWeather")
	return new Promise((resolve,reject)=>{
		let {appid,baseUrl} = config
		let prefix_url = baseUrl + `weather?appid=${appid}&q=`
		let city = ''
		// default city is Chengdu
		if(actions.length===0){
			city = '成都'
		}
		else if(actions.length > 0){
			city = actions[0].trim() 
			city.length > 0? city = city:city='成都'
		}
		console.log('target city : ', city)
		let url = prefix_url + city
		axios.get(encodeURI(url))
		.then(response=>{
			let weatherJSON = response.data
			let resolveStr = ''
			if(weatherJSON.cod === 200 && weatherJSON.main.temp && weatherJSON.weather){
				let temp  = Math.round(weatherJSON.main.temp-273.15)
				resolveStr = `Weather:${weatherJSON.weather[0].main},Temp now:${temp}`
			}
			else{
				resolveStr = 'Not found city'
			}
			resolve(resolveStr)
		})
		.catch(e=>{
			reject(e)
		})
	})

}


export default getWeather