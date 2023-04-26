<template>
  <b-row class="mb-3">
    <b-col md="12" class="text-center">
      <div class="h4 mb-4 d-inline-block">
        {{ $t('open_data.entities_violate_competition.code') }} - {{ $t('open_data.entities_violate_competition.title') }}
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
                  v-model="editingItem.subjectNameLt"
                  :label="$t('open_data.entities_violate_competition.subjectName', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.entities_violate_competition.subjectName', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.documentNameLt"
                  :label="$t('open_data.entities_violate_competition.documentName', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.entities_violate_competition.documentName', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.subjectNameUz"
                  :label="$t('open_data.entities_violate_competition.subjectName', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.entities_violate_competition.subjectName', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.documentNameUz"
                  :label="$t('open_data.entities_violate_competition.documentName', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.entities_violate_competition.documentName', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.subjectNameRu"
                  :label="$t('open_data.entities_violate_competition.subjectName', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.entities_violate_competition.subjectName', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.documentNameRu"
                  :label="$t('open_data.entities_violate_competition.documentName', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.entities_violate_competition.documentName', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.subjectNameEn"
                  :label="$t('open_data.entities_violate_competition.subjectName', 'en') + ' (en)'"
                  :placeholder="$t('open_data.entities_violate_competition.subjectName', 'en') + ' (en)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.documentNameEn"
                  :label="$t('open_data.entities_violate_competition.documentName', 'en') + ' (en)'"
                  :placeholder="$t('open_data.entities_violate_competition.documentName', 'en') + ' (en)'"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.contentOfOffense"
                  :label="$t('open_data.entities_violate_competition.contentOfOffense', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.entities_violate_competition.contentOfOffense', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.contentOfActionLt"
                  :label="$t('open_data.entities_violate_competition.contentOfAction', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.entities_violate_competition.contentOfAction', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.contentOfOffense"
                  :label="$t('open_data.entities_violate_competition.contentOfOffense', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.entities_violate_competition.contentOfOffense', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.contentOfActionUz"
                  :label="$t('open_data.entities_violate_competition.contentOfAction', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.entities_violate_competition.contentOfAction', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.contentOfOffense"
                  :label="$t('open_data.entities_violate_competition.contentOfOffense', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.entities_violate_competition.contentOfOffense', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.contentOfActionRu"
                  :label="$t('open_data.entities_violate_competition.contentOfAction', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.entities_violate_competition.contentOfAction', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.contentOfOffense"
                  :label="$t('open_data.entities_violate_competition.contentOfOffense', 'en') + ' (en)'"
                  :placeholder="$t('open_data.entities_violate_competition.contentOfOffense', 'en') + ' (en)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.contentOfActionEn"
                  :label="$t('open_data.entities_violate_competition.contentOfAction', 'en') + ' (en)'"
                  :placeholder="$t('open_data.entities_violate_competition.contentOfAction', 'en') + ' (en)'"
              />
            </b-col>
          </b-row>
        </ValidationObserver>
      </base-create-or-update-wrapper>
    </b-col>
  </b-row>
</template>
<script>
const MAIN_API_URL = 'open-data/entities-violate-competition';
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
      return this.$route.name === 'CreateOpenDataEntitiesViolateCompetition'
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