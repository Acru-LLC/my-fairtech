<template>
    <div class="row">
        <div class="col-12">
          <div class="col-md-12 text-center">
            <div class="h4 mb-4 d-inline-block">{{ $t('column.contractors_status') }}</div>
          </div>
            <div class="card">
                <div class="card-body">
                    <!-- Table data -->
                    <b-table
                        :items="tableItems"
                        :fields="tableFields"
                        :busy="loadingTableItems"
                        id="my-table"
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
const REF_NAME = 'contractor_status'
import appConfig from "@/app.config";
import helperService from '@/shared/services/helper.service'

export default {
    page: {
        title: "Statuses",
        meta: [{ name: "description", content: appConfig.description }],
    },
    components: {},
    data () {
        return {
            loadingTableItems: false,
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
            title: "Department Types",
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
        }
    },
    methods: {
        downloadExcel () {
            this.json_data = []
            this.tableItems.forEach(res => {
                let obj = {}
                obj.nameUz = res.nameUz
                obj.nameLt = res.nameLt
                obj.nameRu = res.nameRu
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
        async fetchTableItems () {
            this.loadingTableItems = true
            this.var_default_search_payload.keyword = this.searchKeyword
            /* this.var_default_search_payload.sortDesc.push(false)
            if (i18n.locale == 'uz') {
                this.var_default_search_payload.sortBy.push('nameLt')
            } else if (i18n.locale == 'ru') {
                this.var_default_search_payload.sortBy.push('nameRu')
            } else if (i18n.locale == 'uzCyrillic') {
                this.var_default_search_payload.sortBy.push('nameUz')
            } */
            // GET STATUSES
            await helperService.getRefByCodeNew(REF_NAME)
                .then(res => {
                    this.tableItems = res.data.children
                    this.totalItems = res.data.children.length
                })
                .catch(e => {
                    console.log(e)
                })
                .finally(() => {
                    this.loadingTableItems = false
                })
        },
        editItem (id) {
            this.$router.push({ name: 'UpdateContractorStatus', params: { id: id } })
        },
    },
    /* CREATED */
    created () {
        this.fetchTableItems()
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