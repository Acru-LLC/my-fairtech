<script>
export default {
  data() {
    return {
      showModal: false,
      showModal1: false,
      showModal2: false
    }
  },
  methods: {
    openModal() {
      // Assuming you have a variable named 'showModal' in your component's data
      this.showModal = true; // Set showModal to true to show the modal
    },
    openModal1() {
      // Assuming you have a variable named 'showModal' in your component's data
      this.showModal1 = true; // Set showModal to true to show the modal
    },
    openModal2() {
      // Assuming you have a variable named 'showModal' in your component's data
      this.showModal2 = true; // Set showModal to true to show the modal
    }
  }
};
</script>

<template>
  <!--START PRICING-->
  <section class="section pt-5" id="pricing">
    <div class="container">
      <div class="row d-flex justify-content-center mb-4 p-2">
        <div style="border-radius: 5px; box-shadow: rgb(201, 219, 215) 2px 4px 8px 0px;" class="col-12 col-lg-6 mb-4 p-3 text-color">
          <b-row class="h-100">
            <b-col cols="3" class="d-flex align-items-center">
              <div class="d-flex justify-content-center">
                <img width="112" height="112" style="border-radius: 50%; border: 3px solid #246256" src="@/assets/image/rais_new.png" alt="">
              </div>
              <!--              <div class="d-flex justify-content-center">-->
              <!--              <b-button class="mt-3 btn btn-bg-white"-->
              <!--                        style="box-shadow: 0 1px 6px 0 #246256!important; color: #246256!important;">-->
              <!--                Қабулга ёзилиш-->
              <!--              </b-button>-->
              <!--              </div>-->
            </b-col>

            <b-col cols="9">
              <b-row>
                <h4 class="font-weight-bold text-color">{{ $t('boss.vakant_card_name') }}</h4>
                <!--                  <img style="top: 0; right: 0;" class="position-absolute cursor-pointer" @click="openModal" src="@/assets/image/danger.png" alt="">-->

                <b-modal v-model="showModal" hide-footer :title="$t('boss.vakant_card_name')">
                  <p>{{ $t('boss.vakant_card_name') }}</p>
                </b-modal>
              </b-row>
              <b-row>
                <span class="font-weight-bold">{{ $t('boss.rais_position') }}</span>
              </b-row>
              <b-row class="d-flex align-items-center">
                <i class="fa fa-clock font-size-17"></i>
                <span class="ml-2">{{ $t('boss.acceptance_title') }}</span>
              </b-row>
              <b-row class="my-2">
                <span>{{ $t('boss.acceptance_time') }}</span>
              </b-row>
              <b-row>
                <img style="width: 17px; margin-right: 10px" src="@/assets/image/phone.svg" alt="">
                <h4 class="text-color">(71) 207-47-00</h4>
              </b-row>
              <b-row class="d-flex align-items-center">
                <i class="fa fa-envelope font-size-17"></i>
                <h4 class="mb-0 ml-2 text-color">info@antimon.gov.uz</h4>
              </b-row>
              <!--            <b-row>-->
              <!--              <b-button class="mt-3 btn btn-bg-white"-->
              <!--                        style="box-shadow: 0 1px 6px 0 #246256!important; color: #246256!important;">-->
              <!--                Меҳнат фаолияти-->
              <!--              </b-button>-->
              <!--              <b-button class="mt-3 btn btn-bg-white ml-4"-->
              <!--                        style="box-shadow: 0 1px 6px 0 #246256!important; color: #246256!important;">-->
              <!--                Иш мажбурияти-->
              <!--              </b-button>-->
              <!--            </b-row>-->
            </b-col>
          </b-row>

          <!--          <b-row>-->
          <!--            <b-col>-->
          <!--              <b-button class="mt-3 btn btn-bg-white"-->
          <!--                        style="box-shadow: 0 1px 6px 0 #246256!important; color: #246256!important;">-->
          <!--                Қабулга ёзилиш-->
          <!--              </b-button>-->
          <!--            </b-col>-->
          <!--            <b-col>-->
          <!--              <b-button class="mt-3 btn btn-bg-white"-->
          <!--                        style="box-shadow: 0 1px 6px 0 #246256!important; color: #246256!important;">-->
          <!--                Меҳнат фаолияти-->
          <!--              </b-button>-->
          <!--            </b-col>-->
          <!--            <b-col>-->
          <!--              <b-button class="mt-3 btn btn-bg-white"-->
          <!--                        style="box-shadow: 0 1px 6px 0 #246256!important; color: #246256!important;">-->
          <!--                Иш мажбурияти-->
          <!--              </b-button>-->
          <!--            </b-col>-->
          <!--          </b-row>-->
        </div>

        <div class="col-12 col-lg-12">
          <div class="row d-flex justify-content-center">
            <div style="border-radius: 5px; box-shadow: rgb(201, 219, 215) 2px 4px 8px 0px;"  class="col-12 col-lg-5 mb-4 p-3 mx-3 text-color">
              <b-row class="h-100">
                <b-col cols="4" class="d-flex align-items-center">
                  <div class="d-flex justify-content-center">
                    <img width="112" height="112" style="border-radius: 50%; border: 3px solid #246256" src="@/assets/image/qayumov.png" alt="">
                  </div>
                  <!--              <div class="d-flex justify-content-center">-->
                  <!--              <b-button class="mt-3 btn btn-bg-white"-->
                  <!--                        style="box-shadow: 0 1px 6px 0 #246256!important; color: #246256!important;">-->
                  <!--                Қабулга ёзилиш-->
                  <!--              </b-button>-->
                  <!--              </div>-->
                </b-col>

                <b-col cols="8">
                  <b-row>
                    <h4 class="font-weight-bold text-color">{{ $t('boss.orinbosar1_name') }}</h4>
                    <!--                <img style="top: 0; right: 0;" class="position-absolute cursor-pointer" @click="openModal1" src="@/assets/image/danger.png" alt="">-->
                    <b-modal v-model="showModal1" hide-footer size="lg" :title="$t('boss.orinbosar1_name')">
                      <p>
                        Қаюмов Асадулла Уролович 1984 йил Сурхондарё вилоятида туғилган.

                        2007 йил Жаҳон иқтисодиёти ва дипломатия университетини, 2013 йил Япониянинг Веседа университетининг магистратура йўналишини тамомлаган.

                        У биринчи фаолиятини 2007 йилда Ўзбекистон Республикасининг Монополиядан чиқариш, рақобат ва тадбиркорликни қўллаб-қувватлаш давлат қўмитасида етакчи мутахассис лавозимидан бошлаган ва бош мутахассис, бўлим бошлиғи ўринбосари лавозимигача кўтарилиб 2010 йилга қадар фаолият юритган.

                        2010-2011 йилларда Ўзбекистон Республикасининг Монополиядан чиқариш ва рақобатни ривожлантириш давлат қўмитасида бўлим бошлиғи ўринбосари лавозимида ишлаган.

                        2011-2013 йй. – Веседа университети (Япония), Бизнес бошқаруви магистранти бўлган.

                        2013 йилдан 2017 йилгача Ўзбекистон Республикасининг Хусусийлаштириш, монополиядан чиқариш ва рақобатни ривожлантириш давлат қўмитасида бўлим бошлиғи, бошқарма бошлиғи лавозимларида ишлаган.

                        2017-2019 йилларда- “Ўзбекипаксаноат” уюшмаси Иқтисодий таҳлил ва ишлаб чиқаришни прогнозлаштириш бошқармаси бошлиғи, бош бошқарма бошлиғи,

                        2019-2019 йилларда – Ўзбекистон Республикаси Президенти Администрацияси Ислоҳотларни ҳуқуқий таъминлаш ва ҳуқуқни муҳофаза қилиш фаолиятини мувофиқлаштириш масалалари бўйича маслаҳатчиси бўлинмалари халқаро рейтинглар билан ишлаш ва “Электрон ҳукумат” тизимини жорий этиш ишларини мувофиқлаштириш шўъбаси бош инспектори,

                        2019-2022 йилларда Ўзбекистон Республикаси Президенти Администрацияси Ҳуқуқий экспертиза ва комплекс таҳлил қилиш департаментининг иқтисодий ривожланиш соҳасида тизимли таҳлил қилиш ва янги ташаббусларни ишлаб чиқиш шўъбаси бош инспектори лавозимларида ишлаган.

                        2022-2023 йилларда Ўзбекистон Республикаси Монополияга қарши курашиш қўмита раисининг биринчи ўринбосари лавозимида фаолият юритган.

                        Ўзбекистон Республикаси Президентининг 2023 йил 31 январдаги ПҚ-38-сонли Қарорига асосан Қаюмов Асадулла Уролович Рақобатни ривожлантириш ва истеъмолчилар ҳуқуқларини ҳимоя қилиш қўмитаси раиси ўринбосари лавозимига тайинланди.
                      </p>
                    </b-modal>
                  </b-row>
                  <b-row>
                    <span class="font-weight-bold">{{ $t('boss.orinbosar_position') }}</span>
                  </b-row>
                  <b-row class="d-flex align-items-center">
                    <i class="fa fa-clock font-size-17"></i>
                    <span class="ml-2">{{ $t('boss.acceptance_title') }}</span>
                  </b-row>
                  <b-row class="my-2">
                    <span>{{ $t('boss.acceptance_time') }}</span>
                  </b-row>
                  <b-row>
                    <img style="width: 17px; margin-right: 10px" src="@/assets/image/phone.svg" alt="">
                    <h4 class="text-color">(71) 207-47-00</h4>
                  </b-row>
                  <b-row class="d-flex align-items-center">
                    <i class="fa fa-envelope font-size-17"></i>
                    <h4 class="mb-0 ml-2 text-color">info@antimon.gov.uz</h4>
                  </b-row>
                  <!--            <b-row>-->
                  <!--              <b-button class="mt-3 btn btn-bg-white"-->
                  <!--                        style="box-shadow: 0 1px 6px 0 #246256!important; color: #246256!important;">-->
                  <!--                Меҳнат фаолияти-->
                  <!--              </b-button>-->
                  <!--              <b-button class="mt-3 btn btn-bg-white ml-4"-->
                  <!--                        style="box-shadow: 0 1px 6px 0 #246256!important; color: #246256!important;">-->
                  <!--                Иш мажбурияти-->
                  <!--              </b-button>-->
                  <!--            </b-row>-->
                </b-col>
              </b-row>
            </div>
            <div style="border-radius: 5px; box-shadow: rgb(201, 219, 215) 2px 4px 8px 0px;" class="col-12 col-lg-5 mb-4 p-3 text-color">
              <b-row class="h-100">
                <b-col cols="4" class="d-flex align-items-center">
                  <div class="d-flex justify-content-center">
                    <img src="@/assets/image/boss-avatar.svg" style="border-radius: 50%; border: 3px solid #246256" alt="">
                  </div>
                  <div class="d-flex justify-content-center">
                    <!--              <b-button class="mt-3 btn btn-bg-white"-->
                    <!--                        style="box-shadow: 0 1px 6px 0 #246256!important; color: #246256!important;">-->
                    <!--                Қабулга ёзилиш-->
                    <!--              </b-button>-->
                  </div>
                </b-col>

                <b-col cols="8">
                  <b-row>
                    <h4 class="font-weight-bold text-color">{{ $t('boss.orinbosar2_name') }}</h4>
                    <!--                <img style="top: 0; right: 0;" class="position-absolute cursor-pointer" @click="openModal2" src="@/assets/image/danger.png" alt="">-->
                    <b-modal v-model="showModal2" hide-footer size="lg" :title="$t('boss.orinbosar2_name')">
                      <p>
                        Карабаев Фаррух Эсаналиевич 1981 йилда Тошкент вилоятининг Ангрен шаҳрида туғилган.

                        У Жаҳон иқтисодиёти ва дипломатия университетининг халқаро иқтисодий муносабатлар мутахассислиги бўйича бакалавр ва жаҳон иқтисодиёти ва геосиёсати мутахассислиги бўйича магистр даражасига эга.

                        Фаррух Карабаев институционал инновацияларни амалга ошириш, иқтисодий тараққиёт, самарали давлат бошқаруви, рақобат, норма ижодкорлиги, бизнес ва инвестиция муҳитини яхшилаш каби давлат сиёсатининг муҳим йўналишлари бўйича таркибий ўзгартириш ва ислоҳотларни амалга ошириш бўйича давлат идоралари ва халқаро ташкилотларида 15 йиллик тажрибага эга.

                        У 2008 йилдан буён монополияга қарши давлат органи, Ўзбекистон Республикаси Президенти ҳузуридаги Лойиҳа бошқаруви миллий агентлиги ва БМТнинг Тараққиёт Дастурининг лойиҳаларида турли раҳбарлик лавозимларида ишлаган.

                        2019-2023 йилларда Ўзбекистон Республикаси Монополияга қарши қўмитаси раисининг ўринбосари сифатида фаолият юритган.

                        Ўзбекистон Республикаси Президентининг 2023 йил 31 январдаги ПҚ-38-сонли Қарорига асосан Ўзбекистон Республикаси Рақобатни ривожлантириш ва истеъмолчилар ҳуқуқларини ҳимоя қилиш қўмитаси раиси ўринбосари этиб тайинланган.
                      </p>
                    </b-modal>
                  </b-row>
                  <b-row>
                    <span class="font-weight-bold">{{ $t('boss.orinbosar_position') }}</span>
                  </b-row>
                  <b-row class="d-flex align-items-center">
                    <i class="fa fa-clock font-size-17"></i>
                    <span class="ml-2">{{ $t('boss.acceptance_title') }}</span>
                  </b-row>
                  <b-row class="my-2">
                    <span>{{ $t('boss.acceptance_time') }}</span>
                  </b-row>
                  <b-row>
                    <img style="width: 17px; margin-right: 10px" src="@/assets/image/phone.svg" alt="">
                    <h4 class="text-color">(71) 207-47-00</h4>
                  </b-row>
                  <b-row class="d-flex align-items-center">
                    <i class="fa fa-envelope font-size-17"></i>
                    <h4 class="mb-0 ml-2 text-color">info@antimon.gov.uz</h4>
                  </b-row>
                  <!--            <b-row>-->
                  <!--              <b-button class="mt-3 btn btn-bg-white"-->
                  <!--                        style="box-shadow: 0 1px 6px 0 #246256!important; color: #246256!important;">-->
                  <!--                Меҳнат фаолияти-->
                  <!--              </b-button>-->
                  <!--              <b-button class="mt-3 btn btn-bg-white ml-4"-->
                  <!--                        style="box-shadow: 0 1px 6px 0 #246256!important; color: #246256!important;">-->
                  <!--                Иш мажбурияти-->
                  <!--              </b-button>-->
                  <!--            </b-row>-->
                </b-col>
              </b-row>
            </div>
        </div>

