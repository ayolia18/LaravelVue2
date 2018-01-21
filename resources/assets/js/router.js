import Vue from 'vue'
import VueRouter from 'vue-router'
import Panier from './components/Panier'
import App from './components/App'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/t',
            name: 'Panier',
            component: Panier
        }
    ]
})

new Vue({
    el:'#app',
    components: { App },
    VueRouter,

})
