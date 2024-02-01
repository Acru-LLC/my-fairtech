<template>
    <div>
        <b-card class="p-3">
            <b-container fluid="100%">
                <b-row>
                    <b-col cols="12">
                        <ValidationObserver
                                ref="observer"
                                v-slot="{}"
                        >
                            <div style="border:1px solid #2b675b; padding:15px; margin-top:10px;">
                                <b-row>
<!--                                    <b-col cols="12" md="3" class="px-3">-->
<!--                                        <BaseSelectWithValidation-->
<!--                                                rules="required"-->
<!--                                                class="required"-->
<!--                                                v-model="price_market_typeId"-->
<!--                                                :label="$t('fair_price.references.type_of_shopping')"-->
<!--                                                value-field="type"-->
<!--                                                label-on-top-->
<!--                                        >-->
<!--                                            <b-form-select-option v-for="(item, index) in price_market_type"-->
<!--                                                                  :key="index"-->
<!--                                                                  :value="item.type">{{-->
<!--                                                getName({-->
<!--                                                  nameRu: item.nameRu,-->
<!--                                                  nameLt: item.nameLt,-->
<!--                                                  nameUz: item.nameUz,-->
<!--                                                  nameEn: item.nameEn,-->
<!--                                                })-->
<!--                                                }}-->
<!--                                            </b-form-select-option>-->
<!--                                        </BaseSelectWithValidation>-->
<!--                                    </b-col>-->
<!--                                    <b-col cols="12" md="3" class="px-3">-->
<!--                                        <BaseSelectWithValidation-->
<!--                                                rules="required"-->
<!--                                                class="required"-->
<!--                                                v-model="editingItem.marketId"-->
<!--                                                :label="$t('fair_price.references.priceMarkets')"-->
<!--                                                value-field="id"-->
<!--                                                label-on-top-->
<!--                                        >-->
<!--                                            <b-form-select-option v-for="(item, index) in price_market"-->
<!--                                                                  :key="index"-->
<!--                                                                  :value="item.id">{{-->
<!--                                                item.marketName-->
<!--                                                }}-->
<!--                                            </b-form-select-option>-->
<!--                                        </BaseSelectWithValidation>-->
<!--                                    </b-col>-->
                                    <b-col cols="12" md="3" class="px-3 mt-3">

                                        <!--                                            <Treeselect-->
                                        <!--                                                    style="color: #2b675b"-->
                                        <!--                                                    :multiple="true"-->
                                        <!--                                                    :normalizer="nrm"-->
                                        <!--                                                    :class="submitted && !productId.length ? 'tr_select_red' : 'tr_select'"-->
                                        <!--                                                    :key="'id'"-->
                                        <!--                                                    :options="price_product"-->
                                        <!--                                                    :placeholder="''"-->
                                        <!--                                                    v-model="editingItem.productId"-->
                                        <!--                                                    :clearable="true"-->
                                        <!--                                                    :searchable="true"-->
                                        <!--                                            />-->
                                        <!--                                        <BaseTreeselectWithValidation-->
                                        <!--                                            ref="parentDepVeeName"-->
                                        <!--                                            v-model="departmentId"-->
                                        <!--                                            :default-expand-level="1"-->
                                        <!--                                            :normalizer="normalizer"-->
                                        <!--                                            :options="departments ? [departments] : []"-->
                                        <!--                                            :placeholder="$t('column.department')"-->
                                        <!--                                            :show-count="true"-->
                                        <!--                                            form-label="__none"-->
                                        <!--                                            name="parentDepVeeName"-->
                                        <!--                                            not-required-->
                                        <!--                                            @close="treeClosed('parentDepVeeName')"-->
                                        <!--                                        />-->
                                       <div style="width: 90%">
                                           <BaseTreeselectWithValidation
                                               :searchable="true"
                                               :clearable="true"
                                               open-direction="bottom"
                                               vee-name="parentDepVeeName"
                                               rules="required"
                                               class="required"
                                               :placeholder="$t('fair_price.references.products')"
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
                                    <b-col cols="12" md="3" class="px-3"></b-col>
                                </b-row>
                                <b-row class="mt-3">
                                    <b-col cols="12" md="3" class="px-3">
                                        <BaseInputWithValidation
                                                v-model="editingItem.minPrice"
                                                :label="$t('fair_price.references.minimum_narx')"
                                                :placeholder="$t('fair_price.references.minimum_narx')"
                                                type="number"
                                                class="required"
                                                rules="required"
                                                label-on-top
                                        />
                                        <div class="d-flex justify-content-between">
                                            <p>{{ getNumberFormat(editingItem.minPrice) }}
                                            </p>
                                        </div>
                                    </b-col>
                                    <b-col cols="12" md="3" class="px-3">
                                        <BaseInputWithValidation
                                                v-model="editingItem.maxPrice"
                                                :label="$t('fair_price.references.maximum_narx')"
                                                :placeholder="$t('fair_price.references.maximum_narx')"
                                                type="number"
                                                class="required"
                                                rules="required"
                                                label-on-top
                                        />
                                        <div class="d-flex justify-content-between">
                                            <p>{{ getNumberFormat(editingItem.maxPrice) }}
                                            </p>
                                        </div>
                                    </b-col>
                                    <b-col cols="12" md="3" class="px-3" style="width: 100%">
                                        <BaseDatePickerWithValidation
                                                :disabled="true"
                                                required
                                                v-model="editingItem.date"
                                                format="DD-MM-YYYY"
                                                :label="$t('column.created_date')"
                                                custom-styles="grid-template-columns: 100%"
                                                label-on-top
                                        ></BaseDatePickerWithValidation>
                                    </b-col>
                                    <b-col cols="12" md="3" class="mt-3">
                                        <b-overlay
                                                :show="loader"
                                                rounded
                                                opacity="0.6"
                                                spinner-small
                                                spinner-variant="primary"
                                                class="d-inline-block float-right ml-1"
                                        >
                                            <b-btn
                                                    :disabled="loader"
                                                    class="text-capitalize float-end"
                                                    @click="saveData"
                                                    style="width: 150px; background: #2b675b; height: 35px"
                                            >
                                                {{ $t("actions.save") }}
                                            </b-btn>
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
                        </ValidationObserver>
                    </b-col>
                </b-row>
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
import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'
import Service from '../service'
import BaseSelectWithValidation from "@/components/base/BaseSelectWithValidation.vue";

