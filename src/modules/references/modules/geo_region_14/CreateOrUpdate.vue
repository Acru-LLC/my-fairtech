<template>
  <base-create-or-update-wrapper
      @save="save"
      has-save-suspend
      :custom-title="isModeCreate ? $t('actions.update') : $t('actions.create')"
  >
    <CreateFormGeoRegion14 ref="formGeoRegion14"></CreateFormGeoRegion14>
  </base-create-or-update-wrapper>
</template>

<script>
import CreateFormGeoRegion14 from "../../../../shared/views/components/CreateFormGeoRegion14";
import crudAndListsService from "../../../../shared/services/crud_and_list.service";
const MAIN_API_URL = 'geographical-region'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */

export default {
  name: "CreateOrUpdate",
  /*
  * COMPONENTS */
  components: {
    CreateFormGeoRegion14
  },
  /*
  * DATA */
  data() {
    return {
    }
  },
  /*
  * COMPUTED */
  computed: {
    isModeCreate() {
      return this.$route.name === 'UpdateGeoRegions14'
    },
    computedObserver() {
      return this.$refs.formGeoRegion14.$refs.observer
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
          if (this.$refs.formGeoRegion14.editingItem.id) {
            crudAndListsService.update(MAIN_API_URL, this.$refs.formGeoRegion14.editingItem).then(res => {
              this.computedObserver.reset()
              this.$refs.formGeoRegion14.editingItem = Object.assign({}, {});
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
  created() {
  },
  /*
  WATCH */
  watch: {}
}
</script>

<style scoped>

</style>