<template>
  <div>
    <b-row class="mb-2">
      <b-col cols="4">
        <div class="position-relative search-box">
          <input
              v-model="searchNotificationKeyword"
              type="text"
              class="form-control"
              style="border-radius: 3px !important;"
              @input="fetchNotificationTableItems($route.params.id)"
              :placeholder="$t('column.search')"
          />
          <i class="bx bx-search-alt search-icon"></i>
        </div>
      </b-col>
      <b-col cols="4"></b-col>
      <b-col cols="2">
        <BaseDatePickerWithValidation
            not-required
            custom-styles="grid-template-columns: 20% 80% 0 !important;"
            v-model="createdDate"
            disable-after
            :label="$t('submodules.integration.e_auction_info.date')"
            @input="fetchNotificationTableItems($route.params.id)"
            lang="ru"
        ></BaseDatePickerWithValidation>
      </b-col>
      <b-col cols="2">
        <download-excel

            :data="json_data"
            :fields="json_fields"
            :header="$t('submodules.integration.customs_product.title')"
            worksheet="My Worksheet"
            :name="`${$t('submodules.integration.customs_product.title')}.xls`"
        >
          <b-btn disabled block style="background: #2b675b" @click="downloadExcel" class="mb-2" rounded>
            <i class="mdi mdi-microsoft-excel me-1"></i> {{ $t('actions.excel_file_upload') }}
          </b-btn>
        </download-excel>
      </b-col>
    </b-row>
    <!-- Table data -->
    <b-table
        :items="notificationTableItems"
        :fields="notificationTableFields"
        id="notification-table"
        class="custom-b-table custom-b-table-head"
        bordered
        small
        fixed
        hover
        show-empty
        striped>

      <!-- NUMBER OF ITEM -->
      <template #cell(index)="innerData">
        {{
          util_paginate(innerData.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage)
        }}
      </template>

      <template #cell(type_product)="innerData">
        <span v-if="innerData.item.priceProductDto && innerData.item.priceProductDto.code == 'FOODS'">
             {{
            $t('fair_price.product_type1')
          }}
        </span>
      </template>


      <template #cell(productName)="innerData">
        <span>
             {{
            getName({
              nameRu: innerData.item.priceProductDto && innerData.item.priceProductDto.nameRu,
              nameLt: innerData.item.priceProductDto && innerData.item.priceProductDto.nameLt,
              nameUz: innerData.item.priceProductDto && innerData.item.priceProductDto.nameUz,
            })
          }}
        </span>
      </template>

      <template #cell(birlik)="innerData">
        <span>
             {{
            getName({
              nameRu: innerData.item.priceProductDto && innerData.item.priceProductDto.measureDto && innerData.item.priceProductDto.measureDto.nameRu,
              nameLt: innerData.item.priceProductDto && innerData.item.priceProductDto.measureDto && innerData.item.priceProductDto.measureDto.nameLt,
              nameUz: innerData.item.priceProductDto && innerData.item.priceProductDto.measureDto && innerData.item.priceProductDto.measureDto.nameUz,
            })
          }}
        </span>
      </template>

      <template #cell(minPrice)="innerData">
        <span>
             {{
            formatNumber(innerData.item.minPrice)
          }}
        </span>
      </template>

      <template #cell(maxPrice)="innerData">
        <span>
             {{
            formatNumber(innerData.item.maxPrice)
          }}
        </span>
      </template>

      <template #cell(middleSum)="innerData">
        <span>
             {{
            formatNumber(innerData.item.middleSum)

          }}
        </span>
      </template>

      <template #cell(region)="innerData">
        <span>
             {{
            getName({
              nameRu: innerData.item.marketDto && innerData.item.marketDto.disNameRu,
              nameLt: innerData.item.marketDto && innerData.item.marketDto.disNameLt,
              nameUz: innerData.item.marketDto && innerData.item.marketDto.disNameUz,
            })
          }}
        </span>
      </template>

      <template #cell(type_of_shopping)="innerData">
        <span>
             {{
            getName({
              nameRu: innerData.item.marketDto && innerData.item.marketDto.businessStructureRu,
              nameLt: innerData.item.marketDto && innerData.item.marketDto.businessStructureLt,
              nameUz: innerData.item.marketDto && innerData.item.marketDto.businessStructureUz,
            })
          }}
        </span>
      </template>

      <template #cell(priceMarkets)="innerData">
        <span>
             {{
            innerData.item.marketDto && innerData.item.marketDto.marketName
          }}
        </span>
      </template>

      <!-- EMPTY SLOT -->
      <template #empty="">
        <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
      </template>
    </b-table>
    <!-- end table -->
    <b-pagination
        v-model="var_default_search_payload.page"
        :total-rows="totalItems"
        :per-page="var_default_search_payload.itemsPerPage"
        aria-controls="my-table"
        class="justify-content-end"
    ></b-pagination>
  </div>
