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
const MAIN_API_URL = 'open-data/explanation-and-warning';
import {bus} from "@/main";
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
  name: "View",
  data() {
    return {
      title: this.$t('open_data.explanation_and_warning.title'),
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
        areaNameLt: this.$t('open_data.explanation_and_warning.areaName', 'uz') + ' (o\'z)',
        areaNameUz: this.$t('open_data.explanation_and_warning.areaName', 'uzCyrillic') + ' (ўз)',
        areaNameRu: this.$t('open_data.explanation_and_warning.areaName', 'ru') + ' (ру)',
        areaNameEn: this.$t('open_data.explanation_and_warning.areaName', 'en') + ' (en)',
        name: this.$t('open_data.explanation_and_warning.name'),
        mjtk: this.$t('open_data.explanation_and_warning.mjtk'),
        fine: this.$t('open_data.explanation_and_warning.fine'),
        sum: this.$t('open_data.explanation_and_warning.sum'),
        rejectedFine: this.$t('open_data.explanation_and_warning.rejectedFine'),
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