<script>
// import Layout from "@/router/views/dashboards/default";
// import PageHeader from "@/components/page-header";

import Table from "./components/table";

import Service from "../reportService";
import OrgStrTreeView from "./components/OrgStrTreeView";

import crudAndListsService from '@/shared/services/crud_and_list.service'

import appConfig from "@/app.config";
import Oraganizations from "./organizations/organizations_2_2.vue";
import i18n from "@/i18n";
import {enc} from "@/helper";
import Create from "./components/addUpdate";
import BaseTreeselectWithValidation from "../../../components/base/BaseTreeselectWithValidation";
import {enterInfo} from "../../../helper";
// import StaticTemplates from "../static/table.vue";
export default {
  page: {
    title: i18n.t("reportRows"),
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {BaseTreeselectWithValidation, Table, Oraganizations, Create, OrgStrTreeView},
  data() {
    return {
      title: this.$t("reportTemplates"),
      items: [
        {
          text: this.$t("Hisobotlar"),
          href: "/",
        },

        {
          text: this.$t("reportTemplates"),
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
      modalShare: false,
      isModalShare: false,
      isSidebar: false,
      selectedEmployee: {},
      loaderShare: false,
      currentReport: {},
      isResponsible: false,
      indexTab: 0,
      departmentId: null,
      departments: {},
      responsibleDepartmentId: null,
    };
  },
  created() {
    this.getList();

    // GET CONTRACTORS
    crudAndListsService.searchList('department', this.var_default_search_payload)
        .then(res => {
          this.departments = res.data
        })
        .catch(e => {
          console.log(e)
        })
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
    departmentId: {
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
        departmentId: this.departmentId
      };
    },
  },
  methods: {
    asyncValue(v) {
      this.selectedEmployee = v;
    },
    isSidebarClose() {
      this.selectedEmployeeselectedEmployee = {}
      if (this.isResponsible) {
        this.isSidebar = false
        this.isResponsible = false
      } else {
        this.isSidebar = false
        this.isModalShare = false;
        this.modalShare = true;
      }

    },
    isModalShareBTN(value) {
      this.isModalShare = value
      if (value) {
        this.isSidebar = true
        this.modalShare = false;
      }

    },
    responsiblePerson(data) {
      this.isResponsible = true
      this.currentReport = data;
      this.isSidebar = true
    },
    share(data) {
      this.currentReport = data;
      this.modalShare = true;

      setTimeout(() => {
        this.$refs.organizationsRef.getByDepartments(data.id);
      }, 300);
    },
    okShareModal() {
      let selectedYuridik = this.$refs.organizationsRef.members;
      if (selectedYuridik && selectedYuridik.length) {
        this.loaderShare = true;
        Service.addDepartmentTable(selectedYuridik, this.currentReport)
            .then(() => {
              this.modalShare = false;
              this.getList();
              this.successSaved();
            })
            .catch((e) => {
            })
            .finally(() => (this.loaderShare = false));
      } else {
        this.enterInfo();
      }
    },
    async okModal() {
      await this.updateRowInfo()
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
      setTimeout(() => {
        this.$refs.addRef.setFormData(item);
      }, 200);
    },
    delete(item) {
      this.cnf().then((rs) => {
        if (rs.value) {
          Service.deleteRow(item.id)
              .then((rs) => {
                this.deleteSuccess();
                this.getList();
              })
              .catch((err) => {
                // this.catchErr( err );
              });
        }
      });
    },
    statusChanged(item) {
      this.cnf().then((rs) => {
        if (rs.value) {
          Service.statusChangeRow(item.id, item.statusId)
              .then((rs) => {
                this.editSuccess();
              })
              .catch((err) => {
                // this.catchErr( err );
              })
              .finally(() => {
                this.getList();
              });
        } else {
          this.getList();
        }

      });
    },
    actionClickStatic(action = "", item) {
      if (action == "view") {
        this.$router.push(`/report/templates/${enc(item.id)}`);
      }
    },
    actionClick(action = "", item) {
      if (action == "delete") {
        this.delete(item);
      } else if (action == "change") {
        this.statusChanged(item);
      } else if (action == "edit") {
        this.toggleModal(true, action, item);
      } else if (action == "view") {
        this.$router.push(`/report/templates/${enc(item.id)}`);
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
      Service.createRow(this.$refs.addRef.form)
          .then((rs) => {
            if (rs.data) {
              this.successCreateAndEdit();
            }
          })
          .catch((err) => {
            // this.catchErr( err );
          })
          .finally(() => {
            this.loader = false;
          });
    },
    update() {
      this.loader = true;
      Service.updateRow(this.$refs.addRef.form)
          .then((rs) => {
            if (rs.data) {
              this.successCreateAndEdit();
            }
          })
          .catch((err) => {
            // this.catchErr( err );
          })
          .finally(() => {
            this.loader = false;
          });
    },
    updateRowInfo() {
      this.loader = true;
      Service.updateRowInfo(this.$refs.addRef.form)
          .then((rs) => {
            if (rs.data) {
              this.successCreateAndEdit();
            }
          })
          .catch((err) => {
            // this.catchErr( err );
          })
          .finally(() => {
            this.loader = false;
          });
    },
    //list
    getList() {
      this.loading = true;
      Service.getListTable(this.params)
          .then((rs) => {
            this.list = rs.data.list;
            this.total = rs.data.total;
          })
          .catch((e) => {
            // this.catchErr( e );
          })
          .finally(() => {
            this.loading = false;
          });
    },

    departmentSelected() {
      this.getList()
    },
    customLabelDepartmentNames(opt) {
      let selected = this.departments.find(e => e.id == opt);
      if (selected) {
        return `${
            this.getName({
              nameRu: selected.nameRu,
              nameLt: selected.nameLt,
              nameUz: selected.nameUz,
            })
        }`
      }
      return ``;
    },
    treeClosed(veeName) {
      this.computedObserver.refs[veeName].validate();
    },
    normalizer(node) {
      if (!node.children || node.children.length === 0) {
        delete node.children
        return {
          id: node.id,
          label: this.getName({
            nameRu: node.nameRu,
            nameLt: node.nameLt,
            nameUz: node.nameUz,
          }),
        }
      }
      return {
        id: node.id,
        label: this.getName({
          nameRu: node.nameRu,
          nameLt: node.nameLt,
          nameUz: node.nameUz,
        }),
        children: node.children && node.children.length > 0 ? node.children : [],
      }
    },
    responsibleDepartmentToggle(department) {
      this.currentReport.returnableDepartmentId = this.responsibleDepartmentId = department.id;
    },
    responsibleDepartmentSave() {
      if (!this.currentReport.returnableDepartmentId || !this.currentReport.id) {
        return this.enterInfo()
      }
      this.loader = true;
      Service.saveAddReturnableDepartment(this.currentReport.id, this.currentReport.returnableDepartmentId)
          .then(async (rs) => {
            await this.getList();
            await this.successSaved();
            this.isSidebar = false;
            this.loader = false;
          })
          .catch((e) => {
            // this.catchErr( e );
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
    <div>
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.reports.templates') }}</div>
      </div>
      <b-modal
          v-model="modalShare"
          :cancel-title="$t('actions.cancel')"
          :cancel-variant="'outline-danger'"
          :no-close-on-backdrop="true"
          :ok-title="$t('actions.save')"
          :ok-variant="'success'"
          scrollable
          size="lg"
          @cancel="modalShare = false"
          @close="modalShare = false"
          @ok="okModal"
      >
        <Oraganizations ref="organizationsRef"/>
        <template v-slot:modal-footer>
          <b-button variant="secondary" @click="modalShare = false">{{
              $t("actions.close")
            }}
          </b-button>
          <b-overlay :opacity="0.1" :show="loaderShare" rounded="sm">
            <b-button variant="success" @click="okShareModal">
              {{ $t("actions.save") }}
            </b-button>
          </b-overlay>
        </template>
      </b-modal>
      <b-tabs v-model="indexTab">
        <b-tab :title="$t('dynamicTable')">
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <div class="row mb-2">
                    <div class="col-sm-3">
                      <div class="d-inline-block mr-2">
                        <div class="search-box">
                          <div class="position-relative">
                            <input
                                v-model="searchValue"
                                :placeholder="$t('actions.search')"
                                class="form-control rounded bg-light border-light"
                                style="width: 300px"
                                type="text"
                            />
                            <i class="mdi mdi-magnify search-icon"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-7">
                      <BaseTreeselectWithValidation
                          ref="parentDepVeeName"
                          v-model="departmentId"
                          :default-expand-level="1"
                          :normalizer="normalizer"
                          :options="departments ? [departments] : []"
                          :placeholder="$t('column.department')"
                          :show-count="true"
                          form-label="__none"
                          name="parentDepVeeName"
                          not-required
                          @close="treeClosed('parentDepVeeName')"
                      />
                    </div>
                    <div class="col-sm-2">
                      <div class="text-sm-right">
                        <b-button
                            to="/report/templates/create"
                            type="button"
                            variant="primary"
                        >
                          <i class="mdi mdi-plus mr-1"></i>
                          {{ $t("actions.add") }}
                        </b-button>
                      </div>
                    </div>
                  </div>
                  <Table
                      ref="tableRef"
                      :limit="limit"
                      :list="list"
                      :loading="loading"
                      :page="page"
                      @responsiblePerson="responsiblePerson"
                      @share="share"
                      @showModal="actionClick"
                  >
                    <template v-slot:thead>
                      <tr>
                        <th class="text-center" style="width: 10px !important"> №</th>
                        <th class="text-center" style="width: 23% !important">{{
                            $t("submodules.templates_row.nm")
                          }}
                        </th>
                        <th class="text-center" style="width: 18% !important">{{ $t("titleTable") }}</th>
                        <th class="text-center" style="width: 13% !important">{{ $t("conditionTable") }}</th>
                        <th class="text-center" style="width: 23% !important">{{ $t("column.department") }}</th>
                        <th class="text-center" style="width: 8% !important">{{ $t("column.created_date") }}</th>
                        <th class="text-center" style="width: 5% !important">{{ $t("column.status") }}</th>
                        <th class="text-center" style="width: 14% !important"> {{ $t("column.actions") }}</th>
                      </tr>
                    </template>
                    <template v-slot:pagination>
                      <div v-if="total > 0" class="row">
                        <div class="col-lg-12">
                          <b-pagination
                              v-model="page"
                              :per-page="limit"
                              :total-rows="total"
                              class="m-0"
                              size="sm"
                          />
                        </div>
                      </div>
                    </template>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
    <b-modal
        v-model="showModal"
        :cancel-title="$t('actions.cancel')"
        :cancel-variant="'outline-danger'"
        :no-close-on-backdrop="true"
        :ok-title="$t('actions.save')"
        :ok-variant="'success'"
        :title="$t('actions.edit')"
        size="md"
        @cancel="showModal = false"
        @close="showModal = false"
        @ok="okModal"
    >
      <Create ref="addRef"/>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="showModal = false">{{
            $t("actions.close")
          }}
        </b-button>
        <b-overlay :opacity="0.1" :show="loader" rounded="sm">
          <b-button variant="success" @click="okModal">{{
              $t("actions.save")
            }}
          </b-button>
        </b-overlay>
      </template>
    </b-modal>
    <b-sidebar
        v-model="isSidebar"
        :no-header="true"
        backdrop
        backdrop-variant="transparent"
        class="sidebar-part"
        right
        shadow
        sidebar-class="p-0"
        width="40%"
    >
      <!--      <MemberesSignature-->
      <!--          :notIn="false"-->
      <!--          @asyncValue="asyncValue"-->
      <!--          :async="true"-->
      <!--          @cancel="isSidebarClose"-->
      <!--          ref="partRef_3"-->
      <!--      />-->
      <div class="card">
        <div class="card-body">
          <div class="button-items d-flex" style="justify-content: space-between">
            <b-button variant="success" @click="responsibleDepartmentSave">
                <i class="fa fa-save"></i>
                {{ $t("actions.save") }}
              </b-button>
          </div>
        </div>
        <div class="p-4">
          <ul style="list-style-type: none">
            <org-str-tree-view
                :departmentForTree="departments"
                :members="[currentReport.returnableDepartmentId]"
                class="item"
                @toggleActiveClass="responsibleDepartmentToggle"
            >
            </org-str-tree-view>
          </ul>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>