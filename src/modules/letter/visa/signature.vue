<template>
  <div>
    <div>
      <div id="myHeader" class="card card-body stickyHead" >
        <div class="d-flex">
          <div style="width: 58%">
            <h5 class="float-right m-0" v-if="numPages" >
              {{ currentPage }} / {{ numPages }}
            </h5>
          </div>
          <div style="width: 43%">
            <div class="float-right d-flex align-items-center">
              <b-button-group>
                <b-button class="float-right" @click="signData" variant="primary" >
                  <b-overlay :opacity="0.1" :show="loaderQrCode" rounded="sm" >
                    <i class="fa fa-qrcode mr-1"></i>
                    {{ $t("actions.qrcode") }}
                  </b-overlay>
                </b-button>
                <b-button class="float-right mr-2" @click="save" variant="success" >
                  <i class="fa fa-save"></i>
                  {{ $t("actions.save") }}
                </b-button>
              </b-button-group>
              <b-button class="float-right mr-2" :to="{name: 'LetterIncome'}" variant="primary" >
                <i class="fa fa-arrow-left"></i>
              </b-button>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <b-row>
          <b-col cols="12">
            <div class="d-flex justify-content-center">
              <b-overlay variant="white" :opacity="1" :show="loaderPdf" rounded="lg" >
                <div id="pdfId" style=" width: 270mm !important; min-height: 210mm; position: relative; " >
                  <VueDragResize
                      style="z-index: 3"
                      :isActive="true"
                      v-if="imgUrl && qrCodePage == currentPage"
                      :w="110"
                      :h="110"
                      :x="x"
                      :y="y"
                      v-on:resizing="resize"
                      v-on:dragging="resize"
                      :parent="true"
                      :isResizable="false"
                      :parentLimitation="true"
                  >
                    <img
                        @mouseenter="mouseEnter"
                        @mousemove="mousemove"
                        @mouseleave="mouseLeave"
                        :src="`${imgUrl ? `data:image/png;base64, ${imgUrl}`: require('@/assets/img.png')}`"
                    />
                  </VueDragResize>
                  <pdf
                      @num-pages="numPages = $event"
                      v-if="src"
                      ref="myPdfComponent"
                      :page="currentPage"
                      :src="src"
                  />
                </div>
              </b-overlay>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <div class="d-flex mt-4 justify-content-center">
              <div
                  class="d-flex mt-4"
                  style="overflow: auto; max-width: 90%"
              >
                <div
                    class="ml-3 mb-4"
                    v-for="page in numPages"
                    :key="page + 'page'"
                >
                  <div
                      :class="
                      currentPage == page ? 'my-card-hovered-pdf-active' : ''
                    "
                      @click.prevent="setCurrentPage(page)"
                      class="my-card-hovered-pdf"
                  >
                    <div style="width: 200px;!important;position:relative">
                      <div
                          style="position: absolute; z-index: 999"
                          v-if="imgUrl && qrCodePage == page"
                          :style="{
                          top: `${y / 5.1}px`,
                          left: `${x / 5.08}px`,
                        }"
                      >
                        <img
                            v-if="imgUrl"
                            :height="20"
                            :width="20"
                            :src="`${
                            imgUrl
                              ? `data:image/png;base64, ${imgUrl}`
                              : require('@/assets/img.png')
                          }`"
                        />
                      </div>

                      <pdf
                          v-if="src"
                          :src="src"
                          :page="page"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
    <!-- COMMISSIONS MODAL -->
    <b-modal
        scrollable
        v-model="commissionsModal"
        size="md"
        :title="`${$t('submodules.commission.title')}`"
    >
      <BaseMultiselectWithValidation
          rules="required"
          class="required"
          v-model="commissionTypeId"
          :options="commissionTypes.map(e => e.id)"
          :label="$t('submodules.commission.special_commission_type.title')"
          label-on-top
          placeholder=""
          :custom-label="customLabelCommissionTypes"
          open-direction="bottom"
          :max-height="600"
          :show-labels="false"
      ></BaseMultiselectWithValidation>

      <b-form-textarea
          class="mt-3"
          v-model="commissionComment"
          :placeholder="$t('submodules.doc.summary')"
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
    <b-modal
        scrollable
        v-model="signatureModal"
        hide-footer
        size="lg"
        :title="`${$t('submodules.reports.make_sign')}`"
    >
      <b-overlay
          :opacity="0.1"
          :show="loaderSign"
          rounded="sm"
      >
        <SignKeys
            @sign="signSuccess"
            :dataToSign="currentDoc"
        />
      </b-overlay>
    </b-modal>
  </div>
</template>

<script>
// import Layout from "@/router/layouts/main";
import {showMsgSuccess, showMsgError} from "@/helper";
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
      commissionModalLoader: false,
      commissionTypes: [],
      commissionsModal: false,
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
      deleteQrPosition: false,
      loaderSign: false,
    };
  },
  name: "Signature",

  components: {
    VueDragResize,
    // Layout,
    pdf,
    SignKeys,
  },
  created(){
    this.getByIdLetter();
    document.addEventListener("keyup", this.keyUpEvents);
  },
  methods: {
    openSignatureModalForCommission() {
      if (this.commissionTypeId) {
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
                /* this.$nextTick(() => {
                    let loadingTask = pdf.createLoadingTask(
                        `${this.baseUrl}/${rs.data.uploadPath}`
                    );
                    this.src = loadingTask;
                }); */
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
      /* Service.onlyDocSign(
          payload,
          this.$route.params.id2,
          this.x,
          this.y,
          this.currentPage
      )
          .then(() => {
              // this.signatureModal = false;

              this.$router.push({ name: 'LetterIncome' });
              showMsgSuccess(this.$t("successDocSigned"));
          })
          .catch((err) => {
              this.catchErr(err);
          })
          .finally(() => {
              this.loaderSign = false;
          }); */

      if (this.currentDoc.letterType == 'PROTOCOL') {
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
      } else if (this.currentDoc.letterType == 'LETTER') {
        await Service.onlyDocSignFORNotBelong(payload, this.$route.params.id2,
            this.x,
            this.y,
            this.currentPage - 1)
            .then(async () => {
              await Service.onlyDocSignNotBelong(payload, this.selectedTrItem.id)
                  .then(async () => {
                    this.$router.push({name: 'LetterIncome'});
                    showMsgSuccess(this.$t("successDocSigned"));

                  })
                  .catch((err) => {
                    this.catchErr(err);
                  });
              // this.isModalKeys = false;
              // this.signatureModal = false;
              // let tempData = this.currentDoc;
              // await showMsgSuccess(this.$t("successDocSigned"));
              // await this.getList();
              // await this.getIncomeTotalCount();

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
    },
    getByIdLetter() {
      Service.getByIdLetter(this.$route.params.id)
          .then((rs) => {
            this.currentDoc = rs.data;
            this.loaderPdf = true;
            this.convertToPdf(rs.data).then((uploadPath) => {
              if (!uploadPath) {
                setTimeout(() => {
                  this.convertToPdf(rs.data)
                      .then((uploadPath2) => {
                        this.$nextTick(() => {
                          let loadingTask = pdf.createLoadingTask(
                              `${this.baseUrl}/${uploadPath2}`
                          );
                          this.src = loadingTask;
                        });
                        this.loaderPdf = false;
                      })
                      .catch((e) => {
                        this.loaderPdf = false;
                      });
                }, 4000);
              } else {
                this.$nextTick(() => {
                  let loadingTask = pdf.createLoadingTask(
                      `${this.baseUrl}/${uploadPath}`
                  );
                  this.src = loadingTask;
                });
                this.loaderPdf = false;
              }
            });
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
        if (this.currentDoc.letterType == 'PROTOCOL' || this.currentDoc.letterType == "LETTER") {
          this.signatureModal = true;
        } else {
          // this.currentItem = this.currentDoc;
          // this.signatureModal = true;

          if (this.currentDoc.status == "SEND_SIGN" || this.currentDoc.status == "SEND") {

            // GET COMMISSION_TYPES
            crudAndListsService.searchList('directory/commission/commission-type', this.var_default_search_payload, null, true)
                .then(res => {
                  this.commissionTypes = res.data.list
                })
                .catch(e => {
                  console.log(e)
                })
            this.commissionsModal = true;

            // this.signatureModal = true;
          } else {
            cnfDoc(this.$t("docConfirm")).then((rs) => {
              if (rs.value) {
                this.signatureModal = true;
              }
            });
          }
        }
      } else {
        showMsgError(this.$t("qrcodeNotFound"));
      }
      // Service.saveQrCode(this.x, this.y, this.currentPage)
      //   .then(() => {
      //     this.successSaved();
      //   })
      //   .catch((err) => {
      //     this.catchErr(err);
      //   });
    },
  },
};
</script>

<style>
.stickyHead {
  margin: 0px !important;
  padding: 15px !important;
  border-radius: 0px;
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: white;
  z-index: 4;
  width: 100%;
}
</style>