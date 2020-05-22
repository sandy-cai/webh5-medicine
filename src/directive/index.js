const VueWechatTitle = {
    install(vue) {
        var setWechatTitle = function(title) {
            if (title === undefined || window.document.title === title) {
                return
            }
            document.title = title
            var mobile = navigator.userAgent.toLowerCase()
            if (/iphone|ipad|ipod/.test(mobile)) {
                var iframe = document.createElement('iframe')
                iframe.style.cssText = 'display:none; width: 1px; height: 1px;';

                let img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAXFJREFUOBGVk89OwkAQxr8uRAxREaIxgHc9CSQePGgEDfjn5t27b+BD+AweTbgakhpDMPoCEjEevMlBaWIMhIhYxFJnVlqpElr3Mruz85v5pttRwOvyZB69zhFMM02nKLtGLA2KcgUROERm/1GRsKFXCIiMgIZd1eEbTwhZ+f8wJ4wwK/qyh1Vw91HLgqLcerYTLU/OoLCURWwsaPmifmvnZlemZnGe2oZhmvQNf6JZgetaDc2hSHC318NG+QxPnbbN2AlYFstLTjgfIxOOUuUttA0DGYIrrboN88ZOwLLWpr8rLQZDMigXiUNN5ND8/EC6rOLureGAHQlY1u5NEUGfH6XUDg7iCygksnjp6li/VnHfbv6B2aGgdGwO3myGY1CTOQSED9X3V9nzg94aDHHs7RYs70Wjhr3bEk6fq7LyKJgZVlAj6/lfsAr1rSbkYPzyej7SUAk5VYDzbbxlqDMreCR5qkhJnjjNA8vjnJcMsV+U9HJbtBjbzgAAAABJRU5ErkJggg=='
                iframe.setAttribute('src', img)
                var iframeCallback = function() {
                    setTimeout(function() {
                        iframe.removeEventListener('load', iframeCallback)
                        document.body.removeChild(iframe)
                    }, 0)
                }
                iframe.addEventListener('load', iframeCallback)
                document.body.appendChild(iframe)
            }
        }
        vue.directive('wechat-title', function(el, binding) {
            setWechatTitle(binding.value)
        })
    }
}
export {
    VueWechatTitle
};