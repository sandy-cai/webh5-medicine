import { date } from './date'
import { cache, cacheKey } from './cache'
import { validate } from './validate'
import { widget } from './widget'
import { post, get } from './request'
import { apis } from './api'

const logger = {
    log(message) {
        if (process.env.NODE_ENV != 'production') {
            console.log(message)
        }
    }
}

function pushArray(targetArray, dataArray) {
    if (!dataArray) return
    if (!(dataArray instanceof Array)) {
        console.error('dataArray的参数必须是一个数组')
        return
    }
    dataArray.forEach((item) => {
        targetArray.push(item)
    })
}

const util = {
    // 深拷贝
    deepCopy(source, target) {
        target = target || {}
        for (var i in source) {
            if (typeof source[i] === 'object') {
                target[i] = (source[i].constructor === Array) ? [] : {}
                util.deepCopy(source[i], target[i])
            } else {
                target[i] = source[i]
            }
        }
        return target
    },

    // 生成uuid
    guid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        }
        return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
    },

    // nodata
    switchNodata(list) {
        return !list || list.length === 0
    }
}

export {
    logger,
    date,
    cache,
    cacheKey,
    validate,
    widget,
    post,
    get,
    apis,
    pushArray,
    util
}