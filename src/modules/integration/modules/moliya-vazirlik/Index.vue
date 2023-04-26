<template>
    <div class="row">
        <div class="col-12">
            <div class="col-md-12 text-sm-start">
                <b-button class="btn btn-warning" size="md" @click="$router.push({name: 'IntegrationMenuIndex'})">
                    {{ $t("actions.back") }}
                </b-button>
            </div>
            <div class="col-md-12 text-center">
                <div class="h4 mb-4 d-inline-block">{{ $t('submodules.integration.moliya_info.fullTitle') }}</div>
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
                                    <b-col cols="5">
                                        <div class="text-sm-end">
                                            <download-excel
                                                    :data="json_data"
                                                    :fields="json_fields"
                                                    :header="$t('submodules.integration.e_auction_info.title')"
                                                    :name="`${$t('submodules.integration.e_auction_info.title')}.xls`"
                                                    worksheet="My Worksheet"
                                            >
                                                <b-btn
                                                        class="btn btn-rounded bg-primary mb-2"
                                                        type="button"
                                                        @click="downloadExcel"
                                                >
                                                    <i class="mdi mdi-microsoft-excel me-1"></i>
                                                    {{ $t('actions.download') }}
                                                </b-btn>
                                            </download-excel>
                                        </div>
                                    </b-col>
                                    <b-col cols="7">
                                        <!--                    <b-btn-->
                                        <!--                        :to="{name: 'IntegrationStatisticsInfoCreate'}"-->
                                        <!--                        class="btn btn-success btn-rounded mb-2 me-2"-->
                                        <!--                        type="button">-->
                                        <!--                      <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add') }}-->
                                        <!--                    </b-btn>-->
                                        <b-btn
                                                class="btn btn-success btn-rounded mb-2 me-2"
                                                type="button"
                                                @click="downloadAllInfo">
                                            <i class="mdi mdi-download me-1"></i>
                                            {{ $t('submodules.integration.statistics_info.download_all_info') }}
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
                            hover
                            responsive
                            show-empty
                            small
                            striped
                    >
                        <!-- NUMBER OF ITEM -->
                        <template #cell(index)="data">
                            {{
                            util_paginate(data.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage)
                            }}
                        </template>
                        <!-- NAME -->
                        <!--            <template #cell(date_inter)="data">-->
                        <!--            {{  new Date(data.item.siis_view_created_at).ddmmyyyy()}}-->
                        <!--            </template>-->
                        <template #cell(siis_view_created_at)="data">
                            {{ new Date(data.item.siis_view_created_at).ddmmyyyy() }}
                        </template>
                        <template #cell(name)="data">
                            <div class="d-flex justify-content-between">
                                <p
                                        class="mb-0 d-flex align-items-center"
                                        style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                                ><span class="badge bg-primary">ЎЗ</span> : <span> {{ data.item.nameUz }}</span></p>
                                <p
                                        class="mb-0 d-flex align-items-center"
                                        style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                                ><span class="badge bg-primary">O'Z</span> &nbsp;:&nbsp; <span> {{
                                    data.item.nameLt
                                    }}</span></p>
                                <p
                                        class="mb-0 d-flex align-items-center"
                                        style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                                ><span class="badge bg-primary">РУ</span> &nbsp;:&nbsp; <span> {{
                                    data.item.nameRu
                                    }}</span></p>
                            </div>
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
                                        class="text-decoration-none p-0"
                                        style="font-size: 1.2rem; margin-right: 1rem;"
                                        variant="link"
                                >
                                    <i class="mdi mdi-circle-edit-outline edit" @click="confirmItem(data.item)"/>
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
                                        class="align-middle"
                                        variant="primary"
                                ></b-spinner>
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
                    ></b-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const MAIN_API_URL = '/'
const INTEGRATION_API_URL = '/statistics-info/deploy-information'
import crudAndListService from '@/shared/services/crud_and_list.service'

export default {
    data() {
        return {
            loadingTableItems: false,
            json_fields: {
                'ID': 'id',
                [this.$t('submodules.integration.statistics_info.saoto_name')]: 'saoto_name',
                [this.$t('submodules.integration.statistics_info.saoto')]: 'saoto',
                [this.$t('submodules.integration.statistics_info.tovar')]: 'tovar',
                [this.$t('submodules.integration.statistics_info.price')]: 'price',
                [this.$t('submodules.integration.statistics_info.code_tovar')]: 'code_tovar',
                [this.$t('submodules.integration.statistics_info.date_inter')]: 'date_inter',

                [this.$t('submodules.integration.statistics_info.siis_view_created_at')]: 'siis_view_created_at',
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
                {label: this.$t('submodules.integration.statistics_info.saoto_name'), key: "saoto_name"},
                {label: this.$t('submodules.integration.statistics_info.soato'), key: "saoto"},
                {label: this.$t('submodules.integration.statistics_info.tovar'), key: "tovar"},
                {label: this.$t('submodules.integration.statistics_info.price'), key: "price"},
                {label: this.$t('submodules.integration.statistics_info.code_tovar'), key: "code_tovar"},
                {label: this.$t('submodules.integration.statistics_info.date_inter'), key: "date_inter"},
                {
                    label: this.$t('submodules.integration.statistics_info.siis_view_created_at'),
                    key: "siis_view_created_at"
                },
                {
                    label: this.$t('column.actions'),
                    key: "actions",
                    thClass: "text-center",
                    tdClass: "text-center",
                    sortable: false
                },
            ],
            searchInterval: null,
        };
    },
    /*
    COMPUTED */
    computed: {
        numberOfPages() {
            return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
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
            crudAndListService.searchListWithKeyword(MAIN_API_URL, this.var_default_search_payload)
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
        downloadAllInfo() {
            crudAndListService.downloadIntegrationData(INTEGRATION_API_URL)
                .then((res) => {
                    setTimeout(() => {
                        this.$toast(this.$t('submodules.integration.statistics_info.download_success'), {type: 'success'});
                    }, 200);
                })
                .catch(e => {
                    this.$toast(this.$t('submodules.integration.statistics_info.download_error'), {type: 'error'});
                })
                .finally(() => {
                    this.fetchTableItems()
                })
        },
        changeSearchKeyword() {
            clearTimeout(this.searchInterval)
            this.searchInterval = setTimeout(() => {
                this.fetchTableItems()
            }, 500)
        },
        confirmItem(item) {
            this.$router.push({
                name: 'IntegrationStatisticsInfoConfirm',
                params: {
                    id: item.id
                }
            })
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
        }
    }
};
</script>

<style lang='scss' scoped>
</style>