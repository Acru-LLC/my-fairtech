(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8a61374c"],{3649:function(t,e,a){"use strict";a("a57e")},a57e:function(t,e,a){},e9c8:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t._self._c;return e("b-row",[e("b-col",{staticClass:"text-center",attrs:{sm:"12"}},[e("div",{staticClass:"h4 mb-4 d-inline-block"},[t._v(t._s(t.title))]),e("b-btn",{staticClass:"float-right",attrs:{variant:"warning"},on:{click:t.goBack}},[t._v(t._s(t.$t("actions.back")))])],1),e("b-col",{attrs:{sm:"12"}},[e("b-card",[e("b-card-header"),e("b-card-body",[e("b-table",{attrs:{items:t.items,hover:"",striped:"","thead-class":"d-none",bordered:"",small:""}})],1)],1)],1)],1)},r=[],i=a("c7eb"),s=a("1da1"),o=(a("14d9"),a("b0c0"),a("56d7")),c=a("03f4"),u="open-data/competition-law-reestr",d={name:"View",data:function(){return{title:this.$t("open_data.competition_law_reestr.title"),editingItem:{},statuses:[]}},computed:{items:function(){var t=[];for(var e in this.editingItem)this.labels[e]&&t.push({label:this.labels[e],value:this.editingItem[e]});return t},labels:function(){return{enterpriseNameLt:this.$t("open_data.competition_law_reestr.enterpriseName","uz")+" (o'z)",enterpriseNameUz:this.$t("open_data.competition_law_reestr.enterpriseName","uzCyrillic")+" (ўз)",enterpriseNameRu:this.$t("open_data.competition_law_reestr.enterpriseName","ru")+" (ру)",enterpriseNameEn:this.$t("open_data.competition_law_reestr.enterpriseName","en")+" (en)",number:this.$t("open_data.competition_law_reestr.number"),date:this.$t("open_data.competition_law_reestr.date"),documentLt:this.$t("open_data.competition_law_reestr.document","uz")+" (o'z)",documentUz:this.$t("open_data.competition_law_reestr.document","uzCyrillic")+" (ўз)",documentRu:this.$t("open_data.competition_law_reestr.document","ru")+" (ру)",documentEn:this.$t("open_data.competition_law_reestr.document","en")+" (en)"}}},methods:{goBack:function(){o["bus"].leaveWithConfirm=!0,this.goBackRoute&&this.goBackRoute.name?this.$router.push(this.goBackRoute):this.$router.go(-1)},handleCreated:function(){var t=this;return Object(s["a"])(Object(i["a"])().mark((function e(){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.var_default_search_payload.itemsPerPage=500,e.next=3,c["a"].getById(u,t.$route.params.id,!0).then((function(e){t.editingItem=e.data})).catch((function(t){console.log(t)}));case 3:case"end":return e.stop()}}),e)})))()}},created:function(){var t=this;return Object(s["a"])(Object(i["a"])().mark((function e(){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.handleCreated();case 2:case"end":return e.stop()}}),e)})))()}},l=d,m=(a("3649"),a("2877")),p=Object(m["a"])(l,n,r,!1,null,null,null);e["default"]=p.exports}}]);