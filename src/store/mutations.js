import { cache, cacheKey } from '@/utils/index'
const mutations = {
    //更新openId
    SET_OPENID(state, v) {
        state.openId = v
        cache.set(cacheKey.openId, v, true);
    },
    //用户信息
    SET_USER_INFO(state, v) {
        state.userInfo = v
        cache.set(cacheKey.userInfo, v, true);
    }
}

export default mutations