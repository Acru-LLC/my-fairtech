<script>
// import Layout from "@/router/views/dashboards/default";
// import PageHeader from "@/components/page-header";

import Table from "./components/table";
import Create from "./components/addUpdate";

import Service from "../reportService";

import appConfig from "@/app.config";

import i18n from "@/i18n";

export default {
    page: {
        title: i18n.t("reportRows"),
        meta: [{ name: "description", content: appConfig.description }],
    },
    components: { Table, Create },
    data () {
        return {
            title: this.$t("submodules.reports.templates_row"),
            items: [
                {
                    text: this.$t("submodules.reports.title_plural"),
                    href: "/",
                },

                {
                    text: this.$t("submodules.reports.templates_row"),
                    active: true,
                },
            ],
            list: [],
            searchValue: "",
            page: 1,
            limit: 20,
            total: 1,
            showModal: false,
            mode: "create",
            currentSort: "block",
            currentSortDir: "asc",
            loading: false,
            loader: false,
        };
    },
    created () {
        this.getList();
    },
    watch: {
        page () {
            this.getList();
        },
        searchValue: {
            handler () {
                this.getList();
            },
        },
    },
    computed: {
        params () {
            return {
                params: {
                    limit: this.limit,
                    page: this.page - 1,
                },
                search: this.searchValue,
            };
        },
    },
    methods: {
        sort (s) {
            //if s == current sort, reverse
            if (s === this.currentSort) {
                this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
            }
            this.currentSort = s;
        },
        toggleModal (v, mode = "create", item) {
            this.showModal = v;
            this.mode = mode;
            setTimeout(() => {
                this.$refs.addRef.setFormData(item);
            }, 200);
        },
        delete (item) {
            this.cnf().then((rs) => {
                if (rs.value) {
                    Service.deleteRow(item.id)
                        .then((rs) => {
                            this.deleteSuccess();
                            this.getList();
                        })
                        .catch((err) => {
                            // this.catchErr(err);
                        });
                }
            });
        },
        actionClick (action = "", item) {
            if (action == "delete") {
                this.delete(item);
            } else if (action == "edit") {
                this.toggleModal(true, action, item);
            }
        },

        successCreateAndEdit () {
            this.getList();
            if (this.mode == "create") {
                this.successSaved();
            } else {
                this.successEdited();
            }
            this.showModal = false;
        },
        //create
        create (e) {
            this.loader = true;
            // let { selectedRow } = this.$refs.tableRef;
            // if (selectedRow.length > 0) {
            //   let childObjects = selectedRow.map((el, index) => {
            //     return {
            //       id: el.id,
            //       index: index,
            //     };
            //   });
            //   Service.createRowWithParent(
            //     this.$refs.addRef.form,
            //     selectedRow,
            //     childObjects
            //   )
            //     .then((rs) => {
            //       if (rs.data) {
            //         this.successCreateAndEdit();
            //       }
            //     })
            //     .catch((err) => {
            //       this.catchErr(err);
            //     })
            //     .finally(() => {
            //       this.loader = false;
            //     });
            // } else {
            Service.createRow(this.$refs.addRef.form)
                .then((rs) => {
                    if (rs.data) {
                        this.successCreateAndEdit();
                    }
                })
                .catch((err) => {
                    // this.catchErr(err);
                })
                .finally(() => {
                    this.loader = false;
                    this.showModal = false
                });
            // }
        },
        update () {
            this.loader = true;
            Service.updateRow(this.$refs.addRef.form)
                .then((rs) => {
                    if (rs.data) {
                        this.successCreateAndEdit();
                    }
                })
                .catch((err) => {
                    // this.catchErr(err);
                })
                .finally(() => {
                    this.loader = false;
                    this.showModal = false
                });
        },

        okModal (b) {
            b.preventDefault();
            if (!this.$refs.addRef.checkValidity()) {
                if (this.mode == "create") {
                    this.create();
                } else {
                    this.update();
                }
            } else {
                this.enterInfo();
            }
        },
        //list
        getList () {
            this.loading = true;
            Service.getListRow(this.params)
                .then((rs) => {
                    this.list = rs.data.list;
                    this.total = rs.data.total;
                })
                .catch((e) => {
                    // this.catchErr(e);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>

<template>
    <div>
        <b-modal
            :cancel-variant="'outline-danger'"
            :ok-variant="'success'"
            :no-close-on-backdrop="true"
            :ok-title="$t('actions.save')"
            :cancel-title="$t('actions.cancel')"
            @close="showModal = false"
            @cancel="showModal = false"
            @ok="okModal"
            size="md"
            v-model="showModal"
            :title="$t('actions.add')"
        >
            <Create ref="addRef" />

            <template v-slot:modal-footer>
                <b-button
                    variant="secondary"
                    @click="showModal = false"
                >{{
            $t( "actions.close" )
          }}
                </b-button>
                <b-overlay
                    :opacity="0.1"
                    :show="loader"
                    rounded="sm"
                >
                    <b-button
                        variant="success"
                        @click="okModal"
                    >{{
              $t( "actions.save" )
            }}
                    </b-button>
                </b-overlay>
            </template>
        </b-modal>
        <div>
            <!-- <PageHeader :title="title" :items="items"/> -->
            <div class="row">
                <div class="col-12">
                  <div class="col-md-12 text-center">
                    <div class="h4 mb-4 d-inline-block">{{ $t('submodules.reports.templates_row') }}</div>
                  </div>
                    <div class="card">
                        <div class="card-body">
                            <div class="row mb-2">
                                <div class="col-sm-4">
                                    <div class="mr-2 mb-2 d-inline-block">
                                        <div class="d-inline-block mr-2">
                                            <div class="search-box">
                                                <div class="position-relative">
                                                    <input
                                                        style="width: 300px"
                                                        type="text"
                                                        v-model="searchValue"
                                                        class="form-control rounded bg-light border-light"
                                                        :placeholder="$t('actions.search')"
                                                    />
                                                    <i class="mdi mdi-magnify search-icon"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                    <div class="text-sm-right">
                                        <b-button
                                            @click="toggleModal(true, 'create', {})"
                                            type="button"
                                            variant="primary"
                                        >
                                            <i class="mdi mdi-plus mr-1"></i>
                                            {{ $t( "actions.add" ) }}
                                        </b-button>
                                    </div>
                                </div>
                            </div>
                            <Table
                                @showModal="actionClick"
                                :page="page"
                                :limit="limit"
                                ref="tableRef"
                                :list="list"
                                :loading="loading"
                            >
                                <template v-slot:thead>
                                    <tr>
                                        <th
                                            class="text-center"
                                            style="width: 5% !important"
                                        >
                                            <span class="d-block">№</span>
                                        </th>
                                        <th>{{ $t( "submodules.templates_row.nm" ) }}</th>
                                        <th>{{ $t( "column.comment" ) }}</th>
                                        <th
                                            style="width: 14% !important"
                                            class="text-center"
                                        >
                                            {{ $t( "column.actions" ) }}
                                        </th>
                                    </tr>
                                </template>
                                <template v-slot:pagination>
                                    <div
                                        class="row"
                                        v-if="total > 0"
                                    >
                                        <div class="col-lg-12">
                                            <b-pagination
                                                size="sm"
                                                class="m-0"
                                                :total-rows="total"
                                                :per-page="limit"
                                                v-model="page"
                                            />
                                        </div>
                                    </div>
                                </template>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
