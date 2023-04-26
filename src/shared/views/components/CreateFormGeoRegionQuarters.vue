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
        <BaseInputWithValidation
            not-required
            v-model="editingItem.nameLt"
            :label="$t('column.name_lt')"
            :placeholder="$t('column.name_lt')"
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
            v-model="editingItem.nameRu"
            :label="$t('column.name_ru')"
            :placeholder="$t('column.name_ru')"
        />

      </b-col>
      <b-col
          sm="12"
          md="6"
      >
        <!-- <BaseInputWithValidation
            rules="required"
            class="required"
            v-model="editingItem.code"
            :label="$t('column.code')"
            :placeholder="$t('column.code')"
        /> -->
      </b-col>
    </b-row>
  </ValidationObserver>
</template>
<script>
const MAIN_API_URL = 'directory/quarter-names'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

export default {
  name: "CreateFormGeoRegionQuarters",
  props: {
    customIsModeCreate: {
      type: Boolean,
      default: false,
    },
    additionalParams: {
      type: Object,
      default: () => {
      },
      disabled: {
        type: Boolean,
        default: false,
      }
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
      districts: []
    }
  },
  /*
  * COMPUTED */
  computed: {
    isModeCreate() {
      return this.customIsModeCreate ? this.customIsModeCreate : this.$route.name === 'CreateGeoRegionQuarter'
    },
    computedObserver() {
      return this.$refs.observer
    }
  },
  /*
  * METHODS */
  methods: {
    customLabelDistrict(opt) {
      let selectedDistrict = this.districts.find(e => e.id == opt);
      if (selectedDistrict) {
        return `${
            this.getName({
              nameRu: selectedDistrict.nameRu,
              nameLt: selectedDistrict.nameLt,
              nameUz: selectedDistrict.nameUz,
            })
        }`
      }
      return ``;
    },
    isDisabled() {
      return this.additionalParams ? this.disabled = true : this.disabled = false
    },
    customLabelRegion(opt) {
      let selectedRegion = this.regions.find(e => e.id == opt);
      if (selectedRegion) {
        return `${
            this.getName({
              nameRu: selectedRegion.nameRu,
              nameLt: selectedRegion.nameLt,
              nameUz: selectedRegion.nameUz,
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
            })
            .catch(e => {
              console.log(e)
            })
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
    this.var_default_search_payload.itemsPerPage = 500
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

    //GET ADDITIONAL PARAMS
    if (this.additionalParams) {
      this.editingItem.regionId = this.additionalParams.regionId
      if (this.additionalParams.regionId) {
        this.regionSelected(this.additionalParams.regionId)
      }
      this.editingItem.districtId = this.additionalParams.districtId
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