let config = {
	weconfig:{
		local_token_path:__dirname + '/token.txt',
		appid:"wxf9aac21845c130b3",
		secret:"87d44bdf6cf0e4f3f73a0ae2ea273c28",
		token:"chuxdesign"
	},
	weather:{
		appid:'3bf02a6a242dd9ecf2dbc7a08361fc90',
		baseUrl:'http://api.openweathermap.org/data/2.5/'
	}
}

export const {weconfig,weather} = config
export default config