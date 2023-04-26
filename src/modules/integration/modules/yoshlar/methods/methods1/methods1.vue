<template>
    <div>

        <b-card header-tag="header" footer-tag="footer">

            <template #header>
                <ValidationObserver
                        ref="observer"
                        v-slot="{}"
                >
                    <b-row class="mb-3">
                        <b-col
                                sm="12"
                                md="4"
                        >
                            <BaseInputWithValidation
                                    rules="integer|min:14|max:14"
                                    v-model="form.pinfl"
                                    label-on-top
                                    mask="##############"
                                    :label="$t('submodules.integration.farmasevtika_info.fields2.pinfl')"
                                    :placeholder="$t('submodules.integration.farmasevtika_info.fields2.pinfl')"
                            >
                            </BaseInputWithValidation>
                        </b-col>
                        <b-col
                                sm="12"
                                md="4"
                                class="ml-4"
                        >
                            <span> {{ $t('submodules.integration.yoshlar_info.service') }}</span><br>

                            <b-form-select
                                    v-model="form.service"
                                    :options="
                                    [
                                      { item: 1, name: $t('submodules.integration.yoshlar_info.service1') },
                                      { item: 2, name: $t('submodules.integration.yoshlar_info.service2') },
                                      { item: 3, name: $t('submodules.integration.yoshlar_info.service3') }
                                    ]"
                                    class="mb-3"
                                    value-field="item"
                                    text-field="name"
                                    disabled-field="notEnabled"
                            ></b-form-select>
                        </b-col>
                        <b-col
                                sm="12"
                                md="2"
                                class="ml-4"
                        >
                            <b-btn style="width: 60px" variant="success" class="mt-3" :disabled="loadingTableItems"
                                   @click="getInfos">
                                <i v-show="!loadingTableItems" class="fa fa-search fa-1x"/>
                                <b-spinner v-show="loadingTableItems" small type="grow"></b-spinner>
                            </b-btn>
                        </b-col>

                    </b-row>
                </ValidationObserver>

            </template>

            <b-card style="padding: 0 50px" :title="$t('submodules.integration.farmasevtika_info.response')"
                    v-if="resInformation_Date">

                <b-card no-body class="overflow-hidden" v-show="!loadingTableItems">
                    <b-card-text>
                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <b>
                                {{ $t('submodules.integration.kommunal_info.response_date') }}</b>
                            <span variant="primary" pill>{{
                                resInformation_Date.response_date ? resInformation_Date.response_date : '_ _ _'
                                }}</span>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <b> {{ $t('submodules.integration.kommunal_info.customer_fio') }}</b>
                            <span variant="primary" pill>{{
                                resInformation_Date.customer_fio ? resInformation_Date.customer_fio : '_ _ _'
                                }}</span>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <b> {{ $t('submodules.integration.kommunal_info.estate_address') }}</b>
                            <span variant="primary" pill>{{
                                resInformation_Date.estate_address ? resInformation_Date.estate_address : '_ _ _'
                                }}</span>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <b> {{ $t('submodules.integration.kommunal_info.balance') }}</b>
                            <span variant="primary" pill>{{
                                resInformation_Date.balance ? resInformation_Date.balance : '_ _ _'
                                }}</span>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <b> {{ $t('submodules.integration.kommunal_info.soato') }}</b>
                            <span variant="primary" pill>{{
                                resInformation_Date.soato ? resInformation_Date.soato : '_ _ _'
                                }}</span>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <b> {{ $t('submodules.integration.kommunal_info.customer') }}</b>
                            <span variant="primary" pill>{{
                                resInformation_Date.customer ? resInformation_Date.customer : '_ _ _'
                                }}</span>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <b> {{ $t('submodules.integration.kommunal_info.tarif') }}</b>
                            <span variant="primary" pill>{{
                                resInformation_Date.tarif ? resInformation_Date.tarif : '_ _ _'
                                }}</span>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <b> {{ $t('submodules.integration.kommunal_info.last_payment') }}</b>
                            <span variant="primary" pill>{{
                                resInformation_Date.last_payment
                                }}</span>
                        </b-list-group-item>

                    </b-card-text>
                </b-card>
            </b-card>

            <div class="text-center" v-show="loadingTableItems">
                <b-spinner variant="primary" label="Text Centered"></b-spinner>
            </div>
        </b-card>
    </div>
</template>

<script>
import integratsiyaService from "@/shared/services/integratsiya.service";

export default {
    name: "methods1",
    data() {
        return {
            form: {
                pinfl: null,
                service: null
            },
            sender_pinfl: "",
            kad_num: "",
            resInformation_Date: null,
            resKR_Sert_asosiy: [],
            resTovar: [],
            loadingTableItems: false,
            tableFields: [],
            tableFieldsPostupList: [],
        }
    },
    computed: {
        computedObserver() {
            return this.$refs.observer
        },
    },
    methods: {
        getInfos() {
            this.computedObserver.validate().then(valid => {
                if (valid) {

                    this.loadingTableItems = true
                    integratsiyaService.getYoshlarInfo({
                        pinfl: this.form.pinfl,
                        service: this.form.service
                    }, true)
                        .then(res => {

                            this.resInformation_Date = res.data
                            if (this.resInformation_Date.result_code == 100) {
                                this.$toast(this.resInformation_Date.result_message, {type: 'success'});
                            }
                            this.loadingTableItems = false
                        })
                        .catch(e => {
                            // this.computedObserver.setErrors({ INN: [this.$t('validator.inn_exist')] });
                            this.loadingTableItems = false
                        })
                } else {
                    this.enterInfo();
                }
            });
        },
    }
}
</script>

<style scoped>

</style>




