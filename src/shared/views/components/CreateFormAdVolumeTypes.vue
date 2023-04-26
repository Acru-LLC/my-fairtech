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
                    not-required
                    v-model="editingItem.nameLt"
                    :label="$t('column.name_lt')"
                    :placeholder="$t('column.name_lt')"
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
                    v-model="editingItem.nameRu"
                    :label="$t('column.name_ru')"
                    :placeholder="$t('column.name_ru')"
                />
            </b-col>
            <b-col
                sm="12"
                md="6"
            >
                <b-row>
                    <b-col cols="6">
                        <BaseInputWithValidation
                            rules="required|positive"
                            class="required"
                            v-model="editingItem.minBorder"
                            custom-styles="grid-template-columns: 51% 43%;"
                            name="valuesRange"
                            :label="$t('column.value_square_m')"
                            :placeholder="$t('column.from')"
                        />
                    </b-col>
                    <b-col cols="3">
                        <BaseInputWithValidation
                            v-if="editingItem.maxNotLimited"
                            not-required
                            disabled
                            only-form-element
                            custom-styles="grid-template-columns: unset;"
                            :placeholder="$t('column.to')"
                        />
                        <BaseInputWithValidation
                            v-else
                            rules="required|positive"
                            only-form-element
                            v-model="editingItem.maxBorder"
                            custom-styles="grid-template-columns: unset;"
                            :placeholder="$t('column.to')"
                        />
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row class="mb-3">
            <b-col
                sm="12"
                md="6"
            >

            </b-col>
            <b-col
                sm="12"
                md="6"
            >
                <div class="form-check form-check-right">
                    <input
                        v-model="editingItem.maxNotLimited"
                        class="form-check-input"
                        type="checkbox"
                        id="formCheckIsLegal"
                    />
                    <!-- <input
                            v-else
                            :checked="isLegal"
                            disabled
                            class="form-check-input"
                            type="checkbox"
                            id="formCheckIsLegal"
                        /> -->
                    <label
                        class="form-check-label font-weight-normal"
                        for="formCheckIsLegal"
                    >
                        Юқориси чегараланмаган
                    </label>
                </div>
            </b-col>
        </b-row>
    </ValidationObserver>
</template>
<script>
const MAIN_API_URL = 'directory/advertisement-volume-types'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
    name: "CreateFormAdVolumeTypes",
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
            editingItem: {}
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.customIsModeCreate ? this.customIsModeCreate : this.$route.name === 'CreateAdvertisementVolumeType'
        },
        computedObserver () {
            return this.$refs.observer
        }
    },
    /*
    * METHODS */
    methods: {
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