(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fe4475fc"],{3645:function(e,t,r){"use strict";r("f684")},b1dd:function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e._self._c;return t("base-create-or-update-wrapper",{attrs:{"has-save-suspend":"","custom-title":e.isModeCreate?e.$t("actions.create"):e.$t("actions.update")},on:{save:e.save}},[t("CreateFormProductOrServiceTypes",{ref:"formProductOrServiceTypes"})],1)},c=[],o=r("c7eb"),n=r("1da1"),u=(r("b0c0"),r("7853")),a=r("03f4"),i="directory/product-or-service-types",d={name:"CreateOrUpdate",components:{CreateFormProductOrServiceTypes:u["default"]},data:function(){return{}},computed:{isModeCreate:function(){return"CreateProductOrServiceType"===this.$route.name},computedObserver:function(){return this.$refs.formProductOrServiceTypes.$refs.observer}},methods:{save:function(){var e=this;this.computedObserver.validate().then((function(t){t?e.$refs.formProductOrServiceTypes.editingItem.id?a["a"].update(i,e.$refs.formProductOrServiceTypes.editingItem).then((function(t){e.computedObserver.reset(),e.$refs.formProductOrServiceTypes.editingItem=Object.assign({},{}),e.$router.go(-1),e.$toast(e.$t("messages.saved_successfully"),{type:"success"})})):(e.$refs.formProductOrServiceTypes.editingItem.contractorStatusId=e.$route.params.cStatusId,a["a"].create(i,e.$refs.formProductOrServiceTypes.editingItem).then((function(t){e.computedObserver.reset(),e.$refs.formProductOrServiceTypes.editingItem=Object.assign({},{}),e.$router.go(-1),e.$toast(e.$t("messages.saved_successfully"),{type:"success"})}))):e.$toast(e.$t("messages.fill_required_fields"),{type:"error"})}))}},created:function(){return Object(n["a"])(Object(o["a"])().mark((function e(){return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()}},f=d,p=(r("3645"),r("2877")),m=Object(p["a"])(f,s,c,!1,null,"1f649618",null);t["default"]=m.exports},f684:function(e,t,r){}}]);