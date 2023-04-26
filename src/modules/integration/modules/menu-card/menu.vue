<template>
  <!-- ADVERTISERS SERVICE CARD -->
  <section id="advertisers" class="advertisers-service-sec pt-5 pb-5">

    <div v-if="!toRouterLoader">
      <b-row class="pl-5 pr-5">
        <b-col>

          <div class="service-card"
               @click="toRouter('IntegrationKommunalInfoIndex')"
               v-if="$can('view', 'integration-kommunal')"
          >
            <div class="arrow-up-success">
              <span class="itinerary-number"> </span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/kommunal.svg')" height="50"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.kommunal_info.title') }}</h3>
          </div>
        </b-col>
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationDavlatActiveInfoIndex')"
               v-if="$can('view', 'integration-davlat-active')"
          >
            <div class="arrow-up-success">
              <span class="itinerary-number"> </span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/davlat_active.svg')"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.davlat_active_info.title') }}</h3>
          </div>
        </b-col>
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationOsimlikInfoIndex')"
               v-if="$can('view', 'integration-osimlik')"
          >
            <div class="arrow-up-success">
              <span class="itinerary-number"> </span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/osimlik.svg')" height="50"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.osimlik_info.title') }}</h3>
          </div>
        </b-col>

        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationTehnikInfoIndex')"
               v-if="$can('view', 'integration-tehnik')"
          >
            <div class="arrow-up">
              <span class="itinerary-number"></span>
            </div>
            <div class="icon-wrapper">
              <i class="mdi mdi-database" style="font-size: 2.5rem;"></i>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.tehnik_info.title') }}</h3>
          </div>
        </b-col>
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationInvestitsiyaTashqiSavdoInfoIndex')"
               v-if="$can('view', 'integration-investitsiya-tashqiSavdo')"
          >
            <div class="arrow-up">
              <span class="itinerary-number"></span>
            </div>
            <div class="icon-wrapper">
              <i class="mdi mdi-database" style="font-size: 2.5rem;"></i>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.investitsiya_tashqiSavdo_info.title') }}</h3>
          </div>
        </b-col>

      </b-row>

      <b-row class="pl-5 pr-5 pt-3">
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationElektrInfoIndex')"
               v-if="$can('view', 'integration-elektr-infos')"
          >
            <div class="arrow-up-success">
              <span class="itinerary-number"> </span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/elektr.png')" height="50"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.elektr_info.title') }}</h3>
          </div>
        </b-col>
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationSuvTaminotInfoIndex')"
               v-if="$can('view', 'integration-suv-taminot')"
          >
            <div class="arrow-up-success">
              <span class="itinerary-number"></span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/ozsuvtaminot.png')" height="50"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.suv_taminot_info.title') }}</h3>
          </div>
        </b-col>
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationQurilishInfoIndex')"
               v-if="$can('view', 'integration-qurilish')"
          >
            <div class="arrow-up">
              <span class="itinerary-number"></span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/qurilish.png')" height="70"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.qurilish_info.title') }}</h3>
          </div>
        </b-col>
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationKadastrSoliqInfo')"
               v-if="$can('view', 'integration-kadastr-soliq')"
          >
            <div class="arrow-up-success">
              <span class="itinerary-number"> </span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/kadastr.png')" height="75"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.kadastr_soliq_info.title') }}</h3>
          </div>
        </b-col>
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationFarmasevtikaInfoIndex')"
               v-if="$can('view', 'integration-farmasevtika')"
          >
            <div class="arrow-up-success">
              <span class="itinerary-number"> </span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/farmasevtika.png')" height="50"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.farmasevtika_info.title') }}</h3>
          </div>
        </b-col>
      </b-row>

      <b-row class="pl-5 pr-5 pt-3">
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationHududgazInfoIndex')"
               v-if="$can('view', 'integration-hudud-gaz')"
          >
            <div class="arrow-up-success">
              <span class="itinerary-number"> </span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/hududgaztaminot.png')" height="80"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.hududgaz_info.title') }}</h3>
          </div>
        </b-col>
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationAdliyaInfoIndex')"
               v-if="$can('view', 'integration-adliya')"
          >
            <div class="arrow-up">
              <span class="itinerary-number"></span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/adliya.png')" height="40"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.adliya_info.title') }}</h3>
          </div>
        </b-col>
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationEkologiyaInfoIndex')"
               v-if="$can('view', 'integration-ekologiya')"
          >
            <div class="arrow-up-success">
              <span class="itinerary-number"> </span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/ekologiya.png')" height="50"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.ekologiya_info.title') }}</h3>
          </div>
        </b-col>

        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationMoliyaInfoIndex')"
               v-if="$can('view', 'integration-moliya')"
          >
            <div class="arrow-up">
              <span class="itinerary-number"></span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/moliya.png')" height="40"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.moliya_info.title') }}</h3>
          </div>
        </b-col>
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationSugurtaMoliyaInfoIndex')"
               v-if="$can('view', 'integration-sugurta-moliya')"
          >
            <div class="arrow-up">
              <span class="itinerary-number"></span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/sugurta.png')" height="50"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.sugurta_moliya_info.title') }}</h3>
          </div>
        </b-col>
      </b-row>

      <b-row class="pl-5 pr-5  pt-3">
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationAxborotResursDUKInfoIndex')"
               v-if="$can('view', 'integration-axborot-resurs-duk')"
          >
            <div class="arrow-up">
              <span class="itinerary-number"></span>
            </div>
            <div class="icon-wrapper">
              <i class="mdi mdi-database" style="font-size: 2.5rem;"></i>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.axborot_resurs_duk_info.title') }}</h3>
          </div>
        </b-col>
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationSuvXojaligiInfoIndex')"
               v-if="$can('view', 'integration-suv-xojaligi')"
          >
            <div class="arrow-up-success">
              <span class="itinerary-number"> </span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/suv_xojaligi.png')" height="50"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.suv_xojaligi_info.title') }}</h3>
          </div>
        </b-col>
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationQishloqXojaligiInfoIndex')"
               v-if="$can('view', 'integration-qishloq-xojaligi')"
          >
            <div class="arrow-up">
              <span class="itinerary-number"></span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/qishloq_xojaligi.png')" height="50"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.qishloq_xojaligi_info.title') }}</h3>
          </div>
        </b-col>
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationTransportInfoIndex')"
               v-if="$can('view', 'integration-transport')"
          >
            <div class="arrow-up">
              <span class="itinerary-number"></span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/transport.png')" height="50"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.transport_info.title') }}</h3>
          </div>
        </b-col>
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationVeterinariyaChorvachilikInfoIndex')"
               v-if="$can('view', 'integration-veterinariya-chorvachilik')"
          >
            <div class="arrow-up">
              <span class="itinerary-number"></span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/veterenariya.png')" height="55"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.veterinariya_chorvachilik_info.title') }}</h3>
          </div>
        </b-col>
      </b-row>

      <b-row class="pl-5 pr-5 pt-3">
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationIqtisodiyTaraqqiyotInfo')"
               v-if="$can('view', 'integration-iqtisodiy-taraqqiyot-infos')"
          >
            <div class="arrow-up-success">
              <span class="itinerary-number"> </span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/iqtisodiy_taraqqiyot.png')" height="50"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.iqtisodiy_taraqqiyot_info.title') }}</h3>
          </div>
        </b-col>
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationTovarXomashyoInfoIndex')"
               v-if="$can('view', 'integration-tovar-xomashyo')"
          >
            <div class="arrow-up">
              <span class="itinerary-number"></span>
            </div>
            <div class="icon-wrapper">
              <i class="mdi mdi-database" style="font-size: 2.5rem;"></i>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.tovar_xomashyo_info.title') }}</h3>
          </div>
        </b-col>
        <b-col>
          <div class="service-card"
               v-if="$can('view', 'integration-soliq-qomita')"
               @click="toRouter('IntegrationSoliqQomitaInfoIndex')"
          >
            <div class="arrow-up-success">
              <span class="itinerary-number"> </span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/soliq.png')" height="50"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.soliqQomita_info.title') }}</h3>
          </div>
        </b-col>
        <b-col>
          <div class="service-card"
               v-if="$can('view', 'integration-iiv')"
               @click="toRouter('IntegrationIIVInfoIndex')"
          >
            <div class="arrow-up-success">
              <span class="itinerary-number"> </span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/iiv.png')" height="60"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.iiv_info.title') }}</h3>
          </div>
        </b-col>
        <b-col>
          <div class="service-card"
               v-if="$can('view', 'integration-ssv')"
               @click="toRouter('IntegrationSSVInfoIndex')"
          >
            <div class="arrow-up-success">
              <span class="itinerary-number"> </span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/ssv.png')" height="50"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.ssv_info.title') }}</h3>
          </div>
        </b-col>
      </b-row>

      <b-row class="pl-5 pr-5 pt-3">
        <b-col>
          <div class="service-card"
               @click="toRouter('IntegrationYoshlarInfoIndex')"
               v-if="$can('view', 'integration-yoshlar')"
          >
            <div class="arrow-up-success">
              <span class="itinerary-number"> </span>
            </div>
            <div class="icon-wrapper">
              <img :src="require('@/assets/integration/yoshlar.png')" height="50"/>
            </div>
            <h3 class="mt-3">{{ $t('submodules.integration.yoshlar_info.title') }}</h3>
          </div>
        </b-col>
        <b-col>
        </b-col>
        <b-col>
        </b-col>
        <b-col>
        </b-col>
        <b-col>
        </b-col>
      </b-row>
    </div>


    <div class="text-center" v-else-if="toRouterLoader">
      <b-spinner style="width: 3rem; height: 3rem; margin-top: 100px"></b-spinner>
    </div>
  </section>
  <!-- ADVERTISERS SERVICE CARD ENDED -->
