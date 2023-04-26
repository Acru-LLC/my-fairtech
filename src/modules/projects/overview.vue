<script>
import ReferencesService from "@/shared/services/referencesService";
import FileController from "@/modules/projects/file-controller";
import projectService from "@/shared/services/projectService";
import Comments from "@/modules/projects/comments";
import PageHeader from "@/components/page-header";
import Members from "@/modules/projects/members";
import Files from "@/modules/projects/files";
import {replaceDate} from "@/helper";
import simplebar from "simplebar-vue";
import {TokenService} from "@/shared/services/storage.service";

export default {
  components: {
    PageHeader,
    Comments,
    Files,
    Members,
    simplebar,
    FileController,
  },
  /*
  COMPUTED */
  computed: {
    projectType() {
      return this.$route.name === 'CommissionProjects' ? 'COMMISSION' : 'BEFORE_COMMISSION'
    },
    isCommission() {
      return this.projectType === 'COMMISSION'
    },
    projectFiles() {
      return this.isCommission ? [...this.proj.applicationDto.allFiles, ...this.proj.applicationDto.letterFiles] : this.proj.applicationDto.allFiles
    },
    isRevision() {
      return this.proj.status === 'REVISION'
    },
    showChangeTermButton() {
      return this.proj.applicationType === 'FROM_DXA' && this.proj.projectType === 'BEFORE_COMMISSION' && this.proj.status === 'CREATED'
    },
    showCloseProjectButton() {
      if (!this.proj?.status) {
        return false;
      }
      return ['REVIEW_FINISHED', 'FINISHED', 'TEMPORARILY_CLOSED', 'RETURN_FOR_REVISION_TO_BEFORE_COMMISSION']
          .indexOf(this.proj.status) === -1;
    },
    showReopenProjectButton() {
      if (!this.proj?.status) {
        return false;
      }
      return this.proj.applicationDto?.projectId &&
          this.proj.status === 'TEMPORARILY_CLOSED' &&
          this.proj.returnType === 'FOR_ACCEPT_REOPEN';
    },
    showOnTemporarilyClosedForNotCompleted() {
      return this.proj.status === 'TEMPORARILY_CLOSED' && this.proj.returnType === 'FOR_NOT_COMPLETED';
    },
    projApplicationDtoApplicationDXATypeName() {
      return this.getName({
        nameUz: this.proj?.applicationDto?.applicationDXATypeNameUz,
        nameLt: this.proj?.applicationDto?.applicationDXATypeNameLt,
        nameRu: this.proj?.applicationDto?.applicationDXATypeNameRu,
      })
    },
    applicationPageType() {
      return TokenService.getApplicationPageType()
    },
  },
  methods: {
    async sendExtended() {
      let obj = {
        decision_text: this.commit,
        extendedDate: this.extendedDate,
      }
      await ReferencesService.extended(obj, {
        id: this.proj.applicationDto.id,
        applicationDxaId: this.proj.applicationDto.applicationDxaId
      })
          .then((res) => {
            this.$toast(this.$t('succes.title'), {type: 'success'});
            this.isCommit = false
          })
          .catch((err) => {
            this.isCommit = false
            console.log(err);
          })
          .finally(() => {
            this.commit = null
          });
    },
    closeIsModal() {
      this.isCommit = false
      this.commit = ''
    },
    changeTerm() {
      this.isCommit = true
    },
    viewIlova(uploadPath) {
      if (this.getExt(uploadPath) === "pdf") {
        this.ilovaUploadPath = uploadPath;
        this.viewIlovaModal = true;
      }
    },
    getTask(grid) {
      this.$router.push({
        name: this.isCommission ? 'CommissionProjects' : 'ProjectsMain',
        query: {page: "tasks", id: this.$route.query.id},
      });
    },
    getById() {
      let id = this.$route.query.id;
      if (id) {
        projectService
            .getById(id, this.projectType, true)
            .then((rs) => {
              this.proj = Object.assign({}, rs.data);
            })
            .catch(() => {
            });
      } else {
        this.$router.go(-1);
      }
    },
    projectReopenApplication() {
      if (this.reopen_application.modal) {
        this.cnf().then(({value}) => {
          if (value) {
            projectService.projectReopenApplication(this.$route.query.id, this.reopen_application.date).then(({data}) => {
              this.forceRouteReload();
            });
          }
        })
      } else {
        this.reopen_application.modal = true;
      }
    },
    random(v) {
      return Math.floor(Math.random() * v);
    },
    async changeStatus(project) {
      await this.$emit('changeStatus', project)
      await this.getById();
      if (this.isCommission) {
        this.items.splice(1, 2,
            ...[
              {
                text: this.$t("submodules.commission.projects_menu_title"),
                href: "/commission",
              },
              {
                text: this.$t('commission_details'),
                active: true,
              }
            ]
        )
        this.title = this.$t('commission_details')
      }
    },
    handleProjectInformationCompleted() {
      this.$emit('handleProjectInformationCompleted', this.proj.id, () => {
        this.forceRouteReload();
      })
    },
  },
  async created() {
    await this.getById();
    if (this.isCommission) {
      this.items.splice(1, 2,
          ...[
            {
              text: this.$t("submodules.commission.projects_menu_title"),
              href: "/commission",
            },
            {
              text: this.$t('commission_details'),
              active: true,
            }
          ]
      )
      this.title = this.$t('commission_details')
    }
  },
  data() {
    return {
      commit: '',
      extendedDate: '',
      isCommit: false,
      ilovaUploadPath: null,
      viewIlovaModal: false,
      modalProjectInformationCompleted: false,
      projectInformationCompletionDate: null,
      replaceDate: replaceDate,
      barChart: [],
      title: this.$t("projDetails"),
      proj: {},
      reopen_application: {
        date: null,
        modal: false,
      },
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
          text: this.$t("projDetails"),
          active: true,
        },
      ],
    };
  },
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items"/>
    <div class="row mb-2">
      <div class="col-12">
        <Back
            :to="{name: isCommission ? 'CommissionProjects' : 'ProjectsMain', query: {page: applicationPageType}}"/>
      </div>
    </div>
    <!-- end row -->
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-4">
            <div class="card grid-card-height">
              <div class="card-body">
                <div class="media">
                  <div class="media-body overflow-hidden">
                    <b-button @click.prevent="getTask" variant="link" class="p-0 float-right">
                      <i class="bx bx-task label-icon"></i>
                      {{ $t("tasks_list") }}
                    </b-button>
                    <h5 class="font-size-15" v-b-popover.bottom.hover :title="proj.name">
                      {{ proj.name }}
                    </h5>
                    <h5 class="text-truncate font-size-13" v-b-popover.bottom.hover :title="getName(proj)">
                      {{ getName(proj) }}
                    </h5>
                    <span
                        class="badge"
                        :class="{
                        'badge-primary': `${proj.status}` === 'CREATED',
                        'badge-success': `${proj.status}` === 'FINISHED',
                      }"
                    >{{ $t(proj.status) }}</span>
                  </div>
                </div>
                <b-row v-if="proj.applicationType === 'FROM_DXA' || proj.applicationType === 'NOT_BELONG'">
                  <b-col cols="6" v-if="proj.applicationDto.applicationDXARegNumber">
                    {{ $t('submodules.commission.dxa_reg_number') }}
                    <p class="text-muted">{{ proj.applicationDto.applicationDXARegNumber }}</p>
                  </b-col>
                  <b-col cols="6" v-if="proj.applicationDto.applicationInnerInputRegNumber">
                    {{ $t('submodules.commission.inner_input_reg_number') }}
                    <p class="text-muted">{{ proj.applicationDto.applicationInnerInputRegNumber }}</p>
                  </b-col>
                  <b-col cols="12" v-if="proj.applicationDto.contractorNameFromDXA">
                    {{ $t('column.business_entity') }}
                    <p class="text-muted">{{ proj.applicationDto.contractorNameFromDXA }}</p>
                  </b-col>
                  <b-col cols="12" v-if="projApplicationDtoApplicationDXATypeName">
                    {{ $t('submodules.dxa.application_type') }}
                    <p class="text-muted">{{ projApplicationDtoApplicationDXATypeName }}</p>
                  </b-col>
                </b-row>
                <b-row v-else-if="proj.applicationType === 'INNER'">
                  <b-col cols="6" v-if="proj.applicationDto.applicationInnerInputRegNumber">
                    {{ $t('submodules.commission.inner_input_reg_number') }}
                    <p class="text-muted">{{ proj.applicationDto.applicationInnerInputRegNumber }}</p>
                  </b-col>
                  <b-col cols="12" v-if="proj.applicationDto.contractorName">
                    {{ $t('column.business_entity') }}
                    <p class="text-muted">{{ proj.applicationDto.contractorName }}</p>
                  </b-col>
                </b-row>
                <h5 class="font-size-15 mt-4">{{ $t("dsp") }} :</h5>
                <simplebar style="height: 100px">
                  <p class="text-muted">{{ proj.description }}</p>
                </simplebar>
                <router-link
                    v-if="isCommission && proj.applicationDto?.projectId"
                    class="btn btn-primary"
                    :to="`/projects/main?page=overview&id=${proj.applicationDto?.projectId}`"
                >
                  {{ $t('actions.view_project') }}
                </router-link>
                <b-btn
                    v-if="showReopenProjectButton"
                    variant="success"
                    @click="projectReopenApplication"
                >
                  {{ $t('submodules.dxa.reopen_application') }}
                </b-btn>
                <div class="row task-dates">
                  <div class="col-lg-4">
                    <div class="mt-4">
                      <h5 class="font-size-14">
                        <i class="bx bx-calendar mr-1 text-primary"></i>
                        {{ $t("column.on_date") }}
                      </h5>
                      <p class="text-muted mb-0">
                        {{ replaceDate(proj.start) ? replaceDate(proj.start).daym_shortyyyy() : "" }}
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="mt-4">
                      <h5 class="font-size-14">
                        <i class="bx bx-calendar-check mr-1 text-primary"></i>
                        {{ $t("column.finishing_date") }}
                      </h5>
                      <p class="text-muted mb-0">
                        {{
                          replaceDate(proj.end)
                              ? replaceDate(proj.end).daym_shortyyyy()
                              : ""
                        }}
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="mt-4 float-right">
                      <h5 class="font-size-14">
                        <i class="bx bx-briefcase-alt-2 mr-1 text-primary"></i>
                        {{ $t("ownerProj") }}
                      </h5>
                      <p class="text-muted mb-0">
                        {{
                          `${proj?.ownerLastName ?? ''} ${proj?.ownerFirstName ?? ''} ${proj?.ownerMiddleName ?? ''}`
                        }}
                      </p>
                    </div>
                  </div>
                  <div class="row task-dates ml-2">
                    <!-- Muddatni uzaytirish-->
                    <div v-if="showOnTemporarilyClosedForNotCompleted" class="d-inline-block ml-0">
                      <b-button @click.prevent="handleProjectInformationCompleted" variant="warning" class="p-2 pb-1">
                        <i class="bx bxs-badge-check font-size-15"></i> {{ $t('actions.information_completed') }}
                      </b-button>
                    </div>
                    <div v-if="showCloseProjectButton" class="d-inline-block ml-0">
                      <b-button @click.prevent="changeStatus(proj)" variant="danger" class="p-2 pb-1">
                        <i class="bx bxs-hourglass-bottom font-size-15"></i> {{ $t('actions.close_project') }}
                      </b-button>
                    </div>
                    <b-button v-if="showChangeTermButton" variant="success" @click="changeTerm">
                      <i class="fa fa-calendar-plus"></i>
                      {{ $t("submodules.projects.add_day") }}
                    </b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card grid-card-height">
              <div class="card-body" v-if="proj.applicationDto">
                <h4 class="card-title mb-4">
                  {{ isCommission ? $t("commission_attached_files") : $t("application_attached_files") }}</h4>
                <simplebar v-if="projectFiles && projectFiles.length" id="doc-list" ref="docsRef">
                  <div class="mt-3" v-for="(item, index) in projectFiles" :key="index + 'FILE'">
                    <div class=" d-flex align-items-center bg-light p-2 justify-content-between ">
                      <div class="d-flex align-items-center">
                        <a
                            @click="viewIlova(item.url)"
                            :download="getExt(item.url)!=='pdf'"
                            :href="getExt(item.url) === 'pdf' ? `#` : `${baseUrl}/${item.url}`"
                        >
                          <BaseFileViewer class="my-card-hovered" :uploadPath="item.url"/>
                        </a>
                        <span class="ml-2">
                            {{ item.fileName ? item.fileName : item.name }}
                        </span>
                      </div>
                    </div>
                  </div>
                </simplebar>
                <div class="text-center card mt-3" v-show="!projectFiles.length">
                  <h5 style="opacity: 0.3" class="p-3">
                    {{ $t("messages.data_not_found") }}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <FileController class="grid-card-height" :is-revision="isRevision" :project="proj"
                            @get-project-by-id="getById"/>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4">
            <Files class="grid-card-height" :project="proj"/>
          </div>
          <!-- end col -->
          <div class="col-lg-4">
            <comments class="grid-card-height" :project="proj"/>
          </div>
          <div class="col-lg-4">
            <Members class="grid-card-height" :project="proj" :heightProp="'390'"/>
          </div>
          <!-- end col -->
        </div>
      </div>
    </div>
    <!-- APPLICATION_ATTACHED_FILE VIEW MODAL -->
    <b-modal scrollable v-model="viewIlovaModal" size="xl" :title="$t('actions.view')">
      <div style="height: 700px" v-if="ilovaUploadPath">
        <embed width="100%" height="800" :src="`${baseUrl}/${ilovaUploadPath}`" type="application/pdf"/>
      </div>
      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="viewIlovaModal = false">{{ $t("actions.close") }}</b-button>
      </template>
    </b-modal>

    <b-modal
        :title="$t('writeCmt') "
        id="widthMM"
        v-model="isCommit"
        size="md"
        :no-close-on-backdrop="true"
        body-class="p-0"
    >
      <div class="p-2">
        <div>
          <BaseTextareaWithValidation
              max-rows="6"
              class="required"
              required
              label-on-top
              :label="$t('writeCmt')"
              v-model="commit"
          >
          </BaseTextareaWithValidation>
        </div>
        <div class="mt-3">
          <BaseDatePickerWithValidation
              not-required
              format="DD-MM-YYYY"
              custom-styles="grid-template-columns: 0% 100%"
              v-model="extendedDate"
              :placeholder="$t('submodules.projects.add_day')"
              lang="ru"
          ></BaseDatePickerWithValidation>
        </div>
      </div>
      <template #modal-footer>
        <div class="w-100">
          <b-button variant="success" class="float-right m-1" @click="sendExtended">
            {{ $t('actions.send') }}
          </b-button>
          <b-button variant="danger" class="float-right m-1" @click="closeIsModal">
            {{ $t('actions.close') }}
          </b-button>
        </div>
      </template>
    </b-modal>
    <b-modal
        :title="$t('submodules.dxa.reopen_application')"
        v-model="reopen_application.modal"
        size="md"
        :no-close-on-backdrop="true"
        body-class="p-0"
    >
      <div class="p-2">
        <div class="mt-3">
          <BaseDatePickerWithValidation
              class="required"
              rules="required"
              format="DD-MM-YYYY"
              disable-before
              custom-styles="grid-template-columns: 0% 100%"
              v-model="reopen_application.date"
              :placeholder="$t('submodules.doc.completionTime')"
          />
        </div>
      </div>
      <template #modal-footer>
        <div class="w-100">
          <b-button variant="success" class="float-right m-1" @click="projectReopenApplication">
            {{ $t('submodules.dxa.reopen_application') }}
          </b-button>
          <b-button variant="danger" class="float-right m-1" @click="reopen_application.modal = false;">
            {{ $t('actions.close') }}
          </b-button>
        </div>
      </template>
    </b-modal>
    <!-- end row -->
  </div>
</template>

<style lang="scss" scoped>
.grid-card-height {
  height: calc(100% - 24px);
}
</style>