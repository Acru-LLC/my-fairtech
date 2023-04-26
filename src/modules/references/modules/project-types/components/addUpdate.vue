<template>
  <div>
    <label class="mb-2">{{ $t("column.name_en") }}</label>
    <b-form-textarea
      :class="submitted && $v.form.nameLt.$anyError ? 'is-invalid' : ''"
      rows="2"
      class="mb-2"
      v-model="$v.form.nameLt.$model"
    ></b-form-textarea>

    <label class="mb-2">{{ $t("column.name_ru") }}</label>
    <b-form-textarea
      :class="submitted && $v.form.nameRu.$anyError ? 'is-invalid' : ''"
      rows="2"
      v-model="$v.form.nameRu.$model"
    ></b-form-textarea>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, integer } from "vuelidate/lib/validators";
export default {
  validations: {
    form: {
      nameLt: {
        required,
      },
      nameRu: {
        required,
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
        nameRu: "",
      },
    };
  },
};
</script>

<style>
</style>