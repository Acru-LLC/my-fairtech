<template>
  <base-create-or-update-wrapper
      @save="save"
      has-save-suspend
      :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
  >
    <CreateFormProcess ref="formProcess"></CreateFormProcess>
  </base-create-or-update-wrapper>
</template>
<script>
import CreateFormProcess from "@/shared/views/components/CreateFormProcess";

const MAIN_API_URL = 'before-commission/directory/process'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
  name: "CreateOrUpdate",
  /*
  * COMPONENTS */
  components: {
    CreateFormProcess
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
      return this.$route.name === 'CreateProcess'
    },
    computedObserver() {
      return this.$refs.formProcess.$refs.observer
    }
  },
  /*
  * METHODS */
  methods: {
    save() {
      this.computedObserver.validate().then(valid => {
        if (valid) {
          if (this.$refs.formProcess.editingItem.id) {
            crudAndListsService.update(MAIN_API_URL, this.$refs.formProcess.editingItem, null, true).then(res => {
              this.computedObserver.reset()
              this.$refs.formProcess.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          } else {
            crudAndListsService.create(MAIN_API_URL, this.$refs.formProcess.editingItem, null, true).then(res => {
              this.computedObserver.reset()
              this.$refs.formProcess.editingItem = Object.assign({}, {});
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