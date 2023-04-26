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
                                    v-model="tin"
                                    @keyup.enter="findDataForMip"
                                    with-input-append
                                    mask="#########"
                                    :label="$t('column.inn')"
                                    placeholder="123456789"
                                    class="required"
                                    label-on-top
                            >
                                <template v-slot:append-slot>
                                    <b-button
                                            v-show="!loadingTableItems"
                                            @click="findDataForMip"
                                            variant="outline-primary"
                                            id="contractorSearchButton"
                                            style="padding: 2.5px 10px; font-size: 1.2rem;"
                                    >
                                        <i class="mdi mdi-account-search"></i>
                                    </b-button>
                                    <b-button variant="primary" disabled v-show="loadingTableItems">
                                        <b-spinner small type="grow"></b-spinner>
                                    </b-button>
                                </template>
                            </BaseInputWithValidation>
                            <br>
                            <h6> {{ $t('submodules.integration.kadastr_soliq_info.response.step1_inn') }}</h6>
                        </b-col>
                        <b-col
                                sm="12"
                                md="4"
                        >
                            <BaseInputWithValidation
                                    v-model="value"
                                    @keyup.enter="findDataForMip"
                                    with-input-append
                                    v-mask="'##############'"
                                    :label="$t('submodules.integration.farmasevtika_info.fields2.pinfl')"
                                    placeholder="12345676543210"
                                    class="required"
                                    label-on-top
                            >
                                <template v-slot:append-slot>
                                    <b-button
                                            v-show="!loadingTableItems"
                                            @click="findDataForMip"
                                            variant="outline-primary"
                                            id="contractorSearchButton"
                                            style="padding: 2.5px 10px; font-size: 1.2rem;"
                                    >
                                        <i class="mdi mdi-account-search"></i>
                                    </b-button>
                                    <b-button variant="primary" disabled v-show="loadingTableItems">
                                        <b-spinner small type="grow"></b-spinner>
                                    </b-button>
                                </template>
                            </BaseInputWithValidation>
                        </b-col>
                        <b-col
                            sm="12"
                            md="4"
                        >
                            <BaseInputWithValidation
                                v-model="purpose"
                                @keyup.enter="findDataForMip"
                                with-input-append
                                :label="$t('submodules.mailing_purpose.title')"
                                class="required"
                                label-on-top
                            >
                                <template v-slot:append-slot>
                                    <b-button
                                        v-show="!loadingTableItems"
                                        @click="findDataForMip"
                                        variant="outline-primary"
                                        id="contractorSearchButton"
                                        style="padding: 2.5px 10px; font-size: 1.2rem;"
                                    >
                                        <i class="mdi mdi-account-search"></i>
                                    </b-button>
                                    <b-button variant="primary" disabled v-show="loadingTableItems">
                                        <b-spinner small type="grow"></b-spinner>
                                    </b-button>
                                </template>
                            </BaseInputWithValidation>
                        </b-col>
                    </b-row>
                </ValidationObserver>

            </template>
            <b-card :title="$t('submodules.integration.farmasevtika_info.response')" v-if="resInformation_Date">


                <b-card no-body class="overflow-hidden">
                    <b-row no-gutters>
                        <b-col>
                            <b-card-text>
                                <b-list-group>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                        <!--                    {{ $t('submodules.integration.hududgaz_info.response.customer_code') }}-->
                                        message
                                    </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.message ? resInformation_Date.message : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                        <!--                    {{ $t('submodules.integration.hududgaz_info.response.name') }}-->
                                        pinfl
                                    </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.pinfl ? resInformation_Date.pinfl : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                        <!--                    {{ $t('submodules.integration.hududgaz_info.response.address') }}-->
                                        cadastr_count
                                    </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.cadastr_count ? resInformation_Date.cadastr_count : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                        <!--                    {{ $t('submodules.integration.hududgaz_info.response.tariff_summa') }}-->
                                        code
                                    </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.code ? resInformation_Date.code : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>

                                </b-list-group>
                            </b-card-text>
                        </b-col>
                    </b-row>
                </b-card>

                <h5 v-if="resInformation_Date.cadastr_list && resInformation_Date.cadastr_list.length>0"><b>
                    <!--     {{ $t('submodules.integration.hududgaz_info.response.interraction') }}-->cadastr_list</b>
                </h5>
                <b-table
                        v-if="resInformation_Date.cadastr_list && resInformation_Date.cadastr_list.length > 0"
                        :items="resInformation_Date.cadastr_list ? resInformation_Date.cadastr_list : []"
                        :fields="tableFields"
                        :busy="loadingTableItems" id="my-table"
                        class="custom-b-table" responsive striped bordered small hover show-empty
                >
                    <template #cell(index)="data">
                        {{
                        util_paginate(data.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage)
                        }}
                    </template>
                    <!-- STATUS -->

                    <template #empty="">
                        <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
                    </template>

                    <!-- TABLE_BUSY SLOT -->
                    <template #table-busy>
                        <div class="text-center my-2">
                            <b-spinner
                                    variant="primary"
                                    class="align-middle"
                            />
                        </div>
                    </template>
                </b-table>
            </b-card>
            <div class="text-center" v-show="loadingTableItems">
                <b-spinner variant="primary" label="Text Centered"></b-spinner>
            </div>
        </b-card>
    </div>
