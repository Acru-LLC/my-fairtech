<template>
    <div class="row">
        <div class="col-12">
          <div class="col-md-12 text-center">
            <div class="h4 mb-4 d-inline-block">{{ $t('submodules.product_or_service_types.title_дшые') }}</div>
          </div>
            <div class="card">
                <div class="card-body">
                    <div class="row mb-2">
                        <div class="col-sm-8">
                            <div class="search-box me-4 mb-2 d-inline-block">
                                <div class="position-relative">
                                    <input
                                        v-model="searchKeyword"
                                        type="text"
                                        class="form-control"
                                        @input="fetchTableItems(activeTabIndex)"
                                        :placeholder="$t('column.search')"
                                    />
                                    <i class="bx bx-search-alt search-icon"></i>
                                </div>
                            </div>
                            <!-- <span>{{ $t('column.select.text1') }}</span> -->
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
                            <!-- <span>{{ $t('column.select.text2') }}</span> -->
                        </div>
                        <div class="col-sm-4">
                            <div class="text-sm-end">
                                <b-row>
                                    <b-col cols="7">
                                    </b-col>
                                    <b-col cols="5">
                                        <b-btn
                                            v-if="activeTabIndex > -1 && contractorStatuses.length"
                                            type="button"
                                            class="btn btn-success btn-rounded mb-2 me-2"
                                            :to="{name: 'CreateProductOrServiceType', params: {cStatusCode: contractorStatuses[activeTabIndex].code.toLowerCase(), cStatusId: contractorStatuses[activeTabIndex].id}}"
                                        >
                                            <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add') }}
                                        </b-btn>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                        <!-- end col-->
                    </div>
                    <b-tabs
                        justified
                        nav-class="nav-tabs-custom"
                        content-class="py-2"
                        v-model="activeTabIndex"
                    >
                        <b-tab
                            v-for="(cStatus, index) in contractorStatuses"
                            :key="`product-or-service-types-by-contractor-status-${index}`"
                            @click="fetchTableItems(index)"
                        >
                            <template v-slot:title>
                                <span class="d-inline-block d-sm-none">
                                    <i class="fas fa-home"></i>
                                </span>
                                <span class="d-none d-sm-inline-block">{{ getName({nameRu: cStatus.nameRu, nameUz: cStatus.nameUz, nameLt: cStatus.nameLt}) }}</span>
                            </template>
                            <!-- Table data -->
                            <b-table
                                :items="tableItems"
                                :fields="filteredTableFields"
                                class="custom-b-table"
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
                                        ><span class="badge bg-primary">O'Z</span> : <span> {{ data.item.nameLt }}</span></p>
                                        <p
                                            class="mb-0 d-flex align-items-center"
                                            style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                                        ><span class="badge bg-primary">РУ</span> : <span> {{ data.item.nameRu }}</span></p>
                                    </div>
                                </template>

                                <!-- CHILDREN -->
                                <template #cell(children)="data">
                                    <div class="d-flex align-items-center flex-wrap">
                                        <ul>
                                            <li
                                                v-for="(itm, index) in data.item.directoryProductOrServiceTypeChildren"
                                                :key="`child-${index}`"
                                            >{{
                                        getName({
                                          nameRu: itm.nameRu,
                                          nameLt: itm.nameLt,
                                          nameUz: itm.nameUz,
                                        })
                                      }}</li>
                                        </ul>
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
                                            variant="link"
                                            class="text-decoration-none p-0"
                                            style="font-size: 1.2rem; margin-right: 1rem;"
                                        >
                                            <i
                                                @click="editItem(data.item.id)"
                                                class="mdi mdi-circle-edit-outline edit"
                                            ></i>
                                        </b-btn>

                                        <b-btn
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
                        </b-tab>
                    </b-tabs>
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
const MAIN_API_URL = 'directory/product-or-service-types'
// var cStatusIdFromRoute = null
import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'
import helperService from '@/shared/services/helper.service'

