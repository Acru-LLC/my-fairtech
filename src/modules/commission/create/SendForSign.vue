<template>
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
            <b-button :to="{name: 'LetterCreate'}" class="float-right mr-2" variant="primary">
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
            <b-overlay
                :opacity="1"
                :show="loaderPdf"
                rounded="lg"
                variant="white"
            >
              <div
                  id="pdfId"
                  style="width: 270mm !important;min-height: 210mm;position: relative;"
              >
                <VueDragResize
                    v-if="imgUrl && qrCodePage === currentPage"
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
                      :src="`${ imgUrl ? `data:image/png;base64, ${imgUrl}` : require('@/assets/img.png')}`"
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
                    :class="currentPage === page ? 'my-card-hovered-pdf-active' : ''"
                    class="my-card-hovered-pdf"
                    @click.prevent="setCurrentPage(page)"
                >
                  <div style="width: 200px;!important;position:relative">
                    <div
                        v-if="imgUrl && qrCodePage === page"
                        :style="{top: `${y / 5.1}px`,left: `${x / 5.08}px`,}"
                        style="position: absolute; z-index: 999"
                    >
                      <img
                          v-if="imgUrl"
                          :height="20"
                          :src="`${imgUrl ? `data:image/png;base64, ${imgUrl}`: require('@/assets/img.png')}`"
                          :width="20"
                          alt=""/>
                    </div>
                    <pdf
                        v-if="src"
                        :page="page"
                        :src="src"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <b-modal
        v-model="commissionsModal"
        :title="`${$t('submodules.commission.title')}`"
        scrollable
        size="md"
    >
      <BaseMultiselectWithValidation
          v-model="managementEmployeeId"
          :custom-label="customLabelCommissionTypes"
          :label="$t('column.director')"
          :max-height="600"
          :options="managementEmployees ? managementEmployees.map(e => e.id): []"
          :show-labels="false"
          class="required"
          label-on-top
          open-direction="bottom"
          placeholder=""
          rules="required"
      />

      <b-form-textarea
          v-model="managementComment"
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
  </div>
</template>
<script>

import pdf from "vue-pdf";
import Service from "../../letter/letterService";
import SignKeys from "../../letter/SignKeys.vue";
import {mapState} from "vuex";
import VueDragResize from "vue-drag-resize";
import crudAndListsService from '@/shared/services/crud_and_list.service'
import {showMsgError, showMsgSuccess} from "@/helper";

export default {
  data() {
    return {
      x: 200,
      y: 300,
      src: null,
      width: 110,
      height: 110,
      imgUrl: null,
      numPages: undefined,
      pageCount: 0,
      loaderPdf: false,
      qrCodePage: null,
      loaderSign: false,
      currentDoc: {},
      currentPage: 1,
      pageYOffset: 0,
      loaderQrCode: false,
      signatureModal: false,
      managementEmployees: [],
      commissionsModal: false,
      managementEmployeeId: null,
      deleteQrPosition: false,
      managementComment: '',
      commissionModalLoader: false,
    };
  },
  name: "SendForSign",
  computed: {
    ...mapState('auth', '[UserInfo]'),
    ...mapState('auth', 'currentApplicationItem')
  },
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
    openSignatureModalForCommission() {
      if (this.managementEmployeeId) {
        this.signatureModal = true
      } else {
        this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
      }
    },
    customLabelCommissionTypes(opt) {
      let selected = this.managementEmployees.find(e => e.id === opt);
      if (selected) {
        return selected.fullName
      }
      return ``;
    },
    convertToPdf(selectedItem, forSign = false) {
      return new Promise((res, rej) => {
        let config = {
          url: selectedItem.url,
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
      let eImzo = {
        signedContent: data.content,
        inn: data.inn,
        pnfl: data.pnfl
      };
      Service.onlyDocSignSendToRaisOnInner(eImzo, this.currentDoc.id,
        this.x,
        this.y,
        this.currentPage - 1, this.managementEmployeeId, this.managementComment)
        .then(async () => {
          this.$router.push({name: 'LetterCreate'});
          showMsgSuccess(this.$t("successDocSigned"));
        })
        .catch((err) => {
        })
        .finally(() => {
            this.loaderSign = false;
          });
    },
    getByIdLetter() {
      Service.getByIdSendToRais(this.$route.params.id)
        .then((rs) => {
          this.currentDoc = rs.data;
          if (rs.data.fileType === 'pdf') {
            this.createLoadingTask(rs.data.url)
            return;
          }
          this.loaderPdf = true;
          this.convertToPdf(rs.data).then((uploadPath) => {
            if (!uploadPath) {
              setTimeout(() => {
                this.convertToPdf(rs.data)
                  .then((uploadPath2) => {
                    this.createLoadingTask(uploadPath2);
                    this.loaderPdf = false;
                  })
                  .catch((e) => {
                    this.loaderPdf = false;
                  });
              }, 4000);
            } else {
              this.createLoadingTask(uploadPath);
              this.loaderPdf = false;
            }
          });

        })
        .catch((e) => {
        });
    },
    createLoadingTask(uploadPath){
      this.$nextTick(() => {
        this.src = pdf.createLoadingTask(`${this.baseUrl}/${uploadPath}`);
      });
    },
    keyUpEvents(evt) {
      if (
          evt.keyCode === 46 &&
          this.currentPage === this.qrCodePage &&
          this.deleteQrPosition
      ) {
        this.imgUrl = null;
        this.qrCodePage = null;
        this.deleteQrPosition = false;
      } else if (
          evt.keyCode === 39 &&
          this.currentPage !== this.numPages &&
          this.src
      ) {
        this.currentPage++;
      } else if (evt.keyCode === 37 && this.currentPage > 1 && this.src) {
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
          Service.letterQRCODESendToRais(this.currentDoc.id)
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
    fetchManagementEmployeeList(callback) {
      Service.getAllManagementEmployees()
        .then(res => {
          this.managementEmployees = res.data
          callback(res.data)
        })
        .catch(e => {
          console.log('error', e)
        })
    },
    save() {
      if (this.qrCodePage != null && this.imgUrl && this.src) {
        if (['NOTICE_NOT_COMPLETED', 'NOTICE_NOT_BELONG', 'NOTICE_REGION'].indexOf(this.currentDoc.letterType) !== -1) {
          this.fetchManagementEmployeeList(() => {
            this.commissionsModal = true;
          });
        }
      } else {
        showMsgError(this.$t("qrcodeNotFound"));
      }
    },
  },
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
</style>