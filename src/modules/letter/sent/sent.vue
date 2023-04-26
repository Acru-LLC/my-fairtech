<script>
// import Layout from "@/router/layouts/main";
// import PageHeader from "@/components/page-header";

import Service from "../letterService";
/**
 * Products-order component
 */
import Receivers from "../income/receivers.vue";
import Editor from "../create/froal.editor.vue";
import Modal from "../create/modal.vue";

export default {
  components: {
    // Layout, 
    // PageHeader, 
    Receivers,
    Editor,
    Modal
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
      filesList: [],
      viewModal: false,
      selectedTrItem: {},
      active: "",
      sendTypeList: [
        {
          label: this.$t("forSignature"),
          value: "Signature",
        },
        {
          label: this.$t("forAgreement"),
          value: "Agreement",
        },
        {
          label: this.$t("forReview"),
          value: "Review",
        },
      ],
      title: this.$t("sended"),
      items: [
        {
          text: this.$t("menu"),
          href: "/",
        },
        {
          text: this.$t("sended"),
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
      isModalKeys: false,
      loaderReceiver: false,
      infoData: {},
      ilovaUploadPath: null,
      viewIlovaModal: false,
      viewModalBeforeSigned: false,
      loaderPdf: false,
      src: null,
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
    okModal() {
      let text = this.$refs.editorRef.text;
      this.$refs.editModalRef.loading(true);
      Service.saveLetterBody(this.selectedTrItem.id, text)
          .then(() => {
            let tempData = this.selectedTrItem;
            this.successEdited();
            this.getList();
            this.editModal = false;
            setTimeout(() => {
              let newdata = this.list.find((e) => e.id == tempData.id);
              this.selectedTrItem = newdata;
              this.$forceUpdate();
              this.getReceivers(this.selectedTrItem);
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
      this.viewModalBeforeSigned = true;
      this.loaderPdf = true;
      this.base64 = null;

      Service.convert(this.contextText)
          .then((res) => {
            setTimeout(() => {
              this.base64 = res.data;
              this.loader = false;
            }, 400);
          })
          .finally(() => {
            this.loaderPdf = false;
            this.$refs.editModalRef.loadingPdf(false);
          });
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
      Service.getByIdLetter(this.selectedTrItem.id)
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
      Service.viewPdfByLetterId(this.selectedTrItem.id)
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
      this.viewLetter();
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
    getAttachedFilesById(id) {
      Service.getAttachedFilesById(id).then((res) => {
        this.filesList = res.data;
      });
    },
    viewDocSigned() {
      this.viewModal = true;
    },
    clickTrItem(item) {
      if (this.selectedTrItem.id === item.id) {
        this.selectedTrItem = {};
        this.infoData = {};
      } else {
        this.selectedTrItem = item;
        this.getAttachedFilesById(item.letterId);
        this.getReceivers(item);
      }
    },
    signatureItem() {
      this.isModalKeys = true;
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
    changeText(text) {
      this.contextText = text;
    },
    getList() {
      this.loading = true;
      Service.getListLetterSend(this.params)
          .then(({data}) => {
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
    <div class="col-md-12 text-center">
      <div class="h4 mb-4 d-inline-block">{{ $t('submodules.reports.report_sended') }}</div>
    </div>
    <Modal
        ref="editModalRef"
        :size="'xl'"
        :value="editModal"
        :title="selectedTrItem.fileName"
        :scroll="true"
        :okText="'actions.save'"
        :variantOk="'success'"
        :cancelText="'actions.cancel'"
        :signerHide="false"
        @okModal="okModal"
        @closeModal="editModal = false"
        @viewModalClick="viewModalClick"
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
    <!-- doc view before sign -->
    <b-modal
        scrollable
        v-model="viewModalBeforeSigned"
        size="xl"
        :title="selectedTrItem.id ? selectedTrItem.fileName : ''"
    >
      <b-overlay variant="white" :opacity="1" :show="loaderPdf" rounded="lg">
        <div style="min-height: 700px">
          <embed
              v-if="base64"
              width="100%"
              :style="`min-height:${heightWindow - 250}px`"
              :src="`data:application/pdf;base64, ${base64}`"
              type="application/pdf"
          />
        </div>
      </b-overlay>

      <template v-slot:modal-footer>
        <b-button
            variant="secondary"
            @click="viewModalBeforeSigned = false"
        >
          {{ $t("actions.close") }}
        </b-button>
      </template>
    </b-modal>
    <!-- for view document -->
    <b-modal
        scrollable
        v-model="viewModal"
        size="xl"
        :title="selectedTrItem.id ? selectedTrItem.fileName : ''"
    >
      <div style="height: 700px" v-if="selectedTrItem.url">
        <embed
            width="100%"
            height="800"
            :src="`${baseUrl}/${selectedTrItem.url}`"
            type="application/pdf"
        />
      </div>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="viewModal = false">{{
            $t("actions.close")
          }}
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
                  <div class="mr-3 float-right"></div>
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
                  <table class=" table table-centered table-striped table-nowrap table-hover ">
                    <thead class="thead-light">
                    <tr>
                      <th scope="col" class="text-center" style="width: 70px">
                        №
                      </th>
                      <th class="text-center" scope="col">
                        {{ $t("column.created_by") }}
                      </th>
                      <th class="text-center" scope="col">
                        {{ $t("docDate") }}
                      </th>
                      <th class="text-center" scope="col">
                        {{ $t("docName") }}
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center" v-if="list.length === 0">
                      <td colspan="9" :style="loading ? 'height:50px' : ''" style="vertical-align: middle" >
                        <h5>
                          {{ $t("messages.data_not_found") }}
                        </h5>
                      </td>
                    </tr>
                    <tr
                        :class="
                            selectedTrItem.id === item.id
                              ? 'bg-soft-primary text-primary'
                              : item.status === 'CANCELED'
                              ? 'bg-soft-danger'
                              : ''
                          "
                        class="p_cursor"
                        @click.prevent="clickTrItem(item)"
                        v-for="(item, index) in list"
                        :key="index + 'CREATE_DOC'"
                    >
                      <td class="text-center">
                        <strong>
                          {{ paginate(index, limit, page - 1) }}</strong
                        >
                      </td>
                      <td class="text-center">
                        {{ item.ownerLastName ? item.ownerLastName : '' }}
                        {{ item.ownerFirstName ? item.ownerFirstName : '' }}
                        {{ item.ownerParentName ? item.ownerParentName : '' }}
                      </td>
                      <td class="text-center">
                        {{ item.date }}
                      </td>
                      <td class="text-center">
                        <p class="pre m-0">{{ item.fileName }}</p>
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
              <table class="table m-0">
                <tbody>
                <tr v-if="selectedTrItem.id">
                  <td colspan="2" class="text-muted text-center p-0">
                    <div class="p-4">
                      <b-button
                          v-if=" selectedTrItem.status === 'SIGNED' || selectedTrItem.status === 'CANCELED'"
                          @click="viewIlova(selectedTrItem)"
                          variant="primary"
                      >
                        <i class="fa fa-eye mr-1"></i>
                        {{ $t("actions.view") }}
                      </b-button>

                      <div v-else>
                        <b-button
                            v-if="selectedTrItem.fileType === 'pdf'"
                            variant="primary"
                            class="ml-1"
                            @click="viewIlova(selectedTrItem)"
                        >
                          <i class="fa fa-eye"></i>
                          {{ $t("actions.view") }}
                        </b-button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="text-muted">
                    <b>
                      {{ $t("docName") }}
                    </b>
                  </td>
                  <td>
                    {{ selectedTrItem.id && selectedTrItem.fileName ? selectedTrItem.fileName : "" }}
                  </td>
                </tr>
                <tr>
                  <td class="text-muted">
                    <b>
                      {{ $t("docCreatedDate") }}
                    </b>
                  </td>
                  <td>
                    {{ selectedTrItem.id && selectedTrItem.created ? selectedTrItem.created : "" }}
                  </td>
                </tr>

                <tr v-if="selectedTrItem.comment">
                  <td class="text-muted">
                    <b>
                      {{ $t("column.comment") }}
                    </b>
                  </td>
                  <td>
                    {{ selectedTrItem.comment }}
                  </td>
                </tr>
                <tr v-if="selectedTrItem.isForCommission">
                  <td colspan="2">
                    <div class="p-2 bg-gradient bg-info rounded text-white">
                      {{ $t("submodules.commission.doc_status.send_for_commission") }}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td class="text-muted">
                    <b>{{ $t("whoSent") }}</b>
                  </td>
                  <td class="pl-0">
                    <ul v-if="selectedTrItem.id" id="il" class="list-unstyled chat-list" >
                      <li>
                        <div class="media d-flex" style="align-items: center" >
                          <div class="align-self-center mr-3"></div>
                          <div class="align-self-center mr-3" v-if="selectedTrItem.ownerUploadPath" >
                            <img
                                height="auto"
                                :src="`${hrUrl}/${selectedTrItem.ownerUploadPath}`"
                                class="rounded-circle avatar-sm"
                                alt
                            />
                          </div>
                          <div class="avatar-sm align-self-center mr-3" v-if="!selectedTrItem.ownerUploadPath" >
                            <span class=" avatar-title rounded-circle bg-soft-primary text-white ">
                              {{ selectedTrItem.ownerFirstName.charAt(0) }}
                            </span>
                          </div>

                          <div class="media-body overflow-hidden">
                            <h5 class="font-size-14 mb-1">
                              {{
                                `${selectedTrItem.ownerLastName} ${selectedTrItem.ownerFirstName} ${selectedTrItem.ownerParentName}`
                              }}
                            </h5>
                            <p class="m-0">
                              {{
                                getName({
                                  nameLt: selectedTrItem.depNameLt,
                                  nameRu: selectedTrItem.depNameRu,
                                  nameUz: selectedTrItem.depNameUz,
                                })
                              }}
                            </p>
                            <p class="m-0">
                              {{
                                getName({
                                  nameLt: selectedTrItem.positionNameLt,
                                  nameRu: selectedTrItem.positionNameRu,
                                  nameUz: selectedTrItem.positionNameUz,
                                })
                              }}
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr v-if="filesList.length > 0">
                  <td class="text-muted" colspan="2">
                    <b>{{ $t("letter_ilovalar") }}</b>
                  </td>
                </tr>
                <tr class="mt-3" v-for="(item, index) in filesList" :key="index + 'FILE'">
                  <td class="p-2" colspan="2">
                    <div class=" d-flex align-items-center bg-light p-2 justify-content-between ">
                      <div class="d-flex align-items-center">
                        <a
                            @click="viewIlova(item)"
                            :download="getExt(item.uploadPath) === 'pdf' ? false : item.uploadPath"
                            :href="getExt(item.uploadPath) === 'pdf' ? `#` : `${baseUrl}/${item.uploadPath}`"
                        >
                          <FileView class="my-card-hovered" :uploadPath="item.fileName"/>
                        </a>
                        <span class="ml-2"> {{ item.fileName }} </span>
                      </div>
                      <a
                          download
                          :href="`${baseUrl}/${item.uploadPath}`"
                          class="mr-3 p-1 btn btn-sm btn-light"
                      >
                        <i class="bx bx-download font-size-20"></i>
                      </a>
                    </div>
                  </td>
                </tr>
                <tr v-if="infoData&&infoData.review&&infoData.agreement&&infoData.signature">
                  <td class="text-center pt-5 pb-0" colspan="2">
                    <b>{{ $t("qabulQiluvchilar") }}</b>
                  </td>
                  <td></td>
                </tr>
                </tbody>
              </table>
              <b-overlay :opacity="0.1" :show="loaderReceiver" rounded="sm">
                <Receivers
                    :selectedReview="infoData.review"
                    :selectedAgreement="infoData.agreement"
                    :selectedSignature="infoData.signature"
                />
              </b-overlay>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </Layout> -->
</template>

<style>
.bg-class {
  background-color: #fbfbfb !important;
}
</style>