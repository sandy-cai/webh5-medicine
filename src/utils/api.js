let mobileUrl = process.env.URL.mobile

export const apis = {
    mobileUrl,
    getHospitalList: mobileUrl + '/api/hospital/gethospitallist',//获取所有医院(体检中心)列


}