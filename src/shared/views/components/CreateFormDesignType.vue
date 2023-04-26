<template>
  <ValidationObserver
      ref="observer"
      v-slot="{}"
  >
    <b-row class="mb-3">
      <b-col
          sm="12"
          md="6"
      >
        <BaseTextareaWithValidation
            rules="required"
            class="required"
            v-model="editingItem.nameUz"
            :label="$t('column.name_uz')"
            :placeholder="$t('column.name_uz')"
        />
      </b-col>
      <b-col
          sm="12"
          md="6"
      >
        <BaseTextareaWithValidation
            not-required
            v-model="editingItem.nameLt"
            :label="$t('column.name_lt')"
            :placeholder="$t('column.name_lt')"
        />
      </b-col>
    </b-row>

    <b-row class="mb-3">
      <b-col
          sm="12"
          md="6"
      >
        <BaseTextareaWithValidation
            not-required
            v-model="editingItem.nameRu"
            :label="$t('column.name_ru')"
            :placeholder="$t('column.name_ru')"
        />
      </b-col>
      <b-col
          sm="12"
          md="6"
      >
        <BaseSelectWithValidation
            v-model="editingItem.statusId"
            class="required"
            rules="required"
            :label="$t('column.status')"
            value-field="id"
        >
          <template #first>
            <b-form-select-option
                :value="null"
                disabled
            >{{ $t('column.status') }}
            </b-form-select-option>
            <b-form-select-option v-for="(status, index) in statuses" :key="`${status}-${index}`" :value="status.id">{{
                getName({
                  nameRu: status.nameRu,
                  nameLt: status.nameLt,
                  nameUz: status.nameUz,
                })
              }}
            </b-form-select-option>
          </template>
        </BaseSelectWithValidation>
      </b-col>
    </b-row>
  </ValidationObserver>
</template>
<script>
import BaseTextareaWithValidation from "../../../components/base/BaseTextareaWithValidation";
const MAIN_API_URL = 'directory/advertisement-design-type'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

export default {
  name: "CreateOrUpdate",
  props: {
    customIsModeCreate: {
      type: Boolean,
      default: false
    }
  },
  /*
  * COMPONENTS */
  components: {BaseTextareaWithValidation},
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
      return this.customIsModeCreate ? this.customIsModeCreate : this.$route.name === 'CreateAdvertisementDesignType'
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
    }
  },
  /*
  * CREATED */
  async created() {
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
    // GET STATUSES
    await helperService.getRefByCode('status')
        .then(res => {
          this.statuses = res.data.children
          if (this.isModeCreate) {
            let activeStatus = this.statuses.find(el => el.code == 'ACTIVE')
            if (activeStatus) {
              this.editingItem.statusId = activeStatus.id
            }
          }
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