</template>

<script>
import integratsiyaService from "@/shared/services/integratsiya.service";
import i18n from "@/i18n";

export default {
    name: "methods1",
    data() {
        return {
            value: '',
            tin: '',
            purpose: "",
            resInformation_Date: null,
            resKR_Sert_asosiy: [],
            resTovar: [],
            loadingTableItems: false,
            tableFields: [
                {
                    label: "#",
                    thClass: "text-center",
                    tdClass: "text-center",
                    sortable: false,
                    key: "index",
                },
                {
                    label: i18n.t("submodules.integration.hududgaz_info.response.period"),
                    key: 'period',
                    thStyle: {
                        minWidth: '230px',
                    },
                },
                {
                    label: i18n.t("submodules.integration.hududgaz_info.response.reading_value"),
                    key: 'reading_value',
                    thStyle: {
                        minWidth: '230px',
                    },
                },
                {
                    label: i18n.t("submodules.integration.hududgaz_info.response.gas_consume"),
                    key: 'gas_consume',
                    thStyle: {
                        minWidth: '230px',
                    },
                },
                {
                    label: i18n.t("submodules.integration.hududgaz_info.response.accrual"),
                    key: 'accrual',
                    thStyle: {
                        minWidth: '230px',
                    },
                }, {
                    label: i18n.t("submodules.integration.hududgaz_info.response.act"),
                    key: 'act',
                    thStyle: {
                        minWidth: '230px',
                    },
                },
                {
                    label: i18n.t("submodules.integration.hududgaz_info.response.fine"),
                    key: 'fine',
                    thStyle: {
                        minWidth: '230px',
                    },
                },
                {
                    label: i18n.t("submodules.integration.hududgaz_info.response.saldo_k"),
                    key: 'saldo_k',
                    thStyle: {
                        minWidth: '230px',
                    },
                },
                {
                    label: i18n.t("submodules.integration.hududgaz_info.response.people_count"),
                    key: 'people_count',
                    thStyle: {
                        minWidth: '230px',
                    },
                },
                {
                    label: i18n.t("submodules.integration.hududgaz_info.response.gas_equipments_count"),
                    key: 'gas_equipments_count',
                    thStyle: {
                        minWidth: '230px',
                    },
                },
                {
                    label: i18n.t("submodules.integration.hududgaz_info.response.heating_field"),
                    key: 'heating_field',
                    thStyle: {
                        minWidth: '230px',
                    },
                },
            ],
        }
    },
    computed: {
        computedObserver() {
            return this.$refs.observer
        },
    },
    methods: {
        findDataForMip() {
            // if (this.computedObserver.fields.INN.valid)
            //   helperService.validateInnFromApi(this.editingItem.inn, true)
            //       .then(res => {
            //         if (res.data) {
            this.loadingTableItems = true
            this.resMessage = ''
            integratsiyaService.getKadastrInfoMethod2({tin: this.tin, pin: this.value, purpose: this.purpose}, true)
                .then(res => {
                    this.resInformation_Date = res.data ? res.data : null
                    this.loadingTableItems = false
                    this.value = ''
                    setTimeout(() => {
                        this.$toast(res.data.result_message, {type: 'success'});
                    }, 200);
                })
                .catch(e => {
                    this.$toast(this.$t('submodules.integration.statistics_info.download_error'), {type: 'error'});
                })
                .finally(() => {
                    // this.resInformation_Date = this.res_data3
                    this.loadingTableItems = false
                })
            // .finally(() => {
            //   this.resInformation_Date = this.res_data2
            // })
            // } else {
            //   this.computedObserver.setErrors({INN: [this.$t('validator.inn')]});
            // }
            // })
            // .catch(e => {
            //   console.log(e)
            //
            // })
            /* else
                this.computedObserver.refs.INN.validate() */
        },
    }
}
</script>

<style scoped>

</style>




