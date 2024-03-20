<template>
  <!-- ADVERTISERS SERVICE CARD  :class="{ 'box-style': integration.isDone, 'noClick': !integration.isDone }"
  :class="{ 'disable-img': !integration.isDone }"-->
  <section id="advertisers" class="advertisers-service-sec pt-4 pb-5">
    <div v-if="!toRouterLoader">
      <b-row class="p-1 font-size-20 font-weight-bold col-3 mx-auto"
             style="color: #236257; font-size: 1.625rem !important;">
        {{ $t('product_dashboard_info.menu_items.other_services') }}
      </b-row>
      <b-col class="ml-4">
        <b-button style="background: #F39138; width: 75px; height: 36px; border: none" size="md" @click="$router.go(-1)">
          {{ $t("actions.back") }}
        </b-button>
      </b-col>
      <b-row class="rais-page-respons my-2 d-flex justify-content-center">
        <b-col cols="12" sm="6" md="4" lg="3" xl="2" class="frame-hover" v-for="(integration, index) in listPro"
               :key="index">
          <div :id="!integration.perm ? index + 'tooltip-button-variant' : ''"
               :class="{ 'box-style': integration.isDone, 'box-style': integration.perm, 'box-notAccess-style': !integration.perm, 'noClick': !integration.isDone }"
               @click="toRouter(integration.routerName)" class="box-style">
            <div>
              <img :class="'img-content-full'"
                   :src="require(`@/assets/integration/${integration.image}`)"
                   :height="integration.height">
            </div>

            <span v-if="integration.routerName == 'TovarMahsulot'" class="box-title-style"
                  :class="(integration.id == 12) ? 'pt-0 px-0': 'py-3 px-4'">
                            {{ integration.name }} <br>
                            ({{ $t('product_info.maxsulot2') }})
                        </span>
            <span v-if="integration.routerName == 'IshXizmatlar'" class="box-title-style"
                  :class="(integration.id == 12) ? 'pt-0 px-0': 'py-3 px-4'">
                            {{ integration.name }} <br>
                          ({{ $t('product_info.xizmat2') }})
                        </span>
            <span v-if="integration.routerName == 'FAQ'" class="box-title-style"
                  :class="(integration.id == 12) ? 'pt-0 px-0': 'py-3 px-4'">
                            {{ integration.name }} <br>
                        </span>
          </div>

        </b-col>
        <!--                <b-col cols="12">-->
        <!--                    <div><button @click="$router.push('/integration/kommunal')">test</button></div>-->
        <!--                </b-col>-->
        <!-- <b-col v-for="(integration, index) in listPro" :key="index" cols="3">
            <div :id="!integration.perm ? index + 'tooltip-button-variant' : ''"
                :class="integration.perm ? 'service-card' : 'service-card-disable'"
                @click="integration.perm ? toRouter(integration.routerName) : ''">
                <div :class="integration.isDone ? 'arrow-up-success' : 'arrow-up'">
                    <span class="itinerary-number"> </span>
                </div>
                <div class="icon-wrapper">
                    <img :src="integration.image" :height="integration.height" />
                </div>
                <h3 class="mt-3 text-center">
                    {{ integration.name }}</h3>
                <b-tooltip :target="index + 'tooltip-button-variant'" variant="danger">
                    {{ $t('error.netAccess') }}
                </b-tooltip>
            </div>
        </b-col> -->
      </b-row>
    </div>

    <div class="text-center" v-else-if="toRouterLoader">
      <b-spinner style="width: 3rem; height: 3rem; margin-top: 100px"></b-spinner>
    </div>
  </section>
  <!-- ADVERTISERS SERVICE CARD ENDED -->
</template>

<script>

export default {
  data() {
    return {
      toRouterLoader: false,
      listPro: [
        {
          id: 1,
          routerName: 'TovarMahsulot',
          perm: '',
          image: 'status.svg',
          name: this.$t('product_info.maxsulot1'),
          isDone: true
        },
        {
          id: 2,
          routerName: 'IshXizmatlar',
          perm: '',
          image: 'status.svg',
          name: this.$t('product_info.xizmat1'),
          isDone: true
        },
        {
          id: 2,
          routerName: 'FAQ',
          perm: '',
          image: 'status.svg',
          name: this.$t('faq.sideNav'),
          isDone: true
        }

        // {
        //   id: 1,
        //   perm: this.$can('view', 'integration-kommunal'),
        //   routerName: 'IntegrationKommunalInfoIndex',
        //   name: this.$t('submodules.integration.kommunal_info.title'),
        //   image: 'kommunal.svg',
        //   height: 50,
        //   isDone: true,
        // },
        // {
        //   id: 2,
        //   perm: this.$can('view', 'integration-davlat-active'),
        //   routerName: 'IntegrationDavlatInfoIndex',
        //   name: this.$t('submodules.integration.davlat_active_info.title'),
        //   image: 'davlat_active.svg',
        //   height: 15,
        //   isDone: true
        // },


      ]
    }
  },
  methods: {
    toRouter(link) {
      this.toRouterLoader = true
      setTimeout(() => {
        this.toRouterLoader = false
        this.$router.push({
          name: link,
        })
      }, 500);


    }
  },
  created() {
    this.listPro1 = this.listPro.filter((e) => e.perm == true)
    this.listPro2 = this.listPro.filter((e) => e.perm == false)
    this.listPro = this.listPro1.concat(this.listPro2)
  },
}
</script>

