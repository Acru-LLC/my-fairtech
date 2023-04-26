<template>
  <b-row class="mb-3">
    <b-col md="12" class="text-center">
      <div class="h4 mb-4 d-inline-block">
        {{ $t('open_data.explanation_and_warning.code') }} - {{ $t('open_data.explanation_and_warning.title') }}
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
                  v-model="editingItem.areaNameLt"
                  :label="$t('open_data.explanation_and_warning.areaName', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.explanation_and_warning.areaName', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.name"
                  :label="$t('open_data.explanation_and_warning.name')"
                  :placeholder="$t('open_data.explanation_and_warning.name')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.areaNameUz"
                  :label="$t('open_data.explanation_and_warning.areaName', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.explanation_and_warning.areaName', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.mjtk"
                  :label="$t('open_data.explanation_and_warning.mjtk')"
                  :placeholder="$t('open_data.explanation_and_warning.mjtk')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.areaNameRu"
                  :label="$t('open_data.explanation_and_warning.areaName', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.explanation_and_warning.areaName', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.fine"
                  :label="$t('open_data.explanation_and_warning.fine')"
                  :placeholder="$t('open_data.explanation_and_warning.fine')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.areaNameEn"
                  :label="$t('open_data.explanation_and_warning.areaName', 'en') + ' (en)'"
                  :placeholder="$t('open_data.explanation_and_warning.areaName', 'en') + ' (en)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.sum"
                  :label="$t('open_data.explanation_and_warning.sum')"
                  :placeholder="$t('open_data.explanation_and_warning.sum')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.rejectedFine"
                  :label="$t('open_data.explanation_and_warning.rejectedFine')"
                  :placeholder="$t('open_data.explanation_and_warning.rejectedFine')"
              />
            </b-col>
          </b-row>
        </ValidationObserver>
      </base-create-or-update-wrapper>
    </b-col>
  </b-row>
</template>
<script>
const MAIN_API_URL = 'open-data/explanation-and-warning';
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
      return this.$route.name === 'CreateOpenDataExplanationAndWarning'
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