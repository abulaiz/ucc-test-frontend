module.exports = {
	"lintOnSave": false,
	"transpileDependencies": [
		"vuetify"
	],
  	devServer: {
        proxy: process.env.VUE_APP_PRODUCTION_API,
    }	  
}