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
const MAIN_API_URL = 'open-data/brand-and-finance-reestr';
import {bus} from "@/main";
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
  name: "View",
  data() {
    return {
      title: this.$t('open_data.brand_and_finance_reestr.title'),
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
        subjectNameLt: this.$t('open_data.brand_and_finance_reestr.subjectName', 'uz') + ' (o\'z)',
        subjectNameUz: this.$t('open_data.brand_and_finance_reestr.subjectName', 'uzCyrillic') + ' (ўз)',
        subjectNameRu: this.$t('open_data.brand_and_finance_reestr.subjectName', 'ru') + ' (ру)',
        subjectNameEn: this.$t('open_data.brand_and_finance_reestr.subjectName', 'en') + ' (en)',
        stir: this.$t('open_data.brand_and_finance_reestr.stir'),
        regionsLt: this.$t('open_data.brand_and_finance_reestr.regions', 'uz') + ' (o\'z)',
        regionsUz: this.$t('open_data.brand_and_finance_reestr.regions', 'uzCyrillic') + ' (ўз)',
        regionsRu: this.$t('open_data.brand_and_finance_reestr.regions', 'ru') + ' (ру)',
        regionsEn: this.$t('open_data.brand_and_finance_reestr.regions', 'en') + ' (en)',
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