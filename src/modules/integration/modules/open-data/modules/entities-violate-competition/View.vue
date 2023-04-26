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
const MAIN_API_URL = 'open-data/entities-violate-competition';
import {bus} from "@/main";
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
  name: "View",
  data() {
    return {
      title: this.$t('open_data.entities_violate_competition.title'),
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
        subjectNameLt: this.$t('open_data.entities_violate_competition.subjectName', 'uz') + ' (o\'z)',
        subjectNameUz: this.$t('open_data.entities_violate_competition.subjectName', 'uzCyrillic') + ' (ўз)',
        subjectNameRu: this.$t('open_data.entities_violate_competition.subjectName', 'ru') + ' (ру)',
        subjectNameEn: this.$t('open_data.entities_violate_competition.subjectName', 'en') + ' (en)',
        documentNameLt: this.$t('open_data.entities_violate_competition.documentName', 'uz') + ' (o\'z)',
        documentNameUz: this.$t('open_data.entities_violate_competition.documentName', 'uzCyrillic') + ' (ўз)',
        documentNameRu: this.$t('open_data.entities_violate_competition.documentName', 'ru') + ' (ру)',
        documentNameEn: this.$t('open_data.entities_violate_competition.documentName', 'en') + ' (en)',
        contentOfOffenseLt: this.$t('open_data.entities_violate_competition.contentOfOffense', 'uz') + ' (o\'z)',
        contentOfOffenseUz: this.$t('open_data.entities_violate_competition.contentOfOffense', 'uzCyrillic') + ' (ўз)',
        contentOfOffenseRu: this.$t('open_data.entities_violate_competition.contentOfOffense', 'ru') + ' (ру)',
        contentOfOffenseEn: this.$t('open_data.entities_violate_competition.contentOfOffense', 'en') + ' (en)',
        contentOfActionLt: this.$t('open_data.entities_violate_competition.contentOfAction', 'uz') + ' (o\'z)',
        contentOfActionUz: this.$t('open_data.entities_violate_competition.contentOfAction', 'uzCyrillic') + ' (ўз)',
        contentOfActionRu: this.$t('open_data.entities_violate_competition.contentOfAction', 'ru') + ' (ру)',
        contentOfActionEn: this.$t('open_data.entities_violate_competition.contentOfAction', 'en') + ' (en)',
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