<template>
  <div class="row">
    <div class="col-md-12 text-center">
      <div class="h4 mb-4 d-inline-block">{{ $t('submodules.ad_passport_info.title') }}</div>
    </div>
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <b-row v-if="currentUserIsOuter">
            <b-col sm="12">
              <div class="text-sm-start">
                <b-checkbox v-if="$route.name === 'AdvertisementPassportInfoMain'"
                            v-model="filterPayload.isUzAvtoyul"
                            @change="fetchTableItems($route.name)"
                >
                  {{ $t('column.uzavtoyul') }}
                </b-checkbox>
                <b-checkbox v-else-if="$route.name === 'AdvertisementPassportInfoAvtoyulFalse'" disabled>
                  {{ $t('column.uzavtoyul') }}
                </b-checkbox>
                <b-checkbox v-else-if="$route.name === 'AdvertisementPassportInfoAvtoyulTrue'"
                            checked="true"
                            disabled>
                  {{ $t('column.uzavtoyul') }}
                </b-checkbox>
              </div>
              <div class="text-sm-end">
                <download-excel
                    v-b-popover.hover.bottom="{title:$t('actions.download'),content:null}"
                    class="d-inline-block"
                    :data="json_data"
                    :fields="json_fields"
                    :header="$t('submodules.ad_passport_info.title')"
                    :worksheet="$t('submodules.ad_passport_info.title')"
                    :name="`${$t('submodules.ad_passport_info.title')}.xls`"
                >
                  <b-btn
                      @click="downloadExcel"
                      pill
                      variant="primary"
                      class="mb-2"
                  >
                    <i class="mdi mdi-microsoft-excel me-1"></i> {{ $t('actions.download') }}
                  </b-btn>
                </download-excel>
              </div>
            </b-col>
          </b-row>
          <div class="row mb-2" v-if="!currentUserIsOuter">
            <div class="col-sm-4">
              <div class="row">
                <div class="col-8 search-box mb-2 d-inline-block">
                  <div class="position-relative">
                    <input
                        v-model="searchKeyword"
                        type="text"
                        class="form-control"
                        @input="debounceSearchTableItems"
                        :placeholder="$t('column.search')"
                    />
                    <i class="bx bx-search-alt search-icon"></i>
                  </div>
                </div>
                <div class="col-4 d-inline-block">
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
            </div>
            <div class="col-sm-3">
              <b-row>
                <b-col cols="12">
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
            <div class="col-sm-1 mt-2">
              <b-row>
                <b-col cols="12">
                  <b-checkbox v-if="$route.name === 'AdvertisementPassportInfoMain'"
                              v-model="filterPayload.isUzAvtoyul"
                              @change="fetchTableItems($route.name)"
                  >
                    {{ $t('column.uzavtoyul') }}
                  </b-checkbox>
                  <b-checkbox v-else-if="$route.name === 'AdvertisementPassportInfoAvtoyulFalse'" disabled>
                    {{ $t('column.uzavtoyul') }}
                  </b-checkbox>
                  <b-checkbox v-else-if="$route.name === 'AdvertisementPassportInfoAvtoyulTrue'"
                              checked="true"
                              disabled>
                    {{ $t('column.uzavtoyul') }}
                  </b-checkbox>
                </b-col>
              </b-row>
            </div>
            <div class="col-sm-4">
              <div class="text-sm-end">
                <download-excel
                    v-b-popover.hover.bottom="{title:$t('actions.download'),content:null}"
                    class="d-inline-block"
                    :data="json_data"
                    :fields="json_fields"
                    :header="$t('submodules.ad_passport_info.title')"
                    :worksheet="$t('submodules.ad_passport_info.title')"
                    :name="`${$t('submodules.ad_passport_info.title')}.xls`"
                >
                  <b-btn
                      @click="downloadExcel"
                      pill
                      variant="primary"
                      class="mb-2"
                  >
                    <i class="mdi mdi-microsoft-excel me-1"></i> {{ $t('actions.download') }}
                  </b-btn>
                </download-excel>
                <b-btn @click="downloadAllExcel" class="mb-2" type="primary" pill
                       v-b-popover.hover.bottom="{title:$t('actions.download_all_excel'),content:null}">
                  <i class="mdi mdi-microsoft-excel me-1"></i> {{ $t('actions.download_all_excel') }}
                </b-btn>
                <b-btn
                    v-if="$can('create', 'contractor advertising construction')"
                    v-b-popover.hover.bottom="{title:$t('actions.add'),content:null}"
                    pill variant="success" class="mb-2" :to="{name: 'CreateAdPassportInfoByAgency'}"
                >
                  <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add') }}
                </b-btn>
                <!-- ADD BUTTON FOR GOVERNMENT -->
                <b-btn
                    v-else-if="$can('create', 'contractor advertising construction for first agent')"
                    type="button"
                    class="btn btn-success btn-rounded mb-2 me-2"
                    :to="{name: 'CreateAdPassportInfoByGovernment'}"
                >
                  <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add') }}
                </b-btn>
              </div>
            </div>
          </div>
          <!-- second row -->
          <div class="row mb-2" v-if="!currentUserIsOuter">
            <div class="col-sm-12">
              <b-row>
                <b-col cols="4">
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
                <b-col cols="2">
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
                <b-col cols="2">
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
                      @input="expireDateSelected"
                      :placeholder="$t('column.expire_date')"
                      lang="ru"
                  ></BaseDatePickerWithValidation>
                </b-col>
              </b-row>
            </div>
          </div>
          <!-- end second row -->
          <!-- Table data -->
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

            <!-- UZAVTOYUL -->
            <template #cell(uzavtoyul)="data">
              <span v-if="data.item.contractorAdvertisingConstructionForSecondAgentDto.isUzAvtoYul">
                {{ $t('column.belongs_to_uzavtoyul') }}
              </span>
            </template>

            <template #cell(contractorAdvertisingConstructionForFirstAgentDto.passportNumber)="data">
              <div class="d-flex justify-content-between width-150">
                {{ data.item.contractorAdvertisingConstructionForFirstAgentDto.passportNumber }}
              </div>
            </template>

            <template #cell(contractorAdvertisingConstructionForFirstAgentDto.passportExpireDate)="data">
              <div class="d-flex justify-content-between width-250">
                {{ data.item.contractorAdvertisingConstructionForFirstAgentDto.passportExpireDate }}
              </div>
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
              <div class="d-flex justify-content-between width-200">
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
              <div class="d-flex justify-content-between width-300">
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
              <div class="general-table__actions">
                <b-btn-group class="d-flex justify-content-center">
                  <!-- EDIT BUTTON FOR AGENCY -->
                  <b-btn
                      v-if="$can('update', 'contractor advertising construction')"
                      v-b-popover.hover.bottom="{title:$t('actions.update'),content:null}"
                      variant="link"
                      class="text-decoration-none p-0"
                      style="font-size: 1.2rem; margin-right: 1rem;"
                  >
                    <i
                        @click="editItem(data.item.contractorAdvertisingConstructionForFirstAgentDto.id, true)"
                        class="mdi mdi-circle-edit-outline edit"
                    ></i>
                  </b-btn>
                  <!-- EDIT BUTTON FOR GOVERNMENT -->
                  <b-btn
                      v-else-if="$can('update', 'contractor advertising construction for first agent')"
                      variant="link"
                      class="text-decoration-none p-0"
                      style="font-size: 1.2rem; margin-right: 1rem;"
                  >
                    <i
                        @click="editItem(data.item.contractorAdvertisingConstructionForFirstAgentDto.id)"
                        class="mdi mdi-circle-edit-outline edit"
                    ></i>
                  </b-btn>

                  <!-- UPDATE BUTTON FOR FILES -->
                  <b-btn
                      variant="link"
                      class="text-decoration-none p-0 text-primary"
                      v-b-popover.hover.bottom="{title:$t('actions.upload_file'),content:null}"
                      style="font-size: 1.2rem;"
                  >
                    <i
                        @click="updateFiles(data.item.contractorAdvertisingConstructionForFirstAgentDto.id, $can('update', 'contractor advertising construction'))"
                        class="mdi mdi-file-upload-outline"
                    ></i>
                  </b-btn>
                </b-btn-group>
                <b-btn-group class="d-flex justify-content-center">
                  <!-- DETAILS BUTTON -->
                  <b-btn
                      v-b-popover.hover.bottom="{title:$t('actions.details'),content:null}"
                      variant="link"
                      class="text-decoration-none p-0 text-success"
                      style="font-size: 1.2rem; margin-right: 1rem;"
                  >
                    <i
                        @click="toDetails(data.item.contractorAdvertisingConstructionForFirstAgentDto.id)"
                        class="bx bxs-detail"
                    ></i>
                  </b-btn>

                  <!-- DELETE BUTTON -->
                  <b-btn
                      v-if="$can('delete', 'contractor advertising construction') && !currentUserIsOuter"
                      variant="link"
                      v-b-popover.hover.bottom="{title:$t('actions.delete'),content:null}"
                      class="text-decoration-none p-0 text-danger"
                      style="font-size: 1.2rem;"
                  >
                    <i
                        @click="deleteItem(data.item.contractorAdvertisingConstructionForFirstAgentDto.id)"
                        class="mdi mdi-trash-can delete"
                    ></i>
                  </b-btn>
                </b-btn-group>
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

