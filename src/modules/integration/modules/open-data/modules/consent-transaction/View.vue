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
const MAIN_API_URL = 'open-data/consent-transaction';
import {bus} from "@/main";
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
  name: "View",
  data() {
    return {
      title: this.$t('open_data.consent_transaction.title'),
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
        committeeNameLt: this.$t('open_data.consent_transaction.committeeNameLt', 'uz') + ' (o\'z)',
        committeeNameUz: this.$t('open_data.consent_transaction.committeeNameUz', 'uzCyrillic') + ' (ўз)',
        committeeNameRu: this.$t('open_data.consent_transaction.committeeNameRu', 'ru') + ' (ру)',
        committeeNameEn: this.$t('open_data.consent_transaction.committeeNameEn', 'en') + ' (en)',
        add: this.$t('open_data.consent_transaction.add'),
        specialOne: this.$t('open_data.consent_transaction.specialOne'),
        notRequiredOne: this.$t('open_data.consent_transaction.notRequiredOne'),
        rejectedOne: this.$t('open_data.consent_transaction.rejectedOne'),
        share: this.$t('open_data.consent_transaction.share'),
        specialTwo: this.$t('open_data.consent_transaction.specialTwo'),
        notRequiredTwo: this.$t('open_data.consent_transaction.notRequiredTwo'),
        rejectedTwo: this.$t('open_data.consent_transaction.rejectedTwo'),
        total: this.$t('open_data.consent_transaction.total'),
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