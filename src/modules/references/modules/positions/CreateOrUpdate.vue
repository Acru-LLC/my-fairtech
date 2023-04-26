<template>
  <base-create-or-update-wrapper
      @save="save"
      has-save-suspend
      :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
  >
    <CreateFormPositions ref="formPositions"></CreateFormPositions>
  </base-create-or-update-wrapper>
</template>
<script>
import CreateFormPositions from "@/shared/views/components/CreateFormPositions";

const MAIN_API_URL = 'directory/position'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

export default {
  name: "CreateOrUpdate",
  /*
  * COMPONENTS */
  components: {
    CreateFormPositions
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
      return this.$route.name === 'CreatePosition'
    },
    computedObserver() {
      return this.$refs.formPositions.$refs.observer
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
          if (this.$refs.formPositions.editingItem.id) {
            crudAndListsService.update(MAIN_API_URL, this.$refs.formPositions.editingItem).then(res => {
              this.computedObserver.reset()
              this.$refs.formPositions.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          } else {
            crudAndListsService.create(MAIN_API_URL, this.$refs.formPositions.editingItem).then(res => {
              this.computedObserver.reset()
              this.$refs.formPositions.editingItem = Object.assign({}, {});
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