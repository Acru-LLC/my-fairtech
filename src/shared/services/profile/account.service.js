import ApiService from '../api.service'

const AccountService = {
    getAllUsers(data) {
        return ApiService.post(`Account/GetList`, data)
    },
    getAdminAllUsers(data) {
        return ApiService.post(`Account/GetList`, data)
    },
    getOrgUserList(data) {
        return ApiService.post(`Account/GetOrgUserList`, data)
    },
    addNewUserToOrg(data) {
        return ApiService.post(`Account/Update`, data)
    },
    getUserById(id) {
        return ApiService.get(`Account/Get?id=${id}`,)
    },
    setLanguage(data) {
        return ApiService.post(`/Account/SetUserLanguage`, data)
    },
    delete(id) {
        return ApiService.delete(`/Account/Delete?id=${id}`)
    },
    getKeyForLoginSign(inn) {
        return ApiService.get(`Account/GetKeyForLoginSign?inn=${inn}`)
    },

    getUserInfo() {
        return ApiService.get(`/user/get-user/for-profile `)
    },
    changePassword(data) {
        return ApiService.put(`/user/update-password`, data)
    },
    getUserPhoneNumber(username) {
        return ApiService.get(`/Account/GetUserPhoneNumber?username=${username}`)
    },
    restoreUserPassword(data) {
        return ApiService.post(`/Account/RestoreUserPassword`, data)
    },
    checkUsername(username) {
        return ApiService.get(`/Account/IsUserNameFree?username=${username}`)
    },
    changeUserRole(data) {
        return ApiService.post(`/Account/ChangeUserRole`, data)
    },
    isOrgNotRegistered(inn) {
        return ApiService.get(`/Account/IsOrganizationNotRegistered?inn=${inn}`)
    },
    changeUserInfo(data) {
        return ApiService.put(`/employee/update/profile`, data)
    },
    changeUserLang(data) {
        return ApiService.post(`/account/ChangeUserLang`, data)
    },
    uploadUserAvatar(bodyFormData) {
        return ApiService.formDataFile(`file-entity/save/employee-photo/for-profile`, bodyFormData)
    },



};
export default AccountService;
