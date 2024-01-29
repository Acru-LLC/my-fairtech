<template>
    <ValidationProvider
        :mode="notRequired ? 'passive' : 'aggressive'"
        :name="veeName"
        :rules="rules"
        :ref="veeName"
    >
        <template v-slot:default="validationContext">
                <div class="base-multiselect-wrapper base-form-component" :class="formLabel !== '__none' ? 'base-form-component-grid-template-columns-25-75' : 'base-form-component-grid-template-columns-100'">
                <!-- LABEL -->
                <label v-if="formLabel !== '__none'" for="base-form-component__label">{{ formLabel }}</label>

                <!-- TREESELECT -->
                <treeselect
                    v-model="innerValue"
                    v-bind="$attrs"
                    :always-open="alwaysOpen"
                    v-on="$listeners"
                    class="custom-treeselect base-form-component__main-form-element"
                    :class="[!!validationContext.errors.length && !notRequired ? 'invalid' : '', validationContext.valid && !notRequired ? 'valid' : '']"
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

                </treeselect>

                <!-- INVALID FEEDBACK -->
                <b-form-invalid-feedback
                    v-if="!hideErrorMsg"
                    :style="validationContext.errors.length > 0 ? {'display': 'block'} : {}"
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
/*
 * IMPORT TREESELECT */
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
    props: {
        notRequired: {
            type: Boolean,
            default: false,
        },
        hideErrorMsg: {
            type: Boolean,
            default: false
        },
        formLabel: {
            type: String,
            default: ''
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
        alwaysOpen: {
            type: Boolean,
            default: false
        }
    },
    components: {
        Treeselect
    },
    data: () => ({
        innerValue: null,
    }),
    methods: {
        // validateManually () {
        //     this.$refs[this.veeName].validate(this.veeName)
        // }
    },
    watch: {
        // Handles internal model changes.
        innerValue (newVal) {
            this.$emit("input", newVal);
        },
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
<style lang="scss">
.base-form-component-grid-template-columns-25-75 {
    grid-template-columns: 25% 75%;
}
.base-form-component-grid-template-columns-100 {
    grid-template-columns: 100%;
}

</style>
