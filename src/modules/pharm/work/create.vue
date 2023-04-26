<script>
import DatePicker from "vue2-datepicker";

import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import projectService from "@/shared/services/projectService";
import crudAndListsService from "@/shared/services/crud_and_list.service";
import { required } from "vuelidate/lib/validators";
import { g_label, replaceDate } from "@/helper";
/**
 * Projects-create component
 */
import Participants from "@/components/participants";
import Members from "@/components/members";
import i18n from "@/i18n";
import CreateProjectType from "@/modules/references/modules/project-types/components/addUpdate";
import ReferencesService from "@/shared/services/referencesService";

const MAIN_API_URL_FOR_APPLICATION = 'before-commission/application'
const MAIN_API_URL = 'project'
export default {
  page: {
    title: i18n.t("actions.add"),
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {
    CreateProjectType,
    DatePicker,
    PageHeader,
    Members,
    Participants
  },
  validations: {
    project: {
      name: { required },
      start: {},
      end: { required }
    },
  },
  methods: {
    viewIlova(uploadPath) {
      if (this.getExt(uploadPath) === "pdf") {
        this.ilovaUploadPath = uploadPath;
        this.viewIlovaModal = true;
      }
    },
    async getApplicationById(id) {
      await crudAndListsService.getById(MAIN_API_URL_FOR_APPLICATION, id, false)
          .then(res => {
            this.applicationDto = res.data.ApplicationDto
            if (this.applicationDto.type === 'PHYSICAL') {
              this.project.name = `${this.applicationDto.applicantFirstName ? this.applicationDto.applicantFirstName : ''} ${this.applicationDto.applicantSecondName ? this.applicationDto.applicantSecondName : ''} ${this.applicationDto.applicantMiddleName ? this.applicationDto.applicantMiddleName : ''}`
            } else {
              this.project.name = this.applicationDto.senderFullName
            }
            this.project.end = this.applicationDto.completionTime
          })
          .catch(e => {
            console.log(e)
          })
    },
    disableDate(date) {
      const day = new Date(date).getTime();
      const startDay = new Date(replaceDate(this.project.start)).getTime()


      return day <= startDay
    },
    getValue(v) {
      this.project.projectTypeId = v;
    },
    deleteProjectType() {
      this.cnf().then((rs) => {
        if (rs.value) {
          ReferencesService.deleteProjectTypes(this.project.projectTypeId.id)
              .then(() => {
                this.deleteSuccess();
                this.getProjectTypes();
                this.$refs.projetTypesRef.reset();
              })
              .catch((err) => {
                // this.catchErr(err);
              });
        }
      });
    },
    searchItem(q) {
      this.getProjectTypes(q);
    },
    getProjectTypes(q = "") {
      let payload = {
        params: {
          page: 0,
          itemsPerPage: 20,
        },
        search: q,
      };
      ReferencesService.getListProjectTypes(payload)
          .then((rs) => {
            this.projectTypesList = rs.data.list;
          })
          .catch((err) => {
            // this.catchErr(err);
          });
    },
    okModal(b) {
      b.preventDefault();
      if (!this.$refs.addRef.checkValidity()) {
        ReferencesService.createProjectTypes(this.$refs.addRef.form)
            .then(() => {
              this.getProjectTypes();
              this.successSaved();
              this.isModal = false;
            })
            .catch((err) => {
              // this.catchErr(err);
            });
      } else {
        this.enterInfo();
      }
    },
    addPart() {
      this.isSidebar = true;
      this.$refs.partRef.reset();
    },
    asyncValue(v) {
      this.$set(this.project, "employeeIds", v);
    },
    callApi(api, obj, e) {
      api(obj, true)
          .then((rs) => {
            this.loader = true;
            if (this.isForApplication) {
              this.$router.push({ name: 'ProjectsMain' })
            }
            this.$emit("success");
          })
          .catch((err) => {
            // this.catchErr(err);
          })
          .finally(() => {
            this.loader = false;
            if (e) {
              e.target.disabled = false;
            }
          });
    },
    setEditedData(id) {
      projectService
          .getById(id)
          .then((rs) => {
            this.project = { ...rs.data };
            this.$set(this.project, "employeeIds", rs.data.employeesDto);
            this.items[2] = {
              text: this.$t("actions.edit"),
              active: true,
            };
            this.title = this.$t("actions.edit");
          })
          .catch((err) => {
            // this.catchErr(err);
          });
    },
    saveProj(e) {
      if (e) {
        e.preventDefault();
      }
      this.submitted = true;

      this.$v.$touch();
      if (!this.$v.project.$anyError) {
        // let employeeIds = this.project.employeeIds.map((e) => e.employeeId);
        let projectEmployeeDtos = this.project.employeeIds.map(e => {
          return {
            employeeId: e.employeeId,
            mailingPurposeId: e.mailingPurposeId,
            resolution: e.resolution
          }
        })
        if (e) {
          e.target.disabled = true;
        }
        let payload = {
          ...this.project,
          projectEmployeeDtos: projectEmployeeDtos
        };
        if (this.isForApplication) {
          payload.applicationId = this.$route.params.applicationId
        }
        if (this.$route.query.page == "edit") {
          let id = this.$route.query.id;
          if (id) {
            this.callApi(projectService.update, { ...payload, id: id }, e);
          }
        } else {
          if (payload.employeeIds) {
            delete payload.employeeIds
          }
          if (this.$route.params.status == "not_belong") {
            this.callApi(projectService.createNotBelong, payload, e);
          } else {
            this.callApi(projectService.create, payload, e);
          }
        }
      }
    },
  },
  created() {
    // this.getProjectTypes();
    if (this.$route.query.page == "edit") {
      let id = this.$route.query.id;
      if (id) {
        this.setEditedData(id);
      } else {
        this.$router.go(-1);
      }
    } else if (this.isModeCreate) {
      /* crudAndListsService.getEmpty(MAIN_API_URL)
          .then(res => {
              this.editingItem = res.data
          })
          .catch(e => {
              console.log(e)
          }) */
    }
    this.getApplicationById(this.$route.params.applicationId)
  },
  data() {
    return {
      ilovaUploadPath: null,
      viewIlovaModal: false,
      applicationDto: {},
      g_label: g_label,
      projectTypesList: [],
      title: this.$t("actions.add"),
      items: [
        {
          text: this.$t("menu"),
          href: "/",
        },
        {
          text: this.$t("proj"),
          href: "/projects",
        },
        {
          text: this.$t("actions.add"),
          active: true,
        },
      ],
      // dec: dec,
      daterange: "",
      project: {
        name: "",
        description: "",
        start: "",
        end: "",
        employeeIds: []
      },
      editingItem: {},
      submitted: false,
      isSidebar: false,
      isModal: false,
      loader: false,
    };
  },
  /*
  COMPUTED */
  computed: {
    isForApplication() {
      return this.$route.name == 'CreateProjectForApplication'
    },
    isModeCreate() {
      return this.$route.name == 'CreateProjectForApplication'
    }
  }
};
</script>

<template>
  <base-create-or-update-wrapper
      v-if="isForApplication"
      @save="saveProj"
      has-save-suspend
      :custom-title="isModeCreate ? $t('messages.create_project') : $t('actions.update')"
  >
    <div>
      <PageHeader
          v-if="!isForApplication"
          :title="title"
          :items="items"
      />

      <!-- APPLICATION_ATTACHED_FILE VIEW MODAL -->
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

      <b-modal
          :cancel-variant="'outline-danger'"
          :ok-variant="'success'"
          :no-close-on-backdrop="true"
          :ok-title="$t('actions.save')"
          :cancel-title="$t('actions.cancel')"
          @close="showModal = false"
          @cancel="showModal = false"
          @ok="okModal"
          size="md"
          v-model="isModal"
          :title="$t('actions.add')"
      >
        <CreateProjectType ref="addRef"/>
      </b-modal>
      <div class="row">
        <div class="col-lg-12">
          <div :class="isForApplication ? '' : 'card'">
            <div :class="isForApplication ? '' : 'card-body'">
              <h4
                  class="card-title mb-4"
                  v-if="$route.query.page == 'create'"
              >
                {{ $t("actions.create_project") }}
              </h4>
              <form>
                <div class="form-group row mb-4">
                  <label
                      for="projectname"
                      class="col-form-label col-lg-2"
                  >{{
                      $t("projectName")
                    }}</label>
                  <div class="col-lg-10">
                    <input
                        :class="{
                      'is-invalid': submitted && $v.project.name.$error,
                    }"
                        v-model="$v.project.name.$model"
                        id="projectname"
                        name="projectname"
                        type="text"
                        class="form-control"
                    />
                  </div>
                </div>

                <!-- <div class="row mb-3">
                    <label class="mt-2 col-lg-2">{{ $t("projectType") }}</label>
                    <div class="col-lg-6 col-sm-12">
                        <multiselect-customized
                            :submitted="submitted"
                            ref="projetTypesRef"
                            :label="g_label('nameRu', 'nameLt')"
                            :options="projectTypesList"
                            @searchItem="searchItem"
                            @value="getValue"
                        />
                    </div>
                    <div class="col-lg-4 col-sm-12">
                        <b-button-group>
                            <b-button
                                @click="isModal = true"
                                variant="primary"
                            >
                                <i class="bx bx-plus"></i>
                                {{ $t("actions.add") }}
                            </b-button>
                            <b-button
                                @click="deleteProjectType"
                                :disabled="!project.projectTypeId"
                                variant="danger"
                            >
                                <i class="bx bx-trash"></i>
                                {{ $t("actions.delete") }}
                            </b-button>
                        </b-button-group>
                    </div>
                </div> -->

                <div class="form-group row mb-4">
                  <label
                      for="projectdesc"
                      class="col-form-label col-lg-2"
                  >{{
                      $t("dsp")
                    }}</label>
                  <div class="col-lg-10">
                                        <textarea
                                            v-model="project.description"
                                            id="projectdesc"
                                            class="form-control"
                                            rows="5"
                                        ></textarea>
                  </div>
                </div>

                <!-- <div class="form-group row mb-3">
                    <label class="col-lg-2">{{ $t("column.on_date") }}</label>
                    <date-picker
                        format="DD-MM-YYYY"
                        value-type="format"
                        class="col-lg-4"
                        v-model="$v.project.start.$model"
                        :first-day-of-week="1"
                        lang="en"
                        :class="
    submitted && $v.project.start.$anyError ? 'dateClass' : ''
  "
                    ></date-picker>
                </div> -->

                <div class="form-group row mb-3">
                  <label class="col-lg-2">{{ $t("column.finishing_date_new") }}</label>
                  <date-picker
                      v-model="$v.project.end.$model"
                      format="DD-MM-YYYY"
                      :disabled-date="disableDate"
                      value-type="format"
                      class="col-lg-4"
                      :first-day-of-week="1"
                      :disabled="_empty(project.start)"
                      lang="en"
                      :class="
                    submitted && $v.project.end.$anyError ? 'dateClass' : ''
                  "
                  ></date-picker>
                </div>

                <div class="form-group row mb-4">
                  <label class="col-lg-2">{{
                      $t("submodules.employees.working_user_with_project")
                    }}</label>
                  <div class="col-lg-10">
                    <Participants
                        :submitted="submitted"
                        :members="project.employeeIds"
                        @addPart="addPart"
                    />
                  </div>
                </div>

                <!-- <div class="form-group row mb-4">
                    <label
                        for="projectbudget"
                        class="col-form-label col-lg-2"
                    >{{
  $t("budget")
}}</label>
                    <div class="col-lg-4">
                        <input
                            v-model="project.budget"
                            id="projectbudget"
                            name="projectbudget"
                            type="number"
                            class="form-control"
                        />
                    </div>
                </div> -->
              </form>
              <div
                  class="card card-body card-tabs mt-3"
                  style="min-height: 10em; width: 100%"
                  v-if="applicationDto"
              >

                <div class="wrapper">
                  <span CLASS="fromcenter">{{ $t('submodules.doc.application_file') }}</span>
                </div>

                <tr
                    class="mt-3"
                    v-for="(item, index) in applicationDto.allFiles"
                    :key="index + 'FILE'"
                >
                  <div class=" d-flex align-items-center bg-light p-2 justify-content-between ">
                    <div class="d-flex align-items-center">
                      <a
                          @click="viewIlova(item.url)"
                          :download="getExt(item.url)!=='pdf' "
                          :href="getExt(item.url) === 'pdf'? `#`: `${baseUrl}/${item.url}`"
                      >
                        <BaseFileViewer
                            class="my-card-hovered"
                            :uploadPath="item.name"
                        />
                      </a>
                      <span class="ml-2">
                        {{ item.name }}
                      </span>
                    </div>

                    <!-- <b-button
                        @click="removeFile(item)"
                        class="mr-3"
                        variant="light"
                        size="sm"
                    >
                        <i class="fa fa-times"></i>
                    </b-button> -->
                  </div>
                </tr>
                <div
                    class="text-center card mt-3"
                    v-show="!applicationDto.allFiles || applicationDto.allFiles.length <= 0"
                >
                  <h5
                      style="opacity: 0.3"
                      class="p-3"
                  >
                    {{ $t("messages.data_not_found") }}
                  </h5>
                </div>
              </div>
              <div class="row justify-content-end">
                <div class="col-lg-10">
                  <div class="float-left">
                    <b-overlay
                        :opacity="0.1"
                        :show="loader"
                        rounded="sm"
                    >
                      <b-button
                          v-if="!isForApplication"
                          @click.prevent="saveProj"
                          variant="success"
                      >
                        <i class="fa fa-save"></i>
                        {{ $t("actions.save") }}
                      </b-button>
                    </b-overlay>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Back
              v-if="!isForApplication"
              :to="{name: 'ProjectsMain', query: {page: 'list'}}"
          />
        </div>
      </div>
      <b-sidebar
          backdrop-variant="transparent"
          class="sidebar-part"
          shadow
          backdrop
          sidebar-class="p-0"
          :no-header="true"
          right
          v-model="isSidebar"
      >
        <members
            :notIn="false"
            @asyncValue="asyncValue"
            :async="true"
            @cancel="isSidebar = false"
            ref="partRef"
        />
      </b-sidebar>
    </div>
  </base-create-or-update-wrapper>
</template>

<style lang="scss">
.sidebar-part {
  .b-sidebar {
    width: 600px;
    background: white;
  }
}
</style>