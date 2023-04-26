<template>
    <ValidationObserver ref="observer" v-slot="{}">
        <b-card>
            <b-card-title class="headline d-flex justify-content-between align-items-center">
                <b-btn variant="warning" class="text-capitalize" @click="goBack">
                    {{ $t('actions.back') }}
                </b-btn>
                <div>
                    {{ $t('submodules.template_sample.title') }}
                </div>
                <div class="actions">
                    <b-overlay :show="loader" rounded opacity="0.6" spinner-small spinner-variant="primary"
                               class="d-inline-block">
                        <b-btn :disabled="loader" :variant="'success'" class="text-capitalize" @click="save">
                            {{ $t("actions.save") }}
                        </b-btn>
                    </b-overlay>
                </div>
            </b-card-title>
            <b-card-body>
                <b-row class="mb-3">
                    <b-col sm="12" md="6">
                        <div class="mt-4">
                            <BaseInputWithValidation
                                    rules="required"
                                    class="required"
                                    label-on-top
                                    v-model="writtenName"
                                    :label="$t('column.name_uz')"
                                    :placeholder="$t('column.name_uz')"
                            />
                        </div>
                        <div class="mt-4">
                            <BaseSelectWithValidation
                                    v-model="type"
                                    rules="required"
                                    class="required"
                                    label-on-top
                                    :label="$t('column.type')"
                                    :options="LetterTypeStatus"
                            />
                        </div>
                    </b-col>
                    <b-col sm="12" md="6">
                        <BaseFileUploaderWithValidation
                                v-model="file"
                                rules="required"
                                class="required"
                                label-on-top
                                :label="$t('actions.choose_file')"
                                :max-files="1"
                        />
                    </b-col>
                </b-row>
            </b-card-body>
        </b-card>
    </ValidationObserver>
</template>
<script>
import referenceService from "@/shared/services/referencesService"
import BaseInputWithValidation from "@/components/base/BaseInputWithValidation.vue";
import BaseFileUploaderWithValidation from "@/components/base/BaseFileUploaderWithValidation.vue";
import {bus} from "@/main";
import {LetterTypeStatus} from '@/helpers/constants'
import BaseSelectWithValidation from "@/components/base/BaseSelectWithValidation.vue";

const MAIN_API_URL = 'template-sample'
/** YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
export default {
    props: {
        customIsModeCreate: {
            type: Boolean,
            default: false
        }
    },
    /** COMPONENTS */
    components: {
        BaseSelectWithValidation,
        BaseFileUploaderWithValidation,
        BaseInputWithValidation
    },
    /** DATA */
    data() {
        return {
            id: null,
            file: null,
            type: null,
            writtenName: null,
            loader: false,
        }
    },
    /** COMPUTED */
    computed: {
        isModeCreate() {
            return this.customIsModeCreate ? this.customIsModeCreate : this.$route.name === 'ReferencesTemplateSampleCreate'
        },
        computedObserver() {
            return this.$refs.observer
        },
        LetterTypeStatus() {
            let list = [];
            for (const mes in LetterTypeStatus) {
                const allowedTypes = [
                    'COMMON',
                    'PROTOCOL_DXA',
                    'DECISION',
                    'LETTER',
                    'REFERENCE',
                    'NOTICE',
                    'COMPROMISE_DECISION',
                    'NOTICE_NOT_COMPLETED',
                    'LETTER_NOT_COMPLETED',
                    'NOTICE_NOT_BELONG',
                    'LETTER_NOT_BELONG',
                    'NOTICE_REGION',
                    'LETTER_REGION',
                    'LETTER_REJECT',
                    'LETTER_INVOKE',
                    'COMPROMISE_DECISION_SUSPEND',
                    'PROTOCOL_SUSPEND',
                    'COMPROMISE_DECISION_DELAY',
                    'PROTOCOL_DELAY',
                    'COMPROMISE_DECISION_RESUME',
                    'PROTOCOL_RESUME',
                    'DECISION_COMMISSION',
                    'PRESCRIPTION_COMMISSION',
                    'PROTOCOL_COMMISSION',
                    'LETTER_FINISH',
                ]
                if (allowedTypes.includes(mes))
                    list.push({
                        text: LetterTypeStatus[mes],
                        value: mes,
                    })
            }
            return list
        }
    },
    /** METHODS */
    methods: {
        save() {
            this.computedObserver.validate().then(valid => {
                if (valid && this.file[0]) {
                    this.loader = true
                    if (this.id) {
                        referenceService.updateTemplateSample(this.id, this.writtenName, this.type, this.file[0]).then(res => {
                            this.computedObserver.reset()
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
                        })
                    } else {
                        referenceService.createTemplateSample(this.writtenName, this.type, this.file[0]).then(res => {
                            this.computedObserver.reset()
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
                        })
                    }
                } else {
                    this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
                }
                this.loader = false
            });
        },
        goBack() {
            bus.leaveWithConfirm = true
            if (this.goBackRoute && this.goBackRoute.name) {
                this.$router.push(this.goBackRoute)
            } else {
                this.$router.go(-1)
            }
        },
    },
    /** CREATED */
    created() {
        this.var_default_search_payload.itemsPerPage = 500
        if (!this.isModeCreate) {
            referenceService.getTemplateSample(this.$route.params.id, false)
                .then(({data}) => {
                    this.id = data.id
                    this.type = data.type
                    this.writtenName = data.writtenName
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }
}
</script>
<style scoped>
.col-form-label {
    padding-top: 0;
}

ul {
    list-style-type: none;
}
</style>
