<template>
  <div class="row">
    <div class="col-md-12 text-center">
      <div class="h4 mb-4 d-inline-block">{{ $t('submodules.ad_passport_info.title') }}</div>
    </div>
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <b-row class="mb-2">
            <b-col cols="5" lg="4" class="px-1 pb-2">
              <input
                  v-model="searchKeyword"
                  type="text"
                  class="form-control"
                  :placeholder="$t('column.search')"
                  @input="debounceSearchTableItems"
              />
            </b-col>
            <b-col cols="5" lg="6" class="px-1 pb-2">
              <!-- CONTRAGENTS -->
              <BaseMultiselectWithValidation
                  not-required
                  multiple
                  v-model="filterPayload.contractorIds"
                  @input="contractorSelected"
                  :options="contractors.map(e => e.id)"
                  :hide-selected="true"
                  :close-on-select="false"
                  :placeholder="$t('submodules.contractor.title')"
                  :custom-label="customLabelContractor"
                  open-direction="bottom"
                  style="width: 100%;"
                  :max-height="600"
                  :show-labels="false"
                  :only-form-element="true"
              />
            </b-col>
            <b-col cols="2" class="px-1 pb-2">
              <b-form-select v-model="selected" :options="optionsTable" @change="selectList" class="form-select"/>
            </b-col>
            <b-col cols="3" class="px-1 pb-2">
              <!-- REGIONS -->
              <BaseMultiselectWithValidation
                  not-required
                  v-model="filterPayload.regionId"
                  :options="regions.map(e => e.regionId)"
                  :placeholder="$t('column.region')"
                  @input="regionSelected"
                  :custom-label="customLabelRegion"
                  open-direction="bottom"
                  style="width: 100%;"
                  :max-height="600"
                  :show-labels="false"
                  :only-form-element="true"
              />
            </b-col>
            <b-col cols="3" class="px-1 pb-2">
              <!-- DISTRICTS -->
              <BaseMultiselectWithValidation
                  not-required
                  multiple
                  v-model="filterPayload.districtIds"
                  style="width: 100%"
                  open-direction="bottom"
                  :options="districts.map(e => e.id)"
                  :max-height="600"
                  :show-labels="false"
                  :placeholder="$t('column.district')"
                  :custom-label="customLabelDistrict"
                  :hide-selected="true"
                  :close-on-select="false"
                  :only-form-element="true"
                  @input="districtSelected"
              />
            </b-col>
            <b-col cols="2">
              <!-- PASSPORT_GIVEN_DATE -->
              <BaseDatePickerWithValidation
                  not-required
                  rules=""
                  class=""
                  type="month"
                  format="MM-YYYY"
                  :only-form-element="true"
                  v-model="filterPayload.givenDate"
                  @input="givenDateSelected"
                  :placeholder="$t('column.given_date')"
                  lang="ru"
              ></BaseDatePickerWithValidation>
            </b-col>
            <b-col cols="2">
              <!-- PASSPORT_EXPIRE_DATE -->
              <BaseDatePickerWithValidation
                  not-required
                  rules=""
                  class=""
                  type="month"
                  format="MM-YYYY"
                  :only-form-element="true"
                  v-model="filterPayload.expireDate"
                  :placeholder="$t('column.expire_date')"
                  lang="ru"
              ></BaseDatePickerWithValidation>
            </b-col>
            <b-col cols="2" class="text-right px-1 pb-2">
              <download-excel
                  worksheet="My Worksheet"
                  :data="json_data"
                  :fields="json_fields"
                  :header="$t('submodules.ad_passport_info.title')"
                  :name="`${$t('submodules.ad_passport_info.title')}.xls`"
              >
                <b-btn @click="downloadExcel" type="button" class="btn btn-rounded bg-primary mb-2">
                  <i class="mdi mdi-microsoft-excel me-1"></i> {{ $t('actions.download') }}
                </b-btn>
              </download-excel>
            </b-col>
          </b-row>
          <b-table
              :items="tableItems"
              :fields="tableFields"
              :busy="loadingTableItems"
              :tbody-tr-class="filteredTableItems"
              sticky-header="stickyHeader"
              id="ad-passport-info-list-table"
              class="custom-b-table max-height-70"
              responsive
              striped
              bordered
              small
              hover
              show-empty
          >
            <!-- NUMBER OF ITEM -->
            <template #cell(index)="data">
              {{ util_paginate(data.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage) }}
            </template>

            <!-- NAME -->
            <template #cell(name)="data">
              <div class="d-flex justify-content-between">
                <p
                    class="mb-0 d-flex align-items-center"
                    style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                ><span class="badge bg-primary">ЎЗ</span> : <span> {{ data.item.nameUz }}</span></p>
                <p
                    class="mb-0 d-flex align-items-center"
                    style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                ><span class="badge bg-primary">O'Z</span> &nbsp;:&nbsp; <span> {{ data.item.nameLt }}</span></p>
                <p
                    class="mb-0 d-flex align-items-center"
                    style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                ><span class="badge bg-primary">РУ</span> &nbsp;:&nbsp; <span> {{ data.item.nameRu }}</span></p>
              </div>
            </template>

            <!-- ADVERTISEMENT OBJECT STATE NAME -->
            <template #cell(advertisementObjectStateName)="data">
              <div class="d-flex justify-content-between">
                <p>
                  {{
                    getName({
                      nameRu: data.item.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementObjectStateNameRu,
                      nameLt: data.item.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementObjectStateNameLt,
                      nameUz: data.item.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementObjectStateNameUz,
                    })
                  }}
                </p>
              </div>
            </template>

            <!-- REGION NAME -->
            <template #cell(regionName)="data">
              <div class="d-flex justify-content-between">
                <p>
                  {{
                    getName({
                      nameRu: data.item.contractorAdvertisingConstructionForSecondAgentDto.addressDto.regionNameRu,
                      nameLt: data.item.contractorAdvertisingConstructionForSecondAgentDto.addressDto.regionNameLt,
                      nameUz: data.item.contractorAdvertisingConstructionForSecondAgentDto.addressDto.regionNameUz,
                    })
                  }}
                </p>
              </div>
            </template>

            <!-- DISTRICT NAME -->
            <template #cell(districtName)="data">
              <div class="d-flex justify-content-between">
                <p>
                  {{
                    getName({
                      nameRu: data.item.contractorAdvertisingConstructionForSecondAgentDto.addressDto.districtNameRu,
                      nameLt: data.item.contractorAdvertisingConstructionForSecondAgentDto.addressDto.districtNameLt,
                      nameUz: data.item.contractorAdvertisingConstructionForSecondAgentDto.addressDto.districtNameUz,
                    })
                  }}
                </p>
              </div>
            </template>

            <!-- ACTIONS -->
            <template #cell(actions)="data">
              <div class="general-table__actions d-flex justify-content-center">
                <!-- Details -->
                <router-link
                    :to="{name: 'AdvertisementEAuctionDetails', params: {id: data.item.contractorAdvertisingConstructionForFirstAgentDto.id || data.item.contractorAdvertisingConstructionForSecondAgentDto.id}}"
                    v-b-popover.hover.bottom="{title:$t('actions.details'),content:null}"
                    class="btn btn-link text-decoration-none p-0 text-success"
                >
                  <i class="bx bxs-detail" />
                </router-link>
                <!-- EDIT BUTTON FOR AGENCY -->
