<template>
  <div class="row">
    <div class="col-12">
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">
          {{
            isRealization ? $t('submodules.integration.price_stock.realization') : $t('submodules.integration.price_stock.embedding_realization')
          }}
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="row mb-2">
            <div class="col-sm-8">
              <div class="search-box me-4 mb-2 d-inline-block">
                <div class="position-relative">
                  <input
                      v-model="searchKeyword"
                      :placeholder="$t('column.search')"
                      class="form-control"
                      type="text"
                      @input="changeSearchKeyword"
                  />
                  <i class="bx bx-search-alt search-icon"></i>
                </div>
              </div>
              <span>{{ $t('column.select.text1') }}</span>
              <div class="col-2 me-2 mx-2 d-inline-block">
                <div class="position-relative">
                  <b-form-select
                      v-model="selected"
                      :options="optionsTable"
                      class="form-select"
                      @change="selectList"
                  ></b-form-select>
                </div>
              </div>
              <span>{{ $t('column.select.text2') }}</span>
            </div>
            <div class="col-sm-4">
              <div class="text-sm-end">
                <b-row>
                  <b-col cols="7">
                    <div class="text-sm-end">
                      <download-excel
                          :data="json_data"
                          :fields="json_fields"
                          :header="$t('submodules.integration.price_stock.menu_title')"
                          :name="`${$t('submodules.integration.price_stock.menu_title')}.xls`"
                          worksheet="My Worksheet"
                      >
                        <b-btn
                            class="btn btn-rounded bg-primary mb-2"
                            type="button"
                            @click="downloadExcel"
                        >
                          <i class="mdi mdi-microsoft-excel me-1"></i> {{ $t('actions.download') }}
                        </b-btn>
                      </download-excel>
                    </div>
                  </b-col>
                  <b-col cols="5">
                    <b-btn
                        :to="{name: isRealization ? 'IntegrationPriceStockRealizationUpload' : 'IntegrationPriceStockEmbeddingRealizationUpload'}"
                        class="btn btn-success btn-rounded mb-2 me-2"
                        type="button"
                    >
                      <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add') }}
                    </b-btn>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
          <b-table
              id="my-table"
              :busy="loadingTableItems"
              :fields="tableFields"
              :items="tableItems"
              bordered
              class="custom-b-table"
              thead-class="text-center"
              hover
              responsive
              show-empty
              small
              striped
          >
            <!-- NUMBER OF ITEM -->
            <template #cell(index)="data">
              {{ util_paginate(data.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage) }}
            </template>

            <!-- contractSpecialTerms -->
            <template #cell(contractSpecialTerms)="data">
              <p id="popover-target-1" class="three-line-ellipsis">
                {{ data.item.contractSpecialTerms }}
              </p>
              <b-popover target="popover-target-1" triggers="hover" placement="top"
                         custom-class="popover-width-percent">
                <div>
                  {{ data.item.contractSpecialTerms }}
                </div>
              </b-popover>
            </template>

            <!-- averagePrice -->
            <template #cell(averagePrice)="data">
              <p id="popover-target-1" class="three-line-ellipsis">
                {{ data.item.averagePrice }}
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
            <template #cell(actions)></template>
            <!-- EMPTY SLOT -->
            <template #empty="">
              <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
            </template>
            <!-- TABLE_BUSY SLOT -->
            <template #table-busy>
              <div class="text-center my-2">
                <b-spinner class="align-middle" variant="primary"/>
              </div>
            </template>
          </b-table>
          <!-- end table -->
          <b-pagination
              v-model="var_default_search_payload.page"
              :per-page="var_default_search_payload.itemsPerPage"
              :total-rows="totalItems"
              aria-controls="my-table"
              class="justify-content-end"
          />
        </div>
      </div>
    </div>
    <b-sidebar v-model="viewInfoSidebarShow" :no-header="true" width="calc(100% - 400px)" backdrop shadow right lazy>
      <view-info v-if="viewInfoData" :info="viewInfoData"/>
    </b-sidebar>
  </div>
