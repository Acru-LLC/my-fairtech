<template>
  <div class="row">
    <div class="col-12">
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.inventory_report.inventory_report_list') }}</div>
      </div>
      <div class="card">
        <div class="card-body">
          <div class="row mb-2">
            <div class="col-sm-6">
              <div class="col-7 search-box me-4 mb-2 d-inline-block">
                <div class="position-relative">
                  <input
                      v-model="searchKeyword"
                      type="text"
                      class="form-control"
                      @input="fetchTableItems"
                      :placeholder="$t('column.search')"
                  />
                  <i class="bx bx-search-alt search-icon"></i>
                </div>
              </div>
              <div class="col-3 me-2 mx-2 d-inline-block">
                <div class="position-relative">
                  <b-form-select
                      v-model="selected"
                      :options="optionsTable"
                      @change="selectList"
                      class="form-select"
                  ></b-form-select>
                </div>
              </div>
            </div>
            <div class="col-sm-4">
              <b-row>
                <b-col cols="12">
                  <!-- AD_DESIGN_TYPES -->
                  <BaseMultiselectWithValidation
                      not-required
                      multiple
                      v-model="filterPayload.designTypeIds"
                      :options="adDesignTypes.map(e => e.id)"
                      @input="adDesignTypeSelected"
                      :hide-selected="true"
                      :close-on-select="false"
                      :placeholder="$t('column.ad_design_type')"
                      :custom-label="customLabelAdDesignType"
                      open-direction="bottom"
                      style="width: 100%;"
                      :max-height="600"
                      :show-labels="false"
                      :only-form-element="true"
                  />
                </b-col>

              </b-row>
            </div>
            <!-- end col-->
          </div>
          <!-- second row -->
          <div class="row mb-2">
            <div class="col-sm-12">
              <b-row>
                <b-col cols="6" v-if="!isOuter">
                  <!-- CONTRAGENTS -->
                  <BaseMultiselectWithValidation
                      not-required
                      multiple
                      :hide-selected="true"
                      :close-on-select="false"
                      :show-labels="false"
                      v-model="filterPayload.contractorId"
                      @input="contractorSelected"
                      :options="contractors.map(e => e.id)"
                      :placeholder="$t('submodules.contractor.title')"
                      :custom-label="customLabelContractor"
                      open-direction="bottom"
                      style="width: 100%;"
                      :max-height="600"
                      :only-form-element="true"
                  />
                </b-col>
                <b-col cols="3">
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
                <b-col cols="3">
                  <!-- DISTRICTS -->
                  <BaseMultiselectWithValidation
                      not-required
                      multiple
                      v-model="filterPayload.districtIds"
                      @input="districtSelected"
                      :options="districts.map(e => e.id)"
                      :hide-selected="true"
                      :close-on-select="false"
                      :placeholder="$t('column.district')"
                      :custom-label="customLabelDistrict"
                      open-direction="bottom"
                      style="width: 100%"
                      :max-height="600"
                      :show-labels="false"
                      :only-form-element="true"
                  />
                </b-col>
              </b-row>
            </div>
          </div>
          <!-- end second row -->
          <!-- Table data -->
          <b-table
              :items="tableItems"
              :fields="tableFields"
              :table-busy="loadingTableItems"
              id="my-table"
              class="custom-b-table max-height-70"
              responsive
              sticky-header
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

            <!-- ADVERTISEMENT TYPE NAME -->
            <template #cell(advertisementTypeName)="data">
              <div class="d-flex justify-content-between">
                <p>
                  {{
                    getName({
                      nameRu: data.item.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementTypeNameRu,
                      nameLt: data.item.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementTypeNameLt,
                      nameUz: data.item.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementTypeNameUz,
                    })
                  }}
                </p>
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

            <!-- ADVERTISEMENT ZONE NAME -->
            <template #cell(advertisementZoneName)="data">
              <div class="d-flex justify-content-between">
                <p>
                  {{
                    getName({
                      nameRu: data.item.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementZoneNameRu,
                      nameLt: data.item.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementZoneNameLt,
                      nameUz: data.item.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementZoneNameUz,
                    })
                  }}
                </p>
              </div>
            </template>

            <!-- TYPE OF OUTDOOR ADVERTISING TOOL -->
            <template #cell(typeOfOutdoorAdvertisingTool)="data">
              <div class="d-flex justify-content-between">
                <p>
                  {{
                    getName({
                      nameRu: data.item.contractorAdvertisingConstructionForSecondAgentDto.directoryTypeOfOutdoorAdvertisingToolNameRu,
                      nameLt: data.item.contractorAdvertisingConstructionForSecondAgentDto.directoryTypeOfOutdoorAdvertisingToolNameLt,
                      nameUz: data.item.contractorAdvertisingConstructionForSecondAgentDto.directoryTypeOfOutdoorAdvertisingToolNameUz,
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

            <!-- QUARTER NAME -->
            <template #cell(quarterName)="data">
              <div class="d-flex justify-content-between">
                <p>
                  {{
                    getName({
                      nameRu: data.item.contractorAdvertisingConstructionForSecondAgentDto.addressDto.quarterNameRu,
                      nameLt: data.item.contractorAdvertisingConstructionForSecondAgentDto.addressDto.quarterNameLt,
                      nameUz: data.item.contractorAdvertisingConstructionForSecondAgentDto.addressDto.quarterNameUz,
                    })
                  }}
                </p>
              </div>
            </template>

            <!-- STREET NAME -->
            <template #cell(streetName)="data">
              <div class="d-flex justify-content-between">
                <p>
                  {{
                    getName({
                      nameRu: data.item.contractorAdvertisingConstructionForSecondAgentDto.addressDto.streetNameRu,
                      nameLt: data.item.contractorAdvertisingConstructionForSecondAgentDto.addressDto.streetNameLt,
                      nameUz: data.item.contractorAdvertisingConstructionForSecondAgentDto.addressDto.streetNameUz,
                    })
                  }}
                </p>
              </div>
            </template>

            <!-- VOLUME TYPE FORMAT -->
            <template #cell(typeFormat)="data">
              <div class="d-flex justify-content-between">
                <p>
                  {{
                    getName({
                      nameRu: data.item.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementVolumeTypeNameRu,
                      nameLt: data.item.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementVolumeTypeNameLt,
                      nameUz: data.item.contractorAdvertisingConstructionForSecondAgentDto.directoryAdvertisementVolumeTypeNameUz,
                    })
                  }}
                </p>
              </div>
            </template>

            <!-- MONTHLY PAYMENT -->
            <template #cell(monthlyPayment)="data">
              <div class="d-flex justify-content-between">
                <p>{{ getNumberFormat(data.item.contractorAdvertisingConstructionForSecondAgentDto.monthlyPayment) }}
                </p>
              </div>
            </template>

            <!-- ACTIONS -->
            <template #cell(actions)="data">
              <div class="general-table__actions d-flex justify-content-center">
                <!-- DETAILS BUTTON -->
                <b-btn
                    v-if="$can('get', 'contractor advertising construction')"
                    v-b-tooltip.hover title="Батафсил"
                    variant="link"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                    :to="{name: 'AdvertisementDetailsById', params: {adId: data.item.contractorAdvertisingConstructionForSecondAgentDto.id}}"
                >
                  <i class="mdi mdi-eye"></i>
                </b-btn>
                <!-- LIST INVENTORY REPORT -->
                <b-btn
                    variant="link"
                    v-b-tooltip.hover title="Хатлов"
                    class="text-decoration-none p-0"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                    :to="{name: 'InventoryReport', params: {adId: data.item.contractorAdvertisingConstructionForSecondAgentDto.id}}"
                >
                  <i v-if="data.item.contractorAdvertisingConstructionForSecondAgentDto.reportIsPresent"
                     class="bx bxs-bell bx-tada" style="color: green"
                  ></i>
                  <i v-else
                     class="bx bxs-bell"
                  ></i>
                </b-btn>

                <!-- CREATE INVENTORY REPORT -->
                <b-btn
                    variant="link"
                    v-b-tooltip.hover title="Хатлов яратиш"
                    class="text-decoration-none p-0 text-primary"
                    style="font-size: 1.2rem; margin-right: 1rem;"
                >
                  <i
                      @click="createInventoryReport(data.item.contractorAdvertisingConstructionForFirstAgentDto.id)"
                      class="mdi mdi-plus-box"
                  ></i>
                </b-btn>
              </div>
            </template>

            <!-- EMPTY SLOT -->
            <template #empty="">
              <h4 class="text-center">{{
                  activeDep.contractorId ? 'Маълумот топилмади' : 'Илтимос контрагентни танланг'
                }}</h4>
            </template>

            <!-- TABLE_BUSY SLOT -->
            <template #table-busy>
              <div class="text-center my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
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

import {mapActions} from 'vuex'
import {TokenService} from "@/shared/services/storage.service"

const MAIN_API_URL = 'contractor-advertising-construction'
const MAIN_NOTIFICATION_API_URL = 'report/advertisement-notifications'
const APPEND_API_URL = 'by-first-agent'
import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'
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
      title: "Passport info",
      activeDep: {},
      tableItems: [],
      totalItems: 0,
      tableFieldsForGovernment: [
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
          sortable: false
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
          label: this.$t('column.ad_construction_owner_phone_number'),
          key: "contractorAdvertisingConstructionForFirstAgentDto.contractorPhoneNumber"
        },
        {label: this.$t('column.ad_construction_type'), key: "advertisementTypeName"},
        {label: this.$t('column.ad_construction_zone'), key: "advertisementZoneName"},
        {label: this.$t('column.ad_construction_side'), key: "typeOfOutdoorAdvertisingTool"},
        {
          label: this.$t('column.ad_construction_volume'),
          key: "contractorAdvertisingConstructionForFirstAgentDto.volume"
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
        {label: this.$t('column.region'), key: "regionName"},
        {label: this.$t('column.district'), key: "districtName"},
        {label: this.$t('column.quarter'), key: "quarterName"},
        {label: this.$t('column.street'), key: "streetName"},
        {
          label: this.$t('column.address'),
          key: "contractorAdvertisingConstructionForFirstAgentDto.addressDto.additional"
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
          sortable: false
        },
        {
          label: this.$t('column.ad_construction_owner'),
          key: "contractorAdvertisingConstructionForSecondAgentDto.contractorName"
        },
        // {
        //   label: this.$t('column.ad_construction_owner_inn'),
        //   key: "contractorAdvertisingConstructionForSecondAgentDto.inn"
        // },
        // {
        //   label: this.$t('column.ad_construction_owner_phone_number'),
        //   key: "c.contractorPhoneNumber"
        // },
        // {label: this.$t('column.ad_construction_type'), key: "advertisementTypeName"},
        {
          label: this.$t('column.created_date'),
          key: "contractorAdvertisingConstructionForSecondAgentDto.constructDate"
        },
        // {label: this.$t('column.status'), key: "advertisementObjectStateName"},
        // {label: this.$t('column.comment'), key: "contractorAdvertisingConstructionForSecondAgentDto.description"},
        // {
        //   label: this.$t('column.monthly_income'),
        //   key: "monthlyPayment"
        // },
        {label: this.$t('column.ad_construction_zone'), key: "advertisementZoneName"},
        {label: this.$t('column.ad_construction_side'), key: "typeOfOutdoorAdvertisingTool"},
        // {
        //   label: this.$t('column.ad_construction_volume'),
        //   key: "contractorAdvertisingConstructionForSecondAgentDto.volume"
        // },
        {label: this.$t('submodules.ad_volume_types.title'), key: "typeFormat"},
        {
          label: this.$t('column.ad_construction_passport_number'),
          key: "contractorAdvertisingConstructionForSecondAgentDto.passportNumber"
        },
        // {
        //   label: this.$t('column.ad_construction_passport_given_date'),
        //   key: "contractorAdvertisingConstructionForSecondAgentDto.passportGivenDate"
        // },
        // {
        //   label: this.$t('column.ad_construction_passport_expire_date'),
        //   key: "contractorAdvertisingConstructionForSecondAgentDto.passportExpireDate"
        // },
        {label: this.$t('column.region'), key: "regionName"},
        {label: this.$t('column.district'), key: "districtName"},
        {label: this.$t('column.quarter'), key: "quarterName"},
        // {label: this.$t('column.street'), key: "streetName"},
        // {
        //   label: this.$t('column.address'),
        //   key: "contractorAdvertisingConstructionForSecondAgentDto.addressDto.additional"
        // },
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
    selectList($event) {
      if ($event == 'all') {
        this.var_default_search_payload.itemsPerPage = this.totalItems
      } else {
        this.var_default_search_payload.itemsPerPage = $event
      }
      this.fetchTableItems();
    },
    fetchTableItems() {
      if (!this.isOuter) {
        this.loadingTableItems = true
        this.var_default_search_payload.keyword = this.searchKeyword
        this.var_default_search_payload.regionId = this.filterPayload.regionId
        this.var_default_search_payload.districtIds = this.filterPayload.districtIds
        this.var_default_search_payload.designTypeIds = this.filterPayload.designTypeIds
        this.var_default_search_payload.passportNumber = this.filterPayload.passportNumber
        this.var_default_search_payload.contractorIds = this.filterPayload.contractorId
        crudAndListsService
            .searchListByContractor(MAIN_API_URL, this.var_default_search_payload)
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
      } else if (this.isOuter) {
        this.loadingTableItems = true
        this.var_default_search_payload.keyword = this.searchKeyword
        this.var_default_search_payload.regionId = this.filterPayload.regionId
        this.var_default_search_payload.districtIds = this.filterPayload.districtIds
        this.var_default_search_payload.designTypeIds = this.filterPayload.designTypeIds
        this.var_default_search_payload.passportNumber = this.filterPayload.passportNumber
        this.var_default_search_payload.contractorId = this.filterPayload.contractorId
        crudAndListsService
            .searchListByContractor(MAIN_API_URL, this.var_default_search_payload, this.filterPayload.contractorId)
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
      } else {
        this.$toast(this.$t('messages.please_select_contractor'), {type: 'warning'});
      }
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
    customLabelRegion (opt) {
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
    createInventoryReport(id, forAgency = false) {
      this.$router.push({
        name: 'CreateInventoryReport',
        params: {adId: id}
      })
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
      this.fetchTableItems()
    },
    updateFiles(id, forAgency = false) {
      this.$router.push({
        name: forAgency ? 'UpdateAdPassportInfoFilesByAgency' : 'UpdateAdPassportInfoFilesByGovernment',
        params: {id: id}
      })
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
                    this.fetchTableItems()
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
    districtSelected() {
      this.fetchTableItems()
    },
    contractorSelected() {
      this.fetchTableItems()
    },
    adDesignTypeSelected() {
      this.fetchTableItems()
    },
  },
  /* CREATED */
  async created() {
    this.fetchTableItems()

    // GET REGIONS
    await helperService.fetchRegionsForAdvertisementByCurrentUserId()
        .then(res => {
          this.regions = res.data
        })
        .catch(e => {
          console.log(e)
        })

    // GET CONTRACTORS
    if (!this.isOuter) {
      await crudAndListsService.searchList('contractor', this.var_default_search_payload, 'by-contractor')
          .then(res => {
            this.contractors = res.data.list
          })
          .catch(e => {
            console.log(e)
          })
    }

    // GET AD DESIGN TYPES
    await helperService.getAdDesignTypesByActiveStatus()
        .then((res) => {
          this.adDesignTypes = res.data;
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
        this.fetchTableItems()
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.centered-table {
  td, th {
    vertical-align: middle;
    text-align: center;
  }
}

.max-height-70 {
  max-height: 70vh;
}

</style>