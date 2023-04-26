<template>
    <div class="row">
        <div class="col-12">
          <div class="col-md-12 text-center">
            <div class="h4 mb-4 d-inline-block">{{ $t('column.petrol') }}</div>
          </div>
            <div class="card">
                <div class="card-body">
                    <div class="row mb-2">
                        <div class="col-sm-5">
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
                        <!-- <div class="col-sm-3">
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
                        </div> -->
                        <!-- <div class="col-sm-1 mt-2">
                            <b-row>
                                <b-col cols="12">
                                    <b-checkbox
                                        v-if="$route.name == 'AdvertisementPassportInfoMain'"
                                        v-model="filterPayload.isUzAvtoyul"
                                        @change="fetchTableItems($route.name)"
                                    >{{
                      $t('column.uzavtoyul')
                    }}
                                    </b-checkbox>
                                    <b-checkbox
                                        v-else-if="$route.name == 'AdvertisementPassportInfoAvtoyulFalse'"
                                        disabled
                                    >{{
                      $t('column.uzavtoyul')
                    }}
                                    </b-checkbox>
                                    <b-checkbox
                                        v-else-if="$route.name == 'AdvertisementPassportInfoAvtoyulTrue'"
                                        checked="true"
                                        disabled
                                    >{{
                      $t('column.uzavtoyul')
                    }}
                                    </b-checkbox>

                                </b-col>

                            </b-row>
                        </div> -->

                        <div class="col-sm-7">
                            <div class="text-sm-end">
                                <!-- <b-col
                                        cols="6"
                                        class="d-flex justify-content-end"
                                    >
                                        <download-excel
                                            :data="json_data"
                                            :fields="json_fields"
                                            header="Ташқи реклама конструкцияси маълумотлари"
                                            worksheet="My Worksheet"
                                            name="Ташқи_реклама_конструкцияси_маълумотлари.xls"
                                            style="width: fit-content"
                                        >
                                            <b-btn
                                                @click="downloadExcel"
                                                type="button"
                                                class="btn btn-rounded bg-primary mb-2"
                                            >
                                                <i class="mdi mdi-microsoft-excel me-1"></i> {{ $t('actions.download') }}
                                            </b-btn>
                                        </download-excel>
                                    </b-col> -->
                                <!-- ADD BUTTON FOR AGENCY -->
                                <b-btn
                                    type="button"
                                    class="btn btn-info btn-rounded mb-2 me-2"
                                    :to="{name: 'CreatePetrolStation'}"
                                >
                                    <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add') }}
                                </b-btn>
                            </div>
                        </div>
                        <!-- end col-->
                    </div>
                    <!-- second row -->
                    <div class="row mb-2">
                        <div class="col-sm-12">
                            <b-row>
                                <b-col cols="5">
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
                                <b-col cols="3">
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
                        :busy="loadingTableItems"
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

                        <!-- REGION NAME -->
                        <template #cell(regionName)="data">
                            <div class="d-flex justify-content-between">
                                <p>
                                    {{
                    getName({
                      nameRu: data.item.addressDto.regionNameRu,
                      nameLt: data.item.addressDto.regionNameLt,
                      nameUz: data.item.addressDto.regionNameUz,
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
                      nameRu: data.item.addressDto.districtNameRu,
                      nameLt: data.item.addressDto.districtNameLt,
                      nameUz: data.item.addressDto.districtNameUz,
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
                      nameRu: data.item.addressDto.quarterNameRu,
                      nameLt: data.item.addressDto.quarterNameLt,
                      nameUz: data.item.addressDto.quarterNameUz,
                    })
                  }}
                                </p>
                            </div>
                        </template>

                        <!-- ACTIONS -->
                        <template #cell(actions)="data">
                            <div class="general-table__actions d-flex justify-content-center">
                                <!-- EDIT BUTTON FOR AGENCY -->
                                <b-btn
                                  v-if="$can('update', 'petrol')"
                                    variant="link"
                                    class="text-decoration-none p-0"
                                    style="font-size: 1.2rem; margin-right: 1rem;"
                                >
                                    <i
                                        @click="editItem(data.item.id)"
                                        class="mdi mdi-circle-edit-outline edit"
                                    ></i>
                                </b-btn>

                                <!-- DELETE BUTTON -->
                                <b-btn
                                  v-if="$can('delete', 'petrol')"
                                    variant="link"
                                    class="text-decoration-none p-0 text-danger"
                                    style="font-size: 1.2rem;"
                                >
                                    <i
                                        @click="deleteItem(data.item.id)"
                                        class="mdi mdi-trash-can delete"
                                    ></i>
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
                                ></b-spinner>

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

