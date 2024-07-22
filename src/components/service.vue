<script>
import da from "vue2-datepicker/locale/es/da";

export default {
  data() {
    return {
      showModal: false,
      showModal2: false
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
        <div class="col-lg-3 col-md-6 col-12">
          <a href="https://cabinet.fairtech.uz/murojaat-create" target="_blank" class="col margin-t-20">
            <div class="p-3 h-100"
                 style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
              <div class="hover-effect">
                <img src="@/assets/image/online_sud_qarori.svg" alt="" class="custom-icons">
                <h4 class="padding-t-15 text-color font-weight-bold">{{ $t('services.appeal_title') }}</h4>
                <p class="padding-t-15 text-color">
                  {{ $t('services.appeal_subtitle') }}
                </p>
              </div>
            </div>
          </a>
        </div>
        <div class="col-lg-3 col-md-6 col-12">
            <div class="p-3 h-100 margin-t-20"
                 @click="showModal2 = true"
                 style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
              <div class="hover-effect">
                <img src="@/assets/image/onlayn_kuzatuv.svg" alt="" class="custom-icons">
                <h4 class="padding-t-15 text-color font-weight-bold">{{ $t('services.online_checking.card_title') }}</h4>
                <p class="padding-t-15 text-color">
                  {{ $t('services.online_checking.card_subtitle1') }}
                  <a href="https://cabinet.fairtech.uz" target="_blank">cabinet.fairtech.uz</a>
                  {{ $t('services.online_checking.card_subtitle2') }}
                </p>
              </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 col-12">
          <router-link to="/product-services" teg="div" class="col margin-t-20">
            <div class="p-3 h-100"
                 style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
              <div class="hover-effect">
                <img src="@/assets/image/product_info.svg" alt="" class="custom-icons">
                <h4 class="padding-t-15 text-color font-weight-bold">{{ $t('services.product_info.card_title') }}</h4>
                <hr class="green-gradient-bg my-1" style="height: 2px">
                <h4 class="text-color font-weight-bold">{{ $t('services.product_info.card_subtitle1') }}</h4>
                <p class="padding-t-15 text-color">
                  {{ $t('services.product_info.card_subtitle2') }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-lg-3 col-md-6 col-12">
          <a href="https://cabinet.fairtech.uz/reporting/menu" target="_blank" class="col margin-t-20">
            <div class="p-3 h-100"
                 style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
              <div class="hover-effect">
                <img src="@/assets/image/statistik_malumot.svg" alt="" class="custom-icons">
                <h4 class="padding-t-15 text-color font-weight-bold">{{ $t('services.online_report.card_title') }}</h4>
                <p class="padding-t-15 text-color">
                  {{ $t('services.online_report.card_subtitle') }}
                </p>
              </div>
            </div>
          </a>
        </div>

      </div>
      <div class="row mt-5">
        <div class="col-lg-3 col-md-6 col-12 mb-4">
          <div class="p-3" style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px"
               @click="showModal = true">
            <div class="hover-effect h-100">
              <img src="@/assets/image/rozilik_berish.svg" alt="" class="custom-icons">
              <h4 class="padding-t-15 text-color font-weight-bold">{{ $t('services.agreement.card_title') }}</h4>
              <p class="padding-t-15 text-color">
                {{ $t('services.agreement.card_subtitle') }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 col-12 mb-4">
          <router-link to="/fair-price" teg="div">
            <div class="p-3 h-100"
                 style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
              <div class="hover-effect">
                <img src="@/assets/image/fair_prce.svg" alt="" class="custom-icons">
                <h4 class="padding-t-15 text-color font-weight-bold">{{ $t('services.fair_price.card_title') }}</h4>
                <hr class="green-gradient-bg my-1" style="height: 2px">
                <h5 class="text-color font-weight-bold">{{ $t('services.fair_price.sub_title') }}</h5>

                <p class="padding-t-15 text-color">
                  {{ $t('services.fair_price.body_title') }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-lg-3 col-md-6 col-12 mb-4">
          <a href="https://t.me/rquzBot" target="_blank" teg="div">
            <div class="p-3 h-100"
                 style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
              <div class="hover-effect">
                <img src="@/assets/image/rqbot.svg" alt="" class="custom-icons">
                <!--                <i class="fab fa-telegram-plane"></i>-->
                <h4 class="padding-t-15 text-color font-weight-bold">{{ $t('telegram_menu_title') }}</h4>
                <p class="padding-t-10 text-color">
                  {{ $t('telegram_menu_subtitle') }}
                </p>
              </div>
            </div>
          </a>
        </div>
        <div class="col-lg-3 col-md-6 col-12 mb-4">
          <router-link to="/court-table">
            <div class="p-3 h-100"
                 style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
              <div class="hover-effect">
                <img src="@/assets/image/statistik_malumot.svg" alt="" class="custom-icons">
                <h4 class="padding-t-15 text-color font-weight-bold">{{ $t('court_table_list.card_title') }}</h4>
                <p class="padding-t-15 text-color">
                  {{ $t('court_table_list.card_subtitle') }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="row margin-t-30 d-flex justify-content-center">
        <div class="col-lg-3 col-md-6 col-12">
          <router-link to="/sud-xabarnomasi" teg="div">
            <div class="p-3 h-100"
                 style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
              <div class="hover-effect">
                <img src="@/assets/image/Sud qarori.svg" alt="" class="custom-icons">
                <h4 class="padding-t-15 text-color font-weight-bold">{{ $t('sud_xabarnoma.card_title') }}</h4>
                <p class="padding-t-15 text-color">
                  {{ $t('sud_xabarnoma.card_subtitle') }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-lg-3 col-md-6 col-12">
          <router-link to="/court-online" teg="div">
            <div class="p-3 h-100"
                 style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
              <div class="hover-effect">
                <img src="@/assets/image/online_sud_qarori.svg" alt="" class="custom-icons">
                <h4 class="padding-t-15 text-color font-weight-bold">{{ $t('court_online.card_title') }}</h4>
                <p class="padding-t-15 text-color">
                  {{ $t('court_online.card_subtitle') }}
                </p>
              </div>
            </div>
          </router-link>
        </div>
<!--        <div class="col-lg-3 col-md-6 col-12">-->
<!--          <router-link to="/online-kuzatuv" teg="div">-->
<!--            <div class="p-3 h-100"-->
<!--                 style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">-->
<!--              <div class="hover-effect">-->
<!--                <img src="@/assets/image/online_sud_qarori.svg" alt="" class="custom-icons">-->
<!--                <h4 class="padding-t-15 text-color font-weight-bold">{{ $t('online kuzatuv') }}</h4>-->
<!--                <p class="padding-t-15 text-color">-->
<!--                  {{ $t('court_online.card_subtitle') }}-->
<!--                </p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </router-link>-->
<!--        </div>-->

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

      <b-modal id="modal-2" hide-footer :title="$t('online_kuzatuv.card_title')" v-model="showModal2" size="lg">
        <b-row>
          <b-col>
            <router-link to="/online-watching" teg="div">
              <div class="p-3 h-100"
                   style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
                <div class="hover-effect">
                  <img src="@/assets/image/onlayn_kuzatuv.svg" alt="" class="custom-icons">
<!--                  <h4 class="padding-t-15 text-color font-weight-bold">{{ $t('services.online_checking.card_title') }}</h4>-->
                  <p class="padding-t-15 text-color">
                    {{ $t('services.online_checking.card_subtitle1') }}
                    <a href="https://cabinet.fairtech.uz" target="_blank">cabinet.fairtech.uz</a>
                    {{ $t('services.online_checking.card_subtitle3') }}
                  </p>
                </div>
              </div>
            </router-link>
          </b-col>

          <b-col>
            <router-link to="/online-kuzatuv" teg="div">
              <div class="p-3 h-100"
                   style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
                <div class="hover-effect">
                  <img src="@/assets/image/online_sud_qarori.svg" alt="" class="custom-icons">
<!--                  <h4 class="padding-t-15 text-color font-weight-bold">{{ $t('online_kuzatuv.card_title') }}</h4>-->
                  <p class="padding-t-15 text-color">
                    {{ $t('online_kuzatuv.card_subtitle') }}
                  </p>
                </div>
              </div>
            </router-link>
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

<style>
#modal-1 .modal-title {
  width: 200px;
  color: #ffffff;
  background-color: #2b675b;
  border-radius: 5px;
  text-align: center;
}
.custom-icons{
  width: 50px;
  height: 50px;
}
#modal-2 .modal-title {
  width: 40%;
  background-color: #2b675b;
  color: #ffffff;
  border-radius: 5px;
  padding: 3px;
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
