<template>
  <b-row>
    <b-col cols="12">
        <div class="col-md-12 text-sm-start">
            <b-button class="btn btn-warning" size="md" @click="$router.push({name: 'IntegrationMenuIndex'})">
                {{ $t("actions.back") }}
            </b-button>
        </div>
      <b-col md="12" class="text-center">
        <div class="h4 mb-4 d-inline-block">
          {{ $t('submodules.integration.iqtisodiy_taraqqiyot_info.info3') }}
        </div>
      </b-col>
      <b-col md="12">
        <div class="mb-4">
          <b-card-group deck>
            <b-card @click="$router.push({name: 'IntegrationIqtisodiyTaraqqiyotInfo1Index'})" style="cursor: pointer"
                    bg-variant="primary" text-variant="white" no-header class="text-center">
              <b-card-text>{{ $t('submodules.integration.iqtisodiy_taraqqiyot_info.info1') }}</b-card-text>
            </b-card>

            <b-card @click="$router.push({name: 'IntegrationIqtisodiyTaraqqiyotInfo2Index'})" style="cursor: pointer"
                    bg-variant="warning" text-variant="white" class="text-center">
              <b-card-text>{{ $t('submodules.integration.iqtisodiy_taraqqiyot_info.info2') }}</b-card-text>
            </b-card>

            <b-card @click="$router.push({name: 'IntegrationIqtisodiyTaraqqiyotInfo3Index'})" style="cursor: pointer"
                    bg-variant="success" text-variant="white" class="text-center">
              <b-card-text>{{ $t('submodules.integration.iqtisodiy_taraqqiyot_info.info3') }}</b-card-text>
            </b-card>
          </b-card-group>
        </div>
      </b-col>
      <b-card>
        <b-card-body>
          <b-row class="mb-2">
            <div class="d-inline-block">
              <div class="search-box me-4 mb-2 d-inline-block">
                <div class="position-relative">
                  <b-input
                      v-model="searchKeyword"
                      type="text"
                      class="form-control"
                      @input="fetchTableItems"
                      :placeholder="$t('column.search')"
                  />
                  <i class="bx bx-search-alt search-icon"></i>
                </div>
              </div>
              <span>{{ $t('column.select.text1') }}</span>
              <b-col cols="2" class="me-2 mx-2 d-inline-block">
                <div class="position-relative">
                  <b-form-select
                      v-model="selected"
                      :options="optionsTable"
                      @change="selectList"
                      class="form-select"
                  ></b-form-select>
                </div>
              </b-col>
              <span>{{ $t('column.select.text2') }}</span>
            </div>
            <div class="d-inline-block">
              <div class="text-sm-end float-right">
