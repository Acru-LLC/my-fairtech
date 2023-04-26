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
const MAIN_API_URL = 'open-data/non-compliant-brand';
import {bus} from "@/main";
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
  name: "View",
  data() {
    return {
      title: this.$t('open_data.non_compliant_brand.title'),
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
        productNameLt: this.$t('open_data.non_compliant_brand.productName', 'uz') + ' (o\'z)',
        productNameUz: this.$t('open_data.non_compliant_brand.productName', 'uzCyrillic') + ' (ўз)',
        productNameRu: this.$t('open_data.non_compliant_brand.productName', 'ru') + ' (ру)',
        productNameEn: this.$t('open_data.non_compliant_brand.productName', 'en') + ' (en)',
        tradeNameLt: this.$t('open_data.non_compliant_brand.tradeName', 'uz') + ' (o\'z)',
        tradeNameUz: this.$t('open_data.non_compliant_brand.tradeName', 'uzCyrillic') + ' (ўз)',
        tradeNameRu: this.$t('open_data.non_compliant_brand.tradeName', 'ru') + ' (ру)',
        tradeNameEn: this.$t('open_data.non_compliant_brand.tradeName', 'en') + ' (en)',
        manufacturerLt: this.$t('open_data.non_compliant_brand.manufacturer', 'uz') + ' (o\'z)',
        manufacturerUz: this.$t('open_data.non_compliant_brand.manufacturer', 'uzCyrillic') + ' (ўз)',
        manufacturerRu: this.$t('open_data.non_compliant_brand.manufacturer', 'ru') + ' (ру)',
        manufacturerEn: this.$t('open_data.non_compliant_brand.manufacturer', 'en') + ' (en)',
        controlPurchaseDate: this.$t('open_data.non_compliant_brand.controlPurchaseDate'),
        startDate: this.$t('open_data.non_compliant_brand.startDate'),
        endDate: this.$t('open_data.non_compliant_brand.endDate'),
        testResultLt: this.$t('open_data.non_compliant_brand.testResult', 'uz') + ' (o\'z)',
        testResultUz: this.$t('open_data.non_compliant_brand.testResult', 'uzCyrillic') + ' (ўз)',
        testResultRu: this.$t('open_data.non_compliant_brand.testResult', 'ru') + ' (ру)',
        testResultEn: this.$t('open_data.non_compliant_brand.testResult', 'en') + ' (en)',
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