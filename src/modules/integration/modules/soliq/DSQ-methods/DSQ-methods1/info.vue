<template>
  <div class="card mb-0">

    <div class="pt-4 pl-5">
      <b-button variant="danger" @click="$emit('close')">
        <i class="fa fa-times"></i>
        {{ $t("actions.close") }}
      </b-button>
      <b-button v-show="statusFromDXA=='VISA_APPROVED' && projectOwner"
                class="ml-3" @click="btn_click" variant="info">
        {{ $t('submodules.dxa.not_belong') }}
      </b-button>
      <b-button v-show="statusFromDXA=='CREATED'"
                class="ml-3" @click="btn_return" variant="warning">
        {{ $t('column.return') }}
      </b-button>
    </div>
    <hr>

    <div class="card-body p-5 pt-0">
      <b-overlay
          :opacity="0.1"
          :show="loadingById"
          rounded="sm"
      >

        <div class="card">
          <table
              class="table m-0 "
          >
            <tr>
              <td class="text-left">
                <b> {{ $t("submodules.dxa.dxa_application_number") }}</b> <br>

                <span
                    style="font-size: 12px"
                    class="text-left"
                >
                                                {{ visaInfoById.applicationRegNumber }}
                                            </span>
              </td>
              <td class="text-right">
                <b> {{ $t("submodules.dxa.application_type") }}</b> <br>
                <span
                    style="font-size: 12px"
                    class="text-left"
                    v-if="visaInfoById.applicationType == 'FOR_SALE'"
                >
                  {{ $t("submodules.dxa.dxa_application_1") }}
                                            </span>
                <span
                    style="font-size: 12px"
                    class="text-left"
                    v-else-if="visaInfoById.applicationType == 'FOR_ADD'"
                > {{ $t("submodules.dxa.dxa_application_2") }}

                                            </span>
              </td>
            </tr>
          </table>
        </div>
        <div class="card ">
          <div class="timeline">
            <div class="line text-muted"></div>
            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
              <div class="tabs">
                <div class="tab" v-for="(tabsItem, index) in selectedApplicationTabsStep" :key="info"
                >

                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="heading1">
                      <div class=" icon"><i class="glyphicon glyphicon-one-fine-dot"><span class="sr-only">Expand/Collapse </span></i>
                      </div>
                      <input type="checkbox" :id="`rd-${info}`" name="rd" checked="checked">
                      <label class="tab-label" :for="`rd-${info}`">{{
                          getName({
                            nameLt: tabsItem.title['oz'],
                            nameRu: tabsItem.title['oz'],
                            nameUz: tabsItem.title['oz'],
                          })
                        }}</label>
                      <div class="tab-content">
                        <div class="p-2" style="border-radius: 5px">
                          <div v-if="tabsItem.fields && tabsItem.fields.length > 0" class="card">
                            <table class="table m-0">
                              <tr v-for="(tabsByStepId, index2) in tabsItem.fields" :key="index2">
                                <td class="text-left font-weight-normal">{{
                                    getName({
                                      nameLt: tabsByStepId.title['oz'],
                                      nameRu: tabsByStepId.title['oz'],
                                      nameUz: tabsByStepId.title['oz'],
                                    })
                                  }}</td>
                                <td class="text-right font-weight-normal"
                                    v-if="tabsByStepId.type === 'FILE'"
                                    style="width: 200px">
                                  <i class="fa fa-eye"
                                     v-b-tooltip.hover
                                     :title="$t('submodules.doc.application_file')"
                                     @click="attachedFilesEye(tabsByStepId)"
                                  ></i>
                                </td>
                                <td class="text-right font-weight-normal" v-else>
                                  {{
                                    tabsByStepId.value instanceof Array ? (tabsByStepId.value.length > 0 ? tabsByStepId.value[0].value : '') : tabsByStepId.value
                                  }}
                                </td>
                              </tr>
                            </table>
                          </div>
                          <div v-else class="text-center" style="min-height: 50px">
                            <h6 style="opacity: 0.7"> {{ $t('messages.data_not_found') }}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>


            </div>
          </div>
        </div>
      </b-overlay>
    </div>

    <b-modal
        :title="$t('submodules.references.all')"
        size="lg"
        :no-close-on-backdrop="true"
        :hide-footer="true"
        @close="isAttachedFilesEyeModal == false"
        @cancel="isAttachedFilesEyeModal == false"
        v-model="isAttachedFilesEyeModal"
    >
      <b-overlay
          :opacity="0.1"
          :show="loading"
          rounded="sm"
      >
        <div class="card">
          <table class="table m-0">
            <tr>
              <td class="text-left"><b> {{ $t('docName') }} </b></td>
              <td class="text-right" style="width: 60%">
                {{ selectedApplicationInfoById.name }}
              </td>
            </tr>
            <tr>
              <td class="text-left"><b>{{ $t('application_attached_files') }}</b></td>
              <td class="text-right"
                  style="width: 200px">
                <a
                    :href="`${getBaseUrl}/${selectedApplicationInfoById.fileUrl}`"
                    :download=" `${selectedApplicationInfoById.name}` "
                    class="btn btn-icon btn-light btn-sm"
                >
                  <span class="svg-icon svg-icon-md svg-icon-primary">
                    <i class="fa fa-download"></i>
                  </span>
                </a>
              </td>
            </tr>
          </table>
        </div>
      </b-overlay>
    </b-modal>

    <b-modal
        :title="$t('submodules.dxa.not_belong')"
        id="widthMM"
        v-model="isCommit"
        size="lg"
        :no-close-on-backdrop="true"
        body-class="p-0">
      <div class="pt-5 pr-5 pl-5 pb-2">
        <BaseTextareaWithValidation
            max-rows="6"
            class="required"
            required
            label-on-top
            :label="$t('messaging.title')"
            v-model="commit"
        >
        </BaseTextareaWithValidation>
        <b-button
            @click="$emit('createProject',applicationId)"
            class="mt-4 card-tabs-button"
            variant="primary"
        >
          <i class="fa fa-folder"></i>

          {{ $t('submodules.doc.start_investigating') }}
        </b-button>
      </div>


      <template #modal-footer>
        <div class="w-100">
          <b-button
              variant="success"
              size="sm"
              class="float-right m-1"
              @click="sendReview"
          >
            {{ $t('actions.send') }}
          </b-button>

          <b-button
              variant="danger"
              size="sm"
              class="float-right m-1"
              @click="closeIsModal"
          >
            {{ $t('actions.close') }}
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>

