<script>
// import Layout from "@/router/views/dashboards/default";
// import PageHeader from "@/components/page-header";

import Table from "./components/table";

import Service from "../reportService";

import appConfig from "@/app.config";
import Oraganizations from "./organizations/organizations_2_2";
import i18n from "@/i18n";
import {enc} from "@/helper";

export default {
  page: {
    title: i18n.t( "reportRows" ),
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {Table, Oraganizations},
  data() {
    return {
      title: this.$t( "reportRoles" ),
      items: [
        {
          text: this.$t( "Hisobotlar" ),
          href: "/",
        },

        {
          text: this.$t( "reportRoles" ),
          active: true,
        },
      ],
      list: [],
      selectedDepsIds: [],
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
      modalShare: false,
      loaderShare: false,
      currentReport: {},
    };
  },
  created() {
    this.getList();
  },
  watch: {
    page() {
      this.getList();
    },
    searchValue: {
      handler() {
        this.getList();
      },
    },
  },
  computed: {
    params() {
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
    share(data) {
      // this.currentReport = data;
      this.modalShare = true;
      // setTimeout(() => {
      //   this.$refs.organizationsRef.getByDepartments(data.id);
      // }, 300);
    },
    okShareModal() {
      let selectedYuridik = this.$refs.organizationsRef.members;
      if (selectedYuridik && selectedYuridik.length) {
        this.loaderShare = true;
        Service.saveDepartmentsTashkiliy( selectedYuridik )
            .then( () => {
              this.modalShare = false;
              this.getList();
              this.successSaved();
            } )
            .catch( (e) => {})
            .finally( () => (this.loaderShare = false) );
      } else {
        this.enterInfo();
      }
    },
    okModal() {
    },
    sort(s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    toggleModal(v, mode = "create", item) {
      this.showModal = v;
      this.mode = mode;
      setTimeout( () => {
        this.$refs.addRef.setFormData( item );
      }, 200 );
    },
    delete(item) {
      this.cnf().then( (rs) => {
        if (rs.value) {
          Service.deleteDepartmentsTashkiliy( item.id )
              .then( (rs) => {
                this.deleteSuccess();
                this.getList();
              } )
              .catch( (err) => {
                // this.catchErr( err );
              } );
        }
      } );
    },
    actionClick(action = "", item) {
      if (action == "delete") {
        this.delete( item );
      } else if (action == "edit") {
        this.toggleModal( true, action, item );
      } else if (action == "view") {
        this.$router.push( `/report/templates/${enc( item.id )}` );
      }
    },

    successCreateAndEdit() {
      this.getList();
      if (this.mode == "create") {
        this.successSaved();
      } else {
        this.successEdited();
      }
      this.showModal = false;
    },
    //create
    create(e) {
      this.loader = true;
      Service.createRow( this.$refs.addRef.form )
          .then( (rs) => {
            if (rs.data) {
              this.successCreateAndEdit();
            }
          } )
          .catch( (err) => {
            // this.catchErr( err );
          } )
          .finally( () => {
            this.loader = false;
          } );
    },
    update() {
      this.loader = true;
      Service.updateRow( this.$refs.addRef.form )
          .then( (rs) => {
            if (rs.data) {
              this.successCreateAndEdit();
            }
          } )
          .catch( (err) => {
            // this.catchErr( err );
          } )
          .finally( () => {
            this.loader = false;
          } );
    },

    //list
    getList() {
      this.loading = true;
      Service.getDepartmentsTashkiliy( this.params )
          .then( (rs) => {
            this.list = rs.data.list;
            this.total = rs.data.total;
            this.selectedDepsIds = rs.data.list.map( e => e.id );
          } )
          .catch( (e) => {
            // this.catchErr( e );
          } )
          .finally( () => {
            this.loading = false;
          } );
    },
  },
};
</script>

<template>
  <div>
    <div class="col-md-12 text-center">
      <div class="h4 mb-4 d-inline-block">{{ $t('reportRoles') }}</div>
    </div>
    <div>
      <b-modal
          :cancel-variant="'outline-danger'"
          :ok-variant="'success'"
          :no-close-on-backdrop="true"
          :ok-title="$t('actions.save')"
          :cancel-title="$t('actions.cancel')"
          @close="modalShare = false"
          @cancel="modalShare = false"
          @ok="okModal"
          size="lg"
          scrollable
          v-model="modalShare"
          :title="$t('yuridikDep')"
      >
        <Oraganizations ref="organizationsRef" :selectedDepsIds="list"/>
        <template v-slot:modal-footer>
          <b-button variant="secondary" @click="modalShare = false">{{
              $t( "actions.close" )
            }}
          </b-button>
          <b-overlay :opacity="0.1" :show="loaderShare" rounded="sm">
            <b-button variant="success" @click="okShareModal">
              {{ $t( "actions.save" ) }}
            </b-button
            >
          </b-overlay>
        </template>
      </b-modal>
      <!-- <PageHeader :title="title" :items="items" /> -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row mb-2">
                <div class="col-sm-4">
                  <div class="mr-2 mb-2 d-inline-block">
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
                <div class="col-sm-8">
                  <div class="text-sm-right">
                    <b-button @click="share" type="button" variant="primary">
                      <i class="mdi mdi-plus mr-1"></i>
                      {{ $t( "actions.add" ) }}
                    </b-button>
                  </div>
                </div>
              </div>
              <Table
                  @share="share"
                  @showModal="actionClick"
                  :page="page"
                  :limit="limit"
                  ref="tableRef"
                  :list="list"
                  :loading="loading"
              >
                <template v-slot:thead>
                  <tr>
                    <th class="text-center" style="width: 10px !important">
                      №
                    </th>
                    <th>{{ $t( "column.department" ) }}</th>
                    <th style="width: 14% !important" class="text-center">
                      {{ $t( "column.actions" ) }}
                    </th>
                  </tr>
                </template>
                <template v-slot:pagination>
                  <div class="row" v-if="total > 0">
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
