(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e6f7b3ca"],{"37a2":function(e,t,r){"use strict";r("8eba")},"815a":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e._self._c;return t("base-create-or-update-wrapper",{attrs:{"has-save-suspend":"","custom-title":e.isModeCreate?e.$t("actions.create"):e.$t("actions.update")},on:{save:e.save}},[t("CreateFormAdPrivilegeCoefficient",{ref:"createOrUpdateFormRef"})],1)},a=[],s=r("c7eb"),i=r("1da1"),c=(r("b0c0"),r("7db0"),r("d3b7"),r("702d")),o=r("03f4"),d=(r("887a"),"directory/advertisement-design-type_privilege_coefficients"),u={name:"CreateOrUpdate",components:{CreateFormAdPrivilegeCoefficient:c["default"]},data:function(){return{adDesignTypes:[]}},computed:{isModeCreate:function(){return"CreateAdvertisementPrivilegeCoefficient"===this.$route.name},computedObserver:function(){return this.$refs.createOrUpdateFormRef.$refs.observer}},methods:{customLabelAdDesignType:function(e){var t=this.adDesignTypes.find((function(t){return t.id==(e.id?e.id:e)}));return t?"".concat(t.nameUz):""},treeClosed:function(e){this.computedObserver.refs[e].validate()},normalizer:function(e){return e.children&&0!==e.children.length?{id:e.id,label:e.name,children:e.children&&e.children.length>0?e.children:[]}:(delete e.children,{id:e.id,label:e.name})},customFilter:function(e,t,r){var n=e.name.toLowerCase(),a=e.code.toLowerCase(),s=t.toLowerCase();return n.indexOf(s)>-1||a.indexOf(s)>-1},save:function(){var e=this;this.computedObserver.validate().then((function(t){t?e.$refs.createOrUpdateFormRef.editingItem.id?o["a"].update(d,e.$refs.createOrUpdateFormRef.editingItem).then((function(t){e.computedObserver.reset(),e.$refs.createOrUpdateFormRef.editingItem=Object.assign({},{}),e.$router.go(-1),e.$toast(e.$t("messages.saved_successfully"),{type:"success"})})):o["a"].create(d,e.$refs.createOrUpdateFormRef.editingItem).then((function(t){e.computedObserver.reset(),e.$refs.createOrUpdateFormRef.editingItem=Object.assign({},{}),e.$router.go(-1),e.$toast(e.$t("messages.saved_successfully"),{type:"success"})})):e.$toast(e.$t("messages.fill_required_fields"),{type:"error"})}))}},created:function(){return Object(i["a"])(Object(s["a"])().mark((function e(){return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()}},f=u,l=(r("37a2"),r("2877")),m=Object(l["a"])(f,n,a,!1,null,"13f80181",null);t["default"]=m.exports},"8eba":function(e,t,r){}}]);