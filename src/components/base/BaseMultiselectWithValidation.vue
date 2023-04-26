<template>
    <ValidationProvider
        :mode="notRequired ? 'passive' : 'aggressive'"
        :name="veeName"
        :rules="rules"
        :ref="veeName"
    >
        <template v-slot:default="validationContext">
            <div
                class="base-multiselect-wrapper base-form-component"
                :class="[withCreateAddition ? 'base-form-multiselect-with-append' : '', labelOnTop ? 'base-form-component__label-on-top' : '', onlyFormElement && !withCreateAddition ? 'base-form-component__only-form-element' : '', withCreateAddition && onlyFormElement ? 'base-form-component__only-form-element-and-with-append' : '']"
                :style="customStyles"
            >
                <!-- LABEL -->
                <label
                    v-if="!onlyFormElement"
                    class="base-form-component__label"
                >{{ $attrs.label }}</label>
                <!-- MULTISELECT -->
                <multiselect
                    :disabled="disabled"
                    v-model="innerValue"
                    v-bind="$attrs"
                    v-on="$listeners"
                    class="custom-multiselect base-form-component__main-form-element"
                    :class="[
              (!!validationContext.errors.length || (!innerValue && validationContext.validated)) && !notRequired ? 'invalid' : '',
               !notRequired && validationContext.valid && innerValue ? 'valid' : '', classList]"
                >
                    <template
                        v-for="(_, slot) of $scopedSlots"
                        v-slot:[slot]="scope"
                    >
                        <slot
                            :name="slot"
                            v-bind="scope"
                        />
                    </template>
                    <template slot="afterList">
                        <div
                            v-observe-visibility="reachedEndOfList"
                            v-if="hasNextPage"
                            style="visibility: hidden;"
                        >After list slot</div>
                    </template>
                </multiselect>
                <!-- APPEND SLOT -->
                <b-input-group-append
                    v-if="withCreateAddition"
                    class="base-form-multiselect__append"
                >
                    <slot name="append-slot"></slot>
                </b-input-group-append>

                <!-- INVALID FEEDBACK -->
                <b-form-invalid-feedback
                    v-if="!hideErrorMsg"
                    :style="validationContext.errors.length > 0 ? {'display': 'block', 'margin-top': '.15rem'} : {}"
                    class="base-form-component__invalid-feedback"
                >
                    {{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
                <!-- HELP TEXT -->
                <b-form-text
                    v-if="infoMsg"
                    class="base-form-component__info-msg"
                >
                    {{ infoMsg }}
                </b-form-text>
            </div>
        </template>
    </ValidationProvider>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
    props: {
        customStyles: {
            type: [Object, String],
            default: () => {
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        labelOnTop: {
            type: Boolean,
            default: false
        },
        onlyFormElement: {
            type: Boolean,
            default: false
        },
        notRequired: {
            type: Boolean,
            default: false,
        },
        hideErrorMsg: {
            type: Boolean,
            default: false
        },
        infoMsg: {
            type: String,
            default: ''
        },
        rules: {
            type: [Object, String],
            default: () => {
            },
        },
        veeName: {
            type: String,
            default: '',
        },
        // must be included in props
        value: {
            type: null,
            required: true
        },
        classList: {
            type: String,
            default: ''
        },
        hasNextPage: {
            type: Boolean,
            default: false
        },
        withCreateAddition: {
            type: Boolean,
            default: false
        },
        createClickTo: {
            type: String,
            default: ''
        },
    },
    components: {
        Multiselect
    },
    data: () => ({
        innerValue: null,
        createModal: false
    }),
    methods: {
        createModals () {
            this.createModal = true
        },
        // validateManually () {
        //     this.$refs[this.veeName].validate(this.veeName)
        // }
        reachedEndOfList (e) {
            this.$emit('reachedEndOfList', e)
        }
    },
    watch: {
        // Handles internal model changes.
        /* innerValue (newVal) {
            this.$emit("input", newVal);
        }, */
        // Handles external model changes.
        value (newVal) {
            this.innerValue = newVal;
        },
    },
    created () {
        if (this.value) {
            this.innerValue = this.value;
        }
    }
};
</script>
<style lang="scss" scoped>
::v-deep.base-form-multiselect-with-append {
    &.base-multiselect-wrapper {
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

        .base-form-component__main-form-element {
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }

        .base-form-multiselect__append {
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
::v-deep.base-form-component__only-form-element-and-with-append {
    &.base-multiselect-wrapper {
        grid-template-columns: 95% 5% !important;

        // @media (min-width: 460px) {
        //     grid-template-columns: 86.5% 9.5% !important;
        // }

        // @media (min-width: 768px) {
        //     grid-template-columns: 83.5% 9.5% !important;
        // }

        // @media (min-width: 1200px) {
        //     grid-template-columns: 85.5% 9.5% !important;
        // }

        // @media (min-width: 1400px) {
        //     grid-template-columns: 87.5% 9.5% !important;
        // }

        // @media (min-width: 1650px) {
        //     grid-template-columns: 95% 5% !important;
        // }

        .base-form-component__main-form-element {
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }

        .base-form-multiselect__append {
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
::v-deep.base-form-component__only-form-element {
    &.base-multiselect-wrapper {
        grid-template-columns: 100% !important;
        .base-form-component__invalid-feedback,
        .base-form-component__info-msg {
            grid-column: span 2 !important;
            grid-column-start: 2 !important;
        }
    }
}

::v-deep.base-form-component__label-on-top {
    &.base-form-multiselect-with-append {
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
