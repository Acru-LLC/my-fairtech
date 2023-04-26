<template>
  <b-row class="mb-3">
    <b-col md="12" class="text-center">
      <div class="h4 mb-4 d-inline-block">
        {{ $t('open_data.regions_product_price.code') }} - {{ $t('open_data.regions_product_price.title') }}
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
                  :label="$t('open_data.regions_product_price.product_name', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.regions_product_price.product_name', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.productNameUz"
                  :label="$t('open_data.regions_product_price.product_name', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.regions_product_price.product_name', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.productNameRu"
                  :label="$t('open_data.regions_product_price.product_name', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.regions_product_price.product_name', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.productNameEn"
                  :label="$t('open_data.regions_product_price.product_name', 'en') + ' (en)'"
                  :placeholder="$t('open_data.regions_product_price.product_name', 'en') + ' (en)'"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.unitLt"
                  :label="$t('open_data.regions_product_price.unit', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.regions_product_price.unit', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.unitUz"
                  :label="$t('open_data.regions_product_price.unit', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.regions_product_price.unit', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.unitRu"
                  :label="$t('open_data.regions_product_price.unit', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.regions_product_price.unit', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.unitEn"
                  :label="$t('open_data.regions_product_price.unit', 'en') + ' (en)'"
                  :placeholder="$t('open_data.regions_product_price.unit', 'en') + ' (en)'"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.tashkentCity"
                  :label="$t('open_data.regions_product_price.tashkent_city')"
                  :placeholder="$t('open_data.regions_product_price.tashkent_city')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.karakalpakstan"
                  :label="$t('open_data.regions_product_price.karakalpakstan')"
                  :placeholder="$t('open_data.regions_product_price.karakalpakstan')"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.andijan"
                  :label="$t('open_data.regions_product_price.andijan')"
                  :placeholder="$t('open_data.regions_product_price.andijan')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.bukhara"
                  :label="$t('open_data.regions_product_price.bukhara')"
                  :placeholder="$t('open_data.regions_product_price.bukhara')"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.jizzakh"
                  :label="$t('open_data.regions_product_price.jizzakh')"
                  :placeholder="$t('open_data.regions_product_price.jizzakh')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.kashkadarya"
                  :label="$t('open_data.regions_product_price.kashkadarya')"
                  :placeholder="$t('open_data.regions_product_price.kashkadarya')"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.navoi"
                  :label="$t('open_data.regions_product_price.navoi')"
                  :placeholder="$t('open_data.regions_product_price.navoi')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.namangan"
                  :label="$t('open_data.regions_product_price.namangan')"
                  :placeholder="$t('open_data.regions_product_price.namangan')"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.samarkand"
                  :label="$t('open_data.regions_product_price.samarkand')"
                  :placeholder="$t('open_data.regions_product_price.samarkand')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.surkhandarya"
                  :label="$t('open_data.regions_product_price.surkhandarya')"
                  :placeholder="$t('open_data.regions_product_price.surkhandarya')"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.syrdarya"
                  :label="$t('open_data.regions_product_price.syrdarya')"
                  :placeholder="$t('open_data.regions_product_price.syrdarya')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.tashkent"
                  :label="$t('open_data.regions_product_price.tashkent')"
                  :placeholder="$t('open_data.regions_product_price.tashkent')"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.fergana"
                  :label="$t('open_data.regions_product_price.fergana')"
                  :placeholder="$t('open_data.regions_product_price.fergana')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.khorazm"
                  :label="$t('open_data.regions_product_price.khorazm')"
                  :placeholder="$t('open_data.regions_product_price.khorazm')"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.average"
                  :label="$t('open_data.regions_product_price.average')"
                  :placeholder="$t('open_data.regions_product_price.average')"
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
      return this.$route.name === 'CreateOpenDataRegionsProductPrice'
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