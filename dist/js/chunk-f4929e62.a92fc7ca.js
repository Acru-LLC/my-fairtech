(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f4929e62"],{ab3c:function(t,e,a){"use strict";a("ddf9")},bd60:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t._self._c;return e("b-row",[e("b-col",{staticClass:"text-center",attrs:{sm:"12"}},[e("div",{staticClass:"h4 mb-4 d-inline-block"},[t._v(t._s(t.title))]),e("b-btn",{staticClass:"float-right",attrs:{variant:"warning"},on:{click:t.goBack}},[t._v(t._s(t.$t("actions.back")))])],1),e("b-col",{attrs:{sm:"12"}},[e("b-card",[e("b-card-header"),e("b-card-body",[e("b-table",{attrs:{items:t.items,hover:"",striped:"","thead-class":"d-none",bordered:"",small:""}})],1)],1)],1)],1)},r=[],o=a("c7eb"),s=a("1da1"),c=(a("14d9"),a("b0c0"),a("56d7")),n=a("03f4"),d="open-data/domestic-market-price",p={name:"View",data:function(){return{title:this.$t("open_data.domestic_market_price.title"),editingItem:{},statuses:[]}},computed:{items:function(){var t=[];for(var e in this.editingItem)this.labels[e]&&t.push({label:this.labels[e],value:this.editingItem[e]});return t},labels:function(){return{date:this.$t("open_data.domestic_market_price.date"),formedBread:this.$t("open_data.domestic_market_price.formedBread"),highGradeFlourImport:this.$t("open_data.domestic_market_price.highGradeFlourImport"),firstGradeFlourImport:this.$t("open_data.domestic_market_price.firstGradeFlourImport"),firstGradeFlourLocal:this.$t("open_data.domestic_market_price.firstGradeFlourLocal"),cottonOilLocal:this.$t("open_data.domestic_market_price.cottonOilLocal"),sunflowerOilImport:this.$t("open_data.domestic_market_price.sunflowerOilImport"),sugar:this.$t("open_data.domestic_market_price.sugar-stations"),milkLocal:this.$t("open_data.domestic_market_price.milkLocal"),egg:this.$t("open_data.domestic_market_price.egg"),riceAlanga:this.$t("open_data.domestic_market_price.riceAlanga"),pasta:this.$t("open_data.domestic_market_price.pasta"),pastaPackaged:this.$t("open_data.domestic_market_price.pastaPackaged"),beefBoneless:this.$t("open_data.domestic_market_price.beefBoneless"),beefWithBone:this.$t("open_data.domestic_market_price.beefWithBone"),mutton:this.$t("open_data.domestic_market_price.mutton"),chicken:this.$t("open_data.domestic_market_price.chicken"),potato:this.$t("open_data.domestic_market_price.potato"),onion:this.$t("open_data.domestic_market_price.onion"),carrot:this.$t("open_data.domestic_market_price.carrot"),butter:this.$t("open_data.domestic_market_price.butter"),buckwheat:this.$t("open_data.domestic_market_price.buckwheat"),babyFood:this.$t("open_data.domestic_market_price.babyFood"),mask:this.$t("open_data.domestic_market_price.mask"),sanitizerGel:this.$t("open_data.domestic_market_price.sanitizerGel"),dryNapkin:this.$t("open_data.domestic_market_price.dryNapkin"),wetNapkin:this.$t("open_data.domestic_market_price.wetNapkin"),babyDiaper:this.$t("open_data.domestic_market_price.babyDiaper"),toiletPaper:this.$t("open_data.domestic_market_price.toiletPaper"),chlorine:this.$t("open_data.domestic_market_price.chlorine"),toothpaste:this.$t("open_data.domestic_market_price.toothpaste"),perfumeSoap:this.$t("open_data.domestic_market_price.perfumeSoap"),liquidSoap:this.$t("open_data.domestic_market_price.liquidSoap"),ethylAlcohol:this.$t("open_data.domestic_market_price.ethylAlcohol"),washingPowder:this.$t("open_data.domestic_market_price.washingPowder"),laundrySoap:this.$t("open_data.domestic_market_price.laundrySoap")}}},methods:{goBack:function(){c["bus"].leaveWithConfirm=!0,this.goBackRoute&&this.goBackRoute.name?this.$router.push(this.goBackRoute):this.$router.go(-1)},handleCreated:function(){var t=this;return Object(s["a"])(Object(o["a"])().mark((function e(){return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.var_default_search_payload.itemsPerPage=500,e.next=3,n["a"].getById(d,t.$route.params.id,!0).then((function(e){t.editingItem=e.data})).catch((function(t){console.log(t)}));case 3:case"end":return e.stop()}}),e)})))()}},created:function(){var t=this;return Object(s["a"])(Object(o["a"])().mark((function e(){return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.handleCreated();case 2:case"end":return e.stop()}}),e)})))()}},_=p,m=(a("ab3c"),a("2877")),h=Object(m["a"])(_,i,r,!1,null,null,null);e["default"]=h.exports},ddf9:function(t,e,a){}}]);