const MAIN_API_URL = 'contractor-advertising-construction'
const i18n = require("@/i18n");
export default {
    page: {
        title: "Passport info",
        meta: [{name: "description", content: appConfig.description}],
    },
    components: {BaseSelectWithValidation},
    data() {
        return {
            submitted: false,
            nrm: nrm,
            loader: false,
            searchKeyword: '',
            editingItem: {},
            price_market_typeId: null,
            price_market_type: [],
            price_market: [],
            price_product: [],
        }
    },
    watch: {
        // 'price_market_typeId': {
        //     async handler() {
        //         await this.getprice_market();
        //     }
        // }
    },
    computed: {
        computedObserver () {
            return this.$refs.observer
        }
    },
    async created() {
        await this.getEmpty();
        // await this.getprice_market_type();
        await this.getprice_product();
    },
    methods: {
        saveData() {
            this.loader = true;
            Service.saveData(this.editingItem)
                .then(async () => {
                    await this.successSaved();
                    this.computedObserver.reset()
                    this.editingItem = Object.assign({}, {});
                    this.price_market_typeId = null
                })
                .finally(() => {
                    this.loader = false;
                });

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
                    this.editingItem.date = this.getDateFormat(new Date(), '-');
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
                .searchListWithKeyword('price_market', this.var_default_search_payload)
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
            await crudAndListsService.searchListWithKeyword("price_product", this.var_default_search_payload)
                .then(res => {
                    this.price_product = res.data.children
                })
                .catch(e => {
                    console.log(e)
                })
        },
    },
}
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
</style>
