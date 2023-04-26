<template>
    <base-create-or-update-wrapper
        @save="save"
        has-save-suspend
        :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
    >
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

                </b-col>
            </b-row>
        </ValidationObserver>
    </base-create-or-update-wrapper>
</template>
<script>
const MAIN_API_URL = 'reference'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
    name: "CreateOrUpdate",
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
                    crudAndListsService.update(MAIN_API_URL, this.editingItem).then(res => {
                        this.computedObserver.reset()
                        this.editingItem = Object.assign({}, {});
                        this.$router.go(-1)
                        this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                    })
                } else {
                    this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
                }
            });
        }
    },
    /*
    * CREATED */
    async created () {
        await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, false)
            .then(res => {
                this.editingItem = res.data
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