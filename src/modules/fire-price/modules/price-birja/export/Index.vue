<template>
  <b-row>
    <b-col cols="12">
      <b-col md="12" class="text-center">
        <div class="h4 mb-4 d-inline-block">
          {{ $t('fire_price.birja.title') }} - {{ $t('submodules.integration.customs_product.export') }}
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
                <download-excel
                    :data="json_data"
                    :fields="json_fields"
                    :header="$t('submodules.integration.customs_product.title')"
                    worksheet="My Worksheet"
                    :name="`${$t('submodules.integration.customs_product.title')}.xls`"
                >
                  <b-btn @click="downloadExcel" class="mb-2" type="primary" rounded>
                    <i class="mdi mdi-microsoft-excel me-1"></i> {{ $t('actions.download') }}
                  </b-btn>
                </download-excel>
              </div>
            </div>
            <div class="ml-1 d-inline-block">
              <div class="text-sm-end float-right">
                <b-btn @click="downloadAllExcel" class="mb-2" type="primary" rounded>
                  <i class="mdi mdi-microsoft-excel me-1"></i> {{ $t('actions.download_all_excel') }}
                </b-btn>
              </div>
            </div>
          </b-row>
          <b-table
              :items="tableItems" :fields="tableFields" :busy="loadingTableItems" id="my-table"
              class="custom-b-table" responsive striped bordered small hover show-empty
          >
            <template #top-row>
              <b-th/>
              <b-th variant="secondary">
                <BaseDateRangePickerWithValidation
                    v-model="infoDateOfIssueRange"
                    only-form-element
                    append-to-body
                    show-clear-button
                    @on-clear="clearDateOfIssueRange"
                    :opens="'right'"
                    custom-styles="grid-template-columns: 100%;"
                    :disabled="loadingTableItems"
                />
              </b-th>
              <b-th variant="secondary">
                <BaseInputWithValidation
                    v-model="filter.infoMode"
                    only-form-element
                    custom-styles="grid-template-columns: 100%;"
                    :disabled="loadingTableItems"
                    @change="fetchTableItems"
                />
              </b-th>
              <b-th variant="secondary">
                <BaseInputWithValidation
                    v-model="filter.infoShipperAddress"
                    only-form-element
                    custom-styles="grid-template-columns: 100%;"
                    :disabled="loadingTableItems"
                    @change="fetchTableItems"
                />
              </b-th>
              <b-th variant="secondary">
                <BaseInputWithValidation
                    v-model="filter.infoShipperName"
                    only-form-element
                    custom-styles="grid-template-columns: 100%;"
                    :disabled="loadingTableItems"
                    @change="fetchTableItems"
                />
              </b-th>
              <b-th variant="secondary">
                <BaseInputWithValidation
                    v-model="filter.tifTnCode"
                    only-form-element
                    custom-styles="grid-template-columns: 100%;"
                    :disabled="loadingTableItems"
                    @change="fetchTableItems"
                />
              </b-th>
              <b-th variant="secondary">
                <BaseInputWithValidation
                    v-model="filter.productName"
                    only-form-element
                    custom-styles="grid-template-columns: 100%;"
                    :disabled="loadingTableItems"
                    @change="fetchTableItems"
                />
              </b-th>
              <b-th variant="secondary">
                <BaseInputWithValidation
                    v-model="filter.unitName"
                    only-form-element
                    custom-styles="grid-template-columns: 100%;"
                    :disabled="loadingTableItems"
                    @change="fetchTableItems"
                />
              </b-th>
              <b-th variant="secondary">
                <BaseInputWithValidation
                    v-model="filter.productWeight"
                    only-form-element
                    custom-styles="grid-template-columns: 100%;"
                    :disabled="loadingTableItems"
                    @change="fetchTableItems"
                />
              </b-th>
              <b-th variant="secondary">
                <BaseInputWithValidation
                    v-model="filter.productWeightUnit"
                    only-form-element
                    custom-styles="grid-template-columns: 100%;"
                    :disabled="loadingTableItems"
                    @change="fetchTableItems"
                />
              </b-th>
              <b-th variant="secondary">
                <BaseInputWithValidation
                    v-model="filter.productStatisticalValue"
                    only-form-element
                    custom-styles="grid-template-columns: 100%;"
                    :disabled="loadingTableItems"
                    @change="fetchTableItems"
                />
              </b-th>
              <b-th variant="secondary">
                <BaseInputWithValidation
                    v-model="filter.productStatisticalValueUnit"
                    only-form-element
                    custom-styles="grid-template-columns: 100%;"
                    :disabled="loadingTableItems"
                    @change="fetchTableItems"
                />
              </b-th>
              <b-th variant="secondary">
                <BaseInputWithValidation
                    v-model="filter.productAmount"
                    only-form-element
                    custom-styles="grid-template-columns: 100%;"
                    :disabled="loadingTableItems"
                    @change="fetchTableItems"
                />
              </b-th>
              <b-th variant="secondary">
                <BaseInputWithValidation
                    v-model="filter.infoDollarExchangeRate"
                    only-form-element
                    custom-styles="grid-template-columns: 100%;"
                    :disabled="loadingTableItems"
                    @change="fetchTableItems"
                />
              </b-th>
              <b-th variant="secondary">
                <BaseInputWithValidation
                    v-model="filter.infoConsigneeName"
                    only-form-element
                    custom-styles="grid-template-columns: 100%;"
                    :disabled="loadingTableItems"
                    @change="fetchTableItems"
                />
              </b-th>
              <b-th variant="secondary">
                <BaseInputWithValidation
                    v-model="filter.infoConsigneeAddress"
                    only-form-element
                    custom-styles="grid-template-columns: 100%;"
                    :disabled="loadingTableItems"
                    @change="fetchTableItems"
                />
              </b-th>
              <b-th/>
            </template>
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
            <template #cell(actions)="data">
              <div class="general-table__actions d-flex justify-content-center">
                <b-btn
                    variant="link"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                >
                  <i @click="viewItem(data.item.id)" class="mdi mdi-eye-outline"/>
                </b-btn>
              </div>
            </template>

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

