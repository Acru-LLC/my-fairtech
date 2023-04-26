<template>
    <ValidationProvider
        :mode="notRequired ? 'passive' : 'aggressive'"
        :name="$attrs.name ? $attrs.name : $attrs.label"
        :rules="rules"
    >
        <template v-slot:default="validationContext">
            <div
                class="base-input-wrapper base-form-input base-form-component"
                :class="[onlyFormElement ? 'base-form-component__only-form-element' : '', labelOnTop ? 'base-form-component__label-on-top' : '',]"
                :style="customStyles"
            >
                <!-- LABEL -->
                <label v-if="!onlyFormElement" class="base-form-component__label" >{{ $attrs.label }}</label>

                <!-- DATE_PICKER -->
                <date-picker
                    v-model="innerValue"
                    v-bind="$attrs"
                    style="width: 100%"
                    v-on="$listeners"
                    :disabled-date="disableAfter ? disableDate : disableBefore ? disableBeforeMethod : enableDate"
                    class="base-form-component__date-picker base-form-component__main-form-element custom-datepicker"
                    :class="[
                        (!!validationContext.errors.length || (!innerValue && validationContext.validated)) && !notRequired ? 'invalid' : '',
                        !notRequired && validationContext.valid && innerValue ? 'valid' : ''
                    ]"
                >
                    <template v-for="(_, slot) of $slots" v-slot:[slot]="scope" >
                        <slot :name="slot" v-bind="scope" />
                    </template>
                </date-picker>

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

export default {
    props: {
        labelOnTop: {
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
        enableDate (date) {
            return 0
        },
        disableDate (date) {
            return date > new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
        },
        disableBeforeMethod (date) {
            return date <= new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
        },
    },
    watch: {
        // Handles internal model changes.
        innerValue (newVal) {
            this.$emit('input', newVal);
        },
        // Handles external model changes.
        value (newVal) {
            this.innerValue = newVal;
        }
    },
    created () {
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
