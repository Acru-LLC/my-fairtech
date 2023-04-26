<template>
  <ValidationProvider
      :style="validationProviderCustomStyle"
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
        <label v-if="!onlyFormElement" class="base-form-component__label" >{{ $attrs.label }}</label>

        <!-- IF RESTRICTION FOR MIN MAX IS TRUE -->
        <b-form-input
            v-if="restrictMinMaxValue"
            v-model="innerValue"
            :state="getValidationState(validationContext)"
            :class="[hideNumberArrow ? 'hide-number-arrow' : '']"
            class="base-form-component__input"
            v-mask="mask"
            v-bind="$attrs"
            v-on="$listeners"
            oninput="if (this.max) {if(Number(this.value) > Number(this.max) && this.value.trim() !== '') {this.value = this.max}}
                    else if (Number(this.value) < Number(this.min) && this.value.trim() !== '') {this.value = this.min}
                    "
        >
          <template v-for="(_, slot) of $slots" v-slot:[slot]="scope" >
            <slot :name="slot" v-bind="scope" />
          </template>
        </b-form-input>

        <!-- ELSE MIN MAX IS NOT RESTRICTED -->
        <b-form-input
            v-else
            v-model="innerValue"
            :state="getValidationState(validationContext)"
            :class="[hideNumberArrow ? 'hide-number-arrow' : '']"
            class="base-form-component__input base-form-component__main-form-element"
            v-mask="mask"
            v-bind="$attrs"
            v-on="$listeners"
        >
          <template v-for="(_, slot) of $slots" v-slot:[slot]="scope" >
            <slot :name="slot" v-bind="scope" />
          </template>
        </b-form-input>

        <!-- APPEND SLOT -->
        <b-input-group-append v-if="withInputAppend" class="base-form-input__append" >
          <slot name="append-slot"></slot>
        </b-input-group-append>

        <!-- INVALID FEEDBACK -->
        <b-form-invalid-feedback v-if="!hideErrorMsg && !onlyFormElement" class="base-form-component__invalid-feedback">
          {{ validationContext.errors[0] }}
        </b-form-invalid-feedback>

        <!-- HELP TEXT -->
        <b-form-text v-if="infoMsg && !onlyFormElement" class="base-form-component__info-msg" >
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
    onlyFormElement: {
      type: Boolean,
      default: false
    },
    labelOnTop: {
      type: Boolean,
      default: false
    },
    customStyles: {
      type: [Object, String],
      default: () => {
      }
    },
    validationProviderCustomStyle: {
      type: [Object, String],
      default: () => {
      }
    },
    customClasses: {
      type: [Object, String],
      default: () => {
      }
    },
    withInputAppend: {
      type: Boolean,
      default: false
    },
    hideNumberArrow: {
      type: Boolean,
      default: false
    },
    hideErrorMsg: {
      type: Boolean,
      default: false
    },
    restrictMinMaxValue: {
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
    getValidationState({ dirty, validated, valid = null }) {
      if (this.notRequired)
        return null
      return dirty || validated ? valid : null;
    },
  },
  watch: {
    // Handles internal model changes.
    /* innerValue (newVal) {
        this.$emit('input', newVal);
    }, */
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

  .base-form-component__main-form-element {
    grid-column: span 2;
  }
}
</style>
