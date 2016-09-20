let config = {
	weconfig:{
		local_token_path:__dirname + '/token.txt',
		appid:"your app id",
		secret:"your secret",
		token:"your token"
	},
	weather:{
		appid:'your openweather appid',
		baseUrl:'http://api.openweathermap.org/data/2.5/'
	}
}

export const {weconfig,weather} = config
export default config