const MAIN_API_URL = 'petrol'
import crudAndListsService from '@/shared/services/crud_and_list.service'
import helperService from '@/shared/services/helper.service'

export default {
    components: {},
    data () {
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
                [this.$t('column.orienter')]: "additional",
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
            tableFields: [
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
                    label: this.$t('column.name'),
                    key: "name"
                },
                {
                    label: this.$t('column.petrol_station_owner'),
                    key: "contractorName"
                },
                {
                    label: this.$t('column.petrol_station_owner_inn'),
                    key: "inn"
                },
                {
                    label: this.$t('column.created_date'),
                    key: "constructDate"
                },
                { label: this.$t('column.comment'), key: "description" },
                // { label: this.$t('column.status'), key: "status" },
                { label: this.$t('column.region'), key: "regionName" },
                { label: this.$t('column.district'), key: "districtName" },
                { label: this.$t('column.quarter'), key: "quarterName" },
                {
                    label: this.$t('column.orienter'),
                    key: "addressDto.additional"
                },
                {
                    label: this.$t('column.created_by'),
                    key: "createdByEmployeeFullName"
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
        numberOfPages () {
            return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
        }
    },
    methods: {
        selectList ($event) {
            if ($event == 'all') {
                this.var_default_search_payload.itemsPerPage = this.totalItems
            } else {
                this.var_default_search_payload.itemsPerPage = $event
            }
            this.fetchTableItems(this.$route.name);
        },
        debounceSearchTableItems () {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(async () => {
                await this.fetchTableItems(this.$route.name);
            }, 1000);
        },
        fetchTableItems (name) {
            this.loadingTableItems = true
            this.var_default_search_payload.keyword = this.searchKeyword
            this.var_default_search_payload.regionId = this.filterPayload.regionId
            this.var_default_search_payload.districtIds = this.filterPayload.districtIds
            this.var_default_search_payload.contractorIds = this.filterPayload.contractorIds
            // this.var_default_search_payload.designTypeIds = this.filterPayload.designTypeIds
            // this.var_default_search_payload.passportNumber = this.filterPayload.passportNumber
            // this.var_default_search_payload.givenDate = this.filterPayload.givenDate
            // this.var_default_search_payload.expireDate = this.filterPayload.expireDate
            // this.var_default_search_payload.isUzAvtoyul = this.filterPayload.isUzAvtoyul
            crudAndListsService
                .searchListWithKeywordForPetrolStations(MAIN_API_URL, this.var_default_search_payload, null, true)
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
        downloadExcel () {
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
        customLabelDistrict (opt) {
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
        customLabelContractor (opt) {
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
        async regionSelected ($event, dontResetDistrict = false) {
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
        editItem (id) {
            this.$router.push({
                name: 'UpdatePetrolStation',
                params: { id: id }
            })
        },
        deleteItem (id) {
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
        districtSelected () {
            this.fetchTableItems()
        },
        contractorSelected () {
            this.fetchTableItems()
        }
    },
    /* CREATED */
    async created () {
        await helperService.testTelegramBotApi(18, 5)
                    .then(res => {
                    })
                    .catch(e => {
                        console.log(e)
                    })
        this.fetchTableItems(this.$route.name)
        // GET REGIONS
        await helperService.fetchRegionsForPetrolByCurrentUserId()
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
            handler () {
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