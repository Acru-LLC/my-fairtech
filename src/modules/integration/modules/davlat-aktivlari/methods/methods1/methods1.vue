<template>
  <div>

    <b-card header-tag="header" footer-tag="footer">
      <template #header>
        <ValidationObserver
            ref="observer"
            v-slot="{}"
        >
          <b-row class="mb-3">
            <b-col
                sm="12"
                md="3"
            >
              <BaseInputWithValidation
                  v-model="inn"
                  @keyup.enter="findContractorByInn"
                  with-input-append
                  v-mask="'#########'"
                  :label="$t('column.inn')"
                  class="required"
              >
                <template v-slot:append-slot>
                  <b-button
                      @click="findContractorByInn"
                      variant="outline-primary"
                      id="contractorSearchButton"
                      style="padding: 2.5px 10px; font-size: 1.2rem;"
                  >
                    <i class="mdi mdi-account-search"></i>
                  </b-button>
                </template>
              </BaseInputWithValidation>
              <br>
              <span><b>308716827</b></span>
            </b-col>

            <b-col
                sm="12"
                md="3"
                class="ml-4"
            >
              <BaseInputWithValidation
                  v-model="senderPinfl"
                  @keyup.enter="findContractorBySenderPinfl"
                  with-input-append
                  :label="$t('submodules.integration.farmasevtika_info.fields2.pinfl')"
                  class="required"
              >
                <template v-slot:append-slot>
                  <b-button
                      @click="findContractorBySenderPinfl"
                      variant="outline-primary"
                      id="contractorSearchButton"
                      style="padding: 2.5px 10px; font-size: 1.2rem;"
                  >
                    <i class="mdi mdi-account-search"></i>
                  </b-button>
                </template>
              </BaseInputWithValidation>
            </b-col>

            <b-col
                sm="12"
                md="4"
                class="ml-4"
            >
              <BaseInputWithValidation
                  v-model="identifikator"
                  @keyup.enter="findContractorByIdentifikator"
                  with-input-append
                  :label="$t('submodules.integration.davlat_active_info.request_idnt')"
                  class="required"
              >
                <template v-slot:append-slot>
                  <b-button
                      @click="findContractorByIdentifikator"
                      variant="outline-primary"
                      id="contractorSearchButton"
                      style="padding: 2.5px 10px; font-size: 1.2rem;"
                  >
                    <i class="mdi mdi-account-search"></i>
                  </b-button>
                </template>
              </BaseInputWithValidation>
            </b-col>
          </b-row>
        </ValidationObserver>

      </template>
      <b-card :title="$t('submodules.integration.farmasevtika_info.response')" v-if="resInformation_Date"
              style="padding: 0 50px">

        <b-card no-body class="overflow-hidden">
          <b-row no-gutters>
            <b-col>
              <b-card-text>
                <b-list-group>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.davlat_active_info.bussines_name') }} </b>
                    <span variant="primary" pill>{{
                        resInformation_Date.bussines_name ? resInformation_Date.bussines_name : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.davlat_active_info.requisitec_acc') }} </b>
                    <span variant="primary" pill>{{
                        resInformation_Date.requisitec_acc ? resInformation_Date.requisitec_acc : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.davlat_active_info.bussines_owner') }} </b>
                    <span variant="primary" pill>{{
                        resInformation_Date.bussines_owner ? resInformation_Date.bussines_owner : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.davlat_active_info.prop_sys_org') }} </b>
                    <span variant="primary" pill>{{
                        resInformation_Date.prop_sys_org ? resInformation_Date.prop_sys_org : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.davlat_active_info.bussines_region') }} </b>
                    <span variant="primary" pill>{{
                        resInformation_Date.bussines_region ? resInformation_Date.bussines_region : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.davlat_active_info.bussines_city') }} </b>
                    <span variant="primary" pill>{{
                        resInformation_Date.bussines_city ? resInformation_Date.bussines_city : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.davlat_active_info.tin') }} </b>
                    <span variant="primary" pill>{{
                        resInformation_Date.tin ? resInformation_Date.tin : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.davlat_active_info.prop_gov') }} </b>
                    <span variant="primary" pill>{{
                        resInformation_Date.prop_gov ? resInformation_Date.prop_gov : '_ _ _'
                      }}</span>
                  </b-list-group-item>


                </b-list-group>
              </b-card-text>
            </b-col>

          </b-row>
        </b-card>
      </b-card>
      <div class="text-center" v-else-if="loadingTableItems">
        <b-spinner variant="primary" label="Text Centered"></b-spinner>
      </div>
    </b-card>
  </div>
</template>

<script>
import integratsiyaService from "@/shared/services/integratsiya.service";

export default {
  name: "methods1",
  data() {
    return {
      inn: '',
      senderPinfl: '',
      identifikator: '',
      resInformation_Date: null,
      resKR_Sert_asosiy: [],
      resTovar: [],
      loadingTableItems: false,

    }
  },
  computed: {
    computedObserver() {
      return this.$refs.observer
    },
  },
  methods: {
    findContractorByInn() {
      this.resInformation_Date = null
      // if (this.computedObserver.fields.INN.valid)
      //   helperService.validateInnFromApi(this.editingItem.inn, true)
      //       .then(res => {
      //         if (res.data) {
      this.loadingTableItems = true
      integratsiyaService.getDavlatActiveInfoForInn({
        inn: this.inn,
        pinfl: this.senderPinfl,
        identifikator: this.identifikator
      }, true)
          .then(res => {
            this.resInformation_Date = res.data
            if (res.data.code == 200) {

              this.$toast(res.data.message, {type: 'success'});
            }
            this.loadingTableItems = false
          })
          .catch(e => {
            // this.computedObserver.setErrors({ INN: [this.$t('validator.inn_exist')] });
          })
    },
    findContractorBySenderPinfl() {
      this.resInformation_Date = null
      // if (this.computedObserver.fields.INN.valid)
      //   helperService.validateInnFromApi(this.editingItem.inn, true)
      //       .then(res => {
      //         if (res.data) {
      this.loadingTableItems = true
      integratsiyaService.getDavlatActiveInfoForInn({
        inn: this.inn,
        pinfl: this.senderPinfl,
        identifikator: this.identifikator
      }, true)
          .then(res => {
            this.resInformation_Date = res.data
            if (res.data.code == 200) {

              this.$toast(res.data.message, {type: 'success'});
            }
            this.loadingTableItems = false
          })
          .catch(e => {
            // this.computedObserver.setErrors({ INN: [this.$t('validator.inn_exist')] });
          })
    },
    findContractorByIdentifikator() {
      this.resInformation_Date = null
      // if (this.computedObserver.fields.INN.valid)
      //   helperService.validateInnFromApi(this.editingItem.inn, true)
      //       .then(res => {
      //         if (res.data) {
      this.loadingTableItems = true
      integratsiyaService.getDavlatActiveInfoForInn({
        inn: this.inn,
        pinfl: this.senderPinfl,
        identifikator: this.identifikator
      }, true)
          .then(res => {
            this.resInformation_Date = res.data
            if (res.data.code == 200) {

              this.$toast(res.data.message, {type: 'success'});
            }
            this.loadingTableItems = false
          })
          .catch(e => {
            // this.computedObserver.setErrors({ INN: [this.$t('validator.inn_exist')] });
          })
    },
  }
}
</script>

<style scoped>

</style>