<!--                <b-btn-->
<!--                    v-if="$can('update', 'contractor advertising construction')"-->
<!--                    variant="link"-->
<!--                    class="text-decoration-none p-0"-->
<!--                    style="font-size: 1.2rem; margin-right: 1rem;"-->
<!--                >-->
<!--                  <i-->
<!--                      @click="editItem(data.item.contractorAdvertisingConstructionForFirstAgentDto.id, true)"-->
<!--                      class="mdi mdi-circle-edit-outline edit"-->
<!--                  ></i>-->
<!--                </b-btn>-->
                <!-- EDIT BUTTON FOR GOVERNMENT -->
<!--                <b-btn-->
<!--                    v-else-if="$can('update', 'contractor advertising construction for first agent')"-->
<!--                    variant="link"-->
<!--                    class="text-decoration-none p-0"-->
<!--                    style="font-size: 1.2rem; margin-right: 1rem;"-->
<!--                >-->
<!--                  <i-->
<!--                      @click="editItem(data.item.contractorAdvertisingConstructionForFirstAgentDto.id)"-->
<!--                      class="mdi mdi-circle-edit-outline edit"-->
<!--                  ></i>-->
<!--                </b-btn>-->

                <!-- UPDATE BUTTON FOR FILES -->
<!--                <b-btn-->
<!--                    variant="link"-->
<!--                    class="text-decoration-none p-0 text-primary"-->
<!--                    style="font-size: 1.2rem; margin-right: 1rem;"-->
<!--                >-->
<!--                  <i-->
<!--                      @click="updateFiles(data.item.contractorAdvertisingConstructionForFirstAgentDto.id, $can('update', 'contractor advertising construction'))"-->
<!--                      class="mdi mdi-file-upload-outline"-->
<!--                  ></i>-->
<!--                </b-btn>-->

              </div>
            </template>

            <!-- EMPTY SLOT -->
            <template #empty="">
              <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
            </template>

            <!-- TABLE_BUSY SLOT -->
            <template #table-busy>
              <div class="text-center my-2">
                <b-spinner variant="primary" class="align-middle"></b-spinner>

              </div>
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
        <!-- end card-body -->
      </div>
      <!-- end card -->
    </div>
    <!-- end col -->
  </div>
  <!-- end row -->
