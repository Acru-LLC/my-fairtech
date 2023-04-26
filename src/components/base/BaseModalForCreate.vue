<template>
    <div>
        <b-modal
            v-model="innerValue"
            size="xl"
            :title="``"
        >
            <component
                v-bind:is="componentFile"
                :additional-params="additionalParams"
                ref="formCreate"
                :customIsModeCreate="true"
                @saved="listSearchAfterSave"
            ></component>
            <template #modal-footer>
                <b-button
                    size="sm"
                    variant="danger"
                    @click="innerValue = false"
                >
                    {{ $t('actions.cancel') }}
                </b-button>
                <b-button
                    size="sm"
                    variant="success"
                    @click="save"
                >
                    {{ $t('actions.save') }}
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import crudAndListsService from "@/shared/services/crud_and_list.service";

export default {
    name: "BaseModalForCreate",
    props: {
        useComponentSaveFn: {
            type: Boolean,
            default: false
        },
        withoutListSearch: {
            type: Boolean,
            default: false
        },
        mainApiUrl: {
            type: String,
            default: ''
        },
        createFormName: {
            type: String,
            default: ''
        },
        lists: {
            type: [Object, String],
            default: () => {
            },
        },
        additionalParams: {
            type: Object,
            default: () => {
            },
        },
        value: {
            type: null
        }
    },
    /*
    * COMPONENTS */
    computed: {
        componentFile () {
            return () => import(`@/shared/views/components/${this.createFormName}.vue`);
        }
    },
    /*
    * DATA */
    data () {
        return {
            innerValue: false
        }
    },
    methods: {
        listSearchAfterSave () {
            if (!this.withoutListSearch) {
                crudAndListsService
                    .searchList(this.mainApiUrl, this.var_default_search_payload)
                    .then((res) => {
                        this.$emit('new-ref-created', res.data.list, res.data.list[0].id, this.createFormName)
                        this.innerValue = false
                    })
                    .catch(e => {
                        console.log(e)
                    })
            } else {
                this.$emit('new-ref-created-without-list-search', this.createFormName)
                this.innerValue = false
            }
        },
        save () {
            if (this.useComponentSaveFn) {
                this.$refs.formCreate.save()
            } else {
                this.$refs.formCreate.$refs.observer.validate().then(valid => {
                    if (valid) {
                        crudAndListsService.create(this.mainApiUrl, this.$refs.formCreate.editingItem).then(res => {
                            this.$refs.formCreate.$refs.observer.reset()
                            if (this.$refs.formCreate.editingItem.addressDto) {
                                this.$refs.formCreate.editingItem = Object.assign({}, { addressDto: {} });
                            } else {
                                this.$refs.formCreate.editingItem = Object.assign({}, {});
                            }
                            this.listSearchAfterSave()
                            /* if (!this.withoutListSearch) {
                                crudAndListsService
                                    .searchList(this.mainApiUrl, this.var_default_search_payload)
                                    .then((res) => {
                                        this.$emit('new-ref-created', res.data.list, res.data.list[0].id, this.createFormName)
                                        this.innerValue = false
                                    })
                                    .catch(e => {
                                        console.log(e)
                                    })
                            } else {
                                this.$emit('new-ref-created-without-list-search', this.createFormName)
                                this.innerValue = false
                            } */
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    } else {
                        this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
                    }
                })
            }
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
}
</script>

<style scoped>
</style>