<template>
  <b-row class="mb-3">
    <b-col md="12" class="text-center">
      <div class="h4 mb-4 d-inline-block">
        {{ $t('open_data.non_compliant_brand.code') }} - {{ $t('open_data.non_compliant_brand.title') }}
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
                  v-model="editingItem.productNameLt"
                  :label="$t('open_data.non_compliant_brand.productName', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.non_compliant_brand.productName', 'uz') + ' (o\'z)'"
              />
            </b-col>
            ss="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.tradeNameLt"
                  :label="$t('open_data.non_compliant_brand.tradeName', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.non_compliant_brand.tradeName', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.productNameUz"
                  :label="$t('open_data.non_compliant_brand.productName', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.non_compliant_brand.productName', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.tradeNameUz"
                  :label="$t('open_data.non_compliant_brand.tradeName', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.non_compliant_brand.tradeName', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.productNameRu"
                  :label="$t('open_data.non_compliant_brand.productName', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.non_compliant_brand.productName', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.tradeNameRu"
                  :label="$t('open_data.non_compliant_brand.tradeName', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.non_compliant_brand.tradeName', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.productNameEn"
                  :label="$t('open_data.non_compliant_brand.productName', 'en') + ' (en)'"
                  :placeholder="$t('open_data.non_compliant_brand.productName', 'en') + ' (en)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.tradeNameEn"
                  :label="$t('open_data.non_compliant_brand.tradeName', 'en') + ' (en)'"
                  :placeholder="$t('open_data.non_compliant_brand.tradeName', 'en') + ' (en)'"
              />
            </b-col>

            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.manufacturerLt"
                  :label="$t('open_data.non_compliant_brand.manufacturer', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.non_compliant_brand.manufacturer', 'uz') + ' (o\'z)'"
              />
            </b-col>
            ss="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.testResultLt"
                  :label="$t('open_data.non_compliant_brand.testResult', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.non_compliant_brand.testResult', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.manufacturerUz"
                  :label="$t('open_data.non_compliant_brand.manufacturer', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.non_compliant_brand.manufacturer', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.testResultUz"
                  :label="$t('open_data.non_compliant_brand.testResult', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.non_compliant_brand.testResult', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.manufacturerRu"
                  :label="$t('open_data.non_compliant_brand.manufacturer', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.non_compliant_brand.manufacturer', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.testResultRu"
                  :label="$t('open_data.non_compliant_brand.testResult', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.non_compliant_brand.testResult', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.manufacturerEn"
                  :label="$t('open_data.non_compliant_brand.manufacturer', 'en') + ' (en)'"
                  :placeholder="$t('open_data.non_compliant_brand.manufacturer', 'en') + ' (en)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.testResultEn"
                  :label="$t('open_data.non_compliant_brand.testResult', 'en') + ' (en)'"
                  :placeholder="$t('open_data.non_compliant_brand.testResult', 'en') + ' (en)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseDatePickerWithValidation
                  required
                  disable-after
                  custom-styles="grid-template-columns: 25% 75%;"
                  :label="$t('open_data.non_compliant_brand.controlPurchaseDate')"
                  v-model="editingItem.controlPurchaseDate"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2"/>
            <b-col sm="12" md="6" class="mt-2">
              <BaseDatePickerWithValidation
                  required
                  disable-after
                  custom-styles="grid-template-columns: 25% 75%;"
                  :label="$t('open_data.non_compliant_brand.startDate')"
                  v-model="editingItem.startDate"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseDatePickerWithValidation
                  required
                  disable-after
                  custom-styles="grid-template-columns: 25% 75%;"
                  :label="$t('open_data.non_compliant_brand.endDate')"
                  v-model="editingItem.endDate"
              />
            </b-col>
          </b-row>
        </ValidationObserver>
      </base-create-or-update-wrapper>
    </b-col>
  </b-row>
</template>
<script>
const MAIN_API_URL = 'open-data/non-compliant-brand';
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
      return this.$route.name === 'CreateOpenDataNonCompliantBrand'
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