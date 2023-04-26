<template>
  <base-create-or-update-wrapper
      @save="save"
      has-save-suspend
      :custom-title="$t('actions.update')"
  >
    <ValidationObserver ref="observer" v-slot="{}">
      <b-row class="mb-3">
        <b-col sm="4">
          <BaseInputWithValidation
              rules="required"
              class="required"
              v-model="editingItem.nameUz"
              label-on-top
              :label="$t('column.name_uz')"
              :placeholder="''"
          />
        </b-col>
        <b-col sm="4">
          <BaseInputWithValidation
              not-required
              v-model="editingItem.nameLt"
              label-on-top
              :label="$t('column.name_lt')"
              :placeholder="''"
          />
        </b-col>
        <b-col sm="4">
          <BaseInputWithValidation
              not-required
              v-model="editingItem.nameRu"
              label-on-top
              :label="$t('column.name_ru')"
              :placeholder="''"
          />
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col sm="4">
          <BaseMultiselectWithValidation
              not-required
              v-model="editingItem.unitId"
              label-on-top
              :options="units.map(el => el.id)"
              :label="$t('column.units')"
              :custom-label="customLabelUnit"
              :placeholder="''"
              open-direction="bottom"
              :max-height="600"
              :show-labels="false"
          />
        </b-col>
        <b-col sm="4">
          {{ $t('actions.export_import_type')}}
          <b-form-select>
            <b-form-select-option :value="key" v-for="(value, key) in productType" :key="key">
              {{ value }}
            </b-form-select-option>
          </b-form-select>
        </b-col>
        <b-col sm="4">
          {{ $t('actions.product_type')}}
          <b-form-select>
            <b-form-select-option :value="key" v-for="(value, key) in productProductType" :key="key">
              {{ value }}
            </b-form-select-option>
          </b-form-select>
        </b-col>
      </b-row>
    </ValidationObserver>
  </base-create-or-update-wrapper>
</template>
<script>
const MAIN_API_URL = 'price/product'
/** YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import {ProductType, ProductProductType} from '@/helpers/constants'
export default {
  /** DATA */
  data() {
    return {
      editingItem: {},
      statuses: [],
      units: [],
    }
  },
  /** COMPUTED */
  computed: {
    isModeCreate() {
      return this.$route.name === 'ReferencesProductCreate'
    },
    computedObserver() {
      return this.$refs.observer
    },
    productType() {
      return ProductType
    },
    productProductType() {
      return ProductProductType
    },
  },
  /** METHODS */
  methods: {
    treeClosed(veeName) {
      this.computedObserver.refs[veeName].validate();
    },
    customLabelUnit (opt) {
      let selected = this.units.find(e => e.id == (opt.id ? opt.id : opt));
      if (selected) {
        return this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
      }
      return ``;
    },
    save() {
      this.computedObserver.validate().then(valid => {
        if (valid) {
          if (this.editingItem.id) {
            crudAndListsService.update(MAIN_API_URL, this.editingItem).then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
            })
          } else {
            crudAndListsService.create(MAIN_API_URL, this.editingItem).then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
            })
          }
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
        }
      });
    },
  },
  /** CREATED */
  async created() {
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
    await crudAndListsService.searchList('directory/units', this.var_default_search_payload)
        .then((res) => {
          this.units = res.data.list;
        })
        .catch(e => {
          console.log(e)
        })
  }
}
</script>
<style scoped>
.col-form-label {
  padding-top: 0;
}

ul {
  list-style-type: none;
}
</style>