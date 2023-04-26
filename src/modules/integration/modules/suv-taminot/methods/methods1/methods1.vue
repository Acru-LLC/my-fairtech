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
                                {{ $t('submodules.integration.suv_taminot_info.fio') }}</b>
                            <span variant="primary" pill>{{
                                resInformation_Date.fio ? resInformation_Date.fio : '_ _ _'
                                }}</span>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <b>
                                {{ $t('submodules.integration.suv_taminot_info.rgn') }}</b>
                            <span variant="primary" pill>{{
                                resInformation_Date.rgn ? resInformation_Date.rgn : '_ _ _'
                                }}</span>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <b>
                                {{ $t('submodules.integration.suv_taminot_info.dstr') }}</b>
                            <span variant="primary" pill>{{
                                resInformation_Date.dstr ? resInformation_Date.dstr : '_ _ _'
                                }}</span>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <b>
                                {{ $t('submodules.integration.suv_taminot_info.addr') }}</b>
                            <span variant="primary" pill>{{
                                resInformation_Date.addr ? resInformation_Date.addr : '_ _ _'
                                }}</span>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <b>
                                {{ $t('submodules.integration.suv_taminot_info.cprd') }}</b>
                            <span variant="primary" pill>{{
                                resInformation_Date.cprd ? resInformation_Date.cprd : '_ _ _'
                                }}</span>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <b>
                                {{ $t('submodules.integration.suv_taminot_info.pid') }}</b>
                            <span variant="primary" pill>{{
                                resInformation_Date.pid ? resInformation_Date.pid : '_ _ _'
                                }}</span>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <b>
                                {{ $t('submodules.integration.suv_taminot_info.sld') }}</b>
                            <span variant="primary" pill>{{
                                resInformation_Date.sld ? resInformation_Date.sld : '_ _ _'
                                }}</span>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <b>
                                {{ $t('submodules.integration.suv_taminot_info.pay') }}</b>
                            <span variant="primary" pill>{{
                                resInformation_Date.pay ? resInformation_Date.pay : '_ _ _'
                                }}</span>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <b>
                                {{ $t('submodules.integration.suv_taminot_info.chrg') }}</b>
                            <span variant="primary" pill>{{
                                resInformation_Date.chrg ? resInformation_Date.chrg : '_ _ _'
                                }}</span>
                        </b-list-group-item>

                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                            <b>
                                {{ $t('submodules.integration.suv_taminot_info.ivol') }}</b>
                            <span variant="primary" pill>{{
                                resInformation_Date.ivol ? resInformation_Date.ivol : '_ _ _'
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
                    integratsiyaService.getSuvTaminotInfoByPinflWith_kad_num({
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




