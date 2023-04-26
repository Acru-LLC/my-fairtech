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
                <BaseMultiselectWithValidation
                    not-required
                    v-model="editingItem.parentId"
                    :options="dateTypeList.map(el => el.id)"
                    :label="$t('dateTypes')"
                    :custom-label="customLabelDateType"
                    :placeholder="''"
                    open-direction="bottom"
                    :max-height="600"
                    :show-labels="false"
                />
            </b-col>
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
    </ValidationObserver>
</template>
<script>
const MAIN_API_URL = 'dateType'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
export default {
    name: "CreateDateTypes",
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
            editingItem: {},
            dateTypeList: []
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.customIsModeCreate ? this.customIsModeCreate : this.$route.name === 'CreateDateTypes'
        },
        computedObserver () {
            return this.$refs.observer
        }
    },
    /*
    * METHODS */
    methods: {
        customLabelDateType (opt) {
            let selected = this.dateTypeList.find(el => el.id == opt)
            if (selected) {
                return `${this.getName({
                    nameRu: selected.nameRu,
                    nameLt: selected.nameLt,
                    nameUz: selected.nameUz,
                })}`
            }
            return ''
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
            await crudAndListsService.getEmpty(MAIN_API_URL)
                .then(res => {
                    this.editingItem = res.data
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, false)
                .then(res => {
                    this.editingItem = res.data
                })
                .catch(e => {
                    console.log(e)
                })
        }

        // GET PARENT DATE_TYPES
        crudAndListsService
            .searchList('dateType', this.var_default_search_payload)
            .then((res) => {
                this.dateTypeList = res.data.list;
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
