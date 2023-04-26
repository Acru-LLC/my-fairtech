<template>
  <ValidationProvider
      :mode="notRequired ? 'passive' : 'aggressive'"
      :name="$attrs.name ? $attrs.name : $attrs.label"
      :rules="rules"
  >
    <template v-slot:default="validationContext">
      <div
          class="base-input-wrapper base-form-input base-form-component"
          :class="[withInputAppend ? 'base-form-input-with-append' : '', labelOnTop ? 'base-form-component__label-on-top' : '', customClasses]"
          :style="customStyles"
      >
        <!-- LABEL -->
        <label class="base-form-component__label">{{ $attrs.label }}</label>

        <b-form-select
            v-model="innerValue"
            :state="getValidationState(validationContext)"
            v-bind="$attrs"
            v-on="$listeners"
            class="form-control"
        >
          <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope" >
            <slot :name="slot" v-bind="scope" />
          </template>
        </b-form-select>

        <!-- INVALID FEEDBACK -->
        <b-form-invalid-feedback
            v-if="!hideErrorMsg && validationContext.validated"
            :style="validationContext.errors.length > 0 ? {'display': 'block', 'margin-top': '.15rem'} : {}"
            class="base-form-component__invalid-feedback"
        >
          {{ validationContext.errors[0] }}
        </b-form-invalid-feedback>

        <!-- HELP TEXT -->
        <b-form-text v-if="infoMsg" class="base-form-component__info-msg" >
          {{ infoMsg }}
        </b-form-text>
      </div>
    </template>
  </ValidationProvider>
</template>

<script>

export default {
  props: {
    infoMsg: {
      type: String,
      default: ''
    },
    mask: {
      type: String,
      default: ''
    },
    notRequired: {
      type: Boolean,
      default: false
    },
    hideErrorMsg: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Object, String],
      default: () => {
      }
    },
    // must be included in props
    value: {
      type: null
    },
    withInputAppend: {
      type: String,
      default: '',
    },
    labelOnTop: {
      type: Boolean,
      default: false,
    },
    customClasses: {
      type: String,
      default: '',
    },
    customStyles: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    innerValue: ''
  }),
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      if (this.notRequired)
        return null
      return dirty || validated ? valid : null;
    },
  },
  watch: {
    // Handles internal model changes.
    innerValue(newVal) {
      this.$emit('input', newVal);
    },
    // Handles external model changes.
    value(newVal) {
      this.innerValue = newVal;
    }
  },
  created() {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep.base-form-input-with-append {
  &.base-form-input {
    grid-template-columns: 25% 61.5% 5.5% !important;

    @media (min-width: 460px) {
      grid-template-columns: 25% 66.5% 9.5% !important;
    }

    @media (min-width: 768px) {
      grid-template-columns: 25% 63.5% 9.5% !important;
    }

    @media (min-width: 1200px) {
      grid-template-columns: 25% 65.5% 9.5% !important;
    }

    @media (min-width: 1400px) {
      grid-template-columns: 25% 67.5% 9.5% !important;
    }

    @media (min-width: 1650px) {
      grid-template-columns: 25% 70% 5% !important;
    }
    input {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
    .base-form-input__append {
      .btn {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
      }
    }
    .base-form-component__invalid-feedback,
    .base-form-component__info-msg {
      grid-column: span 2 !important;
      grid-column-start: 2 !important;
    }
  }
}
::v-deep.base-form-component__label-on-top {
  &.base-form-input-with-append {
    grid-template-columns: 25% 65% 5% !important;
    @media (min-width: 1200px) {
      grid-template-columns: 25% 60% 5% !important;
    }
    @media (min-width: 1400px) {
      grid-template-columns: 25% 65% 5% !important;
    }
  }
  label {
    grid-column: span 2;
  }
  select.form-control {
    grid-column: span 2;
  }
}
</style>
