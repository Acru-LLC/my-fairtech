(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-135a9a04"],{"0e26":function(t,e,n){"use strict";n.r(e);n("14d9");var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("div",{staticClass:"col-md-12 text-sm-start"},[e("b-button",{staticClass:"btn btn-warning",attrs:{size:"md"},on:{click:function(e){return t.$router.push({name:"IntegrationMenuIndex"})}}},[t._v(" "+t._s(t.$t("actions.back"))+" ")])],1),e("div",{staticClass:"col-md-12 text-center"},[e("div",{staticClass:"h4 mb-4 d-inline-block"},[t._v(t._s(t.$t("submodules.integration.iiv_info.fullTitle")))])]),e("div",{staticClass:"card"},[e("div",[e("b-card",{attrs:{"no-body":""}},[e("Info")],1)],1)])])])},o=[],i=n("8468"),r=function(){var t=this,e=t._self._c;return e("div",[e("b-card",{attrs:{"header-tag":"header","footer-tag":"footer"},scopedSlots:t._u([{key:"header",fn:function(){return[e("ValidationObserver",{ref:"observer",scopedSlots:t._u([{key:"default",fn:function(n){return Object(i["a"])(n),[e("b-row",{staticClass:"mb-3"},[e("b-col",{attrs:{sm:"12",md:"3"}},[e("BaseInputWithValidation",{staticClass:"required",attrs:{"label-on-top":"",rules:"required",label:t.$t("auth.first_name"),placeholder:t.$t("auth.first_name")},model:{value:t.form.firstname,callback:function(e){t.$set(t.form,"firstname",e)},expression:"form.firstname"}})],1),e("b-col",{attrs:{sm:"12",md:"3"}},[e("BaseInputWithValidation",{staticClass:"required",attrs:{"label-on-top":"",rules:"required",label:t.$t("auth.last_name"),placeholder:t.$t("auth.last_name")},model:{value:t.form.lastname,callback:function(e){t.$set(t.form,"lastname",e)},expression:"form.lastname"}})],1),e("b-col",{attrs:{sm:"12",md:"3"}},[e("BaseInputWithValidation",{attrs:{"label-on-top":"",label:t.$t("auth.middle_name"),placeholder:t.$t("auth.middle_name")},model:{value:t.form.middlename,callback:function(e){t.$set(t.form,"middlename",e)},expression:"form.middlename"}})],1),e("b-col",{attrs:{sm:"12",md:"3"}},[e("BaseDatePickerWithValidation",{staticClass:"required",attrs:{rules:"required",label:t.$t("column.birthdate"),type:"year",format:"YYYY","label-on-top":"",lang:"ru"},model:{value:t.form.birth_year,callback:function(e){t.$set(t.form,"birth_year",e)},expression:"form.birth_year"}})],1)],1),e("b-row",{staticClass:"mt-3"},[e("b-col",{attrs:{sm:"12",md:"2"}},[e("BaseInputWithValidation",{attrs:{rules:"integer|min:14|max:14",mask:"##############","label-on-top":"",label:t.$t("submodules.integration.farmasevtika_info.fields2.pinfl"),placeholder:t.$t("submodules.integration.farmasevtika_info.fields2.pinfl")},model:{value:t.form.pinfl,callback:function(e){t.$set(t.form,"pinfl",e)},expression:"form.pinfl"}})],1),e("b-col",{attrs:{sm:"12",md:"2"}},[e("BaseInputWithValidation",{attrs:{"label-on-top":"",label:t.$t("submodules.integration.ssv_info.res.pasport"),placeholder:t.$t("submodules.integration.ssv_info.res.pasport")},model:{value:t.form.passport,callback:function(e){t.$set(t.form,"passport",e)},expression:"form.passport"}})],1),e("b-col",{attrs:{sm:"12",md:"2"}},[e("BaseInputWithValidation",{staticClass:"required",attrs:{"label-on-top":"",rules:"required",label:t.$t("submodules.integration.iiv_info.organization_id"),placeholder:t.$t("submodules.integration.iiv_info.organization_id")},model:{value:t.form.organization_id,callback:function(e){t.$set(t.form,"organization_id",e)},expression:"form.organization_id"}})],1),e("b-col",{attrs:{sm:"12",md:"2"}},[e("BaseInputWithValidation",{staticClass:"required",attrs:{"label-on-top":"",rules:"required",label:t.$t("submodules.integration.iiv_info.region_id"),placeholder:t.$t("submodules.integration.iiv_info.region_id")},model:{value:t.form.region_id,callback:function(e){t.$set(t.form,"region_id",e)},expression:"form.region_id"}})],1),e("b-col",{attrs:{sm:"12",md:"3"}},[e("b-form-checkbox",{staticClass:"mt-4",attrs:{switch:""},model:{value:t.form.consent,callback:function(e){t.$set(t.form,"consent",e)},expression:"form.consent"}},[e("span",[t._v(" "+t._s(t.$t("submodules.integration.iiv_info.consent"))+" ")])])],1),e("b-col",{attrs:{sm:"12",md:"1"}},[e("b-btn",{staticClass:"mt-3",staticStyle:{width:"60px"},attrs:{variant:"success",disabled:t.loadingTableItems},on:{click:t.getInfos}},[e("i",{directives:[{name:"show",rawName:"v-show",value:!t.loadingTableItems,expression:"!loadingTableItems"}],staticClass:"fa fa-search fa-1x"}),e("b-spinner",{directives:[{name:"show",rawName:"v-show",value:t.loadingTableItems,expression:"loadingTableItems"}],attrs:{small:"",type:"grow"}})],1)],1)],1)]}}])})]},proxy:!0}])},[t.resInformation_Date?e("b-card",{staticStyle:{padding:"0 50px"},attrs:{title:t.$t("submodules.integration.farmasevtika_info.response")}},[e("b-card",{directives:[{name:"show",rawName:"v-show",value:!t.loadingTableItems,expression:"!loadingTableItems"}],staticClass:"overflow-hidden",attrs:{"no-body":""}},[e("b-card-text",[e("b-list-group-item",{staticClass:"d-flex justify-content-between align-items-center"},[e("b",[t._v(" "+t._s(t.$t("submodules.integration.kommunal_info.response_date")))]),e("span",{attrs:{variant:"primary",pill:""}},[t._v(t._s(t.resInformation_Date.response_date?t.resInformation_Date.response_date:"_ _ _"))])]),e("b-list-group-item",{staticClass:"d-flex justify-content-between align-items-center"},[e("b",[t._v(" "+t._s(t.$t("submodules.integration.kommunal_info.customer_fio")))]),e("span",{attrs:{variant:"primary",pill:""}},[t._v(t._s(t.resInformation_Date.customer_fio?t.resInformation_Date.customer_fio:"_ _ _"))])]),e("b-list-group-item",{staticClass:"d-flex justify-content-between align-items-center"},[e("b",[t._v(" "+t._s(t.$t("submodules.integration.kommunal_info.estate_address")))]),e("span",{attrs:{variant:"primary",pill:""}},[t._v(t._s(t.resInformation_Date.estate_address?t.resInformation_Date.estate_address:"_ _ _"))])]),e("b-list-group-item",{staticClass:"d-flex justify-content-between align-items-center"},[e("b",[t._v(" "+t._s(t.$t("submodules.integration.kommunal_info.balance")))]),e("span",{attrs:{variant:"primary",pill:""}},[t._v(t._s(t.resInformation_Date.balance?t.resInformation_Date.balance:"_ _ _"))])]),e("b-list-group-item",{staticClass:"d-flex justify-content-between align-items-center"},[e("b",[t._v(" "+t._s(t.$t("submodules.integration.kommunal_info.soato")))]),e("span",{attrs:{variant:"primary",pill:""}},[t._v(t._s(t.resInformation_Date.soato?t.resInformation_Date.soato:"_ _ _"))])]),e("b-list-group-item",{staticClass:"d-flex justify-content-between align-items-center"},[e("b",[t._v(" "+t._s(t.$t("submodules.integration.kommunal_info.customer")))]),e("span",{attrs:{variant:"primary",pill:""}},[t._v(t._s(t.resInformation_Date.customer?t.resInformation_Date.customer:"_ _ _"))])]),e("b-list-group-item",{staticClass:"d-flex justify-content-between align-items-center"},[e("b",[t._v(" "+t._s(t.$t("submodules.integration.kommunal_info.tarif")))]),e("span",{attrs:{variant:"primary",pill:""}},[t._v(t._s(t.resInformation_Date.tarif?t.resInformation_Date.tarif:"_ _ _"))])]),e("b-list-group-item",{staticClass:"d-flex justify-content-between align-items-center"},[e("b",[t._v(" "+t._s(t.$t("submodules.integration.kommunal_info.last_payment")))]),e("span",{attrs:{variant:"primary",pill:""}},[t._v(t._s(t.resInformation_Date.last_payment))])])],1)],1)],1):t._e(),e("div",{directives:[{name:"show",rawName:"v-show",value:t.loadingTableItems,expression:"loadingTableItems"}],staticClass:"text-center"},[e("b-spinner",{attrs:{variant:"primary",label:"Text Centered"}})],1)],1)],1)},s=[],l=n("8d01"),d={name:"methods1",data:function(){return{form:{lastname:"",middlename:"",firstname:"",birth_year:"",pinfl:"",passport:"",organization_id:"",region_id:"",consent:!1},resInformation_Date:null,loadingTableItems:!1,tableFields:[{label:"#",thClass:"text-center",tdClass:"text-center",sortable:!1,key:"index"},{label:"abonent id",key:"abonents_id",thStyle:{minWidth:"230px"}},{label:"davr",key:"period",thStyle:{minWidth:"150px"}},{label:"saldo boshi",key:"saldo_n",thStyle:{minWidth:"220px"}},{label:"oylik to'lov qiymati",key:"nachis",thStyle:{minWidth:"120px"}},{label:"akt",key:"akt",thStyle:{minWidth:"120px"}},{label:"To'lov",key:"postup",thStyle:{minWidth:"120px"}},{label:"Saldo oxiri",key:"saldo_k",thStyle:{minWidth:"120px"}}]}},computed:{computedObserver:function(){return this.$refs.observer},state:function(){return!!this.form.consent}},methods:{getInfos:function(){var t=this;this.computedObserver.validate().then((function(e){if(e){t.loadingTableItems=!0;var n={lastname:t.form.lastname,middlename:t.form.middlename,firstname:t.form.firstname,birth_year:t.form.birth_year,pinfl:t.form.pinfl,passport:t.form.passport,organization_id:t.form.organization_id,region_id:t.form.region_id,consent:t.form.consent};l["a"].getIIVInfo(n,!0).then((function(e){t.resInformation_Date=e.data,100==t.resInformation_Date.result_code&&t.$toast(t.resInformation_Date.result_message,{type:"success"}),t.loadingTableItems=!1})).catch((function(e){t.loadingTableItems=!1}))}else t.enterInfo()}))}}},m=d,c=n("2877"),u=Object(c["a"])(m,r,s,!1,null,"5377b5d8",null),f=u.exports,p={components:{Info:f}},_=p,g=Object(c["a"])(_,a,o,!1,null,null,null);e["default"]=g.exports},8468:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));n("d9e2");function a(t){if(null==t)throw new TypeError("Cannot destructure "+t)}},"8d01":function(t,e,n){"use strict";n("99af");var a=n("f2db"),o={getContractorInfoByInnForCreate:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].get("soliq/get-info-from-soliq-by-inn/yuridik-info?inn=".concat(t),e)},getSuvXojaligiInformation:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].post("suvXojaligi/get-info?offset=".concat(t.offset,"&limit=").concat(t.limit),e)},getFarmasevtikaInformation:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].post("farmasevtika/get-info?offset=".concat(t.offset,"&limit=").concat(t.limit),e)},getFarmasevtikaInformationByBoxGroupId:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].post("farmasevtika/get-info-by-id?box_group_id=".concat(t),e)},getIstisodiyotInformation1:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].post("iqtisodiyot-vazirlik/get-information-1?date=".concat(t),e)},getIstisodiyotInformation2:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].post("iqtisodiyot-vazirlik/get-information-2?date=".concat(t),e)},getIstisodiyotInformation3:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].post("iqtisodiyot-vazirlik/get-information-3?date=".concat(t),e)},getOsimliklarKarantinInfoByInnForCreate:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].get("osimliklar-karantin-api/get-by-inn-info?number=".concat(t),e)},getSoliqQomitasiInfoByInn:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].get("soliq/get-contractor-by-inn/inner-or-from-soliq?inn=".concat(t),e)},getKadastrInfoForCreate:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].get("kadastr-api/get-by-inn-info?number=".concat(t),e)},getSuvXojaligiInfo:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return a["a"].get("suvXojaligi/get-info",t)},getDavlatActiveInfoForCreate:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].get("active-api/get-by-inn-info?number=".concat(t),e)},getDavlatActiveInfoForInn:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].post("davlat-active-api/get-info-by-inn?inn=".concat(t.inn,"&pinfl=").concat(t.pinfl,"&identifikator=").concat(t.identifikator),e)},getKommunalInfoByPinflWith_kad_num:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].post("kommunal/get-info-by-kad_num?kad_num=".concat(t.kad_num),e)},getElektrTaminotInfoByPinflWith_kad_num:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].post("elektr-taminot/get-info?sender_pinfl=".concat(t.pinfl,"&kad_num=").concat(t.kad_num),e)},getElektrTaminotInfoWithLicshet:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].post("elektr-taminot/get-info-by-licshet?licshet=".concat(t.licshet),e)},getEkologiyaInfoForSTIR:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].post("ekologiya-api/get-info-by-pinfl?pinfl=".concat(t),e)},getEkologiyaInfoForUsername:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].get("active-api/get-by-inn-info?number=".concat(t),e)},getHududGazInfoMethod1:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].post("hudud-gaz/getby_pin?pin=".concat(t),e)},getHududGazInfoMethod2:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].post("hudud-gaz/getby_kad_num?kad_num=".concat(t),e)},getHududGazInfoMethod3:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].post("hudud-gaz/getby_tin?tin=".concat(t),e)},getHududGazInfoMethod4:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].post("hudud-gaz/getby_customer_code?customer_code=".concat(t),e)},getKadastrInfoMethod1:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].post("kadastr/method1?kad_num=".concat(t.kad_num,"&tin=").concat(t.tin,"&purpose=").concat(t.purpose),e)},getKadastrInfoMethod2:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].post("kadastr/method2?pin=".concat(t.pin,"&tin=").concat(t.tin,"&purpose=").concat(t.purpose),e)},getKadastrInfoMethod3:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].post("kadastr/method3?tin=".concat(t.tin,"&org_tin=").concat(t.org_tin),e)},getIIVInfo:function(t){return a["a"].post("iiv-sud/check",t)},getYoshlarInfo:function(t){return a["a"].post("iiv-yd/yoshlarDaftari",t)},getSuvTaminotInfoByPinflWith_kad_num:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return a["a"].post("suvtaminot/get-info-by-kad_num?cadastre=".concat(t.kad_num),e)}};e["a"]=o}}]);