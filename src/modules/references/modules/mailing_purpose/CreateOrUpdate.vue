<template>
  <base-create-or-update-wrapper
      @save="save"
      has-save-suspend
      :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
  >
    <CreateFormMailingPurpose ref="formMailingPurpose"></CreateFormMailingPurpose>
  </base-create-or-update-wrapper>
</template>
<script>
import CreateFormMailingPurpose from "@/shared/views/components/CreateFormMailingPurpose";

const MAIN_API_URL = 'before-commission/directory/mailing-purpose'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
  name: "CreateOrUpdate",
  /*
  * COMPONENTS */
  components: {
    CreateFormMailingPurpose
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
      return this.$route.name === 'CreateMailingPurpose'
    },
    computedObserver() {
      return this.$refs.formMailingPurpose.$refs.observer
    }
  },
  /*
  * METHODS */
  methods: {
    save() {
      this.computedObserver.validate().then(valid => {
        if (valid) {
          this.$refs.formMailingPurpose.editingItem.processIds = []
          this.$refs.formMailingPurpose.editingItem.processIds.push(this.$refs.formMailingPurpose.firstProcessId)
          this.$refs.formMailingPurpose.editingItem.processIds.push(this.$refs.formMailingPurpose.secondProcessId)
          if (this.$refs.formMailingPurpose.editingItem.id) {
            crudAndListsService.update(MAIN_API_URL, this.$refs.formMailingPurpose.editingItem, null, true).then(res => {
              this.computedObserver.reset()
              this.$refs.formMailingPurpose.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          } else {
            crudAndListsService.create(MAIN_API_URL, this.$refs.formMailingPurpose.editingItem, null, true).then(res => {
              this.computedObserver.reset()
              this.$refs.formMailingPurpose.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          }
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      });
    }
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