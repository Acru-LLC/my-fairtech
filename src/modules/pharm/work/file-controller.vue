<template>
  <div class="card">
    <div class="card-body">
<!--      <div>status: {{ project.status }}</div>-->
<!--      <div>returnType: {{ project.returnType }}</div>-->
<!--      <div>projectType: {{ project.projectType }}</div>-->
<!--      <div>applicationType: {{ project.applicationType }}</div>-->
      <h4 class="card-title mb-4">{{ $t("documents") }}</h4>
      <simplebar
          id="doc-list"
          ref="docsRef"
          style="max-height: 300px"
      >
        <div class="table-responsive mb-0">
          <table style="table-layout: fixed; width: 100%" class="table table-centered table-hover">
            <tbody>
            <tr v-for="(doc, index) in docs" :key="index">
              <td style="width: 32px">
                <a
                    @click="viewFile(doc.letter.url)"
                    :download="getExt(doc.letter.url) === 'pdf' ? false : doc.letter.url"
                    :href="getExt(doc.letter.url) === 'pdf' ? `#` : `${baseUrl}/${doc.letter.url}`"
                >
                  <FileView class="my-card-hovered" :uploadPath="doc.letter.url"/>
                </a>
              </td>
              <td style="width: 60%">
                <h5 class="font-size-14 m-0">
                  <div class="text-dark m-0 pre">{{ doc.letter.fileName }}</div>
                </h5>
                <small>
                  <span class="mr-1 text-muted">{{ $t("column.created_date") }}:</span>
                  <span class="text-dark">{{ doc.letter.created }}</span>
                </small>
                <small
                    class="d-block text-muted"
                    v-if="
                      !_empty(doc.letter.employeeLastName) &&
                      !_empty(doc.letter.employeeFirstName) &&
                      !_empty(doc.letter.employeeParentName)
                    "
                >
                  <span class="mr-1">{{ $t("byCreated") }}:</span>
                  <span class="text-dark">
                    {{
                      `${doc.letter.employeeLastName} ${doc.letter.employeeFirstName} ${doc.letter.employeeParentName}`
                    }}
                  </span>
                </small>
              </td>
              <td style="width: 45px">
                <div
                    class="text-center"
                    v-if="project.status !== 'FINISHED' && (doc.letter.fileType && doc.letter.fileType.toLowerCase() !== 'pdf')"
                >
                  <router-link
                      :to="{ name: 'Office-DOCUMENT-commission', query: { id: doc.letter.id, page: 'GET' }, }"
                      class="text-dark"
                      target="_blank"
                  >
                    <i class="bx bx-edit h3 m-0"></i>
                  </router-link>
                </div>
                <b-button
                    v-if="doc.signatory?.length > 0 && doc.letter.willBeSigned && doc.letter.isThisEmployeeSigned === false && ['LETTER_INVOKE'].indexOf(doc.letter.letterType) === -1"
                    v-b-tooltip.hover
                    class="text-center cursor-pointer p-1"
                    title="Imzolash uchun"
                    variant="light"
                    size="sm"
                    @click="$router.push(`/projects/sign/${doc.letter.id}`)"
                >
                  <i class="fas fa-file-signature m-2"></i>
                </b-button>
                <div
                    v-if="project.isAdmin &&
                          !['TO_INVOKE_SIGNED', 'SEND_SIGN_FINISH'].includes(doc.letter.status) &&
                          !['TEMPORARILY_CLOSED', 'COMMISSION_REVISION'].includes(project.status) &&
                          doc.letter.letterType === 'LETTER_INVOKE'"
                    class="text-center cursor-pointer"
                    @click="$router.push(`/projects/invoke-letter-sign/${project.id}/${doc.letter.id}`)"
                    v-b-tooltip.hover.right="$t('forSignature')"
                >
                  <i class="fas fa-signature h3 m-0"></i>
                </div>
                <b-button
                    v-if="doc.signatory.length"
                    v-b-tooltip.hover="$t('messages.view_signatories')"
                    :id="`doc-signatory-${index}`"
                    variant="light"
                    size="sm"
                    class="cursor-pointe p-1"
                >
                  <i class="fas fa-eye m-2"></i>
                  <b-popover
                      :target="`doc-signatory-${index}`"
                      triggers="hover focus"
                      placement="bottom"
                  >
                    <table class="table">
                      <tbody>
                      <tr v-for="(signatoryEmployee, signatoryIndex) in doc.signatory" :key="signatoryIndex">
                        <td>{{ signatoryIndex + 1 }}</td>
                        <td>{{ signatoryEmployee.employeeLastName }} {{ signatoryEmployee.employeeFirstName }}
                          {{ signatoryEmployee.employeeMiddleName }}
                          <br>
                          <span v-if="signatoryEmployee.signatoryDate !== null">
                            <div
                                class="font-weight-bold">{{
                                $t('messages.signatory_time') + ':'
                              }}</div>{{ signatoryEmployee.signatoryDate }}
                          </span>
                        </td>
                        <td>
                          <i class="fa p-2 text-white"
                             :class="signatoryEmployee.isSigned ? 'fa-check bg-success' : 'fa-times bg-danger'"/>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </b-popover>
                </b-button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </simplebar>
    </div>
    <b-modal
        scrollable
        v-model="viewFileModal"
        size="xl"
        :title="$t('actions.view')"
    >
      <div style="height: 700px" v-if="fileUploadPath">
        <embed
            width="100%"
            height="800"
            :src="`${baseUrl}/${fileUploadPath}`"
            type="application/pdf"
        />
      </div>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="viewFileModal = false">{{ $t("actions.close") }}</b-button>
      </template>
    </b-modal>
    <b-modal v-model="modal.isDocControlModal" size="md" :title="`${$t('documents')}`">
      <DocsWithIcons
          ref="docsWithIconsRef"
          :modal="modal"
          :projectStatus="project.status"
          :applicationType="project.applicationType"
      />

      <template v-slot:modal-footer>
        <b-overlay :opacity="0.1" :show="loaderDoc" rounded="sm" size="sm">
          <b-button variant="success" @click="saveDocs">{{ $t("actions.save") }}</b-button>
        </b-overlay>
      </template>
    </b-modal>
    <div
        class="p-3"
        v-if="(['FINISHED', 'REVIEW_FINISHED','TEMPORARILY_CLOSED'].indexOf(project.status)  === -1)
           || (project.applicationType === 'FROM_DXA' && project.status !== 'REVIEW_FINISHED')
           || (project.projectType === 'COMMISSION' && project.status === 'FINISHED' && project.applicationDto.applicationStatus === 'COMMISSION_SEEN')"
    >
      <form>
        <div v-if="project.applicationType === 'FROM_DXA'">
          <div v-if="canCreateDoc && project.projectType === 'COMMISSION'">
            <b-button
                @click.prevent="clickUpload" variant="primary" block
                v-if="(['COMMISSION_REVISION'].indexOf(project.status) !== -1)"
            >
              <i class="mdi mdi-file-document-outline d-block font-size-16"></i>
              {{ $t("actions.create_new_document") }}
            </b-button>
          </div>
          <div v-else-if="canCreateDoc && project.projectType === 'BEFORE_COMMISSION'">
            <b-button
                @click.prevent="clickUpload" variant="primary" block
                v-if="(['REVISION_AFTER_COMMISSION', 'CREATED'].indexOf(project.status) !== -1)"
            >
              <i class="mdi mdi-file-document-outline d-block font-size-16"></i>
              {{ $t("actions.create_new_document") }}
            </b-button>
          </div>
          <div v-else-if="canCreateDoc">
            <b-button
                @click.prevent="clickUpload" variant="primary" block
                v-if="(['FOR_PROCESS', 'FOR_COMMISSION'].indexOf(project.returnType) !== -1)"
            >
              <i class="mdi mdi-file-document-outline d-block font-size-16"></i>
              {{ $t("actions.create_new_document") }}
            </b-button>
          </div>
        </div>
        <div v-else-if="project.applicationType === 'INNER'">
          <div v-if="isCommission">
            <b-button-group class="btn-block">
              <b-button
                  @click.prevent="handleUploadToReturn('LETTER_FINISH');"
                  variant="primary"
                  v-if="['FOR_FINISH_WORK'].indexOf(project.returnType) !== -1 && project.applicationDto.applicationStatus === 'COMMISSION_SEEN'"
              >
                <i class="mdi mdi-file-document-outline d-block font-size-16"></i>
                {{ $t("submodules.commission.doc_button.create_letter") }}
              </b-button>
              <!-- Ishni tugatish-->
              <b-button
                  @click.prevent="handleUploadToReturn('FOR_FINISH_WORK');"
                  variant="primary"
                  v-if="canCreateDoc && (['FOR_PROCESS', 'FOR_FINISH_WORK'].indexOf(project.returnType) !== -1)"
              >
                <i class="mdi mdi-file-document-outline d-block font-size-16"></i>
                {{ $t("submodules.commission.doc_button.finish_work") }}
              </b-button>
              <!-- Chaqiruv xati -->
              <b-button
                  @click.prevent="handleUploadToReturn('LETTER_INVOKE');"
                  variant="success"
                  v-if="(['CREATED', 'CANCELLED_TO_DEFECT_FILES'].indexOf(project.status) !== -1)"
              >
                <i class="mdi mdi-file-document-outline d-block font-size-16"></i>
                {{ $t("submodules.commission.doc_button.invoke_letter") }}
              </b-button>
            </b-button-group>
            <b-button-group class="btn-block">
              <b-button
                  @click.prevent="handleUploadToReturn('FOR_SUSPEND_WORK');"
                  variant="default" style="background-color: #74788d; color: #fff;"
                  v-if="canCreateDoc && (['FOR_PROCESS', 'FOR_SUSPEND_WORK'].indexOf(project.returnType) !== -1)"
              >
                <i class="mdi mdi-file-document-outline d-block font-size-16"></i>
                {{ $t("submodules.commission.doc_button.suspend_work") }}
              </b-button>
              <b-button
                  @click.prevent="handleUploadToReturn('FOR_DELAY_WORK');"
                  variant="default" style="background-color: #858da5; color: #fff;"
                  v-if="canCreateDoc && (['FOR_PROCESS', 'FOR_DELAY_WORK'].indexOf(project.returnType) !== -1)"
              >
                <i class="mdi mdi-file-document-outline d-block font-size-16"></i>
                {{ $t("submodules.commission.doc_button.delay_work") }}
              </b-button>
              <b-button
                  @click.prevent="handleUploadToReturn('FOR_RESUME_WORK');"
                  variant="default" style="background-color: #9bb7dd; color: #fff;"
                  v-if="canCreateDoc && (['FOR_PROCESS', 'FOR_RESUME_WORK'].indexOf(project.returnType) !== -1)"
              >
                <i class="mdi mdi-file-document-outline d-block font-size-16"></i>
                {{ $t("submodules.commission.doc_button.resume_work") }}
              </b-button>
            </b-button-group>
          </div>
          <div v-else>
            <b-button
                @click.prevent="handleUploadToReturn('FOR_COMMISSION');"
                variant="primary"
                block
                v-if="(canCreateDoc && ['FOR_PROCESS', 'FOR_COMMISSION'].indexOf(project.returnType) !== -1) ||
                      (canCreateDoc && ['TEMPORARILY_CLOSED'].indexOf(project.status) !== -1)"
            >
              <i class="mdi mdi-file-document-outline d-block font-size-16"></i>
              {{ $t("actions.create_new_document") }}
            </b-button>
            <b-button-group class="btn-block" v-if="project.status !== 'REVISION'">
              <b-button
                  v-if="canCreateDoc && (['FOR_PROCESS', 'FOR_NOT_COMPLETED'].indexOf(project.returnType) !== -1)"
                  @click.prevent="handleUploadToReturn('FOR_NOT_COMPLETED');"
                  variant="outline-secondary">{{ $t("submodules.commission.letter_not_complete") }}
              </b-button>
              <div v-else-if="(['FOR_NOT_COMPLETED'].indexOf(project.returnType) !== -1)"
                   class="menu-title text-center w-100">
                {{ $t("submodules.commission.to_indicate_that_the_information_is_incomplete") }}
              </div>
              <b-button
                  v-if="canCreateDoc && (['FOR_PROCESS', 'FOR_NOT_BELONG'].indexOf(project.returnType) !== -1)"
                  @click.prevent="handleUploadToReturn('FOR_NOT_BELONG');"
                  variant="outline-info">{{ $t("submodules.commission.letter_not_belong") }}
              </b-button>
              <div v-else-if="(['FOR_NOT_BELONG'].indexOf(project.returnType) !== -1)"
                   class="menu-title text-center w-100">
                {{ $t("submodules.commission.to_determine_that_it_does_not_fall_under_the_authority") }}
              </div>
              <b-button
                  v-if="canCreateDoc && (['FOR_PROCESS', 'FOR_REGION'].indexOf(project.returnType) !== -1)"
                  @click.prevent="handleUploadToReturn('FOR_REGION');"
                  variant="outline-primary">{{ $t("submodules.commission.sent_region") }}
              </b-button>
              <div v-else-if="(['FOR_REGION'].indexOf(project.returnType) !== -1)" class="menu-title text-center w-100">
                {{ $t("submodules.commission.to_sent_to_region") }}
              </div>
            </b-button-group>
          </div>
        </div>
        <div v-else>
          <b-button
              @click.prevent="clickUpload" variant="primary" block
              v-if="(['FOR_PROCESS', 'FOR_COMMISSION'].indexOf(project.returnType) !== -1)"
          >
            <i class="mdi mdi-file-document-outline d-block font-size-16"></i>
            {{ $t("actions.create_new_document") }}
          </b-button>
        </div>
      </form>
    </div>
    <upload-file ref="file" @sendFile="saveFile" :cmt="true"/>
  </div>
