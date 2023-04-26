<template>
  <div>
    <div>
      <div id="myHeader" class="card card-body stickyHead">
        <div class="d-flex">
          <div style="width: 58%">
            <h5 class="float-right m-0" v-if="numPages">
              {{ currentPage }} / {{ numPages }}
            </h5>
          </div>
          <div style="width: 43%">
            <div class="float-right d-flex align-items-center">
              <b-button-group>
                <b-button class="float-right" @click="signData" variant="primary">
                  <b-overlay :opacity="0.1" :show="loaderQrCode" rounded="sm">
                    <i class="fa fa-qrcode mr-1"></i>
                    {{ $t("actions.qrcode") }}
                  </b-overlay>
                </b-button>
                <b-button class="float-right mr-2" @click="save" variant="success">
                  <i class="fa fa-save"></i>
                  {{ $t("actions.save") }}
                </b-button>
              </b-button-group>
              <b-button class="float-right mr-2" :to="{name: 'LetterIncome'}" variant="primary">
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
              <b-overlay variant="white" :opacity="1" :show="loaderPdf" rounded="lg">
                <div id="pdfId" style=" width: 270mm !important; min-height: 210mm; position: relative; ">
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
                        :src="`${ imgUrl ? `data:image/png;base64, ${imgUrl}` : require('@/assets/img.png') }`"
                    />
                  </VueDragResize>
                  <pdf @num-pages="numPages = $event" v-if="src" ref="myPdfComponent" :page="currentPage" :src="src"/>
                </div>
              </b-overlay>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <div class="d-flex mt-4 justify-content-center">
              <div class="d-flex mt-4" style="overflow: auto; max-width: 90%" >
                <div class="ml-3 mb-4" v-for="page in numPages" :key="page + 'page'" >
                  <div
                      :class=" currentPage == page ? 'my-card-hovered-pdf-active' : '' "
                      @click.prevent="setCurrentPage(page)"
                      class="my-card-hovered-pdf"
                  >
                    <div style="width: 200px;!important;position:relative">
                      <div v-if="imgUrl && qrCodePage == page"
                           :style="{top:`${y/5.1}px`,left:`${x/5.08}px`, position: 'absolute', 'z-index': 999}"
                      >
                        <img v-if="imgUrl" :height="20" :width="20"
                             :src="`${ imgUrl ? `data:image/png;base64, ${imgUrl}` : require('@/assets/img.png') }`"
                        />
                      </div>

                      <pdf v-if="src" :src="src" :page="page" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </div>
    </div>
    <b-modal scrollable v-model="commissionsModal" size="md" :title="`${$t('submodules.commission.title')}`">
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
      />
      <b-form-textarea class="mt-3" v-model="commissionComment" :placeholder="$t('submodules.doc.summary')" rows="5"/>
      <template v-slot:modal-footer>
        <b-button variant="success" @click="openSignatureModalForCommission">
          <b-overlay :opacity="0.1" :show="commissionModalLoader" rounded="sm">
            {{ $t("actions.continue") }}
          </b-overlay>
        </b-button>
      </template>
    </b-modal>
    <b-modal scrollable v-model="commissionsModalForComment" size="md" :title="`${$t('submodules.commission.title')}`">
      <b-form-textarea class="mt-3" v-model="comment4Commission" :placeholder="$t('submodules.doc.summary')" rows="5"/>
      <template v-slot:modal-footer>
        <b-button variant="success" @click="openSignatureModalForCommissionForComment">
          <b-overlay :opacity="0.1" :show="commissionModalLoader" rounded="sm">
            {{ $t("actions.continue") }}
          </b-overlay>
        </b-button>
      </template>
    </b-modal>
    <b-modal scrollable v-model="signatureModal" hide-footer size="lg" :title="`${$t('submodules.reports.make_sign')}`">
      <b-overlay :opacity="0.1" :show="loaderSign" rounded="sm">
        <SignKeys @sign="signSuccess" :dataToSign="currentDoc"/>
      </b-overlay>
    </b-modal>
  </div>
</template>

<script>
// import Layout from "@/router/layouts/main";
import { showMsgError, showMsgSuccess } from "@/helper";
import pdf from "vue-pdf";
import Service from "../../modules/letter/letterService";

import SignKeys from "./SignKeys.vue";
import VueDragResize from "vue-drag-resize";

