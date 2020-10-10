import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
const axios = require('axios');

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$api_path = (() => {
	let url = `api/${process.env.VUE_APP_API_VERSION}`
	if(!process.env.NODE_ENV == "development")
		url = `${process.env.VUE_APP_PRODUCTION_API}/${url}`
	return url;
})();

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
