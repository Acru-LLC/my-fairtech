<template>
    <div class="row">
        <div class="col-12">
          <div class="col-md-12 text-center">
            <div class="h4 mb-4 d-inline-block">{{ $t('submodules.ad_design_type_by_regions.title') }}</div>
          </div>
            <div class="card">
                <div class="card-body">
                    <div class="row mb-2 justify-content-between">
                        <!-- <div class="col-sm-5">
                            <div class="search-box me-4 mb-2 d-inline-block">
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
                            <div class="col-2 me-2 mx-2 d-inline-block">
                                <div class="position-relative">
                                    <b-form-select
                                        v-model="selected"
                                        :options="optionsTable"
                                        @change="selectList"
                                        class="form-select"
                                    ></b-form-select>
                                </div>
                            </div>
                        </div> -->
                        <div class="col-sm-3">
                            <!-- REGIONS -->
                            <BaseMultiselectWithValidation
                                class="required"
                                rules="required"
                                v-model="regionId"
                                :options="regions.map(e => e.id)"
                                @input="regionSelected"
                                only-form-element
                                :allow-empty="false"
                                :custom-label="customLabelRegion"
                                :placeholder="$t('column.region')"
                                open-direction="bottom"
                                :max-height="600"
                                :show-labels="false"
                            />
                        </div>
                        <div class="col-sm-4">
                            <div class="text-sm-end">
                                <!-- <b-col cols="7">
                                        <div class="text-sm-end">
                                            <download-excel
                                                :data="json_data"
                                                :fields="json_fields"
                                                header="Ташқи реклама объекти жойлашуви"
                                                worksheet="My Worksheet"
                                                name="Ташқи_реклама_объекти_жойлашуви.xls"
                                            >
                                                <b-btn
                                                    @click="downloadExcel"
                                                    type="button"
                                                    class="btn btn-rounded bg-primary mb-2"
                                                >
                                                    <i class="mdi mdi-microsoft-excel me-1"></i> {{ $t('actions.download') }}
                                                </b-btn>
                                            </download-excel>
                                        </div>
                                    </b-col> -->
                                <b-btn
                                    type="button"
                                    class="btn btn-success btn-rounded mb-2 me-2"
                                    :to="{name: 'CreateAdvertisementDesignTypesByRegion'}"
                                >
                                    <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add') }}
                                </b-btn>
                            </div>
                        </div>
                        <!-- end col-->
                    </div>
                    <!-- Table data -->
                    <b-table
                        :items="tableItems"
                        :fields="tableFields"
                        :busy="loadingTableItems"
                        id="my-table"
                        class="custom-b-table"
                        responsive
                        bordered
                        small
                        hover
                        show-empty
                    >
                        <!-- NUMBER OF ITEM -->
                        <template #cell(index)="data">
                            {{ util_paginate(data.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage) }}
                        </template>

                        <!-- REGION -->
                        <template #cell(region)="data">
                            {{ getName({
                                          nameRu: data.item.regionNameLt,
                                          nameLt: data.item.regionNameRu,
                                          nameUz: data.item.regionNameUz,
                                        })
                            }}
                        </template>

                        <!-- AD_LOCATION_TYPE -->
                        <template #cell(adLocationType)="data">
                            {{ getName({
                                          nameRu: data.item.directoryAdvertisementLocationTypeNameLt,
                                          nameLt: data.item.directoryAdvertisementLocationTypeNameRu,
                                          nameUz: data.item.directoryAdvertisementLocationTypeNameUz,
                                        })
                            }}
                        </template>

                        <!-- AD_DESIGN_TYPES -->
                        <template #cell(adDesignTypes)="data">
                            <div class="d-flex align-items-center flex-wrap">
                                <ul>
                                    <li
                                        v-for="(design, index) in data.item.designTypes"
                                        :key="`location-design-${index}`"
                                    >{{
                                        getName({
                                          nameRu: design.nameRu,
                                          nameLt: design.nameLt,
                                          nameUz: design.nameUz,
                                        })
                                      }}</li>
                                </ul>
                            </div>
                        </template>

                        <!-- ACTIONS -->
                        <template #cell(actions)="data">
                            <div class="general-table__actions d-flex justify-content-center">
                                <b-btn
                                    variant="link"
                                    class="text-decoration-none p-0"
                                    style="font-size: 1.2rem; margin-right: 1rem;"
                                >
                                    <i
                                        @click="editItem(data.item)"
                                        class="mdi mdi-circle-edit-outline edit"
                                    ></i>
                                </b-btn>

                                <b-btn
                                    variant="link"
                                    class="text-decoration-none p-0 text-danger"
                                    style="font-size: 1.2rem;"
                                >
                                    <i
                                        @click="deleteItem(data.item)"
                                        class="mdi mdi-trash-can delete"
                                    ></i>
                                </b-btn>
                            </div>
                        </template>

                        <!-- EMPTY SLOT -->
                        <template #empty="">
                            <h4 class="text-center">{{ regionId ? $t('messages.data_not_found') : $t('messages.please_select_region') }}</h4>
                        </template>

                        <!-- TABLE_BUSY SLOT -->
                        <template #table-busy>
                            <div class="text-center my-2">
                                <b-spinner variant="primary" class="align-middle"></b-spinner>
                                
                            </div>
                        </template>
                    </b-table>

                    <!-- end table -->
                    <!-- <b-pagination
                        v-model="var_default_search_payload.page"
                        :total-rows="totalItems"
                        :per-page="var_default_search_payload.itemsPerPage"
                        aria-controls="my-table"
                        class="justify-content-end"
                    ></b-pagination -->
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
import i18n from "../../../../../../i18n";

