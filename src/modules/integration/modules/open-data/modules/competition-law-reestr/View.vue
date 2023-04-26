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
const MAIN_API_URL = 'open-data/competition-law-reestr';
import {bus} from "@/main";
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
  name: "View",
  data() {
    return {
      title: this.$t('open_data.competition_law_reestr.title'),
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
        enterpriseNameLt: this.$t('open_data.competition_law_reestr.enterpriseName', 'uz') + ' (o\'z)',
        enterpriseNameUz: this.$t('open_data.competition_law_reestr.enterpriseName', 'uzCyrillic') + ' (ўз)',
        enterpriseNameRu: this.$t('open_data.competition_law_reestr.enterpriseName', 'ru') + ' (ру)',
        enterpriseNameEn: this.$t('open_data.competition_law_reestr.enterpriseName', 'en') + ' (en)',
        number: this.$t('open_data.competition_law_reestr.number'),
        date: this.$t('open_data.competition_law_reestr.date'),
        documentLt: this.$t('open_data.competition_law_reestr.document', 'uz') + ' (o\'z)',
        documentUz: this.$t('open_data.competition_law_reestr.document', 'uzCyrillic') + ' (ўз)',
        documentRu: this.$t('open_data.competition_law_reestr.document', 'ru') + ' (ру)',
        documentEn: this.$t('open_data.competition_law_reestr.document', 'en') + ' (en)',
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