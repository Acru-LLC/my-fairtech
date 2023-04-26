<template>
  <div class="row">
    <div class="col-12">
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.integration.statistics_info.title') }}</div>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="row mb-2">
            <div class="col-md-12">
              <div class="row mb-2">
                <div class="col-md-3">
                  <base-multiselect-with-validation
                      v-model="params.regionSoatos"
                      class="required"
                      multiple
                      label-on-top
                      placeholder=""
                      preserve-search
                      with-create-addition
                      open-direction="bottom"
                      :label="$t('submodules.integration.statistics_info.saoto_name')"
                      :required="true"
                      :max-height="600"
                      :searchable="true"
                      :show-labels="false"
                      :clear-on-select="false"
                      :close-on-select="false"
                      :internal-search="false"
                      :custom-label="customLabelRegions"
                      :custom-styles="{display: 'block'}"
                      :options="computedRegionOption"
                  />
                </div>
                <div class="col-md-3">
                  <base-multiselect-with-validation
                      v-model="params.districtSoatos"
                      multiple
                      not-required
                      label-on-top
                      placeholder=""
                      preserve-search
                      with-create-addition
                      open-direction="bottom"
                      :label="$t('submodules.integration.statistics_info.district_name')"
                      :disabled="!params.regionSoatos.length"
                      :max-height="600"
                      :searchable="true"
                      :show-labels="false"
                      :clear-on-select="false"
                      :close-on-select="false"
                      :internal-search="false"
                      :custom-label="customLabelDistrict"
                      :custom-styles="{display: 'block'}"
                      :options="computedDistrictOption"
                  />
                </div>
                <div class="col-md-3">
                  <base-multiselect-with-validation
                      v-model="params.productCodes"
                      multiple
                      not-required
                      label-on-top
                      placeholder=""
                      preserve-search
                      with-create-addition
                      open-direction="bottom"
                      :label="$t('submodules.integration.statistics_info.tovar')"
                      :max-height="600"
                      :searchable="true"
                      :show-labels="false"
                      :clear-on-select="false"
                      :close-on-select="false"
                      :custom-label="customLabelProducts"
                      :custom-styles="{display: 'block'}"
                      :options="productList.map((e) => e.productCode)"
                  />
                </div>
                <div class="col-md-3">
                  {{ $t('submodules.integration.statistics_info.date_inter') }}
                  <BaseDatePickerWithValidation
                      v-model="params.issueDate"
                      only-form-element
                      not-required
                  />
                </div>
                <div class="col-md-12 text-right my-2">
                  <span v-if="!params.regionSoatos.length"
                        class="text-pink">{{ $t('submodules.integration.statistics_info.select_a_province_and_search_for_information')
                    }}</span>
                  <download-excel
                      class="d-inline px-2"
                      :data="json_data"
                      :fields="json_fields"
                      :header="$t('submodules.integration.statistics_info.title')"
                      :name="`${$t('submodules.integration.statistics_info.title')}.xls`"
                      :worksheet="$t('submodules.integration.statistics_info.title')"
                  >
                    <b-btn
                        class="btn bg-primary"
                        type="button"
                        @click="downloadExcel"
                    >
                      <i class="mdi mdi-microsoft-excel me-1"></i> {{ $t('actions.download') }}
                    </b-btn>
                  </download-excel>
                  <b-btn variant="success" @click="fetchTableItems">
                    {{ $t('actions.search') }}
                  </b-btn>
                </div>
              </div>
              <b-table
                  id="my-table"
                  :busy="loadingTableItems"
                  :fields="tableFields"
                  :items="tableItems"
                  bordered
                  class="custom-b-table"
                  hover
                  responsive
                  show-empty
                  small
                  striped
              >
                <template #cell(index)="data">
                  {{ util_paginate(data.index, var_default_search_payload.page, totalItems) }}
                </template>
                <template #cell(actions)="data">
                  <div class="general-table__actions d-flex justify-content-center">
                    <b-btn class="text-decoration-none p-0" style="font-size:1.2rem;margin-right:1rem" variant="link">
                      <i class="mdi mdi-circle-edit-outline edit" @click="confirmItem(data.item)"/>
                    </b-btn>
                  </div>
                </template>
                <template #cell(issueDate)="data">
                  {{ getDateFormat(data.item.issueDate) }}
                </template>
                <template #empty="">
                  <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
                </template>
                <template #table-busy>
                  <div class="text-center my-2">
                    <b-spinner class="align-middle" variant="primary"></b-spinner>
                  </div>
                </template>
              </b-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const MAIN_API_URL = '/statistics-info'
const INTEGRATION_API_URL = '/statistics-info/deploy-information'
import statisticsService from '@/shared/services/integration/statistics.service'