</template>

<script>
import {ability} from "@/shared/store/ability";

export default {
  data() {
    return {
      toRouterLoader: false
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
}
</script>

<style scoped>
/* ADVERTISERS SERVICE CARD */
body {
  font-family: "Roboto", sans-serif !important;
}

.advertisers-service-sec {
  min-height: 800px !important;
  background-size: cover;
  background-attachment: fixed;
  margin: 0;
  padding: 0;
  width: 100% !important;
  border-radius: 10px;
  /*background: #317ABEFF;*/
  /*background-image: url("../../../../../assets/1.jpg");*/
}

.advertisers-service-sec span {
  color: rgb(255, 23, 131);
}

.advertisers-service-sec .col {
  padding: 0 1em 1em 1em;
  text-align: center;
}

.advertisers-service-sec .service-card {
  width: 100%;
  height: 100%;
  padding: 1em 0.5em;
  /*border-radius: 25px;*/
  /*box-shadow: 0 0 35px rgba(0, 0, 0, 0.12);*/
  cursor: pointer;
  transition: 0.5s;
  position: relative;
  z-index: 2;
  overflow: hidden;
  background: #6FA2D2 !important;
  /*background: #223F4A;*/
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid #f5f5f5;
  border-radius: 15px;
  -webkit-box-shadow: 0px 0px 10px 0px #f5f5f5;
  box-shadow: 0px 0px 10px 0px #f5f5f5;
  transform: scale(0.9, 0.9);

}

.advertisers-service-sec .service-card::after {
  content: "";
  width: 100%;
  height: 100%;
  background: linear-gradient(#023e77, rgb(255, 255, 255));
  position: absolute;
  right: 0%;
  bottom: -97%;
  z-index: -4;
  transition: all 0.7s cubic-bezier(0.77, -0.04, 0, 0.99);
}

.advertisers-service-sec h3 {
  font-size: 14px;
  font-weight: 900;
  color: #1f194c;
  margin-bottom: -5px;
  z-index: 3;
}

.advertisers-service-sec p {
  color: #575a7b;
  font-size: 15px;
  line-height: 1.6;
  letter-spacing: 0.03em;
  z-index: 3;
}

.advertisers-service-sec .icon-wrapper {
  background-color: #2c7bfe;
  position: relative;
  margin: auto;
  font-size: 30px;
  height: 2.5em;
  width: 2.5em;
  color: #ffffff;
  border-radius: 50%;
  display: grid;
  place-items: center;
  transition: 0.5s;
  z-index: 3;
}

.advertisers-service-sec .service-card:hover:after {
  background: linear-gradient(#ffffff, rgb(49, 122, 190));
  top: 0%;
}

.service-card .icon-wrapper {
  background-color: #ffffff;
  color: rgb(49, 122, 190);
}

.advertisers-service-sec .service-card:hover .icon-wrapper {
  color: #FF1783FF;
}

.advertisers-service-sec .service-card:hover h3 {
  color: #ffffff;
}

.advertisers-service-sec .service-card:hover p {
  color: #f0f0f0;
}

/* ADVERTISERS SERVICE CARD ENDED */

.arrow-up {
  border-left: 50px solid transparent;
  border-right: 0px solid transparent;
  border-top: 50px solid red;
  color: #fff;
  position: absolute;
  top: 0;
  right: 0;
}

.arrow-up-success {
  border-left: 50px solid transparent;
  border-right: 0px solid transparent;
  border-top: 50px solid #00963F;
  color: #fff;
  position: absolute;
  top: 0;
  right: 0;
}

.itinerary-number {
  position: absolute;
  bottom: 20px;
  right: -1px;
  font-size: 14px;
  font-weight: 700;
  color: #fff !important;
  /* Safari */
  -webkit-transform: rotate(45deg);

  /* Firefox */
  -moz-transform: rotate(-45deg);

  /* IE */
  -ms-transform: rotate(-135deg);

  /* Opera */
  -o-transform: rotate(-135deg);

  float: left;

}
</style>


