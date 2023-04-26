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
const MAIN_API_URL = 'open-data/public-procurement-information';
import {bus} from "@/main";
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
  name: "View",
  data() {
    return {
      title: this.$t('open_data.public_procurement_information.title'),
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
        economicClassification: this.$t('open_data.public_procurement_information.economicClassification'),
        purchaseTypeLt: this.$t('open_data.public_procurement_information.purchaseType', 'uz') + ' (o\'z)',
        purchaseTypeUz: this.$t('open_data.public_procurement_information.purchaseType', 'uzCyrillic') + ' (ўз)',
        purchaseTypeRu: this.$t('open_data.public_procurement_information.purchaseType', 'ru') + ' (ру)',
        purchaseTypeEn: this.$t('open_data.public_procurement_information.purchaseType', 'en') + ' (en)',
        goodServiceNameLt: this.$t('open_data.public_procurement_information.goodServiceName', 'uz') + ' (o\'z)',
        goodServiceNameUz: this.$t('open_data.public_procurement_information.goodServiceName', 'uzCyrillic') + ' (ўз)',
        goodServiceNameRu: this.$t('open_data.public_procurement_information.goodServiceName', 'ru') + ' (ру)',
        goodServiceNameEn: this.$t('open_data.public_procurement_information.goodServiceName', 'en') + ' (en)',
        fundingSourceLt: this.$t('open_data.public_procurement_information.fundingSource', 'uz') + ' (o\'z)',
        fundingSourceUz: this.$t('open_data.public_procurement_information.fundingSource', 'uzCyrillic') + ' (ўз)',
        fundingSourceRu: this.$t('open_data.public_procurement_information.fundingSource', 'ru') + ' (ру)',
        fundingSourceEn: this.$t('open_data.public_procurement_information.fundingSource', 'en') + ' (en)',
        purchaseProcessTypeLt: this.$t('open_data.public_procurement_information.purchaseProcessType', 'uz') + ' (o\'z)',
        purchaseProcessTypeUz: this.$t('open_data.public_procurement_information.purchaseProcessType', 'uzCyrillic') + ' (ўз)',
        purchaseProcessTypeRu: this.$t('open_data.public_procurement_information.purchaseProcessType', 'ru') + ' (ру)',
        purchaseProcessTypeEn: this.$t('open_data.public_procurement_information.purchaseProcessType', 'en') + ' (en)',
        lot: this.$t('open_data.public_procurement_information.lot'),
        purchasePurposeLt: this.$t('open_data.public_procurement_information.purchasePurpose', 'uz') + ' (o\'z)',
        purchasePurposeUz: this.$t('open_data.public_procurement_information.purchasePurpose', 'uzCyrillic') + ' (ўз)',
        purchasePurposeRu: this.$t('open_data.public_procurement_information.purchasePurpose', 'ru') + ' (ру)',
        purchasePurposeEn: this.$t('open_data.public_procurement_information.purchasePurpose', 'en') + ' (en)',
        goodUnitLt: this.$t('open_data.public_procurement_information.goodUnit', 'uz') + ' (o\'z)',
        goodUnitUz: this.$t('open_data.public_procurement_information.goodUnit', 'uzCyrillic') + ' (ўз)',
        goodUnitRu: this.$t('open_data.public_procurement_information.goodUnit', 'ru') + ' (ру)',
        goodUnitEn: this.$t('open_data.public_procurement_information.goodUnit', 'en') + ' (en)',
        amount: this.$t('open_data.public_procurement_information.amount'),
        price: this.$t('open_data.public_procurement_information.price'),
        totalAmount: this.$t('open_data.public_procurement_information.totalAmount'),
        purchasedGoodLt: this.$t('open_data.public_procurement_information.purchasedGood', 'uz') + ' (o\'z)',
        purchasedGoodUz: this.$t('open_data.public_procurement_information.purchasedGood', 'uzCyrillic') + ' (ўз)',
        purchasedGoodRu: this.$t('open_data.public_procurement_information.purchasedGood', 'ru') + ' (ру)',
        purchasedGoodEn: this.$t('open_data.public_procurement_information.purchasedGood', 'en') + ' (en)',
        supplierLt: this.$t('open_data.public_procurement_information.supplier', 'uz') + ' (o\'z)',
        supplierUz: this.$t('open_data.public_procurement_information.supplier', 'uzCyrillic') + ' (ўз)',
        supplierRu: this.$t('open_data.public_procurement_information.supplier', 'ru') + ' (ру)',
        supplierEn: this.$t('open_data.public_procurement_information.supplier', 'en') + ' (en)',
        plannedFunding: this.$t('open_data.public_procurement_information.plannedFunding'),
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