import { Dialog } from 'vant';
import { Toast } from 'vant';
Dialog.setDefaultOptions({
    className: 'text-align-center'
})
export const widget = {
    toast(message, type, time) {
        return new Promise((resolve, reject) => {
            let duration = time ? time : 2000;
            Toast({
                type: type ? type : 'text',
                message: message,
                forbidClick: true,
                duration: duration
            })
            setTimeout(() => {
                resolve();
            }, duration)
        })

    },
    toastSuccess(message, time) {
        return this.toast(message, 'success', time)
    },
    toastWarn(message, time) {
        return this.toast(message, 'fail', time)
    },
    loading(message) {
        Toast.loading({
            mask: true,
            message: message ? message : '加载中...',
            duration: 60000
        });
    },
    hideLoading() {
        Toast.clear();
    },
    alert: (content, title, buttonName) => {
        return Dialog.alert({
            title: title ? title : '提示',
            message: content,
            confirmButtonText: buttonName ? buttonName : '确定'
        })
    },
    confirm(content, title, sureName, cancelName) {
        return Dialog.confirm({
            title: title ? title : '提示',
            message: content,
            confirmButtonText: sureName ? sureName : '确定',
            cancelButtonText: cancelName ? cancelName : '取消',
        })
    },
}