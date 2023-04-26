<template>
  <base-create-or-update-wrapper
      :custom-title="$t('actions.confirm')"
      has-save-suspend
      @save="save"
  >
    <ValidationObserver ref="observer" v-slot="{}">
      <b-row class="mb-3">
        <b-col md="5" sm="12">
          <BaseMultiselectWithValidation
              v-model="form.contractorId"
              not-required
              label-on-top
              preserve-search
              with-create-addition
              open-direction="bottom"
              :max-height="600"
              :searchable="true"
              :show-labels="false"
              :clear-on-select="false"
              :internal-search="false"
              :loading="isLoadingContractors"
              :label="$t('column.contractor')"
              :custom-label="customLabelContractor"
              :placeholder="$t('column.contractor')"
              :options="contractors.map((e) => e.id)"
              :has-next-page="hasNextPageContractors"
              @search-change="debounceSearchContractors"
              @reachedEndOfList="contractorReachedEndOfList"
          >
          </BaseMultiselectWithValidation>
        </b-col>
        <b-col md="7" sm="12">
          <b-table :items="viewItems" hover striped thead-class="d-none" bordered small/>
        </b-col>
      </b-row>
    </ValidationObserver>
  </base-create-or-update-wrapper>
</template>
<script>
import crudAndListsService from "@/shared/services/crud_and_list.service";

const MAIN_API_URL = 'e-auction-info'
import apiService from "../../../../shared/services/api.service";

export default {
  name: "Confirm",
  data() {
    return {
      item: null,
      hasNextPageContractors: false,
      isLoadingContractors: false,
      contractors: [],
      contractorSearchPayload: {
        itemsPerPage: 10,
      },
      debounce: false,
      form: {
        eAuctionInfoId: null,
        contractorId: null,
      },
      statuses: []
    }
  },
  computed: {
    viewItems() {
      let result = [];
      if (!this.item) return result;
      for (const index in this.item) {
        if (this.labels[index]) {
          result.push({
            label: this.labels[index],
            value: this.item[index],
          });
        }
      }
      return result;
    },
    labels() {
      return {
        address:     this.$t('submodules.integration.e_auction_info.address'),
        area:        this.$t('submodules.integration.e_auction_info.area'),
        lot:         this.$t('submodules.integration.e_auction_info.lot'),
        over_time:   this.$t('submodules.integration.e_auction_info.over_time'),
        price:       this.$t('submodules.integration.e_auction_info.price'),
        property:    this.$t('submodules.integration.e_auction_info.property'),
        region:      this.$t('submodules.integration.e_auction_info.region'),
        win_amount:  this.$t('submodules.integration.e_auction_info.win_amount'),
        winner:      this.$t('submodules.integration.e_auction_info.winner'),
      }
    },
    computedObserver() {
      return this.$refs.observer
    }
  },
  methods: {
    async getById() {
      const { eAuctionInfoId } = this.form
      await apiService.get(MAIN_API_URL + '/get/' + eAuctionInfoId, true)
          .then((response) => {
            this.item = response.data
          })
    },
    contractorReachedEndOfList(e) {
      if (e && !this.isLoadingContractors) {
        this.fetchContractors()
      }
    },
    async debounceSearchContractors(searchText) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(async () => {
        await this.fetchContractorsWithKeyword(searchText);
      }, 1000);
    },
    fetchContractorsWithKeyword(keyword, makeFirstSelected = false) {
      this.contractors = []
      this.contractorSearchPayload.page = 1
      this.contractorSearchPayload.keyword = keyword ? keyword : ''
      this.fetchContractors(makeFirstSelected)
    },
    async fetchContractors(makeFirstSelected) {
      this.isLoadingContractors = true
      await crudAndListsService.searchListWithKeyword('contractor', this.contractorSearchPayload, 'by-contractor', !this.customIsModeCreate)
          .then(res => {
            this.contractors.push(...res.data.list)
            this.hasNextPageContractors = res.data.total / this.contractorSearchPayload.itemsPerPage > this.contractorSearchPayload.page
            this.contractorSearchPayload.page += 1
            if (makeFirstSelected) {
              this.editingItem.parentId = this.contractors.length ? this.contractors[0].id : null
            }
          })
          .catch(e => {
            console.log(e)
            this.contractors = []
          })
          .finally(() => {
            this.isLoadingContractors = false
          })
    },
    customLabelContractor(opt) {
      let selected = this.contractors.find(e => e.id == opt);
      if (selected) {
        return `${selected.fullName}`
      }
      return ``;
    },
    save() {
      this.computedObserver.validate().then(valid => {
        if (valid) {
          apiService.post(MAIN_API_URL + `/confirm`, this.form, true).then(res => {
            this.computedObserver.reset()
            this.form = {
              eAuctionInfoId: null,
              contractorId: null,
            };
            this.$router.go(-1)
            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
          })
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
        }
      });
    }
  },
  async created() {
    this.form.eAuctionInfoId = this.$route.params.id;
    await this.getById();
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