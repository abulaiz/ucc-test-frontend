import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('./views/Container'),
        children: [
            {
                name: 'Index',
                path: '',
                component: () => import('./views/Vehicle')
            }                       
        ],  
    }  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