<!--      <b-row class="my-5">-->
<!--        <b-col style="border: 2px solid #246256; border-radius: 5px" class="p-3 d-flex justify-content-between text-color">-->
<!--          <b-col cols="4">-->
<!--            <div class="d-flex justify-content-center">-->
<!--              <img src="@/assets/image/boss-avatar.svg" alt="">-->
<!--            </div>-->
<!--            <div class="d-flex justify-content-center">-->
<!--              <b-button class="mt-3 btn btn-bg-white"-->
<!--                        style="box-shadow: 0 1px 6px 0 #246256!important; color: #246256!important;">-->
<!--                Қабулга ёзилиш-->
<!--              </b-button>-->
<!--            </div>-->
<!--          </b-col>-->

<!--          <b-col cols="7">-->
<!--            <b-row>-->
<!--              <h4 class="font-weight-bold">Карабаев Фаррух Эсаналиевич</h4>-->
<!--            </b-row>-->
<!--            <b-row>-->
<!--              <img width="18" height="18" src="@/assets/image/clock-two-thirty-svgrepo-com.svg" alt="">-->
<!--              <span class="ml-2">Фуқароларни қабул қилиш кунлари</span>-->
<!--            </b-row>-->
<!--            <b-row class="my-2">-->
<!--              <span>Ҳар куни 9:00 дан 11:00 гача</span>-->
<!--            </b-row>-->
<!--            <b-row>-->
<!--              <img style="width: 17px; margin-right: 10px" src="@/assets/image/phone.svg" alt="">-->
<!--              <h4>(71) 123-45-67</h4>-->
<!--            </b-row>-->
<!--            <b-row>-->
<!--              <b-button class="mt-3 btn btn-bg-white"-->
<!--                        style="box-shadow: 0 1px 6px 0 #246256!important; color: #246256!important;">-->
<!--                Меҳнат фаолияти-->
<!--              </b-button>-->
<!--              <b-button class="mt-3 btn btn-bg-white ml-4"-->
<!--                        style="box-shadow: 0 1px 6px 0 #246256!important; color: #246256!important;">-->
<!--                Иш мажбурияти-->
<!--              </b-button>-->
<!--            </b-row>-->
<!--          </b-col>-->
<!--        </b-col>-->
<!--        <b-col style="border: 2px solid #246256; border-radius: 5px" class="p-3 d-flex justify-content-between text-color ml-4">-->
<!--          <b-col cols="4">-->
<!--            <div class="d-flex justify-content-center">-->
<!--              <img src="@/assets/image/boss-avatar.svg" alt="">-->
<!--            </div>-->
<!--            <div class="d-flex justify-content-center">-->
<!--              <b-button class="mt-3 btn btn-bg-white"-->
<!--                        style="box-shadow: 0 1px 6px 0 #246256!important; color: #246256!important;">-->
<!--                Қабулга ёзилиш-->
<!--              </b-button>-->
<!--            </div>-->
<!--          </b-col>-->

