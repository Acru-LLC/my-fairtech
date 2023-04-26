<template>
  <div>
    <label class="mb-2">{{ $t( "column.name_lt" ) }}</label>
    <b-form-textarea
        @input="($event) => (form.nameUz = toCyrill($event))"
        :class="submitted && $v.form.nameLt.$anyError ? 'is-invalid' : ''"
        rows="2"
        class="mb-2"
        v-model="$v.form.nameLt.$model"
    ></b-form-textarea>

    <label class="mb-2">{{ $t( "column.name_uz" ) }}</label>
    <b-form-textarea
        @input="($event) => (form.nameLt = toLatin($event))"
        :class="submitted && $v.form.nameUz.$anyError ? 'is-invalid' : ''"
        rows="2"
        class="mb-2"
        v-model="$v.form.nameUz.$model"
    ></b-form-textarea>

    <label class="mb-2">{{ $t( "column.name_ru" ) }}</label>
    <b-form-textarea
        :class="submitted && $v.form.nameRu.$anyError ? 'is-invalid' : ''"
        rows="2"
        v-model="$v.form.nameRu.$model"
    ></b-form-textarea>

    <label class="mb-2">{{ $t( "column.comment" ) }}</label>
    <b-form-textarea
        :class="submitted && $v.form.comment.$anyError ? 'is-invalid' : ''"
        rows="2"
        v-model="$v.form.comment.$model"
    ></b-form-textarea>

  </div>
</template>

<script>
import {validationMixin} from "vuelidate";
import {required, integer} from "vuelidate/lib/validators";


export default {
  validations: {
    form: {
      nameUz: {
        required,
      },
      nameLt: {},
      nameRu: {},
      comment: {}
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
      this.form = {...this.form, ...item};
    },
  },

  data() {
    return {
      submitted: false,
      form: {
        nameUz: "",
        nameLt: "",
        nameRu: "",
      },
    };
  },
};
</script>

<style>
</style>
