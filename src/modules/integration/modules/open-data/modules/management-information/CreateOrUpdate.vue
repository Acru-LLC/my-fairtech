<template>
  <b-row class="mb-3">
    <b-col md="12" class="text-center">
      <div class="h4 mb-4 d-inline-block">
        {{ $t('open_data.management_information.code') }} - {{ $t('open_data.management_information.title') }}
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
            <b-col sm="12" md="6">
              <BaseInputWithValidation
                  v-model="editingItem.fullNameLt"
                  :label="$t('column.fio', 'uz') + ' (o\'z)'"
                  :placeholder="$t('column.fio', 'uz') + ' (o\'z)'"
              />
              <BaseInputWithValidation
                  v-model="editingItem.fullNameUz"
                  :label="$t('column.fio', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('column.fio', 'uzCyrillic') + ' (ўз)'"
              />
              <BaseInputWithValidation
                  v-model="editingItem.fullNameRu"
                  :label="$t('column.fio', 'ru') + ' (ру)'"
                  :placeholder="$t('column.fio', 'ru') + ' (ру)'"
              />
              <BaseInputWithValidation
                  v-model="editingItem.fullNameEn"
                  :label="$t('column.fio', 'en') + ' (en)'"
                  :placeholder="$t('column.fio', 'en') + ' (en)'"
              />
            </b-col>
            <b-col sm="12" md="6">
              <BaseInputWithValidation
                  v-model="editingItem.positionLt"
                  :label="$t('column.position', 'uz') + ' (o\'z)'"
                  :placeholder="$t('column.position', 'uz') + ' (o\'z)'"
              />
              <BaseInputWithValidation
                  v-model="editingItem.positionUz"
                  :label="$t('column.position', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('column.position', 'uzCyrillic') + ' (ўз)'"
              />
              <BaseInputWithValidation
                  v-model="editingItem.positionRu"
                  :label="$t('column.position', 'ru') + ' (ру)'"
                  :placeholder="$t('column.position', 'ru') + ' (ру)'"
              />
              <BaseInputWithValidation
                  v-model="editingItem.positionEn"
                  :label="$t('column.position', 'en') + ' (en)'"
                  :placeholder="$t('column.position', 'en') + ' (en)'"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6">
              <BaseInputWithValidation
                  v-model="editingItem.receptionDaysLt"
                  :label="$t('column.reception_days', 'uz') + ' (o\'z)'"
                  :placeholder="$t('column.reception_days', 'uz') + ' (o\'z)'"
              />
              <BaseInputWithValidation
                  v-model="editingItem.receptionDaysUz"
                  :label="$t('column.reception_days', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('column.reception_days', 'uzCyrillic') + ' (ўз)'"
              />
              <BaseInputWithValidation
                  v-model="editingItem.receptionDaysRu"
                  :label="$t('column.reception_days', 'ru') + ' (ру)'"
                  :placeholder="$t('column.reception_days', 'ru') + ' (ру)'"
              />
              <BaseInputWithValidation
                  v-model="editingItem.receptionDaysEn"
                  :label="$t('column.reception_days', 'en') + ' (en)'"
                  :placeholder="$t('column.reception_days', 'en') + ' (en)'"
              />
            </b-col>
            <b-col sm="12" md="6">
              <BaseInputWithValidation
                  v-model="editingItem.fromTime"
                  :label="$t('column.time') + ' ' + $t('column.from')"
                  placeholder="10:00"
              />
              <BaseInputWithValidation
                  v-model="editingItem.toTime"
                  :label="$t('column.time') + ' ' + $t('column.to')"
                  placeholder="20:00"
              />
              <BaseInputWithValidation
                  type="tel"
                  v-model="editingItem.phone"
                  :label="$t('column.phone_number')"
                  :placeholder="$t('column.phone_number')"
              />
              <BaseInputWithValidation
                  type="email"
                  v-model="editingItem.email"
                  :label="$t('profile.email')"
                  :placeholder="$t('profile.email')"
              />
            </b-col>
          </b-row>
        </ValidationObserver>
      </base-create-or-update-wrapper>
    </b-col>
  </b-row>
</template>
<script>
const MAIN_API_URL = 'open-data/management-information';
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
      return this.$route.name === 'CreateOpenDataManagementInformation'
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
        await crudAndListsService.getEmpty(MAIN_API_URL)
            .then(res => {
              this.editingItem = res.data
            })
            .catch(e => {
              console.log(e)
            })
      } else {
        await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, false)
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