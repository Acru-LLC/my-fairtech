(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b25d0"],{2491:function(t,e,a){"use strict";a.r(e);a("4de4"),a("d3b7");var s=function(){var t=this,e=t._self._c;return e("b-row",[e("b-col",{attrs:{cols:"12"}},[e("b-col",{staticClass:"text-center",attrs:{md:"12"}},[e("div",{staticClass:"h4 mb-4 d-inline-block"},[t._v(" "+t._s(t.$t("fire_price.birja.title"))+" - "+t._s(t.$t("submodules.integration.customs_product.export"))+" ")])]),e("b-card",[e("b-card-body",[e("b-row",{staticClass:"mb-2"},[e("div",{staticClass:"d-inline-block"},[e("div",{staticClass:"search-box me-4 mb-2 d-inline-block"},[e("div",{staticClass:"position-relative"},[e("b-input",{staticClass:"form-control",attrs:{type:"text",placeholder:t.$t("column.search")},on:{input:t.fetchTableItems},model:{value:t.searchKeyword,callback:function(e){t.searchKeyword=e},expression:"searchKeyword"}}),e("i",{staticClass:"bx bx-search-alt search-icon"})],1)]),e("span",[t._v(t._s(t.$t("column.select.text1")))]),e("b-col",{staticClass:"me-2 mx-2 d-inline-block",attrs:{cols:"2"}},[e("div",{staticClass:"position-relative"},[e("b-form-select",{staticClass:"form-select",attrs:{options:t.optionsTable},on:{change:t.selectList},model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})],1)]),e("span",[t._v(t._s(t.$t("column.select.text2")))])],1),e("div",{staticClass:"d-inline-block"},[e("div",{staticClass:"text-sm-end float-right"},[e("download-excel",{attrs:{data:t.json_data,fields:t.json_fields,header:t.$t("submodules.integration.customs_product.title"),worksheet:"My Worksheet",name:"".concat(t.$t("submodules.integration.customs_product.title"),".xls")}},[e("b-btn",{staticClass:"mb-2",attrs:{type:"primary",rounded:""},on:{click:t.downloadExcel}},[e("i",{staticClass:"mdi mdi-microsoft-excel me-1"}),t._v(" "+t._s(t.$t("actions.download"))+" ")])],1)],1)]),e("div",{staticClass:"ml-1 d-inline-block"},[e("div",{staticClass:"text-sm-end float-right"},[e("b-btn",{staticClass:"mb-2",attrs:{type:"primary",rounded:""},on:{click:t.downloadAllExcel}},[e("i",{staticClass:"mdi mdi-microsoft-excel me-1"}),t._v(" "+t._s(t.$t("actions.download_all_excel"))+" ")])],1)])]),e("b-table",{staticClass:"custom-b-table",attrs:{items:t.tableItems,fields:t.tableFields,busy:t.loadingTableItems,id:"my-table",responsive:"",striped:"",bordered:"",small:"",hover:"","show-empty":""},scopedSlots:t._u([{key:"top-row",fn:function(){return[e("b-th"),e("b-th",{attrs:{variant:"secondary"}},[e("BaseDateRangePickerWithValidation",{attrs:{"only-form-element":"","append-to-body":"","show-clear-button":"",opens:"right","custom-styles":"grid-template-columns: 100%;",disabled:t.loadingTableItems},on:{"on-clear":t.clearDateOfIssueRange},model:{value:t.infoDateOfIssueRange,callback:function(e){t.infoDateOfIssueRange=e},expression:"infoDateOfIssueRange"}})],1),e("b-th",{attrs:{variant:"secondary"}},[e("BaseInputWithValidation",{attrs:{"only-form-element":"","custom-styles":"grid-template-columns: 100%;",disabled:t.loadingTableItems},on:{change:t.fetchTableItems},model:{value:t.filter.infoMode,callback:function(e){t.$set(t.filter,"infoMode",e)},expression:"filter.infoMode"}})],1),e("b-th",{attrs:{variant:"secondary"}},[e("BaseInputWithValidation",{attrs:{"only-form-element":"","custom-styles":"grid-template-columns: 100%;",disabled:t.loadingTableItems},on:{change:t.fetchTableItems},model:{value:t.filter.infoShipperAddress,callback:function(e){t.$set(t.filter,"infoShipperAddress",e)},expression:"filter.infoShipperAddress"}})],1),e("b-th",{attrs:{variant:"secondary"}},[e("BaseInputWithValidation",{attrs:{"only-form-element":"","custom-styles":"grid-template-columns: 100%;",disabled:t.loadingTableItems},on:{change:t.fetchTableItems},model:{value:t.filter.infoShipperName,callback:function(e){t.$set(t.filter,"infoShipperName",e)},expression:"filter.infoShipperName"}})],1),e("b-th",{attrs:{variant:"secondary"}},[e("BaseInputWithValidation",{attrs:{"only-form-element":"","custom-styles":"grid-template-columns: 100%;",disabled:t.loadingTableItems},on:{change:t.fetchTableItems},model:{value:t.filter.tifTnCode,callback:function(e){t.$set(t.filter,"tifTnCode",e)},expression:"filter.tifTnCode"}})],1),e("b-th",{attrs:{variant:"secondary"}},[e("BaseInputWithValidation",{attrs:{"only-form-element":"","custom-styles":"grid-template-columns: 100%;",disabled:t.loadingTableItems},on:{change:t.fetchTableItems},model:{value:t.filter.productName,callback:function(e){t.$set(t.filter,"productName",e)},expression:"filter.productName"}})],1),e("b-th",{attrs:{variant:"secondary"}},[e("BaseInputWithValidation",{attrs:{"only-form-element":"","custom-styles":"grid-template-columns: 100%;",disabled:t.loadingTableItems},on:{change:t.fetchTableItems},model:{value:t.filter.unitName,callback:function(e){t.$set(t.filter,"unitName",e)},expression:"filter.unitName"}})],1),e("b-th",{attrs:{variant:"secondary"}},[e("BaseInputWithValidation",{attrs:{"only-form-element":"","custom-styles":"grid-template-columns: 100%;",disabled:t.loadingTableItems},on:{change:t.fetchTableItems},model:{value:t.filter.productWeight,callback:function(e){t.$set(t.filter,"productWeight",e)},expression:"filter.productWeight"}})],1),e("b-th",{attrs:{variant:"secondary"}},[e("BaseInputWithValidation",{attrs:{"only-form-element":"","custom-styles":"grid-template-columns: 100%;",disabled:t.loadingTableItems},on:{change:t.fetchTableItems},model:{value:t.filter.productWeightUnit,callback:function(e){t.$set(t.filter,"productWeightUnit",e)},expression:"filter.productWeightUnit"}})],1),e("b-th",{attrs:{variant:"secondary"}},[e("BaseInputWithValidation",{attrs:{"only-form-element":"","custom-styles":"grid-template-columns: 100%;",disabled:t.loadingTableItems},on:{change:t.fetchTableItems},model:{value:t.filter.productStatisticalValue,callback:function(e){t.$set(t.filter,"productStatisticalValue",e)},expression:"filter.productStatisticalValue"}})],1),e("b-th",{attrs:{variant:"secondary"}},[e("BaseInputWithValidation",{attrs:{"only-form-element":"","custom-styles":"grid-template-columns: 100%;",disabled:t.loadingTableItems},on:{change:t.fetchTableItems},model:{value:t.filter.productStatisticalValueUnit,callback:function(e){t.$set(t.filter,"productStatisticalValueUnit",e)},expression:"filter.productStatisticalValueUnit"}})],1),e("b-th",{attrs:{variant:"secondary"}},[e("BaseInputWithValidation",{attrs:{"only-form-element":"","custom-styles":"grid-template-columns: 100%;",disabled:t.loadingTableItems},on:{change:t.fetchTableItems},model:{value:t.filter.productAmount,callback:function(e){t.$set(t.filter,"productAmount",e)},expression:"filter.productAmount"}})],1),e("b-th",{attrs:{variant:"secondary"}},[e("BaseInputWithValidation",{attrs:{"only-form-element":"","custom-styles":"grid-template-columns: 100%;",disabled:t.loadingTableItems},on:{change:t.fetchTableItems},model:{value:t.filter.infoDollarExchangeRate,callback:function(e){t.$set(t.filter,"infoDollarExchangeRate",e)},expression:"filter.infoDollarExchangeRate"}})],1),e("b-th",{attrs:{variant:"secondary"}},[e("BaseInputWithValidation",{attrs:{"only-form-element":"","custom-styles":"grid-template-columns: 100%;",disabled:t.loadingTableItems},on:{change:t.fetchTableItems},model:{value:t.filter.infoConsigneeName,callback:function(e){t.$set(t.filter,"infoConsigneeName",e)},expression:"filter.infoConsigneeName"}})],1),e("b-th",{attrs:{variant:"secondary"}},[e("BaseInputWithValidation",{attrs:{"only-form-element":"","custom-styles":"grid-template-columns: 100%;",disabled:t.loadingTableItems},on:{change:t.fetchTableItems},model:{value:t.filter.infoConsigneeAddress,callback:function(e){t.$set(t.filter,"infoConsigneeAddress",e)},expression:"filter.infoConsigneeAddress"}})],1),e("b-th")]},proxy:!0},{key:"cell(index)",fn:function(e){return[t._v(" "+t._s(t.util_paginate(e.index,t.var_default_search_payload.page,t.var_default_search_payload.itemsPerPage))+" ")]}},{key:"cell(infoDateOfIssue)",fn:function(a){return[e("p",[t._v(" "+t._s(t.getDateFormat(a.item.infoDateOfIssue))+" ")])]}},{key:"cell(status)",fn:function(a){return[e("p",[t._v(" "+t._s(t.getName({nameRu:a.item.statusNameRu,nameLt:a.item.statusNameLt,nameUz:a.item.statusNameUz}))+" ")])]}},{key:"cell(actions)",fn:function(a){return[e("div",{staticClass:"general-table__actions d-flex justify-content-center"},[e("b-btn",{staticClass:"text-decoration-none p-0",staticStyle:{"font-size":"1.2rem","margin-right":"1rem"},attrs:{variant:"link"}},[e("i",{staticClass:"mdi mdi-eye-outline",on:{click:function(e){return t.viewItem(a.item.id)}}})])],1)]}},{key:"empty",fn:function(){return[e("h4",{staticClass:"text-center"},[t._v(t._s(t.$t("messages.data_not_found")))])]},proxy:!0},{key:"table-busy",fn:function(){return[e("div",{staticClass:"text-center my-2"},[e("b-spinner",{staticClass:"align-middle",attrs:{variant:"primary"}})],1)]},proxy:!0}])}),e("b-pagination",{staticClass:"justify-content-end",attrs:{"total-rows":t.totalItems,"per-page":t.var_default_search_payload.itemsPerPage,"aria-controls":"my-table"},model:{value:t.var_default_search_payload.page,callback:function(e){t.$set(t.var_default_search_payload,"page",e)},expression:"var_default_search_payload.page"}})],1)],1)],1)],1)},i=[],n=a("c7eb"),o=a("5530"),l=a("1da1"),r=a("ade3"),c=(a("d81d"),a("3ca3"),a("ddb0"),a("2b3d"),a("9861"),a("99af"),a("fb6a"),a("a15b"),a("b64b"),a("14d9"),a("f2db")),u="customs-product",d={components:{},data:function(){var t;return{loadingTableItems:!1,json_fields:(t={},Object(r["a"])(t,this.$t("submodules.integration.customs_product.infoDateOfIssue"),"infoDateOfIssue"),Object(r["a"])(t,this.$t("submodules.integration.customs_product.infoMode"),"infoMode"),Object(r["a"])(t,this.$t("submodules.integration.customs_product.infoShipperAddress"),"infoShipperAddress"),Object(r["a"])(t,this.$t("submodules.integration.customs_product.infoShipperName"),"infoShipperName"),Object(r["a"])(t,this.$t("submodules.integration.customs_product.tifTnCode"),"tifTnCode"),Object(r["a"])(t,this.$t("submodules.integration.customs_product.productName"),"productName"),Object(r["a"])(t,this.$t("submodules.integration.customs_product.unitName"),"unitName"),Object(r["a"])(t,this.$t("submodules.integration.customs_product.productWeight"),"productWeight"),Object(r["a"])(t,this.$t("submodules.integration.customs_product.productWeightUnit"),"productWeightUnit"),Object(r["a"])(t,this.$t("submodules.integration.customs_product.productStatisticalValue"),"productStatisticalValue"),Object(r["a"])(t,this.$t("submodules.integration.customs_product.productStatisticalValueUnit"),"productStatisticalValueUnit"),Object(r["a"])(t,this.$t("submodules.integration.customs_product.productAmount"),"productAmount"),Object(r["a"])(t,this.$t("submodules.integration.customs_product.infoDollarExchangeRate"),"infoDollarExchangeRate"),Object(r["a"])(t,this.$t("submodules.integration.customs_product.infoConsigneeName"),"infoConsigneeName"),t),json_data:[],json_meta:[[{key:"charset",value:"utf-8"}]],searchKeyword:"",selected:20,optionsTable:[{value:20,text:20},{value:50,text:50},{value:100,text:100},{value:150,text:150},{value:200,text:200}],activeDep:{},changeIndex:{firstItemId:null,secondItemId:null},infoDateOfIssueRange:{},filter:{fromDate:null,toDate:null,infoDateOfIssue:null,infoMode:null,infoShipperAddress:null,infoShipperName:null,tifTnCode:null,productName:null,unitName:null,productWeight:null,productWeightUnit:null,productAmount:null,infoDollarExchangeRate:null,infoConsigneeName:null,infoConsigneeAddress:null,productStatisticalValue:null,productStatisticalValueUnit:null},tableItems:[],totalItems:0,tableFields:[{label:"#",thClass:"text-center",tdClass:"text-center",sortable:!1,key:"index"},{label:this.$t("submodules.integration.customs_product.infoDateOfIssue"),key:"infoDateOfIssue",thStyle:{minWidth:"230px"}},{label:this.$t("submodules.integration.customs_product.infoMode"),key:"infoMode",thStyle:{minWidth:"100px"}},{label:this.$t("submodules.integration.customs_product.infoShipperAddress"),key:"infoShipperAddress",thStyle:{minWidth:"120px"}},{label:this.$t("submodules.integration.customs_product.infoShipperName"),key:"infoShipperName",thStyle:{minWidth:"120px"}},{label:this.$t("submodules.integration.customs_product.tifTnCode"),key:"tifTnCode",thStyle:{minWidth:"100px"}},{label:this.$t("submodules.integration.customs_product.productName"),key:"productName",thStyle:{minWidth:"200px"}},{label:this.$t("submodules.integration.customs_product.unitName"),key:"unitName",thStyle:{minWidth:"100px"}},{label:this.$t("submodules.integration.customs_product.productWeight"),key:"productWeight",thStyle:{minWidth:"100px"}},{label:this.$t("submodules.integration.customs_product.productWeightUnit"),key:"productWeightUnit",thStyle:{minWidth:"100px"}},{label:this.$t("submodules.integration.customs_product.productStatisticalValue"),key:"productStatisticalValue",thStyle:{minWidth:"140px"}},{label:this.$t("submodules.integration.customs_product.productStatisticalValueUnit"),key:"productStatisticalValueUnit",thStyle:{minWidth:"140px"}},{label:this.$t("submodules.integration.customs_product.productAmount"),key:"productAmount",thStyle:{minWidth:"140px"}},{label:this.$t("submodules.integration.customs_product.infoDollarExchangeRate"),key:"infoDollarExchangeRate",thStyle:{minWidth:"150px"}},{label:this.$t("submodules.integration.customs_product.infoConsigneeName"),key:"infoConsigneeName",thStyle:{minWidth:"150px"}},{label:this.$t("submodules.integration.customs_product.infoConsigneeAddress"),key:"infoConsigneeAddress",thStyle:{minWidth:"150px"}},{label:this.$t("column.actions"),key:"actions",thClass:"text-center",tdClass:"text-center",sortable:!1}]}},computed:{numberOfPages:function(){return!this.totalItems||this.totalItems<=0||this.totalItems<this.var_default_search_payload.itemsPerPage?1:this.totalItems/this.var_default_search_payload.itemsPerPage}},methods:{downloadExcel:function(){var t=this;return Object(l["a"])(Object(n["a"])().mark((function e(){return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.json_data=t.tableItems.map((function(e,a){return Object(o["a"])(Object(o["a"])({},e),{},{infoDateOfIssue:e.infoDateOfIssue?t.getDateFormat(e.infoDateOfIssue):"",infoInformationDate:e.infoInformationDate?t.getDateFormat(e.infoInformationDate):""})}));case 1:case"end":return e.stop()}}),e)})))()},downloadAllExcel:function(){var t=this;return Object(l["a"])(Object(n["a"])().mark((function e(){var a;return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=u+"/excel-download",t.filter.type="EXPORT",t.filter&&(a+=t.generatePayloadUrl(t.filter)),e.abrupt("return",c["a"].responseTypeBlob(a,!0).then((function(e){var a=window.URL.createObjectURL(new Blob([e.data])),s=document.createElement("a"),i="".concat(t.$t("submodules.integration.customs_product.title")," ").concat(t.$t("submodules.integration.customs_product.export")," - ").concat((new Date).toISOString().slice(0,10),".xlsx");s.href=a,s.setAttribute("download",i),document.body.appendChild(s),s.click()})));case 4:case"end":return e.stop()}}),e)})))()},selectList:function(t){this.var_default_search_payload.itemsPerPage="all"===t?this.totalItems:t,this.fetchTableItems()},fetchTableItems:function(){var t=this;this.loadingTableItems=!0,this.var_default_search_payload.keyword=this.searchKeyword,this.var_default_search_payload.sortDesc=[!1],this.var_default_search_payload.sortBy=["productName"],this.searchListWithKeyword(u,this.var_default_search_payload,this.filter).then((function(e){t.tableItems=e.data.list,t.totalItems=e.data.total,t.loadingTableItems=!1})).catch((function(e){t.tableItems=[],t.totalItems=0,t.loadingTableItems=!1}))},clearDateOfIssueRange:function(){this.filter.fromDate=null,this.filter.toDate=null,this.infoDateOfIssueRange={}},generatePayloadUrl:function(t){return"?"+Object.keys(t).map((function(e){if(t[e])return e+"="+t[e]})).filter((function(t){return!!t})).join("&")},searchListWithKeyword:function(t,e){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},s=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=Object.assign({},e);i.page-=1;var n=t+"/list-search/export";return a&&(n+=this.generatePayloadUrl(a)),c["a"].post(n,i,s)},viewItem:function(t){this.$router.push({name:"ViewIntegrationCustomsProductExport",params:{id:t}})}},created:function(){this.fetchTableItems()},watch:{"var_default_search_payload.page":{handler:function(){this.fetchTableItems()},deep:!0},infoDateOfIssueRange:function(){this.infoDateOfIssueRange.startDate&&(this.filter.fromDate=this.getDateFormat(this.infoDateOfIssueRange.startDate,"-")),this.infoDateOfIssueRange.endDate&&(this.filter.toDate=this.getDateFormat(this.infoDateOfIssueRange.endDate,"-")),this.fetchTableItems()}}},m=d,f=a("2877"),h=Object(f["a"])(m,s,i,!1,null,"8a0232ec",null);e["default"]=h.exports}}]);