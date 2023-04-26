<template>
  <base-create-or-update-wrapper
      :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
      has-save-suspend
      @save="save"
  >
    <ValidationObserver ref="observer" v-slot="{}">
      <b-row class="mb-3">
        <b-col lg="4" md="6" sm="12">
          <BaseDatePickerWithValidation
              rules="required"
              required
              format="DD.MM.YYYY"
              :label="$t('submodules.integration.e_auction_info.date')"
              :placeholder="$t('submodules.integration.e_auction_info.date')"
              v-model="data.auction_date"
          />
        </b-col>
        <b-col lg="4" md="6" sm="12">
          <BaseInputWithValidation
              v-model="data.soato"
              :label="$t('submodules.integration.e_auction_info.soato')"
              :placeholder="$t('submodules.integration.e_auction_info.soato')"
              type="number"
              class="required"
              rules="required"
          />
        </b-col>
      </b-row>
    </ValidationObserver>
  </base-create-or-update-wrapper>
</template>
<script>
const MAIN_API_URL = 'e-auction-info'
import apiService from "../../../../shared/services/api.service";
export default {
  name: "CreateOrUpdate",
  data() {
    return {
      data: {
        auction_date: null,
        soato: null,
      },
      statuses: []
    }
  },
  computed: {
    isModeCreate() {
      return this.$route.name === 'IntegrationEAuctionInfoCreate'
    },
    computedObserver() {
      return this.$refs.observer
    }
  },
  methods: {
    save() {
      this.computedObserver.validate().then(valid => {
        if (valid) {
          apiService.post(MAIN_API_URL + `/deploy-information?auction_date=${this.data.auction_date}&soato=${this.data.soato}`, null, true).then(res => {
            this.computedObserver.reset()
            this.editingItem = Object.assign({}, {});
            this.$router.go(-1)
            this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
          })
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      });
    }
  },
  created() {
    this.var_default_search_payload.itemsPerPage = 500
  }
}
</script>
<style scoped>
.base-form-component {
  display: block;
}
.base-form-component__label {
  padding: 10px 0;
}
</style>