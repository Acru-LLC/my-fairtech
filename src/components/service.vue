<script>
export default {
  methods: {
  }
};

</script>

<template>
  <!--START SERVICES-->
  <section class="section pb-0" id="services">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
          <h1 class="section-title text-center">ИНТЕРАКТИВ ХИЗМАТЛАР</h1>
          <div class="section-title-border margin-t-20"></div>
          <!--          <p-->
          <!--              class="section-subtitle text-muted text-center padding-t-30 font-secondary"-->
          <!--          >We craft digital, graphic and dimensional thinking, to create category leading brand experiences that have meaning and add a value for our clients.</p>-->
        </div>
      </div>
      <div class="row margin-t-30">
        <router-link to="/murojaat" teg="div" class="col mx-2 margin-t-20">
          <div class="h-100" style="border-radius: 5px; cursor: pointer; box-shadow: 2px 4px 8px 0 #246256;">
            <div class="services-box text-center hover-effect">
              <img src="@/assets/image/service-logo.svg" alt="">
              <h4 class="padding-t-15">МУРОЖААТ</h4>
              <p class="padding-t-15 text-muted">
                Рақобат қўмитасига электрон шаклда мурожаат қилиш
              </p>
            </div>
          </div>
        </router-link>
        <router-link to="/online-watching" teg="div" class="col mx-2 margin-t-20">
          <div class="h-100" style="border-radius: 5px; cursor: pointer; box-shadow: 2px 4px 8px 0px #246256;">
            <div class="services-box text-center hover-effect">
              <img src="@/assets/image/service-logo.svg" alt="">
              <h4 class="padding-t-15">ОНЛАЙН КУЗАТУВ</h4>
              <p class="padding-t-15 text-muted">
                Рақобат қўмитасига <a href="https://cabinet.fairtech.uz" target="_blank">cabinet.fairtech.uz</a> орқали
                юборилган мурожаатлар ҳолатларини онлайн кузатиб бориш
              </p>
            </div>
          </div>
        </router-link>
        <router-link to="/product-services" teg="div" class="col mx-2 margin-t-20">
          <div class="h-100" style="border-radius: 5px; cursor: pointer; box-shadow: 2px 4px 8px 0px #246256;">
            <div class="services-box text-center hover-effect">
              <img src="@/assets/image/service-logo.svg" alt="">
              <h4 class="padding-t-15">"PRODUCT INFO" АТ</h4>
              <p class="padding-t-15 text-muted">
                Товар тўғрисида маълумот
                Товар (иш, хизмат)лар тўғрисида маълумотларни онлайн тарзда олиш
              </p>
            </div>
          </div>
        </router-link>
        <router-link to="/online-report" teg="div" class="col mx-2 margin-t-20">
          <div class="h-100" style="border-radius: 5px; cursor: pointer; box-shadow: 2px 4px 8px 0px #246256;">
            <div class="services-box text-center hover-effect">
              <img src="@/assets/image/service-logo.svg" alt="">
              <h4 class="padding-t-15">ОНЛАЙН ҲИСОБОТ ЮБОРИШ</h4>
              <p class="padding-t-15 text-muted">
                Ҳисобот ва статистик маълумотларни ахборот тизими орқали электрон юбориш
              </p>
            </div>
          </div>
        </router-link>
      </div>
      <!--      <div class="row margin-t-30">-->
      <!--        <div class="col-lg-4 margin-t-20">-->
      <!--          <div class="services-box text-center hover-effect">-->
      <!--            <img src="@/assets/image/service-logo.svg" alt="">-->
      <!--            <h4 class="padding-t-15">ОНЛАЙН ҲИСОБОТ ЮБОРИШ</h4>-->
      <!--            <p class="padding-t-15 text-muted">-->
      <!--              Ҳисобот ва статистик маълумотларни ахборот тизими орқали электрон юбориш-->
      <!--            </p>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div class="col-lg-4 margin-t-20">-->
      <!--          <div class="services-box text-center hover-effect">-->
      <!--            <img src="@/assets/image/service-logo.svg" alt="">-->
      <!--            <h4 class="padding-t-15">ХИЗМАТ-5</h4>-->
      <!--            <p class="padding-t-15 text-muted">-->
      <!--              Бизнесни юритишда давлат томонидан амалга оширилаётган тизимли ислоҳотлар натижаларини тадбиркорлик субъектлари фаолиятига таъсирини аниқлаш шунингдек рақобат муҳитини ривожлантиришда мавжуд тўсиқларнинг иқтисодиётга таъсирини юмшатиш мақсадида Рақобатни ривожлантириш индекси (кейинги ўринларда Индекс) юритиб келинмоқда.-->
      <!--              Индекснинг асосий кўрсаткичлари тадбиркорлик субъектлари ҳамда мустақил экспертлар ўртасида сўровномалар ўтказиш орқали аниқланиб, натижаси юзасидан таклифлар Ўзбекистон Республикаси Олий Мажлиси ҳамда ҳукуматга киритилади.-->
      <!--            </p>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <div class="col-lg-4 margin-t-20">-->
      <!--          <div class="services-box text-center hover-effect">-->
      <!--            <img src="@/assets/image/service-logo.svg" alt="">-->
      <!--            <h4 class="padding-t-15">ХИЗМАТ-6</h4>-->
      <!--            <p class="padding-t-15 text-muted">-->
      <!--              Бизнесни юритишда давлат томонидан амалга оширилаётган тизимли ислоҳотлар натижаларини тадбиркорлик субъектлари фаолиятига таъсирини аниқлаш шунингдек рақобат муҳитини ривожлантиришда мавжуд тўсиқларнинг иқтисодиётга таъсирини юмшатиш мақсадида Рақобатни ривожлантириш индекси (кейинги ўринларда Индекс) юритиб келинмоқда.-->
      <!--              Индекснинг асосий кўрсаткичлари тадбиркорлик субъектлари ҳамда мустақил экспертлар ўртасида сўровномалар ўтказиш орқали аниқланиб, натижаси юзасидан таклифлар Ўзбекистон Республикаси Олий Мажлиси ҳамда ҳукуматга киритилади.-->
      <!--            </p>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->

      <hr class="green-gradient-bg mt-5" style="height: 2px"/>
      <b-row>
        <b-col>
          <h4 class="text-center text-color">РАҚОБАТ РИВОЖЛАНТИРИШ ВА ИСТЕЪМОЛЧИЛАРНИ ХУҚУҚЛАРИНИ ҲИМОЯ ҚИЛИШ
            КЎМИТАСИНИНГ</h4>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <hr class="green-gradient-bg" style="height: 2px">
        </b-col>

        <b-col cols="">
          <h4 class="text-center text-color">АСОСИЙ ВАЗИФАЛАРИ</h4>
        </b-col>

        <b-col>
          <hr class="green-gradient-bg" style="height: 2px">
        </b-col>
      </b-row>

    </div>
  </section>
  <!--START SERVICES-->
</template>
