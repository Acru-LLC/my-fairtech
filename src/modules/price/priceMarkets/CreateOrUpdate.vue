<template>
  <base-create-or-update-wrapper
      @save="save"
      has-save-suspend
      :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
  >
    <CreateForm ref="formOfficeType"></CreateForm>
  </base-create-or-update-wrapper>
</template>
<script>
import CreateForm from "./CreateForm.vue";

const MAIN_API_URL = 'price_market'
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
  name: "CreateOrUpdate",
  /*
  * COMPONENTS */
  components: {
    CreateForm
  },
  /*
  * DATA */
  data() {
    return {}

  },
  /*
  * COMPUTED */
  computed: {
    isModeCreate() {
      return this.$route.name === 'CreatePriceMarkets'
    },
    computedObserver() {
      return this.$refs.formOfficeType.$refs.observer
    }
  },
  /*
  * METHODS */
  methods: {
    treeClosed(veeName) {
      this.computedObserver.refs[veeName].validate();
    },
    normalizer(node) {
      if (!node.children || node.children.length === 0) {
        delete node.children
        return {
          id: node.id,
          label: node.name,
        }
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children && node.children.length > 0 ? node.children : [],
      }
    },
    save() {
      this.computedObserver.validate().then(valid => {
        if (valid) {

          if (this.$refs.formOfficeType.editingItem.id) {

            let form = {
              id: this.$refs.formOfficeType.editingItem.id,
              address: this.$refs.formOfficeType.editingItem.address,
              pinfl: this.$refs.formOfficeType.editingItem.pinfl,
              businessStructureName: this.$refs.formOfficeType.editingItem.businessStructureName,
              code: this.$refs.formOfficeType.editingItem.code,
              marketTypeId: this.$refs.formOfficeType.editingItem.marketTypeId,
              soato: this.$refs.formOfficeType.editingItem.soato,
              statusId: this.$refs.formOfficeType.editingItem.statusId,
              tin: this.$refs.formOfficeType.editingItem.tin,
              marketName: this.$refs.formOfficeType.editingItem.nameLt,
              link: this.$refs.formOfficeType.editingItem.link,
            }

            crudAndListsService.update(MAIN_API_URL, form).then(res => {
              this.computedObserver.reset()
              this.$refs.formOfficeType.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          } else {
            let form = {
              id: this.$refs.formOfficeType.editingItem.id,
              address: this.$refs.formOfficeType.editingItem.address,
              pinfl: this.$refs.formOfficeType.editingItem.pinfl,
              businessStructureName: this.$refs.formOfficeType.editingItem.businessStructureName,
              code: this.$refs.formOfficeType.editingItem.code,
              marketTypeId: this.$refs.formOfficeType.editingItem.marketTypeId,
              soato: this.$refs.formOfficeType.editingItem.soato,
              statusId: this.$refs.formOfficeType.editingItem.statusId,
              tin: this.$refs.formOfficeType.editingItem.tin,
              marketName: this.$refs.formOfficeType.editingItem.nameLt,
              link: this.$refs.formOfficeType.editingItem.link,
            }
            crudAndListsService.create(MAIN_API_URL, form).then(res => {
              this.computedObserver.reset()
              this.$refs.formOfficeType.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          }
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      });
    }
  },
  /*
  * CREATED */
  async created() {
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
