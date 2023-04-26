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
                <b-button
                    class="float-right"
                    @click="signData"
                    variant="primary"
                >
                  <b-overlay
                      :opacity="0.1"
                      :show="loaderQrCode"
                      rounded="sm"
                  >
                    <i class="fa fa-qrcode mr-1"></i>
                    {{ $t("actions.qrcode") }}
                  </b-overlay>
                </b-button>
                <b-button
                    class="float-right mr-2"
                    @click="save"
                    variant="success"
                >
                  <i class="fa fa-save"></i>
                  {{ $t("actions.save") }}
                </b-button>
              </b-button-group>

              <b-button
                  class="float-right mr-2"
                  :to="{name: 'CommissionProjects'}"
                  variant="primary"
              >
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
                  variant="white"
                  :opacity="1"
                  :show="loaderPdf"
                  rounded="lg"
              >
                <div id="pdfId" style="width: 270mm !important;min-height: 210mm;position: relative;">
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
                        :src="`${
                        imgUrl
                          ? `data:image/png;base64, ${imgUrl}`
                          : require('@/assets/img.png')
                      }`"
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
              <div class="d-flex mt-4" style="overflow: auto; max-width: 90%">
                <div class="ml-3 mb-4" v-for="page in numPages" :key="page + 'page'">
                  <div
                      :class="currentPage === page ? 'my-card-hovered-pdf-active' : ''"
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

    <b-modal
        scrollable
        v-model="employee.modal"
        size="md"
        :title="`${$t('column.employee')}`"
    >
      <BaseMultiselectWithValidation
          rules="required"
          class="required"
          v-model="employee.id"
          :options="employee.list.map(e => e.id)"
          :label="$t('column.employee')"
          label-on-top
          placeholder=""
          :custom-label="customLabelEmployee"
          open-direction="bottom"
          :max-height="600"
          :show-labels="false"
          @search-change="fetchEmployeeList"
      ></BaseMultiselectWithValidation>

      <b-form-textarea
          class="mt-3"
          v-model="employee.comment"
          :placeholder="$t('submodules.doc.summary')"
          rows="5"
      ></b-form-textarea>
      <template v-slot:modal-footer>
        <b-button
            variant="success"
            @click="openSignatureModalForEmployee"
        >
          <b-overlay
              :opacity="0.1"
              :show="employee.modalLoader"
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
import {showMsgError, showMsgSuccess} from "@/helper";
import pdf from "vue-pdf";
import Service from "../../../../modules/letter/letterService";
import crudAndListsService from "@/shared/services/crud_and_list.service";

import SignKeys from "../../SignKeys.vue";
import VueDragResize from "vue-drag-resize";

export default {
  data() {
    return {
      employee: {
        id: null,
        comment: '',
        modal: false,
        modalLoader: false,
        interval: false,
        list: [],
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
    openSignatureModalForEmployee() {
      if (this.employee.id) {
        this.signatureModal = true
      } else {
        this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
      }
    },
    customLabelEmployee(opt) {
      let selected = this.employee.list.find(e => e.id == opt);
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

      switch (this.$route.name) {
        case 'CommissionInvokeLetterSign':
          Service.makeSignedInvokeLetter(payload, this.$route.params.projectId, this.$route.params.letterId, this.employee.id, this.employee.comment,
              this.x,
              this.y,
              this.currentPage - 1)
              .then(async () => {
                showMsgSuccess(this.$t("successDocSigned"));
                this.$router.push("/projects/commission");
              })
              .catch((err) => {
              })
              .finally(() => {
                this.loaderSign = false;
              });
          break;
      }


    },
    getByIdLetter() {
      Service.getByIdLetter(this.$route.params.letterId)
          .then((rs) => {
            this.currentDoc = rs.data;
            if (this.currentDoc.fileType.toLowerCase() === 'pdf') {
              return this.nextTick(this.currentDoc.url);
            }
            this.loaderPdf = true;
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
          })
          .catch((e) => {
          });
    },
    nextTick(uploadPath) {
      this.$nextTick(() => {
        this.src = pdf.createLoadingTask(
            `${this.baseUrl}/${uploadPath}`
        );
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
        Service.getDocPdf(this.$route.params.letterId)
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
          Service.letterQRCODE(this.$route.params.letterId)
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
      if (!this.qrCodePage || !this.imgUrl || !this.src) {
        return showMsgError(this.$t("qrcodeNotFound"));
      }
      switch (this.$route.name) {
        case 'CommissionInvokeLetterSign':
          if (!this.employee.list.length) {
            this.fetchEmployeeList();
          }
          this.employee.modal = true;
          break;
      }
    },
    fetchEmployeeList(keyword = '', callback = null) {
      if (!keyword && this.employee.list.length) {
        if (callback) {
          if (callback && typeof callback === 'function') {
            return callback(this.employee.list)
          }
        }
        return this.employee.list;
      }
      if (this.employee.interval) {
        clearInterval(this.employee.interval);
      }
      this.employee.interval = setInterval(() => {
        crudAndListsService.searchListWithKeyword('/employee', {...this.var_default_search_payload, keyword: keyword}, 'inner')
            .then(res => {
              this.employee.list = res.data.list
              if (callback && typeof callback === 'function') {
                return callback(res.data)
              }
            })
            .catch(e => {
              console.log(e)
            })
            .finally(() => {
              clearInterval(this.employee.interval);
            });
      }, 500);
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