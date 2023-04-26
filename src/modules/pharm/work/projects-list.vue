<script>
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import ProjectListButtons from "./project-list-buttons";

/**
 * Projects-list component
 */
import i18n from "@/i18n";
import {replaceDate, splitLargeText} from "@/helper";

export default {
  components: {
    PageHeader,
    ProjectListButtons,
  },
  props: {
    projectData: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    itemsPerPage: {
      type: Number,
      default: 12,
    },
    page: {
      type: Number,
      default: 1,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    isCommission: {
      type: Boolean,
      default: false,
    },
    selectedTrItem: {
      type: Object,
      default: () => ({}),
    },
    totalC: {
      type: Number,
      default: 0,
    },
    totalD: {
      type: Number,
      default: 0,
    },
    totalF: {
      type: Number,
      default: 0,
    },
  },
  page: {
    title: i18n.t("proj"),
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
  watch: {
    d_page(v) {
      this.$emit("d_page_changed", v);
    },
    searchValue(v) {
      this.$emit("search_changed", v);
    },
    selected(v) {
      this.$emit("selected_changed", v);
    },
  },
  methods: {
    random(v) {
      return Math.floor(Math.random() * v);
    },
    splitLargeText(a, b) {
      return splitLargeText(a, b);
    },
    handleProjectInformationCompleted(projectId, callback = () => ({})){
      this.$emit('handleProjectInformationCompleted', projectId, callback)
    },
  },
  created() {
    setTimeout(() => {
      this.d_page = this.page;
      this.d_limit = this.itemsPerPage;
      this.d_total = this.total;
    }, 200);
  },
  /*
  COMPUTED */
  computed: {
    projectType() {
      return this.$route.name === 'CommissionProjects' ? 'COMMISSION' : 'BEFORE_COMMISSION'
    }
  },
  data() {
    return {
      selected: "",
      replaceDate: replaceDate,
      searchValue: "",
      d_page: 1,
      d_limit: 12,
      d_total: 0,
      title: this.$t("proj"),
      items: [
        {
          text: this.$t("menu"),
          href: "/",
        },
        {
          text: this.$t("proj"),
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
    <b-card>
      <b-row>
        <b-col>
          <div
              class="d-flex flex-container"
              style="justify-content: space-between"
          >
            <div
                class="btn-group btn-group-example mb-2"
                role="group"
                style="width: 100px"
            >
              <b-button
                  :to="{name: projectType === 'COMMISSION' ? 'CommissionProjects' : 'ProjectsMain'}"
                  :variant="
                  $route.query.page === 'grid' ? 'primary' : 'outline-primary'
                "
                  class="w-xs"
              >
                <i class="fa fa-th"></i>
              </b-button>
              <b-button
                  :to="{name: projectType === 'COMMISSION' ? 'CommissionProjects' : 'ProjectsMain', query: {page: 'list'}}"
                  :variant="
                  $route.query.page === 'list' ? 'primary' : 'outline-primary'
                "
                  class="w-xs"
              >
                <i class="fa fa-list"></i>
              </b-button>
            </div>

            <div class="d-flex align-items-center">
              <div class="mr-3">
                <b-form-radio-group
                    class="btn-custom mb-0"
                    button-variant="outline-primary"
                    id="btn-radios-1"
                    v-model="selected"
                    buttons
                    name="radios-btn-default"
                >
                  <b-form-radio
                      value="FINISHED"
                      button-variant="outline-primary"
                  >
                    <!-- <i class="fa fa-check mr-1"></i> -->
                    <span> {{ $t("FINISHED") }}</span>
                    <b-badge
                        class="ml-1"
                        variant="success"
                        v-if="totalF > 0"
                    >{{
                        totalF
                      }}
                    </b-badge>
                  </b-form-radio>

                  <b-form-radio
                      button-variant="outline-success"
                      value="CREATED"
                  >
                    <!-- <i class="fa fa-circle mr-1"></i> -->
                    <span> {{ $t("CREATED") }}</span>
                    <b-badge
                        class="ml-1"
                        variant="primary"
                        v-if="totalC > 0"
                    >{{
                        totalC
                      }}
                    </b-badge>
                  </b-form-radio>

                  <b-form-radio
                      value="DEADLINE"
                      button-variant="outline-danger"
                  >
                    <!-- <i class="fa fa-hourglass mr-1"></i> -->
                    <span> {{ $t("deadlineEnd") }}</span>
                    <b-badge
                        class="ml-1"
                        variant="success"
                        v-if="totalD > 0"
                    >{{
                        totalD
                      }}
                    </b-badge>
                  </b-form-radio>
                </b-form-radio-group>
              </div>
              <div class="mr-2">
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
              <div>
                <!--                <b-button-group>-->
                <!--                  <b-button :to="{name: 'ProjectsMain', query: {page: 'create'}}" variant="primary">-->
                <!--                    <i class="bx bx-plus mr-2"></i>-->
                <!--                    {{ $t("actions.create_project") }}-->
                <!--                  </b-button>-->
                <!--                </b-button-group>-->
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card>
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="table-responsive card-body">
            <b-overlay
                :opacity="0.1"
                :show="loading"
                rounded="sm"
            >
              <table class="table table-nowrap table-centered table-bordered">
                <thead class="thead-light">
                <tr>
                  <th
                      scope="col"
                      class="text-center"
                      style="width: 100px"
                  >
                    #
                  </th>
                  <th
                      scope="col"
                      style="width: 30% !important; min-width: 250px"
                  >
                    {{ $t("proj") }}
                  </th>
                  <!--                  <th class="text-center" style="width: 30% !important">-->
                  <!--                    {{ $t("projectType") }}-->
                  <!--                  </th>-->
                  <th
                      style="width: 13%"
                      scope="col"
                      class="text-center"
                  >
                    {{ $t("column.on_date") }}
                  </th>
                  <th
                      style="width: 13%"
                      scope="col"
                      class="text-center"
                  >
                    {{ $t("column.finishing_date") }}
                  </th>
                  <th
                      style="width: 10%"
                      scope="col"
                      class="text-center"
                  >
                    {{ $t("column.status") }}
                  </th>
                  <!-- <th scope="col">{{$t('members')}}</th> -->
                  <th
                      scope="col"
                      class="text-center"
                  >
                    {{ $t("column.actions") }}
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr
                    class="text-center"
                    v-if="projectData.length == 0"
                >
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
                    v-for="(project, index) in projectData"
                    :key="project.id + 'LISTPROJECT'"
                >
                  <td class="text-center">
                    <strong>
                      {{ paginate(index, d_limit, d_page - 1) }}</strong>
                  </td>
                  <td>
                    <div @click.prevent="$emit('overView', project)">
                      <h5 class="text-truncate font-size-14 m-0 hov_underline">
                        <a
                            href="javascript: void(0);"
                            class="text-dark"
                        >
                          {{ project.name }}
                        </a>
                      </h5>

                      <p class="text-muted mb-0 pre hov_underline">
                        {{ splitLargeText(project.description, 300) }}
                      </p>
                    </div>
                  </td>
                  <!--                  <td class="text-center">-->
                  <!--                    <p class="pre m-0">-->
                  <!--                      {{ getName(project) }}-->
                  <!--                    </p>-->
                  <!--                  </td>-->
                  <td class="text-center">
                    {{
                      project.start ? new Date(replaceDate(project.start)).ddmmyyyy() : ""
                    }}
                  </td>
                  <td class="text-center">
                    {{
                      project.end ? new Date(replaceDate(project.end)).ddmmyyyy() : ""
                    }}
                  </td>
                  <td class="text-center">
                    <span
                        v-if="project.status === 'CREATED' && new Date(replaceDate(project.end)).getTime() > Date.now()"
                        class="badge badge-success">
                      {{ $t(project.status) }}
                    </span>

                    <span
                        v-else-if="project.status === 'CREATED' && new Date(replaceDate(project.end)).getTime() < Date.now()"
                        class="badge badge-danger">
                          {{ $t("deadlineEnd") }}
                    </span>
                    <span
                        v-else-if="project.status === 'REVISION'"
                        class="badge badge-warning"
                    >{{
                        $t(project.status)
                      }}</span>
                    <span
                        v-else-if="project.status === 'SEND_TO_MANAGER'"
                        class="badge badge-warning"
                    >{{ $t('submodules.projects.send_to_the_director') }}</span>
                    <span
                        v-else-if="project.status === 'RETURN_FOR_REVISION'"
                        class="badge badge-warning"
                    >{{ $t('REVISION') }}</span>
                    <span
                        v-else-if="project.status === 'COMMISSION_REVISION'"
                        class="badge badge-warning"
                    >{{ $t('submodules.commission.returnsee') }}</span>
                    <span
                        v-else-if="project.status === 'RETURN_FOR_REVISION_TO_BEFORE_COMMISSION'"
                        class="badge badge-warning"
                    >{{ $t('submodules.commission.return_to_before_project') }}</span>
                    <span
                        v-else-if="project.status === 'RECREATED'"
                        class="badge badge-primary"
                    >{{ $t('submodules.commission.recreated') }}</span>
                    <span
                        v-else-if="project.status === 'REVISION_AFTER_COMMISSION'"
                        class="badge badge-warning"
                    >{{ $t('submodules.commission.return_from_commission') }}</span>
                    <span
                        v-else-if="project.status === 'REVIEW_FINISHED'"
                        class="badge badge-success"
                    >{{ $t('submodules.commission.REVIEW_FINISHED') }}</span>
                    <span
                        v-else-if="project.status === 'TEMPORARILY_CLOSED'"
                        class="badge badge-success"
                    >{{ $t('submodules.commission.doc_status.temporarily_closed') }}</span>
                    <span
                        v-else
                        class="badge badge-primary"
                    >{{
                        $t(project.status)
                      }}</span>
                  </td>

                  <td class="text-center">
                    <div class="d-flex">
                      <project-list-buttons
                          :project="project"
                          :isCommission="isCommission"
                          :selectedTrItem="selectedTrItem"
                          @dlt="(param) => $emit('dlt', param)"
                          @getTask="(param) => $emit('getTask', param)"
                          @goComments="(param) => $emit('goComments', param)"
                          @changeStatus="(param) => $emit('changeStatus', param)"
                          @showQuorumModal="(param) => $emit('showQuorumModal', param)"
                          @showRejectedModal="(param) => $emit('showRejectedModal', param)"
                          @showRejectedSeeModal="(param) => $emit('showRejectedSeeModal', param)"
                          @handleProjectInformationCompleted="handleProjectInformationCompleted"
                      />
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </b-overlay>
          </div>
        </div>
      </div>
    </div>
    <!-- end row -->

    <div
        class="row"
        v-if="total > 0"
    >
      <div class="col-lg-12">
        <b-pagination size="sm" class="m-0" :total-rows="total" :per-page="d_limit" v-model="d_page"/>
      </div>
      <!--      <div class="col-12">-->
      <!--        <div class="text-center my-3">-->
      <!--          <a href="javascript:void(0);" class="text-success">-->
      <!--            <i class="bx bx-loader bx-spin font-size-18 align-middle mr-2"></i>-->
      <!--            Load more-->
      <!--          </a>-->
      <!--        </div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<style lang="scss">
.projactions {
  li {
    margin: 3px;
  }
}
</style>
