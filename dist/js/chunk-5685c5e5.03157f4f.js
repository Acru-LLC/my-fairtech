(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5685c5e5","chunk-62b6a48c"],{2709:function(e,t,n){"use strict";n("3b85")},"3b85":function(e,t,n){},"7d0f":function(e,t,n){},"7db0":function(e,t,n){"use strict";var r=n("23e7"),o=n("b727").find,c=n("44d2"),a="find",i=!0;a in[]&&Array(1)[a]((function(){i=!1})),r({target:"Array",proto:!0,forced:i},{find:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}}),c(a)},"80af1":function(e,t,n){"use strict";n("7d0f")},8227:function(e,t,n){"use strict";n.r(t);n("b0c0");var r=function(){var e=this,t=e._self._c;return t("base-create-or-update-wrapper",{attrs:{"has-save-suspend":"","custom-title":e.$t("column.employee")+" "+(e.$route.query.name?e.$route.query.name:"")},on:{save:e.save}},[t("div",{staticClass:"row"},[t("div",{staticClass:"col-xl-12"},[t("div",{staticClass:"card overflow-auto"},[e.departments.length>0?t("ul",{staticClass:"px-0 list-unstyled",staticStyle:{"min-width":"1400px"}},[e._l(e.departments,(function(n,r){return[t("org-str-tree-view-with-checkboxes",{key:n.id+"dep"+r,staticClass:"item",attrs:{allDepPermTypes:e.depPermTypes,"department-for-tree":n}})]}))],2):[t("h5",[e._v("Ҳозирча бўлинмалар қўшилмаган")])]],2)])])])},o=[],c=n("c7eb"),a=n("1da1"),i=n("5530"),s=(n("a4d3"),n("e01a"),n("14d9"),n("2f62")),d=n("7476"),u=n("c2a4"),p=n("887a"),l=(n("7db0"),n("d3b7"),n("99af"),function(){var e=this,t=e._self._c;return t("li",[t("div",{staticClass:"hoverable row",style:e.bgColor},[t("div",{staticClass:"d-flex align-items-center col-5 cursor-pointer",class:{bold:e.isFolder,notBold:!e.isFolder},on:{click:e.toggle}},[e.isFolder?[e.open?e.open?t("i",{staticClass:"mdi mdi-domain building-icon"}):e._e():t("i",{staticClass:"mdi mdi-office-building building-icon"})]:[t("i",{staticClass:"mdi mdi-office-building-outline building-icon"})],t("p",{ref:"depRef-".concat(e.departmentForTree.id),staticClass:"dep-name",attrs:{id:"depId-".concat(e.departmentForTree.id)},on:{click:function(t){return e.$emit("toggleActiveClass",e.departmentForTree)}}},[e._v(" "+e._s(e.departmentForTree?e.getName({nameRu:e.departmentForTree.nameRu,nameLt:e.departmentForTree.nameLt,nameUz:e.departmentForTree.nameUz}):""))])],2),t("div",{staticClass:"col-7"},[e.depth>0?t("table",{staticClass:"w-100 text-center"},[t("tr",e._l(e.allDepPermTypes,(function(n,r){return t("td",{key:r,style:"width: ".concat(50/e.allDepPermTypes.length,"%;")},[e.departmentForTree.departmentPermissionTypeDtos.find((function(e){return e.id===n.id}))?t("b-form-checkbox",{key:"perm-type-checkbox-".concat(n.id,"-").concat(r),class:e.offset,on:{change:function(t){return e.checkboxChanged(n,t)}},model:{value:e.departmentForTree.departmentPermissionTypeDtos.find((function(e){return e.id===n.id})).isChecked,callback:function(t){e.$set(e.departmentForTree.departmentPermissionTypeDtos.find((function(e){return e.id===n.id})),"isChecked",t)},expression:"departmentForTree.departmentPermissionTypeDtos.find(el => el.id === permType.id).isChecked"}}):t("b-form-checkbox",{key:"perm-type-checkbox-".concat(n.id,"-").concat(r),class:e.offset})],1)})),0)]):t("table",{staticClass:"w-100 text-center"},[t("tbody",[t("tr",e._l(e.allDepPermTypes,(function(n,r){return t("td",{key:"dep-perm-type-for-all-".concat(n.id,"-").concat(r),style:"width: calc(50% / ".concat(e.allDepPermTypes.length,");")},[e._v(e._s(e.getName({nameLt:n.nameLt,nameUz:n.nameUz,nameRu:n.nameRu})))])})),0)])])])]),e.isFolder?t("ul",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}]},e._l(e.departmentForTree.children?e.departmentForTree.children:[],(function(n,r){return t("org-str-tree-view-with-checkboxes",{key:"".concat(e.depth,"-").concat(r,"-depChild"),staticClass:"item",attrs:{depth:e.depth+1,allDepPermTypes:e.allDepPermTypes,"department-for-tree":n}})})),1):e._e()])}),g=[],f=(n("a9e3"),n("159b"),["white","white","#E6F7FF","#F5FFFA","white","#FEFDE6"]),m={name:"OrgStrTreeViewWithCheckboxes",props:{depth:{type:Number,default:0},departmentForTree:{type:Object,default:function(){}},allDepPermTypes:{type:Array,default:function(){return[]}},withoutActions:{type:Boolean,default:!1},withoutAddAction:{type:Boolean,default:!1},withoutEditAction:{type:Boolean,default:!1},withoutDeleteAction:{type:Boolean,default:!1}},data:function(){return{open:!1,hoverState:!1}},computed:{isFolder:function(){return this.departmentForTree?this.departmentForTree.children&&this.departmentForTree.children.length:0},offset:function(){return"offset"+10*this.depth},bgColor:function(){return{"background-color":f[this.depth%f.length]}}},methods:{checkboxChanged:function(e,t){this.departmentForTree.children&&this.departmentForTree.children.length&&this.departmentForTree.children.forEach((function n(r){r.departmentPermissionTypeDtos.find((function(t){return t.id===e.id})).isChecked=t,r.children&&r.children.length&&r.children.forEach((function(e){n(e)}))}))},emitAddClicked:function(e){this.$emit("addClicked",e)},emitEditClicked:function(e){this.$emit("editClicked",e)},emitDeleteClicked:function(e){this.$emit("deleteClicked",e)},emitToggleActiveClass:function(e){this.$emit("toggleActiveClass",e)},toggle:function(){this.isFolder&&(this.open=!this.open)}},created:function(){this.departmentForTree.parentId||(this.open=!0)}},y=m,h=(n("2709"),n("2877")),v=Object(h["a"])(y,l,g,!1,null,"741f35eb",null),b=v.exports,I={name:"UpdateDepPermissions",page:{meta:[{name:"description",content:u.description}]},components:{OrgStrTreeViewWithCheckboxes:b},data:function(){return{depPermTypes:[],selectedDep:"",activeDep:{},loadingTableItems:!1,activeTabIndex:0,departments:[],users:[],totalUsers:0,employees:[],totalEmployees:0,searchPayloadEmployees:{},searchPayloadUsers:{}}},computed:Object(i["a"])(Object(i["a"])({},Object(s["d"])("managementUsersAndEmployees",["userHeaders","employeeHeaders"])),{},{activeTab:function(){return 0==this.activeTabIndex?"employees":1==this.activeTabIndex?"users":""},userInfo:function(){return d["a"].getUserInfo()}}),methods:{save:function(){var e=this;p["a"].savePermittedDepsByUserId(this.$route.params.id,this.departments[0],!0).then((function(t){e.$router.go(-1),e.$toast(e.$t("messages.saved_successfully"),{type:"success"})})).catch((function(e){return console.log(e)}))},fetchDepartments:function(){var e=this;p["a"].fetchControlPermittedDepsByUser(this.$route.params.id,!0).then((function(t){e.departments=[],t.data.id&&e.departments.push(t.data)})).catch((function(e){console.log(e)}))},editItem:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.activeTab;this.$router.push("users"==t?{name:"UpdateUser",params:{id:e}}:"employees"==t?{name:"UpdateEmployee",params:{id:e}}:this.$toast("Илтимос табни қайта босинг ва яна уриниб кўринг",{type:"info"}))}},created:function(){var e=this;return Object(a["a"])(Object(c["a"])().mark((function t(){return Object(c["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$route.params.id==d["a"].getUserId()&&e.$router.go(-1),t.next=3,e.fetchDepartments();case 3:return t.next=5,p["a"].getRefByCode("department_permission_type",!0).then((function(t){e.depPermTypes=t.data.children})).catch((function(e){console.log(e)}));case 5:e.searchPayloadEmployees=Object.assign({},e.var_default_search_payload),e.searchPayloadUsers=Object.assign({},e.var_default_search_payload);case 7:case"end":return t.stop()}}),t)})))()}},T=I,C=(n("80af1"),Object(h["a"])(T,r,o,!1,null,"679029a4",null));t["default"]=C.exports},"887a":function(e,t,n){"use strict";n("99af"),n("b0c0");var r=n("f2db"),o=(n("7476"),{getTemplateByCategoryId:function(e,t,n){var o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];return r["a"].post("templates/get-by-category/".concat(e||"","?keyword=").concat(t||""),n,o)},getTemplateListByCategoryId:function(e,t,n,o){return r["a"].post("templates/sample/list-search?keyword=".concat(n||"","&categoryId=").concat(e||"","&personType=").concat(t||""),o)},getApplicationFromDxaById:function(e){return r["a"].get("application-dxa/get-all-information?id=".concat(e||""))},getApplicationInfoBystepId:function(e,t){return r["a"].get("application-dxa/get-info/".concat(e,"/").concat(t))},getVisaAllInfoById:function(e){return r["a"].get("application-dxa/get-all-header-info?id=".concat(e||""))},getApplicationFilesBystepId:function(e,t,n){return r["a"].get("application-dxa/get-file-info/".concat(parseInt(t),"?application_id=").concat(e,"&applicationDXAId=").concat(n))},getApplicationFilesDownloadById:function(e,t){return r["a"].customRequest({url:"application-dxa/upload-file/".concat(parseInt(t),"?application_id=").concat(e),method:"GET",responseType:"blob"})},getApplicationTree:function(e){return r["a"].get("before-commission/application/get-tree/".concat(e))},petrolPricesByDate:function(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return r["a"].post("docReport/petrol-report?fromDate=".concat(e||"","&toDate=").concat(t||"","&regionId=").concat(n||""),{},o)},testTelegramBotApi:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return r["a"].post("docReport/petrol-data-for-telegram-bot?docTableId=".concat(e,"&petrolId=").concat(t),{},n)},fetchDateTypesByParentId:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return r["a"].post("dateType/listByParentId/".concat(e),t,n)},getContractorBankAccounts:function(e){return r["a"].get("contractor/get-contractor-banks/".concat(e))},getContractorFounders:function(e){return r["a"].get("contractor/get-contractor-founders/".concat(e))},getContractorDirector:function(e){return r["a"].get("contractor/get-contractor-director/".concat(e))},getContractorAccounter:function(e){return r["a"].get("contractor/get-contractor-accountant/".concat(e))},approveReestrDoc:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("reestr/contractor-reestr-documents/reestr-document-confirmation/".concat(e),t)},updateReestr:function(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return n?r["a"].post("".concat(e,"/update/").concat(n),t,o):r["a"].post("".concat(e,"/update/").concat(t.id),t,o)},getContractorsByProdectOrServiceTypeIdAndProductOrServiceId:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("reestr/contractor-reestr-documents/list-search-for-contractor-by-is-republic/".concat(e),{},t)},searchReestrContractorListByIndividualsGroupId:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("reestr/contractor-reestr-documents/list-search-for-contractor-children-by-is-republic-for-group-of-individuals/".concat(e),{},t)},searchReestrContractorListByParentId:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("reestr/contractor-reestr-documents/list-search-for-contractor-children-by-is-republic/".concat(e),{},t)},searchReestrHistoryListByContractorId:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("reestr/contractor-reestr-documents/list-search-by-is-republic/".concat(e),{},t)},searchReestrListByRepublic:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("reestr/contractor-reestr-documents/list-search-by-is-republic/".concat(e),{},t)},getReestrByRepublic:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("reestr/contractor-reestr-documents/get/product-or-service-type-by-is-republic/by-region/".concat(e),{},t)},getReestrByRegionId:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return r["a"].post("reestr/contractor-reestr-documents/get/product-or-service-type/by-region/".concat(t,"?regionId=").concat(e),{},n)},getProductOrServicesByTypeId:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=Object.assign({},t);return o.page=o.page-1,r["a"].post("directory/product-or-services/get/by-type-id/".concat(e,"?keyword=").concat(t.keyword?t.keyword:""),o,n)},savePermittedDepsByUserId:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return r["a"].post("department/save/permitted/by-user-id/for-dep-perm-control/".concat(e),t,n)},fetchControlPermittedDepsByUser:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("department/get/checked/permitted/by-user-id/for-dep-perm-control/".concat(e),t)},getAdConstructionsForMap:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("contractor-advertising-construction/get-all/for-map?passportNumber=".concat(e.passportNumber,"&contractorIds=").concat(e.contractorIds,"&regionIds=").concat(e.regionIds,"&districtIds=").concat(e.districtIds,"&designTypeIds=").concat(e.designTypeIds),null,t)},getAdConstructionsForMapEAuction:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("contractor-advertising-construction/get-all/for-map/e-auction?passportNumber=".concat(e.passportNumber,"&contractorIds=").concat(e.contractorIds,"&regionIds=").concat(e.regionIds,"&districtIds=").concat(e.districtIds,"&designTypeIds=").concat(e.designTypeIds),null,t)},getPetrolStationsForMap:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("petrol/get-all/for-map?name=".concat(e.name,"&contractorIds=").concat(e.contractorIds,"&regionIds=").concat(e.regionIds,"&districtIds=").concat(e.districtIds),null,t)},getSugarStationsForMap:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("sugar/get-all/for-map?name=".concat(e.name,"&contractorIds=").concat(e.contractorIds,"&regionIds=").concat(e.regionIds,"&districtIds=").concat(e.districtIds),null,t)},getBakeryStationsForMap:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("bakery/get-all/for-map?name=".concat(e.name,"&contractorIds=").concat(e.contractorIds,"&regionIds=").concat(e.regionIds,"&districtIds=").concat(e.districtIds),null,t)},getFlourStationsForMap:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].post("flour/get-all/for-map?name=".concat(e.name,"&contractorIds=").concat(e.contractorIds,"&regionIds=").concat(e.regionIds,"&districtIds=").concat(e.districtIds),null,t)},getAdDesignTypesByActiveStatus:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return r["a"].get("directory/advertisement-design-type/get-all-by-active-status/",e)},getVolumesByActiveStatus:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return r["a"].get("directory/advertisement-design-type/get-all-by-active-status/",e)},getVolumeTypesByActiveStatus:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return r["a"].get("directory/advertisement-volume-types/get-all-by-active-status/",e)},getPrivilegeCoefficientValueByAdDesignTypeId:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("directory/advertisement-design-type_privilege_coefficients/get-coefficient-by-design-type-id?designTypeId=".concat(e),t)},getCoefficientValueByZoneAndDistrictIds:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return r["a"].get("directory/coefficients/get-by-district-and-zone/".concat(e,"/").concat(t),n)},getMinCollectionValueByRegionAndDistrictIds:function(e,t,n,o,c){var a=arguments.length>5&&void 0!==arguments[5]&&arguments[5];return r["a"].get("directory/minimum-collections/get-by-region?regionId=".concat(e,"&districtId=").concat(t,"&locationTypeId=").concat(n,"&designTypeId=").concat(o,"&volumeTypeId=").concat(c||""),a)},getAdZonesByDistrictId:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("directory/coefficients/get-zones/by-district-id/".concat(e),t)},getGroupOfRegion:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("directory/group-regions/get-group/by-region-id/".concat(e),t)},getAdVolumeTypesByAdLocationTypeId:function(e,t){return r["a"].get("directory/advertisement-volume-types/get-all/".concat(e),t)},getAdDesignTypesByAdLocationTypeId:function(e,t,n){return r["a"].get("directory/advertisement-design-type/get-design-types/".concat(t,"/").concat(e),n)},updateUserPasswordByAdmin:function(e,t){return r["a"].put("user/update-password/no-checking",e,t)},updateUserPassword:function(e,t){return r["a"].put("user/update-password",e,t)},updateRolePermissionsById:function(e,t){return r["a"].post("role/add-permissions/".concat(e.id),e.permissionIds,t)},permissionsListByRoleId:function(e,t){return r["a"].get("permission/list/by-role-id/".concat(e),t)},updateDepartment:function(e){return r["a"].put("department/update/".concat(e.departmentDto.id),e)},validateInnFromApi:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("contractor/check-inn-is-valid?inn=".concat(e),t)},checkAdPassportNumber:function(e){return r["a"].get("contractor-advertising-construction/check-passport-number?passportNumber=".concat(e))},checkAdPassportNumberByRegion:function(e,t){return r["a"].get("contractor-advertising-construction/check-passport-number/by-region?passportNumber=".concat(e,"&regionId=").concat(t))},findContractorByInn:function(e){return r["a"].get("department/check-inn?inn=".concat(e))},getIndividualInfoByInn:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("employee/get-by-inn-from-soliq/".concat(e),t)},getSingleContractorByInn:function(e){return r["a"].get("contractor/get-by-inn/".concat(e))},getContractorInfoByInnForCreate:function(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return r["a"].get("contractor/get-new-contractor-info-from-soliq-by-inn/for-create?inn=".concat(e,"&pinfl=").concat(t,"&isYur=").concat(Boolean(n)),o)},getContractorInfoByInnForUpdate:function(e,t,n){var o=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return r["a"].get("contractor/get-new-contractor-info-from-soliq-by-inn/for-update?inn=".concat(e,"&pinfl=").concat(t,"&isYur=").concat(Boolean(n)),o)},getCuratorsForDepartment:function(){return r["a"].get("department/get-department/curators")},getGeoLocationsByParentId:function(e){return r["a"].get("geographical-region/list/by-parent-id/".concat(e))},getGeoLocationsByMultipleParentIds:function(e){return r["a"].get("geographical-region/get-all-district/by-region-ids?regionIds=".concat(e))},fetchRegions:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return r["a"].get("geographical-region/get-all-region",e)},fetchRegions14:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("geographical-region/get-region-tree?keyword=".concat(e),t)},fetchRegionsForAdvertisementByCurrentUserId:function(){return r["a"].get("geographical-region/get-all-regions-by-current-user-id/for-advertisement")},fetchRegionsForPetrolByCurrentUserId:function(){return r["a"].get("geographical-region/get-all-regions-by-current-user-id/for-petrol")},fetchRegionsForSugarByCurrentUserId:function(){return r["a"].get("geographical-region/get-all-regions-by-current-user-id/for-sugar")},fetchRegionsForBakeryByCurrentUserId:function(){return r["a"].get("geographical-region/get-all-regions-by-current-user-id/for-bakery")},fetchRegionsForFlourByCurrentUserId:function(){return r["a"].get("geographical-region/get-all-regions-by-current-user-id/for-flour")},fetchRegionsForContractorReestrByCurrentUserId:function(){return r["a"].get("geographical-region/get-all-regions-by-current-user-id/for-reestr")},searchEmployeesByDep:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=Object.assign({},e);return o.page-=1,r["a"].post("employee/search/by-depId/".concat(t),o,n)},searchEmployeesByDepID:function(e){var t=Object.assign({},e);return t.page-=1,r["a"].post("employee/getByYurDepForSign",t)},searchEmployeesWithoutDep:function(e){var t=Object.assign({},e);return t.page-=1,r["a"].post("employee/search/without/dep",t)},createDepWithLegalInfo:function(e){return r["a"].post("department/finish",e)},getRefByCode:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("reference/get-code/".concat(e),t)},getRefByCodeNew:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("reference/get-reference-by-code/".concat(e),t)},getEmployeeList:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return r["a"].get("employee/get-all-for-create-user/by-keyword?keyword=".concat(e),t)},getCountNotifications:function(){return r["a"].get("report/advertisement-notifications/unread-messages")},getNotificationList:function(e){var t=Object.assign({},e);return t.page-=1,r["a"].post("notification/list-search?search=".concat(t.searchTitle))},acceptById:function(e){return r["a"].post("report/advertisement-notifications/accepted-notification/".concat(e))},rejectById:function(e,t,n){var o=Object.assign({},t);return r["a"].post("report/advertisement-notifications/rejected-notification/".concat(e),o,n)},getAllReceivers:function(e,t){return r["a"].post("report/advertisement-notifications/outgoing-receivers/".concat(e),t)},getAllReceiversForReport:function(e,t){return r["a"].post("report/general-inventory-reports/outgoing-receivers/".concat(e),t)},acceptReportById:function(e){return r["a"].post("report/general-inventory-reports/accepted-report/".concat(e))},rejectReportById:function(e){return r["a"].post("report/general-inventory-reports/rejected-report/".concat(e))},makeReadNotification:function(e){return r["a"].put("notification/make-read-notification/".concat(e))},getCounts:function(){return r["a"].get("report/dashboard/get-count")},getCountsByRegion:function(){return r["a"].get("report/dashboard/get-all-counts-by-region")},sendMessageToUser:function(e){return r["a"].post("murojaat/send-message",e)}});t["a"]=o}}]);