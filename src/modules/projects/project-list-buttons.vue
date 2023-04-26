<template>
  <ul class="list-inline mb-0 mt-3 float-right">
    <li
        v-b-tooltip.hover.top
        class="list-inline-item"
        :title="$t('goToWorkWithProjectsPage')"
        v-if="project.isAdmin && project.status === 'FINISHED'  && project.projectType !== 'COMMISSION' && !project.applicationSeen"
    >
      <b-button
          @click.prevent="$router.push({
            name: 'LetterCreate',
            query: { type: project.applicationType === 'FROM_DXA' ? 'dxa' : null}
          })"
          variant="primary"
          class="btn btn-outline-primary pl-3 pr-3 pb-1 pt-1 text-white font-size-16"
      >{{ $t('submodules.application_before_commission.confirm_explore_results') }}
      </b-button>
    </li>

    <li v-b-tooltip.hover.top class="list-inline-item ml-0" :title="$t('cmts')" >
      <b-button @click.prevent="$emit('goComments', project)" variant="light" class="pl-2 pr-2 pb-1 pt-2" >
        <i class="bx bx-comment-dots font-size-15"></i>
      </b-button>
    </li>
    <li
        v-if="project.isAdmin && project.status !== 'FINISHED'"
        v-b-tooltip.hover.top
        :title="$t('actions.delete')"
        class="list-inline-item"
    >
      <b-button @click.prevent="$emit('dlt', project.id)" variant="light" class="pl-2 pr-2 pb-1 pt-2" >
        <i class="bx bx-trash font-size-15"></i>
      </b-button>
    </li>
    <li v-b-tooltip.hover.top :title="$t('tasks_list')" class="list-inline-item" >
      <b-button @click.prevent="$emit('getTask', project)" variant="light" class="pl-2 pr-2 pb-1 pt-2" >
        <i class="bx bx-task font-size-15"></i>
      </b-button>
    </li>
    <li
        v-if="project.projectType ==='COMMISSION' && project.applicationType === 'FROM_DXA' && project.isAdmin &&
          (project.status === 'COMMISSION_REVISION' || project.status === 'CREATED' || project.status === 'RECREATED')"
        v-b-tooltip.hover.top
        class="list-inline-item ml-0"
    >
      <b-button
          class="list-inline-item ml-0"
          @click.prevent="$emit('showQuorumModal', project)"
          variant="primary"
          :title="$t('submodules.commission.kvorm_no')"
      >
        <i class="fa fa-calendar-plus"></i>
      </b-button>
    </li>
    <li
        v-if="project.projectType === 'COMMISSION' && project.applicationType === 'FROM_DXA' && project.isAdmin && project.status === 'CREATED' || project.status === 'RECREATED'"
        v-b-tooltip.hover.top
        class="list-inline-item ml-0"
    >
      <b-button
          v-show="selectedTrItem.applicationTypeInProject !== 'FROM_DXA' && isCommission && project.isAdmin"
          class="list-inline-item ml-0"
          @click.prevent="$emit('showRejectedSeeModal', project)"
          variant="info"
          :title="$t('submodules.commission.returnsee')"
      >
        <i class="fa fa-reply"></i>
      </b-button>
    </li>
    <li
        v-if="['REVIEW_FINISHED', 'FINISHED', 'TEMPORARILY_CLOSED', 'RETURN_FOR_REVISION_TO_BEFORE_COMMISSION'].indexOf(project.status) === -1"
        v-b-tooltip.hover.top
        class="list-inline-item ml-0"
        :title="$t('actions.close_project')"
    >
      <b-button @click.prevent="$emit('changeStatus', project)" variant="danger" class="pl-2 pr-2 pb-1 pt-2" >
        <i class="bx bxs-hourglass-bottom font-size-15"></i>
      </b-button>
    </li>
    <li
        v-if="showOnTemporarilyClosedForNotCompleted"
        v-b-tooltip.hover.top
        class="list-inline-item ml-0"
        :title="$t('actions.information_completed')"
    >
      <b-button @click.prevent="handleProjectInformationCompleted" variant="warning" class="pl-2 pr-2 pb-1 pt-2" >
        <i class="bx bxs-badge-check font-size-15"></i>
      </b-button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "project-list-buttons",
  props: {
    project: {
      type: Object,
      required: () => ({})
    },
    selectedTrItem: {
      type: Object,
      required: () => ({})
    },
    isCommission: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    showOnTemporarilyClosedForNotCompleted() {
      return this.project.status === 'TEMPORARILY_CLOSED' && this.project.returnType === 'FOR_NOT_COMPLETED';
    },
  },
  methods: {
    handleProjectInformationCompleted(){
      this.$emit('handleProjectInformationCompleted', this.project.id, () => {
        this.forceRouteReload();
      })
    }
  }
}
</script>

<style scoped>

</style>