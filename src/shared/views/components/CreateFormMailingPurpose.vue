<template>
    <ValidationObserver
        ref="observer"
        v-slot="{}"
    >
        <b-row class="mb-3">
            <b-col
                sm="12"
                md="6"
            >
                <BaseInputWithValidation
                    rules="required"
                    class="required"
                    v-model="editingItem.nameUz"
                    :label="$t('column.name_uz')"
                    :placeholder="$t('column.name_uz')"
                />
            </b-col>
            <b-col
                sm="12"
                md="6"
            >
                <BaseInputWithValidation
                    v-if="isModeCreate"
                    rules="required"
                    class="required"
                    v-model="editingItem.orderCode"
                    :label="$t('column.code')"
                    :placeholder="$t('column.code')"
                />
                <BaseInputWithValidation
                    v-else
                    not-required
                    disabled
                    :value="editingItem.orderCode"
                    :label="$t('column.code')"
                    :placeholder="$t('column.code')"
                />
            </b-col>
        </b-row>

        <b-row class="mb-3">
            <b-col
                sm="12"
                md="6"
            >
                <BaseInputWithValidation
                    not-required
                    v-model="editingItem.nameLt"
                    :label="$t('column.name_lt')"
                    :placeholder="$t('column.name_lt')"
                />
            </b-col>
            <b-col
                sm="12"
                md="6"
            >
                <BaseInputWithValidation
                    not-required
                    v-model="editingItem.nameRu"
                    :label="$t('column.name_ru')"
                    :placeholder="$t('column.name_ru')"
                />
            </b-col>
        </b-row>

        <!-- PROCESSES -->
        <b-row class="mb-3">
            <b-col
                sm="12"
                md="6"
            >
                <BaseMultiselectWithValidation
                    rules="required"
                    class="required"
                    v-model="firstProcessId"
                    :options="processes.map(e => e.id).filter(id => id != secondProcessId)"
                    :label="$t('submodules.process.first_process')"
                    placeholder=""
                    :custom-label="customLabelProcess"
                    open-direction="bottom"
                    :max-height="600"
                    :show-labels="false"
                ></BaseMultiselectWithValidation>
            </b-col>
            <b-col
                sm="12"
                md="6"
            >
                <BaseMultiselectWithValidation
                    rules="required"
                    class="required"
                    v-model="secondProcessId"
                    :options="processes.map(e => e.id).filter(id => id != firstProcessId)"
                    :label="$t('submodules.process.second_process')"
                    placeholder=""
                    :custom-label="customLabelProcess"
                    open-direction="bottom"
                    :max-height="600"
                    :show-labels="false"
                ></BaseMultiselectWithValidation>
            </b-col>
        </b-row>
    </ValidationObserver>
</template>
<script>
const MAIN_API_URL = 'before-commission/directory/mailing-purpose'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
    name: "CreateFormMailingPurpose",
    props: {
        customIsModeCreate: {
            type: Boolean,
            default: false
        }
    },
    /*
    * COMPONENTS */
    components: {},
    /*
    * DATA */
    data () {
        return {
            processes: [],
            secondProcessId: null,
            firstProcessId: null,
            editingItem: {}
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.customIsModeCreate ? this.customIsModeCreate : this.$route.name === 'CreateMailingPurpose'
        },
        computedObserver () {
            return this.$refs.observer
        }
    },
    /*
    * METHODS */
    methods: {
        customLabelProcess (opt) {
            let selected = this.processes.find(e => e.id == opt);
            if (selected) {
                return `${this.getName({
                    nameRu: selected.nameRu,
                    nameLt: selected.nameLt,
                    nameUz: selected.nameUz,
                })
                    }`
            }
            return ``;
        },
        save () {
            this.computedObserver.validate().then(valid => {
                if (valid) {
                    if (this.editingItem.id) {
                        crudAndListsService.update(MAIN_API_URL, this.editingItem).then(res => {
                            this.computedObserver.reset()
                            this.editingItem = Object.assign({}, {});
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    } else {
                        crudAndListsService.create(MAIN_API_URL, this.editingItem).then(res => {
                            this.computedObserver.reset()
                            this.editingItem = Object.assign({}, {});
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    }
                } else {
                    this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
                }
            });
        }
    },
    /*
    * CREATED */
    async created () {
        this.var_default_search_payload.itemsPerPage = 500
        if (this.isModeCreate) {
            crudAndListsService.getEmpty(MAIN_API_URL, null, true)
                .then(res => {
                    this.editingItem = res.data
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, true)
                .then(res => {
                    this.editingItem = res.data
                    if (res.data && res.data.processIds && res.data.processIds.length) {
                        this.firstProcessId = res.data.processIds[0]
                        this.secondProcessId = res.data.processIds[1]
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        }
        // FETCH PROCESSES
        crudAndListsService.searchList('before-commission/directory/process', this.var_default_search_payload, null, true)
            .then(res => {
                this.processes = res.data.list
            })
            .catch(e => {
                console.log(e)
            })
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