const MAIN_API_URL = 'customs-product'
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
      loadingTableItems: false,
      json_fields: {
        [this.$t('submodules.integration.customs_product.infoDateOfIssue')]: 'infoDateOfIssue',
        [this.$t('submodules.integration.customs_product.infoMode')]: 'infoMode',
        [this.$t('submodules.integration.customs_product.infoShipperAddress')]: 'infoShipperAddress',
        [this.$t('submodules.integration.customs_product.infoShipperName')]: 'infoShipperName',
        [this.$t('submodules.integration.customs_product.tifTnCode')]: 'tifTnCode',
        [this.$t('submodules.integration.customs_product.productName')]: 'productName',
        [this.$t('submodules.integration.customs_product.unitName')]: 'unitName',
        [this.$t('submodules.integration.customs_product.productWeight')]: 'productWeight',
        [this.$t('submodules.integration.customs_product.productWeightUnit')]: 'productWeightUnit',
        [this.$t('submodules.integration.customs_product.productStatisticalValue')]: 'productStatisticalValue',
        [this.$t('submodules.integration.customs_product.productStatisticalValueUnit')]: 'productStatisticalValueUnit',
        [this.$t('submodules.integration.customs_product.productAmount')]: 'productAmount',
        [this.$t('submodules.integration.customs_product.infoDollarExchangeRate')]: 'infoDollarExchangeRate',
        [this.$t('submodules.integration.customs_product.infoConsigneeName')]: 'infoConsigneeName',
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
        { value: 20, text: 20 },
        { value: 50, text: 50 },
        { value: 100, text: 100 },
        { value: 150, text: 150 },
        { value: 200, text: 200 },
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
          label: this.$t('submodules.integration.customs_product.infoDateOfIssue'),
          key: 'infoDateOfIssue',
          thStyle: {
            minWidth: '230px',
          },
        },
        {
          label: this.$t('submodules.integration.customs_product.infoMode'),
          key: 'infoMode',
          thStyle: {
            minWidth: '100px',
          },
        },
        {
          label: this.$t('submodules.integration.customs_product.infoShipperAddress'),
          key: 'infoShipperAddress',
          thStyle: {
            minWidth: '120px',
          },
        },
        {
          label: this.$t('submodules.integration.customs_product.infoShipperName'),
          key: 'infoShipperName',
          thStyle: {
            minWidth: '120px',
          },
        },
        {
          label: this.$t('submodules.integration.customs_product.tifTnCode'),
          key: 'tifTnCode',
          thStyle: {
            minWidth: '100px',
          },
        },
        {
          label: this.$t('submodules.integration.customs_product.productName'),
          key: 'productName',
          thStyle: {
            minWidth: '200px',
          },
        },
        {
          label: this.$t('submodules.integration.customs_product.unitName'),
          key: 'unitName',
          thStyle: {
            minWidth: '100px',
          },
        },
        {
          label: this.$t('submodules.integration.customs_product.productWeight'),
          key: 'productWeight',
          thStyle: {
            minWidth: '100px',
          },
        },
        {
          label: this.$t('submodules.integration.customs_product.productWeightUnit'),
          key: 'productWeightUnit',
          thStyle: {
            minWidth: '100px',
          },
        },
        {
          label: this.$t('submodules.integration.customs_product.productStatisticalValue'),
          key: 'productStatisticalValue',
          thStyle: {
            minWidth: '140px',
          },
        },
        {
          label: this.$t('submodules.integration.customs_product.productStatisticalValueUnit'),
          key: 'productStatisticalValueUnit',
          thStyle: {
            minWidth: '140px',
          },
        },
        {
          label: this.$t('submodules.integration.customs_product.productAmount'),
          key: 'productAmount',
          thStyle: {
            minWidth: '140px',
          },
        },
        {
          label: this.$t('submodules.integration.customs_product.infoDollarExchangeRate'),
          key: 'infoDollarExchangeRate',
          thStyle: {
            minWidth: '150px',
          },
        },
        {
          label: this.$t('submodules.integration.customs_product.infoConsigneeName'),
          key: 'infoConsigneeName',
          thStyle: {
            minWidth: '150px',
          },
        },

        {
          label: this.$t('submodules.integration.customs_product.infoConsigneeAddress'),
          key: 'infoConsigneeAddress',
          thStyle: {
            minWidth: '150px',
          },
        },

        // {label: this.$t('submodules.integration.customs_product.productStatisticalValue'), key: 'productStatisticalValue',},
        // {label: this.$t('submodules.integration.customs_product.productStatisticalValueUnit'), key: 'productStatisticalValueUnit',},
        {
          label: this.$t('column.actions'),
          key: "actions",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false
        },
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
        const file_name = `${this.$t('submodules.integration.customs_product.title')} ${this.$t('submodules.integration.customs_product.export')} - ${new Date().toISOString().slice(0,10)}.xlsx`;
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
      this.var_default_search_payload.sortDesc = [false];
      this.var_default_search_payload.sortBy = ['productName'];
      this.searchListWithKeyword(MAIN_API_URL, this.var_default_search_payload, this.filter)
          .then((res) => {
            this.tableItems = res.data.list;
            this.totalItems = res.data.total;
            this.loadingTableItems = false
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
    generatePayloadUrl(requestParams){
      return '?' + Object.keys(requestParams).map(key => {
        if (requestParams[key]) {
          return key + '=' + requestParams[key]
        }
      }).filter(v => !!v).join('&');
    },
    searchListWithKeyword(mainUrl, payload, requestParams = {}, withLoader = false) {
      let myPayload = Object.assign({}, payload)
      myPayload.page -= 1
      let url = mainUrl + '/list-search/export';
      if (requestParams) {
        url += this.generatePayloadUrl(requestParams);
      }
      return ApiService.post(url, myPayload, withLoader);
    },
    viewItem(id) {
      this.$router.push({ name: 'ViewIntegrationCustomsProductExport', params: { id: id } })
    },
  },
  created() {
    this.fetchTableItems()
  },
  watch: {
    'var_default_search_payload.page': {
      handler() {
        this.fetchTableItems()
      },
      deep: true
    },
    infoDateOfIssueRange(){
      if (this.infoDateOfIssueRange.startDate) {
        this.filter.fromDate = this.getDateFormat(this.infoDateOfIssueRange.startDate, '-');
      }
      if (this.infoDateOfIssueRange.endDate) {
        this.filter.toDate = this.getDateFormat(this.infoDateOfIssueRange.endDate, '-');
      }
      this.fetchTableItems();
    }
  }
};
</script>

<style scoped lang='scss'>
</style>