</template>

<script>
import priceStockService from '@/shared/services/integration/priceStock.service'
import ViewInfo from '@/modules/integration/modules/e-auction-info/ViewInfo.vue'

export default {
  components: {
    ViewInfo,
  },
  data() {
    return {
      viewInfoData: null,
      viewInfoSidebarShow: false,
      loadingTableItems: false,
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
      tableItems: [],
      totalItems: 0,
      searchInterval: null,
    };
  },
  /*
  COMPUTED */
  computed: {
    isRealization() {
      return this.$route.name === 'IntegrationPriceStockRealizationIndex';
    },
    numberOfPages() {
      return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
    },
    json_fields() {
      const map = {};
      this.tableFields.forEach((item) => {
        if (!['actions', 'index'].includes(item.key)) {
          map[item.label] = item.key;
        }
      })
      return map
    },
    tableFields() {
      if (this.isRealization) {
        return [
          {
            label: "#",
            thClass: "text-center",
            tdClass: "text-center",
            sortable: false,
            key: "index",
          },
          // { label: this.$t('submodules.integration.price_stock.id'), key: "id" },
          {label: this.$t('submodules.integration.price_stock.session'), key: "session"},
          {label: this.$t('submodules.integration.price_stock.transactionDate'), key: "transactionDate"},
          {label: this.$t('submodules.integration.price_stock.transactionNumber'), key: "transactionNumber"},
          {label: this.$t('submodules.integration.price_stock.sellerBrokerNumber'), key: "sellerBrokerNumber"},
          {label: this.$t('submodules.integration.price_stock.sellerMediationArea'), key: "sellerMediationArea"},
          {
            label: this.$t('submodules.integration.price_stock.sellerMarketplaceNumber'),
            key: "sellerMarketplaceNumber"
          },
          {label: this.$t('submodules.integration.price_stock.buyerBrokerNumber'), key: "buyerBrokerNumber"},
          {label: this.$t('submodules.integration.price_stock.buyerBrokerArea'), key: "buyerBrokerArea"},
          {label: this.$t('submodules.integration.price_stock.buyerMarketplaceNumber'), key: "buyerMarketplaceNumber"},
          {
            label: this.$t('submodules.integration.price_stock.contractNumber'),
            key: "contractNumber",
            thClass: 'min-width-120-px'
          },
          {label: this.$t('submodules.integration.price_stock.contractName'), key: "contractName"},
          {label: this.$t('submodules.integration.price_stock.contractUnit'), key: "contractUnit"},
          {label: this.$t('submodules.integration.price_stock.contractSpecialTerms'), key: "contractSpecialTerms"},
          {label: this.$t('submodules.integration.price_stock.dealLot'), key: "dealLot"},
          {label: this.$t('submodules.integration.price_stock.contractValue'), key: "contractValue"},
          {label: this.$t('submodules.integration.price_stock.productPrice'), key: "productPrice"},
          {label: this.$t('submodules.integration.price_stock.productCost'), key: "productCost"},
          {label: this.$t('submodules.integration.price_stock.contractStartingPrice'), key: "contractStartingPrice"},
          {label: this.$t('submodules.integration.price_stock.listingStartingPrice'), key: "listingStartingPrice"},
          {label: this.$t('submodules.integration.price_stock.contractCurrency'), key: "contractCurrency"},
          {label: this.$t('submodules.integration.price_stock.exchangeRate'), key: "exchangeRate"},
          {
            label: this.$t('submodules.integration.price_stock.productName'),
            key: "productName",
            thClass: 'min-width-120-px'
          },
          {label: this.$t('submodules.integration.price_stock.productBrand'), key: "productBrand"},
          {label: this.$t('submodules.integration.price_stock.segmentGroup'), key: "segmentGroup"},
          {label: this.$t('submodules.integration.price_stock.sellerName'), key: "sellerName"},
          {label: this.$t('submodules.integration.price_stock.productQuantity'), key: "productQuantity"},
          {label: this.$t('submodules.integration.price_stock.productUnit'), key: "productUnit"},
          {label: this.$t('submodules.integration.price_stock.productGroup'), key: "productGroup"},
          {label: this.$t('submodules.integration.price_stock.productSubgroup'), key: "productSubgroup"},
          {label: this.$t('submodules.integration.price_stock.statRow'), key: "statRow"},
          {label: this.$t('submodules.integration.price_stock.contractType'), key: "contractType"},
          {label: this.$t('submodules.integration.price_stock.paymentDate'), key: "paymentDate"},
          {label: this.$t('submodules.integration.price_stock.cancellationDate'), key: "cancellationDate"},
          {label: this.$t('submodules.integration.price_stock.cancellationType'), key: "cancellationType"},
          {label: this.$t('submodules.integration.price_stock.dealStatus'), key: "dealStatus"},
          {label: this.$t('submodules.integration.price_stock.supplyAmount'), key: "supplyAmount"},
          {label: this.$t('submodules.integration.price_stock.supplyWeight'), key: "supplyWeight"},
          {label: this.$t('submodules.integration.price_stock.supplyUnit'), key: "supplyUnit"},
          {label: this.$t('submodules.integration.price_stock.supplyCurrency'), key: "supplyCurrency"},
          {label: this.$t('submodules.integration.price_stock.deliveryTime'), key: "deliveryTime"},
          {label: this.$t('submodules.integration.price_stock.sellerTin'), key: "sellerTin"},
          {label: this.$t('submodules.integration.price_stock.sellerOkonx'), key: "sellerOkonx"},
          {label: this.$t('submodules.integration.price_stock.sellerOkonxName'), key: "sellerOkonxName"},
          {label: this.$t('submodules.integration.price_stock.buyerOkonx'), key: "buyerOkonx"},
          {label: this.$t('submodules.integration.price_stock.buyerOkonxName'), key: "buyerOkonxName"},
          {label: this.$t('submodules.integration.price_stock.sellerArea'), key: "sellerArea"},
          {label: this.$t('submodules.integration.price_stock.sellerDistrict'), key: "sellerDistrict"},
          {label: this.$t('submodules.integration.price_stock.sellerAddress'), key: "sellerAddress"},
          {label: this.$t('submodules.integration.price_stock.buyerArea'), key: "buyerArea"},
          {label: this.$t('submodules.integration.price_stock.buyerDistrict'), key: "buyerDistrict"},
          {label: this.$t('submodules.integration.price_stock.buyerAddress'), key: "buyerAddress"},
          {label: this.$t('submodules.integration.price_stock.tnvedCode'), key: "tnvedCode"},
          {label: this.$t('submodules.integration.price_stock.decree'), key: "decree"},
          {label: this.$t('submodules.integration.price_stock.buyerAccountNumber'), key: "buyerAccountNumber"},
          {label: this.$t('submodules.integration.price_stock.sellerAccountNumber'), key: "sellerAccountNumber"},
          {label: this.$t('submodules.integration.price_stock.buyerCurrency'), key: "buyerCurrency"},
          {label: this.$t('submodules.integration.price_stock.sellerCurrency'), key: "sellerCurrency"},
          {label: this.$t('submodules.integration.price_stock.contractWarehouse'), key: "contractWarehouse"},
          {label: this.$t('submodules.integration.price_stock.basisSupply'), key: "basisSupply"},
          {label: this.$t('submodules.integration.price_stock.contractStatus'), key: "contractStatus"},
          {label: this.$t('submodules.integration.price_stock.contractOpeningDate'), key: "contractOpeningDate"},
          {label: this.$t('submodules.integration.price_stock.lastDeliveryDate'), key: "lastDeliveryDate"},
          {label: this.$t('submodules.integration.price_stock.buyerFee'), key: "buyerFee"},
          {label: this.$t('submodules.integration.price_stock.sellerFee'), key: "sellerFee"},
          {
            label: this.$t('column.actions'),
            key: "actions",
            tdClass: "text-center align-middle",
            sortable: false
          },
        ];
      }
      return [
        {
          label: "#",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
          key: "index",
        },
        // { label: this.$t('submodules.integration.price_stock.id'), key: "id" },
        {label: this.$t('submodules.integration.price_stock.sellerRegion'), key: "sellerRegion"},
        {label: this.$t('submodules.integration.price_stock.seller'), key: "seller", thClass: 'min-width-120-px'},
        {label: this.$t('submodules.integration.price_stock.sellerInn'), key: "sellerInn"},
        {label: this.$t('submodules.integration.price_stock.contract'), key: "contract"},
        {label: this.$t('submodules.integration.price_stock.groupName'), key: "groupName"},
        {label: this.$t('submodules.integration.price_stock.subgroupName'), key: "subgroupName"},
        {
          label: this.$t('submodules.integration.price_stock.productName'),
          key: "productName",
          thClass: 'min-width-120-px'
        },
        {label: this.$t('submodules.integration.price_stock.brand'), key: "brand"},
        {label: this.$t('submodules.integration.price_stock.coefficient'), key: "coefficient"},
        {
          label: this.$t('submodules.integration.price_stock.warehouseContract'),
          key: "warehouseContract",
          thClass: 'min-width-120-px'
        },
        {label: this.$t('submodules.integration.price_stock.arithmeticAmount'), key: "arithmeticAmount"},
        {label: this.$t('submodules.integration.price_stock.amount'), key: "amount"},
        {label: this.$t('submodules.integration.price_stock.realizationAmount'), key: "realizationAmount"},
        {label: this.$t('submodules.integration.price_stock.realizationPrice'), key: "realizationPrice"},
        {label: this.$t('submodules.integration.price_stock.startingPrice'), key: "startingPrice"},
        {label: this.$t('submodules.integration.price_stock.averagePrice'), key: "averagePrice"},
        {label: this.$t('submodules.integration.price_stock.startingCommonPrice'), key: "startingCommonPrice"},
        {label: this.$t('submodules.integration.price_stock.cancelledAmount'), key: "cancelledAmount"},
        {label: this.$t('submodules.integration.price_stock.cancelledPrice'), key: "cancelledPrice"},
        {label: this.$t('submodules.integration.price_stock.fromPeriodDate'), key: "fromPeriodDate"},
        {label: this.$t('submodules.integration.price_stock.toPeriodDate'), key: "toPeriodDate"},
        {
          label: this.$t('column.actions'),
          key: "actions",
          tdClass: "text-center align-middle",
          sortable: false
        },
      ];
    }
  },
  methods: {
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
      this.loadingTableItems = true
      this.var_default_search_payload.keyword = this.searchKeyword
      this.var_default_search_payload.sortDesc.push(false)
      let fetchListRequest;
      if (this.isRealization) {
        fetchListRequest = priceStockService.listRealization(this.searchKeyword, this.var_default_search_payload)
      } else {
        fetchListRequest = priceStockService.listEmbeddingRealization(this.searchKeyword, this.var_default_search_payload)
      }
      fetchListRequest.then((res) => {
        this.tableItems = res.data.list;
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
    changeSearchKeyword() {
      clearTimeout(this.searchInterval)
      this.searchInterval = setTimeout(() => {
        this.fetchTableItems()
      }, 500)
    },
    viewInfo(info) {
      this.viewInfoSidebarShow = true;
      this.viewInfoData = info;
    },
  },
  /* CREATED */
  created() {
    this.fetchTableItems()
  },
  /* WATCH */
  watch: {
    'var_default_search_payload.page': {
      handler() {
        this.fetchTableItems()
      }
    },
    viewInfoSidebarShow() {
      if (!this.viewInfoSidebarShow) {
        this.viewInfoData = null;
      }
    },
  },
};
</script>

<style lang='scss'>
.min-width-120-px {
  min-width: 120px;
}

.popover-width-percent {
  min-width: 20%;
  max-width: 60%;
}

.three-line-ellipsis {
  display: -webkit-box;
  max-width: 200px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>