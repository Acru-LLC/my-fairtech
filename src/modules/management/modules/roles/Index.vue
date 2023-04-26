<template>
    <div class="row">
        <div class="col-12">
          <div class="col-md-12 text-center">
            <div class="h4 mb-4 d-inline-block">{{ $t('submodules.roles.title') }}</div>
          </div>
            <div class="card">
                <div class="card-body">
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            
                        </div>
                        <div class="col-sm-6">
                            <div class="text-sm-end">
                                <b-btn
                                    type="button"
                                    class="btn btn-success btn-rounded mb-2 me-2"
                                    :to="{name: 'CreateRole'}"
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
                            {{ data.item.name }}
                        </template>

                        <!-- SIZE -->
                        <template #cell(status)="data">
                            <!-- <div class="d-flex justify-content-between">
                                <p
                                    class="mb-0"
                                    style="flex-basis: 0; flex-grow: 1;"
                                ><span class="badge bg-primary">ЎЗ</span> : <span> {{ data.item.statusNameUz }}</span></p>
                                <p
                                    class="mb-0"
                                    style="flex-basis: 0; flex-grow: 1;"
                                ><span class="badge bg-primary">O'Z</span> : <span> {{ data.item.statusNameLt }}</span></p>
                                <p
                                    class="mb-0"
                                    style="flex-basis: 0; flex-grow: 1;"
                                ><span class="badge bg-primary">РУ</span> : <span> {{ data.item.statusNameRu }}</span></p>
                            </div> -->
                            {{ data.item.statusNameUz }}
                        </template>

                        <!-- ACTIONS -->
                        <template #cell(actions)="data">
                            <div class="general-table__actions d-flex justify-content-center">
                                <!-- UPDATE_ROLE_PERMISSIONS ACTION-->
                                <b-btn
                                    :to="{ name: 'UpdateRolePermissions', params: { id: data.item.id } }"
                                    variant="link"
                                    class="text-decoration-none p-0"
                                    style="font-size: 1.2rem; margin-right: 1rem;"
                                >
                                    <i
                                        class="mdi mdi-shield-check-outline"
                                    ></i>
                                </b-btn>
                                <!-- UPDATE ACTION -->
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
                                <!-- DELETE ACTION -->
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
const MAIN_API_URL = 'role'
import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'
export default {
    page: {
        title: "Roles",
        meta: [{ name: "description", content: appConfig.description }],
    },
    components: {
    },
    data () {
        return {
            loadingTableItems: false,
            title: "Roles",
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
        fetchTableItems () {
            this.loadingTableItems = true
            crudAndListsService
                .searchList(MAIN_API_URL, this.var_default_search_payload)
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
        editItem (id) {
            this.$router.push({ name: 'UpdateRole', params: { id: id } })
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