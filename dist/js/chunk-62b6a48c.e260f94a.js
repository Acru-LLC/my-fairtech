(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-62b6a48c"],{"7db0":function(t,e,r){"use strict";var n=r("23e7"),o=r("b727").find,c=r("44d2"),a="find",i=!0;a in[]&&Array(1)[a]((function(){i=!1})),n({target:"Array",proto:!0,forced:i},{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),c(a)},"887a":function(t,e,r){"use strict";r("99af"),r("b0c0");var n=r("f2db"),o=(r("7476"),{getTemplateByCategoryId:function(t,e,r){var o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return n["a"].post("templates/get-by-category/".concat(t||"","?keyword=").concat(e||""),r,o)},getTemplateListByCategoryId:function(t,e,r,o){return n["a"].post("templates/sample/list-search?keyword=".concat(r||"","&categoryId=").concat(t||"","&personType=").concat(e||""),o)},getApplicationFromDxaById:function(t){return n["a"].get("application-dxa/get-all-information?id=".concat(t||""))},getApplicationInfoBystepId:function(t,e){return n["a"].get("application-dxa/get-info/".concat(t,"/").concat(e))},getVisaAllInfoById:function(t){return n["a"].get("application-dxa/get-all-header-info?id=".concat(t||""))},getApplicationFilesBystepId:function(t,e,r){return n["a"].get("application-dxa/get-file-info/".concat(parseInt(e),"?application_id=").concat(t,"&applicationDXAId=").concat(r))},getApplicationFilesDownloadById:function(t,e){return n["a"].customRequest({url:"application-dxa/upload-file/".concat(parseInt(e),"?application_id=").concat(t),method:"GET",responseType:"blob"})},getApplicationTree:function(t){return n["a"].get("before-commission/application/get-tree/".concat(t))},petrolPricesByDate:function(t,e,r){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return n["a"].post("docReport/petrol-report?fromDate=".concat(t||"","&toDate=").concat(e||"","&regionId=").concat(r||""),{},o)},testTelegramBotApi:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return n["a"].post("docReport/petrol-data-for-telegram-bot?docTableId=".concat(t,"&petrolId=").concat(e),{},r)},fetchDateTypesByParentId:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return n["a"].post("dateType/listByParentId/".concat(t),e,r)},getContractorBankAccounts:function(t){return n["a"].get("contractor/get-contractor-banks/".concat(t))},getContractorFounders:function(t){return n["a"].get("contractor/get-contractor-founders/".concat(t))},getContractorDirector:function(t){return n["a"].get("contractor/get-contractor-director/".concat(t))},getContractorAccounter:function(t){return n["a"].get("contractor/get-contractor-accountant/".concat(t))},approveReestrDoc:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].get("reestr/contractor-reestr-documents/reestr-document-confirmation/".concat(t),e)},updateReestr:function(t,e,r){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return r?n["a"].post("".concat(t,"/update/").concat(r),e,o):n["a"].post("".concat(t,"/update/").concat(e.id),e,o)},getContractorsByProdectOrServiceTypeIdAndProductOrServiceId:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].post("reestr/contractor-reestr-documents/list-search-for-contractor-by-is-republic/".concat(t),{},e)},searchReestrContractorListByIndividualsGroupId:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].post("reestr/contractor-reestr-documents/list-search-for-contractor-children-by-is-republic-for-group-of-individuals/".concat(t),{},e)},searchReestrContractorListByParentId:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].post("reestr/contractor-reestr-documents/list-search-for-contractor-children-by-is-republic/".concat(t),{},e)},searchReestrHistoryListByContractorId:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].post("reestr/contractor-reestr-documents/list-search-by-is-republic/".concat(t),{},e)},searchReestrListByRepublic:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].post("reestr/contractor-reestr-documents/list-search-by-is-republic/".concat(t),{},e)},getReestrByRepublic:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].post("reestr/contractor-reestr-documents/get/product-or-service-type-by-is-republic/by-region/".concat(t),{},e)},getReestrByRegionId:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return n["a"].post("reestr/contractor-reestr-documents/get/product-or-service-type/by-region/".concat(e,"?regionId=").concat(t),{},r)},getProductOrServicesByTypeId:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=Object.assign({},e);return o.page=o.page-1,n["a"].post("directory/product-or-services/get/by-type-id/".concat(t,"?keyword=").concat(e.keyword?e.keyword:""),o,r)},savePermittedDepsByUserId:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return n["a"].post("department/save/permitted/by-user-id/for-dep-perm-control/".concat(t),e,r)},fetchControlPermittedDepsByUser:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].get("department/get/checked/permitted/by-user-id/for-dep-perm-control/".concat(t),e)},getAdConstructionsForMap:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].post("contractor-advertising-construction/get-all/for-map?passportNumber=".concat(t.passportNumber,"&contractorIds=").concat(t.contractorIds,"&regionIds=").concat(t.regionIds,"&districtIds=").concat(t.districtIds,"&designTypeIds=").concat(t.designTypeIds),null,e)},getAdConstructionsForMapEAuction:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].post("contractor-advertising-construction/get-all/for-map/e-auction?passportNumber=".concat(t.passportNumber,"&contractorIds=").concat(t.contractorIds,"&regionIds=").concat(t.regionIds,"&districtIds=").concat(t.districtIds,"&designTypeIds=").concat(t.designTypeIds),null,e)},getPetrolStationsForMap:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].post("petrol/get-all/for-map?name=".concat(t.name,"&contractorIds=").concat(t.contractorIds,"&regionIds=").concat(t.regionIds,"&districtIds=").concat(t.districtIds),null,e)},getSugarStationsForMap:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].post("sugar/get-all/for-map?name=".concat(t.name,"&contractorIds=").concat(t.contractorIds,"&regionIds=").concat(t.regionIds,"&districtIds=").concat(t.districtIds),null,e)},getBakeryStationsForMap:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].post("bakery/get-all/for-map?name=".concat(t.name,"&contractorIds=").concat(t.contractorIds,"&regionIds=").concat(t.regionIds,"&districtIds=").concat(t.districtIds),null,e)},getFlourStationsForMap:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].post("flour/get-all/for-map?name=".concat(t.name,"&contractorIds=").concat(t.contractorIds,"&regionIds=").concat(t.regionIds,"&districtIds=").concat(t.districtIds),null,e)},getAdDesignTypesByActiveStatus:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return n["a"].get("directory/advertisement-design-type/get-all-by-active-status/",t)},getVolumesByActiveStatus:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return n["a"].get("directory/advertisement-design-type/get-all-by-active-status/",t)},getVolumeTypesByActiveStatus:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return n["a"].get("directory/advertisement-volume-types/get-all-by-active-status/",t)},getPrivilegeCoefficientValueByAdDesignTypeId:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].get("directory/advertisement-design-type_privilege_coefficients/get-coefficient-by-design-type-id?designTypeId=".concat(t),e)},getCoefficientValueByZoneAndDistrictIds:function(t,e){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return n["a"].get("directory/coefficients/get-by-district-and-zone/".concat(t,"/").concat(e),r)},getMinCollectionValueByRegionAndDistrictIds:function(t,e,r,o,c){var a=arguments.length>5&&void 0!==arguments[5]&&arguments[5];return n["a"].get("directory/minimum-collections/get-by-region?regionId=".concat(t,"&districtId=").concat(e,"&locationTypeId=").concat(r,"&designTypeId=").concat(o,"&volumeTypeId=").concat(c||""),a)},getAdZonesByDistrictId:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].get("directory/coefficients/get-zones/by-district-id/".concat(t),e)},getGroupOfRegion:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].get("directory/group-regions/get-group/by-region-id/".concat(t),e)},getAdVolumeTypesByAdLocationTypeId:function(t,e){return n["a"].get("directory/advertisement-volume-types/get-all/".concat(t),e)},getAdDesignTypesByAdLocationTypeId:function(t,e,r){return n["a"].get("directory/advertisement-design-type/get-design-types/".concat(e,"/").concat(t),r)},updateUserPasswordByAdmin:function(t,e){return n["a"].put("user/update-password/no-checking",t,e)},updateUserPassword:function(t,e){return n["a"].put("user/update-password",t,e)},updateRolePermissionsById:function(t,e){return n["a"].post("role/add-permissions/".concat(t.id),t.permissionIds,e)},permissionsListByRoleId:function(t,e){return n["a"].get("permission/list/by-role-id/".concat(t),e)},updateDepartment:function(t){return n["a"].put("department/update/".concat(t.departmentDto.id),t)},validateInnFromApi:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].get("contractor/check-inn-is-valid?inn=".concat(t),e)},checkAdPassportNumber:function(t){return n["a"].get("contractor-advertising-construction/check-passport-number?passportNumber=".concat(t))},checkAdPassportNumberByRegion:function(t,e){return n["a"].get("contractor-advertising-construction/check-passport-number/by-region?passportNumber=".concat(t,"&regionId=").concat(e))},findContractorByInn:function(t){return n["a"].get("department/check-inn?inn=".concat(t))},getIndividualInfoByInn:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].get("employee/get-by-inn-from-soliq/".concat(t),e)},getSingleContractorByInn:function(t){return n["a"].get("contractor/get-by-inn/".concat(t))},getContractorInfoByInnForCreate:function(t,e,r){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return n["a"].get("contractor/get-new-contractor-info-from-soliq-by-inn/for-create?inn=".concat(t,"&pinfl=").concat(e,"&isYur=").concat(Boolean(r)),o)},getContractorInfoByInnForUpdate:function(t,e,r){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return n["a"].get("contractor/get-new-contractor-info-from-soliq-by-inn/for-update?inn=".concat(t,"&pinfl=").concat(e,"&isYur=").concat(Boolean(r)),o)},getCuratorsForDepartment:function(){return n["a"].get("department/get-department/curators")},getGeoLocationsByParentId:function(t){return n["a"].get("geographical-region/list/by-parent-id/".concat(t))},getGeoLocationsByMultipleParentIds:function(t){return n["a"].get("geographical-region/get-all-district/by-region-ids?regionIds=".concat(t))},fetchRegions:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return n["a"].get("geographical-region/get-all-region",t)},fetchRegions14:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].get("geographical-region/get-region-tree?keyword=".concat(t),e)},fetchRegionsForAdvertisementByCurrentUserId:function(){return n["a"].get("geographical-region/get-all-regions-by-current-user-id/for-advertisement")},fetchRegionsForPetrolByCurrentUserId:function(){return n["a"].get("geographical-region/get-all-regions-by-current-user-id/for-petrol")},fetchRegionsForSugarByCurrentUserId:function(){return n["a"].get("geographical-region/get-all-regions-by-current-user-id/for-sugar")},fetchRegionsForBakeryByCurrentUserId:function(){return n["a"].get("geographical-region/get-all-regions-by-current-user-id/for-bakery")},fetchRegionsForFlourByCurrentUserId:function(){return n["a"].get("geographical-region/get-all-regions-by-current-user-id/for-flour")},fetchRegionsForContractorReestrByCurrentUserId:function(){return n["a"].get("geographical-region/get-all-regions-by-current-user-id/for-reestr")},searchEmployeesByDep:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=Object.assign({},t);return o.page-=1,n["a"].post("employee/search/by-depId/".concat(e),o,r)},searchEmployeesByDepID:function(t){var e=Object.assign({},t);return e.page-=1,n["a"].post("employee/getByYurDepForSign",e)},searchEmployeesWithoutDep:function(t){var e=Object.assign({},t);return e.page-=1,n["a"].post("employee/search/without/dep",e)},createDepWithLegalInfo:function(t){return n["a"].post("department/finish",t)},getRefByCode:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].get("reference/get-code/".concat(t),e)},getRefByCodeNew:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].get("reference/get-reference-by-code/".concat(t),e)},getEmployeeList:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return n["a"].get("employee/get-all-for-create-user/by-keyword?keyword=".concat(t),e)},getCountNotifications:function(){return n["a"].get("report/advertisement-notifications/unread-messages")},getNotificationList:function(t){var e=Object.assign({},t);return e.page-=1,n["a"].post("notification/list-search?search=".concat(e.searchTitle))},acceptById:function(t){return n["a"].post("report/advertisement-notifications/accepted-notification/".concat(t))},rejectById:function(t,e,r){var o=Object.assign({},e);return n["a"].post("report/advertisement-notifications/rejected-notification/".concat(t),o,r)},getAllReceivers:function(t,e){return n["a"].post("report/advertisement-notifications/outgoing-receivers/".concat(t),e)},getAllReceiversForReport:function(t,e){return n["a"].post("report/general-inventory-reports/outgoing-receivers/".concat(t),e)},acceptReportById:function(t){return n["a"].post("report/general-inventory-reports/accepted-report/".concat(t))},rejectReportById:function(t){return n["a"].post("report/general-inventory-reports/rejected-report/".concat(t))},makeReadNotification:function(t){return n["a"].put("notification/make-read-notification/".concat(t))},getCounts:function(){return n["a"].get("report/dashboard/get-count")},getCountsByRegion:function(){return n["a"].get("report/dashboard/get-all-counts-by-region")},sendMessageToUser:function(t){return n["a"].post("murojaat/send-message",t)}});e["a"]=o}}]);