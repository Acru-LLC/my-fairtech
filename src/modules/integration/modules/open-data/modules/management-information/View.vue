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
const MAIN_API_URL = 'open-data/management-information';
import {bus} from "@/main";
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
  name: "View",
  data() {
    return {
      title: this.$t('open_data.management_information.title'),
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
        fullNameLt: this.$t('column.fio', 'uz') + ' (o\'z)',
        fullNameUz: this.$t('column.fio', 'uzCyrillic') + ' (ўз)',
        fullNameRu: this.$t('column.fio', 'ru') + ' (ру)',
        fullNameEn: this.$t('column.fio', 'en') + ' (en)',
        positionLt: this.$t('column.position', 'uz') + ' (o\'z)',
        positionUz: this.$t('column.position', 'uzCyrillic') + ' (ўз)',
        positionRu: this.$t('column.position', 'ru') + ' (ру)',
        positionEn: this.$t('column.position', 'en') + ' (en)',
        receptionDaysLt: this.$t('column.reception_days', 'uz') + ' (o\'z)',
        receptionDaysUz: this.$t('column.reception_days', 'uzCyrillic') + ' (ўз)',
        receptionDaysRu: this.$t('column.reception_days', 'ru') + ' (ру)',
        receptionDaysEn: this.$t('column.reception_days', 'en') + ' (en)',
        fromTime: this.$t('column.time') + ' ' + this.$t('column.from'),
        toTime: this.$t('column.time') + ' ' + this.$t('column.to'),
        phone: this.$t('column.phone_number'),
        email: this.$t('profile.email'),
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