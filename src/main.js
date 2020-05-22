// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'url-search-params-polyfill'
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import _ from 'lodash'
import router from './router'
import { ZJFilter } from "./filter";
import store from './store/index'
import { logger, date, cache, cacheKey, validate, widget, post, get, apis, util } from './utils/index'
import '@/assets/iconfont/iconfont.css'
import '@/assets/sass/sass_index.scss';
import { init } from "@/utils/common";

import { VueWechatTitle } from './directive'

Vue.use(VueWechatTitle)

Vue.config.productionTip = false

FastClick.attach(document.body)

init();

Vue.use(ZJFilter);

Vue.prototype._ = _
    //打日志console.log, 发布环境会过滤
Vue.prototype.$log = logger.log
    //日期util，可以自己往里面添方法
Vue.prototype.$date = date
    //wx缓存
Vue.prototype.$cache = cache
    //缓存的key,最好key列表管理起来，搭配cache使用
Vue.prototype.$cacheKey = cacheKey
    //一些验证的方法，没有的自己往里面加
Vue.prototype.$validate = validate
    //wx弹出框，toast,toastSuccess,alert,confirm, 别的也可以往里面加
Vue.prototype.$widget = widget
    //post请求
Vue.prototype.$post = post
    //get请求
Vue.prototype.$get = get
    //接口列表，搭配post使用，
Vue.prototype.$apis = apis

Vue.prototype.$util = util

/* eslint-disable no-new */
window.RootVue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

import { Checkbox, CheckboxGroup } from 'vant';
import { Cell, CellGroup } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Button } from 'vant';
import { Field } from 'vant';
import { Picker } from 'vant';
import { Popup } from 'vant';

Vue.use(Button);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Cell).use(CellGroup);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Field);
Vue.use(Popup);
Vue.use(Picker);
