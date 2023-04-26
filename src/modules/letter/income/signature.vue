<template>
  <div>
    <div>
      <div id="myHeader" class="card card-body stickyHead">
        <div class="d-flex">
          <div style="width: 58%">
            <h5 v-if="numPages" class="float-right m-0">
              {{ currentPage }} / {{ numPages }}
            </h5>
          </div>
          <div style="width: 43%">
            <div class="float-right d-flex align-items-center">
              <b-button-group>
                <b-button class="float-right" variant="primary" @click="signData">
                  <b-overlay :opacity="0.1" :show="loaderQrCode" rounded="sm">
                    <i class="fa fa-qrcode mr-1"></i>
                    {{ $t("actions.qrcode") }}
                  </b-overlay>
                </b-button>
                <b-button class="float-right mr-2" variant="success" @click="save">
                  <i class="fa fa-save"></i>
                  {{ $t("actions.save") }}
                </b-button>
              </b-button-group>

              <b-button :to="{name: 'LetterIncome'}" class="float-right mr-2" variant="primary">
                <i class="fa fa-arrow-left"></i>
              </b-button>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <b-row>
          <!-- <b-col></b-col> -->
          <b-col cols="12">
            <div class="d-flex justify-content-center">
              <b-overlay :opacity="1" :show="loaderPdf" rounded="lg" variant="white">
                <div id="pdfId" style=" width: 270mm !important; min-height: 210mm; position: relative; ">
                  <VueDragResize
                      v-if="imgUrl && qrCodePage == currentPage"
                      :h="110"
                      :isActive="true"
                      :isResizable="false"
                      :parent="true"
                      :parentLimitation="true"
                      :w="110"
                      :x="x"
                      :y="y"
                      style="z-index: 3"
                      v-on:dragging="resize"
                      v-on:resizing="resize"
                  >
                    <img
                        :src="`${ imgUrl ? `data:image/png;base64, ${imgUrl}` : require('@/assets/img.png') }`"
                        @mouseenter="mouseEnter"
                        @mouseleave="mouseLeave"
                        @mousemove="mousemove"
                    />
                  </VueDragResize>
                  <pdf
                      v-if="src"
                      ref="myPdfComponent"
                      :page="currentPage"
                      :src="src"
                      @num-pages="numPages = $event"
                  />
                </div>
              </b-overlay>
            </div>
          </b-col>
          <!-- <b-col></b-col> -->
        </b-row>

        <b-row>
          <b-col cols="12">
            <div class="d-flex mt-4 justify-content-center">
              <div
                  class="d-flex mt-4"
                  style="overflow: auto; max-width: 90%"
              >
                <div
                    v-for="page in numPages"
                    :key="page + 'page'"
                    class="ml-3 mb-4"
                >
                  <div
                      :class="currentPage == page ? 'my-card-hovered-pdf-active' : ''"
                      class="my-card-hovered-pdf"
                      @click.prevent="setCurrentPage(page)"
                  >
                    <div style="width: 200px;!important;position:relative">
                      <div
                          v-if="imgUrl && qrCodePage == page"
                          :style="{
                          top: `${y / 5.1}px`,
                          left: `${x / 5.08}px`,
                        }"
                          style="position: absolute; z-index: 999"
                      >
                        <img
                            v-if="imgUrl"
                            :height="20"
                            :src="`${
                            imgUrl
                              ? `data:image/png;base64, ${imgUrl}`
                              : require('@/assets/img.png')
                          }`"
                            :width="20"
                        />
                      </div>

                      <pdf v-if="src" :page="page" :src="src"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>

    <!-- COMMISSIONS MODAL Maxsus komissiya turi -->
    <b-modal
        v-model="commissionsModal"
        :title="`${$t('submodules.commission.title')}`"
        scrollable
        size="md"
    >
      <p>
        <BaseMultiselectWithValidation
            v-model="commissionTypeId"
            :custom-label="customLabelCommissionTypes"
            :label="$t('submodules.commission.special_commission_type.title')"
            :max-height="600"
            :options="commissionTypes.map(e => e.id)"
            :show-labels="false"
            class="required"
            label-on-top
            open-direction="bottom"
            placeholder=""
            rules="required"
        />
      </p>

      <BaseMultiselectWithValidation
          v-if="this.currentDoc.status === 'SEND_SIGN'"
          v-model="commissionManagementId"
          :custom-label="customLabelCommissionManagementTypes"
          :label="$t('column.management')"
          :max-height="600"
          :options="commissionManagementList.map(e => e.id)"
          :show-labels="false"
          class="required"
          label-on-top
          open-direction="bottom"
          placeholder=""
          rules="required"
      />

      <b-form-textarea
          v-model="commissionComment"
          :placeholder="$t('submodules.doc.summary')"
          class="mt-3"
          rows="5"
      ></b-form-textarea>

      <template v-slot:modal-footer>
        <b-button
            variant="success"
            @click="openSignatureModalForCommission"
        >
          <b-overlay
              :opacity="0.1"
              :show="commissionModalLoader"
              rounded="sm"
          >
            {{ $t("actions.continue") }}
          </b-overlay>
        </b-button>
      </template>
    </b-modal>

    <!-- COMMISSIONS MODAL Komissiya rahbar listi -->
    <b-modal
        v-model="commissionManagementModal"
        :title="`${$t('submodules.commission.title')}`"
        scrollable
        size="md"
    >
      <BaseMultiselectWithValidation
          v-model="commissionManagementId"
          :custom-label="customLabelCommissionManagementTypes"
          :label="$t('column.director')"
          :max-height="600"
          :options="commissionManagementList.map(e => e.id)"
          :show-labels="false"
          class="required mt-3"
          label-on-top
          open-direction="bottom"
          placeholder=""
          rules="required"
      ></BaseMultiselectWithValidation>

      <b-form-textarea
          v-model="commissionManagementComment"
          :placeholder="$t('submodules.doc.summary')"
          class="mt-3"
          rows="5"
      ></b-form-textarea>

      <template v-slot:modal-footer>
        <b-button
            variant="success"
            @click="openSignatureModalForCommissionManagement"
        >
          <b-overlay
              :opacity="0.1"
              :show="commissionModalLoader"
              rounded="sm"
          >
            {{ $t("actions.continue") }}
          </b-overlay>
        </b-button>
      </template>
    </b-modal>

    <!-- COMMISSIONS MODAL FOR Comment-->
    <b-modal
        v-model="commissionsModalForComment"
        :title="`${$t('submodules.commission.sign_decision')}`"
        scrollable
        size="md"
    >
      <div>
        {{ $t('submodules.doc.summary') }}
      </div>
      <b-form-textarea
          v-model="commentForCommission"
          :placeholder="$t('submodules.doc.summary')"
          class="mt-3"
          rows="5"
      />

      <template v-slot:modal-footer>
        <b-button variant="success" @click="openSignatureModalForCommissionForComment">
          <b-overlay :opacity="0.1" :show="commissionModalLoader" rounded="sm">
            {{ $t("actions.continue") }}
          </b-overlay>
        </b-button>
      </template>
    </b-modal>
    <b-modal
        v-model="signatureModal"
        :title="`${$t('submodules.reports.make_sign')}`"
        hide-footer
        scrollable
        size="lg"
    >
      <b-overlay
          :opacity="0.1"
          :show="loaderSign"
          rounded="sm"
      >
        <SignKeys
            :dataToSign="currentDoc"
            @sign="signSuccess"
        />
      </b-overlay>
    </b-modal>

    <b-modal
        v-model="compromiseDecisionToAcceptRejectModal"
        :title="`${$t('submodules.reports.make_sign')}`"
        hide-footer
        scrollable
        size="lg"
    >
      <b-overlay
          :opacity="0.1"
          :show="loaderSign"
          rounded="sm"
      >
        <b-row>
          <b-col cols="6">
            <BaseMultiselectWithValidation
                v-if="computedMakeSignedCompromiseDecisionToReject"
                v-model="employee_id"
                :custom-label="customLabelEmployeeList"
                :label="$t('column.employee')"
                :max-height="600"
                :options="employee_list.map(e => e.id)"
                :show-labels="false"
                class="required"
                label-on-top
                open-direction="bottom"
                placeholder=""
                rules="required"
                @search-change="fetchEmployeeList"
            />
          </b-col>
          <b-col :cols="computedMakeSignedCompromiseDecisionToReject ? 6 : 12">
            {{$t('submodules.doc.summary')}}
            <b-form-textarea
                v-model="comment"
                :placeholder="$t('submodules.doc.summary')"
                rows="5"
            />
          </b-col>
        </b-row>
        <SignKeys
            v-show="computedMakeSignedCompromiseDecisionToAccept || employee_id"
            :dataToSign="currentDoc"
            @sign="signSuccess"
        />
      </b-overlay>
    </b-modal>
  </div>
</template>

<script>

import {cnfDoc, showMsgError, showMsgSuccess} from "@/helper";
import pdf from "vue-pdf";
import Service from "../letterService";
import crudAndListsService from '@/shared/services/crud_and_list.service'

import SignKeys from "../SignKeys.vue";
import VueDragResize from "vue-drag-resize";

export default {
  data() {
    return {
      commissionTypeId: null,
      commissionComment: '',
      commentForCommission: '',
      commissionModalLoader: false,
      commissionTypes: [],
      commissionsModal: false,
      commissionsModalForComment: false,
      commissionManagementId: false,
      commissionManagementList: [],
      commissionManagementComment: '',
      commissionManagementModal: false,
      currentPage: 1,
      pageCount: 0,
      src: null,
      imgUrl: null,
      width: 110,
      height: 110,
      x: 200,
      y: 300,
      numPages: undefined,
      pageYOffset: 0,
      loaderQrCode: false,
      qrCodePage: null,
      loaderPdf: false,
      currentDoc: {},
      signatureModal: false,
      compromiseDecisionToAcceptRejectModal: false,
      employee_id: null,
      comment: null,
      employee_list: [],
      deleteQrPosition: false,
      loaderSign: false,
    };
  },
  name: "Signature",
  components: {
    VueDragResize,
    SignKeys,
    pdf,
  },
  created() {
    this.getByIdLetter();
    document.addEventListener("keyup", this.keyUpEvents);
  },
  methods: {
    openSignatureModalForCommissionForComment() {
      this.signatureModal = true
    },
    openSignatureModalForCommission() {
      if (this.commissionTypeId) {
        this.signatureModal = true
      } else {
        this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
      }
    },
    openSignatureModalForCommissionManagement() {
      if (this.commissionManagementId) {
        this.signatureModal = true
      } else {
        this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
      }
    },
    customLabelCommissionTypes(opt) {
      let selected = this.commissionTypes.find(e => e.id == opt);
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
    },
    customLabelCommissionManagementTypes(opt) {
      let selected = this.commissionManagementList.find(e => e.id === opt);
      if (selected) {
        return selected.fullName
      }
      return ``;
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
    mouseEnter() {
      this.deleteQrPosition = true;
    },
    mouseLeave() {
      this.deleteQrPosition = false;
    },
    mousemove() {
      this.deleteQrPosition = true;
    },
    async signSuccess(data) {
      this.loaderSign = true;
      let payload = {
        signedContent: data.content,
        inn: data.inn,
        pnfl: data.pnfl
      };
      switch (this.currentDoc.status) {
        case 'SEND_SIGN':
          if (this.currentDoc.projectType === 'NOT_BELONG' && this.currentDoc.letterType === 'LETTER') {
            await Service.onlyDocSignFORNotBelong(payload, this.$route.params.id2,
                this.x,
                this.y,
                this.currentPage - 1)
                .then(async () => {
                  await this.$router.push("/letter/income");
                })
                .catch((err) => {
                  this.catchErr(err);
                })
                .finally(() => {
                  this.loaderSign = false;
                });
          } else if (this.currentDoc.projectType === 'FROM_DXA' && this.currentDoc.letterType === 'DECISION') {
            Service.signDecision(payload, this.$route.params.id2,
                this.x,
                this.y,
                this.currentPage - 1, this.commentForCommission)
                .then(async () => {
                  this.$router.push({name: 'LetterIncome'});
                  showMsgSuccess(this.$t("successDocSigned"));
                })
                .finally(() => {
                  this.loaderSign = false;
                });
          } else {
            Service.makeSignedNewWithHeadOfDepartment(payload, this.$route.params.id2,
                this.x,
                this.y,
                this.currentPage - 1, this.commissionTypeId, this.commissionComment, this.commissionManagementId)
                .then(async () => {
                  this.$router.push({name: 'LetterIncome'});
                  showMsgSuccess(this.$t("successDocSigned"));
                })
                .finally(() => {
                  this.loaderSign = false;
                });
          }
          break;
        default:
          if (this.computedMakeSignedCompromiseDecisionToAccept) {
            Service.makeSignedBeforeCommission(payload, this.$route.params.id2, this.comment, this.x, this.y, this.currentPage - 1).then(() => {
              this.employee_id = null;
              this.comment = null;
              this.$router.push({name: 'CommissionProjects'})
            })
          } else if (this.computedMakeSignedCompromiseDecisionToReject) {
            Service.onlyDocMakeSignedToReject(payload, this.$route.params.id2, this.employee_id, this.comment, this.x, this.y, this.currentPage - 1).then(() => {
              this.employee_id = null;
              this.comment = null;
              this.$router.push({name: 'LetterIncome'})
            })
          } else if (this.currentDoc.projectType === 'FROM_DXA' && this.currentDoc.passedToCommission) {
            await Service.onlyDocSign(payload, this.$route.params.id2,
                this.x,
                this.y,
                this.currentPage - 1)
                .then(async () => {
                  if (this.currentDoc.isRejected) {
                    await Service.resultApplicationForDXARejected({decision_text: this.commentForCommission}, this.$route.params.id)
                        .then(async () => {
                          this.$router.push({name: 'LetterIncome'});
                          showMsgSuccess(this.$t("successDocSigned"));

                        })
                        .catch((err) => {
                          this.catchErr(err);
                        });
                  } else {
                    await Service.resultApplicationForDXA({decision_text: this.commentForCommission}, this.$route.params.id)
                        .then(async () => {
                          this.$router.push({name: 'LetterIncome'});
                          showMsgSuccess(this.$t("successDocSigned"));

                        })
                        .catch((err) => {
                          this.catchErr(err);
                        });
                  }
                })
                .catch((err) => {
                })
                .finally(() => {
                  this.loaderSign = false;
                });
          } else if (this.currentDoc.projectType === 'NOT_BELONG' && this.currentDoc.letterType === 'LETTER') {
            await Service.onlyDocSignFORNotBelong(payload, this.$route.params.id2,
                this.x,
                this.y,
                this.currentPage - 1)
                // .then(async () => {
                //   await Service.onlyDocSignNotBelong(payload, this.$route.params.id)
                //       .then(async () => {
                //         this.$router.push({name: 'LetterIncome'});
                //         showMsgSuccess(this.$t("successDocSigned"));
                //
                //       })
                //       .catch((err) => {
                //         this.catchErr(err);
                //       });
                //
                // })
                .catch((err) => {
                  this.catchErr(err);
                })
                .finally(() => {
                  this.loaderSign = false;
                });
          } else {
            if (this.currentDoc.letterType === 'PROTOCOL') {
              Service.onlyDocSign(payload, this.$route.params.id2,
                  this.x,
                  this.y,
                  this.currentPage - 1)
                  .then(async () => {
                    // this.isModalKeys = false;
                    // this.signatureModal = false;
                    // let tempData = this.currentDoc;
                    // await showMsgSuccess(this.$t("successDocSigned"));
                    // await this.getList();
                    // await this.getIncomeTotalCount();
                    this.$router.push({name: 'LetterIncome'});
                    showMsgSuccess(this.$t("successDocSigned"));
                    // setTimeout(() => {
                    //     let newdata = this.list.find((e) => e.id == tempData.id);
                    //     this.currentDoc = Object.assign({}, newdata);
                    //     this.$forceUpdate();
                    //     this.getReceivers(this.currentDoc);
                    // }, 1000);
                  })
                  .catch((err) => {
                    // this.catchErr(err);
                  })
                  .finally(() => {
                    this.loaderSign = false;
                  });
            } else if (this.currentDoc.letterType === 'LETTER') {
              await Service.onlyDocSignFORNotBelong(payload, this.$route.params.id2,
                  this.x,
                  this.y,
                  this.currentPage - 1)
                  .then(async () => {
                    await Service.onlyDocSignNotBelong(payload, this.$route.params.id)
                        .then(async () => {
                          this.$router.push({name: 'LetterIncome'});
                          showMsgSuccess(this.$t("successDocSigned"));

                        })
                        .catch((err) => {
                          this.catchErr(err);
                        });

                  })
                  .catch((err) => {
                    // this.catchErr(err);
                  })
                  .finally(() => {
                    this.loaderSign = false;
                  });
            } else if (['LETTER_NOT_COMPLETED', 'LETTER_NOT_BELONG', 'LETTER_REGION'].indexOf(this.currentDoc.letterType) !== -1) {
              await Service.onlyDocSignForToReturn(payload, this.$route.params.id2,
                  this.x,
                  this.y,
                  this.currentPage - 1)
                  .then(async () => {
                    this.$router.push({name: 'LetterIncome'});
                    showMsgSuccess(this.$t("successDocSigned"));
                  })
                  .catch((err) => {
                    // this.catchErr(err);
                  })
                  .finally(() => {
                    this.loaderSign = false;
                  });
            } else {
              Service.signDoc(payload, this.$route.params.id2,
                  this.x,
                  this.y,
                  this.currentPage - 1, this.commissionTypeId, this.commissionComment)
                  .then(async () => {
                    this.$router.push({name: 'LetterIncome'});
                    showMsgSuccess(this.$t("successDocSigned"));
                  })
                  .catch((err) => {
                    // this.catchErr(err);
                  })
                  .finally(() => {
                    this.loaderSign = false;
                  });
            }
          }

          break;
      }
    },
    getByIdLetter() {
      Service.getByIdLetter(this.$route.params.id)
          .then((rs) => {
            this.currentDoc = rs.data;
            console.log(this.currentDoc)
            this.loaderPdf = true;
            if (this.currentDoc.fileType !== 'pdf') {
              this.convertToPdf(rs.data).then((uploadPath) => {
                if (!uploadPath) {
                  setTimeout(() => {
                    this.convertToPdf(rs.data)
                        .then((uploadPath2) => {
                          this.$nextTick(() => {
                            this.src = pdf.createLoadingTask(`${this.baseUrl}/${uploadPath2}`);
                          });
                          this.loaderPdf = false;
                        })
                        .catch((e) => {
                          this.loaderPdf = false;
                        });
                  }, 4000);
                } else {
                  this.$nextTick(() => {
                    this.src = pdf.createLoadingTask(`${this.baseUrl}/${uploadPath}`);
                  });
                  this.loaderPdf = false;
                }
              });
            } else {
              this.$nextTick(() => {
                this.src = pdf.createLoadingTask(`${this.baseUrl}/${this.currentDoc.url}`);
              });
              this.loaderPdf = false;
            }
          })
          .catch((e) => {
          });
    },
    keyUpEvents(evt) {
      if (
          evt.keyCode == 46 &&
          this.currentPage == this.qrCodePage &&
          this.deleteQrPosition
      ) {
        this.imgUrl = null;
        this.qrCodePage = null;
        this.deleteQrPosition = false;
      } else if (
          evt.keyCode == 39 &&
          this.currentPage != this.numPages &&
          this.src
      ) {
        this.currentPage++;
      } else if (evt.keyCode == 37 && this.currentPage > 1 && this.src) {
        this.currentPage--;
      }
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.y = newRect.top;
      this.x = newRect.left;
    },
    getPdf() {
      return new Promise((res, rej) => {
        this.convertToPdf();
        Service.getDocPdf(this.$route.params.id)
            .then((rs) => {
              let pdfBase64 = rs.data;

              this.$nextTick(() => {
                let loadingTask = pdf.createLoadingTask(
                    `data:application/pdf;base64, ${pdfBase64}`
                );
                this.src = loadingTask;
              });

              res(rs.data);
            })
            .catch((e) => {
              rej(e);
            })
            .finally(() => {
              setTimeout(() => {
                this.loaderPdf = false;
              }, 500);
            });
      });
    },

    signData() {
      if (this.src) {
        if (this.qrCodePage && this.imgUrl) {
          showMsgError(this.$t("qrcodeWaring"));
        } else {
          this.loaderQrCode = true;
          Service.letterQRCODE(this.$route.params.id)
              .then((rs) => {
                if (rs.data) {
                  this.qrCodePage = this.currentPage;
                  this.imgUrl = rs.data;
                }
              })
              .catch((err) => {
                // this.catchErr(err);
              })
              .finally(() => {
                this.loaderQrCode = false;
              });
        }
      } else {
        showMsgError(this.$t("docNotUploaded"));
      }
    },

    save() {
      if (this.qrCodePage != null && this.imgUrl && this.src) {
        if (this.currentDoc.letterType === 'PROTOCOL' || this.currentDoc.letterType === "LETTER") {
          this.signatureModal = true;
        } else {
          if (this.$route.query.type) {
            switch (this.$route.query.type) {
              case 'compromise-decision-to-reject':
                cnfDoc(this.$t("submodules.reports.make_sign")).then((rs) => {
                  if (rs.value) {
                    this.compromiseDecisionToAcceptRejectModal = true;
                  }
                });
                break;
              case 'compromise-decision-to-accept':
                cnfDoc(this.$t("submodules.reports.make_sign")).then((rs) => {
                  if (rs.value) {
                    this.compromiseDecisionToAcceptRejectModal = true;
                  }
                });
                break;
            }
          } else {
            switch (this.currentDoc.status) {
              case 'SEND_SIGN':
                if (this.currentDoc.projectType === 'FROM_DXA' && this.currentDoc.passedToCommission) {
                  this.commissionsModalForComment = true;
                } else {
                  this.getCommissionManagementList();
                  crudAndListsService.searchList('directory/commission/commission-type', this.var_default_search_payload, null, true)
                      .then(res => {
                        this.commissionTypes = res.data.list
                      })
                      .catch(e => {
                        console.log(e)
                      })
                  this.commissionsModal = true;
                }
                break;
              case 'SEND':
                if (this.currentDoc.projectType === 'FROM_DXA' && this.currentDoc.passedToCommission) {
                  this.commissionsModalForComment = true;
                } else {
                  crudAndListsService.searchList('directory/commission/commission-type', this.var_default_search_payload, null, true)
                      .then(res => {
                        this.commissionTypes = res.data.list
                      })
                      .catch(e => {
                        console.log(e)
                      })
                  this.commissionsModal = true;
                }
                break;
              default:
                if (['LETTER_NOT_COMPLETED', 'LETTER_NOT_BELONG', 'LETTER_REGION'].indexOf(this.currentDoc.letterType) !== -1) {
                  this.commissionsModalForComment = true;
                } else {
                  cnfDoc(this.$t("docConfirm")).then((rs) => {
                    if (rs.value) {
                      this.signatureModal = true;
                    }
                  });
                }
                break;
            }
          }
        }
      } else {
        showMsgError(this.$t("qrcodeNotFound"));
      }
    },
    getCommissionManagementList(callback = () => ({})) {
      crudAndListsService.getListGet('/employee/get-all-employee/in-management', this.var_default_search_payload, null, true)
          .then(res => {
            this.commissionManagementList = res.data
            callback()
          })
          .catch(e => {
            console.log(e)
          })
    },
    fetchEmployeeList(keyword = '', callback = () => 0) {
      if (!keyword && this.employee_list.length) {
        if (callback) {
          if (callback && typeof callback === 'function') {
            return callback(this.employee_list)
          }
        }
        return this.employee_list;
      }
      crudAndListsService.searchListWithKeyword('/employee',
          {...this.var_default_search_payload, keyword: keyword}, 'inner', true)
          .then(res => {
            this.employee_list = res.data.list
            if (callback && typeof callback === 'function') {
              return callback(res.data)
            }
          })
          .catch(e => {
            console.log(e)
          })
    },
    customLabelEmployeeList(opt) {
      let selected = this.employee_list.find(e => e.id === opt);
      if (selected) {
        return selected.fullName;
      }
      return ``;
    },
  },
  computed: {
    computedMakeSignedCompromiseDecisionToReject() {
      return this.$route.query.type === 'compromise-decision-to-reject';
    },
    computedMakeSignedCompromiseDecisionToAccept() {
      return this.$route.query.type === 'compromise-decision-to-accept';
    },
  }
};
</script>

<style>
.stickyHead {
  margin: 0 !important;
  padding: 15px !important;
  border-radius: 0;
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: white;
  z-index: 4;
  width: 100%;
}

.multiselect__content-wrapper {
  position: relative !important;
}
</style>