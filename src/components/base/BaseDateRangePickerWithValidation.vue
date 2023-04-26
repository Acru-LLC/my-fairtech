<template>
  <ValidationProvider
      :mode="notRequired ? 'passive' : 'aggressive'"
      :name="$attrs.name ? $attrs.name : $attrs.label"
      :rules="rules"
  >
    <template v-slot:default="validationContext">
      <div
          class="base-input-wrapper base-form-input base-form-component position-relative"
          :class="[onlyFormElement ? 'base-form-component__only-form-element' : '', labelOnTop ? 'base-form-component__label-on-top' : '',]"
          :style="customStyles"
      >
        <!-- LABEL -->
        <label
            v-if="!onlyFormElement"
            class="base-form-component__label"
        >{{ $attrs.label }}</label>

        <!-- DATE_PICKER -->
        <date-range-picker
            v-model="innerValue"
            v-bind="$attrs"
            @update="() => $emit('change')"
            :ranges="false"
            :locale-data="{
              daysOfWeek: [
                $t('date_picker.short.weekday.du'),
                $t('date_picker.short.weekday.se'),
                $t('date_picker.short.weekday.ch'),
                $t('date_picker.short.weekday.pa'),
                $t('date_picker.short.weekday.ju'),
                $t('date_picker.short.weekday.sh'),
                $t('date_picker.short.weekday.ya')
              ],
              format: 'dd.mm.yyyy',
              applyLabel: $t('actions.select'),
              cancelLabel: $t('actions.cancel'),
              monthNames:[
                $t('date_picker.short.month.jan'),
                $t('date_picker.short.month.feb'),
                $t('date_picker.short.month.mar'),
                $t('date_picker.short.month.apr'),
                $t('date_picker.short.month.may'),
                $t('date_picker.short.month.jun'),
                $t('date_picker.short.month.jul'),
                $t('date_picker.short.month.avg'),
                $t('date_picker.short.month.sep'),
                $t('date_picker.short.month.oct'),
                $t('date_picker.short.month.nov'),
                $t('date_picker.short.month.dec'),
              ],
              firstDay:0
            }"
            :timePicker24Hour="true"
            style="width: 100%"
            v-on="$listeners"
            :disabled-date="disableAfter ? disableDate : disableBefore ? disableBeforeMethod : enableDate"
            :class="[
                        (!!validationContext.errors.length || (!innerValue && validationContext.validated)) && !notRequired ? 'invalid' : '',
                        !notRequired && validationContext.valid && innerValue ? 'valid' : ''
                    ]"
        >
          <template
              v-for="(_, slot) of $slots"
              v-slot:[slot]="scope"
          >
            <slot
                :name="slot"
                v-bind="scope"
            />
          </template>
        </date-range-picker>

        <b-btn v-if="showClearButton" variant="toolbar" class="position-absolute" style="right:0;" @click="$emit('on-clear')">&times;</b-btn>

        <!-- INVALID FEEDBACK -->
        <b-form-invalid-feedback
            v-if="!onlyFormElement && !hideErrorMsg"
            :style="validationContext.errors.length > 0 ? {'display': 'block', 'margin-top': '.15rem'} : {}"
            class="base-form-component__invalid-feedback"
        >
          {{ validationContext.errors[0] }}
        </b-form-invalid-feedback>

        <!-- HELP TEXT -->
        <b-form-text
            v-if="!onlyFormElement && infoMsg"
            class="base-form-component__info-msg"
        >
          {{ infoMsg }}
        </b-form-text>
      </div>
    </template>
  </ValidationProvider>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  components: { DateRangePicker },
  props: {
    labelOnTop: {
      type: Boolean,
      default: false
    },
    showClearButton: {
      type: Boolean,
      default: false
    },
    infoMsg: {
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
    hideErrorMsg: {
      type: Boolean,
      default: false
    },
    disableAfter: {
      type: Boolean,
      default: false
    },
    disableBefore: {
      type: Boolean,
      default: false
    },
    customStyles: {
      type: [Object, String],
      default: () => {
      }
    },
    rules: {
      type: [Object, String],
      default: () => {
      }
    },
    minValue: {
      type: String,
      default: ''
    },
    maxValue: {
      type: String,
      default: ''
    },
    // must be included in props
    value: {
      type: null
    }
  },
  data: () => ({
    innerValue: '',
    date: new Date()
  }),
  methods: {
    enableDate(date) {
      return 0
    },
    disableDate(date) {
      return date > new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
    },
    disableBeforeMethod(date) {
      return date <= new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
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
::v-deep.base-form-component__only-form-element {
  grid-template-columns: 100% !important;
}

::v-deep.base-form-component__label-on-top {
  &.base-input-wrapper {
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
