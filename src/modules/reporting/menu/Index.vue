<template>
  <div>
    <div class="col-md-12 text-center">
      <div class="h3 mt-4 d-inline-block" style="color: #2b675b; font-weight: 500">
        {{ $t('reporting.title') }}
      </div>
    </div>
    <b-card>
      <b-container fluid="100%">
        <ValidationObserver
            ref="observer"
            v-slot="{}"
        >
          <b-row>
            <b-col>
              <b-card style="border:1px solid #2b675b; border-radius: 5px; margin:15px; padding: 15px;margin-top:10px;">
                <b-row>
                  <b-col cols="3" class="px-3 py-0">
                    <div
                        style="font-size: 16px;background: #2b675b; color: white; padding: 5px; width: 100%; margin-bottom: 20px; border-radius: 2px; font-weight: bold">
                      {{ $t('reporting.main.form1.title') }}
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col class="px-3 py-0">
                    <BaseInputWithValidation
                        v-model="editingItem.inn"
                        mask="#########"
                        class="required"
                        placeholder="123456789"
                        with-input-append
                        :rules="{regex: /\b\d{9}\b/}"
                        :label="$t('reporting.main.form1.name1')"
                        @keyup.enter="findContractorByInn"
                        label-on-top
                    >
                      <template v-slot:append-slot>
                        <b-button
                            @click="findContractorByInn"
                            variant="outline-primary"
                            id="contractorSearchButton"
                            style="padding: 2.5px 10px; font-size: 1.2rem;"
                        >
                          <i class="mdi mdi-account-search"></i>
                        </b-button>
                      </template>
                    </BaseInputWithValidation>
                  </b-col>
                  <b-col  class="px-3" >
                    <BaseInputWithValidation
                        v-model="editingItem.minPrice"
                        :label="$t('reporting.main.form1.name2')"
                        :placeholder="$t('')"
                        class="required"
                        rules="required"
                        label-on-top
                    />
                  </b-col>
                  <b-col  class="px-3" >
                    <BaseInputWithValidation
                        v-model="editingItem.maxPrice"
                        :label="$t('reporting.main.form1.name3')"
                        :placeholder="$t('')"
                        class="required"
                        rules="required"
                        label-on-top
                    />
                  </b-col>
                  <b-col  class="px-3" >
                    <BaseInputWithValidation
                        v-model="editingItem.maxPrice"
                        :label="$t('reporting.main.form1.name4')"
                        :placeholder="$t('')"
                        class="required"
                        rules="required"
                        label-on-top
                    />
                  </b-col>
                  <b-col  class="px-3" >
                    <BaseInputWithValidation
                        v-model="editingItem.maxPrice"
                        :label="$t('reporting.main.form1.name5')"
                        :placeholder="$t('')"
                        class="required"
                        rules="required"
                        label-on-top
                    />
                  </b-col>

                </b-row>
              </b-card>

              <b-card style="border:1px solid #2b675b; border-radius: 5px; margin:15px; padding: 15px;margin-top:10px;">
                <b-row>
                  <b-col cols="3" class="px-3 py-0">
                    <div
                        style="font-size: 16px;background: #2b675b; color: white; padding: 5px; width: 100%; margin-bottom: 20px; border-radius: 2px; font-weight: bold">
                      {{ $t('reporting.main.form2.title') }}
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" md="3" class="px-3 py-0">
                    <BaseSelectWithValidation
                        v-model="editingItem.code"
                        class="required"
                        rules="required"
                        :label="$t('reporting.main.form2.name1')"
                        label-on-top
                    >
                      <b-form-select-option
                          value="FOODS">{{ $t('reporting.main.form3.title') }}
                      </b-form-select-option>
                      <b-form-select-option
                          value="OTHERS">{{ $t('reporting.main.form4.title') }}
                      </b-form-select-option>
                    </BaseSelectWithValidation>
                  </b-col>

                  <b-col cols="12" md="3" class="px-3">
                    <BaseSelectWithValidation
                        v-model="editingItem.code"
                        class="required"
                        rules="required"
                        :label="$t('reporting.main.form2.name2')"
                        label-on-top
                    >
                      <b-form-select-option
                          value="FOODS">{{ $t('reporting.main.form2.name3') }}
                      </b-form-select-option>
                      <b-form-select-option
                          value="OTHERS">{{ $t('reporting.main.form2.name4') }}
                      </b-form-select-option>
                    </BaseSelectWithValidation>
                  </b-col>
                  <b-col cols="12" md="3" class="px-3 mt-3">
                    <b-form-group
                        :label="$t('reporting.main.form2.name5')"
                        label-for="nested-city"
                        label-cols-sm="3"
                        label-align-sm="right"
                    >
                     <b-row>
                       <b-col>
                         <BaseDatePickerWithValidation
                             not-required
                             disable-after
                             custom-styles="grid-template-columns: 100%;"
                             :only-form-element="true"
                             v-model="editingItem.date"
                             lang="ru"
                             :placeholder="$t('reporting.main.form2.name6')"
                         >
                         </BaseDatePickerWithValidation>
                       </b-col>
                       <b-col>
                         <BaseDatePickerWithValidation
                             not-required
                             disable-after
                             custom-styles="grid-template-columns: 100%;"
                             :only-form-element="true"
                             v-model="editingItem.date"
                             :placeholder="$t('reporting.main.form2.name7')"
                             lang="ru"
                         ></BaseDatePickerWithValidation>
                       </b-col>
                     </b-row>
                    </b-form-group>

                  </b-col>

                </b-row>
              </b-card>

              <b-row class="p-1">
                <b-col cols="12" md="9"></b-col>
                <b-col cols="12" md="3" class="mt-3">
                  <b-overlay
                      :show="loader"
                      rounded
                      opacity="0.6"
                      spinner-small
                      spinner-variant="primary"
                      class="px-3"
                  >
                    <b-button
                        :disabled="loader"
                        class="text-capitalize float-end p-1 ml-1"
                        @click="saveData"
                        block
                        style="background: #2b675b; font-size: 16px"
                    >
                      {{ $t("actions.save") }}
                    </b-button>
                  </b-overlay>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </ValidationObserver>
      </b-container>
    </b-card>
  </div>
