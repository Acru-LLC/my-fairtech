<template>
    <div class="row">
        <div class="col-12">
          <div class="col-md-12 text-center">
            <div class="h4 mb-4 d-inline-block">{{ $t('submodules.references_list.title') }}</div>
          </div>
            <div class="card">
                <div class="card-body">
                    <div class="row mb-2">
                        <div class="col-sm-3">
                            <div class="search-box me-2 mb-2 d-inline-block">
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
                        </div>
                        <div class="col-sm-6">
                            <!-- <span>{{ $t('column.select.text1') }}</span> -->
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
                            <!-- <span>{{ $t('column.select.text2') }}</span> -->
                        </div>
                        <div class="col-sm-3">
                            <!--              <div class="text-sm-end">-->
                            <!--                <b-btn-->
                            <!--                    type="button"-->
                            <!--                    class="btn btn-success btn-rounded mb-2 me-2"-->
                            <!--                    :to="{name: 'CreatePermissions'}"-->
                            <!--                >-->
                            <!--                  <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add') }}-->
                            <!--                </b-btn>-->
                            <!--              </div>-->
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

                        <!-- CODE NAME -->
                        <!-- <template #cell(typeName)="data">
              <p>
                {{
                  getName({
                    nameRu: data.item.typeNameRu,
                    nameLt: data.item.typeNameLt,
                    nameUz: data.item.typeNameUz,
                  }) ? getName({
                    nameRu: data.item.typeNameRu,
                    nameLt: data.item.typeNameLt,
                    nameUz: data.item.typeNameUz,
                  }) : data.item.type
                }}
              </p>
            </template> -->

                        <!-- ACTIONS -->
                        <template #cell(actions)="data">
                            <div class="general-table__actions d-flex justify-content-center">
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
                                <!--                <b-btn-->
                                <!--                    variant="link"-->
                                <!--                    class="text-decoration-none p-0 text-danger"-->
                                <!--                    style="font-size: 1.2rem;"-->
                                <!--                >-->
                                <!--                  <i-->
                                <!--                      @click="deleteItem(data.item.id)"-->
                                <!--                      class="mdi mdi-trash-can delete"-->
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
const MAIN_API_URL = 'document/directory-list-for-dynamic-report-doc'
import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'
import { mapMutations } from "vuex";

export default {
    page: {
        title: "References",
        meta: [{ name: "description", content: appConfig.description }],
    },
    components: {},
    data () {
        return {
            loadingTableItems: false,
            activeDep: {},
            tableItems: [],
            selected: 20,
            optionsTable: [
                { value: 20, text: 20 },
                { value: 50, text: 50 },
                { value: 100, text: 100 },
                { value: 150, text: 150 },
                { value: 200, text: 200 },
            ],
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
            searchKeyword: '',
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
        ...mapMutations({
            setItemsPerPage: "SET_ITEMS_PER_PAGE",
            setPage: "SET_PAGE"
        }),
        async selectList ($event) {
            if (this.$i18n.locale !== $event) {
                await this.setItemsPerPage($event);
            }
            if ($event == 'all') {
                this.var_default_search_payload.itemsPerPage = this.totalItems
            } else {
                this.var_default_search_payload.itemsPerPage = $event
            }
            this.fetchTableItems();
        },
        fetchTableItems () {
            this.loadingTableItems = true
            this.var_default_search_payload.keyword = this.searchKeyword
            crudAndListsService
                .searchListWithKeyword(MAIN_API_URL, this.var_default_search_payload)
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
            this.$router.push({ name: 'UpdateReferenceForDynamicReport', params: { id: id } })
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