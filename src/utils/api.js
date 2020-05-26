let mobileUrl = process.env.URL.mobile

export const apis = {
    mobileUrl,
    login: mobileUrl + '/djapi/User/Login',
    getList: mobileUrl + '/djapi/MedicalApply/GetList',
    save: mobileUrl + '/djapi/MedicalApply/Save',
    getPublicSet: mobileUrl + '/djapi/User/GetPublicSet'


}