<template>
  <base-create-or-update-wrapper
      @save="save"
      has-save-suspend
      :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
  >
    <CreateFormGeoRegionQuarters ref="formGeoRegionQuarters"></CreateFormGeoRegionQuarters>
  </base-create-or-update-wrapper>
</template>
<script>
import CreateFormGeoRegionQuarters from "@/shared/views/components/CreateFormGeoRegionQuarters";

const MAIN_API_URL = 'directory/quarter-names'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

export default {
  name: "CreateOrUpdate",
  /*
  * COMPONENTS */
  components: {
    CreateFormGeoRegionQuarters
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
      return this.$route.name === 'CreateGeoRegionQuarter'
    },
    computedObserver() {
      return this.$refs.formGeoRegionQuarters.$refs.observer
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
          if (this.$refs.formGeoRegionQuarters.editingItem.id) {
            crudAndListsService.update(MAIN_API_URL, this.$refs.formGeoRegionQuarters.editingItem).then(res => {
              this.computedObserver.reset()
              this.$refs.formGeoRegionQuarters.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          } else {
            crudAndListsService.create(MAIN_API_URL, this.$refs.formGeoRegionQuarters.editingItem).then(res => {
              this.computedObserver.reset()
              this.$refs.formGeoRegionQuarters.editingItem = Object.assign({}, {});
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