</template>

<script lang="js">

import {mapActions} from 'vuex'
import {TokenService} from "@/shared/services/storage.service"

const MAIN_API_URL = 'price_sum'
const MAIN_NOTIFICATION_API_URL = 'report/advertisement-notifications'
import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'
import Service from '../service'
import helperService from '@/shared/services/helper.service'

const i18n = require("@/i18n");

export default {
  page: {
    title: "Passport info",
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {},
  data() {
    return {
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
      publicPath: process.env.BASE_URL,
      visible: false,
      title: "Passport info",
      activeDep: {},
      tableItems: [],
      notificationTableItems: [],
      totalItems: 0,
      notificationTableFields: [
        {
          label: "№",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
          key: "index",
          thStyle: {
            width: '40px',
          },
        },
        {
          label: this.$t('fair_price.type_product'),
          key: "type_product",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: this.$t('submodules.integration.customs_product.productName'),
          key: "productName",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: this.$t('fair_price.birlik'),
          key: "birlik",
          thClass: "text-center",
          tdClass: "text-center",
          thStyle: {
            width: '70px',
          },
        },
        {
          label: this.$t('fair_price.min'),
          key: "minPrice",
          thClass: "text-center",
          tdClass: "text-center",
          thStyle: {
            width: '100px',
          },
        },
        {
          label: this.$t('fair_price.max'),
          key: "maxPrice",
          thClass: "text-center",
          tdClass: "text-center",
          thStyle: {
            width: '100px',
          },
        },
        {
          label: this.$t('fair_price.references.xaridorgir_narx'),
          key: "middleSum",
          thClass: "text-center",
          tdClass: "text-center",
          thStyle: {
            width: '100px',
          },
        },
        {
          label: this.$t('submodules.integration.price_stock.region_name'),
          key: "region",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: this.$t('fair_price.references.type_of_shopping'),
          key: "type_of_shopping",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: this.$t('fair_price.references.priceMarkets'),
          key: "priceMarkets",
          thClass: "text-center",
          tdClass: "text-center",
        },
        {
          label: this.$t('fair_price.date'),
          key: "date",
          thClass: "text-center",
          tdClass: "text-center",
          thStyle: {
            width: '100px',
          },
        },
        // {
        //   label: this.$t('column.actions'),
        //   key: "notificationActions",
        //   thClass: "text-center",
        //   tdClass: "text-center",
        //   sortable: false
        // },
      ],
      searchKeyword: '',
      searchNotificationKeyword: '',
      createdDate: '',
      selected: 10,
      optionsTable: [
        {value: 20, text: 20},
        {value: 50, text: 50},
        {value: 100, text: 100},
        {value: 150, text: 150},
        {value: 200, text: 200},
      ],
      regions: [],
      districts: [],
      contractors: [],
      adDesignTypes: [],
      filterPayload: {
        passportNumber: '',
        contractorId: '',
        regionId: '',
        districtIds: [],
        designTypeIds: []
      },
      index: 0,
      photosFromServer: [],
      loadingTableItems: false,
      isOuter: TokenService.getIsOuter(),
    };
  },
  /*
  COMPUTED */
  computed: {
    tableFields() {
      return this.$can('list', 'contractor advertising construction') ? this.tableFieldsForAgency : this.tableFieldsForGovernment;
    },

    dtoName() {
      return this.$can('list', 'contractor advertising construction') ? 'contractorAdvertisingConstructionForSecondAgentDto' : 'contractorAdvertisingConstructionForFirstAgentDto';
    },

    numberOfPages() {
      return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
    },
    imgArr() {
      let arrs = [];
      this.photosFromServer.forEach(e => {
        if (this.photosFromServer)
          arrs.push(this.publicPath + e.url)
      })
      return arrs
    }
  },
  methods: {
    ...mapActions(['setCount']),
    async downloadExcel() {
      this.json_data = this.tableItems.map((item, index) => {
        return {
          ...item,
          infoDateOfIssue: item.infoDateOfIssue ? this.getDateFormat(item.infoDateOfIssue) : '',
          infoInformationDate: item.infoInformationDate ? this.getDateFormat(item.infoInformationDate) : '',
        }
      });
    },
    selectList($event) {
      if ($event == 'all') {
        this.var_default_search_payload.itemsPerPage = this.totalItems
      } else {
        this.var_default_search_payload.itemsPerPage = $event
      }
      this.fetchNotificationTableItems(this.$route.params.id);
    },
    fetchNotificationTableItems() {
      this.loadingTableItems = true
      this.var_default_search_payload.keyword = this.searchKeyword
      this.var_default_search_payload.itemsPerPage = this.selected
      // this.var_default_search_payload.placedDate = this.placedDate
      Service
          .listEnteredPrice(MAIN_API_URL, this.var_default_search_payload, true)
          .then((res) => {
            this.notificationTableItems = res.data.list
            this.totalItems = res.data.total
          })
          .catch(e => {
            this.notificationTableItems = [];
          })
          .finally(() => {
            this.loadingTableItems = false
          })
    },
    customLabelDistrict(opt) {
      let selected = this.districts.find(e => e.id == opt);
      if (selected) {
        return `${
            this.getName({
              nameRu: selected.nameRu,
              nameLt: selected.nameLt,
              nameUz: selected.nameUz,
            })
        }`
      }
      return ``;
    },
    customLabelContractor(opt) {
      let selected = this.contractors.find(e => e.id == opt);
      if (selected) {
        return `${selected.fullName}`
      }
      return ``;
    },
    customLabelRegion(opt) {
      let selected = this.regions.find(e => e.regionId == (opt.regionId ? opt.regionId : opt));
      if (selected) {
        return `${this.getName({
          nameRu: selected.regionNameRu,
          nameLt: selected.regionNameLt,
          nameUz: selected.regionNameUz,
        })
        }`
      }
      return ``;
    },
    customLabelAdDesignType(opt) {
      let selected = this.adDesignTypes.find(e => e.id == (opt.id ? opt.id : opt));
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
    },
    async regionSelected($event, dontResetDistrict = false) {
      if (!dontResetDistrict) {
        this.filterPayload.districtIds = []
      }
      // GET DISTRICTS
      if ($event)
        await helperService.getGeoLocationsByParentId($event)
            .then(res => {
              this.districts = res.data
            })
            .catch(e => {
              console.log(e)
            })
      this.fetchNotificationTableItems(this.$route.params.id)
    },
    createItem(id, forAgency = false) {
      this.$router.push({
        name: 'CreateContractorNotification',
        params: {adConstructionId: id}
      })
    },
    editItem(id) {
      this.$router.push({name: 'UpdateContractorNotification', params: {id: id}})
    },
    getImages(id, adConstructionIndex) {
      let foundIndex = this.tableItems[adConstructionIndex].contractorAdvertisingConstructionForSecondAgentDto.notifications.findIndex(el => el.id == id)
      if (foundIndex > -1) {
        this.photosFromServer = this.tableItems[adConstructionIndex].contractorAdvertisingConstructionForSecondAgentDto.notifications[foundIndex].advertisementNotificationPhotoList
        this.showImg(0)
      }
    },
    showImg(index) {
      this.index = index
      this.visible = true
    },
    handleHide() {
      this.visible = false
    },
    handlePrevNext(oldIndex, newIndex) {
      this.index = newIndex
    },
    deleteItem(id) {
      this.$bvModal.msgBoxConfirm(this.$t('messages.delete_title'), {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(value => {
            if (value) {
              crudAndListsService
                  .deleteById(MAIN_API_URL, id)
                  .then((res) => {
                    this.fetchNotificationTableItems(this.$route.params.id)
                  })
                  .catch(e => {
                    console.log(e)
                  })
            }
          })
          .catch(err => {
            // An error occurred
          })
    },
  },
  /* CREATED */
  async created() {
    await this.fetchNotificationTableItems()
  },
  /*
  WATCH */
  watch: {
    'var_default_search_payload.page': {
      handler() {
        this.fetchNotificationTableItems()
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.max-height-70 {
  max-height: 70vh;
}

::v-deep .base-form-component__label {
  margin-top: 10px;
  color: #104238;
  font-weight: bold;
}

::v-deep .mx-icon-calendar {
  color: #2b675b;
}
::v-deep  .table-striped tbody tr:nth-of-type(odd) {
  background-color: #EAF0EF;
}

</style>