</template>

<script>

const MAIN_API_URL = 'contractor-advertising-construction'
import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'
import helperService from '@/shared/services/helper.service'

const i18n = require("@/i18n");

export default {
  page: {
    title: "Passport info",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {},
  data() {
    return {
      debounce: null,
      json_fields: {
        [this.$t('column.ad_construction_owner')]: "contractorName",
        [this.$t('column.ad_construction_owner_inn')]: "inn",
        [this.$t('column.ad_construction_owner_phone_number')]: "contractorPhoneNumber",
        [this.$t('column.created_date')]: "constructDate",
        [this.$t('column.status')]: "advertisementObjectStateName",
        [this.$t('column.comment')]: "description",
        [this.$t('column.ad_construction_passport_number')]: "passportNumber",
        [this.$t('column.ad_construction_passport_given_date')]: "passportGivenDate",
        [this.$t('column.ad_construction_passport_expire_date')]: "passportExpireDate",
        [this.$t('column.region')]: "regionName",
        [this.$t('column.district')]: "districtName",
        [this.$t('column.address')]: "additional",
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
      title: "Passport info",
      activeDep: {},
      tableItems: [],
      totalItems: 0,
      loadingTableItems: false,
      tableFieldsForGovernment: [
        {
          label: "#",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
          key: "index",
        },
        {
          label: this.$t('column.ad_construction_owner'),
          key: "contractorAdvertisingConstructionForFirstAgentDto.contractorName"
        },
        {
          label: this.$t('column.ad_construction_owner_inn'),
          key: "contractorAdvertisingConstructionForFirstAgentDto.inn"
        },
        {
          label: this.$t('column.ad_construction_passport_number'),
          key: "contractorAdvertisingConstructionForFirstAgentDto.passportNumber"
        },
        {
          label: this.$t('column.ad_construction_passport_given_date'),
          key: "contractorAdvertisingConstructionForFirstAgentDto.passportGivenDate"
        },
        {
          label: this.$t('column.ad_construction_passport_expire_date'),
          key: "contractorAdvertisingConstructionForFirstAgentDto.passportExpireDate"
        },
        { label: this.$t('column.region'), key: "regionName" },
        { label: this.$t('column.district'), key: "districtName" },
        {
          label: this.$t('column.address'),
          key: "contractorAdvertisingConstructionForFirstAgentDto.addressDto.additional"
        },
        {
          label: this.$t('column.actions'),
          key: "actions",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false
        },
      ],
      tableFieldsForAgency: [
        {
          label: "#",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
          key: "index",
        },
        {
          label: this.$t('column.actions'),
          key: "actions",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
        },
        {
          label: this.$t('column.ad_construction_owner'),
          key: "contractorAdvertisingConstructionForSecondAgentDto.contractorName"
        },
        {
          label: this.$t('column.ad_construction_owner_inn'),
          key: "contractorAdvertisingConstructionForSecondAgentDto.inn"
        },
        {
          label: this.$t('column.created_date'),
          key: "contractorAdvertisingConstructionForSecondAgentDto.constructDate"
        },
        {
          label: this.$t('column.ad_construction_passport_number'),
          key: "contractorAdvertisingConstructionForSecondAgentDto.passportNumber"
        },
        {
          label: this.$t('column.ad_construction_passport_given_date'),
          key: "contractorAdvertisingConstructionForSecondAgentDto.passportGivenDate"
        },
        {
          label: this.$t('column.ad_construction_passport_expire_date'),
          key: "contractorAdvertisingConstructionForSecondAgentDto.passportExpireDate"
        },
        { label: this.$t('column.region'), key: "regionName" },
        { label: this.$t('column.district'), key: "districtName" },
        {
          label: this.$t('column.address'),
          key: "contractorAdvertisingConstructionForSecondAgentDto.addressDto.additional"
        },
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
      regions: [],
      districts: [],
      contractors: [],
      adDesignTypes: [],
      filterPayload: {
        passportNumber: '',
        contractorIds: [],
        regionId: '',
        districtIds: [],
      }
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
    }
  },
  methods: {
    selectList($event) {
      if ($event === 'all') {
        this.var_default_search_payload.itemsPerPage = this.totalItems
      } else {
        this.var_default_search_payload.itemsPerPage = $event
      }
      this.fetchTableItems(this.$route.name);
    },
    debounceSearchTableItems() {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(async () => {
        await this.fetchTableItems(this.$route.name);
      }, 1000);
    },
    fetchTableItems(name) {
      this.loadingTableItems = true
      this.var_default_search_payload.keyword = this.searchKeyword
      this.var_default_search_payload.regionId = this.filterPayload.regionId
      this.var_default_search_payload.districtIds = this.filterPayload.districtIds
      this.var_default_search_payload.contractorIds = this.filterPayload.contractorIds
      this.var_default_search_payload.passportNumber = this.filterPayload.passportNumber
      crudAndListsService
          .searchListWithKeywordByRegionAndDistrictAndContractor(MAIN_API_URL, this.var_default_search_payload, 'e-auction', true)
          .then((res) => {
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
    downloadExcel() {
      this.json_data = []
      this.tableItems.forEach(res => {
        let obj = {}
        obj.contractorName = res.contractorAdvertisingConstructionForSecondAgentDto.contractorName
        obj.inn = res.contractorAdvertisingConstructionForSecondAgentDto.inn
        obj.contractorPhoneNumber = res.contractorAdvertisingConstructionForSecondAgentDto.contractorPhoneNumber
        obj.advertisementTypeName = res.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementTypeNameUz
        obj.constructDate = res.contractorAdvertisingConstructionForSecondAgentDto.constructDate
        obj.advertisementObjectStateName = res.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementObjectStateNameUz
        obj.description = res.contractorAdvertisingConstructionForSecondAgentDto.description
        obj.monthlyPayment = res.contractorAdvertisingConstructionForSecondAgentDto.monthlyPayment
        obj.advertisementZoneName = res.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementZoneNameUz
        obj.typeOfOutdoorAdvertisingTool = res.contractorAdvertisingConstructionForSecondAgentDto.directoryTypeOfOutdoorAdvertisingToolNameUz
        obj.volume = res.contractorAdvertisingConstructionForSecondAgentDto.volume
        obj.typeFormat = res.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementVolumeTypeNameUz
        obj.passportNumber = res.contractorAdvertisingConstructionForSecondAgentDto.passportNumber
        obj.passportGivenDate = res.contractorAdvertisingConstructionForSecondAgentDto.passportGivenDate
        obj.passportExpireDate = res.contractorAdvertisingConstructionForSecondAgentDto.passportExpireDate
        obj.regionName = res.contractorAdvertisingConstructionForSecondAgentDto.addressDto.regionNameUz
        obj.districtName = res.contractorAdvertisingConstructionForSecondAgentDto.addressDto.districtNameUz
        obj.quarterName = res.contractorAdvertisingConstructionForSecondAgentDto.addressDto.quarterNameUz
        obj.streetName = res.contractorAdvertisingConstructionForSecondAgentDto.addressDto.streetNameUz
        obj.additional = res.contractorAdvertisingConstructionForSecondAgentDto.addressDto.additional
        this.json_data.push(obj)
      })
    },
    customLabelDistrict(opt) {
      let selected = this.districts.find(e => e.id == opt);
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
      this.fetchTableItems(this.$route.name)
    },
    updateFiles(id, forAgency = false) {
      this.$router.push({
        name: forAgency ? 'UpdateAdPassportInfoFilesByAgency' : 'UpdateAdPassportInfoFilesByGovernment',
        params: { id: id }
      })
    },
    editItem(id, forAgency = false) {
      this.$router.push({
        name: forAgency ? 'UpdateAdPassportInfoByAgency' : 'UpdateAdPassportInfoByGovernment',
        params: { id: id }
      })
    },
    districtSelected() {
      this.fetchTableItems(this.$route.name)
    },
    contractorSelected() {
      this.fetchTableItems(this.$route.name)
    },
    filteredTableItems(item) {
      if (item != null) {
        if (item.contractorAdvertisingConstructionForSecondAgentDto.isUzAvtoYul) {
          return 'text-info'
        } else {
          return
        }
      }
    }
  },
  /* CREATED */
  async created() {
    this.fetchTableItems(this.$route.name)
    // GET REGIONS
    await helperService.fetchRegionsForAdvertisementByCurrentUserId()
        .then(res => {
          this.regions = res.data
        })
        .catch(e => {
          console.log(e)
        })

    // GET CONTRACTORS
    await crudAndListsService.searchList('contractor', this.var_default_search_payload, 'by-contractor')
        .then(res => {
          this.contractors = res.data.list
        })
        .catch(e => {
          console.log(e)
        })
  },
  /*
  WATCH */
  watch: {
    'var_default_search_payload.page': {
      handler() {
        this.fetchTableItems(this.$route.name)
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.centered-table {
  td,
  th {
    vertical-align: middle;
    text-align: center;
  }
}

.max-height-70 {
  max-height: 70vh;
}
</style>