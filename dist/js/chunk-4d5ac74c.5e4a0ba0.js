(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d5ac74c"],{"1aee":function(t,e,a){"use strict";a("1fc4")},"1fc4":function(t,e,a){},"5e14":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t._self._c;return e("b-row",[e("b-col",{staticClass:"text-center",attrs:{sm:"12"}},[e("div",{staticClass:"h4 mb-4 d-inline-block"},[t._v(t._s(t.title))]),e("b-btn",{staticClass:"float-right",attrs:{variant:"warning"},on:{click:t.goBack}},[t._v(t._s(t.$t("actions.back")))])],1),e("b-col",{attrs:{sm:"12"}},[e("b-card",[e("b-card-header"),e("b-card-body",[e("b-table",{attrs:{items:t.items,hover:"",striped:"","thead-class":"d-none",bordered:"",small:""}})],1)],1)],1)],1)},i=[],s=a("c7eb"),r=a("1da1"),o=(a("14d9"),a("b0c0"),a("56d7")),c=a("03f4"),l="open-data/appeals-consideration",d={name:"View",data:function(){return{title:this.$t("open_data.appeals_consideration.title"),editingItem:{},statuses:[]}},computed:{items:function(){var t=[];for(var e in this.editingItem)this.labels[e]&&t.push({label:this.labels[e],value:this.editingItem[e]});return t},labels:function(){return{nameLt:this.$t("open_data.appeals_consideration.name","uz")+" (o'z)",nameUz:this.$t("open_data.appeals_consideration.name","uzCyrillic")+" (ўз)",nameRu:this.$t("open_data.appeals_consideration.name","ru")+" (ру)",number:this.$t("open_data.appeals_consideration.number"),verbally:this.$t("open_data.appeals_consideration.verbally"),written:this.$t("open_data.appeals_consideration.written"),electron:this.$t("open_data.appeals_consideration.electron")}}},methods:{goBack:function(){o["bus"].leaveWithConfirm=!0,this.goBackRoute&&this.goBackRoute.name?this.$router.push(this.goBackRoute):this.$router.go(-1)},handleCreated:function(){var t=this;return Object(r["a"])(Object(s["a"])().mark((function e(){return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.var_default_search_payload.itemsPerPage=500,e.next=3,c["a"].getById(l,t.$route.params.id,!0).then((function(e){t.editingItem=e.data})).catch((function(t){console.log(t)}));case 3:case"end":return e.stop()}}),e)})))()}},created:function(){var t=this;return Object(r["a"])(Object(s["a"])().mark((function e(){return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.handleCreated();case 2:case"end":return e.stop()}}),e)})))()}},u=d,p=(a("1aee"),a("2877")),h=Object(p["a"])(u,n,i,!1,null,null,null);e["default"]=h.exports}}]);