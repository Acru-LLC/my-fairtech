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
                                    v-model="kad_num"
                                    @keyup.enter="findContractorBySenderKadNum"
                                    with-input-append
                                    :label="$t('submodules.integration.elektr_info.info_1')"
                                    class="required"
                                    rules="required"
                                    placeholder="01:01:01:01:01:0101:0101:010"
                            >
                                <template v-slot:append-slot>
                                    <b-button
                                            @click="findContractorBySenderKadNum"
                                            variant="outline-primary"
                                            id="contractorSearchButton"
                                            style="padding: 2.5px 10px; font-size: 1.2rem;"
                                    >
                                        <i v-if="!loadingTableItems" class="mdi mdi-account-search"></i>
                                        <b-spinner v-else-if="loadingTableItems" small></b-spinner>
                                    </b-button>
                                </template>
                            </BaseInputWithValidation>
                            <br>
                            <span>
                10:08:04:01:01:5045:0001:004
              </span>
                        </b-col>
                        <b-col
                                sm="12"
                                md="4"
                                class="ml-4"
                        >
                        </b-col>
                    </b-row>
                </ValidationObserver>

            </template>

            <b-card style="padding: 0 50px" :title="$t('submodules.integration.farmasevtika_info.response')"
                    v-if="resInformation_Date">

                <b-card no-body class="overflow-hidden" v-show="!loadingTableItems">
                    <b-card-text class="mt-3" v-if="resInformation_Date.error_kod == 0">
    {{ resInformation_Date.error_message }}
                    </b-card-text>
                    <b-card-text v-else>
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
            sender_pinfl: "",
            kad_num: "",
            resInformation_Date: null,
            loadingTableItems: false,
        }
    },
    computed: {
        computedObserver() {
            return this.$refs.observer
        },
    },
    methods: {
        findContractorBySenderKadNum() {
            this.computedObserver.validate().then(valid => {
                if (valid) {

                    this.loadingTableItems = true
                    integratsiyaService.getKommunalInfoByPinflWith_kad_num({
                        kad_num: this.kad_num
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




