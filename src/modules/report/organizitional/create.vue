<script>
// import Layout from "@/router/views/dashboards/default";
// import PageHeader from "@/components/page-header";

import Table from "./components/table";
import Create from "./components/addUpdate.vue";

import Service from "../reportService";

import appConfig from "@/app.config";

import i18n from "@/i18n";
import {showMsgError} from "@/helper";

import Oraganizations from "./organizations/organizations.vue";
import Send from "./components/send.vue";
import EditReportModal from "./components/editReportModal.vue";
import EditReportDynamicModal from "./components/editReportDynamicModal";
import ViewReportModal from "./components/viewReportModal.vue";
import ViewReportDynamicModal from "./components/viewReportDynamicModal";
import SignKeys from "./SignKeys";

export default {
  page: {
    title: i18n.t("reportRows"),
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {
    // Layout,
    // PageHeader,
    SignKeys,
    Table,
    Create,
    Oraganizations,
    Send,
    ViewReportModal,
    ViewReportDynamicModal,
    EditReportModal,
    EditReportDynamicModal,
  },
  data() {
    return {
      signatureModal: false,
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
      viewReportModal: false,
      editReportModal: false,
      isHasDynamicRow: false,
      isGeneratedRow: false,
      loaderSave: false,
      loaderAutoGenerate: false,
      cmpKey: 0,
      reportGenerated: false,
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
    computedIsGenerated() {
      if (this.reportGenerated === false) {
        return true;
      }
      return this.isGeneratedRow && this.reportGenerated === false;
    },
  },
  methods: {
    cancelReport(bvModalEvent) {
      bvModalEvent.preventDefault()
      this.cancelBtn().then(async (rs) => {
        if (rs.value) {
          this.editReportModal = false
        }
      })
    },
    async closedReportLoader() {
      this.loaderSave = true;
    },
    setReportGenerated(reportGenerated) {
      this.reportGenerated = reportGenerated;
    },
    async closedReport() {
      await this.save(null, true);
    },
    save($event, forCompletingRows = false) {
      this.loaderSave = true;
      let sendData = [];
      if (this.isHasDynamicRow || this.isGeneratedRow) {
        let {thirdTrIdData} = this.$refs.editReportDynamicModalRef;
        let payload = thirdTrIdData.map((e) => e.value);
        payload = payload.filter(e => {
          if (e && e.length) {
            e = e.filter(el => el.rowId)
            return e
          }
        })
        payload.forEach((e) => {
          e.filter((d) => {
            if (d.selectedItem) {
              d.selectValueNameUz = (d.selectValueNameUz == undefined || d.selectValueNameUz == null) ? d.selectedItem.selectValueNameUz : d.selectValueNameUz
              delete d.selectedItem
              delete d.originalSelectValueNameLt
              delete d.originalSelectValueNameRu
              delete d.originalSelectValueNameUz
            }
            if (d.rowId) {
              d.dynamicRowId = d.rowId ? d.rowId : ''
              delete d.originalSelectValueNameLt
              delete d.originalSelectValueNameRu
              delete d.originalSelectValueNameUz
              delete d.rowId
              sendData.push(d);
              return d
            }

          });
        });
      } else {
        let {thirdTrIdData} = this.$refs.editReportModalRef;
        let payload = thirdTrIdData.map((e) => e.value);
        payload = payload.filter(e => {
          if (e && e.length) {
            e = e.filter(el => el.rowId)
            return e
          }
        })
        payload.forEach((e) => {
          e.filter((d) => {
            if (d.selectedItem) {
              delete d.selectedItem
            }
            if (d.rowId) {
              d.value = d.value ? d.value : ''
              sendData.push(d);
              return d
            }
          });
        });
      }
      Service.fillDocReport(sendData, this.selectedTrItem.id)
          .then((rs) => {
            if (rs.data) {
              this.successSaved();
              if (!forCompletingRows) {
                this.editReportModal = false;
              } else {
                this.$refs.editReportDynamicModalRef.stopFormingRows()
              }
              // this.$router.push("/report/organizitional/create");
            }
          })
          .catch((e) => {
          })
          .finally(() => (this.loaderSave = false));
    },
    autoGenerateReport() {

      let columnIds = this.$refs.editReportDynamicModalRef.selectedColumns.map((e) => e.id)

      this.loaderAutoGenerate = true;
      Service.autoGenerateReport(this.selectedTrItem.id, columnIds)
          .then((rs) => {
            this.$refs.editReportDynamicModalRef.getById(this.selectedTrItem.docTableId, this.selectedTrItem.id, this.selectedTrItem);
            this.$refs.editReportDynamicModalRef.resetIndex();
          })
          .catch((e) => {
          })
          .finally(() => (this.loaderAutoGenerate = false));
    },

    async sendAndSaveBySigner(data) {
      this.loaderButton = true;
      let payload = {
        reportId: this.selectedTrItem.id,
        receiverDepId: this.$refs.sendRef.selectedReview.id,
      };
      let payload1 = {
        signedContent: data.content,
        inn: data.inn ? data.inn : null,
        personalNumber: data.pnfl ? data.pnfl : null,
      };
      await Service.sendDocReportSignerMe(payload, payload1)
          .then(async res => {
            this.isModalKeys = false;
            this.signatureModal = false;
            this.loaderButton = false;
            this.editReportModal = false;
            this.sendModal = false;
            this.$router.push("/report/organizitional/sent");
            this.successSaved();
            // let tempData = this.selectedTrItem;
            // await this.getList();
            // setTimeout(() => {
            //   let newdata = this.list.find((e) => e.id == tempData.id);
            //   this.selectedTrItem = newdata;
            //   this.$forceUpdate();
            //   this.getReceivers(this.selectedTrItem);
            // }, 500);
          })
          .catch((err) => {
            // this.catchErr(err);
          })
          .finally((e) => {
            this.signatureModal = false;
            this.loaderButton = false;
          });
    },

    sendAndSave() {
      if (this.$refs.sendRef) {
        if (this.$refs.sendRef.selected_me) {
          this.signatureModal = true;
        } else {
          if (
              this.$refs.sendRef.selectedReview.id &&
              this.$refs.sendRef.selectedSignature.id
          ) {
            this.loaderButton = true;
            let payload = {
              reportId: this.selectedTrItem.id,
              signerId: this.$refs.sendRef.selectedSignature.id,
              receiverDepId: this.$refs.sendRef.selectedReview.id,
            };

            Service.sendDocReport(payload)
                .then((res) => {
                  if (res.data.id) {
                    showMsgError(this.$t("error.jadval_shartlari"));
                    this.editReportModal = true;
                    setTimeout(() => {
                      if (this.$refs.editReportModalRef) {
                        this.$refs.editReportModalRef.getById(
                            this.selectedTrItem.docTableId,
                            this.selectedTrItem.id
                        );

                        this.$refs.editReportModalRef.setError(
                            `${res.data.f1Cols.map((e) => e.id)}`,
                            `${res.data.f2Cols.map((e) => e.id)}`,
                            res.data.rowId
                        );
                      }
                    }, 400);

                    // let routeData = this.$router.resolve({
                    //   name: "OrganizitionalReportInsert",
                    //   params: { id: `${enc(item.docTableId)}` },
                    //   query: {
                    //     reportId: `${enc(item.id)}`,
                    //     f1Ids: `${res.data.f1Cols.map((e) => e.id)}`,
                    //     f2Ids: `${res.data.f2Cols.map((e) => e.id)}&fRowId=${
                    //       res.data.rowId
                    //     }`,
                    //   },
                    // });
                    // window.open(routeData.href, "_blank");
                  } else {
                    this.editReportModal = false;
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
      }
    },
    clickTr(data) {
      if (this.selectedTrItem.id == data.id) {
        this.selectedTrItem = {};
        this.$refs.tableRef.resetCurrentData();
      } else {
        this.selectedTrItem = data;
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
          Service.deleteDocReport(item.id)
              .then((rs) => {
                this.deleteSuccess();
                this.selectedTrItem = {};
                this.getList();
              })
              .catch((err) => {
                // this.catchErr(err);
              });
        }
      });
    },
    actionClick(action = "", item) {
      this.isHasDynamicRow = true //item.hasDynamicRowsForTable
      this.isGeneratedRow = item.isGenerated
      if (action === "delete") {
        this.delete(item);
      } else if (action === "edit") {
        this.editReportModal = true;
        if (item.hasDynamicRowsForTable) {
          setTimeout(async () => {
            const isGeneratedRow = this.isGeneratedRow
            await this.$refs.editReportDynamicModalRef.getById(item.docTableId, item.id, item);
            this.isGeneratedRow = 'none'
            await this.$refs.editReportDynamicModalRef.resetIndex();
            this.isGeneratedRow = isGeneratedRow
          }, 400);
        } else {
          if (item.isGenerated) {
            setTimeout(() => {
              this.$refs.editReportDynamicModalRef.getById(item.docTableId, item.id, item);
              this.$refs.editReportDynamicModalRef.resetIndex();
            }, 400);
          } else {
            setTimeout(() => {
              this.$refs.editReportModalRef.getById(item.docTableId, item.id);
              this.$refs.editReportModalRef.resetIndex();
            }, 400);
          }
        }
      } else if (action === "view") {
        this.viewReportModal = true;

        if (item.hasDynamicRowsForTable) {
          setTimeout(() => {
            this.$refs.viewReportDynamicModalRef.getById(item.docTableId, item.id,);
          }, 400);
        } else {
          if (item.isGenerated) {
            setTimeout(() => {
              this.$refs.viewReportDynamicModalRef.getById(item.docTableId, item.id);
            }, 400);
          } else {
            setTimeout(() => {
              this.$refs.viewReportModalRef.getById(item.docTableId, item.id);
            }, 400);
          }
        }

        // this.$router.push(
        //   `/report/organizitional/view/${enc(item.docTableId)}/?reportId=${enc(
        //     item.id
        //   )}`
        // );
      } else if (action === "send") {
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
      if (this.mode === "create") {
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
      if (!this.$refs.addRef.checkValidity()) {
        if (this.mode === "create") {
          this.create();
        } else {
          this.update();
        }
      } else {
        this.enterInfo();
      }
    },
    //list
    getList() {
      this.loading = true;
      Service.listDocReportDraft(this.params, this.tabStatus)
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
      <div class="h4 mb-4 d-inline-block">{{ $t('submodules.reports.create_report') }}</div>
    </div>
    <b-modal
        scrollable
        v-model="signatureModal"
        hide-footer
        size="lg"
        :title="`${$t('submodules.reports.make_sign')}`"
    >
      <b-overlay :opacity="0.1" rounded="sm">
        <SignKeys @sign="sendAndSaveBySigner" :dataToSign="selectedTrItem"/>
      </b-overlay>
    </b-modal>
    <b-modal
        id="widthM"
        :no-close-on-backdrop="true"
        no-close-on-esc
        v-model="editReportModal"
        @close="cancelReport"
        size="xl"
        :title="getName({
          nameLt: selectedTrItem.nameLt,
          nameRu: selectedTrItem.nameRu,
          nameUz: selectedTrItem.nameUz,
        })"
    >
      <EditReportDynamicModal
          v-if="isHasDynamicRow || isGeneratedRow"
          :isGenerated="isGeneratedRow"
          :key="cmpKey+'modal_edit_key'"
          ref="editReportDynamicModalRef"
          @closedReport="closedReport"
          @setReportGenerated="setReportGenerated"
          @save="save(null, $event)"
      />
      <EditReportModal v-else :key="cmpKey+'modal_edit_key2'" ref="editReportModalRef"/>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="cancelReport">
          {{ $t("actions.close") }}
        </b-button>
        <b-button v-if="computedIsGenerated" variant="primary" @click.prevent="autoGenerateReport">
          <b-overlay :opacity="0.1" :show="loaderAutoGenerate" rounded="sm">
            <div class="d-flex align-items-center justify-content-center">
              {{ $t("auto_generate_info") }}
            </div>
          </b-overlay>
        </b-button>
        <b-button variant="success" @click.prevent="save">
          <b-overlay :opacity="0.1" :show="loaderSave" rounded="sm">
            <div class="d-flex align-items-center justify-content-center">
              {{ $t("actions.save") }}
            </div>
          </b-overlay>
        </b-button>
      </template>
    </b-modal>
    <b-modal
        id="widthM"
        v-model="viewReportModal"
        scrollable
        size="xl"
        :title="`${getName({
        nameLt: selectedTrItem.nameLt,
        nameRu: selectedTrItem.nameRu,
        nameUz: selectedTrItem.nameUz,
      })}`"
    >
      <ViewReportDynamicModal v-if="isHasDynamicRow || isGeneratedRow" ref="viewReportDynamicModalRef"/>
      <ViewReportModal v-else ref="viewReportModalRef"/>

      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="viewReportModal = false">
          {{ $t("actions.close") }}
        </b-button>
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
      <Send ref="sendRef" :selectedTrItem="selectedTrItem"/>

      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="sendModal = false">
          {{ $t("actions.cancel") }}
        </b-button>
        <b-button variant="success" @click="sendAndSave" :disabled="loaderButton">
          <b-overlay :opacity="0.1" :show="loaderButton" rounded="sm">
            {{ $t("actions.send") }}
          </b-overlay>
        </b-button>
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
        <b-button variant="secondary" @click="showModal = false">
          {{ $t("actions.close") }}
        </b-button>
        <b-overlay :opacity="0.1" :show="loader" rounded="sm">
          <b-button variant="success" @click="okModal">
            {{ $t("actions.save") }}
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
          <b-button
              variant="success"
              @click="okShareModal"
          >
            {{ $t("actions.send") }}
          </b-button>
        </b-overlay>
      </template>
    </b-modal>
    <div>
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
                <div class="col-sm-8">
                  <div class="text-sm-right">
                    <b-button
                        v-if="indexTab == 0"
                        @click="toggleModal(true, 'create', {})"
                        type="button"
                        variant="primary"
                    >
                      <i class="mdi mdi-plus mr-1"></i>
                      {{ $t("createReport") }}
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
                        ref="tableRef"
                        :list="list"
                        :loading="loading"
                    >
                      <template v-slot:thead>
                        <tr class="tr-text-center">
                          <th class="text-center" style="width: 10px !important">
                            <span class="d-block">№</span>
                          </th>
                          <th style="min-width: 150px;">{{ $t("column.name") }}</th>
                          <th>{{ $t("submodules.reports.report_created_date") }}</th>
                          <th class="text-center" style="min-width: 350px;">{{ $t("nameShakl") }}</th>
                          <th class="text-center" style="width: 23%">
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
                            <b-pagination size="sm" class="m-0" :total-rows="total" :per-page="limit" v-model="page" />
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
                          <td class="text-muted" style="width: 35%" >
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
                            <b>{{ $t("madeByReport") }}</b>
                          </td>
                          <td class="pl-0">
                            <ul v-if="selectedTrItem.id" id="il" class="list-unstyled chat-list">
                              <li>
                                <div class="media d-flex align-items-center">
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
                                    <span class=" avatar-title rounded-circle bg-soft-primary text-white ">
                                      {{ selectedTrItem.employeeFirstName.charAt(0) }}
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
                            <div class="mt-4">
                              <b-button
                                  variant="success"
                                  @click="actionClick('send', selectedTrItem)"
                              >
                                <i class="fa fa-share"></i>
                                {{ $t("actions.send") }}
                              </b-button>
                              <b-button
                                  variant="light"
                                  class="ml-2"
                                  @click="actionClick('edit', selectedTrItem)"
                                  target="_blank"
                              >
                                <i class="fa fa-pencil-alt"></i>
                                {{ $t("actions.edit") }}
                              </b-button>
                              <b-button
                                  class="ml-2"
                                  variant="primary"
                                  @click="actionClick('view', selectedTrItem)"
                              >
                                <i class="fa fa-eye"></i>
                                {{ $t("actions.view") }}
                              </b-button>
                            </div>
                            <div>
                              <b-button
                                  @click="actionClick('delete', selectedTrItem)"
                                  class="mt-2"
                                  variant="danger"
                              >
                                <i class="bx bx-trash"></i>
                                {{ $t("actions.delete") }}
                              </b-button>
                            </div>
                          </td>
                        </tr>
                        </tbody>
                      </table>
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
