<template>
  <div>
    <label>{{ $t("date") }}</label>
    <date-picker
      :class="submitted && $v.form.date.$anyError ? 'dateClass' : ''"
      format="DD-MM-YYYY"
      value-type="date"
      v-model="$v.form.date.$model"
      :first-day-of-week="1"
      lang="en"
    ></date-picker>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import DatePicker from "vue2-datepicker";

import { g_label } from "@/helper";

export default {
  components: {
    DatePicker,
  },
  validations: {
    form: {
      date: {
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
      search2: "",
      list: [],
      g_label: g_label,
      submitted: false,
      valueList: [],
      search: "",
      form: {
        date: "",
      },
    };
  },
};
</script>

<style>
</style>