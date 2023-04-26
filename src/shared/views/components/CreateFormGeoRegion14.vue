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
        <BaseInputWithValidation
            rules="required"
            class="required"
            v-model="editingItem.nameUz"
            :label="$t('column.name_uz')"
            :placeholder="$t('column.name_uz')"
            :disabled="isDisabled()"
        />
      </b-col>
      <b-col
          sm="12"
          md="6"
      >
        <BaseInputWithValidation
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
        <BaseInputWithValidation
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
        <BaseInputWithValidation
            not-required
            v-model="editingItem.soato"
            :label="$t('column.soato')"
            :placeholder="$t('column.soato')"
        />
      </b-col>
    </b-row>
  </ValidationObserver>
</template>
<script>
const MAIN_API_URL = 'geographical-region'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"
export default {
  name: "CreateFormGeoRegion14",
  props: {
    customIsModeCreate: {
      type: Boolean,
      default: false
    },
    additionalParams: {
      type: Object,
      default: () => {

      },
    }

  },
  /*
  * COMPONENTS */
  components: {},
  /*
  * DATA */
  data() {
    return {
      editingItem: {},
      regions: [],
      districts: [],
      quarters: [],
      hasNextPageQuarters: false,
      debounce: null,
    }
  },
  /*
  * COMPUTED */
  computed: {
    isModeCreate() {
      return this.customIsModeCreate ? this.customIsModeCreate : this.$route.name === 'CreateGeoRegions14'
    },
    computedObserver() {
      return this.$refs.formGeoRegion14.$refs.observer
    }
  },
  /*
  * METHODS */
  methods: {
    isDisabled() {
      return this.additionalParams ? this.disabled = true : this.disabled = true
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
  },
  /*
  WATCH */
  watch: {
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