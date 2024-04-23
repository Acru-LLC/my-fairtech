<script>
import da from "vue2-datepicker/locale/es/da";

export default {
  data() {
    return {
      showModal: false
    }
  },
  methods: {}
};

</script>

<template>
  <!--START SERVICES-->
  <section class=" section-lg pb-0" id="services">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <h1 class="section-title text-center text-color">{{ $t('main_page.title') }}</h1>
          <div class="section-title-border margin-t-20" style="background-color: #246256"></div>
          <!--          <p-->
          <!--              class="section-subtitle text-muted text-center padding-t-30 font-secondary"-->
          <!--          >We craft digital, graphic and dimensional thinking, to create category leading brand experiences that have meaning and add a value for our clients.</p>-->
        </div>
      </div>
      <div class="row margin-t-30">
        <div class="col-lg-4 col-md-6 col-12 mb-4">
          <a href="https://cabinet.fairtech.uz/murojaat-create" target="_blank" class="col margin-t-20">
            <div class="h-100"
                 style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
              <div class="services-box text-center hover-effect">
                <img src="@/assets/image/service-logo.svg" alt="">
                <h4 class="padding-t-15 text-color">{{ $t('services.appeal_title') }}</h4>
                <p class="padding-t-15 text-color">
                  {{ $t('services.appeal_subtitle') }}
                </p>
              </div>
            </div>
          </a>
        </div>
        <div class="col-lg-4 col-md-6 col-12 mb-4">
          <router-link to="/online-watching" teg="div" class="col mx-5 margin-t-20">
            <div class="h-100"
                 style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
              <div class="services-box text-center hover-effect">
                <img src="@/assets/image/service-logo.svg" alt="">
                <h4 class="padding-t-15 text-color">{{ $t('services.online_checking.card_title') }}</h4>
                <p class="padding-t-15 text-color">
                  {{ $t('services.online_checking.card_subtitle1') }}
                  <a href="https://cabinet.fairtech.uz" target="_blank">cabinet.fairtech.uz</a>
                  {{ $t('services.online_checking.card_subtitle2') }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-lg-4 col-md-6 col-12 mb-4">
          <router-link to="/product-services" teg="div" class="col margin-t-20">
            <div class="h-100"
                 style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
              <div class="services-box text-center hover-effect">
                <img src="@/assets/image/service-logo.svg" alt="">
                <h4 class="padding-t-15 text-color ">{{ $t('services.product_info.card_title') }}</h4>
                <hr class="green-gradient-bg w-75" style="height: 2px">
                <h4 class="text-color">{{ $t('services.product_info.card_subtitle1') }}</h4>
                <p class="padding-t-15 text-color">
                  {{ $t('services.product_info.card_subtitle2') }}
                </p>
              </div>
            </div>
          </router-link>
        </div>

      </div>
      <div class="row mt-5">
        <div class="col-lg-4 col-md-6 col-12 mb-4">
          <a href="https://cabinet.fairtech.uz/reporting/menu" target="_blank" class="col margin-t-20">
            <div class="h-100"
                 style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
              <div class="services-box text-center hover-effect">
                <img src="@/assets/image/service-logo.svg" alt="">
                <h4 class="padding-t-15 text-color">{{ $t('services.online_report.card_title') }}</h4>
                <p class="padding-t-15 text-color">
                  {{ $t('services.online_report.card_subtitle') }}
                </p>
              </div>
            </div>
          </a>

<!--          <router-link to="/online-report" teg="div">-->
<!--            <div class="h-100"-->
<!--                 style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">-->
<!--              <div class="services-box text-center hover-effect">-->
<!--                <img src="@/assets/image/service-logo.svg" alt="">-->
<!--                <h4 class="padding-t-15 text-color">{{ $t('services.online_report.card_title') }}</h4>-->
<!--                <p class="padding-t-15 text-color">-->
<!--                  {{ $t('services.online_report.card_subtitle') }}-->
<!--                </p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </router-link>-->
        </div>
        <div class="col-lg-4 col-md-6 col-12 mb-4">
          <div class="h-100" style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px"
               @click="showModal = true">
            <div class="services-box text-center hover-effect">
              <img src="@/assets/image/service-logo.svg" alt="">
              <h4 class="padding-t-15 text-color">{{ $t('services.agreement.card_title') }}</h4>
              <p class="padding-t-15 text-color">
                {{ $t('services.agreement.card_subtitle') }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-12 mb-4">
          <router-link to="/fair-price" teg="div">
            <div class="h-100"
                 style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
              <div class="services-box text-center hover-effect">
                <img src="@/assets/image/service-logo.svg" alt="">
                <h4 class="padding-t-15 text-color">{{ $t('services.fair_price.card_title') }}</h4>
                <h5 class="text-color">{{ $t('services.fair_price.sub_title') }}</h5>

                <p class="padding-t-15 text-color">
                  {{ $t('services.fair_price.body_title') }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>


      <b-modal id="modal-1" hide-footer :title="$t('services.agreement.card_title')" v-model="showModal" size="lg">
        <b-row>
          <b-col>
            <a href="https://my.gov.uz/uz/service/355" target="_blank">
              <b-card class="text-center h-100" style="box-shadow: rgb(201, 219, 215) 2px 4px 8px 0px">
                <!--              <b-card class="default-bg">-->
                <img src="@/assets/image/service-logo.svg" alt="image" class="img-fluid bg-white"
                     style="border-radius: 50%; box-shadow: rgb(36, 98, 86) 1px 1px 7px 3px;">
                <!--              </b-card>-->
                <h4 class="padding-t-15 text-color">{{ $t('services.agreement.card_title') }}</h4>
                <p class="padding-t-15 text-color">
                  {{ $t('services.agreement.modal1_subtitle') }}
                </p>
              </b-card>
            </a>
          </b-col>

          <b-col>
            <a href="https://license.gov.uz/service/3991" target="_blank">
              <b-card class="text-center h-100" style="box-shadow: rgb(201, 219, 215) 2px 4px 8px 0px">
                <!--              <b-card class="default-bg">-->
                <img src="@/assets/image/service-logo.svg" alt="image" class="img-fluid bg-white"
                     style="border-radius: 50%; box-shadow: rgb(36, 98, 86) 1px 1px 7px 3px;">
                <!--              </b-card>-->
                <h4 class="padding-t-15 text-color">{{ $t('services.agreement.card_title') }}</h4>
                <p class="padding-t-15 text-color">
                  {{ $t('services.agreement.modal2_subtitle') }}
                </p>
              </b-card>
            </a>
          </b-col>
        </b-row>
      </b-modal>

      <hr class="green-gradient-bg mt-5" style="height: 2px"/>
      <b-row>
        <b-col>
          <h4 class="text-center text-color">{{ $t('boss.head_title1') }}</h4>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <hr class="green-gradient-bg" style="height: 2px">
        </b-col>

        <b-col cols="">
          <h4 class="text-center text-color">{{ $t('boss.head_title2') }}</h4>
        </b-col>

        <b-col>
          <hr class="green-gradient-bg" style="height: 2px">
        </b-col>
      </b-row>

    </div>
  </section>
  <!--START SERVICES-->
</template>

<style scoped>
#modal-1 .modal-title {
  width: 200px;
  color: #ffffff;
  background-color: #2b675b;
  border-radius: 5px;
  text-align: center;
}

@media only screen and (max-width: 767px) {
  .first-row-col {
    margin-top: -20px;
    margin-bottom: 10px;
  }

  h4 {
    font-size: 16px;
  }
}
</style>
