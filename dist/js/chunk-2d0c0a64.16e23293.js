(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c0a64"],{"434c":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("div",{staticClass:"col-md-12 text-center"},[e("div",{staticClass:"h4 mb-4 d-inline-block"},[t._v(t._s(t.$t("submodules.work_days.title")))])]),e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("div",{staticClass:"row mb-2"},[e("div",{staticClass:"col-sm-8"}),e("div",{staticClass:"col-sm-4"},[e("div",{staticClass:"text-sm-end"},[e("download-excel",{attrs:{data:t.json_data,fields:t.json_fields,header:"Статус",worksheet:"My Worksheet",name:"work-days.xls"}},[e("b-btn",{staticClass:"btn btn-rounded bg-primary mb-2",attrs:{type:"button"},on:{click:t.downloadExcel}},[e("i",{staticClass:"mdi mdi-microsoft-excel me-1"}),t._v(" "+t._s(t.$t("actions.download"))+" ")]),e("b-btn",{staticClass:"btn btn-success btn-rounded mb-2 me-2",attrs:{type:"button",to:{name:"CreateWorkDays"}}},[e("i",{staticClass:"mdi mdi-plus me-1"}),t._v(" "+t._s(t.$t("actions.add"))+" ")])],1)],1)])]),e("b-table",{staticClass:"custom-b-table",attrs:{items:t.tableItems,fields:t.tableFields,busy:t.loadingTableItems,id:"my-table",responsive:"",striped:"",bordered:"",small:"",hover:"","show-empty":""},scopedSlots:t._u([{key:"cell(index)",fn:function(e){return[t._v(" "+t._s(t.util_paginate(e.index,t.var_default_search_payload.page,t.var_default_search_payload.itemsPerPage))+" ")]}},{key:"cell(name)",fn:function(a){return[e("div",{staticClass:"d-flex justify-content-between"},[e("p",{staticClass:"mb-0 d-flex align-items-center",staticStyle:{"flex-basis":"0","flex-grow":"1",gap:".3rem"}},[e("span",{staticClass:"badge bg-primary"},[t._v("ЎЗ")]),t._v(" : "),e("span",[t._v(" "+t._s(a.item.nameUz))])]),e("p",{staticClass:"mb-0 d-flex align-items-center",staticStyle:{"flex-basis":"0","flex-grow":"1",gap:".3rem"}},[e("span",{staticClass:"badge bg-primary"},[t._v("O'Z")]),t._v(" : "),e("span",[t._v(" "+t._s(a.item.nameLt))])]),e("p",{staticClass:"mb-0 d-flex align-items-center",staticStyle:{"flex-basis":"0","flex-grow":"1",gap:".3rem"}},[e("span",{staticClass:"badge bg-primary"},[t._v("РУ")]),t._v(" : "),e("span",[t._v(" "+t._s(a.item.nameRu))])]),e("p",{staticClass:"mb-0 d-flex align-items-center",staticStyle:{"flex-basis":"0","flex-grow":"1",gap:".3rem"}},[e("span",{staticClass:"badge bg-primary"},[t._v("EN")]),t._v(" : "),e("span",[t._v(" "+t._s(a.item.nameEn))])])])]}},{key:"cell(actions)",fn:function(a){return[e("div",{staticClass:"general-table__actions d-flex justify-content-center"},[e("b-btn",{staticClass:"text-decoration-none p-0",staticStyle:{"font-size":"1.2rem","margin-right":"1rem"},attrs:{variant:"link"}},[e("i",{staticClass:"mdi mdi-circle-edit-outline edit",on:{click:function(e){return t.editItem(a.item.id)}}})])],1)]}},{key:"empty",fn:function(){return[e("h4",{staticClass:"text-center"},[t._v(t._s(t.$t("messages.data_not_found")))])]},proxy:!0},{key:"table-busy",fn:function(){return[e("div",{staticClass:"text-center my-2"},[e("b-spinner",{staticClass:"align-middle",attrs:{variant:"primary"}})],1)]},proxy:!0}])}),e("b-pagination",{staticClass:"justify-content-end",attrs:{"total-rows":t.totalItems,"per-page":t.var_default_search_payload.itemsPerPage,"aria-controls":"my-table"},model:{value:t.var_default_search_payload.page,callback:function(e){t.$set(t.var_default_search_payload,"page",e)},expression:"var_default_search_payload.page"}})],1)])])])},l=[],n=a("c7eb"),i=a("1da1"),r=(a("a4d3"),a("e01a"),a("d3b7"),a("159b"),a("14d9"),a("c2a4")),c=a("03f4"),o="/directory/work-days",d={page:{title:"Statuses",meta:[{name:"description",content:r.description}]},components:{},data:function(){return{loadingTableItems:!1,json_fields:{"Name Uz":"nameUz","Name Lt":"nameLt","Name Ru":"nameRu","Name En":"nameEn"},json_data:[],json_meta:[[{key:"charset",value:"utf-8"}]],searchKeyword:"",selected:20,optionsTable:[{value:20,text:20},{value:50,text:50},{value:100,text:100},{value:150,text:150},{value:200,text:200}],title:this.$t("submodules.work_days.title"),activeDep:{},tableItems:[],totalItems:0,tableFields:[{label:"#",thClass:"text-center",tdClass:"text-center",sortable:!1,key:"index"},{label:this.$t("column.name"),key:"name"},{label:this.$t("column.actions"),key:"actions",thClass:"text-center",tdClass:"text-center",sortable:!1}]}},computed:{numberOfPages:function(){return!this.totalItems||this.totalItems<=0||this.totalItems<this.var_default_search_payload.itemsPerPage?1:this.totalItems/this.var_default_search_payload.itemsPerPage}},methods:{downloadExcel:function(){var t=this;if(this.json_data=[],console.log(null===this||void 0===this?void 0:this.tableItems),!((null===this||void 0===this?void 0:this.tableItems)instanceof Array))return!1;this.tableItems.forEach((function(e){var a={};a.nameUz=e.nameUz,a.nameLt=e.nameLt,a.nameRu=e.nameRu,a.nameEn=e.nameEn,t.json_data.push(a)}))},selectList:function(t){this.var_default_search_payload.itemsPerPage="all"==t?this.totalItems:t,this.fetchTableItems()},fetchTableItems:function(){var t=this;return Object(i["a"])(Object(n["a"])().mark((function e(){return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loadingTableItems=!0,t.var_default_search_payload.keyword=t.searchKeyword,t.var_default_search_payload.sortDesc.push(!1),"uz"==t.$i18n.locale?t.var_default_search_payload.sortBy.push("nameLt"):"ru"==t.$i18n.locale?t.var_default_search_payload.sortBy.push("nameRu"):"uzCyrillic"==t.$i18n.locale?t.var_default_search_payload.sortBy.push("nameUz"):"en"==t.$i18n.locale&&t.var_default_search_payload.sortBy.push("nameEn"),e.next=6,c["a"].searchList(o,t.var_default_search_payload).then((function(e){console.log(e),t.tableItems=e.data.list,t.totalItems=e.data.list.length})).catch((function(t){console.log(t)})).finally((function(){t.loadingTableItems=!1}));case 6:case"end":return e.stop()}}),e)})))()},editItem:function(t){this.$router.push({name:"UpdateWorkDays",params:{id:t}})}},created:function(){this.fetchTableItems()},watch:{"var_default_search_payload.page":{handler:function(){this.fetchTableItems()}}}},m=d,u=a("2877"),_=Object(u["a"])(m,s,l,!1,null,"57fe648c",null);e["default"]=_.exports}}]);