export default {
  components: {},
  data() {
    return {
      loadingTableItems: false,
      json_fields: {
        [this.$t('submodules.integration.statistics_info.saoto_name')]: 'regionName',
        [this.$t('submodules.integration.statistics_info.district_name')]: 'districtName',
        [this.$t('submodules.integration.statistics_info.tovar')]: 'productName',
        [this.$t('submodules.integration.statistics_info.code_tovar')]: 'productCode',
        [this.$t('submodules.integration.statistics_info.price')]: 'price',
        [this.$t('submodules.integration.statistics_info.date_inter')]: 'issueDate',
      },
      json_data: [],
      json_meta: [
        [{ key: "charset", value: "utf-8" }],
      ],
      searchKeyword: '',
      optionsTable: [
        { value: 20, text: 20 },
        { value: 50, text: 50 },
        { value: 100, text: 100 },
        { value: 150, text: 150 },
        { value: 200, text: 200 },
      ],
      activeDep: {},
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
          label: this.$t('submodules.integration.statistics_info.saoto_name'),
          key: "regionName"
        },
        {
          label: this.$t('submodules.integration.statistics_info.district_name'),
          key: "districtName"
        },
        { label: this.$t('submodules.integration.statistics_info.tovar'), key: "productName" },
        { label: this.$t('submodules.integration.statistics_info.code_tovar'), key: "productCode" },
        { label: this.$t('submodules.integration.statistics_info.price'), key: "price" },
        { label: this.$t('submodules.integration.statistics_info.date_inter'), key: "issueDate" },

        // { label: this.$t('submodules.integration.statistics_info.soato'), key: "soato" },
        // { label: this.$t('submodules.integration.statistics_info.saoto_name'), key: "regionName" },
        // {
        //   label: this.$t('column.actions'),
        //   key: "actions",
        //   thClass: "text-center",
        //   tdClass: "text-center",
        //   sortable: false
        // },
      ],
      searchInterval: null,
      regionsList: [],
      districtsList: [],
      productList: [],
      params: {
        page: 1,
        size: 100,
        productCodes: [],
        regionSoatos: [],
        districtSoatos: [],
        issueDate: null,
      }
    };
  },
  computed: {
    numberOfPages() {
      return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
    },
    computedRegionOption() {
      return ['--all', ...this.regionsList.map((e) => e.regionId)]
    },
    computedDistrictOption() {
      return ['--all', ...this.districtsList.map((e) => e.districtId)]
    },
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    downloadExcel() {
      this.json_data = this.tableItems
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
      if (!this.params.regionSoatos.length) return;
      this.loadingTableItems = true;
      let regionSoatos = this.regionsList.filter(({ regionId }) => this.params.regionSoatos?.includes(regionId)).map(({ soato }) => soato);
      let districtSoatos = this.districtsList.filter(({ districtId }) => this.params.districtSoatos?.includes(districtId)).map(({ soato }) => soato);
      statisticsService.getStatisticInfoListWithFilter(regionSoatos || '', districtSoatos || '', this.params.productCodes || '', this.params.issueDate || '', true)
          .then((res) => {
            if (res.data) {
              this.tableItems = res.data.map(item => ({
                regionName: this.getName({
                  nameUz: item.regionNameUz,
                  nameRu: item.regionNameRu,
                  nameEn: item.regionNameEn,
                  nameLt: item.regionNameLt,
                }),
                districtName: this.getName({
                  nameUz: item.districtNameUz,
                  nameRu: item.districtNameRu,
                  nameEn: item.districtNameEn,
                  nameLt: item.districtNameLt,
                }),
                districtSoato: item.districtSoato,
                issueDate: item.issueDate,
                price: item.price,
                productCode: item.productCode,
                productName: item.productName,
                productUnit: item.productUnit,
                regionSoato: item.regionSoato,
              }));
              this.totalItems = res.data?.length ?? 0;
            }
          })
          .catch(e => {
            this.tableItems = [];
            this.totalItems = 0;
          })
          .finally(() => {
            this.loadingTableItems = false
          })
    },
    customLabelRegions(opt) {
      let selected = this.regionsList.find(e => e.regionId === opt);
      if (selected) {
        return (selected[this.localeKey('regionName')] || selected.regionNameUz || selected.regionNameRu || selected.regionNameLt) + ` - ${selected.soato}`;
      } else if (opt === '--all') {
        return this.$t('column.all')
      }
      return ``;
    },
    customLabelDistrict(opt) {
      let selected = this.districtsList.find(e => e.districtId === opt);
      if (selected) {
        return (selected[this.localeKey('districtName')] || selected.districtNameUz || selected.districtNameRu || selected.districtNameLt) + ` - ${selected.soato}`;
      } else if (opt === '--all') {
        return this.$t('column.all')
      }
      return ``;
    },
    customLabelProducts(opt) {
      let selected = this.productList.find(e => e.productCode === opt);
      if (selected) {
        return selected.productName + ' - ' + selected.productCode
      }
      return ``;
    },
    changeSearchKeyword() {
      if (this.searchInterval) clearTimeout(this.searchInterval)
      this.searchInterval = setTimeout(() => {
        this.fetchTableItems()
      }, 1000)
    },
    confirmItem(item) {
      this.$router.push({
        name: 'IntegrationStatisticsInfoConfirm',
        params: {
          id: item.id
        }
      })
    },
    fetchDistricts() {
      if (this.params.regionSoatos.length) {
        statisticsService.getDistrictsWithSoato(this.params.regionSoatos).then(({ data }) => {
          this.districtsList = data || [];
        })
      }
    },
  },
  created() {
    this.var_default_search_payload.itemsPerPage = 100;
    // this.fetchTableItems()
    statisticsService.getRegionsWithSoato().then(({ data }) => {
      this.regionsList = data || [];
    })
    statisticsService.getStatisticInfoProductCodes().then(({ data }) => {
      this.productList = data || [];
    })
    this.fetchDistricts();
  },
  watch: {
    'var_default_search_payload.page': {
      handler() {
        this.fetchTableItems()
      },
    },
    'params.regionSoatos': {
      handler(newValues) {
        const val = newValues[newValues.length - 1] || null;
        if (val === '--all') {
          this.params.regionSoatos = this.computedRegionOption.slice(1);
        } else {
          this.fetchDistricts()
        }
        this.params.districtSoatos = [];
      },
    },
    'params.districtSoatos': {
      handler(newValues) {
        const val = newValues[newValues.length - 1] || null;
        if (val === '--all') {
          this.params.districtSoatos = this.computedDistrictOption.slice(1);
        }
      },
    },
  }
};
</script>

<style lang='scss' scoped>
</style>