export default {
    page: {
        title: "Product Or Service Types",
        meta: [{ name: "description", content: appConfig.description }],
    },
    components: {},
    data () {
        return {
            activeTabIndex: 0,
            contractorStatuses: [],
            json_fields: {
                "Name Uz": "nameUz",
                "Name Lt": "nameLt",
                "Name Ru": "nameRu",
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
            title: "Product Or Service Type",
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
                { label: this.$t('column.name'), key: "name" },
                { label: this.$t('column.code'), key: "code" },
                { label: this.$t('column.status'), key: "status" },
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
    /*
    COMPUTED */
    computed: {
        numberOfPages () {
            return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
        },
        filteredTableFields () {
            if (this.isDominant) {
                // this.addAditionalDominantColumns()
                return this.tableFields
            } else {
                return this.tableFields.filter(el => el.key != 'children')
            }
        },
        isDominant () {
            // return true
            return (this.contractorStatuses && this.contractorStatuses[this.activeTabIndex]) ? this.contractorStatuses[this.activeTabIndex].code.toLowerCase() == 'daminiriushiy' : false
        }
    },
    methods: {
        addAditionalDominantColumns () {
            this.tableFields.splice(2, 0, {
                label: this.$t('submodules.product_or_service_types_child.title'),
                key: 'children'
            })
        },
        selectList ($event) {
            if ($event == 'all') {
                this.var_default_search_payload.itemsPerPage = this.totalItems
            } else {
                this.var_default_search_payload.itemsPerPage = $event
            }
            this.fetchTableItems(this.activeTabIndex);
        },
        fetchTableItems (tabIndex) {
            this.activeTabIndex = tabIndex
            if (this.contractorStatuses.length) {
                this.var_default_search_payload.keyword = this.searchKeyword
                this.var_default_search_payload.sortDesc.push(false)
                if (this.$i18n.locale == 'uz') {
                    this.var_default_search_payload.sortBy.push('nameLt')
                } else if (this.$i18n.locale == 'ru') {
                    this.var_default_search_payload.sortBy.push('nameRu')
                } else if (this.$i18n.locale == 'uzCyrillic') {
                    this.var_default_search_payload.sortBy.push('nameUz')
                }
                crudAndListsService
                    .searchListWithKeyword(MAIN_API_URL, this.var_default_search_payload, this.contractorStatuses[this.activeTabIndex].code.toLowerCase(), true)
                    .then((res) => {
                        this.tableItems = res.data.list;
                        this.totalItems = res.data.total;
                    })
                    .catch(e => {
                        this.tableItems = [];
                        this.totalItems = 0;
                    })
            }
        },
        editItem (id) {
            this.$router.push({ name: 'UpdateProductOrServiceType', params: { cStatusCode: this.contractorStatuses[this.activeTabIndex].code.toLowerCase(), id: id } })
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
                                this.fetchTableItems(this.activeTabIndex)
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
    async created () {
        // GET CONTRACTOR_STATUSES
        await helperService.getRefByCode('contractor_status', true)
            .then(res => {
                this.contractorStatuses = res.data.children
                /* if (cStatusIdFromRoute) {
                    let foundIndex = this.contractorStatuses.findIndex(el => el.id == cStatusIdFromRoute)
                    this.activeTabIndex = foundIndex > -1 ? foundIndex : 0
                } */
            })
            .catch(e => {
                console.log(e)
            })

        await this.fetchTableItems(this.activeTabIndex)
    },
    /* BEFORE ROUTE ENTER NAVIGATION GUARD */
    /* beforeRouteEnter (to, from, next) {
        if (from.params.cStatusId) {
            cStatusIdFromRoute = from.params.cStatusId
        }
        next()
    }, */
    /*
    WATCH */
    watch: {
        /* activeTabIndex: {
            handler (newVal, oldVal) {
            }
        }, */
        'var_default_search_payload.page': {
            handler () {
                this.fetchTableItems(this.activeTabIndex)
            }
        }
    }
};
</script>

<style scoped lang='scss'>
</style>