<template>
  <b-row>
      <div class="col-md-12 text-sm-start">
          <b-button class="btn btn-warning" size="md" @click="$router.push({name: 'IntegrationMenuIndex'})">
              {{ $t("actions.back") }}
          </b-button>
      </div>
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
const MAIN_API_URL = 'customs-product';
import {bus} from "@/main";
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
  name: "View",
  data() {
    return {
      title: this.$t('submodules.integration.customs_product.title') + ' - ' + this.$t('submodules.integration.customs_product.import'),
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
        infoDateOfIssue: this.$t('submodules.integration.customs_product.infoDateOfIssue'),
        infoMode: this.$t('submodules.integration.customs_product.infoMode'),
        infoShipperAddress: this.$t('submodules.integration.customs_product.infoShipperAddress'),
        infoShipperName: this.$t('submodules.integration.customs_product.infoShipperName'),
        tifTnCode: this.$t('submodules.integration.customs_product.tifTnCode'),
        productName: this.$t('submodules.integration.customs_product.productName'),
        unitName: this.$t('submodules.integration.customs_product.unitName'),
        productWeight: this.$t('submodules.integration.customs_product.productWeight'),
        productWeightUnit: this.$t('submodules.integration.customs_product.productWeightUnit'),
        productAmount: this.$t('submodules.integration.customs_product.productAmount'),
        infoDollarExchangeRate: this.$t('submodules.integration.customs_product.infoDollarExchangeRate'),
        infoConsigneeName: this.$t('submodules.integration.customs_product.infoConsigneeName'),
        infoConsigneeAddress: this.$t('submodules.integration.customs_product.infoConsigneeAddress'),
        productStatisticalValue: this.$t('submodules.integration.customs_product.productStatisticalValue'),
        productStatisticalValueUnit: this.$t('submodules.integration.customs_product.productStatisticalValueUnit'),
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