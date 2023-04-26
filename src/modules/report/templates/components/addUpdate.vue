<template>
  <div>
    <div class="mb-2">
      <DateTypes
          @dateTypeVal="dateTypeVal"
          :submitted="submitted"
          ref="dateTypesRef"
      />
    </div>
    <div class="mt-2">
      <label class="mb-2">{{ $t("column.name_uz") }}</label>
      <b-form-input
          @input="($event) => (form.nameLt = toLatin($event))"
          :class="submitted && $v.form.nameUz.$anyError ? 'is-invalid' : ''"
          class="mb-2"
          v-model="$v.form.nameUz.$model"
      ></b-form-input>

      <label class="mb-2">{{ $t("column.name_lt") }}</label>
      <b-form-input
          :class="submitted && $v.form.nameLt.$anyError ? 'is-invalid' : ''"
          class="mb-2"
          v-model="$v.form.nameLt.$model"
          @input="($event) => (form.nameUz = toCyrill($event))"
      ></b-form-input>

      <label class="mb-2">{{ $t("column.name_ru") }}</label>
      <b-form-input
          :class="submitted && $v.form.nameRu.$anyError ? 'is-invalid' : ''"
          class="mb-2"
          v-model="$v.form.nameRu.$model"
      ></b-form-input>
    </div>

    <div class="mt-2">
      <label class="mb-0">{{ `${$t("conditionTable")} (ўз)` }}</label>
      <b-form-textarea
          @input="($event) => (form.conditionLt = toLatin($event))"
          :class="submitted && $v.form.conditionUz.$anyError ? 'is-invalid' : ''"
          rows="2"
          class="mb-2"
          v-model="$v.form.conditionUz.$model"
      ></b-form-textarea>
      <label class="mb-0">{{ `${$t("conditionTable")} (o'z)` }}</label>
      <b-form-textarea
          @input="($event) => (form.conditionUz = toCyrill($event))"
          :class="submitted && $v.form.conditionLt.$anyError ? 'is-invalid' : ''"
          rows="2"
          class="mb-2"
          v-model="$v.form.conditionLt.$model"
      ></b-form-textarea>

      <label class="mb-0">{{ `${$t("conditionTable")} (ru)` }}</label>
      <b-form-textarea
          :class="submitted && $v.form.conditionRu.$anyError ? 'is-invalid' : ''"
          rows="2"
          v-model="$v.form.conditionRu.$model"
      ></b-form-textarea>

    </div>

    <div class="mt-2">
      <label class="mb-2">{{ `${$t("titleTable")} (ўз)` }}</label>
      <b-form-input
          :class="submitted && $v.form.titleUz.$anyError ? 'is-invalid' : ''"
          class="mb-2"
          @input="($event) => (form.titleLt = toLatin($event))"
          v-model="$v.form.titleUz.$model"
      ></b-form-input>

      <label class="mb-2">{{ `${$t("titleTable")} (o'z)` }}</label>
      <b-form-input
          :class="submitted && $v.form.titleLt.$anyError ? 'is-invalid' : ''"
          class="mb-2"
          @input="($event) => (form.titleUz = toCyrill($event))"
          v-model="$v.form.titleLt.$model"
      ></b-form-input>

      <label class="m-0">{{ `${$t("titleTable")} (ru)` }}</label>
      <b-form-input
          :class="submitted && $v.form.titleRu.$anyError ? 'is-invalid' : ''"
          v-model="$v.form.titleRu.$model"
      ></b-form-input>
    </div>

    <div v-if="isGenerated || form.isGenerated" class="mt-2" >
      <label class="mb-0 mt-1">{{ $t("submodules.reports.auto_generated_types") }}</label>
      <b-form-select :required="isGenerated" v-model="$v.form.generateType.$model"
                     :class="submitted && $v.form.generateType.$anyError ? 'is-invalid' : ''">
        <b-select-option value="PETROL" selected>{{ $t("submodules.reports.auto_generated_types_petrol") }}</b-select-option>
        <b-select-option value="SUGAR" selected>{{ $t("submodules.reports.auto_generated_types_sugar") }}</b-select-option>
        <b-select-option value="FLOUR" selected>{{ $t("submodules.reports.auto_generated_types_flour") }}</b-select-option>
        <b-select-option value="BAKERY" selected>{{ $t("submodules.reports.auto_generated_types_bakery") }}</b-select-option>
      </b-form-select>
    </div>

  </div>

</template>

<script>
import {validationMixin} from "vuelidate";
import {required, requiredIf} from "vuelidate/lib/validators";
import DateTypes from "./date-types.vue";

export default {
  components: {
    DateTypes,
  },
  /*
  PROPS */
  props: {
    isGenerated: {
      type: Boolean,
      default: false
    }
  },
  validations: {
    form: {
      nameUz: {
        required,
      },
      nameLt: {
        required,
      },
      nameRu: {
        required,
      },
      conditionLt: {
        required,
      },
      conditionRu: {
        required,
      },
      conditionUz: {
        required,
      },
      titleRu: {
        required,
      },
      titleLt: {
        required,
      },
      titleUz: {
        required,
      },
      dateTypeId: {
        required,
      },
      generateType: {
        required: requiredIf(function () {
          return this.isGenerated;
        })
      },
    },
  },
  mixins: [validationMixin],
  methods: {
    dateTypeVal(v) {
      if (v && v.id) {
        this.form.dateTypeId = v.id;
      } else {
        this.form.dateTypeId = null;
      }
    },
    checkValidity() {
      this.submitted = true;
      this.$v.form.$touch();
      return this.$v.form.$anyError;
    },
    setFormData(item) {
      this.form = {...this.form, ...item};

      this.$refs.dateTypesRef.setEditedData(item)
    },

  },

  data() {
    return {
      submitted: false,
      form: {
        dateTypeId: null,
        nameLt: "",
        nameRu: "",
        nameUz: "",
        conditionUz: "",
        conditionLt: "",
        conditionRu: "",
        titleLt: "",
        titleRu: "",
        titleUz: "",
        statusId: null,
        isGenerated: false,
        isGathered: false,
        generateType: '',
      },
    };
  },
};
</script>

<style>
</style>
