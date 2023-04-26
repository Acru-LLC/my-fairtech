<template>
  <div>

    <b-card title="Title" header-tag="header" footer-tag="footer">
      <template #header>
        <ValidationObserver
            ref="observer"
            v-slot="{}"
        >
          <b-row class="mb-3">
            <b-col
                sm="12"
                md="6"
            >
              <BaseInputWithValidation
                  name="INN"
                  :rules="{required: true, regex: /\b\d{9}\b/}"
                  v-model="inn"
                  @keyup.enter="findContractorByInn"
                  with-input-append
                  mask="#########"
                  :label="$t('column.inn')"
                  placeholder="123456789"
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
            </b-col>
          </b-row>
        </ValidationObserver>
        <!--        <b-row class="my-1">-->
        <!--          <b-col sm="7">-->
        <!--            <b-form-input :placeholder="$t('submodules.integration.soliq_info.tin')"></b-form-input>-->
        <!--          </b-col>-->
        <!--          <b-col sm="5">-->
        <!--            <b-button href="#" variant="primary">{{$t('submodules.integration.soliq_info.download')}}</b-button>-->
        <!--          </b-col>-->
        <!--        </b-row>-->

      </template>
      <b-card-text>
        content
      </b-card-text>

    </b-card>
  </div>
</template>

<script>
import integratsiyaService from "@/shared/services/integratsiya.service";

export default {
  name: "DSQ-methods1",
  data() {
    return {
      inn: ''
    }
  },
  computed: {
    computedObserver() {
      return this.$refs.observer
    },
  },
  methods: {
    findContractorByInn() {
      // if (this.computedObserver.fields.INN.valid)
      //   helperService.validateInnFromApi(this.editingItem.inn, true)
      //       .then(res => {
      //         if (res.data) {
      integratsiyaService.getContractorInfoByInnForCreate(this.inn, true)
          .then(res => {
            console.log(res)
            // this.editingItem = Object.assi\gn({}, res.data)
          })
          .catch(e => {
            // this.computedObserver.setErrors({ INN: [this.$t('validator.inn_exist')] });
          })
      // } else {
      //   this.computedObserver.setErrors({INN: [this.$t('validator.inn')]});
      // }
      // })
      // .catch(e => {
      //   console.log(e)
      //
      // })
      /* else
          this.computedObserver.refs.INN.validate() */
    },
  }
}
</script>

<style scoped>

</style>