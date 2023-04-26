<template>
  <b-row class="mb-3">
    <b-col md="12" class="text-center">
      <div class="h4 mb-4 d-inline-block">
        {{ $t('open_data.competition_law_reestr.code') }} - {{ $t('open_data.competition_law_reestr.title') }}
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
                  v-model="editingItem.enterpriseNameLt"
                  :label="$t('open_data.competition_law_reestr.enterpriseName', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.competition_law_reestr.enterpriseName', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.documentLt"
                  :label="$t('open_data.competition_law_reestr.document', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.competition_law_reestr.document', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.enterpriseNameUz"
                  :label="$t('open_data.competition_law_reestr.enterpriseName', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.competition_law_reestr.enterpriseName', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.documentUz"
                  :label="$t('open_data.competition_law_reestr.document', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.competition_law_reestr.document', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.enterpriseNameRu"
                  :label="$t('open_data.competition_law_reestr.enterpriseName', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.competition_law_reestr.enterpriseName', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.documentRu"
                  :label="$t('open_data.competition_law_reestr.document', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.competition_law_reestr.document', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.enterpriseNameEn"
                  :label="$t('open_data.competition_law_reestr.enterpriseName', 'en') + ' (en)'"
                  :placeholder="$t('open_data.competition_law_reestr.enterpriseName', 'en') + ' (en)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.documentEn"
                  :label="$t('open_data.competition_law_reestr.document', 'en') + ' (en)'"
                  :placeholder="$t('open_data.competition_law_reestr.document', 'en') + ' (en)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.number"
                  :label="$t('open_data.competition_law_reestr.number')"
                  :placeholder="$t('open_data.competition_law_reestr.number')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseDatePickerWithValidation
                  required
                  disable-after
                  custom-styles="grid-template-columns: 25% 75%;"
                  :label="$t('open_data.competition_law_reestr.date')"
                  v-model="editingItem.date"
              />
            </b-col>
          </b-row>
        </ValidationObserver>
      </base-create-or-update-wrapper>
    </b-col>
  </b-row>
</template>
<script>
const MAIN_API_URL = 'open-data/competition-law-reestr';
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
      return this.$route.name === 'CreateOpenDataCompetitionLawReestr'
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