<script>
// import Layout from "@/router/views/dashboards/default";
// import PageHeader from "@/components/page-header";

import Table from "./components/table";
import Create from "./components/copy";

import Service from "../reportService";

import appConfig from "@/app.config";

import i18n from "@/i18n";
import {enc, showMsgSuccess, showMsgError} from "@/helper";

import Receivers from "./receivers.vue";
import Oraganizations from "./organizations/organizations.vue";
import Send from "./components/send.vue";

import ViewReportModal from "./components/viewReportModal.vue";
import ViewReportDynamicModal from "./components/viewReportDynamicModal";

export default {
  page: {
    title: i18n.t("reportRows"),
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {
    // Layout,
    // PageHeader,
    Table,
    Create,
    Oraganizations,
    Send,
    Receivers,
    ViewReportModal,
    ViewReportDynamicModal,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      loaderButton: false,
      indexTab: 0,
      loaderShare: false,
      title: `${this.$t("organizitionalReport")} - ${this.$t(
          "createNewDoc"
      )}`,
      items: [
        {
          text: this.$t("Hisobotlar"),
          href: "/",
        },

        {
          text: this.$t("organizitionalReport"),
        },
      ],
      tabStatus: ["CREATED"],
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
      currentReport: {},
      selectedTrItem: {},
      sendModal: false,
      loaderReceiver: false,
      infoData: [],
      viewReportModal: false,
      isHasDynamicRow: false,
      isGeneratedRow: false,
    };
  },
  created() {
    this.getList();
  },
  watch: {
    indexTab(v) {
      if (v == 0) {
        this.tabStatus = ["CREATED"];
      } else if (v == 1) {
        this.tabStatus = ["SEND", "CANCELED", "APPROVED"];
      }
      this.getList();
    },
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
    getReceivers(item) {
      this.loaderReceiver = true;
      Service.getReceivers(item.id)
          .then((rs) => {
            this.infoData = rs.data;
          })
          .finally(() => {
            this.loaderReceiver = false;
          });
    },
    sendAndSave() {
      if (this.$refs.sendRef) {
        if (
            this.$refs.sendRef.selectedReview.id &&
            this.$refs.sendRef.selectedSignature.employeeId
        ) {
          this.loaderButton = true;
          let payload = {
            reportId: this.selectedTrItem.id,
            signerId: this.$refs.sendRef.selectedSignature.employeeId,
            receiverDepId: this.$refs.sendRef.selectedReview.id,
          };

          Service.sendDocReport(payload)
              .then((rs) => {
                if (rs.data) {
                  this.sendModal = false;
                  this.$router.push("/report/organizitional/sent");
                  this.successSaved();
                }
              })
              .catch((e) => {})
              .finally((e) => {
                this.loaderButton = false;
              });
        } else {
          showMsgError(this.$t("messages.fill_info_fully"));
        }
      }
    },
    clickTr(data) {
      if (this.selectedTrItem.id == data.id) {
        this.selectedTrItem = {};
        this.infoData = [];
        this.$refs.tableRef.resetCurrentData();
      } else {
        this.selectedTrItem = data;
        this.getReceivers(data);
      }
    },
    okShareModal() {
      let selectedYuridik = this.$refs.organizationsRef.selectedYuridik;
      if (selectedYuridik && selectedYuridik.id) {
        this.loaderShare = true;
        Service.addDepartmentTable(selectedYuridik, this.currentReport)
            .then(() => {
              this.modalShare = false;
              this.getList();
              this.successSaved();
            })
            .catch((e) => {})
            .finally(() => (this.loaderShare = false));
      } else {
        this.enterInfo();
      }
    },
    share(data) {
      this.currentReport = data;
      this.modalShare = true;
    },
    sort(s) {
      //if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = s;
    },
    toggleModal(v, mode = "copy", item) {
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
                // this.catchErr(err);
              });
        }
      });
    },
    actionClick(action = "", item) {
      this.isHasDynamicRow = item.hasDynamicRowsForTable
      this.isGeneratedRow = item.isGenerated
      if (action == "delete") {
        this.delete(item);
      } else if (action == "edit") {
        this.$router.push(
            `/report/organizitional/insert/${enc(
                item.docTableId
            )}/?reportId=${enc(item.id)}`
        );
        // this.toggleModal(true, action, item);
      } else if (action == "view") {
        this.viewReportModal = true;
        if (item.hasDynamicRowsForTable) {
          setTimeout(() => {
            this.$refs.viewReportDynamicModalRef.getById(item.docTableId, item.id);
          }, 400);
        } else {
          if (item.isGenerated) {
            setTimeout(() => {
              this.$refs.viewReportDynamicModalRef.getById(item.docTableId, item.id);
            }, 400);
          } else {
            setTimeout(() => {
              this.$refs.viewReportModalRef.getById(item.docTableId, item.id, item.status);
            }, 400);
          }
        }

        // setTimeout(() => {
        //   this.$refs.viewReportModalRef.getById(item.docTableId, item.id, item.status);
        // }, 400);
        // this.$router.push(
        //   `/report/organizitional/view/${enc(item.docTableId)}/?reportId=${enc(
        //     item.id
        //   )}`
        // );
      } else if (action == "send") {
        this.sendModal = true;
        // this.cnf().then((res) => {
        //   if (res.value) {
        //     Service.sendReportForConfirmation(item.id)
        //       .then((res) => {
        //         if (res.data.id) {
        //           showMsgError(this.$t("error.jadval_shartlari"));
        //           this.$router.push(
        //             `/report/organizitional/insert/${enc(
        //               item.docTableId
        //             )}/?reportId=${enc(item.id)}&f1Ids=${res.data.f1Cols.map(
        //               (e) => e.id
        //             )}&f2Ids=${res.data.f2Cols.map((e) => e.id)}&fRowId=${
        //               res.data.rowId
        //             }`
        //           );
        //         } else {
        //           showMsgSuccess(this.$t("warning.sendInfo"));
        //           this.getList();
        //         }
        //       })
        //       .catch((e) => catchErr(e));
        //   }
        // });
      }
    },

    successCreateAndEdit() {
      this.getList();
      if (this.mode == "copy") {
        this.successSaved();
      }
      this.showModal = false;
    },
    //create
    create(e) {
      this.loader = true;
      Service.createCopyDocReport(this.$refs.addRef.form)
          .then((rs) => {
            if (rs.data) {
              this.successCreateAndEdit();
              this.$router.push("/report/organizitional/create");
            }
          })
          .catch((err) => {
            // this.catchErr(err);
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
            // this.catchErr(err);
          })
          .finally(() => {
            this.loader = false;
          });
    },

    okModal(b) {
      b.preventDefault();
      if (!this.$refs.addRef.checkValidity()) {
        if (this.mode == "copy") {
          this.create();
        } else {
          this.enterInfo();
        }
      } else {
        this.enterInfo();
      }
    },
    //list
    getList() {
      this.loading = true;
      Service.listDocReportSent(this.params)
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
    <div class="col-md-12 text-center">
      <div class="h4 mb-4 d-inline-block">{{ $t('submodules.reports.report_sended') }}</div>
    </div>
    <b-modal
        id="widthM"
        v-model="viewReportModal"
        scrollable
        size="xl"
        :title="`${getName({
        nameLt: selectedTrItem.docTableNameLt,
        nameRu: selectedTrItem.docTableNameRu,
        nameUz: selectedTrItem.docTableNameUz,
      })}`"
    >
      <ViewReportDynamicModal v-if="isHasDynamicRow || isGeneratedRow" ref="viewReportDynamicModalRef"/>
      <ViewReportModal v-else ref="viewReportModalRef"/>

      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="viewReportModal = false">
          {{ $t("actions.close") }}
        </b-button
        >
      </template>
    </b-modal>
    <b-modal
        v-model="sendModal"
        scrollable
        :no-close-on-backdrop="true"
        size="xl"
        id="doc-create-modal"
        :title="`${$t('actions.send')}`"
    >
      <Send ref="sendRef"/>

      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="sendModal = false">
          {{ $t("actions.cancel") }}
        </b-button
        >
        <b-button variant="success" @click="sendAndSave">
          <b-overlay :opacity="0.1" :show="loaderButton" rounded="sm">
            {{ $t("actions.send") }}
          </b-overlay>
        </b-button
        >
      </template>
    </b-modal>
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

    <b-modal
        :cancel-variant="'outline-danger'"
        :ok-variant="'success'"
        :no-close-on-backdrop="true"
        :ok-title="$t('actions.save')"
        :cancel-title="$t('actions.cancel')"
        @close="modalShare = false"
        @cancel="modalShare = false"
        @ok="okModal"
        size="xl"
        v-model="modalShare"
        :title="$t('yuridikDep')"
    >
      <Oraganizations ref="organizationsRef"/>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="modalShare = false">{{
            $t("actions.close")
          }}
        </b-button>
        <b-overlay :opacity="0.1" :show="loaderShare" rounded="sm">
          <b-button variant="success" @click="okShareModal">
            {{ $t("actions.send") }}
          </b-button
          >
        </b-overlay>
      </template>
    </b-modal>
    <div>
      <!-- <PageHeader :title="title" :items="items" /> -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row mb-2">
                <div class="col-sm-4">
                  <div class="mr-2 mb-2 d-inline-block">
                    <div class="d-inline-block mt-1 ml-2">
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
                <!--                <div class="col-sm-8">-->
                <!--                  <div class="text-sm-right">-->
                <!--                    <b-button-->
                <!--                      v-if="indexTab == 0"-->
                <!--                      @click="toggleModal(true, 'create', {})"-->
                <!--                      type="button"-->
                <!--                      variant="primary"-->
                <!--                    >-->
                <!--                      <i class="mdi mdi-plus mr-1"></i>-->
                <!--                      {{ $t("createReport") }}-->
                <!--                    </b-button>-->
                <!--                  </div>-->
                <!--                </div>-->
              </div>
              <div class="pt-3">
                <div class="row">
                  <div class="col-7">
                    <Table
                        @clickTr="clickTr"
                        @share="share"
                        @showModal="actionClick"
                        :page="page"
                        :limit="limit"
                        ref="tableRef"
                        :list="list"
                        :loading="loading"
                    >
                      <template v-slot:thead>
                        <tr class="tr-text-center">
                          <th
                              class="text-center"
                              style="width: 10px !important"
                          >
                            <span class="d-block">№</span>
                          </th>
                          <th style="min-width: 150px;">{{ $t("column.name") }}</th>
                          <th>{{ $t("submodules.reports.report_date") }}</th>
                          <th class="text-center" style="min-width: 350px;">{{ $t("nameShakl") }}</th>
                          <th class="text-center" style="min-width: 300px">
                            {{ $t("titleShakl") }}
                          </th>
                          <th class="text-center">{{ $t("dateTypes") }}</th>
                          <!-- <th class="text-center">
                        {{ $t("conditionTable") }}
                      </th> -->
                          <th>{{ $t("submodules.reports.yur_department") }}</th>
                          <th>{{ $t("submodules.reports.created_datetime") }}</th>
                          <th class="text-center">
                            {{ $t("column.status") }}
                          </th>
                          <!-- <th style="width: 14% !important" class="text-center">
                            {{ $t("column.actions") }}
                          </th> -->
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

                  <div class="col-5">
                    <div class="card card-body">

                      <table class="table m-0">
                        <tbody>
                        <tr>
                          <td class="text-muted">
                            <b>
                              {{ $t("date") }}
                            </b>
                          </td>
                          <td>
                            {{ selectedTrItem.reportDate }}
                          </td>
                        </tr>
                        <tr>
                          <td class="text-muted" style="width: 35%">
                            <b>
                              {{ $t("nameShakl") }}
                            </b>
                          </td>
                          <td>
                            {{
                              getName({
                                nameLt: selectedTrItem.docTableNameLt,
                                nameRu: selectedTrItem.docTableNameRu,
                                nameUz: selectedTrItem.docTableNameUz,
                              })
                            }}
                          </td>
                        </tr>
                        <tr>
                          <td class="text-muted">
                            <b>
                              {{ $t("titleShakl") }}
                            </b>
                          </td>
                          <td>
                            <p class="pre m-0">
                              {{
                                getName({
                                  nameLt: selectedTrItem.docTableTitleLt,
                                  nameRu: selectedTrItem.docTableTitleRu,
                                  nameUz: selectedTrItem.docTableTitleUz,
                                })
                              }}
                            </p>
                          </td>
                        </tr>

                        <tr>
                          <td class="text-muted">
                            <b>
                              {{ $t("dateTypes") }}
                            </b>
                          </td>
                          <td>
                            <p class="pre m-0">
                              {{
                                getName({
                                  nameLt: selectedTrItem.dateTypeNameLt,
                                  nameRu: selectedTrItem.dateTypeNameRu,
                                  nameUz: selectedTrItem.dateTypeNameUz,
                                })
                              }}
                            </p>
                          </td>
                        </tr>

                        <tr>
                          <td class="text-muted">
                            <b>
                              {{ $t("conditionTable") }}
                            </b>
                          </td>
                          <td>
                            <p class="pre m-0">
                              {{
                                getName({
                                  nameLt: selectedTrItem.docTableConditionLt,
                                  nameRu: selectedTrItem.docTableConditionRu,
                                  nameUz: selectedTrItem.docTableConditionUz,
                                })
                              }}
                            </p>
                          </td>
                        </tr>

                        <tr>
                          <td class="text-muted">
                            <b>{{ $t("whoSent") }}</b>
                          </td>
                          <td class="pl-0">
                            <ul
                                v-if="selectedTrItem.id"
                                id="il"
                                class="list-unstyled chat-list"
                            >
                              <li>
                                <div
                                    class="media d-flex"
                                    style="align-items: center"
                                >
                                  <div class="align-self-center mr-3"></div>
                                  <div
                                      class="align-self-center mr-3"
                                      v-if="selectedTrItem.employeeUploadPath"
                                  >
                                    <img
                                        height="auto"
                                        :src="`${publicPath}/${selectedTrItem.employeeUploadPath}`"
                                        class="rounded-circle avatar-sm"
                                        alt
                                    />
                                  </div>
                                  <div
                                      class="avatar-sm align-self-center mr-3"
                                      v-if="!selectedTrItem.employeeUploadPath"
                                  >
                                      <span class=" avatar-title rounded-circle bg-soft-primary text-white " >
                                        {{ selectedTrItem.employeeFirstName.charAt( 0 ) }}
                                      </span>
                                  </div>

                                  <div class="media-body overflow-hidden">
                                    <h5 class="font-size-14 mb-1">
                                      {{
                                        `${selectedTrItem.employeeLastName} ${selectedTrItem.employeeFirstName} ${selectedTrItem.employeeParentName}`
                                      }}
                                    </h5>
                                    <p class="m-0">
                                      {{
                                        getName({
                                          nameLt:
                                          selectedTrItem.departmentNameLt,
                                          nameRu:
                                          selectedTrItem.departmentNameRu,
                                          nameUz:
                                          selectedTrItem.departmentNameUz,
                                        })
                                      }}
                                    </p>
                                    <p class="m-0">
                                      {{
                                        getName({
                                          nameLt:
                                          selectedTrItem.positionNameLt,
                                          nameRu:
                                          selectedTrItem.positionNameRu,
                                          nameUz:
                                          selectedTrItem.positionNameUz,
                                        })
                                      }}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </td>
                        </tr>

                        <tr v-if="selectedTrItem.id">
                          <td colspan="2" class="text-muted text-center p-0">
                            <div class="mt-4 mb-3">
                              <b-button
                                  class="mr-2"
                                  @click="toggleModal(true, 'copy', selectedTrItem)"
                                  type="button"
                                  variant="success"
                              >
                                <i style="font-size: 14px" class="mdi mdi-content-copy mr-1"></i>
                                {{ $t("actions.copy") }}

                              </b-button>

                              <b-button
                                  variant="primary"
                                  @click="actionClick('view', selectedTrItem)"
                              >
                                <i class="fa fa-eye"></i>

                                {{ $t("actions.view") }}
                              </b-button>
                            </div>
                          </td>
                        </tr>

                        <tr>
                          <td class="text-muted">
                            <b>{{ $t("column.receivers") }}</b>
                          </td>
                          <td></td>
                        </tr>
                        </tbody>
                      </table>

                      <b-overlay
                          :opacity="0.1"
                          :show="loaderReceiver"
                          rounded="sm"
                      >
                        <Receivers :infoData="infoData"/>
                      </b-overlay>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@media (min-width: 992px) {
  #widthM .modal-xl {
    max-width: 90% !important;
  }
}
</style>
