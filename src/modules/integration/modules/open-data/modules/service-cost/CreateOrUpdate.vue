<template>
  <b-row class="mb-3">
    <b-col md="12" class="text-center">
      <div class="h4 mb-4 d-inline-block">
        {{ $t('open_data.service_cost.code') }} - {{ $t('open_data.service_cost.title') }}
      </div>
    </b-col>
    <b-col md="12">
      <base-create-or-update-wrapper
          @save="save"
          has-save-suspend
          :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
      >
        <ValidationObserver
            ref="observer"
            v-slot="{}"
        >
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.nameLt"
                  :label="$t('open_data.service_cost.name', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.service_cost.name', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.nameUz"
                  :label="$t('open_data.service_cost.name', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.service_cost.name', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.nameRu"
                  :label="$t('open_data.service_cost.name', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.service_cost.name', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.nameEn"
                  :label="$t('open_data.service_cost.name', 'en') + ' (en)'"
                  :placeholder="$t('open_data.service_cost.name', 'en') + ' (en)'"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.positionNameLt"
                  :label="$t('open_data.service_cost.position_name', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.service_cost.position_name', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.positionNameUz"
                  :label="$t('open_data.service_cost.position_name', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.service_cost.position_name', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.positionNameRu"
                  :label="$t('open_data.service_cost.position_name', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.service_cost.position_name', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.positionNameEn"
                  :label="$t('open_data.service_cost.position_name', 'en') + ' (en)'"
                  :placeholder="$t('open_data.service_cost.position_name', 'en') + ' (en)'"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.tripPurposeNameLt"
                  :label="$t('open_data.service_cost.trip_purpose_name', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.service_cost.trip_purpose_name', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.tripPurposeNameUz"
                  :label="$t('open_data.service_cost.trip_purpose_name', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.service_cost.trip_purpose_name', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.tripPurposeNameRu"
                  :label="$t('open_data.service_cost.trip_purpose_name', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.service_cost.trip_purpose_name', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.tripPurposeNameEn"
                  :label="$t('open_data.service_cost.trip_purpose_name', 'en') + ' (en)'"
                  :placeholder="$t('open_data.service_cost.trip_purpose_name', 'en') + ' (en)'"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.tripAddressNameLt"
                  :label="$t('open_data.service_cost.trip_address_name', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.service_cost.trip_address_name', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.tripAddressNameUz"
                  :label="$t('open_data.service_cost.trip_address_name', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.service_cost.trip_address_name', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.tripAddressNameRu"
                  :label="$t('open_data.service_cost.trip_address_name', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.service_cost.trip_address_name', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.tripAddressNameEn"
                  :label="$t('open_data.service_cost.trip_address_name', 'en') + ' (en)'"
                  :placeholder="$t('open_data.service_cost.trip_address_name', 'en') + ' (en)'"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.certificateNumber"
                  :label="$t('open_data.service_cost.certificate_number')"
                  :placeholder="$t('open_data.service_cost.certificate_number')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.order"
                  :label="$t('open_data.service_cost.order')"
                  :placeholder="$t('open_data.service_cost.order')"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.tripDay"
                  :label="$t('open_data.service_cost.trip_day')"
                  :placeholder="$t('open_data.service_cost.trip_day')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.dailyCost"
                  :label="$t('open_data.service_cost.daily_cost')"
                  :placeholder="$t('open_data.service_cost.daily_cost')"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.dormitoryCost"
                  :label="$t('open_data.service_cost.dormitory_cost')"
                  :placeholder="$t('open_data.service_cost.dormitory_cost')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.transportCost"
                  :label="$t('open_data.service_cost.transport_cost')"
                  :placeholder="$t('open_data.service_cost.transport_cost')"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2 number">
              <BaseInputWithValidation
                  v-model="editingItem.total"
                  :label="$t('open_data.service_cost.total')"
                  :placeholder="$t('open_data.service_cost.total')"
              />
            </b-col>
          </b-row>
        </ValidationObserver>
      </base-create-or-update-wrapper>
    </b-col>
  </b-row>
</template>
<script>
const MAIN_API_URL = 'open-data/service-cost';
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

export default {
  name: "CreateOrUpdate",
  /*
  * DATA */
  data() {
    return {
      editingItem: {},
      statuses: []
    }
  },
  /*
  * COMPUTED */
  computed: {
    isModeCreate() {
      return this.$route.name === 'CreateOpenDataServiceCost'
    },
    computedObserver() {
      return this.$refs.observer
    }
  },
  /*
  * METHODS */
  methods: {
    treeClosed(veeName) {
      this.computedObserver.refs[veeName].validate();
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
    },
    async handleCreated() {
      this.var_default_search_payload.itemsPerPage = 500
      if (this.isModeCreate) {
        await crudAndListsService.getEmpty(MAIN_API_URL, null, true)
            .then(res => {
              this.editingItem = res.data
            })
            .catch(e => {
              console.log(e)
            })
      } else {
        await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, true)
            .then(res => {
              this.editingItem = res.data
            })
            .catch(e => {
              console.log(e)
            })
      }
    }
  },
  async created() {
    await this.handleCreated();
  }
}
</script>
<style scoped>
ul {
  list-style-type: none;
}
</style>