<script>
// import Layout from "@/router/views/dashboards/default";
// import PageHeader from "@/components/page-header";

import Table from "./components/table_income";
import Create from "./components/addDate.vue";

import Service from "../reportService";

import appConfig from "@/app.config";

import i18n from "@/i18n";
import {enc, showMsgSuccess, showMsgError} from "@/helper";

import Oraganizations from "./organizations/organizations.vue";
import Send from "./components/send.vue";

import Receivers from "./receivers.vue";

import SignKeys from "./SignKeys.vue";
import ViewReportModal from "./components/viewReportModal.vue";
import ViewReportDynamicModal from "./components/viewReportDynamicModal";
import GatherModal from "./components/gatherModal.vue";

export default {
  page: {
    title: i18n.t("reportRows"),
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {
    // Layout,
    // PageHeader,
    Receivers,
    Table,
    Create,
    Oraganizations,
    Send,
    SignKeys,
    ViewReportModal,
    ViewReportDynamicModal,
    GatherModal,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      loaderButton: false,
      indexTab: 0,
      loaderShare: false,
      title: `${this.$t("organizitionalReport")} - ${this.$t("received")}`,
      items: [
        {
          text: this.$t("Hisobotlar"),
          href: "/",
        },

        {
          text: this.$t("received"),
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
      signatureModal: false,
      loaderSign: false,
      reasonRejected: "",
      isRejectedModal: false,
      rejectedLoader: false,
      viewReportModal: false,
      gatherModal: false,
      currentAction: null,
      worksInDep: false,
      isHasDynamicRow: false,
      isGeneratedRow: false,
    };
  },
  created() {
    this.checkEmployeeIfWorksInDep();
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
    checkEmployeeIfWorksInDep() {
      Service.checkEmployeeIfWorksInDep()
          .then((res) => {
            this.worksInDep = res.data.status;
          })
          .catch((e) => {
          });
    },
    gather() {
      this.gatherModal = true;
      // let selectedReport = this.$refs.income_table.members;
      // if (selectedReport && selectedReport.length > 0) {
      // } else {
      //   showMsgError(this.$t("warning.selectReport"));
      // }
    },
    saveRejected() {
      if (this.currentAction == "reject_confirm") {
        this.rejectedLoader = true;
        Service.makeCancelled2(this.selectedTrItem.id, this.reasonRejected)
            .then(async () => {
              this.isRejectedModal = false;
              let tempData = this.selectedTrItem;
              await this.successSaved();
              await this.getList();
              setTimeout(() => {
                let newdata = this.list.find((e) => e.id == tempData.id);
                this.selectedTrItem = Object.assign({}, newdata);
                this.$forceUpdate();
                this.getReceivers(this.selectedTrItem);
              }, 500);
            })
            .finally(() => {
              this.rejectedLoader = false;
            });
      } else {
        this.rejectedLoader = true;
        Service.saveRejectedReport(this.selectedTrItem.id, this.reasonRejected)
            .then(async () => {
              this.isRejectedModal = false;
              let tempData = this.selectedTrItem;
              await this.successSaved();
              await this.getList();
              setTimeout(() => {
                let newdata = this.list.find((e) => e.id == tempData.id);
                this.selectedTrItem = Object.assign({}, newdata);
                this.$forceUpdate();
                this.getReceivers(this.selectedTrItem);
              }, 500);
            })
            .finally(() => {
              this.rejectedLoader = false;
            });
      }
    },
    signSuccess(data) {
      let payload = {
        signedContent: data.content,
        inn: data.inn ? data.inn : null,
        personalNumber: data.pnfl ? data.pnfl : null,
      };
      Service.signDocReport(payload, this.selectedTrItem.id)
          .then(async () => {
            this.isModalKeys = false;
            this.signatureModal = false;
            let tempData = this.selectedTrItem;
            await showMsgSuccess(this.$t("successDocSigned"));
            await this.getList();
            setTimeout(() => {
              let newdata = this.list.find((e) => e.id == tempData.id);
              this.selectedTrItem = Object.assign({}, newdata);
              this.$forceUpdate();
              this.getReceivers(this.selectedTrItem);
            }, 500);
          })
          .catch((err) => {
            // this.catchErr(err);
          });
    },
    getReceivers(item) {
      this.loaderReceiver = true;
      Service.getReceivers(item.reportId)
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
              .catch((e) => {
              })
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
        this.$refs.income_table.resetCurrentData();
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
            .catch((e) => {
            })
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
        // this.$router.push(
        //   `/report/organizitional/insert/${enc(
        //     item.docTableId
        //   )}/?reportId=${enc(item.id)}`
        // );
        // this.toggleModal(true, action, item);
      } else if (action == "view") {
        this.viewReportModal = true;
        if (item.hasDynamicRowsForTable) {
          setTimeout(() => {
            this.$refs.viewReportDynamicModalRef.getById(
                item.docTableId,
                item.reportId,
                item.status
            );
          }, 400);
        } else {
          if (item.isGenerated) {
            setTimeout(() => {
              this.$refs.viewReportDynamicModalRef.getById(
                  item.docTableId,
                  item.reportId,
                  item.status
              );
            }, 400);
          } else {
            setTimeout(() => {
              this.$refs.viewReportModalRef.getById(
                  item.docTableId,
                  item.reportId,
                  item.status
              );
            }, 400);
          }
        }
        //
        // setTimeout( () => {
        //   this.$refs.viewReportModalRef.getById(
        //       item.docTableId,
        //       item.reportId,
        //       item.status
        //   );
        // }, 400 );

      } else if (action == "send") {
        this.sendModal = true;
      } else if (action == "sign") {
        this.signatureModal = true;
      } else if (action == "reject") {
        this.isRejectedModal = true;
      } else if (action == "reject_confirm") {
        this.isRejectedModal = true;
        this.currentAction = action;
      } else if (action == "confirm") {
        this.makeApproved2();
      }
    },
    makeApproved2() {
      this.cnf().then((res) => {
        if (res.value) {
          Service.makeApproved2(this.selectedTrItem.id)
              .then(async () => {
                let tempData = this.selectedTrItem;
                await this.successSaved();
                await this.getList();
                setTimeout(() => {
                  let newdata = this.list.find((e) => e.id == tempData.id);
                  this.selectedTrItem = Object.assign({}, newdata);
                  this.$forceUpdate();
                  this.getReceivers(this.selectedTrItem);
                }, 500);
              })
              .catch((err) => {
                // this.catchErr(err);
              });
        }
      });
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
      Service.createDocReport(this.$refs.addRef.form)
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
      if (
          !this.$refs.addRef.checkValidity() &&
          !this.$refs.GatherModalRef.checkValidity()
      ) {
        let form = this.$refs.GatherModalRef.form;
        let date = this.$refs.addRef.form;
        let reportData = this.$refs.GatherModalRef.reportData;
        Service.saveGatheredReport(form, date, reportData)
            .then(() => {
              this.successSaved();
              this.showModal = false;
              this.gatherModal = false;
              this.$router.push("/report/organizitional/gathered");
            })
            .catch((e) => {
            });
      } else {
        this.enterInfo();
      }
    },
    //list
    getList() {
      this.loading = true;
      Service.listDocReportIncome(this.params, this.tabStatus)
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
    <div>
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.reports.report_income') }}</div>
      </div>
      <!-- gather mnodal -->
      <b-modal
          id="widthM"
          v-model="gatherModal"
          scrollable
          size="xl"
          hide-header
          :no-close-on-backdrop="true"
          :title="$t('actions.gather')"
      >
        <div style="min-height: 600px">
          <GatherModal ref="GatherModalRef"/>

          <b-modal
              :cancel-variant="'outline-danger'"
              :ok-variant="'success'"
              :no-close-on-backdrop="true"
              @close="showModal = false"
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
        </div>

        <!-- <GatherModal /> -->

        <template v-slot:modal-footer>
          <b-button variant="secondary" @click="gatherModal = false">
            {{ $t("actions.close") }}
          </b-button
          >
          <b-button variant="success" @click="showModal = true">
            {{ $t("actions.save") }}
          </b-button
          >
        </template>
      </b-modal>
      <!-- view modal -->
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
    </div>
    <b-modal
        scrollable
        v-model="signatureModal"
        hide-footer
        size="lg"
        :title="`${$t('submodules.reports.make_sign')}`"
    >
      <b-overlay :opacity="0.1" :show="loaderSign" rounded="sm">
        <SignKeys @sign="signSuccess" :dataToSign="selectedTrItem"/>
      </b-overlay>
    </b-modal>
    <!-- rejected modal -->
    <b-modal
        scrollable
        v-model="isRejectedModal"
        size="md"
        :title="`${$t('submodules.reports.reasonRejected')}`"
    >
      <b-form-textarea v-model="reasonRejected" rows="5"></b-form-textarea>

      <template v-slot:modal-footer>
        <b-button variant="danger" @click="saveRejected">
          <b-overlay :opacity="0.1" :show="rejectedLoader" rounded="sm">
            {{ $t("submodules.reports.rejected") }}
          </b-overlay>
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
                              type="text"
                              style="width: 300px"
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
                    <!-- GATHERED_PETROL_PRICES_BUTTON -->
                    <b-button
                        :to="{name: 'OrganizitionalReportGatheredForPetrolPrices'}"
                        v-if="worksInDep"
                        type="button"
                        variant="info"
                        class="mr-2"
                    >
                      <i class="mdi mdi-cash-marker mr-1" style="font-size: 1rem;"></i>
                      {{ $t("submodules.reports.gathered_petrol_prices") }}
                    </b-button>

                    <b-button
                        @click="gather"
                        v-if="worksInDep"
                        type="button"
                        variant="primary"
                    >
                      <i class="fa fa-tasks mr-1"></i>
                      {{ $t("actions.gather") }}
                    </b-button>
                  </div>
                </div>
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
                        ref="income_table"
                        :list="list"
                        :loading="loading"
                    >
                      <template v-slot:thead>
                        <tr class="tr-text-center">
                          <!-- <th>#</th> -->
                          <th
                              class="text-center"
                              style="width: 10px !important"
                          >
                            <span class="d-block">№</span>
                          </th>
                          <th class="text-center">
                            {{ $t("column.status") }}
                          </th>
                          <th style="min-width: 100px;"> {{ $t("submodules.reports.report_date") }}</th>
                          <th class="text-center" style="min-width: 350px;">{{ $t("nameShakl") }}</th>
                          <th class="text-center" style="width: 23%">
                            {{ $t("titleShakl") }}
                          </th>
                          <th class="text-center">{{ $t("dateTypes") }}</th>
                          <th>{{ $t("territorial_administration") }}</th>
                          <th>{{ $t("submodules.reports.created_datetime") }}</th>
                          <!-- <th class="text-center">
                        {{ $t("conditionTable") }}
                      </th> -->

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
                            <div
                                class="
                                  mt-4
                                  mb-3
                                  d-flex
                                  align-items-center
                                  justify-content-center
                                "
                            >
                              <!-- <b-button
                                variant="success"
                                @click="actionClick('send', selectedTrItem)"
                              >
                                <i class="fa fa-share"></i>

                                {{ $t("actions.send") }}
                              </b-button> -->
                              <b-button
                                  class="ml-2"
                                  variant="primary"
                                  @click="actionClick('view', selectedTrItem)"
                              >
                                <i class="fa fa-eye"></i>

                                {{ $t("actions.view") }}
                              </b-button>
                              <div v-if="selectedTrItem.forSign">
                                <b-button
                                    v-if="selectedTrItem.status == 'SEND'"
                                    class="ml-2"
                                    variant="success"
                                    @click="actionClick('sign', selectedTrItem)"
                                >
                                  <i class="fa fa-check"></i>

                                  {{ $t("confirm") }}
                                </b-button>
                                <b-button
                                    v-if="selectedTrItem.status == 'SEND'"
                                    class="ml-1"
                                    @click="
                                      actionClick('reject', selectedTrItem)
                                    "
                                    variant="danger"
                                >
                                  <i class="fa fa-times"></i>
                                  {{ $t("submodules.reports.rejected") }}
                                </b-button>
                              </div>
                              <div v-else>
                                <b-button
                                    v-if="selectedTrItem.status == 'SIGN'"
                                    class="ml-2"
                                    variant="success"
                                    @click="
                                      actionClick('confirm', selectedTrItem)
                                    "
                                >
                                  <i class="fa fa-check"></i>

                                  {{ $t("confirm") }}
                                </b-button>
                                <b-button
                                    v-if="selectedTrItem.status == 'SIGN'"
                                    class="ml-1"
                                    @click="
                                      actionClick(
                                        'reject_confirm',
                                        selectedTrItem
                                      )
                                    "
                                    variant="danger"
                                >
                                  <i class="fa fa-times"></i>
                                  {{ $t("actions.reject") }}
                                </b-button>
                              </div>
                              <!-- <b-button
                                variant="light"
                                class="ml-2"
                                @click="actionClick('edit', selectedTrItem)"
                                target="_blank"
                              >
                                <i class="fa fa-pencil-alt"></i>
                                {{ $t("actions.edit") }}
                              </b-button> -->
                            </div>
                            <div></div>
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