<!--          <b-col cols="7">-->
<!--            <b-row>-->
<!--              <h4 class="font-weight-bold">Карабаев Фаррух Эсаналиевич</h4>-->
<!--            </b-row>-->
<!--            <b-row>-->
<!--              <img width="18" height="18" src="@/assets/image/clock-two-thirty-svgrepo-com.svg" alt="">-->
<!--              <span class="ml-2">Фуқароларни қабул қилиш кунлари</span>-->
<!--            </b-row>-->
<!--            <b-row class="my-2">-->
<!--              <span>Ҳар куни 9:00 дан 11:00 гача</span>-->
<!--            </b-row>-->
<!--            <b-row>-->
<!--              <img style="width: 17px; margin-right: 10px" src="@/assets/image/phone.svg" alt="">-->
<!--              <h4>(71) 123-45-67</h4>-->
<!--            </b-row>-->
<!--            <b-row>-->
<!--              <b-button class="mt-3 btn btn-bg-white"-->
<!--                        style="box-shadow: 0 1px 6px 0 #246256!important; color: #246256!important;">-->
<!--                Меҳнат фаолияти-->
<!--              </b-button>-->
<!--              <b-button class="mt-3 btn btn-bg-white ml-4"-->
<!--                        style="box-shadow: 0 1px 6px 0 #246256!important; color: #246256!important;">-->
<!--                Иш мажбурияти-->
<!--              </b-button>-->
<!--            </b-row>-->
<!--          </b-col>-->
<!--        </b-col>-->
<!--      </b-row>-->
        </div>
        </div>
    </div>
  </section>
  <!--ENd PRICING-->
</template>
