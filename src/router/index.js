import Vue from 'vue'
import Router from 'vue-router'
import { lazyload } from '@/utils/common'

Vue.use(Router)


const commonRoutes = [{
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            keepAlive: false
        },
        component: lazyload('login')
    },
    {
        path: '/apply',
        name: 'apply',
        meta: {
            title: '申请',
            keepAlive: false
        },
        component: lazyload('apply')
    },
]

export default new Router({
    routes: [...commonRoutes]
})