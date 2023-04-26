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
          <BaseSelectWithValidation
              v-model="data.soato"
              class="required"
              rules="required"
              :label="$t('submodules.integration.e_auction_info.region_saoto')"
              value-field="id"
          >
            <template #first>
              <b-form-select-option
                  :value="null"
                  disabled
              >{{ $t('submodules.integration.e_auction_info.region_saoto') }}
              </b-form-select-option>
            </template>
            <b-form-select-option v-for="(region, index) in regions"
                                  :key="`${region}-${index}`"
                                  :value="region">{{
                getName({
                  nameRu: region.nameRu,
                  nameLt: region.nameLt,
                  nameUz: region.nameUz,
                })
              }} ({{ region.soato }})
            </b-form-select-option>
          </BaseSelectWithValidation>
        </b-col>
        <b-col lg="4" md="6" sm="12">
          <BaseSelectWithValidation
              v-model="data.area_soato"
              :label="$t('submodules.integration.e_auction_info.district_saoto')"
              value-field="id"
          >
            <template #first>
              <b-form-select-option
                  :value="null"
                  disabled
              >{{ $t('submodules.integration.e_auction_info.district_saoto') }}
              </b-form-select-option>
            </template>
            <b-form-select-option v-for="(district, index) in districts" :key="`${district}-${index}`"
                                  :value="district.soato">{{
                getName({
                  nameRu: district.nameRu,
                  nameLt: district.nameLt,
                  nameUz: district.nameUz,
                })
              }} ({{ district.soato }})
            </b-form-select-option>
          </BaseSelectWithValidation>
        </b-col>
      </b-row>
    </ValidationObserver>
  </base-create-or-update-wrapper>
</template>
<script>
const MAIN_API_URL = 'e-auction-info'
import BaseSelectWithValidation from "../../../../components/base/BaseSelectWithValidation.vue";
import apiService from "../../../../shared/services/api.service";
import statisticsService from "@/shared/services/integration/statistics.service.js"

export default {
  name: "CreateOrUpdate",
  data() {
    return {
      data: {
        auction_date: null,
        soato: null,
        area_soato: ""
      },
      districts: [],
      regions: []
    };
  },
  computed: {
    isModeCreate() {
      return this.$route.name === "IntegrationEAuctionInfoCreate";
    },
    computedObserver() {
      return this.$refs.observer;
    }
  },
  watch: {
    'data.soato': {
      handler(e) {
        this.getDistrictsWithSoatos(e.id)
      }
    }
  },
  methods: {
    save() {
      this.computedObserver.validate().then((valid, a) => {
        if (valid) {
          apiService.post(MAIN_API_URL + `/deploy-information?auction_date=${this.data.auction_date}&soato=${this.data.soato.soato}&area_soato=${this.data.area_soato}`, null, true).then(res => {
            this.computedObserver.reset();
            this.editingItem = Object.assign({}, {});
            this.$router.go(-1);
            this.$toast(this.$t("messages.saved_successfully"), {type: "success"});
          });
        }
      });
    },
    /**
     * Get RegionList
     */
    getRegionsWithSoatos() {
      statisticsService.getGeograficalRegionsWithSoatos().then(res => {
        this.regions = res.data
      })
    },
    getDistrictsWithSoatos(parentId) {
      statisticsService.getGeograficalDistrictsWithSoatos(parentId).then(res => {
        this.districts = res.data
      })
    }
  },
  created() {
    this.var_default_search_payload.itemsPerPage = 500;
    this.getRegionsWithSoatos()
  },
  components: {BaseSelectWithValidation}
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