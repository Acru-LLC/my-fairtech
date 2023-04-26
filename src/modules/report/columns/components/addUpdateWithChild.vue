<template>
  <div>
    <label class="mb-2">{{ $t("column.name_uz") }}</label>
    <b-form-textarea
      :class="submitted && $v.form.nameUz.$anyError ? 'is-invalid' : ''"
      rows="2"
      class="mb-2"
      @input="($event) => (form.nameLt = toLatin($event))"
      v-model="$v.form.nameUz.$model"
    ></b-form-textarea>

    <label class="mb-2">{{ $t("column.name_lt") }}</label>
    <b-form-textarea
        @input="($event) => (form.nameUz = toCyrill($event))"
        :class="submitted && $v.form.nameLt.$anyError ? 'is-invalid' : ''"
        rows="2"
        v-model="$v.form.nameLt.$model"
    ></b-form-textarea>

    <label class="mb-2">{{ $t("column.name_ru") }}</label>
    <b-form-textarea
      :class="submitted && $v.form.nameRu.$anyError ? 'is-invalid' : ''"
      rows="2"
      v-model="$v.form.nameRu.$model"
    ></b-form-textarea>



    <BaseTextareaWithValidation
        not-required
        v-model="form.comment"
        custom-classes="mt-3"
        rows="2"
        :label="$t('column.comment')"
        label-on-top
    />
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, integer } from "vuelidate/lib/validators";

export default {
  validations: {
    form: {
      nameLt: {
      },
      nameUz: {
        required,
      },
      nameRu: {
      },
    },
  },
  mixins: [validationMixin],
  methods: {
    checkValidity() {
      this.submitted = true;
      this.$v.form.$touch();
      return this.$v.form.$anyError;
    },
    setFormData(item) {
      this.form = { ...this.form, ...item };
    },
  },

  data() {
    return {
      submitted: false,
      form: {
        nameLt: "",
        nameUz: "",
        nameRu: "",
        comment: ""
      },
    };
  },
};
</script>

<style>
</style>
