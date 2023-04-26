<template>
  <ValidationObserver
      ref="observer"
      v-slot="{}"
  >
    <b-row class="mb-3">
      <b-col
          sm="12"
          md="6"
      >
        <BaseMultiselectWithValidation
            rules="required"
            class="required"
            v-model="editingItem.regionId"
            @select="regionSelected"
            :options="regions.map(e => e.id)"
            :label="$t('column.region')"
            :custom-label="customLabelRegion"
            :placeholder="$t('column.region')"
            open-direction="bottom"
            :max-height="600"
            :show-labels="false"
            :disabled="isDisabled()"
        />
      </b-col>
      <b-col
          sm="12"
          md="6"
      >
        <BaseMultiselectWithValidation
            rules="required"
            class="required"
            v-model="editingItem.districtId"
            @select="districtSelected"
            :options="districts.map(e => e.id)"
            :label="$t('column.district')"
            :custom-label="customLabelDistrict"
            :placeholder="$t('column.district')"
            open-direction="bottom"
            :max-height="600"
            :show-labels="false"
            :disabled="isDisabled()"
        />
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col
          sm="12"
          md="6"
      >
        <BaseInputWithValidation
            rules="required"
            class="required"
            v-model="editingItem.nameUz"
            :label="$t('column.name_uz')"
            :placeholder="$t('column.name_uz')"
        />
      </b-col>
      <b-col
          sm="12"
          md="6"
      >
        <BaseMultiselectWithValidation
            rules="required"
            class="required"
            v-model="editingItem.quarterId"
            :has-next-page="hasNextPageQuarters"
            @reachedEndOfList="quarterReachedEndOfList"
            @search-change="debounceSearchQuarters"
            :internal-search="false"
            :options="quarters.map(e => e.id)"
            :label="$t('column.quarter')"
            :custom-label="customLabelQuarter"
            :placeholder="$t('column.quarter')"
            open-direction="bottom"
            :max-height="600"
            :show-labels="false"
            :disabled="isDisabled()"
        />
      </b-col>
    </b-row>

    <b-row class="mb-3">
      <b-col
          sm="12"
          md="6"
      >
        <BaseInputWithValidation
            not-required
            v-model="editingItem.nameLt"
            :label="$t('column.name_lt')"
            :placeholder="$t('column.name_lt')"
        />

      </b-col>
      <b-col
          sm="12"
          md="6"
      >
        <BaseInputWithValidation
            not-required
            v-model="editingItem.nameRu"
            :label="$t('column.name_ru')"
            :placeholder="$t('column.name_ru')"
        />
      </b-col>
    </b-row>
  </ValidationObserver>
</template>
<script>
const MAIN_API_URL = 'directory/street-names'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

