import axios from 'axios'
import { logger, widget, cache } from './index'
import 'url-search-params-polyfill';


export const setURL = (url, args) => {
    if (typeof url === 'undefined') { throw 'no url!' }
    if (!args) return url
    for (var i = 0; i < args.length; i++) {
        if (url.indexOf('{?}') < 0) { break }
        url = url.replace(/\{\?\}/, args[i] + '')
    }
    // 最后是否有/{?}
    if (url.lastIndexOf('/{?}') > -1) {
        url = url.substr(0, url.lastIndexOf('/{?}'))
    }
    return url
}

const postBase = {
    // 请求的接口，在请求的时候，如axios.get(url,config);这里的url会覆盖掉config中的url
    url: '/post',
    // 请求方法同上
    method: 'post', // default
    // 请求头信息
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    // 设置超时时间
    timeout: 500000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    // withCredentials: true, // default
    // 返回数据类型
    responseType: 'json' // default
}

const postBaseResponseText = {...postBase, responseType: 'text' }

const postBaseFormtype = {...postBase,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset-utf-8'
    }
}

const postFile = {...postBase,
    timeout: 1800000,
    // 请求头信息
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset-utf-8'
        'Content-Type': 'multipart/form-data'
    }
}

const postResArraybuffer = {...postBase,
    // 请求头信息
    headers: {
        'Content-Type': 'application/json;charset=GB2312'
    },
    // 返回数据类型
    responseType: 'arraybuffer'
}

/**
* option {
   isLoading: boolean true 菊花， false， 没有菊花（ 相当于无声请求）
   loadingTarget: 覆盖的元素,默认是ts - main - content, 传入body全屏
   loadingText: 请稍等...
   url: '' //可以传apiurl中的key, 也可以传整个url
   query: Object 传递的query对象,
   header: Objet 传递的header对象
   param: 作为post数据传过去，json对象或者字符串, 如果是字符串那么可能是body形式传过去，
   postType: postBase//不写默认 text:postBase_responseText form postBaseFormtype json postBase_jsontype file: post_File, arraybuffer: post_resArraybuffer
   responseType: 'ret_code', 'linkBody'
}
 返回 Promise
*/
export const post = (option, v) => {
    let url = option.url
    let isLoading = option.isLoading
    if (isLoading) {
        widget.hideLoading();
        widget.loading()
    }
    var param


    if (option.param) {
        if (typeof option.param === 'string') {
            param = option.param
        } else {
            if (!option.postType || option.postType === 'file') {
                param = option.param
            } else {
                param = new URLSearchParams()
                for (let x in option.param) {
                    param.append(x, option.param[x])
                }
            }
        }
    }
    if (option.query && typeof option.query === 'object') {
        let queryString = ''
        let keyList = Object.keys(option.query)
        keyList.forEach(key => {
            let value = option.query[key]
            if (value) {
                queryString += `${key}=${value}&`
            }
        })
        let urlString = `${url}?${queryString}`
        url = urlString.substr(0, urlString.length - 1)
    }
    let postType = Object.assign({}, postBase)

    if (option.postType === 'form') {
        postType = Object.assign({}, postBaseFormtype)
    }
    if (option.header && typeof option.header === 'object') {
        postType.headers = Object.assign(postType.headers, option.header)
    }
    let method = option.method ? option.method : 'post'
    return new Promise((resolve, reject) => {
        const noData = (method === 'get' || method === 'delete')
        axios[method](url, (noData ? postType : param), (noData ? '' : postType)).then((response) => {
            if (isLoading) {
                widget.hideLoading();
            }
            if (response.status === 200) {
                if (!option.responseType) {
                    //Array.isArray(response.data) && 
                    if (response.data.Success || response.data.suc || response.data.R == 0 || response.data.ret_code == 0 || response.data.return_code == 0 || (response.data.length > 0)) {
                        resolve(response.data)
                    } else {
                        if (isLoading) {
                            widget.hideLoading();
                            widget.toast(response.data.Message || (response.data.mes || response.data.ret_info || response.data.I || '系统异常，请稍后再试'))
                        }
                        reject(response.data)
                    }
                }
            } else {
                if (isLoading) {
                    widget.toast('系统异常，请稍后再试')
                }
                reject(response)
            }
        }).catch((error) => {
            if (isLoading) {
                widget.hideLoading();
                widget.toast('系统异常，请稍后再试', 'cancel')
            }
            reject(error || {})
        })

    })
}

//新增v参数 原因：预览pdf接口不需要 hospitalId参数
export const get = (option, v) => {
    option.method = 'get'
    return post(option, v)
}