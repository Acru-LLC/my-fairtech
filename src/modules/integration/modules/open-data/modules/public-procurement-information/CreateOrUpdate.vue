<template>
  <b-row class="mb-3">
    <b-col md="12" class="text-center">
      <div class="h4 mb-4 d-inline-block">
        {{ $t('open_data.public_procurement_information.code') }} -
        {{ $t('open_data.public_procurement_information.title') }}
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
                  v-model="editingItem.economicClassification"
                  :label="$t('open_data.public_procurement_information.economicClassification')"
                  :placeholder="$t('open_data.public_procurement_information.economicClassification')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.lot"
                  :label="$t('open_data.public_procurement_information.lot')"
                  :placeholder="$t('open_data.public_procurement_information.lot')"
              />
            </b-col>

            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.purchaseTypeLt"
                  :label="$t('open_data.public_procurement_information.purchaseType', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.public_procurement_information.purchaseType', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.goodServiceNameLt"
                  :label="$t('open_data.public_procurement_information.goodServiceName', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.public_procurement_information.goodServiceName', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.purchaseTypeUz"
                  :label="$t('open_data.public_procurement_information.purchaseType', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.public_procurement_information.purchaseType', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.goodServiceNameUz"
                  :label="$t('open_data.public_procurement_information.goodServiceName', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.public_procurement_information.goodServiceName', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.purchaseTypeRu"
                  :label="$t('open_data.public_procurement_information.purchaseType', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.public_procurement_information.purchaseType', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.goodServiceNameRu"
                  :label="$t('open_data.public_procurement_information.goodServiceName', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.public_procurement_information.goodServiceName', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.purchaseTypeEn"
                  :label="$t('open_data.public_procurement_information.purchaseType', 'en') + ' (en)'"
                  :placeholder="$t('open_data.public_procurement_information.purchaseType', 'en') + ' (en)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.goodServiceNameEn"
                  :label="$t('open_data.public_procurement_information.goodServiceName', 'en') + ' (en)'"
                  :placeholder="$t('open_data.public_procurement_information.goodServiceName', 'en') + ' (en)'"
              />
            </b-col>

            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.fundingSourceLt"
                  :label="$t('open_data.public_procurement_information.fundingSource', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.public_procurement_information.fundingSource', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.purchaseProcessTypeLt"
                  :label="$t('open_data.public_procurement_information.purchaseProcessType', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.public_procurement_information.purchaseProcessType', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.fundingSourceUz"
                  :label="$t('open_data.public_procurement_information.fundingSource', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.public_procurement_information.fundingSource', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.purchaseProcessTypeUz"
                  :label="$t('open_data.public_procurement_information.purchaseProcessType', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.public_procurement_information.purchaseProcessType', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.fundingSourceRu"
                  :label="$t('open_data.public_procurement_information.fundingSource', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.public_procurement_information.fundingSource', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.purchaseProcessTypeRu"
                  :label="$t('open_data.public_procurement_information.purchaseProcessType', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.public_procurement_information.purchaseProcessType', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.fundingSourceEn"
                  :label="$t('open_data.public_procurement_information.fundingSource', 'en') + ' (en)'"
                  :placeholder="$t('open_data.public_procurement_information.fundingSource', 'en') + ' (en)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.purchaseProcessTypeEn"
                  :label="$t('open_data.public_procurement_information.purchaseProcessType', 'en') + ' (en)'"
                  :placeholder="$t('open_data.public_procurement_information.purchaseProcessType', 'en') + ' (en)'"
              />
            </b-col>

            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.purchasePurposeLt"
                  :label="$t('open_data.public_procurement_information.purchasePurpose', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.public_procurement_information.purchasePurpose', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.goodUnitLt"
                  :label="$t('open_data.public_procurement_information.goodUnit', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.public_procurement_information.goodUnit', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.purchasePurposeUz"
                  :label="$t('open_data.public_procurement_information.purchasePurpose', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.public_procurement_information.purchasePurpose', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.goodUnitUz"
                  :label="$t('open_data.public_procurement_information.goodUnit', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.public_procurement_information.goodUnit', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.purchasePurposeRu"
                  :label="$t('open_data.public_procurement_information.purchasePurpose', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.public_procurement_information.purchasePurpose', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.goodUnitRu"
                  :label="$t('open_data.public_procurement_information.goodUnit', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.public_procurement_information.goodUnit', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.purchasePurposeEn"
                  :label="$t('open_data.public_procurement_information.purchasePurpose', 'en') + ' (en)'"
                  :placeholder="$t('open_data.public_procurement_information.purchasePurpose', 'en') + ' (en)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.goodUnitEn"
                  :label="$t('open_data.public_procurement_information.goodUnit', 'en') + ' (en)'"
                  :placeholder="$t('open_data.public_procurement_information.goodUnit', 'en') + ' (en)'"
              />
            </b-col>

            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.purchasedGoodLt"
                  :label="$t('open_data.public_procurement_information.purchasedGood', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.public_procurement_information.purchasedGood', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.supplierLt"
                  :label="$t('open_data.public_procurement_information.supplier', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.public_procurement_information.supplier', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.purchasedGoodUz"
                  :label="$t('open_data.public_procurement_information.purchasedGood', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.public_procurement_information.purchasedGood', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.supplierUz"
                  :label="$t('open_data.public_procurement_information.supplier', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.public_procurement_information.supplier', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.purchasedGoodRu"
                  :label="$t('open_data.public_procurement_information.purchasedGood', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.public_procurement_information.purchasedGood', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.supplierRu"
                  :label="$t('open_data.public_procurement_information.supplier', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.public_procurement_information.supplier', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.purchasedGoodEn"
                  :label="$t('open_data.public_procurement_information.purchasedGood', 'en') + ' (en)'"
                  :placeholder="$t('open_data.public_procurement_information.purchasedGood', 'en') + ' (en)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.supplierEn"
                  :label="$t('open_data.public_procurement_information.supplier', 'en') + ' (en)'"
                  :placeholder="$t('open_data.public_procurement_information.supplier', 'en') + ' (en)'"
              />
            </b-col>

            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.amount"
                  :label="$t('open_data.public_procurement_information.amount')"
                  :placeholder="$t('open_data.public_procurement_information.amount')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.price"
                  :label="$t('open_data.public_procurement_information.price')"
                  :placeholder="$t('open_data.public_procurement_information.price')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.totalAmount"
                  :label="$t('open_data.public_procurement_information.totalAmount')"
                  :placeholder="$t('open_data.public_procurement_information.totalAmount')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.plannedFunding"
                  :label="$t('open_data.public_procurement_information.plannedFunding')"
                  :placeholder="$t('open_data.public_procurement_information.plannedFunding')"
              />
            </b-col>
          </b-row>
        </ValidationObserver>
      </base-create-or-update-wrapper>
    </b-col>
  </b-row>
</template>
<script>
const MAIN_API_URL = 'open-data/public-procurement-information';
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
      return this.$route.name === 'CreateOpenDataPublicProcurementInformation'
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