export default {
  name: "CreateFormGeoRegionStreets",
  props: {
    customIsModeCreate: {
      type: Boolean,
      default: false
    },
    additionalParams: {
      type: Object,
      default: () => {
      },
    }

  },
  /*
  * COMPONENTS */
  components: {},
  /*
  * DATA */
  data() {
    return {
      editingItem: {},
      regions: [],
      districts: [],
      quarters: [],
      hasNextPageQuarters: false,
      debounce: null
    }
  },
  /*
  * COMPUTED */
  computed: {
    isModeCreate() {
      return this.customIsModeCreate ? this.customIsModeCreate : this.$route.name === 'CreateGeoRegionStreet'
    },
    computedObserver() {
      return this.$refs.observer
    }
  },
  /*
  * METHODS */
  methods: {
    quarterReachedEndOfList(e) {
      if (e) {
        this.fetchQuarters(this.editingItem.districtId)
      }
    },
    customLabelQuarter(opt) {
      let selected = this.quarters.find(e => e.id == opt);
      if (selected) {
        return `${
            this.getName({
              nameRu: selected.nameRu,
              nameLt: selected.nameLt,
              nameUz: selected.nameUz,
            })
        }`
      }
      return ``;
    },
    isDisabled() {
      return this.additionalParams ? this.disabled = true : this.disabled = false
    },
    customLabelDistrict(opt) {
      let selected = this.districts.find(e => e.id == opt);
      if (selected) {
        return `${
            this.getName({
              nameRu: selected.nameRu,
              nameLt: selected.nameLt,
              nameUz: selected.nameUz,
            })
        }`
      }
      return ``;
    },
    customLabelRegion(opt) {
      let selected = this.regions.find(e => e.id == opt);
      if (selected) {
        return `${
            this.getName({
              nameRu: selected.nameRu,
              nameLt: selected.nameLt,
              nameUz: selected.nameUz,
            })
        }`
      }
      return ``;
    },
    async regionSelected($event, dontResetDistrict = false) {
      if (!dontResetDistrict) {
        this.editingItem.districtId = null
      }
      // GET DISTRICTS
      if ($event)
        await helperService.getGeoLocationsByParentId($event)
            .then(res => {
              this.districts = res.data
              if (dontResetDistrict)
                this.districtSelected(this.editingItem.districtId, true)
            })
            .catch(e => {
              console.log(e)
            })
    },
    async districtSelected($event, dontResetQuarter = false) {
      if (!dontResetQuarter) {
        this.editingItem.quarterId = null
      }
      // GET QUARTERS
      // if ($event)
      // this.fetchQuarters($event)
    },
    async debounceSearchQuarters(searchText) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(async () => {
        await this.fetchQuartersWithKeyword(searchText);
      }, 1000);
    },
    fetchQuartersWithKeyword(keyword) {
      this.quarters = []
      this.var_default_search_payload.page = 1
      this.var_default_search_payload.keyword = keyword ? keyword : ''
      this.fetchQuarters(this.editingItem.districtId)
    },
    async fetchQuarters(districtId) {
      if (districtId) {
        await crudAndListsService.searchListWithKeyword('directory/quarter-names', this.var_default_search_payload, `get-by-districtId/${districtId}`)
            .then(res => {
              this.quarters.push(...res.data.list)
              this.hasNextPageQuarters = res.data.total / this.var_default_search_payload.itemsPerPage > this.var_default_search_payload.page
              this.var_default_search_payload.page += 1
            })
            .catch(e => {
              console.log(e)
              this.quarters = []
            })
      } else {
        this.quarters = []
      }
    },
    treeClosed(veeName) {
      this.computedObserver.refs[veeName].validate();
    },
    normalizer(node) {
      if (!node.children || node.children.length === 0) {
        delete node.children
        return {
          id: node.id,
          label: this.getName({
            nameRu: node.nameRu,
            nameLt: node.nameLt,
            nameUz: node.nameUz,
          }),
        }
      }
      return {
        id: node.id,
        label: this.getName({
          nameRu: node.nameRu,
          nameLt: node.nameLt,
          nameUz: node.nameUz,
        }),
        children: node.children && node.children.length > 0 ? node.children : [],
      }
    },
    save() {
      this.computedObserver.validate().then(valid => {
        if (valid) {
          if (this.editingItem.id) {
            crudAndListsService.update(MAIN_API_URL, this.editingItem).then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          } else {
            crudAndListsService.create(MAIN_API_URL, this.editingItem).then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          }
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      });
    }
  },
  /*
  * CREATED */
  async created() {
    if (this.isModeCreate) {
      await crudAndListsService.getEmpty(MAIN_API_URL)
          .then(res => {
            this.editingItem = res.data
          })
          .catch(e => {
            console.log(e)
          })
    } else {
      await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, false)
          .then(res => {
            this.editingItem = res.data
          })
          .catch(e => {
            console.log(e)
          })
    }
    // GET REGIONS
    await helperService.fetchRegions()
        .then(res => {
          this.regions = res.data
          this.regionSelected(this.editingItem.regionId, true)
        })
        .catch(e => {
          console.log(e)
        })

    this.fetchQuarters(this.editingItem.districtId)

    //GET ADDITIONAL PARAMS
    if (this.additionalParams) {
      this.editingItem.regionId = this.additionalParams.regionId
      if (this.additionalParams.regionId) {
        this.regionSelected(this.additionalParams.regionId)
      }
      this.editingItem.districtId = this.additionalParams.districtId
      if (this.additionalParams.districtId) {
        this.fetchQuarters(this.additionalParams.districtId)
      }
      this.editingItem.quarterId = this.additionalParams.quarterId
    }

  },
  /*
  WATCH */
  watch: {
    'editingItem.districtId': {
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          this.quarters = []
          this.var_default_search_payload.page = 1
          if (newVal) {
            this.fetchQuarters(newVal)
          }
        }
      }
    }
  }
}
</script>
<style scoped>
.col-form-label {
  padding-top: 0;
}

ul {
  list-style-type: none;
}
</style>