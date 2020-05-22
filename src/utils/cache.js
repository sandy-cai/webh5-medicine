import { Base64 } from 'js-base64'

/**
 * 可以加入base64加密，暂时不做处理
 */

/**
 *  一些静态的key放在这里统一管理
 */
export const cacheKey = {
    openId: 'open_id',
    hospitalId: 'hospital_id',
    isScanCode: 'is_scan_code',
    userInfo: 'user_info',
    applyInfo: 'apply_info'
}

export const cache = {
    set(key, value, isSession) {
        let data = JSON.stringify(value)
        if (process.env.NODE_ENV === 'production') {
            data = Base64.encode(data)
        }
        let storage = isSession ? sessionStorage : localStorage;
        storage.setItem(key, data)
    },
    get(key, isSession) {
        let storage = isSession ? sessionStorage : localStorage;
        let data = storage.getItem(key)
        if (!data) return null
        if (process.env.NODE_ENV === 'production') {
            data = Base64.decode(data)
        }
        let t = data ? JSON.parse(data) : null
        return t
    },
    remove(key, isSession) {
        let storage = isSession ? sessionStorage : localStorage;
        storage.removeItem(key)
    }
}