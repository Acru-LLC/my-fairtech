<template>
  <ValidationProvider
      :mode="notRequired ? 'passive' : 'aggressive'"
      :name="$attrs.name ? $attrs.name : $attrs.label"
      :rules="rules"
  >
    <template v-slot:default="validationContext">
      <div
          class="base-textarea-wrapper base-form-textarea base-form-component"
          :class="[labelOnTop ? ['base-form-component__label-on-top', ...customClasses] : [...customClasses]]"
          :style="customStyles"
      >
        <!-- LABEL -->
        <label class="base-form-component__label">{{ $attrs.label }}</label>

        <b-form-textarea
            v-model="innerValue"
            :state="getValidationState(validationContext)"
            class="base-form-component__textarea base-form-component__main-form-element"
            v-mask="mask"
            v-bind="$attrs"
            v-on="$listeners"
        >
          <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope"/>
          </template>
        </b-form-textarea>

        <!-- INVALID FEEDBACK -->
        <b-form-invalid-feedback v-if="!hideErrorMsg" class="base-form-component__invalid-feedback">
          {{ validationContext.errors[0] }}
        </b-form-invalid-feedback>

        <!-- HELP TEXT -->
        <b-form-text v-if="infoMsg" class="base-form-component__info-msg">
          {{ infoMsg }}
        </b-form-text>
      </div>
    </template>
  </ValidationProvider>
</template>

<script>

export default {
  props: {
    customClasses: {
      type: [Object, String],
      default: () => ''
    },
    customStyles: {
      type: [Object, String],
      default: () => {
      }
    },
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
    labelOnTop: {
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
    }
  },
  data: () => ({
    innerValue: ''
  }),
  methods: {
    getValidationState({dirty, validated, valid = null}) {
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

  .base-form-component__main-form-element {
    grid-column: span 2;
  }
}

</style>
