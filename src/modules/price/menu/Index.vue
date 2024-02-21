<template>
  <div>
    <div class="col-md-12 text-center">
      <div class="h3 mt-4 d-inline-block" style="color: #2b675b; font-weight: 500">{{ $t('fair_price.enter_cost') }}
      </div>
    </div>
    <b-card>
      <b-container fluid="100%">
        <ValidationObserver
            ref="observer"
            v-slot="{}"
        >
          <b-row>
            <b-col cols="12" lg="3" v-if="$can('view', 'price-enter-cost')">
              <b-card
                  style="border:1px solid #2b675b; border-radius: 5px; margin:15px; padding: 15px; margin-top:10px;">
                <div>
                  <b-row>
                    <b-col class="px-2 py-0">
                      <div
                          style="font-size: 16px;  background: #2b675b; color: white; padding: 5px; width: 100%; margin-bottom: 10px; border-radius: 2px; font-weight: bold">
                        {{ $t('fair_price.info') }}
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" class="px-3">
                      <BaseSelectWithValidation
                          rules="required"
                          class="required"
                          v-model="price_market_typeId"
                          :label="$t('fair_price.references.type_of_shopping')"
                          value-field="type"
                          label-on-top
                      >
                        <b-form-select-option v-for="(item, index) in price_market_type"
                                              :key="index"
                                              :value="item.type">{{
                            getName({
                              nameRu: item.nameRu,
                              nameLt: item.nameLt,
                              nameUz: item.nameUz,
                              nameEn: item.nameEn,
                            })
                          }}
                        </b-form-select-option>
                      </BaseSelectWithValidation>
                    </b-col>
                    <b-col cols="12" class="px-3 pt-2">
                      <BaseSelectWithValidation
                          rules="required"
                          class="required"
                          v-model="editingItem.marketId"
                          :label="$t('fair_price.references.priceMarkets')"
                          value-field="id"
                          label-on-top
                      >
                        <b-form-select-option v-for="(item, index) in price_market"
                                              :key="index"
                                              :value="item.id">{{
                            item.marketName
                          }}
                        </b-form-select-option>
                      </BaseSelectWithValidation>
                    </b-col>
                  </b-row>
                </div>
              </b-card>
            </b-col>
            <b-col cols="12" lg="9">
              <b-card style="border:1px solid #2b675b; border-radius: 5px; margin:15px; padding: 15px;margin-top:10px;">
                <div>
                  <b-row>
                    <b-col cols="12" lg="5" class="px-lg-5 px-2 py-0">
                      <div
                          style="font-size: 16px;background-color: #2b675b; color: white; padding: 5px; width: 100%; margin-bottom: 20px; border-radius: 2px; font-weight: bold">
                        {{ $t('fair_price.info_product') }}
                      </div>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="12" md="3" class="px-3 py-0">
                      <div style="width: 100%">
                        <span style="color: #2b675b">
                        {{ $t('fair_price.type_product') }}
                          <span style="color: red">*</span>
                        </span>
                        <BaseTreeselectWithValidation
                            :disable-branch-nodes="true"
                            :searchable="true"
                            :clearable="true"
                            open-direction="bottom"
                            vee-name="parentDepVeeName"
                            rules="required"
                            class="required"
                            :placeholder="$t('')"
                            ref="parentDep"
                            only-form-element
                            form-label="__none"
                            v-model="editingItem.productId"
                            :options="price_product"
                            :default-expand-level="1"
                            :normalizer="normalizer"
                            name="parentDep"
                            custom-styles=""
                            @close="treeClosed('parentDepVeeName')"
                        ></BaseTreeselectWithValidation>
                      </div>
                    </b-col>
                    <b-col cols="12" md="3" class="px-3"
                           v-if="price_market_typeId !== 'BENZIN' && price_market_typeId !== 'GAZ'"
                    >
                      <BaseInputWithValidation
                          v-model="editingItem.minPrice"
                          :label="$t('fair_price.min')"
                          :placeholder="$t('')"
                          class="required"
                          rules="required"
                          label-on-top
                      />
                    </b-col>
                    <b-col cols="12" md="3" class="px-3"
                           v-if="price_market_typeId !== 'BENZIN' && price_market_typeId !== 'GAZ'"
                    >
                      <BaseInputWithValidation
                          v-model="editingItem.maxPrice"
                          :label="$t('fair_price.max')"
                          :placeholder="$t('')"
                          class="required"
                          rules="required"
                          label-on-top
                      />
                    </b-col>
                    <b-col cols="12" md="3" class="px-3" style="width: 100%"
                           v-if="price_market_typeId !== 'BENZIN' && price_market_typeId !== 'GAZ'"
                    >
                      <BaseInputWithValidation
                          v-model="editingItem.middleSum"
                          :label="$t('fair_price.references.xaridorgir_narx')"
                          :placeholder="$t('')"
                          class="required"
                          rules="required"
                          label-on-top
                      />
                    </b-col>
                    <b-col cols="12" md="3" class="px-3" style="width: 100%"
                           v-if="price_market_typeId == 'BENZIN' || price_market_typeId == 'GAZ'"
                    >
                      <BaseInputWithValidation
                          v-model="summm"
                          :label="$t('submodules.integration.price_stock.productPrice')"
                          :placeholder="$t('')"
                          class="required"
                          rules="required"
                          label-on-top
                      />
                    </b-col>

                    <b-col cols="12" md="5" class="px-3" style="width: 100%"
                           v-if="price_market_typeId == 'BENZIN' || price_market_typeId == 'GAZ'">
                      <b-row v-if="uploadFilename !== ''">
                        <b-col cols="6" class="mt-3">
                          {{ uploadFilename }}
                        </b-col>
                        <b-col cols="6">
                          <b-button
                              style=" background: #f39138"
                              class="mt-3 p-1"
                              @click="clearFile"
                          >
                            <i class="fa fa-window-close"></i>
                            {{ $t("rais.cancel") }}
                          </b-button>
                        </b-col>
                      </b-row>
                      <b-button
                          v-else
                          class="mt-3 p-2"
                          :block="uploadFilename !== '' ? false : true"
                          style="border: 1px solid #2b675b; background: #FFFFFF; width: 200px"
                          @click="uploadFile"
                      >
                                <span style="color: #2b675b; !important;">
                                                <i class="fa fa-upload"></i>
                                            {{ $t("actions.upload_file") }}
                                           </span>
                      </b-button>

                      <b-form-file
                          @change="onFileChange"
                          v-model="uploadFiles"
                          class="d-none"
                          ref="ilovaRef"
                      ></b-form-file>
                    </b-col>
                  </b-row>
                  <b-row class="p-lg-1 p-0">
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
                            class="text-capitalize float-end p-1 ml-lg-1 ml-0"
                            @click="saveData"
                            block
                            style="background: #2b675b; font-size: 16px"
                        >
                          {{ $t("actions.save") }}
                        </b-button>
                      </b-overlay>

                      <!--                                        <b-button  @click="saveData">-->
                      <!--                                            <b-overlay :opacity="0.1" :show="loader">-->
                      <!--                                                <i class="fa fa-save"></i>-->
                      <!--                                                {{ $t("actions.save") }}-->
                      <!--                                            </b-overlay>-->
                      <!--                                        </b-button>-->
                    </b-col>
                  </b-row>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </ValidationObserver>
      </b-container>
    </b-card>

    <b-card style="border:1px solid #2b675b; border-radius: 5px; padding: 15px; margin: 15px; overflow: auto;">
      <b-container fluid="100%">
        <AllList ref="allListRef"></AllList>
      </b-container>
    </b-card>
  </div>
