<template>
  <b-row class="mb-3">
    <b-col md="12" class="text-center">
      <div class="h4 mb-4 d-inline-block">
        {{ $t('open_data.document_evaluation.code') }} - {{ $t('open_data.document_evaluation.title') }}
      </div>
    </b-col>
    <b-col md="12">
      <base-create-or-update-wrapper
          @save="save"
          has-save-suspend
          :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
      >
        <ValidationObserver
            ref="observer"
            v-slot="{}"
        >
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.regionalOfficesNameLt"
                  :label="$t('open_data.document_evaluation.regionalOfficesName', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.document_evaluation.regionalOfficesName', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.total"
                  :label="$t('open_data.document_evaluation.total')"
                  :placeholder="$t('open_data.document_evaluation.total')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.regionalOfficesNameUz"
                  :label="$t('open_data.document_evaluation.regionalOfficesName', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.document_evaluation.regionalOfficesName', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.noObjection"
                  :label="$t('open_data.document_evaluation.noObjection')"
                  :placeholder="$t('open_data.document_evaluation.noObjection')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.regionalOfficesNameRu"
                  :label="$t('open_data.document_evaluation.regionalOfficesName', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.document_evaluation.regionalOfficesName', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.antiCompetitiveNumber"
                  :label="$t('open_data.document_evaluation.antiCompetitiveNumber')"
                  :placeholder="$t('open_data.document_evaluation.antiCompetitiveNumber')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.regionalOfficesNameEn"
                  :label="$t('open_data.document_evaluation.regionalOfficesName', 'en') + ' (en)'"
                  :placeholder="$t('open_data.document_evaluation.regionalOfficesName', 'en') + ' (en)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.antiCompetitivePercent"
                  :label="$t('open_data.document_evaluation.antiCompetitivePercent')"
                  :placeholder="$t('open_data.document_evaluation.antiCompetitivePercent')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.deficiency"
                  :label="$t('open_data.document_evaluation.deficiency')"
                  :placeholder="$t('open_data.document_evaluation.deficiency')"
              />
            </b-col>
          </b-row>
        </ValidationObserver>
      </base-create-or-update-wrapper>
    </b-col>
  </b-row>
</template>
<script>
const MAIN_API_URL = 'open-data/document-evaluation';
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

export default {
  name: "CreateOrUpdate",
  /*
  * DATA */
  data() {
    return {
      editingItem: {},
      statuses: []
    }
  },
  /*
  * COMPUTED */
  computed: {
    isModeCreate() {
      return this.$route.name === 'CreateOpenDataDocumentEvaluation'
    },
    computedObserver() {
      return this.$refs.observer
    }
  },
  /*
  * METHODS */
  methods: {
    treeClosed(veeName) {
      this.computedObserver.refs[veeName].validate();
    },
    save() {
      this.computedObserver.validate().then(valid => {
        if (valid) {
          if (this.editingItem.id) {
            crudAndListsService.update(MAIN_API_URL, this.editingItem).then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          } else {
            crudAndListsService.create(MAIN_API_URL, this.editingItem).then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          }
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      });
    },
    async handleCreated() {
      this.var_default_search_payload.itemsPerPage = 500
      if (this.isModeCreate) {
        await crudAndListsService.getEmpty(MAIN_API_URL, null, true)
            .then(res => {
              this.editingItem = res.data
            })
            .catch(e => {
              console.log(e)
            })
      } else {
        await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, true)
            .then(res => {
              this.editingItem = res.data
            })
            .catch(e => {
              console.log(e)
            })
      }
    }
  },
  async created() {
    await this.handleCreated();
  }
}
</script>
<style scoped>
ul {
  list-style-type: none;
}
</style>