<!--                <download-excel-->
<!--                    :data="json_data"-->
<!--                    :fields="json_fields"-->
<!--                    :header="$t('submodules.integration.iqtisodiy_taraqqiyot_info.info1')"-->
<!--                    worksheet="My Worksheet"-->
<!--                    :name="`${$t('submodules.integration.iqtisodiy_taraqqiyot_info.info1')}.xls`"-->
<!--                >-->
<!--                  <b-btn @click="downloadExcel" class="mb-2" type="primary" rounded>-->
<!--                    <i class="mdi mdi-microsoft-excel me-1"></i> {{ $t('actions.download') }}-->
<!--                  </b-btn>-->
<!--                </download-excel>-->
              </div>
            </div>
            <BaseDatePickerWithValidation
                :placeholder="$t('column.date')"
                lang="en"
                format="DD-MM-YYYY"
                v-model="period_date"
            ></BaseDatePickerWithValidation>
            <!--            <div class="ml-1 d-inline-block">-->
            <!--              <div class="text-sm-end float-right">-->
            <!--                <b-btn @click="downloadAllExcel" class="mb-2" type="primary" rounded>-->
            <!--                  <i class="mdi mdi-microsoft-excel me-1"></i> {{ $t('actions.download_all_excel') }}-->
            <!--                </b-btn>-->
            <!--              </div>-->
            <!--            </div>-->
          </b-row>
          <b-table
              :items="tableItems" :fields="tableFields" :busy="loadingTableItems" id="my-table"
              class="custom-b-table" responsive striped bordered small hover show-empty
          >
            <!--            <template #top-row>-->
            <!--              <b-th/>-->
            <!--              <b-th variant="secondary">-->
            <!--                <BaseDateRangePickerWithValidation-->
            <!--                    v-model="infoDateOfIssueRange"-->
            <!--                    only-form-element-->
            <!--                    append-to-body-->
            <!--                    show-clear-button-->
            <!--                    @on-clear="clearDateOfIssueRange"-->
            <!--                    :opens="'right'"-->
            <!--                    custom-styles="grid-template-columns: 100%;"-->
            <!--                    :disabled="loadingTableItems"-->
            <!--                />-->
            <!--              </b-th>-->
            <!--              <b-th variant="secondary">-->
            <!--                <BaseInputWithValidation-->
            <!--                    v-model="filter.infoMode"-->
            <!--                    only-form-element-->
            <!--                    custom-styles="grid-template-columns: 100%;"-->
            <!--                    :disabled="loadingTableItems"-->
            <!--                    @change="fetchTableItems"-->
            <!--                />-->
            <!--              </b-th>-->
            <!--              <b-th variant="secondary">-->
            <!--                <BaseInputWithValidation-->
            <!--                    v-model="filter.infoShipperAddress"-->
            <!--                    only-form-element-->
            <!--                    custom-styles="grid-template-columns: 100%;"-->
            <!--                    :disabled="loadingTableItems"-->
            <!--                    @change="fetchTableItems"-->
            <!--                />-->
            <!--              </b-th>-->
            <!--              <b-th variant="secondary">-->
            <!--                <BaseInputWithValidation-->
            <!--                    v-model="filter.infoShipperName"-->
            <!--                    only-form-element-->
            <!--                    custom-styles="grid-template-columns: 100%;"-->
            <!--                    :disabled="loadingTableItems"-->
            <!--                    @change="fetchTableItems"-->
            <!--                />-->
            <!--              </b-th>-->
            <!--              <b-th variant="secondary">-->
            <!--                <BaseInputWithValidation-->
            <!--                    v-model="filter.tifTnCode"-->
            <!--                    only-form-element-->
            <!--                    custom-styles="grid-template-columns: 100%;"-->
            <!--                    :disabled="loadingTableItems"-->
            <!--                    @change="fetchTableItems"-->
            <!--                />-->
            <!--              </b-th>-->
            <!--              <b-th variant="secondary">-->
            <!--                <BaseInputWithValidation-->
            <!--                    v-model="filter.productName"-->
            <!--                    only-form-element-->
            <!--                    custom-styles="grid-template-columns: 100%;"-->
            <!--                    :disabled="loadingTableItems"-->
            <!--                    @change="fetchTableItems"-->
            <!--                />-->
            <!--              </b-th>-->
            <!--              <b-th variant="secondary">-->
            <!--                <BaseInputWithValidation-->
            <!--                    v-model="filter.unitName"-->
            <!--                    only-form-element-->
            <!--                    custom-styles="grid-template-columns: 100%;"-->
            <!--                    :disabled="loadingTableItems"-->
            <!--                    @change="fetchTableItems"-->
            <!--                />-->
            <!--              </b-th>-->
            <!--              <b-th variant="secondary">-->
            <!--                <BaseInputWithValidation-->
            <!--                    v-model="filter.productWeight"-->
            <!--                    only-form-element-->
            <!--                    custom-styles="grid-template-columns: 100%;"-->
            <!--                    :disabled="loadingTableItems"-->
            <!--                    @change="fetchTableItems"-->
            <!--                />-->
            <!--              </b-th>-->
            <!--              <b-th variant="secondary">-->
            <!--                <BaseInputWithValidation-->
            <!--                    v-model="filter.productWeightUnit"-->
            <!--                    only-form-element-->
            <!--                    custom-styles="grid-template-columns: 100%;"-->
            <!--                    :disabled="loadingTableItems"-->
            <!--                    @change="fetchTableItems"-->
            <!--                />-->
            <!--              </b-th>-->
            <!--              <b-th variant="secondary">-->
            <!--                <BaseInputWithValidation-->
            <!--                    v-model="filter.productStatisticalValue"-->
            <!--                    only-form-element-->
            <!--                    custom-styles="grid-template-columns: 100%;"-->
            <!--                    :disabled="loadingTableItems"-->
            <!--                    @change="fetchTableItems"-->
            <!--                />-->
            <!--              </b-th>-->
            <!--              <b-th variant="secondary">-->
            <!--                <BaseInputWithValidation-->
            <!--                    v-model="filter.productStatisticalValueUnit"-->
            <!--                    only-form-element-->
            <!--                    custom-styles="grid-template-columns: 100%;"-->
            <!--                    :disabled="loadingTableItems"-->
            <!--                    @change="fetchTableItems"-->
            <!--                />-->
            <!--              </b-th>-->
            <!--              <b-th variant="secondary">-->
            <!--                <BaseInputWithValidation-->
            <!--                    v-model="filter.productAmount"-->
            <!--                    only-form-element-->
            <!--                    custom-styles="grid-template-columns: 100%;"-->
            <!--                    :disabled="loadingTableItems"-->
            <!--                    @change="fetchTableItems"-->
            <!--                />-->
            <!--              </b-th>-->
            <!--              <b-th variant="secondary">-->
            <!--                <BaseInputWithValidation-->
            <!--                    v-model="filter.infoDollarExchangeRate"-->
            <!--                    only-form-element-->
            <!--                    custom-styles="grid-template-columns: 100%;"-->
            <!--                    :disabled="loadingTableItems"-->
            <!--                    @change="fetchTableItems"-->
            <!--                />-->
            <!--              </b-th>-->
            <!--              <b-th variant="secondary">-->
            <!--                <BaseInputWithValidation-->
            <!--                    v-model="filter.infoConsigneeName"-->
            <!--                    only-form-element-->
            <!--                    custom-styles="grid-template-columns: 100%;"-->
            <!--                    :disabled="loadingTableItems"-->
            <!--                    @change="fetchTableItems"-->
            <!--                />-->
            <!--              </b-th>-->
            <!--              <b-th variant="secondary">-->
            <!--                <BaseInputWithValidation-->
            <!--                    v-model="filter.infoConsigneeAddress"-->
            <!--                    only-form-element-->
            <!--                    custom-styles="grid-template-columns: 100%;"-->
            <!--                    :disabled="loadingTableItems"-->
            <!--                    @change="fetchTableItems"-->
            <!--                />-->
            <!--              </b-th>-->
            <!--              <b-th/>-->
            <!--            </template>-->
            <!-- NUMBER OF ITEM -->
            <template #cell(index)="data">
              {{ util_paginate(data.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage) }}
            </template>

            <template #cell(infoDateOfIssue)="data">
              <p>
                {{ getDateFormat(data.item.infoDateOfIssue) }}
              </p>
            </template>
            <!-- STATUS -->
            <template #cell(status)="data">
              <p>
                {{
                  getName({
                    nameRu: data.item.statusNameRu,
                    nameLt: data.item.statusNameLt,
                    nameUz: data.item.statusNameUz,
                  })
                }}
              </p>
            </template>

            <!-- ACTIONS -->
            <!--            <template #cell(actions)="data">-->
            <!--              <div class="general-table__actions d-flex justify-content-center">-->
            <!--                <b-btn-->
            <!--                    variant="link"-->
            <!--                    class="text-decoration-none p-0"-->
            <!--                    style="font-size: 1.2rem; margin-right: 1rem;"-->
            <!--                >-->
            <!--                  <i @click="viewItem(data.item.id)" class="mdi mdi-eye-outline"/>-->
            <!--                </b-btn>-->
            <!--              </div>-->
            <!--            </template>-->

            <!-- EMPTY SLOT -->
            <template #empty="">
              <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
            </template>

            <!-- TABLE_BUSY SLOT -->
            <template #table-busy>
              <div class="text-center my-2">
                <b-spinner
                    variant="primary"
                    class="align-middle"
                />
              </div>
            </template>
          </b-table>
          <b-pagination
              v-model="var_default_search_payload.page"
              :total-rows="totalItems"
              :per-page="var_default_search_payload.itemsPerPage"
              aria-controls="my-table"
              class="justify-content-end"
          ></b-pagination>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import ApiService from "@/shared/services/api.service";