</template>

<script>

import integratsiyaService from "@/shared/services/integratsiya.service";

const REF_NAME = 'court_instantions'
import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'
import Service from '../service'

const MAIN_API_URL = 'contractor-advertising-construction'
export default {
  page: {
    title: "Passport info",
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {},
  data() {
    return {
      loader: false,
      loadingStirItems: false,
      summm: '',
      editingItem: {},
    }
  },
  watch: {
    'summm': {
      async handler(newValue) {
        if (this.summm) {
          const result = newValue.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          this.summm = result
        }
      }
    }
  },
  async created() {
    await this.getEmpty();
  },
  computed: {
    computedObserver() {
      return this.$refs.observer
    }
  },
  methods: {
    findContractorByInn() {
      this.loadingStirItems = true
      if (this.editingItem.inn) {
        this.loadingStirItems = true
        integratsiyaService.getSoliqQomitasiInfoByInn(this.editingItem.inn, true)
            .then(res => {
              this.createItem.nameSubject = res.data.fullName
              this.createItem.nameHeadSubject = res.data.director
              this.createItem.addressSubject = res.data.address
              this.$toast(this.$t('submodules.integration.statistics_info.download_success'), {type: 'success'});
              this.loadingStirItems = false
            })
            .catch(e => {
              this.loadingStirItems = false
              // this.computedObserver.setErrors({ INN: [this.$t('validator.inn_exist')] });
            })
      } else {
        this.loadingStirItems = false
        this.$toast(this.$t('validator.inn'), {type: 'error'});
        this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
      }

    },
    saveData() {
      this.loader = true;
      this.computedObserver.validate().then(valid => {
        if (valid) {
          if (this.price_market_typeId == 'BENZIN' || this.price_market_typeId == 'GAZ') {
            this.editingItem.maxPrice = this.summm
            this.editingItem.middleSum = this.summm
            this.editingItem.minPrice = this.summm
          } else {
            this.editingItem.maxPrice = this.editingItem.maxPrice.replaceAll(' ', '')
            this.editingItem.middleSum = this.editingItem.middleSum.replaceAll(' ', '')
            this.editingItem.minPrice = this.editingItem.minPrice.replaceAll(' ', '')
          }

          let bodyFormData = new FormData();
          bodyFormData.append("maxPrice", this.editingItem.maxPrice);
          bodyFormData.append("middleSum", this.editingItem.middleSum);
          bodyFormData.append("minPrice", this.editingItem.minPrice);
          bodyFormData.append("productId", this.editingItem.productId);
          bodyFormData.append("marketId", this.editingItem.marketId);
          bodyFormData.append("photoPng", this.upload_files);
          bodyFormData.append("code", 'web');
          Service.createWithFiles(bodyFormData)
              .then(async () => {
                await this.successSaved();
                this.computedObserver.reset()
                this.editingItem = Object.assign({}, {});
                this.price_market_typeId = null
                await this.$refs.allListRef.fetchNotificationTableItems()
              })
              .finally(() => {
                this.loader = false;
              });
        } else {
          this.loader = false;
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      })


    },
    async getEmpty() {
      this.var_default_search_payload.keyword = this.searchKeyword
      this.var_default_search_payload.itemsPerPage = 500

      await crudAndListsService.getEmpty('price_sum')
          .then(res => {
            this.editingItem = res.data
            // this.editingItem.date = this.getDateFormat(new Date(), '-');
          })
          .catch(e => {
            console.log(e)
          })
    },
  },
}
const i18n = require("@/i18n");
</script>

<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

::v-deep .modal-title {
  width: 97%;
  padding: 2px 0px 0px 10px;
  background-color: #2b675b;
  color: white;
}

table, td, th {
  border: 1px solid #2b6c58;
  color: #2b6c58;
  text-align: center;
  padding: 5px 2px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

::v-deep label {
  font-family: inherit !important;
}

::v-deep .base-form-component__label {
  color: #88a59e;
}

::v-deep .custom-select {
  border: 1px solid #2b675b;
}

::v-deep .form-control {
  border: 1px solid #2b675b;
}

::v-deep .mx-input {
  border: 1px solid #2b675b;
}

::v-deep .multiselect__tags {
  border: 1px solid #2b675b;

}

::v-deep .base-form-component__date-picker {
  border: 1px solid #2b675b;
  border-radius: 5px;
}

::v-deep .vue-treeselect {
  border: 1px solid #2b675b;
  border-radius: 5px;
}
</style>
