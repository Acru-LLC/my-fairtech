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
const MAIN_API_URL = 'open-data/regions-product-price';
import {bus} from "@/main";
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
  name: "View",
  data() {
    return {
      title: this.$t('open_data.regions_product_price.title'),
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
        productNameLt: this.$t('open_data.regions_product_price.product_name', 'uz') + ' (o\'z)',
        productNameUz: this.$t('open_data.regions_product_price.product_name', 'uzCyrillic') + ' (ўз)',
        productNameRu: this.$t('open_data.regions_product_price.product_name', 'ru') + ' (ру)',
        productNameEn: this.$t('open_data.regions_product_price.product_name', 'en') + ' (en)',
        unitLt: this.$t('open_data.regions_product_price.unit', 'uz') + ' (o\'z)',
        unitUz: this.$t('open_data.regions_product_price.unit', 'uzCyrillic') + ' (ўз)',
        unitRu: this.$t('open_data.regions_product_price.unit', 'ru') + ' (ру)',
        unitEn: this.$t('open_data.regions_product_price.unit', 'en') + ' (en)',
        average: this.$t('open_data.regions_product_price.average'),
        tashkentCity: this.$t('open_data.regions_product_price.tashkent_city'),
        karakalpakstan: this.$t('open_data.regions_product_price.karakalpakstan'),
        andijan: this.$t('open_data.regions_product_price.andijan'),
        bukhara: this.$t('open_data.regions_product_price.bukhara'),
        jizzakh: this.$t('open_data.regions_product_price.jizzakh'),
        kashkadarya: this.$t('open_data.regions_product_price.kashkadarya'),
        navoi: this.$t('open_data.regions_product_price.navoi'),
        namangan: this.$t('open_data.regions_product_price.namangan'),
        samarkand: this.$t('open_data.regions_product_price.samarkand'),
        surkhandarya: this.$t('open_data.regions_product_price.surkhandarya'),
        syrdarya: this.$t('open_data.regions_product_price.syrdarya'),
        tashkent: this.$t('open_data.regions_product_price.tashkent'),
        fergana: this.$t('open_data.regions_product_price.fergana'),
        khorazm: this.$t('open_data.regions_product_price.khorazm'),
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