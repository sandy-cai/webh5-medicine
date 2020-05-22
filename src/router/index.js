import Vue from 'vue'
import Router from 'vue-router'
import { lazyload } from '@/utils/common'

Vue.use(Router)


const commonRoutes = [
    {
        path: '//',
        name: '',
        meta: { title: '', keepAlive: false },
        alias: '/',
        component: lazyload('')
    },
]

export default new Router({
    routes: [...commonRoutes]
})