</template>

<script>
import helperService from '@/shared/services/helper.service'
import LetterService from "../../letter/letterService";

export default {
  name: "index",
  props: {
    applicationId: {
      type: String,
      default: "",
    },
    ID: {
      type: String,
      default: "",
    },
    statusFromDXA: {
      type: String,
      default: "",
    },
    projectOwner: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getBaseUrl() {
      return process.env.VUE_APP_ROOT_URL;
    },
  },
  data() {
    return {
      isAttachedFilesEyeModal: false,
      isSelectedFilesItem: null,
      currentApplicationId: null,
      loadingById: false,
      loadingStepById: false,
      loading: false,
      selectedApplicationTabsStep: [],
      selectedApplicationInfoById: {},
      tabsStepInfoList: [],
      visaInfoById: {},
      commit: '',
      isCommit: false,
    }
  },
  methods: {
    async sendReview() {
      let obj = {
        decision_text: this.commit,
      }
      await LetterService.applicationReviewNOT_COMPLETE(obj, this.ID, this.applicationId)
          .then((res) => {
            this.$toast(this.$t('succes.title'), {type: 'success'});
            this.isCommit = false
            this.ismodalDXAInfo = false
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
    btn_click() {
      // this.isCommit = true
      this.$emit('createProject', this.ID)
    },
    btn_return() {
      // this.isCommit = true
      this.$emit('returnApplication', this.ID)
    },
    async downloadFiles() {
      this.isAttachedFilesEyeModal = true
      await helperService.getApplicationFilesDownloadById(
          this.isSelectedFilesItem.appDataDto.applicationId,
          this.selectedApplicationInfoById.fileIdFromDXA)
          .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
          })
          .catch(e => {
            console.log(e)
          }).finally(() => {
            this.loading = false;
          })
    },
    async attachedFilesEye(item) {
      this.isSelectedFilesItem = item
      this.isAttachedFilesEyeModal = true
      this.loading = true;
      await helperService.getApplicationFilesBystepId(this.currentApplicationId, item.value, this.applicationId)
          .then(async res => {
            this.selectedApplicationInfoById = res.data
            this.loading = false;
          })
          .catch(e => {
            console.log(e)
          }).finally(() => {
            this.loading = false;
          })
    },
    async getApplicationInfoById() {
      this.selectedApplicationTabsStep = []
      this.loadingById = true;
      await helperService.getApplicationFromDxaById(this.applicationId, false)
          .then(async res => {
            this.currentApplicationId = res.data.application_id

            for (let j = 0; j < res.data.data.steps.length; j++) {
              res.data.data.steps[j].checked = true
            }

            for (let i = 0; i < res.data.data.fields.length; i++) {
              for (let j = 0; j < res.data.data.steps.length; j++) {
                if (res.data.data.fields[i].step_id == res.data.data.steps[j].id) {
                  if (!res.data.data.steps[j].fields) {
                    res.data.data.steps[j].fields = []
                  }
                  res.data.data.steps[j].fields.push(res.data.data.fields[i])
                }
              }
            }
            this.selectedApplicationTabsStep = res.data.data.steps
            this.loadingById = false;
          })
          .catch(e => {
            console.log(e)
          }).finally(() => {
            this.loadingById = false;
          })
    },
    // async getInfoStepById(item) {
    //   this.tabsStepInfoList = []
    //   this.loadingStepById = true;
    //   await helperService.getApplicationInfoBystepId(this.applicationId, item.stepId)
    //       .then(res => {
    //         this.tabsStepInfoList = res.data
    //         this.loadingStepById = false;
    //       })
    //       .catch(e => {
    //         console.log(e)
    //       }).finally(() => {
    //         this.loadingStepById = false;
    //       })
    // },
    async getVisaInfoById() {
      await helperService.getVisaAllInfoById(this.applicationId, false)
          .then(res => {
            this.visaInfoById = res.data
          })
          .catch(e => {
            console.log(e)
          }).finally(() => {
          })
    },
  },
  async mounted() {

  },
  watch: {
    'applicationId': {
      async handler() {
        // await this.getApplicationInfoById()
      }
    }
  },
}
</script>


<style scoped lang="scss">
@import url(https://fonts.googleapis.com/css?family=Oswald);

.timeline {


  .photoholder {
    position: absolute;
    right: 0;
    display: none;
  }

  .collapse.in .photoholder {
    float: right;
    width: 30%;
    padding: 0px 10px;
    display: block;
  }

  .panel {
    width: 100%;
  }

  .panel-collapse {
    width: 100%;
  }

  .photoholder img {
    width: 100%;
    height: auto;
  }

  .glyphicon.glyphicon-one-fine-dot:before {
    content: "\25cf";
    font-size: 2em;
    color: #1cd456;
  }

  .line {
    position: absolute;
    width: 3px;
    display: block;
    top: 32px;
    bottom: 0px;
    margin-left: 30px;
    background: #1cd456;
  }

  .separator {
    border-top: 1px solid #1cd456;
    padding: 5px;
    padding-left: 40px;
    font-style: italic;
    font-size: 0.9em;
    margin-left: 30px;
  }

  .line::before {
    top: -2px;
  }

  .line::after {
    bottom: -2px;
  }

  .line::before,
  .line::after {
    content: "";
    position: absolute;
    left: -6px;
    width: 0;
    height: 0;
    display: block;
    border-radius: 50%;
    background: #1cd456;
  }

  .panel {
    position: relative;
    margin: 10px 0px 0px 40px;
    clear: both;
    margin: 0 auto;
    padding: 10px 0px 0 40px;
    background: none;
  }

  .panel::before {
    position: absolute;
    display: block;
    top: 8px;
    left: -24px;
    content: "";
    width: 0px;
    height: 0px;
    border: inherit;
    border-width: 12px;
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }

  .panel .panel-heading.icon * {
    font-size: 14px;
    vertical-align: middle;
    line-height: 40px;
  }

  .panel > .panel-heading .icon {
    position: absolute;
    left: 11px;
    /*display: block;*/
    width: 40px;
    height: 40px;
    padding: 0px;
    border-radius: 50%;
    text-align: center;
    float: left;
  }

  .panel-outline {
    border-color: transparent;
    background: transparent;
    box-shadow: none;
  }

  .panel-outline .panel-body {
    padding: 10px 0px;
  }

  .panel-body {
    /* display: none; */
  }

  .panel-default {
    border: 0;
  }

  .panel-default > .panel-heading {
    font-family: "Oswald", "Helvetica Neue", Helvetica, Arial, sans-serif;
    border: 0;
    background: none;
    font-weight: 600;
  }

  .panel-default > .panel-heading + .panel-collapse > .panel-body {
    border-top: 0;
    padding-top: 0;
    border-bottom: 0;
  }

  h4.panel-title {
    font-size: 24px;
    border: 0;
  }

  .panel {
    -webkit-box-shadow: none;
    box-shadow: none;
  }
}

</style>

<style scoped>
.table tr {
  padding: 65px;
}

.table th, .table td {
  border-top: 0px;
  border-bottom: 1px solid #dedcdc;
  padding: 0.5rem;
}

.bg-card-color {
  background-color: #c8ffa3
}

.tabs-header {
  font-weight: 900;
  font-size: 15.5px;
  margin-left: 5px;
  margin-bottom: 8px;
}
</style>

<style lang="scss" scoped>
$midnight: #1cd456;
$clouds: #ecf0f1;
// General
body {
  color: $midnight;
  background: $clouds;
  padding: 0 1em 1em;
}

h1 {
  margin: 0;
  line-height: 2;
  text-align: center;
}

h2 {
  margin: 0 0 .5em;
  font-weight: normal;
}

input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

// Layout
.row {
  display: flex;

  .col {
    flex: 1;

    &:last-child {
      margin-left: 1em;
    }
  }
}

/* Accordion styles */
.tabs {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 4px -2px $midnight;
}

.tab {
  border-radius: 5px;
  width: 100%;
  color: white;
  overflow: hidden;

  &-label {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    background: $midnight;
    font-weight: bold;
    cursor: pointer;
    /* Icon */
    &:hover {
      background: darken($midnight, 10%);
    }

    &::after {
      content: "\276F";
      width: 1em;
      height: 1em;
      text-align: center;
      transition: all .35s;
    }
  }

  &-content {
    max-height: 0;
    padding: 0 1em;
    color: $midnight;
    background: white;
    transition: all .35s;
  }

  &-close {
    display: flex;
    justify-content: flex-end;
    padding: 1em;
    font-size: 0.75em;
    background: $midnight;
    cursor: pointer;

    &:hover {
      background: darken($midnight, 10%);
    }
  }
}


// :checked
input:checked {
  + .tab-label {
    background: darken($midnight, 10%);

    &::after {
      transform: rotate(90deg);
    }
  }

  ~ .tab-content {
    max-height: 100vh;
    padding: 1em;
  }
}

</style>