<template>
  <b-row>
    <b-col sm="12" class="text-center">
      <div class="h4 mb-4 d-inline-block">{{ title }}</div>
      <b-btn variant="warning" class="float-right" @click="goBack">{{ $t('actions.back') }}</b-btn>
    </b-col>
    <b-col sm="12">
      <b-card>
        <b-card-header>
        </b-card-header>
        <b-card-body>
          <b-table :items="items" hover striped thead-class="d-none" bordered small/>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
const MAIN_API_URL = 'open-data/domestic-market-price';
import {bus} from "@/main";
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
  name: "View",
  data() {
    return {
      title: this.$t('open_data.domestic_market_price.title'),
      editingItem: {},
      statuses: []
    }
  },
  computed: {
    items() {
      let result = [];
      for (const index in this.editingItem) {
        if (this.labels[index]) {
          result.push({
            label: this.labels[index],
            value: this.editingItem[index],
          });
        }
      }
      return result;
    },
    labels() {
      return {
        date: this.$t('open_data.domestic_market_price.date'),
        formedBread: this.$t('open_data.domestic_market_price.formedBread'),
        highGradeFlourImport: this.$t('open_data.domestic_market_price.highGradeFlourImport'),
        firstGradeFlourImport: this.$t('open_data.domestic_market_price.firstGradeFlourImport'),
        firstGradeFlourLocal: this.$t('open_data.domestic_market_price.firstGradeFlourLocal'),
        cottonOilLocal: this.$t('open_data.domestic_market_price.cottonOilLocal'),
        sunflowerOilImport: this.$t('open_data.domestic_market_price.sunflowerOilImport'),
        sugar: this.$t('open_data.domestic_market_price.sugar-stations'),
        milkLocal: this.$t('open_data.domestic_market_price.milkLocal'),
        egg: this.$t('open_data.domestic_market_price.egg'),
        riceAlanga: this.$t('open_data.domestic_market_price.riceAlanga'),
        pasta: this.$t('open_data.domestic_market_price.pasta'),
        pastaPackaged: this.$t('open_data.domestic_market_price.pastaPackaged'),
        beefBoneless: this.$t('open_data.domestic_market_price.beefBoneless'),
        beefWithBone: this.$t('open_data.domestic_market_price.beefWithBone'),
        mutton: this.$t('open_data.domestic_market_price.mutton'),
        chicken: this.$t('open_data.domestic_market_price.chicken'),
        potato: this.$t('open_data.domestic_market_price.potato'),
        onion: this.$t('open_data.domestic_market_price.onion'),
        carrot: this.$t('open_data.domestic_market_price.carrot'),
        butter: this.$t('open_data.domestic_market_price.butter'),
        buckwheat: this.$t('open_data.domestic_market_price.buckwheat'),
        babyFood: this.$t('open_data.domestic_market_price.babyFood'),
        mask: this.$t('open_data.domestic_market_price.mask'),
        sanitizerGel: this.$t('open_data.domestic_market_price.sanitizerGel'),
        dryNapkin: this.$t('open_data.domestic_market_price.dryNapkin'),
        wetNapkin: this.$t('open_data.domestic_market_price.wetNapkin'),
        babyDiaper: this.$t('open_data.domestic_market_price.babyDiaper'),
        toiletPaper: this.$t('open_data.domestic_market_price.toiletPaper'),
        chlorine: this.$t('open_data.domestic_market_price.chlorine'),
        toothpaste: this.$t('open_data.domestic_market_price.toothpaste'),
        perfumeSoap: this.$t('open_data.domestic_market_price.perfumeSoap'),
        liquidSoap: this.$t('open_data.domestic_market_price.liquidSoap'),
        ethylAlcohol: this.$t('open_data.domestic_market_price.ethylAlcohol'),
        washingPowder: this.$t('open_data.domestic_market_price.washingPowder'),
        laundrySoap: this.$t('open_data.domestic_market_price.laundrySoap'),
      }
    }
  },
  methods: {
    goBack() {
      bus.leaveWithConfirm = true
      if (this.goBackRoute && this.goBackRoute.name) {
        this.$router.push(this.goBackRoute)
      } else {
        this.$router.go(-1)
      }
    },
    async handleCreated() {
      this.var_default_search_payload.itemsPerPage = 500
      await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, true)
          .then(res => {
            this.editingItem = res.data
          })
          .catch(e => {
            console.log(e)
          })
    }
  },
  async created() {
    await this.handleCreated();
  }
}
</script>
<style>
.card-header {
  background: white;
}
</style>