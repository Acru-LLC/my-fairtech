import ApiService from '@/shared/services/api.service'

export default {
    getCurrent: async function () {
        return ApiService.get( `/employee/currentEmpId` )
    },
    getListByYurDepartment(data) {
        return ApiService.post( `/employee/get-by-yur-dep?name=${data.search}&yurDepId=${data.yurDepId ? data.yurDepId : ''}`, data.params )
    },
    getListByYurDepartmentNotInProj(data) {
        return ApiService.post( `/employee/get-by-yur-dep-notInProject?name=${data.search}&projectId=${data.projectId}`, data.params )
    },
    getCurrentUserExperience() {
        return ApiService.get( `/employee/listEmployeeExperience` )
    },
    lisByDepId({id, data, search}) {
        return ApiService.post( `/employee/list-by-depId/${id}?search=${search}`, data )
    },
    getPhoneEmail({search, pg}) {
        return ApiService.post( `/employee/get-email-phone-by-yur-dep?name=${search}`, pg )
    },
    getNearBirthdays() {
        return ApiService.get( `/employee/lateAnniversary` )
    },
    eliminateBirthDay() {
        return ApiService.get( `/employee/eliminateBirthday` )
    },
    turnOffBirthDay() {
        return ApiService.get( `/employee/turnOffEliminateBirthday` )
    },
    getByYurDepForSign(data) {
        return ApiService.post( `/employee/getByYurDepForSign?keyword=${data.search}`, data.params )
    },
    getAllInManagement() {
        return ApiService.get( `/employee/get-all-employee/in-management`)
    },

}
