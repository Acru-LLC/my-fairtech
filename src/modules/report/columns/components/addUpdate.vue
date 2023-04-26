<template>
  <ValidationObserver
      ref="observer"
      v-slot="{}"
  >
    <BaseTextareaWithValidation
        @input="($event) => (form.nameLt = toLatin($event))"
        rules="required"
        class="required"
        v-model="form.nameUz"
        rows="2"
        :label="$t('column.name_uz')"
        label-on-top
    />

    <BaseTextareaWithValidation
        @input="($event) => (form.nameUz = toCyrill($event))"
        not-required
        v-model="form.nameLt"
        custom-classes="mt-3"
        rows="2"
        :label="$t('column.name_lt')"
        label-on-top
    />
    <BaseTextareaWithValidation
        not-required
        custom-classes="mt-3"
        v-model="form.nameRu"
        rows="2"
        :label="$t('column.name_ru')"
        label-on-top
    />

    <div class="mt-3">

      <BaseMultiselectWithValidation
          rules="required"
          class="required"
          v-model="form.typeId"
          :options="valueList.map(e => e.id)"
          :label="$t('column.value_type')"
          label-on-top
          placeholder=""
          :custom-label="customLabelValueType"
          open-direction="bottom"
          :max-height="600"
          :show-labels="false"
      />
    </div>
    <div
        v-if="isValueTypeSelect"
        class="mt-3"
    >
      <BaseMultiselectWithValidation
          rules="required"
          class="required"
          v-model="form.referenceId"
          :options="referencesList.map(e => e.id)"
          :label="$t('submodules.references.title')"
          label-on-top
          placeholder=""
          :custom-label="customLabelReference"
          open-direction="bottom"
          :max-height="600"
          :show-labels="false"
      />
    </div>

    <BaseTextareaWithValidation
        not-required
        v-model="form.comment"
        custom-classes="mt-3"
        rows="2"
        :label="$t('column.comment')"
        label-on-top
    />
  </ValidationObserver>
</template>

<script>
import Service from "../../reportService";
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
  data() {
    return {
      submitted: false,
      valueList: [],
      referencesList: [],
      form: {
        nameLt: "",
        nameUz: "",
        nameRu: "",
        typeId: null,
        referenceId: null,
        comment: ""
      },
    };
  },
  created() {
    this.var_default_search_payload.itemsPerPage = 500;
    Service.getValueList()
        .then((rs) => {
          if (rs.data) {
            this.valueList = rs.data.list;
          }
        })
        .catch(() => {
        });
    // GET REFERENCES_LIST
    crudAndListsService.searchListWithKeyword('document/directory-list-for-dynamic-report-doc', this.var_default_search_payload, '').then((res) => {
      this.referencesList = res.data.list
    }).catch(e => {
      console.log(e)
      this.referencesList = [];
    })
  },
  methods: {
    customLabelReference(opt) {
      let selected = this.referencesList.find(e => e.id == opt);
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })} (${selected.code})`
      }
      return ``;
    },
    customLabelValueType(opt) {
      let selected = this.valueList.find(e => e.id == opt);
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
    },
    getValue(v) {
      this.form.typeId = v;
    },
    checkValidity() {
      this.computedObserver.validate().then(valid => {
        if (!valid) {
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
        return valid
      })
    },
    setFormData(item) {
      this.form = {...this.form, ...item};
    },
  },
  computed: {
    isValueTypeSelect() {
      let selected = this.valueList.find(e => e.id == this.form.typeId);
      if (selected && selected.code === 'SELECT') {
        return true
      }
      return false
    },
    computedObserver() {
      return this.$refs.observer
    }
  },
};
</script>

<style>
</style>
