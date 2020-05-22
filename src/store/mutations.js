import { cache, cacheKey } from '@/utils/index'
const mutations = {
    //更新openId
    SET_OPENID(state, v) {
        state.openId = v
        cache.set(cacheKey.openId, v, true);
    },
}

export default mutations