const MAIN_API_URL = 'directory/advertisement-location_and_design_type_by_regions'
import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'
import helperService from '@/shared/services/helper.service'

export default {
    page: {
        title: "Advertisement Design Types by Regions",
        meta: [{ name: "description", content: appConfig.description }],
    },
    components: {},
    data () {
        return {
            loadingTableItems: false,
            regionId: null,
            regions: [],
            json_fields: {
                "Name Uz": "nameUz",
                "Name Lt": "nameLt",
                "Name Ru": "nameRu",
                "Reklama Konstruksiyasi": "designTypes"
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
            title: "Departments",
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
                { label: this.$t('column.region'), key: "region" },
                { label: this.$t('column.ad_location_type'), key: "adLocationType" },
                { label: this.$t('column.ad_design_types'), key: "adDesignTypes" },
                // { label: this.$t('column.status'), key: "status" },
                {
                    label: this.$t('column.actions'),
                    key: "actions",
                    thClass: "text-center",
                    tdClass: "text-center",
                    sortable: false
                },
            ],
            jsonF: {
                [this.$t('column.key')]: 'name'
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
        async regionSelected ($event, dontResetDistrict = false) {
            if ($event) {
                this.fetchTableItems()
            }
        },
        customLabelRegion (opt) {
            let selected = this.regions.find(e => e.id == (opt.id ? opt.id : opt));
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
        downloadExcel () {
            this.tableItems.forEach(res => {
                let obj = {
                    designTypes: []
                }
                obj.nameUz = res.nameUz
                obj.nameLt = res.nameLt
                obj.nameRu = res.nameRu
                res.designTypes.forEach(t => {
                    obj.designTypes.push(t.nameUz)
                })
                this.json_data.push(obj)
            })
        },
        selectList ($event) {
            if ($event == 'all') {
                this.var_default_search_payload.itemsPerPage = this.totalItems
            } else {
                this.var_default_search_payload.itemsPerPage = $event
            }
            this.fetchTableItems();
        },
        fetchTableItems () {
            // if (this.regionId) {
            this.loadingTableItems = true
            this.var_default_search_payload.keyword = this.searchKeyword
            crudAndListsService
                .searchList(MAIN_API_URL, this.var_default_search_payload, `?regionId=${this.regionId}`)
                .then((res) => {
                    this.tableItems = res.data;
                })
                .catch(e => {
                    this.tableItems = [];
                })
                .finally(() => {
                    this.loadingTableItems = false
                })
            // }
        },
        editItem (item) {
            this.$router.push({ name: 'UpdateAdvertisementDesignTypesByRegion', params: { regionId: item.regionId, adLocationTypeId: item.directoryAdvertisementLocationTypeId } })
        },
        deleteItem (item) {
            this.$bvModal.msgBoxConfirm(this.$t('messages.delete_title'), {
                okTitle: this.$t('actions.confirm'),
                cancelTitle: this.$t('actions.cancel')
            })
                .then(value => {
                    if (value) {
                        crudAndListsService
                            .deleteById(MAIN_API_URL, item.regionId, item.directoryAdvertisementLocationTypeId)
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
    },
    /* CREATED */
    created () {
        // this.fetchTableItems()
        // GET REGIONS
        helperService.fetchRegions()
            .then(res => {
                this.regions = res.data
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
                this.fetchTableItems()
            }
        }
    }
};
</script>

<style scoped lang='scss'>
</style>