import ApiService from "@/shared/services/api.service";
import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'
import helperService from '@/shared/services/helper.service'
import { TokenService } from '@/shared/services/storage.service'

const MAIN_API_URL = 'contractor-advertising-construction'
const APPEND_API_URL = 'by-first-agent'

const i18n = require("../../../../i18n");

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
        [this.$t('column.ad_construction_type')]: "advertisementTypeName",
        [this.$t('column.created_date')]: "constructDate",
        [this.$t('column.status')]: "advertisementObjectStateName",
        [this.$t('column.comment')]: "description",
        [this.$t('column.monthly_income')]: "monthlyPayment",
        [this.$t('column.ad_construction_zone')]: "advertisementZoneName",
        [this.$t('column.ad_construction_side')]: "typeOfOutdoorAdvertisingTool",
        [this.$t('column.ad_construction_volume')]: "volume",
        [this.$t('submodules.ad_volume_types.title')]: "typeFormat",
        [this.$t('column.ad_construction_passport_number')]: "passportNumber",
        [this.$t('column.ad_construction_passport_given_date')]: "passportGivenDate",
        [this.$t('column.ad_construction_passport_expire_date')]: "passportExpireDate",
        [this.$t('column.region')]: "regionName",
        [this.$t('column.district')]: "districtName",
        [this.$t('column.quarter')]: "quarterName",
        [this.$t('column.street')]: "streetName",
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
        // {
        //     label: this.$t('column.ad_construction_owner_phone_number'),
        //     key: "contractorAdvertisingConstructionForFirstAgentDto.contractorPhoneNumber"
        // },
        {
          label: this.$t('column.uzavtoyul'),
          key: "uzavtoyul"
        },
        { label: this.$t('column.ad_construction_type'), key: "advertisementTypeName" },
        { label: this.$t('column.ad_construction_zone'), key: "advertisementZoneName" },
        { label: this.$t('column.ad_construction_side'), key: "typeOfOutdoorAdvertisingTool" },
        {
          label: this.$t('column.ad_construction_volume'),
          key: "contractorAdvertisingConstructionForFirstAgentDto.volume",
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
        { label: this.$t('column.quarter'), key: "quarterName" },
        // { label: this.$t('column.street'), key: "streetName" },
        {
          label: this.$t('column.address'),
          key: "contractorAdvertisingConstructionForFirstAgentDto.addressDto.additional"
        },
        {
          label: this.$t('column.actions'),
          key: "actions",
          thClass: "text-center",
          tdClass: "text-center",
        },
      ],
      tableFieldsForAgency: [
        {
          label: "#",
          thClass: "text-center",
          tdClass: "text-center",
          key: "index",
        },
        {
          label: this.$t('column.actions'),
          key: "actions",
          thClass: "text-center",
          tdClass: "text-center",


        },
        {
          label: this.$t('column.ad_construction_owner'),
          key: "contractorAdvertisingConstructionForSecondAgentDto.contractorName"
        },
        {
          label: this.$t('column.ad_construction_owner_inn'),
          key: "contractorAdvertisingConstructionForSecondAgentDto.inn"
        },
        // {
        //     label: this.$t('column.ad_construction_owner_phone_number'),
        //     key: "c.contractorPhoneNumber"
        // },
        {
          label: this.$t('column.uzavtoyul'),
          key: "uzavtoyul"
        },
        { label: this.$t('column.ad_construction_type'), key: "advertisementTypeName" },
        {
          label: this.$t('column.created_date'),
          key: "contractorAdvertisingConstructionForSecondAgentDto.constructDate"
        },
        { label: this.$t('column.status'), key: "advertisementObjectStateName" },
        // { label: this.$t('column.comment'), key: "contractorAdvertisingConstructionForSecondAgentDto.description" },
        // {
        //     label: this.$t('column.monthly_income'),
        //     key: "monthlyPayment"
        // },
        { label: this.$t('column.ad_construction_zone'), key: "advertisementZoneName" },
        { label: this.$t('column.ad_construction_side'), key: "typeOfOutdoorAdvertisingTool" },
        {
          label: this.$t('column.ad_construction_volume'),
          key: "contractorAdvertisingConstructionForSecondAgentDto.volume",
        },
        { label: this.$t('submodules.ad_volume_types.title'), key: "typeFormat" },
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
        { label: this.$t('column.quarter'), key: "quarterName" },
        // { label: this.$t('column.street'), key: "streetName" },
        {
          label: this.$t('column.address'),
          key: "contractorAdvertisingConstructionForSecondAgentDto.addressDto.additional"
        },
        // {
        //     label: this.$t('column.created_by'),
        //     key: "contractorAdvertisingConstructionForSecondAgentDto.createdByEmployeeFullName"
        // },
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
        designTypeIds: [],
        givenDate: '',
        expireDate: '',
        isUzAvtoyul: false
      }
    };
  },
  /*
  COMPUTED */
  computed: {
    tableFields() {
      return this.$can('list', 'contractor advertising construction') ? this.tableFieldsForAgency : this.tableFieldsForGovernment;
    },
    currentUserIsOuter(){
      return TokenService.getIsOuter();
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
      this.var_default_search_payload.keyword = this.searchKeyword
      this.var_default_search_payload.regionId = this.filterPayload.regionId
      this.var_default_search_payload.districtIds = this.filterPayload.districtIds
      this.var_default_search_payload.contractorIds = this.filterPayload.contractorIds
      this.var_default_search_payload.designTypeIds = this.filterPayload.designTypeIds
      this.var_default_search_payload.passportNumber = this.filterPayload.passportNumber
      this.var_default_search_payload.givenDate = this.filterPayload.givenDate
      this.var_default_search_payload.expireDate = this.filterPayload.expireDate
      if (name === 'AdvertisementPassportInfoAvtoyulTrue') {
        this.loadingTableItems = true
        this.var_default_search_payload.isUzAvtoyul = true
        crudAndListsService
            .searchListWithKeywordByRegionAndDistrictAndContractorByAvtoyul(MAIN_API_URL, this.var_default_search_payload, this.$can('list', 'contractor advertising construction') ? '' : 'by-first-agent', true)
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
      } else if (name === 'AdvertisementPassportInfoAvtoyulFalse') {
        this.loadingTableItems = true
        this.var_default_search_payload.isUzAvtoyul = false
        crudAndListsService
            .searchListWithKeywordByRegionAndDistrictAndContractorByAvtoyul(MAIN_API_URL, this.var_default_search_payload, this.$can('list', 'contractor advertising construction') ? '' : 'by-first-agent', true)
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
        this.loadingTableItems = true
        this.var_default_search_payload.isUzAvtoyul = this.filterPayload.isUzAvtoyul
        crudAndListsService
            .searchListWithKeywordByRegionAndDistrictAndContractor(MAIN_API_URL, this.var_default_search_payload, this.$can('list', 'contractor advertising construction') ? '' : 'by-first-agent', true)
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
      }
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
    generatePayloadUrl(requestParams) {
      return '?' + Object.keys(requestParams).map(key => {
        if (requestParams[key]) {
          return key + '=' + requestParams[key]
        }
      }).filter(v => !!v).join('&');
    },
    async downloadAllExcel() {
      const name = this.$route.name;
      let filter = {};
      filter.keyword = this.searchKeyword
      filter.regionId = this.filterPayload.regionId
      filter.districtIds = this.filterPayload.districtIds
      filter.contractorIds = this.filterPayload.contractorIds
      filter.designTypeIds = this.filterPayload.designTypeIds
      filter.givenDate = this.filterPayload.givenDate
      filter.expireDate = this.filterPayload.expireDate
      if (name === 'AdvertisementPassportInfoAvtoyulTrue') {
        filter.isUzAvtoyul = true
      } else if (name === 'AdvertisementPassportInfoAvtoyulFalse') {
        c.isUzAvtoyul = false
      } else {
        filter.isUzAvtoyul = this.filterPayload.isUzAvtoyul
      }
      let url = MAIN_API_URL + '/excel-download-all'
      if (filter) {
        url += this.generatePayloadUrl(filter);
      }
      return ApiService.responseTypeBlob(url, true).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        const file_name = `${this.$t('submodules.integration.customs_product.title')} ${this.$t('submodules.integration.customs_product.import')} - ${new Date().toISOString().slice(0, 10)}.xlsx`;
        link.href = url;
        link.setAttribute('download', file_name);
        document.body.appendChild(link);
        link.click();
      });
    },
    customLabelDistrict(opt) {
      let selected = this.districts.find(e => e.id === opt);
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
      let selected = this.contractors.find(e => e.id === opt);
      if (selected) {
        return `${selected.fullName}`
      }
      return ``;
    },
    customLabelRegion(opt) {
      let selected = this.regions.find(e => e.regionId === (opt.regionId ? opt.regionId : opt));
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
      let selected = this.adDesignTypes.find(e => e.id === (opt.id ? opt.id : opt));
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
    toDetails(id) {
      this.$router.push({
        name: 'AdvertisementDetails',
        params: { id: id }
      })
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
                    this.fetchTableItems(this.$route.name)
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
      this.fetchTableItems(this.$route.name)
    },
    contractorSelected() {
      this.fetchTableItems(this.$route.name)
    },
    adDesignTypeSelected() {
      this.fetchTableItems(this.$route.name)
    },
    givenDateSelected() {
      this.fetchTableItems(this.$route.name)
    },
    expireDateSelected() {
      this.fetchTableItems(this.$route.name)
    },
    filteredTableItems(item) {
      if (item != null) {
        if (item.contractorAdvertisingConstructionForSecondAgentDto.isUzAvtoYul) {
          return 'text-info'
        } else {
          return '';
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
    if (this.$can('list','contractor')) {
      await crudAndListsService.searchList('contractor', this.var_default_search_payload, 'by-contractor')
          .then(res => {
            this.contractors = res.data.list
          })
          .catch(e => {
            console.log(e)
          })
    }

    // GET AD DESIGN TYPES
    if (this.$can('list', 'directory advertisement design type by active status')) {
      await helperService.getAdDesignTypesByActiveStatus()
          .then((res) => {
            this.adDesignTypes = res.data;
          })
          .catch(e => {
            console.log(e)
          })
    }

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

.width-250 {
  width: 250px;
}

.width-200 {
  width: 200px;
}

.width-150 {
  width: 150px;
}

.width-100 {
  width: 100px;
}
</style>