(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-54d3248e","chunk-62b6a48c"],{"7db0":function(t,e,n){"use strict";var r=n("23e7"),o=n("b727").find,a=n("44d2"),c="find",i=!0;c in[]&&Array(1)[c]((function(){i=!1})),r({target:"Array",proto:!0,forced:i},{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),a(c)},"887a":function(t,e,n){"use strict";n("99af"),n("b0c0");var r=n("f2db"),o=(n("7476"),{getTemplateByCategoryId:function(t,e,n){var o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return r["a"].post("templates/get-by-category/".concat(t||"","?keyword=").concat(e||""),n,o)},getTemplateListByCategoryId:function(t,e,n,o){return r["a"].post("templates/sample/list-search?keyword=".concat(n||"","&categoryId=").concat(t||"","&personType=").concat(e||""),o)},getApplicationFromDxaById:function(t){return r["a"].get("application-dxa/get-all-information?id=".concat(t||""))},getApplicationInfoBystepId:function(t,e){return r["a"].get("application-dxa/get-info/".concat(t,"/").concat(e))},getVisaAllInfoById:function(t){return r["a"].get("application-dxa/get-all-header-info?id=".concat(t||""))},getApplicationFilesBystepId:function(t,e,n){return r["a"].get("application-dxa/get-file-info/".concat(parseInt(e),"?application_id=").concat(t,"&applicationDXAId=").concat(n))},getApplicationFilesDownloadById:function(t,e){return r["a"].customRequest({url:"application-dxa/upload-file/".concat(parseInt(e),"?application_id=").concat(t),method:"GET",responseType:"blob"})},getApplicationTree:function(t){return r["a"].get("before-commission/application/get-tree/".concat(t))},petrolPricesByDate:function(t,e,n){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return r["a"].post("docReport/petrol-report?fromDate=".concat(t||"","&toDate=").concat(e||"","&regionId=").concat(n||""),{},o)},testTelegramBotApi:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return r["a"].post("docReport/petrol-data-for-telegram-bot?docTableId=".concat(t,"&petrolId=").concat(e),{},n)},fetchDateTypesByParentId:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return r["a"].post("dateType/listByParentId/".concat(t),e,n)},getContractorBankAccounts:function(t){return r["a"].get("contractor/get-contractor-banks/".concat(t))},getContractorFounders:function(t){return r["a"].get("contractor/get-contractor-founders/".concat(t))},getContractorDirector:function(t){return r["a"].get("contractor/get-contractor-director/".concat(t))},getContractorAccounter:function(t){return r["a"].get("contractor/get-contractor-accountant/".concat(t))},approveReestrDoc:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("reestr/contractor-reestr-documents/reestr-document-confirmation/".concat(t),e)},updateReestr:function(t,e,n){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return n?r["a"].post("".concat(t,"/update/").concat(n),e,o):r["a"].post("".concat(t,"/update/").concat(e.id),e,o)},getContractorsByProdectOrServiceTypeIdAndProductOrServiceId:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("reestr/contractor-reestr-documents/list-search-for-contractor-by-is-republic/".concat(t),{},e)},searchReestrContractorListByIndividualsGroupId:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("reestr/contractor-reestr-documents/list-search-for-contractor-children-by-is-republic-for-group-of-individuals/".concat(t),{},e)},searchReestrContractorListByParentId:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("reestr/contractor-reestr-documents/list-search-for-contractor-children-by-is-republic/".concat(t),{},e)},searchReestrHistoryListByContractorId:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("reestr/contractor-reestr-documents/list-search-by-is-republic/".concat(t),{},e)},searchReestrListByRepublic:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("reestr/contractor-reestr-documents/list-search-by-is-republic/".concat(t),{},e)},getReestrByRepublic:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("reestr/contractor-reestr-documents/get/product-or-service-type-by-is-republic/by-region/".concat(t),{},e)},getReestrByRegionId:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return r["a"].post("reestr/contractor-reestr-documents/get/product-or-service-type/by-region/".concat(e,"?regionId=").concat(t),{},n)},getProductOrServicesByTypeId:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=Object.assign({},e);return o.page=o.page-1,r["a"].post("directory/product-or-services/get/by-type-id/".concat(t,"?keyword=").concat(e.keyword?e.keyword:""),o,n)},savePermittedDepsByUserId:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return r["a"].post("department/save/permitted/by-user-id/for-dep-perm-control/".concat(t),e,n)},fetchControlPermittedDepsByUser:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("department/get/checked/permitted/by-user-id/for-dep-perm-control/".concat(t),e)},getAdConstructionsForMap:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("contractor-advertising-construction/get-all/for-map?passportNumber=".concat(t.passportNumber,"&contractorIds=").concat(t.contractorIds,"&regionIds=").concat(t.regionIds,"&districtIds=").concat(t.districtIds,"&designTypeIds=").concat(t.designTypeIds),null,e)},getAdConstructionsForMapEAuction:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("contractor-advertising-construction/get-all/for-map/e-auction?passportNumber=".concat(t.passportNumber,"&contractorIds=").concat(t.contractorIds,"&regionIds=").concat(t.regionIds,"&districtIds=").concat(t.districtIds,"&designTypeIds=").concat(t.designTypeIds),null,e)},getPetrolStationsForMap:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("petrol/get-all/for-map?name=".concat(t.name,"&contractorIds=").concat(t.contractorIds,"&regionIds=").concat(t.regionIds,"&districtIds=").concat(t.districtIds),null,e)},getSugarStationsForMap:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("sugar/get-all/for-map?name=".concat(t.name,"&contractorIds=").concat(t.contractorIds,"&regionIds=").concat(t.regionIds,"&districtIds=").concat(t.districtIds),null,e)},getBakeryStationsForMap:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("bakery/get-all/for-map?name=".concat(t.name,"&contractorIds=").concat(t.contractorIds,"&regionIds=").concat(t.regionIds,"&districtIds=").concat(t.districtIds),null,e)},getFlourStationsForMap:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("flour/get-all/for-map?name=".concat(t.name,"&contractorIds=").concat(t.contractorIds,"&regionIds=").concat(t.regionIds,"&districtIds=").concat(t.districtIds),null,e)},getAdDesignTypesByActiveStatus:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return r["a"].get("directory/advertisement-design-type/get-all-by-active-status/",t)},getVolumesByActiveStatus:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return r["a"].get("directory/advertisement-design-type/get-all-by-active-status/",t)},getVolumeTypesByActiveStatus:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return r["a"].get("directory/advertisement-volume-types/get-all-by-active-status/",t)},getPrivilegeCoefficientValueByAdDesignTypeId:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("directory/advertisement-design-type_privilege_coefficients/get-coefficient-by-design-type-id?designTypeId=".concat(t),e)},getCoefficientValueByZoneAndDistrictIds:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return r["a"].get("directory/coefficients/get-by-district-and-zone/".concat(t,"/").concat(e),n)},getMinCollectionValueByRegionAndDistrictIds:function(t,e,n,o,a){var c=arguments.length>5&&void 0!==arguments[5]&&arguments[5];return r["a"].get("directory/minimum-collections/get-by-region?regionId=".concat(t,"&districtId=").concat(e,"&locationTypeId=").concat(n,"&designTypeId=").concat(o,"&volumeTypeId=").concat(a||""),c)},getAdZonesByDistrictId:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("directory/coefficients/get-zones/by-district-id/".concat(t),e)},getGroupOfRegion:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("directory/group-regions/get-group/by-region-id/".concat(t),e)},getAdVolumeTypesByAdLocationTypeId:function(t,e){return r["a"].get("directory/advertisement-volume-types/get-all/".concat(t),e)},getAdDesignTypesByAdLocationTypeId:function(t,e,n){return r["a"].get("directory/advertisement-design-type/get-design-types/".concat(e,"/").concat(t),n)},updateUserPasswordByAdmin:function(t,e){return r["a"].put("user/update-password/no-checking",t,e)},updateUserPassword:function(t,e){return r["a"].put("user/update-password",t,e)},updateRolePermissionsById:function(t,e){return r["a"].post("role/add-permissions/".concat(t.id),t.permissionIds,e)},permissionsListByRoleId:function(t,e){return r["a"].get("permission/list/by-role-id/".concat(t),e)},updateDepartment:function(t){return r["a"].put("department/update/".concat(t.departmentDto.id),t)},validateInnFromApi:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("contractor/check-inn-is-valid?inn=".concat(t),e)},checkAdPassportNumber:function(t){return r["a"].get("contractor-advertising-construction/check-passport-number?passportNumber=".concat(t))},checkAdPassportNumberByRegion:function(t,e){return r["a"].get("contractor-advertising-construction/check-passport-number/by-region?passportNumber=".concat(t,"&regionId=").concat(e))},findContractorByInn:function(t){return r["a"].get("department/check-inn?inn=".concat(t))},getIndividualInfoByInn:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("employee/get-by-inn-from-soliq/".concat(t),e)},getSingleContractorByInn:function(t){return r["a"].get("contractor/get-by-inn/".concat(t))},getContractorInfoByInnForCreate:function(t,e,n){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return r["a"].get("contractor/get-new-contractor-info-from-soliq-by-inn/for-create?inn=".concat(t,"&pinfl=").concat(e,"&isYur=").concat(Boolean(n)),o)},getContractorInfoByInnForUpdate:function(t,e,n){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return r["a"].get("contractor/get-new-contractor-info-from-soliq-by-inn/for-update?inn=".concat(t,"&pinfl=").concat(e,"&isYur=").concat(Boolean(n)),o)},getCuratorsForDepartment:function(){return r["a"].get("department/get-department/curators")},getGeoLocationsByParentId:function(t){return r["a"].get("geographical-region/list/by-parent-id/".concat(t))},getGeoLocationsByMultipleParentIds:function(t){return r["a"].get("geographical-region/get-all-district/by-region-ids?regionIds=".concat(t))},fetchRegions:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return r["a"].get("geographical-region/get-all-region",t)},fetchRegions14:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("geographical-region/get-region-tree?keyword=".concat(t),e)},fetchRegionsForAdvertisementByCurrentUserId:function(){return r["a"].get("geographical-region/get-all-regions-by-current-user-id/for-advertisement")},fetchRegionsForPetrolByCurrentUserId:function(){return r["a"].get("geographical-region/get-all-regions-by-current-user-id/for-petrol")},fetchRegionsForSugarByCurrentUserId:function(){return r["a"].get("geographical-region/get-all-regions-by-current-user-id/for-sugar")},fetchRegionsForBakeryByCurrentUserId:function(){return r["a"].get("geographical-region/get-all-regions-by-current-user-id/for-bakery")},fetchRegionsForFlourByCurrentUserId:function(){return r["a"].get("geographical-region/get-all-regions-by-current-user-id/for-flour")},fetchRegionsForContractorReestrByCurrentUserId:function(){return r["a"].get("geographical-region/get-all-regions-by-current-user-id/for-reestr")},searchEmployeesByDep:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=Object.assign({},t);return o.page-=1,r["a"].post("employee/search/by-depId/".concat(e),o,n)},searchEmployeesByDepID:function(t){var e=Object.assign({},t);return e.page-=1,r["a"].post("employee/getByYurDepForSign",e)},searchEmployeesWithoutDep:function(t){var e=Object.assign({},t);return e.page-=1,r["a"].post("employee/search/without/dep",e)},createDepWithLegalInfo:function(t){return r["a"].post("department/finish",t)},getRefByCode:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("reference/get-code/".concat(t),e)},getRefByCodeNew:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("reference/get-reference-by-code/".concat(t),e)},getEmployeeList:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("employee/get-all-for-create-user/by-keyword?keyword=".concat(t),e)},getCountNotifications:function(){return r["a"].get("report/advertisement-notifications/unread-messages")},getNotificationList:function(t){var e=Object.assign({},t);return e.page-=1,r["a"].post("notification/list-search?search=".concat(e.searchTitle))},acceptById:function(t){return r["a"].post("report/advertisement-notifications/accepted-notification/".concat(t))},rejectById:function(t,e,n){var o=Object.assign({},e);return r["a"].post("report/advertisement-notifications/rejected-notification/".concat(t),o,n)},getAllReceivers:function(t,e){return r["a"].post("report/advertisement-notifications/outgoing-receivers/".concat(t),e)},getAllReceiversForReport:function(t,e){return r["a"].post("report/general-inventory-reports/outgoing-receivers/".concat(t),e)},acceptReportById:function(t){return r["a"].post("report/general-inventory-reports/accepted-report/".concat(t))},rejectReportById:function(t){return r["a"].post("report/general-inventory-reports/rejected-report/".concat(t))},makeReadNotification:function(t){return r["a"].put("notification/make-read-notification/".concat(t))},getCounts:function(){return r["a"].get("report/dashboard/get-count")},getCountsByRegion:function(){return r["a"].get("report/dashboard/get-all-counts-by-region")},sendMessageToUser:function(t){return r["a"].post("murojaat/send-message",t)}});e["a"]=o},b7da:function(t,e,n){"use strict";n.r(e);n("d81d");var r=function(){var t=this,e=t._self._c;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("div",{staticClass:"col-md-12 text-center"},[e("div",{staticClass:"h4 mb-4 d-inline-block"},[t._v(t._s(t.$t("submodules.ad_design_type_by_regions.title")))])]),e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("div",{staticClass:"row mb-2 justify-content-between"},[e("div",{staticClass:"col-sm-3"},[e("BaseMultiselectWithValidation",{staticClass:"required",attrs:{rules:"required",options:t.regions.map((function(t){return t.id})),"only-form-element":"","allow-empty":!1,"custom-label":t.customLabelRegion,placeholder:t.$t("column.region"),"open-direction":"bottom","max-height":600,"show-labels":!1},on:{input:t.regionSelected},model:{value:t.regionId,callback:function(e){t.regionId=e},expression:"regionId"}})],1),e("div",{staticClass:"col-sm-4"},[e("div",{staticClass:"text-sm-end"},[e("b-btn",{staticClass:"btn btn-success btn-rounded mb-2 me-2",attrs:{type:"button",to:{name:"CreateAdvertisementDesignTypesByRegion"}}},[e("i",{staticClass:"mdi mdi-plus me-1"}),t._v(" "+t._s(t.$t("actions.add"))+" ")])],1)])]),e("b-table",{staticClass:"custom-b-table",attrs:{items:t.tableItems,fields:t.tableFields,busy:t.loadingTableItems,id:"my-table",responsive:"",bordered:"",small:"",hover:"","show-empty":""},scopedSlots:t._u([{key:"cell(index)",fn:function(e){return[t._v(" "+t._s(t.util_paginate(e.index,t.var_default_search_payload.page,t.var_default_search_payload.itemsPerPage))+" ")]}},{key:"cell(region)",fn:function(e){return[t._v(" "+t._s(t.getName({nameRu:e.item.regionNameLt,nameLt:e.item.regionNameRu,nameUz:e.item.regionNameUz}))+" ")]}},{key:"cell(adLocationType)",fn:function(e){return[t._v(" "+t._s(t.getName({nameRu:e.item.directoryAdvertisementLocationTypeNameLt,nameLt:e.item.directoryAdvertisementLocationTypeNameRu,nameUz:e.item.directoryAdvertisementLocationTypeNameUz}))+" ")]}},{key:"cell(adDesignTypes)",fn:function(n){return[e("div",{staticClass:"d-flex align-items-center flex-wrap"},[e("ul",t._l(n.item.designTypes,(function(n,r){return e("li",{key:"location-design-".concat(r)},[t._v(t._s(t.getName({nameRu:n.nameRu,nameLt:n.nameLt,nameUz:n.nameUz})))])})),0)])]}},{key:"cell(actions)",fn:function(n){return[e("div",{staticClass:"general-table__actions d-flex justify-content-center"},[e("b-btn",{staticClass:"text-decoration-none p-0",staticStyle:{"font-size":"1.2rem","margin-right":"1rem"},attrs:{variant:"link"}},[e("i",{staticClass:"mdi mdi-circle-edit-outline edit",on:{click:function(e){return t.editItem(n.item)}}})]),e("b-btn",{staticClass:"text-decoration-none p-0 text-danger",staticStyle:{"font-size":"1.2rem"},attrs:{variant:"link"}},[e("i",{staticClass:"mdi mdi-trash-can delete",on:{click:function(e){return t.deleteItem(n.item)}}})])],1)]}},{key:"empty",fn:function(){return[e("h4",{staticClass:"text-center"},[t._v(t._s(t.regionId?t.$t("messages.data_not_found"):t.$t("messages.please_select_region")))])]},proxy:!0},{key:"table-busy",fn:function(){return[e("div",{staticClass:"text-center my-2"},[e("b-spinner",{staticClass:"align-middle",attrs:{variant:"primary"}})],1)]},proxy:!0}])})],1)])])])},o=[],a=n("c7eb"),c=n("1da1"),i=n("ade3"),s=(n("a4d3"),n("e01a"),n("7db0"),n("d3b7"),n("159b"),n("14d9"),n("9225"),n("c2a4")),d=n("03f4"),u=n("887a"),l="directory/advertisement-location_and_design_type_by_regions",g={page:{title:"Advertisement Design Types by Regions",meta:[{name:"description",content:s.description}]},components:{},data:function(){return{loadingTableItems:!1,regionId:null,regions:[],json_fields:{"Name Uz":"nameUz","Name Lt":"nameLt","Name Ru":"nameRu","Reklama Konstruksiyasi":"designTypes"},json_data:[],json_meta:[[{key:"charset",value:"utf-8"}]],searchKeyword:"",selected:20,optionsTable:[{value:20,text:20},{value:50,text:50},{value:100,text:100},{value:150,text:150},{value:200,text:200}],title:"Departments",activeDep:{},tableItems:[],totalItems:0,tableFields:[{label:"#",thClass:"text-center",tdClass:"text-center",sortable:!1,key:"index"},{label:this.$t("column.region"),key:"region"},{label:this.$t("column.ad_location_type"),key:"adLocationType"},{label:this.$t("column.ad_design_types"),key:"adDesignTypes"},{label:this.$t("column.actions"),key:"actions",thClass:"text-center",tdClass:"text-center",sortable:!1}],jsonF:Object(i["a"])({},this.$t("column.key"),"name")}},computed:{numberOfPages:function(){return!this.totalItems||this.totalItems<=0||this.totalItems<this.var_default_search_payload.itemsPerPage?1:this.totalItems/this.var_default_search_payload.itemsPerPage}},methods:{regionSelected:function(t){var e=arguments,n=this;return Object(c["a"])(Object(a["a"])().mark((function r(){return Object(a["a"])().wrap((function(r){while(1)switch(r.prev=r.next){case 0:e.length>1&&void 0!==e[1]&&e[1],t&&n.fetchTableItems();case 2:case"end":return r.stop()}}),r)})))()},customLabelRegion:function(t){var e=this.regions.find((function(e){return e.id==(t.id?t.id:t)}));return e?"".concat(this.getName({nameRu:e.nameRu,nameLt:e.nameLt,nameUz:e.nameUz})):""},downloadExcel:function(){var t=this;this.tableItems.forEach((function(e){var n={designTypes:[]};n.nameUz=e.nameUz,n.nameLt=e.nameLt,n.nameRu=e.nameRu,e.designTypes.forEach((function(t){n.designTypes.push(t.nameUz)})),t.json_data.push(n)}))},selectList:function(t){this.var_default_search_payload.itemsPerPage="all"==t?this.totalItems:t,this.fetchTableItems()},fetchTableItems:function(){var t=this;this.loadingTableItems=!0,this.var_default_search_payload.keyword=this.searchKeyword,d["a"].searchList(l,this.var_default_search_payload,"?regionId=".concat(this.regionId)).then((function(e){t.tableItems=e.data})).catch((function(e){t.tableItems=[]})).finally((function(){t.loadingTableItems=!1}))},editItem:function(t){this.$router.push({name:"UpdateAdvertisementDesignTypesByRegion",params:{regionId:t.regionId,adLocationTypeId:t.directoryAdvertisementLocationTypeId}})},deleteItem:function(t){var e=this;this.$bvModal.msgBoxConfirm(this.$t("messages.delete_title"),{okTitle:this.$t("actions.confirm"),cancelTitle:this.$t("actions.cancel")}).then((function(n){n&&d["a"].deleteById(l,t.regionId,t.directoryAdvertisementLocationTypeId).then((function(t){e.fetchTableItems()})).catch((function(t){console.log(t)}))})).catch((function(t){}))}},created:function(){var t=this;u["a"].fetchRegions().then((function(e){t.regions=e.data})).catch((function(t){console.log(t)}))},watch:{"var_default_search_payload.page":{handler:function(){this.fetchTableItems()}}}},p=g,f=n("2877"),m=Object(f["a"])(p,r,o,!1,null,"ad4b1f8e",null);e["default"]=m.exports}}]);