<script>
import da from "vue2-datepicker/locale/es/da";

export default {
  data() {
    return {
      showModal: false
    }
  },
  methods: {
  }
};

</script>

<template>
  <!--START SERVICES-->
  <section class=" section-lg pb-0" id="services">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <h1 class="section-title text-center text-color">ИНТЕРАКТИВ ХИЗМАТЛАР</h1>
          <div class="section-title-border margin-t-20" style="background-color: #246256"></div>
          <!--          <p-->
          <!--              class="section-subtitle text-muted text-center padding-t-30 font-secondary"-->
          <!--          >We craft digital, graphic and dimensional thinking, to create category leading brand experiences that have meaning and add a value for our clients.</p>-->
        </div>
      </div>
      <div class="row margin-t-30">
        <router-link to="/murojaat" teg="div" class="col margin-t-20">
          <div class="h-100" style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
            <div class="services-box text-center hover-effect">
              <img src="@/assets/image/service-logo.svg" alt="">
              <h4 class="padding-t-15 text-color">МУРОЖААТ</h4>
              <p class="padding-t-15 text-color">
                Рақобат қўмитасига электрон шаклда мурожаат қилиш
              </p>
            </div>
          </div>
        </router-link>
        <router-link to="/online-watching" teg="div" class="col mx-5 margin-t-20">
          <div class="h-100" style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
            <div class="services-box text-center hover-effect">
              <img src="@/assets/image/service-logo.svg" alt="">
              <h4 class="padding-t-15 text-color">ОНЛАЙН КУЗАТУВ</h4>
              <p class="padding-t-15 text-color">
                Рақобат қўмитасига <a href="https://cabinet.fairtech.uz" target="_blank">cabinet.fairtech.uz</a> орқали
                юборилган мурожаатлар ҳолатларини онлайн кузатиб бориш
              </p>
            </div>
          </div>
        </router-link>
        <router-link to="/product-services" teg="div" class="col margin-t-20">
          <div class="h-100" style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
            <div class="services-box text-center hover-effect">
              <img src="@/assets/image/service-logo.svg" alt="">
              <h4 class="padding-t-15 text-color ">PRODUCT INFO</h4>
              <hr class="green-gradient-bg w-75" style="height: 2px">
              <h4 class="text-color">Товар тўғрисида маълумот</h4>
              <p class="padding-t-15 text-color">
                Товар (иш, хизмат)лар тўғрисида маълумотларни онлайн тарзда олиш
              </p>
            </div>
          </div>
        </router-link>

      </div>
      <div class="row mt-5">
        <div class="col-2 mx-2 margin-t-20"></div>
              <router-link to="/online-report" teg="div" class="col margin-t-20">
                <div class="h-100" style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px">
                  <div class="services-box text-center hover-effect">
                    <img src="@/assets/image/service-logo.svg" alt="">
                    <h4 class="padding-t-15 text-color">ОНЛАЙН ҲИСОБОТ ЮБОРИШ</h4>
                    <p class="padding-t-15 text-color">
                      Ҳисобот ва статистик маълумотларни ахборот тизими орқали электрон юбориш
                    </p>
                  </div>
                </div>
              </router-link>
<!--              <a href="https://my.gov.uz/uz/service/355" target="_blank" class="col mx-5 margin-t-20">-->
                <div class="h-100 col mx-5 margin-t-20" style="border-radius: 5px; cursor: pointer; box-shadow: rgb(201 219 215) 2px 4px 8px 0px" @click="showModal = true">
                  <div class="services-box text-center hover-effect">
                    <img src="@/assets/image/service-logo.svg" alt="">
                    <h4 class="padding-t-15 text-color">РОЗИЛИК БЕРИШ</h4>
                    <p class="padding-t-15 text-color">
                      Хўжалик юритувчи субъектлар устав фондидаги (устав капиталидаги) акцияларни (улушларни) олиш ҳамда уларни қўшиб юбориш ва қўшиб олишга доир битимларга олдиндан розилик бериш тўғрисида мурожаат юбориш
                    </p>
                  </div>
                </div>
<!--              </a>-->
        <div class="col-2 mx-2 margin-t-20"></div>
            </div>

      <b-modal id="modal-1" hide-footer title="РОЗИЛИК БЕРИШ" v-model="showModal" size="lg">
        <b-row>
          <b-col>
            <a href="https://my.gov.uz/uz/service/355" target="_blank">
              <b-card class="text-center h-100" style="box-shadow: rgb(201, 219, 215) 2px 4px 8px 0px">
                <!--              <b-card class="default-bg">-->
                <img src="@/assets/image/service-logo.svg" alt="image" class="img-fluid bg-white"
                     style="border-radius: 50%; box-shadow: rgb(36, 98, 86) 1px 1px 7px 3px;">
                <!--              </b-card>-->
                <h4 class="padding-t-15 text-color">РОЗИЛИК БЕРИШ</h4>
                <p class="padding-t-15 text-color">
                  Хўжалик юритувчи субъектнинг устав фондидаги (устав капиталидаги)
                  акцияларни (улушларни) олиш бўйича битимларга олдиндан розилик олиш тўғрисида мурожаат юбориш
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
              <h4 class="padding-t-15 text-color">РОЗИЛИК БЕРИШ</h4>
              <p class="padding-t-15 text-color">
                Хўжалик юритувчи субъектларни қўшиб юбориш ва қўшиб олишга доир битимларга олдиндан розилик бериш тўғрисида мурожаат юбориш
              </p>
            </b-card>
            </a>
          </b-col>
        </b-row>
      </b-modal>

      <hr class="green-gradient-bg mt-5" style="height: 2px"/>
      <b-row>
        <b-col>
          <h4 class="text-center text-color">ЎЗБЕКИСТОН РЕСПУБЛИКАСИ РАҚОБАТНИ РИВОЖЛАНТИРИШ
            ВА ИСТЕЪМОЛЧИЛАР ХУҚУҚЛАРИНИ
            ҲИМОЯ ҚИЛИШ ҚЎМИТАСИ</h4>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <hr class="green-gradient-bg" style="height: 2px">
        </b-col>

        <b-col cols="">
          <h4 class="text-center text-color">Раҳбарлари</h4>
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
</style>
