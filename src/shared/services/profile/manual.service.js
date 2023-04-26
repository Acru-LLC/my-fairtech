import ApiService from '../api.service'

const ManualService = {
    getLanguageList: function (data) {
        return ApiService.get(`/manual/LanguageSelectList`)
    },
    getRoleList(data) {
        return ApiService.get(`/manual/RoleSelectList`)

    },
    getModuleList() {
        return ApiService.get(`/manual/ModuleSelectList`)
    },
    getStateList() {
        return ApiService.get(`/manual/StateSelectList`)
    },
    getMinimumValueList() {
        return ApiService.get(`/manual/MinimumValueTypeSelectList`)
    },
    getAppointmentTypeList() {
        return ApiService.get(`/manual/AppointmentTypeSelectList`)
    },
    getDocumentTypeList(type) {
        return ApiService.get(`/manual/DocumentTypeSelectList?documentGroupId=${type}`)
    },
    getActivityField() {
        return ApiService.get(`/manual/ActivityFieldSelectList`)
    },
    getContractor(data) {
        return ApiService.get(`/manual/ContractorSelectList?Search=${data.Search}&sortBy=${data.SortColumn}&orderType=${data.OrderType}&page=${data.PageNumber}&pageSize=${data.PageLimit}`)
    },
    getDocumentTransferMethod() {
        return ApiService.get(`/manual/DocumentTransferMethodSelectList`)
    },
    getDocumentStateList() {
        return ApiService.get(`/manual/DocumentStateSelectList`)
    },

    getUserList(data) {
        return ApiService.get(`/manual/UserSelectList?Search=${data.Search ?? ""}&sortBy=${data.SortColumn}&orderType=${data.OrderType}&page=${data.PageNumber}&pageSize=${data.PageLimit}&DepartmentId=${data.DepartmentId ?? ""}&IsOrdRequest=true`)
    },
    getUserListAll(data) {
        return ApiService.get(`/manual/UserSelectList?DepartmentId=${data.DepartmentId ?? ""}&IsOrdRequest=true`)
    },

    getMailingPurposeSelectList() {
        return ApiService.get(`/manual/MailingPurposeSelectList`)
    },

    getProcessSelectList(value) {
        return ApiService.get(`/manual/ProcessSelectList?processGroup=${value}`)
    },
    getDocumentGroupSelectList() {
        return ApiService.get(`/manual/DocumentGroupSelectList`)
    },

    getEmployeeSelectList(data) {
        return ApiService.get(`/manual/EmployeeSelectList?Search=${data.Search ?? ""}&sortBy=${data.SortColumn}&orderType=${data.OrderType}&page=${data.PageNumber}&pageSize=${data.PageLimit}&templateCode=${data.templateCode ? data.templateCode : ""}&DepartmentId=${data.DepartmentId ?? ""}&PositionId=${data.PositionId ?? ""}&IsOrdRequest=${data.IsOrdRequest ?? ""}`)
    },
    getEmployeeSelectListNew(data) {
        return ApiService.get(`/manual/EmployeeSelectList?IsOrdRequest=${data.IsOrdRequest ?? ""}&AssignmentTemplateTableId=${data.AssignmentTemplateTableId ?? ""}`)
    },
    getEmployeeSelectListFromArray(array) {
        let query = "";
        array.forEach(el => {
            query += `&ids=${el}`;
        });
        return ApiService.get(`/manual/EmployeeSelectList?IsInitQuery=true${query}`)
    },
    getPositionSelectList(data) {
        return ApiService.get(`/manual/PositionSelectList`)
    },
    getPositionTypeSelectList(data) {
        return ApiService.get(`/manual/PositionTypeSelectList`)
    },
    getCurrencyList(data) {
        return ApiService.get(`/manual/CurrencySelectList`)
    },
    getLogTypeSelectList(data) {
        return ApiService.get(`/manual/LogTypeSelectList`)
    },
    getRegionList(data) {
        return ApiService.get(`/manual/RegionSelectList`)
    },
    getOkedList(data) {
        return ApiService.get(`/manual/OkedSelectList`)
    },
    getDocumentTemplateTypeSelectList(data) {
        return ApiService.get(`/manual/DocumentTemplateTypeSelectList`)
    },
    getDocumentTypeGroupSelectList(data) {
        return ApiService.get(`/manual/DocumentTypeGroupSelectList`)
    },


    getUserListForUserCrud(data) {
        return ApiService.get(`/manual/EmployeeSelectList?page=${data.PageNumber}&pageSize=${data.PageLimit}&IsOnlyRegistered=true&IsOnlyAppointed=true`)
    },

    getDepartmentSelectList(data) {
        return ApiService.get(`/manual/DepartmentSelectList`)
    },
    getDocumentAssignmentTemplateFilterTypeSelectList(data) {
        return ApiService.get(`/manual/DocumentAssignmentTemplateFilterTypeSelectList`)
    },
    getDocumentAssignmentGroupSelectList(data) {
        return ApiService.get(`/manual/DocumentAssignmentGroupSelectList`)
    },


    getUserListFromArray(array) {
        let query = "";
        array.forEach(el => {
            query += `&ids=${el}`;
        });
        return ApiService.get(`/manual/UserSelectList?IsInitQuery=true${query}`)
    },
    getDocumentManualRowSelectList(data) {
        return ApiService.get(`/manual/DocumentManualRowSelectList?DocumentManualCode=${data.code}&Search=${data.Search ?? ""}&sortBy=${data.SortColumn}&orderType=${data.OrderType}&page=${data.PageNumber}&pageSize=${data.PageLimit}`)
    },
    getDocumentManualRowSelectListByRelatedId(data) {
        return ApiService.get(`/manual/DocumentManualRowSelectList?RelatedId=${data.relatedId}&DocumentManualCode=${data.code}&Search=${data.Search ?? ""}&sortBy=${data.SortColumn}&orderType=${data.OrderType}&page=${data.PageNumber}&pageSize=${data.PageLimit}`)
    },


};
export default ManualService;