<template>
    <div>

        <b-card header-tag="header" footer-tag="footer">
            <template #header>
                <ValidationObserver
                        ref="observer"
                        v-slot="{}"
                >
                    <b-row class="mb-3">
                        <b-col sm="12"
                               md="6">
                            <BaseInputWithValidation
                                    v-model="tin"
                                    @keyup.enter="findDataForMip"
                                    with-input-append
                                    mask="#########"
                                    :label="$t('column.inn')"
                                    placeholder="123456789"
                                    class="required"
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
                            <h6> {{ $t('submodules.integration.kadastr_soliq_info.response.step1_inn') }} </h6>
                        </b-col>
                        <b-col
                                sm="12"
                                md="6"
                        >
                            <BaseInputWithValidation
                                    v-model="value"
                                    @keyup.enter="findDataForMip"
                                    with-input-append
                                    :label="$t('submodules.integration.elektr_info.info_1')"
                                    class="required"
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
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.short_address') }}
                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.short_address ? resInformation_Date.short_address : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.street') }}
                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.street ? resInformation_Date.street : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.street_code') }}
                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.street_code ? resInformation_Date.street_code : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.tipText') }}
                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.tipText ? resInformation_Date.tipText : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.vidText') }}
                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.vidText ? resInformation_Date.vidText : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.message') }}
                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.message ? resInformation_Date.message : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.tip') }}
                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.tip ? resInformation_Date.tip : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.vid') }}
                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.vid ? resInformation_Date.vid : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.ban_is') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.ban_is ? resInformation_Date.ban_is : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>


                                </b-list-group>
                            </b-card-text>
                        </b-col>
                    </b-row>
                </b-card>
                <h5><b><!--   {{ $t('submodules.integration.hududgaz_info.response.interraction') }}-->bans</b></h5>
                <b-table
                        v-if="resInformation_Date.bans && resInformation_Date.bans.length > 0"
                        :items="resInformation_Date.bans ? resInformation_Date.bans : []" :fields="tableFields"
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
                <br>
                <b-card no-body class="overflow-hidden">
                    <b-row no-gutters>
                        <b-col>
                            <b-card-text>
                                <b-list-group>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.land_area') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.land_area ? resInformation_Date.land_area : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.land_area_i') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.land_area_i ? resInformation_Date.land_area_i : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.land_area_b') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.land_area_b ? resInformation_Date.land_area_b : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.land_area_f') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.land_area_f ? resInformation_Date.land_area_f : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.land_area_z') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.land_area_z ? resInformation_Date.land_area_z : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.land_area_d') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.land_area_d ? resInformation_Date.land_area_d : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.object_area') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.object_area ? resInformation_Date.object_area : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.object_area_l') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.object_area_l ? resInformation_Date.object_area_l : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.object_area_u') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.object_area_u ? resInformation_Date.object_area_u : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.response_id') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.response_id ? resInformation_Date.response_id : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.code') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.code ? resInformation_Date.code : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.cad_number') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.cad_number ? resInformation_Date.cad_number : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.region') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.region ? resInformation_Date.region : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.district') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.district ? resInformation_Date.district : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.address') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.address ? resInformation_Date.address : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{
                                            $t('submodules.integration.kadastr_soliq_info.response.count_subjects')
                                            }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.count_subjects ? resInformation_Date.count_subjects : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                </b-list-group>
                            </b-card-text>
                        </b-col>
                    </b-row>
                </b-card>
                <h5><b><!--   {{ $t('submodules.integration.hududgaz_info.response.interraction') }}--> subjects</b>
                </h5>
                <b-table
                        v-if="resInformation_Date.subjects && resInformation_Date.subjects.length>0"
                        :items="resInformation_Date.subjects ? resInformation_Date.subjects : []" :fields="tableFields"
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
                <br>

                <b-card no-body class="overflow-hidden">
                    <b-row no-gutters>
                        <b-col>
                            <b-card-text>
                                <b-list-group>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.dom_num') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.dom_num ? resInformation_Date.dom_num : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.kvartira_num') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.kvartira_num ? resInformation_Date.kvartira_num : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.neighborhood') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.neighborhood ? resInformation_Date.neighborhood : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{
                                            $t('submodules.integration.kadastr_soliq_info.response.neighborhood_id')
                                            }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.neighborhood_id ? resInformation_Date.neighborhood_id : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.dateOut') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.dateOut ? resInformation_Date.dateOut : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.number') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.number ? resInformation_Date.number : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.cost') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.cost ? resInformation_Date.cost : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.knum') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.knum ? resInformation_Date.knum : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.kadastr_soliq_info.response.knumtype') }}

                                        </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.knumtype ? resInformation_Date.knumtype : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>

                                </b-list-group>
                            </b-card-text>
                        </b-col>
                    </b-row>
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
import i18n from "@/i18n";

export default {
    name: "methods2",
    data() {
        return {
            value: '',
            tin: '',
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
            integratsiyaService.getKadastrInfoMethod1({tin: this.tin, kad_num: this.value}, true)
                .then(res => {
                    this.resInformation_Date = res.data ? res.data : {}
                    this.loadingTableItems = false
                    this.value = ''
                    setTimeout(() => {
                        this.$toast(res.data.result_message, {type: 'success'});
                    }, 200);
                })
                .catch(e => {
                    this.$toast(this.$t('submodules.integration.statistics_info.download_error'), {type: 'error'});
                    this.loadingTableItems = false
                })
                .finally(() => {
                    // this.resInformation_Date = this.res_data3
                    this.loadingTableItems = false
                })
            // .finally(() => {
            //   this.resInformation_Date = this.res_data1
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





