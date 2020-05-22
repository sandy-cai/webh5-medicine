
const lazyload = (name) => (resolve) => require([`@/pages/${name}`], resolve)

const isIOS = () => {
    let u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
}

const isAndroid = () => {
    let u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
}

const init =() => {
    
}

export {
    init,
    lazyload,
    isWeiXin,
    isIOS,
    isAndroid
}