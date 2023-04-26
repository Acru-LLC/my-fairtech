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
const MAIN_API_URL = 'open-data/subordinate-organization';
import {bus} from "@/main";
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
  name: "View",
  data() {
    return {
      title: this.$t('open_data.subordinate_organization.title'),
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
        organizationNameLt: this.$t('open_data.subordinate_organization.organization_name', 'uz') + ' (o\'z)',
        organizationNameUz: this.$t('open_data.subordinate_organization.organization_name', 'uzCyrillic') + ' (ўз)',
        organizationNameRu: this.$t('open_data.subordinate_organization.organization_name', 'ru') + ' (ру)',
        organizationNameEn: this.$t('open_data.subordinate_organization.organization_name', 'en') + ' (en)',
        addressLt: this.$t('open_data.subordinate_organization.address', 'uz') + ' (o\'z)',
        addressUz: this.$t('open_data.subordinate_organization.address', 'uzCyrillic') + ' (ўз)',
        addressRu: this.$t('open_data.subordinate_organization.address', 'ru') + ' (ру)',
        addressEn: this.$t('open_data.subordinate_organization.address', 'en') + ' (en)',
        latitude: this.$t('open_data.subordinate_organization.latitude'),
        longitude: this.$t('open_data.subordinate_organization.longitude'),
        addressLocation: this.$t('open_data.subordinate_organization.address_location'),
        email: this.$t('open_data.subordinate_organization.email'),
        phone: this.$t('open_data.subordinate_organization.phone'),
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