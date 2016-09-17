import axios from 'axios'
import {weather as config} from '../../config/config.js'

let getWeatherByName = (actions)=>{
	console.log("now getWeatherByName")
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
				resolveStr = `天气:${weatherJSON.weather[0].main},实时温度:${temp}`
			}
			else{
				resolveStr = '没有查询到该城市'
			}
			resolve(resolveStr)
		})
		.catch(e=>{
			reject(e)
		})
	})

}


let getWeatherByGeo = (lat,lon)=>{
	console.log("now getWeatherByGeo")
	return new Promise((resolve,reject)=>{
		let {appid,baseUrl} = config
		let url = baseUrl + 
		`weather?appid=${appid}&lat=${lat}&lon=${lon}`

		axios.get(encodeURI(url))
		.then(response=>{
			let weatherJSON = response.data
			let resolveStr = ''
			if(weatherJSON.cod === 200 && weatherJSON.main.temp && weatherJSON.weather){
				let temp  = Math.round(weatherJSON.main.temp-273.15)
				resolveStr = `天气:${weatherJSON.weather[0].main},实时温度:${temp}`
			}
			else{
				resolveStr = '没有查询到该城市'
			}
			resolve(resolveStr)
		})
		.catch(e=>{
			reject(e)
		})
	})

}
// getWeatherByName(["北京"]).then(str=>console.log(str))
// getWeatherByGeo(35,139).then(str=>console.log(str))
export let currentWeather = {
	byName:getWeatherByName,
	byGeo:getWeatherByGeo
}

export default {
	byName:getWeatherByName,
	byGeo:getWeatherByGeo
}