</template>

<script>
import projectService from "@/shared/services/projectService";
import simplebar from "simplebar-vue";
import {getFileSize, successSavedDoc} from "@/helper";
import DocsWithIcons from "./docsWithIcons";

export default {
  props: {
    project: {
      type: Object,
      default: () => {
      },
    },
  },
  components: {
    simplebar,
    DocsWithIcons,
  },
  data() {
    return {
      params: {
        page: 0,
        itemsPerPage: 20,
      },
      docs: [],
      filePage: 0,
      getFileSize: getFileSize,
      modal: {
        isDocControlModal: false,
        type: '',
      },
      loaderDoc: false,
      fileUploadPath: null,
      viewFileModal: false,
    }
  },
  created() {
    this.listDocs();
  },
  methods: {
    viewFile(uploadPath) {
      if (this.getExt(uploadPath) === "pdf") {
        this.fileUploadPath = uploadPath;
        this.viewFileModal = true;
      }
    },
    handleUploadToReturn(returnType) {
      this.modal.type = returnType;
      this.modal.isDocControlModal = true;
    },
    saveDocs() {
      let {type, file} = this.$refs.docsWithIconsRef;
      let id = this.$route.query.id;
      let documentName;
      let saveUrl;
      switch (type) {
        case "NOTICE":
          documentName = this.$t('submodules.commission.notice');
          saveUrl = `/project/upload-to-return/${id}`;
          break;
        case "LETTER":
          documentName = this.$t('submodules.application_before_commission.letter');
          saveUrl = `/project/upload/${id}`;
          break;
        case "PROTOCOL":
          documentName = this.$t('column.protocol');
          saveUrl = `/project/upload/${id}`;
          break;
        case "DECISION":
          documentName = this.$t('submodules.application_before_commission.draft_decision');
          saveUrl = `/project/upload/${id}`;
          break;
        case "REFERENCE":
          documentName = this.$t('submodules.application_before_commission.reference');
          saveUrl = `/project/upload-to-return/${id}`;
          break;
        case "OFFER_NOTICE":
          documentName = 'Taklif bildirish';
          saveUrl = `/project/upload/${id}`;
          break;
        case "PROTOCOL_DXA":
          documentName = this.$t('submodules.application_before_commission.protocol');
          saveUrl = `/project/upload/${id}`;
          break;
        case "NOTICE_REGION":
          documentName = this.$t('submodules.commission.notice');
          saveUrl = `/project/upload-to-return/${id}`;
          break;
        case "LETTER_REGION":
          documentName = this.$t('submodules.application_before_commission.letter');
          saveUrl = `/project/upload-to-return/${id}`;
          break;
        case "LETTER_INVOKE":
          documentName = this.$t('submodules.commission.doc_button.invoke_letter');
          saveUrl = `/project/upload-invoke-letter/${id}`;
          break;
        case "LETTER_FINISH":
          documentName = this.$t('submodules.commission.doc_button.letter');
          saveUrl = `/letter/upload-finish-letter/${this.project.applicationDto.id}`;
          break;
        case "PROTOCOL_DELAY":
          documentName = this.$t('submodules.commission.doc_button.protocol');
          saveUrl = `/project/upload-to-return/${id}`;
          break;
        case "PROTOCOL_RESUME":
          documentName = this.$t('submodules.commission.doc_button.protocol');
          saveUrl = `/project/upload-to-return/${id}`;
          break;
        case "PROTOCOL_SUSPEND":
          documentName = this.$t('submodules.commission.doc_button.protocol');
          saveUrl = `/project/upload-to-return/${id}`;
          break;
        case "NOTICE_NOT_BELONG":
          documentName = this.$t('submodules.commission.notice');
          saveUrl = `/project/upload-to-return/${id}`;
          break;
        case "LETTER_NOT_BELONG":
          documentName = this.$t('submodules.application_before_commission.letter');
          saveUrl = `/project/upload-to-return/${id}`;
          break;
        case "PROTOCOL_COMMISSION":
          documentName = this.$t('submodules.commission.doc_button.protocol');
          saveUrl = `/project/upload-to-return/${id}`;
          break;
        case "DECISION_COMMISSION":
          documentName = this.$t('submodules.commission.doc_button.decision');
          saveUrl = `/project/upload-to-return/${id}`;
          break;
        case "COMPROMISE_DECISION":
          documentName = this.$t('submodules.commission.compromise_decision');
          saveUrl = `/project/upload-to-return/${id}`;
          break;
        case "NOTICE_NOT_COMPLETED":
          documentName = this.$t('submodules.commission.notice');
          saveUrl = `/project/upload-to-return/${id}`;
          break;
        case "LETTER_NOT_COMPLETED":
          documentName = this.$t('submodules.application_before_commission.letter');
          saveUrl = `/project/upload-to-return/${id}`;
          break;
        case "PRESCRIPTION_COMMISSION":
          documentName = this.$t('submodules.commission.doc_button.prescription');
          saveUrl = `/project/upload-to-return/${id}`;
          break;
        case "COMPROMISE_DECISION_DELAY":
          documentName = this.$t('submodules.commission.doc_button.compromise');
          saveUrl = `/project/upload-to-return/${id}`;
          break;
        case "COMPROMISE_DECISION_RESUME":
          documentName = this.$t('submodules.commission.doc_button.compromise');
          saveUrl = `/project/upload-to-return/${id}`;
          break;
        case "COMPROMISE_DECISION_SUSPEND":
          documentName = this.$t('submodules.commission.doc_button.compromise');
          saveUrl = `/project/upload-to-return/${id}`;
          break;
      }
      if (type && id && saveUrl) {
        this.loaderDoc = true;
        projectService
            .saveDoc(saveUrl, 'docx', file, type, documentName)
            .then((rs) => {
              if (rs.data) {
                this.listDocs();
                this.$emit('get-project-by-id');
                this.modal.isDocControlModal = false;
                successSavedDoc();
                let routeData = this.$router.resolve({
                  name: "Office-DOCUMENT-commission",
                  query: {id: rs.data.id, page: "GET"},
                });
                // ? Organishim kerak
                window.open(routeData.href, "_blank");
              }
            })
            .catch((e) => {
              // this.catchErr(e);
            })
            .finally(() => {
              setTimeout(() => {
                this.loaderDoc = false;
              }, 500);
            });
      }
    },
    saveFile(msg, file) {
      this.leaveFile(msg, file);
    },
    clickUpload() {
      this.modal.isDocControlModal = true;
      this.modal.type = 'OFFER_NOTICE';
      //   this.$refs.file.upld();
    },
    leaveFile(msg, cmt) {
      let id = this.$route.query.id;
      if (id) {
        projectService
            .leaveFile(id, msg, cmt)
            .then((rs) => {
              this.file = null;
              setTimeout(() => {
                this.listDocs();
              }, 300);
            })
            .catch((err) => {
              // this.catchErr(err);
            });
      } else {
        this.$router.go(-1);
      }
    },
    listDocs() {
      let id = this.$route.query.id;
      if (id) {
        projectService
            .listDocsWithSignatoryService(id, this.params)
            .then((rs) => {
              this.docs = rs.data;
              this.handleScroll();
            })
            .catch((err) => {
              // this.catchErr(err);
            });
      } else {
        this.$router.go(-1);
      }
    },
    loadMoreDocs(page) {
      let id = this.$route.query.id;
      if (id) {
        projectService
            .listDocsService(id, {
              page: page,
              itemsPerPage: 20,
            })
            .then(async ({data}) => {
              if (data.list.length > 0) {
                this.docs = this.docs.concat(data.list);
              } else {
                this.filePage + -1;
              }
            });
      } else {
        this.$router.go(-1);
      }
    },
    handleScroll() {
      if (this.$refs.docsRef.$el) {
        setTimeout(() => {
          this.$refs.docsRef.SimpleBar.getScrollElement().scrollTop = 0;
        }, 500);
      }
    },
  },
  mounted() {
    const container3 = document.querySelector(
        "#doc-list .simplebar-content-wrapper"
    );
    if (container3) {
      container3.scrollTo({top: 500, behavior: "smooth"});
    }
    // Contact list actions
    this.$refs.docsRef.SimpleBar.getScrollElement().addEventListener(
        "scroll",
        (e) => {
          let {scrollTop, scrollHeight, clientHeight} = event.target;
          const offsetForTrigger = 1;
          if (scrollHeight - clientHeight - offsetForTrigger < scrollTop) {
            // this.loadMoreDocs((this.filePage += 1));
          }
        }
    );
  },
  computed: {
    isCommission() {
      return this.$route.name === 'CommissionProjects'
    },
    isRevision() {
      return this.project.status === 'REVISION'
    },
    notPdfDocFilesCount() {
      return this.docs.filter(d => d.letter.fileType.toLowerCase() !== 'pdf').length
    },
    docsWithoutInvokeLatter() {
      return this.docs.filter(d => d.letter.letterType !== 'LETTER_INVOKE' && d.letter.fileType.toLowerCase() !== 'pdf').length
    },
    canCreateDoc() {
      if (this.project.applicationType === "FROM_DXA") {
        switch (this.project.status) {
          case 'CREATED':
            return this.docsWithoutInvokeLatter < 3;
          case 'REVISION_AFTER_COMMISSION':
            return this.notPdfDocFilesCount < 3;
          case 'COMMISSION_REVISION':
            return this.notPdfDocFilesCount < 2;
        }
      }
      if (this.project.applicationType === 'INNER') {
        if (this.isCommission && !this.isRevision) {
          switch (this.project.returnType) {
            case 'FOR_PROCESS':
              return this.docsWithoutInvokeLatter < 3;
          }
        }
      }
      if (this.isCommission && !this.isRevision) {
        switch (this.project.returnType) {
          case 'FOR_FINISH_WORK':
            return this.docsWithoutInvokeLatter < 3;
          case 'FOR_SUSPEND_WORK':
            return this.docsWithoutInvokeLatter < 2;
          case 'FOR_DELAY_WORK':
            return this.docsWithoutInvokeLatter < 2;
          case 'FOR_RESUME_WORK':
            return this.docsWithoutInvokeLatter < 2;
          default:
            return this.docsWithoutInvokeLatter < 1;
        }
      }
      if (this.project.status === "TEMPORARILY_CLOSED" && this.project.applicationType === "INNER") {
        return true;
      }
      if (!this.isCommission && !this.isRevision) {
        switch (this.project.returnType) {
          case 'FOR_COMMISSION':
            return this.notPdfDocFilesCount < 3;
          case 'FOR_NOT_COMPLETED':
            return this.notPdfDocFilesCount < 2;
          case 'FOR_NOT_BELONG':
            return this.notPdfDocFilesCount < 2;
          case 'FOR_REGION':
            return this.notPdfDocFilesCount < 2;
          case 'FOR_PROCESS':
            return this.notPdfDocFilesCount < 3;
          default:
            return this.docs.length < 2;
        }
      }
      if (!this.isCommission && this.isRevision && this.project.status === 'REVISION') {
        return this.notPdfDocFilesCount < 3
      }
      if (!this.isCommission && this.isRevision) {
        return this.notPdfDocFilesCount < 2
      }
      if (this.isCommission && this.isRevision) {
        return this.notPdfDocFilesCount < 1
      }
      return false
    }
  }
};
</script>

<style>
</style>