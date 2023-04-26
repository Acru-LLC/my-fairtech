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
const MAIN_API_URL = 'open-data/service-cost';
import {bus} from "@/main";
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
  name: "View",
  data() {
    return {
      title: this.$t('open_data.service_cost.title'),
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
        nameLt: this.$t('open_data.service_cost.name', 'uz') + ' (o\'z)',
        nameUz: this.$t('open_data.service_cost.name', 'uzCyrillic') + ' (ўз)',
        nameRu: this.$t('open_data.service_cost.name', 'ru') + ' (ру)',
        nameEn: this.$t('open_data.service_cost.name', 'en') + ' (en)',
        positionNameLt: this.$t('open_data.service_cost.position_name', 'uz') + ' (o\'z)',
        positionNameUz: this.$t('open_data.service_cost.position_name', 'uzCyrillic') + ' (ўз)',
        positionNameRu: this.$t('open_data.service_cost.position_name', 'ru') + ' (ру)',
        positionNameEn: this.$t('open_data.service_cost.position_name', 'en') + ' (en)',
        certificateNumber: this.$t('open_data.service_cost.certificate_number'),
        order: this.$t('open_data.service_cost.order'),
        tripPurposeNameLt: this.$t('open_data.service_cost.trip_purpose_name', 'uz') + ' (o\'z)',
        tripPurposeNameUz: this.$t('open_data.service_cost.trip_purpose_name', 'uzCyrillic') + ' (ўз)',
        tripPurposeNameRu: this.$t('open_data.service_cost.trip_purpose_name', 'ru') + ' (ру)',
        tripPurposeNameEn: this.$t('open_data.service_cost.trip_purpose_name', 'en') + ' (en)',
        tripDay: this.$t('open_data.service_cost.trip_day'),
        tripAddressNameLt: this.$t('open_data.service_cost.trip_address_name', 'uz') + ' (o\'z)',
        tripAddressNameUz: this.$t('open_data.service_cost.trip_address_name', 'uzCyrillic') + ' (ўз)',
        tripAddressNameRu: this.$t('open_data.service_cost.trip_address_name', 'ru') + ' (ру)',
        tripAddressNameEn: this.$t('open_data.service_cost.trip_address_name', 'en') + ' (en)',
        dailyCost: this.$t('open_data.service_cost.daily_cost'),
        dormitoryCost: this.$t('open_data.service_cost.dormitory_cost'),
        transportCost: this.$t('open_data.service_cost.transport_cost'),
        total: this.$t('open_data.service_cost.total'),
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