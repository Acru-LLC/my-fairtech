import ApiService from "@/shared/services/api.service";
import {TokenService} from "@/shared/services/storage.service";
/*
 * {{ mainUrl }}
 * MUST BE SENT SOME OF THESE FUNCTIONS*/
const helperService = {
    getTemplateByCategoryId(categoryId, keyword, body, withLoader = true) {
        return ApiService.post(`templates/get-by-category/${categoryId ? categoryId : ''}?keyword=${keyword ? keyword : ''}`, body, withLoader);
    },
    getTemplateListByCategoryId(categoryId, personType, keyword, body) {
        return ApiService.post(`templates/sample/list-search?keyword=${keyword ? keyword : ''}&categoryId=${categoryId ? categoryId : ''}&personType=${personType ? personType : ''}`, body);
    },
    getApplicationFromDxaById(applicationId) {
        return ApiService.get(`application-dxa/get-all-information?id=${applicationId ? applicationId : ''}`
        );
    },
    getApplicationInfoBystepId(applicationId, stepId) {
        return ApiService.get(`application-dxa/get-info/${applicationId}/${stepId}`
        );
    },
    getVisaAllInfoById(applicationId) {
        return ApiService.get(`application-dxa/get-all-header-info?id=${applicationId ? applicationId : ''}`
        );
    },
    getApplicationFilesBystepId(applicationId, fileId, applicationDXAId) {
        return ApiService.get(`application-dxa/get-file-info/${parseInt(fileId)}?application_id=${applicationId}&applicationDXAId=${applicationDXAId}`
        );
    },
    getApplicationFilesDownloadById(applicationId, fileId) {
        return ApiService.customRequest({
                url: `application-dxa/upload-file/${parseInt(fileId)}?application_id=${applicationId}`, //your url
                method: 'GET',
                responseType: 'blob', // important
            }
        );
    },
    getApplicationTree(applicationId) {
        return ApiService.get(
            `before-commission/application/get-tree/${applicationId}`
        );
    },
    petrolPricesByDate(fromDate, toDate, regionId, withLoader = false) {
        return ApiService.post(`docReport/petrol-report?fromDate=${fromDate ? fromDate : ''}&toDate=${toDate ? toDate : ''}&regionId=${regionId ? regionId : ''}`, {}, withLoader);
    },
    testTelegramBotApi(docTableId, petrolId, withLoader = false) {
        return ApiService.post(
            `docReport/petrol-data-for-telegram-bot?docTableId=${docTableId}&petrolId=${petrolId}`, {}, withLoader
        );
    },
    fetchDateTypesByParentId(parentId, payload, withLoader = false) {
        return ApiService.post(
            `dateType/listByParentId/${parentId}`, payload, withLoader
        );
    },
    getContractorBankAccounts(contractorId) {
        return ApiService.get(
            `contractor/get-contractor-banks/${contractorId}`
        );
    },
    getContractorFounders(contractorId) {
        return ApiService.get(
            `contractor/get-contractor-founders/${contractorId}`
        );
    },
    getContractorDirector(contractorId) {
        return ApiService.get(
            `contractor/get-contractor-director/${contractorId}`
        );
    },
    getContractorAccounter(contractorId) {
        return ApiService.get(
            `contractor/get-contractor-accountant/${contractorId}`
        );
    },
    approveReestrDoc: function (docId, withLoader = false) {
        return ApiService.get(
            `reestr/contractor-reestr-documents/reestr-document-confirmation/${docId}`, withLoader
        );
    },
    updateReestr: function (mainUrl, payload, appendUrl, withLoader = false) {
        if (appendUrl) {
            return ApiService.post(`${mainUrl}/update/${appendUrl}`, payload, withLoader);
        } else {
            return ApiService.post(`${mainUrl}/update/${payload.id}`, payload, withLoader);
        }
    },
    getContractorsByProdectOrServiceTypeIdAndProductOrServiceId(appendUrl, withLoader = false) {
        return ApiService.post(
            `reestr/contractor-reestr-documents/list-search-for-contractor-by-is-republic/${appendUrl}`, {}, withLoader
        );
    },
    searchReestrContractorListByIndividualsGroupId(appendUrl, withLoader = false) {
        return ApiService.post(
            `reestr/contractor-reestr-documents/list-search-for-contractor-children-by-is-republic-for-group-of-individuals/${appendUrl}`, {}, withLoader
        );
    },
    searchReestrContractorListByParentId(appendUrl, withLoader = false) {
        return ApiService.post(
            `reestr/contractor-reestr-documents/list-search-for-contractor-children-by-is-republic/${appendUrl}`, {}, withLoader
        );
    },
    searchReestrHistoryListByContractorId(appendUrl, withLoader = false) {
        return ApiService.post(
            `reestr/contractor-reestr-documents/list-search-by-is-republic/${appendUrl}`, {}, withLoader
        );
    },
    searchReestrListByRepublic(appendUrl, withLoader = false) {
        return ApiService.post(
            `reestr/contractor-reestr-documents/list-search-by-is-republic/${appendUrl}`, {}, withLoader
        );
    },
    getReestrByRepublic(appendUrl, withLoader = false) {
        return ApiService.post(
            `reestr/contractor-reestr-documents/get/product-or-service-type-by-is-republic/by-region/${appendUrl}`, {}, withLoader
        );
    },
    getReestrByRegionId(regionId, appendUrl, withLoader = false) {
        return ApiService.post(
            `reestr/contractor-reestr-documents/get/product-or-service-type/by-region/${appendUrl}?regionId=${regionId}`, {}, withLoader
        );
    },
    getProductOrServicesByTypeId(typeId, payload, withLoader = false) {
        let tmpPayload = Object.assign({}, payload)
        tmpPayload.page = tmpPayload.page - 1
        return ApiService.post(
            `directory/product-or-services/get/by-type-id/${typeId}?keyword=${payload.keyword ? payload.keyword : ''}`, tmpPayload, withLoader
        );
    },
    savePermittedDepsByUserId(userId, payload, withLoader = false) {
        return ApiService.post(
            `department/save/permitted/by-user-id/for-dep-perm-control/${userId}`, payload, withLoader
        );
    },
    fetchControlPermittedDepsByUser(userId, withLoader = false) {
        return ApiService.get(
            `department/get/checked/permitted/by-user-id/for-dep-perm-control/${userId}`, withLoader
        );
    },
    getAdConstructionsForMap: function (payload, withLoader = false) {
        return ApiService.post(`contractor-advertising-construction/get-all/for-map?passportNumber=${payload.passportNumber}&contractorIds=${payload.contractorIds}&regionIds=${payload.regionIds}&districtIds=${payload.districtIds}&designTypeIds=${payload.designTypeIds}`, null, withLoader);
    },
    getAdConstructionsForMapEAuction: function (payload, withLoader = false) {
        return ApiService.post(`contractor-advertising-construction/get-all/for-map/e-auction?passportNumber=${payload.passportNumber}&contractorIds=${payload.contractorIds}&regionIds=${payload.regionIds}&districtIds=${payload.districtIds}&designTypeIds=${payload.designTypeIds}`, null, withLoader);
    },
    getPetrolStationsForMap: function (payload, withLoader = false) {
        return ApiService.post(`petrol/get-all/for-map?name=${payload.name}&contractorIds=${payload.contractorIds}&regionIds=${payload.regionIds}&districtIds=${payload.districtIds}`, null, withLoader);
    },
    getSugarStationsForMap: function (payload, withLoader = false) {
        return ApiService.post(`sugar/get-all/for-map?name=${payload.name}&contractorIds=${payload.contractorIds}&regionIds=${payload.regionIds}&districtIds=${payload.districtIds}`, null, withLoader);
    },
    getBakeryStationsForMap: function (payload, withLoader = false) {
        return ApiService.post(`bakery/get-all/for-map?name=${payload.name}&contractorIds=${payload.contractorIds}&regionIds=${payload.regionIds}&districtIds=${payload.districtIds}`, null, withLoader);
    },
    getFlourStationsForMap: function (payload, withLoader = false) {
        return ApiService.post(`flour/get-all/for-map?name=${payload.name}&contractorIds=${payload.contractorIds}&regionIds=${payload.regionIds}&districtIds=${payload.districtIds}`, null, withLoader);
    },
    getAdDesignTypesByActiveStatus(withLoader = false) {
        return ApiService.get(
            `directory/advertisement-design-type/get-all-by-active-status/`, withLoader
        );
    },
    getVolumesByActiveStatus(withLoader = false) {
        return ApiService.get(
            `directory/advertisement-design-type/get-all-by-active-status/`, withLoader
        );
    },
    getVolumeTypesByActiveStatus(withLoader = false) {
        return ApiService.get(
            `directory/advertisement-volume-types/get-all-by-active-status/`, withLoader
        );
    },
    getPrivilegeCoefficientValueByAdDesignTypeId(adDesignTypeId, withLoader = false) {
        return ApiService.get(
            `directory/advertisement-design-type_privilege_coefficients/get-coefficient-by-design-type-id?designTypeId=${adDesignTypeId}`, withLoader
        );
    },
    getCoefficientValueByZoneAndDistrictIds(districtId, adZoneId, withLoader = false) {
        return ApiService.get(
            `directory/coefficients/get-by-district-and-zone/${districtId}/${adZoneId}`, withLoader
        );
    },
    getMinCollectionValueByRegionAndDistrictIds(regionId, districtId, adLocationTypeId, adDesignTypeId, adVolumeTypeId, withLoader = false) {
        return ApiService.get(
            `directory/minimum-collections/get-by-region?regionId=${regionId}&districtId=${districtId}&locationTypeId=${adLocationTypeId}&designTypeId=${adDesignTypeId}&volumeTypeId=${adVolumeTypeId ? adVolumeTypeId : ''}`, withLoader
        );
    },
    getAdZonesByDistrictId(districtId, withLoader = false) {
        return ApiService.get(
            `directory/coefficients/get-zones/by-district-id/${districtId}`, withLoader
        );
    },
    getGroupOfRegion(regionId, withLoader = false) {
        return ApiService.get(
            `directory/group-regions/get-group/by-region-id/${regionId}`, withLoader
        );
    },
    getAdVolumeTypesByAdLocationTypeId(adLocationTypeId, withLoader) {
        return ApiService.get(
            `directory/advertisement-volume-types/get-all/${adLocationTypeId}`, withLoader
        );
    },
    getAdDesignTypesByAdLocationTypeId(adLocationTypeId, regionId, withLoader) {
        return ApiService.get(
            `directory/advertisement-design-type/get-design-types/${regionId}/${adLocationTypeId}`, withLoader
        );
    },
    updateUserPasswordByAdmin(payload, withLoader) {
        return ApiService.put(
            `user/update-password/no-checking`, payload, withLoader
        );
    },
    updateUserPassword(payload, withLoader) {
        return ApiService.put(
            `user/update-password`, payload, withLoader
        );
    },
    updateRolePermissionsById(role, withLoader) {
        return ApiService.post(
            `role/add-permissions/${role.id}`, role.permissionIds, withLoader
        );
    },
    permissionsListByRoleId(roleId, withLoader) {
        return ApiService.get(
            `permission/list/by-role-id/${roleId}`, withLoader
        );
    },
    updateDepartment(payload) {
        return ApiService.put(
            `department/update/${payload.departmentDto.id}`, payload
        );
    },
    validateInnFromApi(inn, withLoader = false) {
        return ApiService.get(
            `contractor/check-inn-is-valid?inn=${inn}`, withLoader
        );
    },
    checkAdPassportNumber(passportNumber) {
        return ApiService.get(`contractor-advertising-construction/check-passport-number?passportNumber=${passportNumber}`)
    },
    checkAdPassportNumberByRegion(passportNumber, regionId) {
        return ApiService.get(`contractor-advertising-construction/check-passport-number/by-region?passportNumber=${passportNumber}&regionId=${regionId}`)
    },
    findContractorByInn(inn) {
        return ApiService.get(
            `department/check-inn?inn=${inn}`
        );
    },
    getIndividualInfoByInn(inn, withLoader = false) {
        return ApiService.get(
            `employee/get-by-inn-from-soliq/${inn}`, withLoader
        );
    },
    getSingleContractorByInn(inn) {
        return ApiService.get(
            `contractor/get-by-inn/${inn}`
        );
    },
    getContractorInfoByInnForCreate(inn, pinfl, isYur, withLoader = false) {
        return ApiService.get(
            `contractor/get-new-contractor-info-from-soliq-by-inn/for-create?inn=${inn}&pinfl=${pinfl}&isYur=${Boolean(isYur)}`, withLoader
        );
    },
    getContractorInfoByInnForUpdate(inn, pinfl, isYur, withLoader = false) {
        return ApiService.get(
            `contractor/get-new-contractor-info-from-soliq-by-inn/for-update?inn=${inn}&pinfl=${pinfl}&isYur=${Boolean(isYur)}`, withLoader
        );
    },
    getCuratorsForDepartment() {
        return ApiService.get(
            `department/get-department/curators`
        );
    },
    getGeoLocationsByParentId(id) {
        return ApiService.get(`geographical-region/list/by-parent-id/${id}`);
    },
    getGeoLocationsByMultipleParentIds(ids) {
        return ApiService.get(`geographical-region/get-all-district/by-region-ids?regionIds=${ids}`);
    },
    fetchRegions(withLoader = false) {
        return ApiService.get(`geographical-region/get-all-region`, withLoader);
    },
    fetchRegions14(keyword = '', withLoader = false) {
        return ApiService.get(`geographical-region/get-region-tree?keyword=${keyword}`, withLoader);
    },
    fetchRegionsForAdvertisementByCurrentUserId() {
        return ApiService.get(`geographical-region/get-all-regions-by-current-user-id/for-advertisement`);
    },
    fetchRegionsForPetrolByCurrentUserId() {
        return ApiService.get(`geographical-region/get-all-regions-by-current-user-id/for-petrol`);
    },
    fetchRegionsForSugarByCurrentUserId() {
        return ApiService.get(`geographical-region/get-all-regions-by-current-user-id/for-sugar`);
    },
    fetchRegionsForBakeryByCurrentUserId() {
        return ApiService.get(`geographical-region/get-all-regions-by-current-user-id/for-bakery`);
    },
    fetchRegionsForFlourByCurrentUserId() {
        return ApiService.get(`geographical-region/get-all-regions-by-current-user-id/for-flour`);
    },
    fetchRegionsForContractorReestrByCurrentUserId() {
        return ApiService.get(`geographical-region/get-all-regions-by-current-user-id/for-reestr`);
    },
    searchEmployeesByDep: function (payload, depId = null, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        return ApiService.post(`employee/search/by-depId/${depId}`, myPayload, withLoader);
    },
    searchEmployeesByDepID: function (payload) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        return ApiService.post(`employee/getByYurDepForSign`, myPayload);
    },
    searchEmployeesWithoutDep: function (payload) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        return ApiService.post(`employee/search/without/dep`, myPayload);
    },
    createDepWithLegalInfo: function (payload) {
        return ApiService.post(`department/finish`, payload);
    },
    getRefByCode: function (refCode, withLoader = false) {
        return ApiService.get(`reference/get-code/${refCode}`, withLoader);
    },
    getRefByCodeNew: function (refCode, withLoader = false) {
        return ApiService.get(`reference/get-reference-by-code/${refCode}`, withLoader);
    },
    getEmployeeList: function (keyword, withLoader = false) {
        return ApiService.get(`employee/get-all-for-create-user/by-keyword?keyword=${keyword}`, withLoader)
    },
    getCountNotifications() {
        return ApiService.get(`report/advertisement-notifications/unread-messages`)
    },
    getNotificationList(payload) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        return ApiService.post(`notification/list-search?search=${myPayload.searchTitle}`)
    },
    acceptById(notificationId) {
        return ApiService.post(`report/advertisement-notifications/accepted-notification/${notificationId}`)
    },
    rejectById(notificationId, payload, withLoader) {
        let myPayload = Object.assign({}, payload)
        return ApiService.post(`report/advertisement-notifications/rejected-notification/${notificationId}`, myPayload, withLoader)
    },
    getAllReceivers(notificationId, withLoader) {
        return ApiService.post(`report/advertisement-notifications/outgoing-receivers/${notificationId}`, withLoader)
    },
    getAllReceiversForReport(reportId, withLoader) {
        return ApiService.post(`report/general-inventory-reports/outgoing-receivers/${reportId}`, withLoader)
    },
    acceptReportById(reportId) {
        return ApiService.post(`report/general-inventory-reports/accepted-report/${reportId}`)
    },
    rejectReportById(reportId) {
        return ApiService.post(`report/general-inventory-reports/rejected-report/${reportId}`)
    },
    makeReadNotification(id) {
        return ApiService.put(`notification/make-read-notification/${id}`)
    },
    getCounts() {
        return ApiService.get(`report/dashboard/get-count`)
    },
    getCountsByRegion() {
        return ApiService.get(`report/dashboard/get-all-counts-by-region`)
    },
    sendMessageToUser(data) {
        return ApiService.post(`murojaat/send-message`, data);
    },
};
export default helperService;