export default {
  data() {
    return {
      commissionTypeId: null,
      commissionComment: '',
      comment4Commission: '',
      commissionModalLoader: false,
      commissionTypes: [],
      commissionsModal: false,
      commissionsModalForComment: false,
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
    pdf,
    SignKeys,
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
        this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
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
                res(rs.data.uploadPath);
              } else {
                res(false);
              }
            })
            .catch((e) => {
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
      switch (this.currentDoc.letterType) {
        case 'DECISION_COMMISSION':
          this.onlyDocSignFORBeforeProject(payload);
          break;
        case 'PRESCRIPTION_COMMISSION':
          this.onlyDocSignFORBeforeProject(payload);
          break;
        case 'PROTOCOL_COMMISSION':
          this.onlyDocSignFORBeforeProject(payload);
          break;
        case 'COMPROMISE_DECISION_SUSPEND':
          this.onlyDocSignFORBeforeProject(payload);
          break;
        case 'COMPROMISE_DECISION_DELAY':
          this.onlyDocSignFORBeforeProject(payload);
          break;
        case 'COMPROMISE_DECISION_RESUME':
          this.onlyDocSignFORBeforeProject(payload);
          break;
        case 'PROTOCOL_SUSPEND':
          this.onlyDocSignFORBeforeProject(payload);
          break;
        case 'PROTOCOL_DELAY':
          this.onlyDocSignFORBeforeProject(payload);
          break;
        case 'PROTOCOL_RESUME':
          this.onlyDocSignFORBeforeProject(payload);
          break;
        case 'LETTER_INVOKE':
          this.onlyDocSignFORBeforeProject(payload);
          break;
        default:
          Service.onlyDocSignFORBeforeProject(payload, this.$route.params.id,
              this.x,
              this.y,
              this.currentPage - 1)
              .then(() => {
                showMsgSuccess(this.$t("successDocSigned"));
                this.$router.push("/projects/main");
              })
              .catch((err) => {
                // this.catchErr(err);
              })
              .finally(() => {
                this.loaderSign = false;
                this.signatureModal = false;
              });
          break;
      }
    },
    async onlyDocSignFORBeforeProject(payload) {
      await Service.onlyDocSignFORBeforeProject(payload, this.$route.params.id, this.x, this.y, this.currentPage - 1)
          .then(async () => {
            showMsgSuccess(this.$t("successDocSigned"));
            await this.$router.push({ name: 'CommissionProjects' });
          })
          .catch((err) => {
            // this.catchErr(err);
          })
          .finally(() => {
            this.loaderSign = false;
          });
    },
    getByIdLetter() {
      this.loaderPdf = true;
      Service.getByIdLetter(this.$route.params.id)
          .then((rs) => {
            this.currentDoc = rs.data;
            this.loaderPdf = true;
            if (this.currentDoc.fileType === 'pdf') {
              return this.$nextTick(() => {
                // this.src = pdf.createLoadingTask(`${this.baseUrl}/${this.currentDoc.url}`);
                this.src = `${this.baseUrl}/${this.currentDoc.url}`;
                this.loaderPdf = false;
              });
            }
            this.convertToPdf(rs.data).then((uploadPath) => {
              if (!uploadPath) {
                setTimeout(() => {
                  this.convertToPdf(rs.data)
                      .then((uploadPath2) => {
                        this.$nextTick(() => {
                          let loadingTask = pdf.createLoadingTask(`${this.baseUrl}/${uploadPath2}`);
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
                  this.src = pdf.createLoadingTask(
                      `${this.baseUrl}/${uploadPath}`
                  );
                });
                this.loaderPdf = false;
              }
            });
          })
          .catch((e) => {
          })
          .finally(() => {
            if (this.loaderPdf) this.loaderPdf = false;
          });
    },
    keyUpEvents(evt) {
      if (evt.keyCode == 46 && this.currentPage == this.qrCodePage && this.deleteQrPosition) {
        this.imgUrl = null;
        this.qrCodePage = null;
        this.deleteQrPosition = false;
      } else if (evt.keyCode == 39 && this.currentPage != this.numPages && this.src) {
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
                this.src = pdf.createLoadingTask(
                    `data:application/pdf;base64, ${pdfBase64}`
                );
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
        this.signatureModal = true;
      } else {
        showMsgError(this.$t("qrcodeNotFound"));
      }
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