import integratsiyaService from "@/shared/services/integratsiya.service";

const MAIN_API_URL = 'iqtisodiyot-vazirlik'
/**
 id: 300
 infoConsigneeAddress: null
 infoConsigneeName: null
 infoCustomsId: "16f5a726f29_ad_mgtd"
 infoDateOfIssue: null
 infoDollarExchangeRate: null
 infoId: 32
 infoInformationDate: 1655382055000
 infoMode: null
 infoShipperAddress: null
 infoShipperName: null
 infoStatusId: null
 infoStatusName: null
 productAmount: null
 productName: null
 productStatisticalValue: null
 productStatisticalValueUnit: null
 productWeight: null
 productWeightUnit: null
 sequenceNumber: null
 tifTnCode: null
 unitId: null
 unitIdFromDBQ: null
 unitName: null
 unitShortName: null
 */
export default {
  components: {},
  data() {
    return {
      period_date: new Date().ddmmyyyy(),
      loadingTableItems: false,
      json_fields: {
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.product_name')]: 'product_name',
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.maxsulot_navi')]: 'Mahsulot_turi_va_navi',
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.olchov_birligi')]: 'Olchov_birligi',
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.minimum')]: 'Minimal_narxi',
        [this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.maximal')]: 'Maksimal_narxi',
      },
      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      searchKeyword: '',
      selected: 20,
      optionsTable: [
        {value: 20, text: 20},
        {value: 50, text: 50},
        {value: 100, text: 100},
        {value: 150, text: 150},
        {value: 200, text: 200},
      ],
      activeDep: {},
      changeIndex: {
        firstItemId: null,
        secondItemId: null,
      },
      infoDateOfIssueRange: {},
      filter: {
        fromDate: null,
        toDate: null,
        infoDateOfIssue: null,
        infoMode: null,
        infoShipperAddress: null,
        infoShipperName: null,
        tifTnCode: null,
        productName: null,
        unitName: null,
        productWeight: null,
        productWeightUnit: null,
        productAmount: null,
        infoDollarExchangeRate: null,
        infoConsigneeName: null,
        infoConsigneeAddress: null,
        productStatisticalValue: null,
        productStatisticalValueUnit: null,
      },
      tableItems: [],
      totalItems: 0,
      tableFields: [
        {
          label: "#",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
          key: "index",
        },
        {
          label: this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.product_name'),
          key: 'product_name',
          thStyle: {
            minWidth: '230px',
          },
        },
        {
          label: this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.maxsulot_navi'),
          key: 'Mahsulot_turi_va_navi',
          thStyle: {
            minWidth: '100px',
          },
        },
        {
          label: this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.olchov_birligi'),
          key: 'Olchov_birligi',
          thStyle: {
            minWidth: '120px',
          },
        },
        {
          label: this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.minimum'),
          key: 'Minimal_narxi',
          thStyle: {
            minWidth: '120px',
          },
        },
        {
          label: this.$t('submodules.integration.iqtisodiy_taraqqiyot_info.fields.maximal'),
          key: 'Maksimal_narxi',
          thStyle: {
            minWidth: '120px',
          },
        },
        // {
        //   label: this.$t('column.actions'),
        //   key: "actions",
        //   thClass: "text-center",
        //   tdClass: "text-center",
        //   sortable: false
        // },
      ],
    };
  },
  computed: {
    numberOfPages() {
      return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
    }
  },
  methods: {
    async downloadExcel() {
      this.json_data = this.tableItems.map((item, index) => {
        return {
          ...item,
          infoDateOfIssue: item.infoDateOfIssue ? this.getDateFormat(item.infoDateOfIssue) : '',
          infoInformationDate: item.infoInformationDate ? this.getDateFormat(item.infoInformationDate) : '',
        }
      });
    },
    async downloadAllExcel() {
      let url = MAIN_API_URL + '/excel-download'
      this.filter.type = "EXPORT"
      if (this.filter) {
        url += this.generatePayloadUrl(this.filter);
      }
      return ApiService.responseTypeBlob(url, true).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        const file_name = `${this.$t('submodules.integration.customs_product.title')} ${this.$t('submodules.integration.customs_product.export')} - ${new Date().toISOString().slice(0, 10)}.xlsx`;
        link.href = url;
        link.setAttribute('download', file_name);
        document.body.appendChild(link);
        link.click();
      });
    },
    selectList($event) {
      if ($event === 'all') {
        this.var_default_search_payload.itemsPerPage = this.totalItems
      } else {
        this.var_default_search_payload.itemsPerPage = $event
      }
      this.fetchTableItems();
    },
    fetchTableItems() {
      this.loadingTableItems = true
      this.var_default_search_payload.keyword = this.searchKeyword

      integratsiyaService.getIstisodiyotInformation3(this.period_date, true)
          .then(res => {
            this.tableItems = res.data;
            this.totalItems = res.data.length;
            this.loadingTableItems = false
            this.var_default_search_payload.itemsPerPage = this.totalItems
          })
          .catch(e => {
            this.tableItems = [];
            this.totalItems = 0;
            this.loadingTableItems = false
          })
    },
    clearDateOfIssueRange() {
      this.filter.fromDate = null
      this.filter.toDate = null
      this.infoDateOfIssueRange = {}
    },
    generatePayloadUrl(requestParams) {
      return '?' + Object.keys(requestParams).map(key => {
        if (requestParams[key]) {
          return key + '=' + requestParams[key]
        }
      }).filter(v => !!v).join('&');
    },
    searchListWithKeyword(mainUrl, payload, requestParams = {}, withLoader = false) {
      let myPayload = Object.assign({}, payload)
      myPayload.page -= 1
      let url = mainUrl + '/get-information-1';
      if (requestParams) {
        url += this.generatePayloadUrl(requestParams);
      }
      return ApiService.post(url, myPayload, withLoader);
    },
    viewItem(id) {
      this.$router.push({name: 'ViewIntegrationCustomsProductExport', params: {id: id}})
    },
  },
  created() {
    this.fetchTableItems()
  },
  watch: {
    'var_default_search_payload.page':
        {
          handler() {
            this.fetchTableItems()
          }
          ,
          deep: true
        },
    'period_date': {
      handler() {
        this.fetchTableItems()
      }
    },
    infoDateOfIssueRange() {
      if (this.infoDateOfIssueRange.startDate) {
        this.filter.fromDate = this.getDateFormat(this.infoDateOfIssueRange.startDate, '-');
      }
      if (this.infoDateOfIssueRange.endDate) {
        this.filter.toDate = this.getDateFormat(this.infoDateOfIssueRange.endDate, '-');
      }
      this.fetchTableItems();
    }
  }
}
;
</script>

<style scoped lang='scss'>
</style>