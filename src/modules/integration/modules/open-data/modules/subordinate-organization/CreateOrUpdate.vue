<template>
  <b-row class="mb-3">
    <b-col md="12" class="text-center">
      <div class="h4 mb-4 d-inline-block">
        {{ $t('open_data.subordinate_organization.code') }} - {{ $t('open_data.subordinate_organization.title') }}
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
                  v-model="editingItem.organizationNameLt"
                  :label="$t('open_data.subordinate_organization.organization_name', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.subordinate_organization.organization_name', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.organizationNameUz"
                  :label="$t('open_data.subordinate_organization.organization_name', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.subordinate_organization.organization_name', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.organizationNameRu"
                  :label="$t('open_data.subordinate_organization.organization_name', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.subordinate_organization.organization_name', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.organizationNameEn"
                  :label="$t('open_data.subordinate_organization.organization_name', 'en') + ' (en)'"
                  :placeholder="$t('open_data.subordinate_organization.organization_name', 'en') + ' (en)'"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.addressLt"
                  :label="$t('open_data.subordinate_organization.address', 'uz') + ' (o\'z)'"
                  :placeholder="$t('open_data.subordinate_organization.address', 'uz') + ' (o\'z)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.addressUz"
                  :label="$t('open_data.subordinate_organization.address', 'uzCyrillic') + ' (ўз)'"
                  :placeholder="$t('open_data.subordinate_organization.address', 'uzCyrillic') + ' (ўз)'"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.addressRu"
                  :label="$t('open_data.subordinate_organization.address', 'ru') + ' (ру)'"
                  :placeholder="$t('open_data.subordinate_organization.address', 'ru') + ' (ру)'"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.addressEn"
                  :label="$t('open_data.subordinate_organization.address', 'en') + ' (en)'"
                  :placeholder="$t('open_data.subordinate_organization.address', 'en') + ' (en)'"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.latitude"
                  :label="$t('open_data.subordinate_organization.latitude')"
                  :placeholder="$t('open_data.subordinate_organization.latitude')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.longitude"
                  :label="$t('open_data.subordinate_organization.longitude')"
                  :placeholder="$t('open_data.subordinate_organization.longitude')"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.addressLocation"
                  :label="$t('open_data.subordinate_organization.email')"
                  :placeholder="$t('open_data.subordinate_organization.email')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.email"
                  :label="$t('open_data.subordinate_organization.phone')"
                  :placeholder="$t('open_data.subordinate_organization.phone')"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.phone"
                  :label="$t('open_data.subordinate_organization.address_location')"
                  :placeholder="$t('open_data.subordinate_organization.address_location')"
              />
            </b-col>
          </b-row>
        </ValidationObserver>
      </base-create-or-update-wrapper>
    </b-col>
  </b-row>
</template>
<script>
const MAIN_API_URL = 'open-data/subordinate-organization';
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
      return this.$route.name === 'CreateOpenDataSubordinateOrganization'
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