<style lang="scss" scoped>
/* ADVERTISERS SERVICE CARD */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.rais-page-respons {
  width: 100%;
  max-width: 1140px;
  //margin: 0 auto;
}

.body-title-style {
  width: 100%;
  margin: 18px auto 0;
  padding: 20px;
  background: linear-gradient(to top, #2c675b, #029984);
  text-align: center;
  border-radius: 5px;
}

.body-title-style-text {
  width: 80%;
  font-size: 23px;
  color: white;
  text-align: center;
  margin: 0 auto;
}

::v-deep .wizard-progress-with-circle {
  display: none !important;
}

::v-deep .vue-form-wizard .wizard-nav-pills > li {
  background-color: transparent;
}

::v-deep .wizard-icon-circle {
  display: none;
}

/*::v-deep .vue-form-wizard .wizard-nav-pills>li>a,
.vue-form-wizard .wizard-nav-pills>li>a,
.vue-form-wizard .wizard-nav-pills>li>.stepTitle:nth-child(3) {
  padding-left: 36px !important;
  padding-right: 0 !important;
}*/

::v-deep .vue-form-wizard .wizard-nav-pills > li > a,
.vue-form-wizard .wizard-nav-pills > li > a,
.vue-form-wizard .wizard-nav-pills > li > .stepTitle {
  width: 100%;
  padding: 12px;
  font-size: 17px;
  display: flex;
  margin: 0px;
  justify-content: center;
  border: thin solid #cbe6e1e4;
  background-color: white;
  color: #86a59f;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(2, 153, 133, 0.533);
  text-align: center;
  cursor: pointer;


}

::v-deep .vue-form-wizard .wizard-nav-pills > li.active > a,
.vue-form-wizard .wizard-nav-pills > li.active > a:focus,
.vue-form-wizard .wizard-nav-pills > li > .stepTitle .active {
  width: 100%;
  padding: 12px;
  font-size: 17px;
  display: flex;
  margin: 0px;
  justify-content: center;
  border-bottom: 6px solid #029984;
  background-color: white;
  font-weight: bold;
  text-align: center;
  cursor: pointer;

}

::v-deep .custom-control-input:checked ~ .custom-control-label::before {
  background-color: #029984;
  border-color: #029984;
}

::v-deep .btn-primary {
  background-color: #029984 !important;
  border-color: #029984 !important;
  color: white !important;
}

::v-deep .btn-secondary {
  color: white;
  background-color: #aaa8a8;
  border-color: #aaa8a8;
}


.frame-hover {
  min-width: 400px;
  padding: 60px 20px 20px;
  margin: 5px 0 10px 0;
  border-width: 10px;
  border-style: solid;
  border-radius: 10px;
  border-color: transparent;
  transition: all 0.4s ease;
}

.box-style {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid #029984;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.4s ease;

  .box-title-style {
    padding: 20px;
    font-size: 20px;
    font-weight: 700;
    color: #029984;
    text-align: center;
    transition: all 0.4s ease;
  }
}

.img-content-full {
  position: absolute;
  top: 15px;
  left: 40%;
}

.frame-hover:hover {
  border-width: 10px;
  border-style: solid;
  border-color: #029984;
}

.frame-hover:hover .box-style {
  border: 3px solid #029984;
  box-shadow: 0 0 13px #029984
}

.frame-hover:hover .box-title-style {
  color: #2c675b;

}

.activeBox {
  border-width: 10px;
  border-style: solid;
  border-color: #029984;
}

.activeText {
  color: #2c675b !important;
}

.activeShadow {
  border: 3px solid #029984;
  box-shadow: 0 0 13px #029984
}


.dNone {
  display: none;
}


@media screen and (min-width: 1981px) {
  .rais-page-respons {
    max-width: 1600px;
  }
}

@media screen and (max-width: 1980px) {
  .rais-page-respons {
    max-width: 1500px;
    //padding: 0 20px;
  }
}

@media screen and (max-width: 1365px) {

  ::v-deep .vue-form-wizard .wizard-nav-pills > li > a,
  .vue-form-wizard .wizard-nav-pills > li > a,
  .vue-form-wizard .wizard-nav-pills > li > .stepTitle {
    width: 320px;
  }

  ::v-deep .vue-form-wizard .wizard-nav-pills > li.active > a,
  .vue-form-wizard .wizard-nav-pills > li.active > a:focus,
  .vue-form-wizard .wizard-nav-pills > li > .stepTitle {
    width: 320px;
  }

  .box-style {
    height: 190px;
  }

  .box-style .box-title-style {
    font-size: 22px;
  }
}

@media screen and (max-width: 1066px) {
  .box-style {
    height: 180px;
  }

  .box-style .box-title-style {
    font-size: 20px;
  }
}

@media screen and (max-width: 991px) {
  .box-style {
    height: 170px;
  }

  .rais-page-respons {
    max-width: 1000px;
    padding: 0 15px;
  }

  .body-title-style {
    width: 100%;
    font-size: 20px;
    padding: 0 10px;

  }
}

@media screen and (max-width: 425px) {
  .box-style {
    width: 100%;
    height: 150px;

    .box-title-style {
      font-size: 20px;
      padding: 10px;
    }
  }
}
</style>


