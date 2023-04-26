<script>
// import Layout from "@/router/layouts/main";
// import PageHeader from "@/components/page-header";

import Service from "../letterService";
/**
 * Products-order component
 */
import Send from "./send.vue";
import Add from "./add.vue";
import { enc, g_name, showMsgError } from "@/helper";

import Editor from "./froal.editor.vue";
import Modal from "./modal.vue";
import ModalPdf from "./editor.modal.vue";

export default {
  components: {
    ModalPdf,
    // Layout,
    // PageHeader,
    Add,
    Send,
    Editor,
    Modal,
  },
  watch: {
    file(v) {
      if (v) {
        Service.createAttachedFile(this.selectedTrItem.id, v).then((res) => {
          this.successSaved();
          this.getAttachedFilesById(this.selectedTrItem.id);
          this.file = null;
        });
      }
    },
    page() {
      this.getList();
    },
    searchValue(v) {
      this.getList();
    },
  },
  data() {
    return {
      g_name: g_name,
      enc: enc,
      title: this.$t("d.create"),
      items: [
        {
          text: this.$t("menu"),
          href: "/",
        },
        {
          text: this.$t("d.myDoc"),
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
      sendModal: false,
      loaderButton: false,
      selectedTrItem: {},
      file: null,
      filesList: [],
      ilovaUploadPath: null,
      viewIlovaModal: false,
      editModal: false,
      contextText: "",
      loader: false,
      base64: null,
      viewModal: false,
      selectedSignature: {},
      isSidebar_3: false,
      selectedSigner: null,
    };
  },
  async created() {
    await this.getList();
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
    viewLetter() {
      this.viewModal = true;
      this.loader = true;
      this.base64 = null;
      Service.viewPdfByLetterId(this.selectedTrItem.id)
          .then((res) => {
            setTimeout(() => {
              this.base64 = res.data;
              this.loader = false;
            }, 400);
          })
          .finally(() => {
            this.loader = false;
            this.$refs.editModalRef.loadingPdf(false);
          });
    },
    signerSet(v) {
      if (v.employeeId) {
        this.selectedSigner = v.employeeId;
        let editor = this.$refs.editorRef;
        let editorHtml = new DOMParser().parseFromString(
            editor.text,
            "text/html"
        );
        let signerTable = editorHtml.getElementById("signerTableId");
        if (signerTable) {
          let department = editorHtml.getElementById("depName");
          this.$set(department, "innerText", v.depNameUz);
          let position = editorHtml.getElementById("signerPosition");
          this.$set(position, "innerText", v.positionNameUz);
          let name = editorHtml.getElementById("name");
          this.$set(
              name,
              "innerText",
              `${v.firstName.charAt(0)}. ${v.lastName}`
          );
          let htmlString = new XMLSerializer().serializeToString(editorHtml);
          editor.setTextContent(htmlString);
        } else {
          let htmlData = `<table class="class1" id="signerTableId" style="width: 100%;">
            <tbody>
              <tr class="pageTr">
                <td style="width: 50%; text-align: center;vertical-align:top !important"><strong><span style='font-family: "Times New Roman", Times, serif, -webkit-standard; font-size: 14pt;' id="depName">
                ${v.depNameUz}&nbsp;</span></strong>
                  <br><strong><span style='font-family: "Times New Roman", Times, serif, -webkit-standard; font-size: 14pt;' id="signerPosition">
                  ${v.positionNameUz}
                  </span></strong>
                  <br>
                </td>
                <td style="width: 50%; text-align: center;vertical-align:top !important">
                <div style="display:flex; justify-content:center;
                align-items:center !important; width:100% !important">
              
                <div>
                  <strong ><span  id="name" style='font-family: "Times New Roman", Times, serif, -webkit-standard; font-size: 14pt;'>
                  ${v.firstName.charAt(0)}. ${v.lastName}</span></strong></div>
              
                </div>

                  <div style="margin:0px" id="userQrCodEID"></div>
                </td>
              </tr>
            </tbody>
          </table>`;
          editor.setTextContent(editor.text.concat(htmlData));
        }
      } else {
        this.selectedSigner = null;
        let editor = this.$refs.editorRef;
        let editorHtml = new DOMParser().parseFromString(
            editor.text,
            "text/html"
        );
        let signerTable = editorHtml.getElementById("signerTableId");
        if (signerTable) {
          signerTable.remove();
          let htmlString = new XMLSerializer().serializeToString(editorHtml);
          editor.setTextContent(htmlString);
        }
      }
    },
    okModal() {
      let text = this.$refs.editorRef.text;
      this.$refs.editModalRef.loading(true);
      Service.saveLetterBody(this.selectedTrItem.id, text, this.selectedSigner)
          .then(() => {
            let tempData = this.selectedTrItem;
            this.successEdited();
            this.getList();
            this.editModal = false;
            setTimeout(() => {
              this.selectedTrItem = this.list.find((e) => e.id == tempData.id);
              this.$forceUpdate();
            }, 500);
          })
          .catch((e) => {
          })
          .finally(() => {
            this.$refs.editModalRef.loading(false);
          });
    },
    viewModalClick() {
      this.$refs.editModalRef.loadingPdf(true);
      this.viewModal = true;
      this.loader = true;
      this.base64 = null;

      Service.convert(this.contextText)
          .then((res) => {
            setTimeout(() => {
              this.base64 = res.data;
              this.loader = false;
            }, 400);
          })
          .finally(() => {
            this.$refs.editModalRef.loadingPdf(false);
          });
    },
    changeText(text) {
      this.contextText = text;
    },
    editLetter(item) {
      this.editModal = true;
      setTimeout(() => {
        Service.getBody(item.id).then((res) => {
          let editor = this.$refs.editorRef;
          if (editor) {
            if (!this._empty(res.data)) {
              editor.setTextContent(res.data);
            }
          }
        });
      }, 400);
    },
    viewIlova(uploadPath) {
      if (this.getExt(uploadPath) === "PDF") {
        this.ilovaUploadPath = uploadPath;
        this.viewIlovaModal = true;
      }
    },
    deleteLetter() {
      this.cnf().then((res) => {
        if (res.value) {
          Service.removeLetter(this.selectedTrItem.id).then(() => {
            this.deleteSuccess();
            this.getList();
            this.selectedTrItem = {};
          });
        }
      });
    },
    removeFile(item) {
      this.cnf().then((res) => {
        if (res.value) {
          Service.removeFile(item.id).then((rs) => {
            this.deleteSuccess();
            this.getAttachedFilesById(this.selectedTrItem.id);
          });
        }
      });
    },
    getAttachedFilesById(id) {
      Service.getAttachedFilesById(id).then((res) => {
        this.filesList = res.data;
      });
    },
    fileUpload() {
      this.$refs.fileRef.$el.firstChild.click();
    },
    getBaseUrl() {
      return process.env.VUE_APP_ROOT_URL;
    },

    clickTrItem(item) {
      if (this.selectedTrItem.id == item.id) {
        this.selectedTrItem = {};
      } else {
        this.selectedTrItem = item;
        this.getAttachedFilesById(item.id);
      }
    },
    sendAndSave() {
      if (this.$refs.sendRef) {
        if (
            this.$refs.sendRef.selectedReview.length > 0 ||
            this.$refs.sendRef.selectedSignature.length > 0 ||
            this.$refs.sendRef.selectedSignature.employeeId
        ) {
          this.loaderButton = true;
          let payload = {
            agreement: this.$refs.sendRef.selectedAgreement.map(
                (e) => e.employeeId
            ),
            review: this.$refs.sendRef.selectedReview.map((e) => e.employeeId),
            signature: this.$refs.sendRef.selectedSignature.employeeId
                ? [this.$refs.sendRef.selectedSignature.employeeId]
                : [],
          };

          Service.sendDoc(this.currentItem.id, payload)
              .then((rs) => {
                if (rs.data) {
                  this.$router.push("/letter/sent");
                  this.sendModal = false;
                  this.getList();
                  this.selectedTrItem = {};
                  this.successSaved();
                  this.$router.push("/letter/sent");
                }
              })
              .catch((e) => {
              })
              .finally((e) => {
                this.loaderButton = false;
              });
        } else {
          showMsgError(this.$t("error_send"));
        }
      }
    },
    sendItem(item) {
      if (item.signerId) {
        this.currentItem = item;
        this.sendModal = true;

        setTimeout(() => {
          this.$refs.sendRef.asyncValue_3(item);
        }, 300);
      } else {
        showMsgError(this.$t("warning.notSelectedSigner"));
      }
    },
    save() {
      if (!this.$refs.addRef.checkValidity()) {
        Service.upload(this.$refs.addRef.form)
            .then((rs) => {
              if (rs.data) {
                this.getList();
                // let routeData = this.$router.resolve({
                //   name: "Office-DOCUMENT",
                //   query: { page: "GET", id: enc(rs.data.id) },
                // });
                // window.open(routeData.href, "_blank");
                this.isModal = false;
              }
            })
            .catch((e) => {
            });
      } else {
        this.enterInfo();
      }
    },
    add() {
      this.isModal = true;
    },
    getList() {
      this.loading = true;
      Service.getListLetter(this.params)
          .then(({ data }) => {
            this.list = data.list;
            this.total = data.total;
          })
          .catch((err) => {
            // this.catchErr(err);
          })
          .finally(() => {
            this.loading = false;
          });
    },
  },
};
</script>

<template>
  <!-- <Layout> -->
  <div>
    <ModalPdf
        :hideBackDrop="true"
        :scroll="true"
        :hasOkButton="false"
        :value="viewModal"
        @closeModal="
          () => {
            viewModal = false;
          }
        "
        :title="selectedTrItem.fileName"
        :cancelText="'actions.close'"
        ref="viewModalRef"
        :size="'xl'"
    >
      <template v-slot:body>
        <div style="min-height: 400px">
          <b-overlay :show="loader" rounded="sm" opacity="0.1">
            <embed
                style="width: 100%"
                :style="`min-height:${heightWindow - 250}px`"
                v-if="base64"
                :src="`data:application/pdf;base64, ${base64}`"
            />
          </b-overlay>
        </div>
      </template>
    </ModalPdf>

    <Modal
        :scroll="true"
        :variantOk="'success'"
        :value="editModal"
        @okModal="okModal"
        @signerSet="signerSet"
        @closeModal="editModal = false"
        :title="selectedTrItem.fileName"
        :cancelText="'actions.cancel'"
        @viewModalClick="viewModalClick"
        :okText="'actions.save'"
        ref="editModalRef"
        :size="'xl'"
    >
      <template v-slot:body>
        <div>
          <Editor ref="editorRef" @changeText="changeText"/>
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
      <div style="height: 700px" v-if="ilovaUploadPath">
        <embed
            width="100%"
            height="800"
            :src="`${baseUrl}/${ilovaUploadPath}`"
            type="application/pdf"
        />
      </div>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="viewIlovaModal = false">{{
            $t("actions.close")
          }}
        </b-button>
      </template>
    </b-modal>

    <b-modal
        v-model="sendModal"
        scrollable
        :no-close-on-backdrop="true"
        size="xl"
        id="doc-create-modal"
        :title="`${$t('send_doc')}`"
    >
      <Send ref="sendRef"/>

      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="sendModal = false">
          {{ $t("actions.cancel") }}
        </b-button
        >
        <b-button variant="success" @click="sendAndSave">
          <b-overlay :opacity="0.1" :show="loaderButton" rounded="sm">
            {{ $t("send_doc") }}
          </b-overlay>
        </b-button
        >
      </template>
    </b-modal>
    <b-modal
        v-model="isModal"
        hide-header
        hide-footer
        size="xl"
        id="doc-create-modal"
        :title="`${$t('actions.createNewDoc')}`"
    >
      <Add @save="save" ref="addRef"/>
    </b-modal>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-sm-4">
                <div class="d-inline-block">
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
                  <b-button
                      @click.prevent="add"
                      type="button"
                      variant="primary"
                  >
                    <i class="mdi mdi-plus mr-1"></i>
                    {{ $t("actions.createNewDoc") }}
                  </b-button>
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
                  <table
                      class="
                        table
                        table-centered
                        table-striped
                        table-nowrap
                        table-hover
                      "
                  >
                    <thead class="thead-light">
                    <tr>
                      <th
                          scope="col"
                          class="text-center"
                          style="width: 70px"
                      >
                        №
                      </th>
                      <th class="text-center" scope="col">
                        {{ $t("docName") }}
                      </th>
                      <th class="text-center" scope="col">
                        {{ $t("docNumber") }}
                      </th>

                      <!-- <th class="text-center" scope="col">
                        {{ $t("document.type") }}
                      </th> -->

                      <th scope="col" class="text-center">
                        {{ $t("document.status") }}
                      </th>

                      <!-- <th
                        style="width: 10%"
                        scope="col"
                        class="text-center"
                      >
                        {{ $t("actions.title") }}
                      </th> -->
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center" v-if="list.length == 0">
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
                        :class="
                            selectedTrItem.id == item.id
                              ? 'bg-soft-primary text-primary'
                              : ''
                          "
                    >
                      <td class="text-center">
                        <strong>
                          {{ paginate(index, limit, page - 1) }}</strong
                        >
                      </td>
                      <td class="text-center">
                        <p class="pre m-0">{{ item.fileName }}</p>
                      </td>
                      <td class="text-center">{{ item.regNumber }}</td>
                      <!-- <td class="text-center">
                        {{
                          g_name({
                            nameRu: item.docTypeNameRu,
                            nameLt: item.docTypeNameLt,
                          })
                        }}
                      </td> -->
                      <td class="text-center">
                        <b-badge
                            class="p-1"
                            v-if="item.status"
                            variant="primary"
                        >
                          {{ $t(`docs.${item.status}`) }}
                        </b-badge>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </b-overlay>
              </div>
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
            </div>
          </div>

          <div class="col-5">
            <div class="card card-body">
              <table class="table m-0">
                <tbody>
                <tr>
                  <td class="text-muted">
                    <b>
                      {{ $t("docNumber") }}
                    </b>
                  </td>
                  <td>
                    {{
                      selectedTrItem.id && selectedTrItem.regNumber
                          ? selectedTrItem.regNumber
                          : ""
                    }}
                  </td>
                </tr>
                <tr>
                  <td class="text-muted" style="width: 35%">
                    <b>
                      {{ $t("docName") }}
                    </b>
                  </td>
                  <td>
                    {{
                      selectedTrItem.id && selectedTrItem.fileName
                          ? selectedTrItem.fileName
                          : ""
                    }}
                  </td>
                </tr>
                <tr>
                  <td class="text-muted">
                    <b>
                      {{ $t("docCreatedDate") }}
                    </b>
                  </td>
                  <td>
                    {{
                      selectedTrItem.id && selectedTrItem.createdDate
                          ? new Date(
                              selectedTrItem.createdDate
                          ).ddmmyyyyhhmmss()
                          : ""
                    }}
                  </td>
                </tr>

                <tr v-if="selectedTrItem.id">
                  <td colspan="2" class="text-muted text-center p-0">
                    <div class="mt-4">
                      <b-button
                          variant="success"
                          @click="sendItem(selectedTrItem)"
                      >
                        <i class="fa fa-share"></i>

                        {{ $t("send_doc") }}
                      </b-button>
                      <b-button
                          variant="light"
                          class="ml-2"
                          @click="editLetter(selectedTrItem)"
                      >
                        <i class="fa fa-pencil-alt"></i>
                        {{ $t("actions.edit") }}
                      </b-button>

                      <b-button
                          variant="primary"
                          class="ml-2"
                          @click="viewLetter(selectedTrItem)"
                      >
                        <i class="fa fa-eye"></i>
                        {{ $t("actions.view") }}
                      </b-button>
                    </div>
                    <div>
                      <b-form-file
                          ref="fileRef"
                          v-model="file"
                          style="display: none"
                      ></b-form-file>
                      <b-button
                          variant="primary"
                          @click="fileUpload"
                          class="mt-2 mb-2"
                      >
                        <i class="bx bx-upload"></i>
                        {{ $t("actions.ilovaBiriktirish") }}
                      </b-button>

                      <b-button
                          @click="deleteLetter"
                          class="ml-2"
                          variant="danger"
                      >
                        <i class="bx bx-trash"></i>
                        {{ $t("actions.delete") }}
                      </b-button>
                    </div>
                  </td>
                </tr>

                <tr
                    class="mt-3"
                    v-for="(item, index) in filesList"
                    :key="index + 'FILE'"
                >
                  <td class="p-2" colspan="2">
                    <div
                        class="
                            d-flex
                            align-items-center
                            bg-light
                            p-2
                            justify-content-between
                          "
                    >
                      <div class="d-flex align-items-center">
                        <a
                            @click="viewIlova(item.uploadPath)"
                            :download="
                                getExt(item.uploadPath) == 'PDF' ||
                                getExt(item.uploadPath) == 'pdf'
                                  ? false
                                  : item.uploadPath
                              "
                            :href="
                                getExt(item.uploadPath) == 'PDF' ||
                                getExt(item.uploadPath) == 'pdf'
                                  ? `#`
                                  : `${baseUrl}/${item.uploadPath}`
                              "
                        >
                          <FileView
                              class="my-card-hovered"
                              :uploadPath="item.fileName"
                          />
                        </a>
                        <span class="ml-2">
                              {{ item.fileName }}
                            </span>
                      </div>

                      <b-button
                          @click="removeFile(item)"
                          class="mr-3"
                          variant="light"
                          size="sm"
                      >
                        <i class="fa fa-times"></i>
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
  <!-- </Layout> -->
</template>
<style lang="scss">
@media (min-width: 992px) {
  #widthM .modal-xl {
    max-width: 90% !important;
  }
}
</style>
