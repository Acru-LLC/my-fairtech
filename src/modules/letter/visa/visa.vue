<script>
// import Layout from "@/router/layouts/main";
// import PageHeader from "@/components/page-header";
import Service from "../letterService";
// import crudAndListsService from '@/shared/services/crud_and_list.service'
/**
 * Products-order component
 */
import { cnfDoc, showMsgSuccess } from "@/helper";
import SignKeys from "../SignKeys.vue";
// import Receivers from "./receivers.vue";
import Editor from "../create/froal.editor.vue";
import Modal from "../create/modal.vue";
import DXAApplicationAllInfo from "../monitor/DXA info/index";
import crudAndListsService from '@/shared/services/crud_and_list.service'
import LetterService from '../../letter/letterService'
import VerifyDocumentService from "../../letter/verifyDocument.service";
import letterService from "@/modules/letter/letterService";
import pdf from 'vue-pdf'

``
export default {
  components: {
    pdf,
    SignKeys,
    DXAApplicationAllInfo,
    // Receivers,
    Editor, Modal
  },
  watch: {
    page() {
      this.getList();
    },
    searchValue(v) {
      this.getList();
    },
  },
  data() {
    return {
      height: null,
      modalDoc1: false,
      fileEye: false,
      fileUrl: '',
      isSidebar: false,
      commissionTypeId: null,
      comment: null,
      giveVisaDate: null,
      commissionComment: '',
      commissionModalLoader: false,
      commissionTypes: [],
      commissionsModal: false,
      currentPage: 1,
      src: null,
      loadingById: false,
      numPages: undefined,
      reasonRejected: "",
      selectedTrItem: {},
      visaInfo: {},
      active: "",

      title: this.$t("received"),
      items: [
        {
          text: this.$t("menu"),
          href: "/",
        },
        {
          text: this.$t("received"),
          active: true,
        },
      ],
      list: [],
      searchValue: "",
      page: 1,
      limit: 20,
      loading: false,
      total: 1,
      isModal: false,
      currentItem: {},
      signatureModal: false,
      loaderButton: false,
      visaFileView: {
        modal: false,
        src: null,
      },
      isModalKeys: false,
      agreementCount: 0,
      signatureCount: 0,
      reviewCount: 0,
      loaderReceiver: false,
      infoData: {},
      rejectedLoader: false,
      isRejectedModal: false,
      viewModal: false,
      filesList: [],
      viewModalBeforeSigned: false,
      loaderPdf: false,
      ilovaUploadPath: null,
      viewIlovaModal: false,
      base64: null,
      editModal: false,
      loader: false,
      contextText: "",
    };
  },
  async created() {
    await this.getList();
  },
  computed: {
    params() {
      return {
        params: {
          itemsPerPage: this.limit,
          page: this.page - 1,
        },
        search: this.searchValue,
      };
    },
  },

  methods: {
    cancelEYE() {
      this.fileEye = false
      this.modalDoc1 = true
    },
    async okEYE() {
      this.fileEye = false
    },
    closeDoc() {
      this.fileEye = false
      this.modalDoc1 = true
    },
    async openEyeFile(item) {

      await VerifyDocumentService.verifyDocumentById(this.selectedTrItem.applicationId)
          .then(res => {
            this.commissionTypes = res.data
          })
          .catch(e => {
            console.log(e)
          })

      if (item.uploadPath) {
        this.$nextTick(() => {
          this.modalDoc1 = false
          this.fileEye = true
          this.fileUrl = item.uploadPath
        })
      }
    },
    async VISABtn() {

      if (Object.keys(this.selectedTrItem).length === 0) {
        this.$toast(this.$t('submodules.doc.selected_doc'), { type: 'warning' });
      } else {
        await crudAndListsService.getList('employee/get-all-employee/in-monopoly-department', this.var_default_search_payload, null, true)
            .then(res => {
              this.commissionTypes = res.data
            })
            .catch(e => {
              console.log(e)
            })
        this.commissionsModal = true;
      }

    },
    showVisaFileView(applicationId) {
      this.loadingById = true;
      letterService.dxaVisaDataGetFile(applicationId).then(({ data }) => {
        this.visaFileView.src = 'data:application/pdf;base64,' + data;
        this.visaFileView.modal = true;
      }).finally(() => {
        this.loadingById = false;
      })
    },
    async visa_btn() {
      if (this.commissionTypeId && this.giveVisaDate) {
        this.commissionModalLoader = true
        LetterService.SignatureGiveVisaForDXA({
          applicationId: this.selectedTrItem.applicationId,
          employeeId: this.commissionTypeId,
          letterId: this.selectedTrItem.id
        }, {
          comment: this.comment,
          giveVisaDate: this.giveVisaDate
        })
            .then((res) => {
              this.$toast(this.$t('succes.title'), { type: 'success' });
              this.commissionTypeId = null
              this.commissionComment = ''
              this.comment = ''
              this.giveVisaDate = null

              this.commissionsModal = false
            })
            .catch((err) => {
              this.isCommit = false
              console.log(err);
            })
            .finally(async () => {
              this.commissionModalLoader = false
              await this.getList();
              await this.getVisaInfo();
              this.selectedTrItem = {}
            });
      }
    },
    getVisaInfo() {
      if (this.selectedTrItem.status !== "CREATED" && this.selectedTrItem.status !== "SEND_FOR_TAKE_VISA") {
        Service.getVisaInfo(this.selectedTrItem.applicationId)
            .then(({ data }) => {
              this.visaInfo = data
            })
            .catch((err) => {
              // this.catchErr(err);
            })
            .finally(() => {
            });
      }
    },
    async DXAInfoBtn() {
      this.isSidebar = true
      await this.$refs.isSidebar_ref.getApplicationInfoById()
      await this.$refs.isSidebar_ref.getVisaInfoById()
    },
    async closeSidebar() {
      this.isSidebar = false
    },
    openSignatureModalForCommission() {
      if (this.commissionTypeId) {
        this.signatureModal = true
      } else {
        this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
      }
    },
    customLabelCommissionTypes(opt) {
      let selected = this.commissionTypes.find(e => e.id == opt);
      if (selected) {
        return `${selected.fullName} -
        ${this.getName({
          nameRu: selected.directoryPositionNameRu,
          nameLt: selected.directoryPositionNameLt,
          nameUz: selected.directoryPositionNameUz,
        })
        } `
      }
      return ``;
    },
    changeText(text) {
      this.contextText = text;
    },
    okModal() {
      let text = this.$refs.editorRef.text;
      this.$refs.editModalRef.loading(true);
      Service.saveLetterBody(this.selectedTrItem.letterId, text)
          .then(() => {
            let tempData = Object.assign({}, this.selectedTrItem);
            this.successEdited();
            this.getList(true, tempData.id);
            this.editModal = false;
            /* setTimeout(() => {
              let newdata = this.list.find((e) => e.id == tempData.id);
              this.selectedTrItem = newdata;
              this.$forceUpdate();
              this.getReceivers(this.selectedTrItem);
            }, 500); */
          })
          .catch((e) => {
          })
          .finally(() => {
            this.$refs.editModalRef.loading(false);
          });
    },
    viewModalClick() {
      this.$refs.editModalRef.loadingPdf(true);
      this.viewModalBeforeSigned = true;
      this.loaderPdf = true;
      this.base64 = null;

      Service.convert(this.contextText)
          .then((res) => {
            setTimeout(() => {
              this.base64 = res.data;
            }, 400);
          })
          .finally(() => {
            this.loaderPdf = false;
            this.$refs.editModalRef.loadingPdf(false);
          });
    },
    editLetter(item) {
      /* this.editModal = true;
      setTimeout(() => {
        Service.getBody(item.letterId).then((res) => {
          let editor = this.$refs.editorRef;
          if (editor) {
            if (!this._empty(res.data)) {
              editor.setTextContent(res.data);
            }
          }
        });
      }, 400); */

    },
    viewProject(selectedLetter) {
      /* this.$router.push({
          name: selectedLetter.projectType === 'COMMISSION' ? 'CommissionProjects' : 'ProjectsMain',
          query: { page: "overview", id: selectedLetter.projectId },
      }); */
      let routeData = this.$router.resolve({
        name: selectedLetter.projectType === 'COMMISSION' ? 'CommissionProjects' : 'ProjectsMain',
        query: { page: "overview", id: selectedLetter.projectId },
      });
      window.open(routeData.href, '_blank');
    },
    viewIlova(item) {
      if (this.getExt(item.uploadPath ? item.uploadPath : item.url) === "pdf") {
        this.ilovaUploadPath = item.uploadPath ? item.uploadPath : item.url;
        this.viewIlovaModal = true;
      } else {
        this.convertToPdf(item).then((uploadPath) => {
          if (uploadPath) {
            this.ilovaUploadPath = uploadPath;
            this.viewIlovaModal = true;
          }
        });
      }
    },

    convertToPdf(selectedItem, forSign = false) {
      return new Promise((res, rej) => {
        let config = {
          url: `${selectedItem.url}`,
          outputtype: ".pdf",
          forSign: forSign,
          key: selectedItem.key,
        };
        Service.convertToPdfByApi(config)
            .then((rs) => {
              if (rs.data.uploadPath) {
                this.$nextTick(() => {
                  this.src = `${this.baseUrl}/${rs.data.uploadPath}`;
                });
                res(rs.data.uploadPath);
              } else {
                res(false);
              }
            })
            .catch((e) => {
              // this.catchErr(e);
              rej(e);
            });
      });
    },
    getByIdLetter() {
      Service.getByIdLetter(this.selectedTrItem.letterId)
          .then((rs) => {
            this.currentDoc = rs.data;
            this.loaderPdf = true;
            this.convertToPdf(rs.data).then((uploadPath) => {
              if (!uploadPath) {
                setTimeout(() => {
                  this.convertToPdf(rs.data)
                      .then(() => {
                        this.loaderPdf = false;
                      })
                      .catch((e) => {
                        this.loaderPdf = false;
                      });
                }, 4000);
              } else {
                this.loaderPdf = false;
              }
            });
          })
          .catch((e) => {
          });
    },
    viewLetter() {
      this.viewModalBeforeSigned = true;
      this.loaderPdf = true;
      this.base64 = null;
      Service.viewPdfByLetterId(this.selectedTrItem.letterId)
          .then((res) => {
            setTimeout(() => {
              this.base64 = res.data;
            }, 300);
          })
          .finally(() => {
            this.loaderPdf = false;
          });
    },
    viewDocBeforeSigned() {
      // this.viewModalBeforeSigned = true;
      // this.getByIdLetter();
      this.viewLetter();
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    getAttachedFilesById(id) {
      Service.getAttachedFilesById(id).then((res) => {
        this.filesList = res.data;
      });
    },
    saveRejected(payload) {
      this.convertToPdf(this.selectedTrItem).then(r1 => {
        this.rejectedLoader = true;
        Service.saveRejected(
            this.selectedTrItem.letterId,
            this.selectedTrItem.id,
            this.reasonRejected,
            payload
        )
            .then(async () => {
              this.isRejectedModal = false;
              let tempData = Object.assign({}, this.selectedTrItem);
              await this.successSaved();
              await this.getList(true, tempData.id);
              /* setTimeout(() => {
                let newdata = this.list.find((e) => e.id == tempData.id);
                this.selectedTrItem = newdata;
                this.$forceUpdate();
                this.getReceivers(this.selectedTrItem);
              }, 500); */
            })
            .finally(() => {
              this.rejectedLoader = false;
            });
      })
    },
    showRejectedModal() {
      this.isRejectedModal = true;
    },
    viewDocSigned() {
      this.viewModal = true;
    },

    async signSuccess(data) {
      let payload = {
        signedContent: data.content,
        inn: data.inn,
        pnfl: data.pnfl
      };
      if (this.isRejectedModal) {
        this.isModalKeys = false;
        this.signatureModal = false;
        this.saveRejected(payload)
      } else {
        if (this.selectedTrItem.status === 'COMMISSION_SEND') {
          Service.onlyDocSign(payload, this.selectedTrItem.id)
              .then(async () => {
                this.isModalKeys = false;
                this.signatureModal = false;
                let tempData = Object.assign({}, this.selectedTrItem);
                await showMsgSuccess(this.$t("successDocSigned"));
                await this.getList(true, tempData.id);
                // setTimeout(() => {
                //   let newdata = this.list.find((e) => e.id == tempData.id);
                //   this.selectedTrItem = Object.assign({}, newdata);
                //   this.$forceUpdate();
                //   this.getReceivers(this.selectedTrItem);
                // }, 1000);
              })
              .catch((err) => {
                // this.catchErr(err);
              });
        } else if (this.selectedTrItem.status === 'NOT_BELONG') {
          await Service.onlyDocSign(payload, this.selectedTrItem.id)
              .then(async () => {
                // await Service.onlyDocSignNotBelong(payload, this.selectedTrItem.id)
                //     .then(async () => {
                //
                //
                //     })
                //     .catch((err) => {
                //       this.catchErr(err);
                //     });

                this.isModalKeys = false;
                this.signatureModal = false;
                let tempData = Object.assign({}, this.selectedTrItem);
                await showMsgSuccess(this.$t("successDocSigned"));
                await this.getList(true, tempData.id);

                // setTimeout(() => {
                //   let newdata = this.list.find((e) => e.id == tempData.id);
                //   this.selectedTrItem = Object.assign({}, newdata);
                //   this.$forceUpdate();
                //   this.getReceivers(this.selectedTrItem);
                // }, 1000);
              })
              .catch((err) => {
                // this.catchErr(err);
              });
        } else {
          Service.signDoc(payload, this.selectedTrItem.id, this.commissionTypeId, this.commissionComment)
              .then(async () => {
                this.isModalKeys = false;
                this.signatureModal = false;
                this.commissionsModal = false;
                let tempData = Object.assign({}, this.selectedTrItem);
                await showMsgSuccess(this.$t("successDocSigned"));
                await this.getList(true, tempData.id);
                /* setTimeout(() => {
                  let newdata = this.list.find((e) => e.id == tempData.id);
                  this.selectedTrItem = Object.assign({}, newdata);
                  this.$forceUpdate();
                  this.getReceivers(this.selectedTrItem);
                }, 1000); */
              })
              .catch((err) => {
                // this.catchErr(err);
              });
        }
      }
    },
    getReceivers(item) {
      this.loaderReceiver = true;
      Service.getReceivers(item.letterId)
          .then((rs) => {
            this.infoData = rs.data;
          })
          .finally(() => {
            this.loaderReceiver = false;
          });
    },
    async clickTrItem(item) {
      this.loadingById = true;

      if (this.selectedTrItem.id == item.id) {
        this.selectedTrItem = {};
        this.infoData = {};
      } else {
        this.selectedTrItem = item;
        await this.getVisaInfo()
        // this.getAttachedFilesById(item.letterId);
        // this.getReceivers(item);
      }
      this.loadingById = false;
    },
    signatureItem() {
      this.isModalKeys = true;
    },
    makeAgree(item) {
      this.cnf().then((rs) => {
        if (rs.value) {
          Service.makeAgree(item.letterId).then(async () => {
            let tempData = Object.assign({}, this.selectedTrItem);
            await this.successSaved();
            await this.getList(true, tempData.id);
            // setTimeout(() => {
            //   let newdata = this.list.find((e) => e.id == tempData.id);
            //   this.selectedTrItem = Object.assign({}, newdata);
            //   this.$forceUpdate();
            //   this.getReceivers(this.selectedTrItem);
            // }, 500);
          });
        }
      });
    },

    makeReviewForCommission(item) {
      this.cnf().then((rs) => {
        if (rs.value) {
          Service.makeReviewForCommission(item.id, item.comment).then(async () => {
            let tempData = Object.assign({}, this.selectedTrItem);
            await this.successSaved();
            await this.getList(true, tempData.id);
            /* setTimeout(() => {
              let newdata = this.list.find((e) => e.id == tempData.id);
              this.selectedTrItem = newdata;
              this.$forceUpdate();
              this.getReceivers(this.selectedTrItem);
            }, 500); */
          });
        }
      });
    },
    makeReview(item) {
      this.cnf().then((rs) => {
        if (rs.value) {
          Service.makeReview(item.letterId).then(async () => {
            // let tempData = this.selectedTrItem;
            let tempData = Object.assign({}, this.selectedTrItem);
            await this.successSaved();
            await this.getList(true, tempData.id);
            /* setTimeout(() => {
              let newdata = this.list.find((e) => e.id == tempData.id);
              this.selectedTrItem = newdata;
              this.$forceUpdate();
              this.getReceivers(this.selectedTrItem);
            }, 500); */
          });
        }
      });
    },
    rejectConfirm() {
      cnfDoc(this.$t("messages.reject_title")).then((rs) => {
        if (rs.value) {
          this.signatureModal = true;
        }
      });
    },
    signItem(item) {
      if (item.action === "SIGNATURE") {
        /* if (item.status === 'COMMISSION_SEND') {
            this.signatureModal = true;
        } else { */
        this.currentItem = item;
        // this.signatureModal = true;

        if (item.status === "SEND_SIGN" || item.status === "SEND" || item.status === 'COMMISSION_SEND') {

          // GET COMMISSION_TYPES
          /* crudAndListsService.searchList('directory/commission/commission-type', this.var_default_search_payload, null, true)
              .then(res => {
                  this.commissionTypes = res.data.list
              })
              .catch(e => {
                  console.log(e)
              })
          this.commissionsModal = true; */

          // this.signatureModal = true;
          this.$router.push(
              `/letter/income/${item.letterId}/${item.id}`
          );
        } else {
          cnfDoc(this.$t("docConfirm")).then((rs) => {
            if (rs.value) {
              this.signatureModal = true;
            }
          });
        }
        // }
      } else if (item.action === "AGREEMENT") {
        this.makeAgree(item);
      } else if (item.action === "REVIEW") {
        if (item.status === 'SEND_FOR_COMMISSION') {
          this.makeReviewForCommission(item);
        } else {
          this.makeReview(item);
        }
      }
    },
    save() {
      if (!this.$refs.addRef.checkValidity()) {
        Service.upload(this.$refs.addRef.form).then((rs) => {
          if (rs.data) {
            this.getList();
            let routeData = this.$router.resolve({
              name: "Office-DOCUMENT-commission",
              query: { page: "GET", id: rs.data.id },
            });
            window.open(routeData.href, "_blank");
            this.isModal = false;
          }
        });
      } else {
        this.enterInfo();
      }
    },
    add() {
      this.isModal = true;
    },
    getList(reset = false, resetId) {
      this.loading = true;
      Service.getListLetterVisa(this.params, this.active)
          .then(({ data }) => {
            this.list = data.list;
            this.total = data.total;
            if (reset) {
              let newdata = this.list.find((e) => e.id == resetId);
              this.selectedTrItem = Object.assign({}, newdata);
              // this.$forceUpdate();
              this.getReceivers(this.selectedTrItem);
            }
          })
          .catch((err) => {
            // this.catchErr(err);
          })
          .finally(() => {
            this.loading = false;
          });
    },
  }
  ,
}
;
</script>

<template>
  <!-- <Layout> -->
  <div>
    <div class="col-md-12 text-center">
      <div class="h4 mb-4 d-inline-block">{{ $t('submodules.dxa.visa') }}</div>
    </div>
    <Modal
        :scroll="true"
        :variantOk="'success'"
        :value="editModal"
        @okModal="okModal"
        @closeModal="editModal = false"
        :title="selectedTrItem.fileName"
        :cancelText="'actions.cancel'"
        @viewModalClick="viewModalClick"
        :okText="'actions.save'"
        :signerHide="false"
        ref="editModalRef"
        :size="'xl'"
    >
      <template v-slot:body>
        <div>
          <Editor
              ref="editorRef"
              @changeText="changeText"
          />
        </div>
      </template>
    </Modal>

    <!-- <PageHeader :title="title" :items="items" /> -->
    <!-- for view ilova -->
    <b-modal
        scrollable
        v-model="viewIlovaModal"
        size="xl"
        :title="$t('actions.view')"
    >
      <div
          style="height: 700px"
          v-if="ilovaUploadPath"
      >
        <embed
            width="100%"
            height="800"
            :src="`${baseUrl}/${ilovaUploadPath}`"
            type="application/pdf"
        />
      </div>
      <template v-slot:modal-footer>
        <b-button
            variant="secondary"
            @click="viewIlovaModal = false"
        >{{
            $t("actions.close")
          }}
        </b-button>
      </template>
    </b-modal>
    <!-- sign keys modal -->
    <b-modal
        scrollable
        v-model="signatureModal"
        hide-footer
        size="lg"
        :title="`${$t('submodules.reports.make_sign')}`"
    >
      <SignKeys
          @sign="signSuccess"
          :dataToSign="selectedTrItem"
      />
    </b-modal>

    <!-- for view document -->
    <b-modal
        scrollable
        v-model="viewModal"
        size="xl"
        :title="selectedTrItem.id ? selectedTrItem.fileName : ''"
    >
      <div
          style="height: 700px"
          v-if="selectedTrItem.url"
      >
        <embed
            width="100%"
            height="800"
            :src="`${baseUrl}/${selectedTrItem.url}`"
            type="application/pdf"
        />
      </div>
      <template v-slot:modal-footer>
        <b-button
            variant="secondary"
            @click="viewModal = false"
        >{{
            $t("actions.close")
          }}
        </b-button>
      </template>
    </b-modal>

    <!-- modal view before modal -->
    <b-modal
        scrollable
        v-model="viewModalBeforeSigned"
        size="xl"
        body-bg-variant="light"
        :title="selectedTrItem.id ? selectedTrItem.fileName : ''"
    >
      <b-overlay
          variant="white"
          :opacity="1"
          :show="loaderPdf"
          rounded="lg"
      >
        <div style="min-height: 700px">
          <embed
              style="width: 100%;"
              :style="`min-height:${heightWindow-250}px`"
              v-if="base64"
              :src="`data:application/pdf;base64, ${base64}`"
          />
        </div>
      </b-overlay>

      <template v-slot:modal-footer>
        <b-button
            variant="secondary"
            @click="viewModalBeforeSigned = false"
        >{{ $t("actions.close") }}
        </b-button>
      </template>
    </b-modal>
    <!-- rejected modal -->
    <b-modal
        scrollable
        v-model="isRejectedModal"
        size="md"
        :title="`${$t('submodules.reports.reasonRejected')}`"
    >
      <b-form-textarea
          v-model="reasonRejected"
          rows="5"
      ></b-form-textarea>

      <template v-slot:modal-footer>
        <b-button
            variant="danger"
            @click="rejectConfirm"
        >
          <b-overlay
              :opacity="0.1"
              :show="rejectedLoader"
              rounded="sm"
          >
            {{ $t("submodules.reports.rejected") }}
          </b-overlay>
        </b-button>
      </template>
    </b-modal>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body p-2">
            <div class="row">
              <div class="col-sm-4">
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
              <div class="col-sm-8">
                <div class="text-sm-right">
                  <div class="mr-3 float-right">
                    <div class="d-flex align-items-center">
                    </div>
                  </div>
                  <!-- <b-button
    @click.prevent="add"
    type="button"
    variant="primary"
  >
    <i class="mdi mdi-plus mr-1"></i>
    {{ $t("actions.createNewDoc") }}
  </b-button> -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-7">
            <div class="card card-body">
              <div class="table-responsive">
                <b-overlay :opacity="0.1" :show="loading" rounded="sm">
                  <table class=" table table-centered table-striped table-nowrap table-hover bordered ">
                    <thead class="thead-light">
                    <tr>
                      <th
                          scope="col"
                          class="text-center"
                          style="width: 10%"
                      > №
                      </th>
                      <th
                          scope="col"
                      >
                        <span class="ml-5"> {{ $t("column.status") }}</span>
                      </th>
                      <th class="text-center" scope="col">
                        {{ $t("submodules.dxa.dxa_application_number") }}
                      </th>

                      <th
                          class="text-center"
                          scope="col"
                      >
                        {{ $t("submodules.doc.senderFIO") }}
                      </th>
                      <!--                      <th-->
                      <!--                          class="text-center"-->
                      <!--                          scope="col"-->
                      <!--                      >-->
                      <!--                        {{ $t("submodules.doc.sender") }}-->
                      <!--                      </th>-->
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center" v-if="list.length == 0"
                    >
                      <td
                          colspan="9"
                          :style="loading ? 'height:50px' : ''"
                          style="vertical-align: middle"
                      >
                        <h5>
                          {{ $t("messages.data_not_found") }}
                        </h5>
                      </td>
                    </tr>
                    <tr
                        @click.prevent="clickTrItem(item)"
                        v-for="(item, index) in list"
                        :key="index + 'CREATE_DOC'"
                        class="p_cursor"
                        :class=" selectedTrItem.id == item.id ? 'bg-color bg-soft-primary text-primary' : '' "
                    >

                      <td class="text-center">
                        {{
                          util_paginate(index, var_default_search_payload.page, var_default_search_payload.itemsPerPage)
                        }}
                      </td>
                      <td class="text-center">
                        <b-badge
                            variant="secondary"
                            class="p-1"
                            v-if="item.status === 'CREATED' || item.applicationStatus === 'RECEIVED'"
                        >
                          {{ $t('submodules.commission.doc_status.doc_created') }}
                        </b-badge>
                        <b-badge
                            variant="warning"
                            class="p-1"
                            v-else-if="item.status === 'BEING_SEEN'"
                        >
                          {{ $t('submodules.commission.doc_status.doc_seen') }}
                        </b-badge>
                        <b-badge
                            variant="info"
                            class="p-1"
                            v-else-if="item.status === 'SEEN'"
                        >
                          {{ $t('submodules.commission.doc_status.seen') }}
                        </b-badge>
                        <b-badge
                            variant="primary"
                            class="p-1"
                            v-else-if="item.status === 'SENT'"
                        >
                          {{ $t('submodules.reports.report_sended') }}
                        </b-badge>
                        <b-badge
                            variant="danger"
                            class="p-1"
                            v-else-if="item.status === 'CANCELLED'"
                        >
                          {{ $t('docs_r.CANCELED') }}
                        </b-badge>
                        <b-badge
                            variant="info"
                            class="p-1"
                            v-else-if="item.status === 'SEND_FOR_COMMISSION'"
                        >
                          {{ $t('submodules.commission.doc_status.send_for_commission') }}
                        </b-badge>
                        <b-badge
                            variant="warning"
                            class="p-1"
                            v-else-if="item.status === 'COMMISSION_BEING_SEEN'"
                        >
                          {{ $t('submodules.commission.doc_status.commission_being_seen') }}
                        </b-badge>
                        <b-badge
                            variant="info"
                            class="p-1"
                            v-else-if="item.status === 'COMMISSION_SEEN'"
                        >
                          {{ $t('submodules.commission.doc_status.commission_seen') }}
                        </b-badge>
                        <b-badge
                            variant="primary"
                            class="p-1"
                            v-else-if="item.status === 'COMMISSION_SENT'"
                        >
                          {{ $t('submodules.commission.doc_status.commission_sent') }}
                        </b-badge>
                        <b-badge
                            variant="success"
                            class="p-1"
                            v-else-if="item.status === 'COMMISSION_SIGNED'"
                        >
                          {{ $t('submodules.commission.doc_status.commission_signed') }}
                        </b-badge>
                        <b-badge
                            variant="danger"
                            class="p-1"
                            v-else-if="item.status === 'COMMISSION_CANCELLED'"
                        >
                          {{ $t('submodules.commission.doc_status.commission_canceled') }}
                        </b-badge>
                        <b-badge
                            variant="warning"
                            class="p-1"
                            v-else-if="item.status === 'SEND_FOR_TAKE_VISA'"
                        >
                          {{ $t('submodules.dxa.send_for_visa') }}
                        </b-badge>
                        <b-badge
                            variant="success"
                            class="p-1"
                            v-else-if="item.status === 'VISA_APPROVED'"
                        >
                          {{ $t('submodules.dxa.VISA_APPROVED') }}
                        </b-badge>

                      </td>
                      <td class="text-center">
                        {{ item.applicationRegNumber }}
                      </td>
                      <td class="text-center">
                        {{ item.ownerLastName }} {{ item.ownerFirstName }} {{ item.ownerParentName }}
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </b-overlay>
              </div>
              <div class="row" v-if="total > 0">
                <div class="col-lg-12">
                  <b-pagination size="sm" class="m-0" :total-rows="total" :per-page="limit" v-model="page" />
                </div>
              </div>
            </div>
          </div>

          <div class="col-5">
            <div class="card card-body">
              <!-- FROM_DXA -->
              <b-overlay :opacity="0.1" :show="loadingById" rounded="sm">
                <table v-if="selectedTrItem" class="table m-0">
                  <tr>
                    <td class="text-left">
                      <b> {{ $t('column.business_entity') }}</b> <br>
                    </td>
                    <td class="text-right">
                      <span style="font-size: 12px" class="text-right" >
                        {{ selectedTrItem.contractorNameFromDXA }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <b> {{ $t('column.inn') }}</b> <br>
                    </td>
                    <td class="text-right">
                      <span style="font-size: 12px" class="text-right" >
                        {{ selectedTrItem.companyTinFromDXA }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      <b> {{ $t('submodules.doc.create_entered_date_legal') }}</b> <br>
                    </td>
                    <td class="text-right">
                      <span style="font-size: 12px" class="text-right">
                          {{ selectedTrItem.created }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="selectedTrItem.ownerFirstName">
                    <td class="text-left">
                      <b> {{ $t('whoSent') }}</b> <br>
                    </td>
                    <td class="text-right">
                      <span style="font-size: 12px" class="text-right">
                        {{ selectedTrItem.ownerFirstName }}
                        {{ selectedTrItem.ownerLastName }}
                        {{ selectedTrItem.ownerParentName }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="selectedTrItem.positionNameUz">
                    <td class="text-left">
                      <b> {{ $t('column.position') }}</b> <br>
                    </td>
                    <td class="text-right">
                      <span style="font-size: 12px" class="text-right">
                        {{
                          getName({
                            nameUz: selectedTrItem.positionNameUz,
                            nameRu: selectedTrItem.positionNameRu,
                            nameLt: selectedTrItem.positionNameLt,
                          })
                        }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="selectedTrItem.visaReason">
                    <td class="text-left">
                      <b> {{ $t('column.comment') }}</b> <br>
                    </td>
                    <td class="text-right">
                      <span style="font-size: 12px" class="text-right">
                          {{ selectedTrItem.visaReason }}
                      </span>
                    </td>
                  </tr>
                </table>
              </b-overlay>
              <div class="mt-4 text-center">
                <b-button
                    v-show="selectedTrItem.status === 'SEND_FOR_TAKE_VISA'"
                    variant="primary"
                    class="card-tabs-button"
                    @click="VISABtn"
                >
                  <img :src="require('@/assets/doc/img.png')" alt="DOC" height="20"/>
                  <!--                  <i class="fa fa-credit-card"></i>-->
                  {{ $t('submodules.reports.make_sign') }}
                </b-button>
                <b-button
                    v-if="!(Object.keys(selectedTrItem).length === 0)"
                    variant="warning"
                    class="ml-2  card-tabs-button"
                    @click="DXAInfoBtn"
                >
                  <i class="fa fa-eye"></i>
                  {{ $t('submodules.dxa.view_dxa') }}
                </b-button>
              </div>

              <!-- VISA -->
              <div class="card"
                   v-show="Object.keys(selectedTrItem).length !== 0 && selectedTrItem.visaIsGiven"
              >
                <div class="card-header bg-white d-flex align-items-center">
                  <div class="font-size-16 flex-grow-1">
                    <img :src="require('@/assets/doc/1.png')" alt="DOC" height="45"/>
                    <strong class="ml-3">{{ $t("submodules.dxa.VISA_APPROVED") }}</strong>
                  </div>
                  <div class="btn btn-info" @click="showVisaFileView(selectedTrItem.applicationId)">
                    {{ $t('actions.view_visa_document') }}
                  </div>
                </div>
                <div class="pl-4">
                  <div class="table-responsive">
                    <table class="table table-centered m-0">
                      <tbody>
                      <tr>
                        <td style="width: 50px">
                          <div class="avatar-sm">
                            <span class="avatar-title rounded-circle bg-soft-primary font-size-20 text-white font-weight-bold">
                              {{ selectedTrItem.visaFromWhoName ? selectedTrItem.visaFromWhoName.charAt(0) : '' }}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex align-items-center">
                            <div>
                              <h5 class="font-size-14 m-0 font-weight-bold">
                                <p class="text-dark m-0">
                                  {{ $t("submodules.dxa.visa_issuer") }}
                                </p>
                              </h5>
                              <h5 class="font-size-14 m-0">
                                <p class="text-dark m-0">
                                  {{ selectedTrItem.visaFromWhoName || '' }}
                                </p>
                              </h5>
                              <p class="m-0 text-muted">
                                {{
                                  getName({
                                    nameLt: selectedTrItem.visaFromWhoYurDepartmentNameLtLt,
                                    nameRu: selectedTrItem.visaFromWhoYurDepartmentNameLtRu,
                                    nameUz: selectedTrItem.visaFromWhoYurDepartmentNameLtUz,
                                  })
                                }}
                              </p>
                              <p class="m-0 text-muted">
                                {{
                                  getName({
                                    nameUz: selectedTrItem.visaFromWhoDepartmentNameUz,
                                    nameLt: selectedTrItem.visaFromWhoDepartmentNameLt,
                                    nameRu: selectedTrItem.visaFromWhoDepartmentNameRu,
                                  })
                                }}
                              </p>
                              <p class="m-0 text-muted">
                                {{
                                  getName({
                                    nameLt: selectedTrItem.visaFromWhoPositionNameLt,
                                    nameRu: selectedTrItem.visaFromWhoPositionNameRu,
                                    nameUz: selectedTrItem.visaFromWhoPositionNameUz,
                                  })
                                }}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="width: 50px">
                          <div class="avatar-sm">
                            <span class="avatar-title rounded-circle bg-soft-primary font-size-20 text-white font-weight-bold">
                            {{ selectedTrItem.visaToWhoName ? selectedTrItem.visaToWhoName.charAt(0) : '' }}
                            </span>
                          </div>
                        </td>
                        <td>
                          <div class="d-flex align-items-center">
                            <div>
                              <h5 class="font-size-14 m-0 font-weight-bold">
                                <p class="text-dark m-0">
                                  {{ $t("submodules.dxa.performer") }}
                                </p>
                              </h5>
                              <h5 class="font-size-14 m-0">
                                <p class="text-dark m-0">
                                  {{ selectedTrItem.visaToWhoName || '' }}
                                </p>
                              </h5>
                              <p class="m-0 text-muted">
                                {{
                                  getName({
                                    nameLt: selectedTrItem.visaToWhoYurDepartmentNameLt,
                                    nameRu: selectedTrItem.visaToWhoYurDepartmentNameRu,
                                    nameUz: selectedTrItem.visaToWhoYurDepartmentNameUz,
                                  })
                                }}
                              </p>
                              <p class="m-0 text-muted">
                                {{
                                  getName({
                                    nameUz: selectedTrItem.visaToWhoDepartmentNameUz,
                                    nameLt: selectedTrItem.visaToWhoDepartmentNameLt,
                                    nameRu: selectedTrItem.visaToWhoDepartmentNameUz,
                                  })
                                }}
                              </p>
                              <p class="m-0 text-muted">
                                {{
                                  getName({
                                    nameLt: selectedTrItem.visaToWhoPositionNameLt,
                                    nameRu: selectedTrItem.visaToWhoPositionNameRu,
                                    nameUz: selectedTrItem.visaToWhoPositionNameUz,
                                  })
                                }}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2">
                          {{ selectedTrItem.visaComment }}
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
    <b-sidebar
        width="85%"
        class="sidebar-part"
        shadow
        sidebar-class="p-0"
        right
        :no-header="true"
        v-model="isSidebar"
    >

      <DXAApplicationAllInfo
          ref="isSidebar_ref"
          @close="closeSidebar"
          :applicationId="selectedTrItem.applicationDXAId"
          :applicationStatus="selectedTrItem.applicationStatus"
      />

    </b-sidebar>

    <b-modal v-model="visaFileView.modal" :title="`${$t('actions.view_document')}`" scrollable size="lg">
      <pdf :src="visaFileView.src"></pdf>
      <template v-slot:modal-footer>
        <a :href="visaFileView.src" class="btn btn-info" :download="`${selectedTrItem.applicationRegNumber}-visa.pdf`"
           target="_blank">{{ $t('actions.download') }}</a>
      </template>
    </b-modal>

    <!-- COMMISSIONS MODAL -->
    <ValidationObserver v-slot="{ handleSubmit }">
      <b-modal
          scrollable
          v-model="commissionsModal"
          size="md"
          :title="`${$t('submodules.dxa.for_perform')}`"
      >
        <div>
          <BaseMultiselectWithValidation
              rules="required"
              class="required"
              v-model="commissionTypeId"
              :options="commissionTypes.map(e => e.id)"
              :label="$t('column.employee')"
              label-on-top
              placeholder=""
              :custom-label="customLabelCommissionTypes"
              open-direction="bottom"
              :max-height="600"
              :show-labels="false"
          />

        </div>
        <div class="mt-3">
          <b-form-textarea
              v-model="comment"
              :placeholder="$t('submodules.doc.summary')"
              rows="5"
          ></b-form-textarea>
        </div>
        <div class="mt-3">
          <BaseDatePickerWithValidation
              required
              disable-before
              format="DD-MM-YYYY"
              :disabled-date="true"
              :disabled-before="true"
              custom-styles="grid-template-columns: 0% 100%"
              v-model="giveVisaDate"
              :placeholder="$t('submodules.doc.completionTime')"
              lang="ru"
          />
        </div>
        <template v-slot:modal-footer>
          <b-button variant="success" @click="handleSubmit(visa_btn)">
            <b-overlay
                :opacity="0.1"
                :show="commissionModalLoader"
                rounded="sm"
            >
              {{ $t("actions.send") }}
            </b-overlay>
          </b-button>
        </template>
      </b-modal>
    </ValidationObserver>

    <b-sidebar
        id="sidebar-right"
        no-header
        v-model="fileEye"
        right
        backdrop
        shadow
    >
      <template #default>
        <div class="p-4">
          <b-row class="pl-4 pr-4">
            <b-col cols="2">
              <b-button
                  @click="closeDoc"
                  block
                  class="float-right ml-10"
                  size="sm"
                  variant="primary"
              >
                <i class="fa fa-times"></i>
                {{ $t("actions.close") }}
              </b-button>
            </b-col>
          </b-row>
        </div>
        <div class="px-8 py-2">
          <b-row :style="`min-height:${height}px`">
            <b-col>
              <div class="bg-white p-3">
                <embed
                    :height="height"
                    width="100%"
                    v-if="fileUrl"
                    :src="`${getBaseUrl}/${fileUrl}`"
                />
              </div>
            </b-col>
          </b-row>
        </div>
      </template>
    </b-sidebar>
  </div>
  <!-- </Layout> -->
</template>

<style>
.bg-class {
  background-color: #fbfbfb !important;
}
</style>