</template>

<script>

import {nrm} from "@/helper";
// import Treeselect from "@riophae/vue-treeselect";

// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";


const REF_NAME = 'court_instantions'
import AllList from "./List.vue"
import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'
import Service from '../service'
import BaseSelectWithValidation from "@/components/base/BaseSelectWithValidation.vue";

const MAIN_API_URL = 'contractor-advertising-construction'
export default {
  page: {
    title: "Passport info",
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {BaseSelectWithValidation, AllList},
  data() {
    return {
      uploadFiles: null,
      submitted: false,
      nrm: nrm,
      loader: false,
      searchKeyword: '',
      codePro: 'FOODS',
      typePro: '',
      summm: '',
      editingItem: {},
      price_market_typeId: null,
      price_market_type: [],
      price_market: [],
      price_product: [],
      uploadFilename: '',
      upload_files: null
    }
  },
  watch: {
    'price_market_typeId': {
      async handler() {
        if (this.price_market_typeId) {
          this.editingItem.productId = null
          this.typePro = ''
          this.codePro = ''
          await this.getprice_market();
          if (this.price_market_typeId == 'BENZIN' || this.price_market_typeId == 'GAZ') {
            this.typePro = this.price_market_typeId
            this.codePro = 'OTHERS'
            await this.getprice_product();
          } else {
            this.typePro = ''
            this.codePro = 'FOODS'
            await this.getprice_product();
          }
        }
      }
    },
    'editingItem.maxPrice': {
      async handler(newValue) {
        if (this.editingItem.maxPrice) {
          const result = newValue.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          this.editingItem.maxPrice = result
        }
      }
    },
    'summm': {
      async handler(newValue) {
        if (this.summm) {
          const result = newValue.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          this.summm = result
        }
      }
    },
    'editingItem.minPrice': {
      async handler(newValue) {
        if (this.editingItem.minPrice) {
          const result = newValue.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          this.editingItem.minPrice = result
        }
      }
    },
    'editingItem.middleSum': {
      async handler(newValue) {
        if (this.editingItem.middleSum) {
          const result = newValue.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          this.editingItem.middleSum = result
        }
      }
    },
  },
  async created() {
    await this.getEmpty();
    await this.getprice_market_type();
    await this.getprice_product();
  },
  computed: {
    computedObserver() {
      return this.$refs.observer
    }
  },
  methods: {
    onFileChange(e) {

      const file = e.target.files[0];
      this.upload_files = file
      this.uploadFilename = file.name;
    },
    uploadFile() {
      this.$refs.ilovaRef.$el.firstChild.click();
    },
    clearFile() {
      this.upload_files = null
      this.uploadFilename = ''
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
    treeClosed(veeName) {
      this.computedObserver.refs[veeName].validate();
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

    async getprice_market_type() {
      this.var_default_search_payload.itemsPerPage = 500
      await crudAndListsService.searchListWithKeyword("price_market_type", this.var_default_search_payload)
          .then(res => {
            this.price_market_type = res.data.list
          })
          .catch(e => {
            console.log(e)
          })
    },

    async getprice_market() {
      this.var_default_search_payload.itemsPerPage = 500
      this.var_default_search_payload.type = this.price_market_typeId
      Service
          .searchListWithKeywordOuter('price_market', this.var_default_search_payload)
          .then((res) => {
            this.price_market = res.data.list;
            this.totalItems = res.data.total;
          })
          .catch(e => {
            this.tableItems = [];
            this.totalItems = 0;
          })
          .finally(() => {
            this.loadingTableItems = false
          })
    },

    async getprice_product() {
      this.var_default_search_payload.itemsPerPage = 500
      await Service.searchListWithKeywordAandType(this.typePro, this.codePro, this.$can('view', 'price-enter-cost') ? "price_product" : "price_product/outer", this.var_default_search_payload)
          .then(res => {
            this.price_product = res.data.children
            this.editingItem.marketId = res.data.marketId
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
