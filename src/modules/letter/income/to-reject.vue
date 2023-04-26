<template>
  <div>
    <div>
      <div id="myHeader" class="card card-body stickyHead" >
        <div class="d-flex">
          <div style="width: 58%">
            <h5 v-if="numPages" class="float-right m-0" >
              {{ currentPage }} / {{ numPages }}
            </h5>
          </div>
          <div style="width: 43%">
            <div class="float-right d-flex align-items-center">
              <b-button-group>
                <b-button class="float-right" variant="primary" @click="signData" >
                  <b-overlay :opacity="0.1" :show="loaderQrCode" rounded="sm" >
                    <i class="fa fa-qrcode mr-1"></i>
                    {{ $t("actions.qrcode") }}
                  </b-overlay>
                </b-button>
                <b-button class="float-right mr-2" variant="success" @click="save" >
                  <i class="fa fa-save"></i>
                  {{ $t("actions.save") }}
                </b-button>
              </b-button-group>

              <b-button :to="{name: 'LetterIncome'}" class="float-right mr-2" variant="primary" >
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
                <div id="pdfId" style=" width: 270mm !important; min-height: 210mm; position: relative; " >
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
                        :src="`${  imgUrl  ? `data:image/png;base64, ${imgUrl}`  : require('@/assets/img.png')  }`"
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
              <div class="d-flex mt-4" style="overflow: auto; max-width: 90%" >
                <div v-for="page in numPages" :key="page + 'page'" class="ml-3 mb-4" >
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

                      <pdf v-if="src" :page="page" :src="src" />
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
        v-model="commissionsModal"
        :title="`${$t('actions.reject')}`"
        scrollable
        size="md"
    >
      <BaseMultiselectWithValidation
          v-model="employeeId"
          :custom-label="customLabelEmployeeList"
          :label="$t('column.employee')"
          :max-height="600"
          :options="employeeList.map(e => e.id)"
          :show-labels="false"
          class="required"
          label-on-top
          open-direction="bottom"
          placeholder=""
          rules="required"
          @search-change="fetchEmployeeList"
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
          <b-overlay :opacity="0.1" :show="commissionModalLoader" rounded="sm" >
            {{ $t("actions.continue") }}
          </b-overlay>
        </b-button>
      </template>
    </b-modal>

    <!-- rejectModal MODAL -->
    <b-modal v-model="letterReject.modal" :title="`${$t('actions.reject')}`" scrollable size="md" >
      <b-form-textarea
          v-model="letterReject.comment"
          :placeholder="$t('submodules.doc.summary')"
          class="mt-3"
          rows="5"
      ></b-form-textarea>

      <template v-slot:modal-footer>
        <b-button variant="success" @click="openSignatureModalForLetterReject" >
          <b-overlay :opacity="0.1" :show="letterReject.loader" rounded="sm" >
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
      <b-overlay :opacity="0.1" :show="loaderSign" rounded="sm" >
        <SignKeys :dataToSign="currentDoc" @sign="signSuccess" />
      </b-overlay>
    </b-modal>
  </div>
</template>

<script>
// import Layout from "@/router/layouts/main";

import {showMsgError} from "@/helper";
import pdf from "vue-pdf";
import Service from "../letterService";
import crudAndListsService from '@/shared/services/crud_and_list.service'

import SignKeys from "../SignKeys.vue";
import VueDragResize from "vue-drag-resize";
import {mapState} from "vuex";

export default {
  data() {
    return {
      employeeId: null,
      commissionComment: '',
      commissionModalLoader: false,
      employeeList: [],
      letterReject: {
        modal: false,
        loader: false,
        comment: '',
      },
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
  computed: {
    ...mapState('auth', ['UserInfo']),
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
      if (this.employeeId) {
        this.signatureModal = true
      } else {
        this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
      }
    },
    openSignatureModalForLetterReject() {
      if (this.letterReject.comment) {
        this.signatureModal = true;
      } else {
        this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
      }
    },
    customLabelEmployeeList(opt) {
      let selected = this.employeeList.find(e => e.id === opt);
      if (selected) {
        return selected.fullName;
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
      switch (this.currentDoc.letterType) {
        case 'COMPROMISE_DECISION':
          Service.onlyDocMakeSignedToReject(payload, this.$route.params.id, this.employeeId, this.commissionComment,
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
        break
        case 'LETTER_REJECT':
          Service.rejectLetterToReject(payload, this.$route.params.id, this.x,
            this.y,
            this.currentPage - 1, this.letterReject.comment)
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
        break;
        default:
          showMsgError(this.$t("qrcodeNotFound"));
        break;
      }
    },
    getByIdLetter() {
      Service.getByIdLetter(this.$route.params.id2)
          .then((rs) => {
            this.currentDoc = rs.data;
            this.loaderPdf = true;
            if (this.currentDoc.fileType.toLowerCase() !== 'pdf') {
              this.convertToPdf(rs.data).then((uploadPath) => {
                if (!uploadPath) {
                  setTimeout(() => {
                    this.convertToPdf(rs.data)
                        .then((uploadPath2) => {
                          this.nextTick(uploadPath2);
                          this.loaderPdf = false;
                        })
                        .catch((e) => {
                          this.loaderPdf = false;
                        });
                  }, 4000);
                } else {
                  this.nextTick(uploadPath);
                  this.loaderPdf = false;
                }
              });
            } else {
              this.nextTick('/'+ this.currentDoc.url);
              this.loaderPdf = false;
            }
          })
          .catch((e) => {
            console.log(e);
          });
    },
    nextTick(uploadPath){
      this.src = pdf.createLoadingTask(
          `${this.baseUrl}/${uploadPath}`
      );
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
    fetchEmployeeList(keyword = '', callback = null) {
      if (!keyword && this.employeeList.length) {
        if (callback) {
          if (callback && typeof callback === 'function') {
            return callback(this.employeeList)
          }
        }
        return this.employeeList;
      }
      crudAndListsService.searchListWithKeyword('/employee',
          {...this.var_default_search_payload, keyword: keyword}, 'inner', true)
          .then(res => {
            this.employeeList = res.data.list
            if (callback && typeof callback === 'function') {
              return callback(res.data)
            }
          })
          .catch(e => {
            console.log(e)
          })
    },
    save() {
      if (this.qrCodePage != null && this.imgUrl && this.src) {
        if (this.currentDoc.letterType === "COMPROMISE_DECISION") {
          this.fetchEmployeeList('', () => {
            this.commissionsModal = true;
          });
        }
        if (this.currentDoc.letterType === "LETTER_REJECT") {
          this.letterReject.modal = true;
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