<template>
    <div>
        <b-card header-tag="header" footer-tag="footer">

            <template #header>
                <ValidationObserver
                        ref="observer"
                        v-slot="{}"
                >
                    <b-row>
                        <b-col
                                sm="12"
                                md="3"
                        >
                            <b-input-group class="mt-3">
                                <b-form-input
                                        v-model="kad_num"
                                        @keyup.enter="findContractorBySenderPinfl"
                                        :placeholder="$t('submodules.integration.elektr_info.info_1')"
                                ></b-form-input>
                                <b-input-group-append>
                                    <b-button
                                            v-show="!loadingTableItems"
                                            @click="findContractorBySenderPinfl"
                                            variant="outline-primary"
                                            id="contractorSearchButton"
                                            style="padding: 2.5px 10px; font-size: 1.2rem;"
                                    >
                                        <i class="mdi mdi-account-search"></i>
                                    </b-button>
                                    <b-button variant="primary" disabled v-show="loadingTableItems">
                                        <b-spinner small type="grow"></b-spinner>
                                    </b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-col>
                        <b-col
                                sm="12"
                                md="3"
                        >
                            <b-input-group class="mt-3">
                                <b-form-input
                                        v-model="sender_pinfl"
                                        @keyup.enter="findContractorBySenderPinfl"
                                        v-mask="'##############'"
                                        :placeholder="$t('submodules.integration.farmasevtika_info.fields2.pinfl')"
                                ></b-form-input>
                                <b-input-group-append>
                                    <b-button
                                            v-show="!loadingTableItems"
                                            @click="findContractorBySenderPinfl"
                                            variant="outline-primary"
                                            id="contractorSearchButton"
                                            style="padding: 2.5px 10px; font-size: 1.2rem;"
                                    >
                                        <i class="mdi mdi-account-search"></i>
                                    </b-button>
                                    <b-button variant="primary" disabled v-show="loadingTableItems">
                                        <b-spinner small type="grow"></b-spinner>
                                    </b-button>
                                </b-input-group-append>
                            </b-input-group>
                        </b-col>
                    </b-row>
                </ValidationObserver>

            </template>
            <b-card :title="$t('submodules.integration.farmasevtika_info.response')" v-if="resInformation_Date">

                <div v-if="resInformation_Date.SOATO">
                    <b-card no-body class="overflow-hidden">
                        <b-row no-gutters>
                            <b-col md="6">
                                <b-card-text>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>
                                            {{ $t('submodules.integration.elektr_info.response.SOATO') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.SOATO ? resInformation_Date.SOATO : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b> {{ $t('submodules.integration.elektr_info.response.CUSTOMER_TYPE') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.CUSTOMER_TYPE ? resInformation_Date.CUSTOMER_TYPE : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.CUSTOMER_CODE') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.CUSTOMER_CODE ? resInformation_Date.CUSTOMER_CODE : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.FIO') }}</b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.FIO ? resInformation_Date.FIO : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.ADRESS') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.ADRESS ? resInformation_Date.ADRESS : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.PASSPORT_NUMBER') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.PASSPORT_NUMBER ? resInformation_Date.PASSPORT_NUMBER : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.MAXALL_NAME') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.MAXALL_NAME ? resInformation_Date.MAXALL_NAME : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.CONTRACT_NUMBER') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.CONTRACT_NUMBER ? resInformation_Date.CONTRACT_NUMBER : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.CONTRACT_DATE') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.CONTRACT_DATE ? resInformation_Date.CONTRACT_DATE : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.TARIF_PRICE') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.TARIF_PRICE ? resInformation_Date.TARIF_PRICE : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.PHONE_MOBILE') }}</b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.PHONE_MOBILE ? resInformation_Date.PHONE_MOBILE : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.PHONE_MOBILE_D') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.PHONE_MOBILE_D ? resInformation_Date.PHONE_MOBILE_D : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                </b-card-text>
                            </b-col>
                            <b-col md="6">
                                <b-card-text>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.KF_TR') }}</b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.KF_TR ? resInformation_Date.KF_TR : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.PINFL') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.PINFL ? resInformation_Date.PINFL : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>


                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.INN') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.INN ? resInformation_Date.INN : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.KADASTR_CODE') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.KADASTR_CODE ? resInformation_Date.KADASTR_CODE : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.METER_TYPE') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.METER_TYPE ? resInformation_Date.METER_TYPE : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.METER_NO') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.METER_NO ? resInformation_Date.METER_NO : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.METER_RZ') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.METER_RZ ? resInformation_Date.METER_RZ : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.METER_DATE') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.METER_DATE ? resInformation_Date.METER_DATE : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.ASKUE') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.ASKUE ? resInformation_Date.ASKUE : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.LAST_POK') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.LAST_POK ? resInformation_Date.LAST_POK : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>{{ $t('submodules.integration.elektr_info.response.LAST_POK_DATE') }} </b>
                                        <span variant="primary" pill>{{
                                            resInformation_Date.LAST_POK_DATE ? resInformation_Date.LAST_POK_DATE : '_ _ _'
                                            }}</span>
                                    </b-list-group-item>

                                </b-card-text>
                            </b-col>
                        </b-row>
                    </b-card>
                    <b-row no-gutters>
                        <b-col md="6">
                            <b-card-text>
                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                    <b>
                                        {{ $t('submodules.integration.elektr_info.response.LAST_PAYMENT') }} </b>
                                    <span variant="primary" pill>{{
                                        resInformation_Date.LAST_PAYMENT ? resInformation_Date.LAST_PAYMENT : '_ _ _'
                                        }}</span>
                                </b-list-group-item>
                            </b-card-text>
                        </b-col>
                        <b-col md="6">
                            <b-card-text>
                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                    <b>
                                        {{ $t('submodules.integration.elektr_info.response.LAST_PAYMENT_DATE') }}</b>
                                    <span variant="primary" pill>{{
                                        resInformation_Date.LAST_PAYMENT_DATE ? resInformation_Date.LAST_PAYMENT_DATE : '_ _ _'
                                        }}</span>
                                </b-list-group-item>
                            </b-card-text>
                        </b-col>
                    </b-row>
                    <br>
                    <h5><b> {{ $t('submodules.integration.elektr_info.response.SALDO_PERIOD') }} </b></h5>
                    <table
                            v-if="
            resInformation_Date.SALDO_PERIOD !== undefined &&
            resInformation_Date.SALDO_PERIOD !== null &&
            resInformation_Date.SALDO_PERIOD !== ''">
                        <tbody>
                        <tr class="text-center">
                            <td class="text-left"><strong> {{
                                $t('submodules.integration.elektr_info.response.PERIOD')
                                }} </strong></td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.PERIOD[0] ? resInformation_Date.SALDO_PERIOD.PERIOD[0] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.PERIOD[1] ? resInformation_Date.SALDO_PERIOD.PERIOD[1] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.PERIOD[2] ? resInformation_Date.SALDO_PERIOD.PERIOD[2] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.PERIOD[3] ? resInformation_Date.SALDO_PERIOD.PERIOD[3] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.PERIOD[4] ? resInformation_Date.SALDO_PERIOD.PERIOD[4] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.PERIOD[5] ? resInformation_Date.SALDO_PERIOD.PERIOD[5] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.PERIOD[6] ? resInformation_Date.SALDO_PERIOD.PERIOD[6] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.PERIOD[7] ? resInformation_Date.SALDO_PERIOD.PERIOD[7] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.PERIOD[8] ? resInformation_Date.SALDO_PERIOD.PERIOD[8] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.PERIOD[9] ? resInformation_Date.SALDO_PERIOD.PERIOD[9] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.PERIOD[10] ? resInformation_Date.SALDO_PERIOD.PERIOD[10] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.PERIOD[11] ? resInformation_Date.SALDO_PERIOD.PERIOD[11] : '_ _ _'
                                }}
                            </td>
                        </tr>
                        <tr class="text-center">
                            <td class="text-left"><strong> {{
                                $t('submodules.integration.elektr_info.response.SALDO_IN')
                                }} </strong>
                            </td>
                            <td>{{
                                resInformation_Date.SALDO_PERIOD.SALDO_IN[0] ? resInformation_Date.SALDO_PERIOD.SALDO_IN[0] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_IN[1] ? resInformation_Date.SALDO_PERIOD.SALDO_IN[1] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_IN[2] ? resInformation_Date.SALDO_PERIOD.SALDO_IN[2] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_IN[3] ? resInformation_Date.SALDO_PERIOD.SALDO_IN[3] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_IN[4] ? resInformation_Date.SALDO_PERIOD.SALDO_IN[4] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_IN[5] ? resInformation_Date.SALDO_PERIOD.SALDO_IN[5] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_IN[6] ? resInformation_Date.SALDO_PERIOD.SALDO_IN[6] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_IN[7] ? resInformation_Date.SALDO_PERIOD.SALDO_IN[7] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_IN[8] ? resInformation_Date.SALDO_PERIOD.SALDO_IN[8] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_IN[9] ? resInformation_Date.SALDO_PERIOD.SALDO_IN[9] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_IN[10] ? resInformation_Date.SALDO_PERIOD.SALDO_IN[10] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_IN[11] ? resInformation_Date.SALDO_PERIOD.SALDO_IN[11] : '_ _ _'
                                }}
                            </td>
                        </tr>
                        <tr class="text-center">
                            <td class="text-left"><strong> {{
                                $t('submodules.integration.elektr_info.response.DEBIT')
                                }} </strong></td>
                            <td>{{
                                resInformation_Date.SALDO_PERIOD.DEBIT[0] ? resInformation_Date.SALDO_PERIOD.DEBIT[0] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.SALDO_PERIOD.DEBIT[1] ? resInformation_Date.SALDO_PERIOD.DEBIT[1] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.SALDO_PERIOD.DEBIT[2] ? resInformation_Date.SALDO_PERIOD.DEBIT[2] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.SALDO_PERIOD.DEBIT[3] ? resInformation_Date.SALDO_PERIOD.DEBIT[3] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.SALDO_PERIOD.DEBIT[4] ? resInformation_Date.SALDO_PERIOD.DEBIT[4] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.SALDO_PERIOD.DEBIT[5] ? resInformation_Date.SALDO_PERIOD.DEBIT[5] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.SALDO_PERIOD.DEBIT[6] ? resInformation_Date.SALDO_PERIOD.DEBIT[6] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.SALDO_PERIOD.DEBIT[7] ? resInformation_Date.SALDO_PERIOD.DEBIT[7] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.SALDO_PERIOD.DEBIT[8] ? resInformation_Date.SALDO_PERIOD.DEBIT[8] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.SALDO_PERIOD.DEBIT[9] ? resInformation_Date.SALDO_PERIOD.DEBIT[9] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.DEBIT[10] ? resInformation_Date.SALDO_PERIOD.DEBIT[10] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.DEBIT[11] ? resInformation_Date.SALDO_PERIOD.DEBIT[11] : '_ _ _'
                                }}
                            </td>
                        </tr>
                        <tr class="text-center">
                            <td class="text-left"><strong> {{
                                $t('submodules.integration.elektr_info.response.REDEBIT')
                                }} </strong>
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.REDEBIT[0] ? resInformation_Date.SALDO_PERIOD.REDEBIT[0] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.SALDO_PERIOD.REDEBIT[1] ? resInformation_Date.SALDO_PERIOD.REDEBIT[1] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.REDEBIT[2] ? resInformation_Date.SALDO_PERIOD.REDEBIT[2] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.REDEBIT[3] ? resInformation_Date.SALDO_PERIOD.REDEBIT[3] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.REDEBIT[4] ? resInformation_Date.SALDO_PERIOD.REDEBIT[4] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.REDEBIT[5] ? resInformation_Date.SALDO_PERIOD.REDEBIT[5] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.REDEBIT[6] ? resInformation_Date.SALDO_PERIOD.REDEBIT[6] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.REDEBIT[7] ? resInformation_Date.SALDO_PERIOD.REDEBIT[7] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.REDEBIT[8] ? resInformation_Date.SALDO_PERIOD.REDEBIT[8] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.REDEBIT[9] ? resInformation_Date.SALDO_PERIOD.REDEBIT[9] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.REDEBIT[10] ? resInformation_Date.SALDO_PERIOD.REDEBIT[10] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.REDEBIT[11] ? resInformation_Date.SALDO_PERIOD.REDEBIT[11] : '_ _ _'
                                }}
                            </td>
                        </tr>
                        <tr class="text-center">
                            <td class="text-left"><strong> {{
                                $t('submodules.integration.elektr_info.response.CREDIT')
                                }} </strong></td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.CREDIT[0] ? resInformation_Date.SALDO_PERIOD.CREDIT[0] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.CREDIT[1] ? resInformation_Date.SALDO_PERIOD.CREDIT[1] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.CREDIT[2] ? resInformation_Date.SALDO_PERIOD.CREDIT[2] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.CREDIT[3] ? resInformation_Date.SALDO_PERIOD.CREDIT[3] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.CREDIT[4] ? resInformation_Date.SALDO_PERIOD.CREDIT[4] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.SALDO_PERIOD.CREDIT[5] ? resInformation_Date.SALDO_PERIOD.CREDIT[5] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.CREDIT[6] ? resInformation_Date.SALDO_PERIOD.CREDIT[6] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.CREDIT[7] ? resInformation_Date.SALDO_PERIOD.CREDIT[7] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.CREDIT[8] ? resInformation_Date.SALDO_PERIOD.CREDIT[8] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.CREDIT[9] ? resInformation_Date.SALDO_PERIOD.CREDIT[9] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.CREDIT[10] ? resInformation_Date.SALDO_PERIOD.CREDIT[10] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.CREDIT[11] ? resInformation_Date.SALDO_PERIOD.CREDIT[11] : '_ _ _'
                                }}
                            </td>
                        </tr>
                        <tr class="text-center">
                            <td class="text-left"><strong>
                                {{ $t('submodules.integration.elektr_info.response.SALDO_OUT') }} </strong>
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_OUT[0] ? resInformation_Date.SALDO_PERIOD.SALDO_OUT[0] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_OUT[1] ? resInformation_Date.SALDO_PERIOD.SALDO_OUT[1] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_OUT[2] ? resInformation_Date.SALDO_PERIOD.SALDO_OUT[2] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_OUT[3] ? resInformation_Date.SALDO_PERIOD.SALDO_OUT[3] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_OUT[4] ? resInformation_Date.SALDO_PERIOD.SALDO_OUT[4] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_OUT[5] ? resInformation_Date.SALDO_PERIOD.SALDO_OUT[5] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_OUT[6] ? resInformation_Date.SALDO_PERIOD.SALDO_OUT[6] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_OUT[7] ? resInformation_Date.SALDO_PERIOD.SALDO_OUT[7] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_OUT[8] ? resInformation_Date.SALDO_PERIOD.SALDO_OUT[8] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_OUT[9] ? resInformation_Date.SALDO_PERIOD.SALDO_OUT[9] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_OUT[10] ? resInformation_Date.SALDO_PERIOD.SALDO_OUT[10] : '_ _ _'
                                }}
                            </td>
                            <td>
                                {{
                                resInformation_Date.SALDO_PERIOD.SALDO_OUT[11] ? resInformation_Date.SALDO_PERIOD.SALDO_OUT[11] : '_ _ _'
                                }}
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <br>
                    <h5><b>{{ $t('submodules.integration.elektr_info.response.PAYMENTS') }} </b></h5>
                    <table v-if="
            resInformation_Date.PAYMENTS !== undefined &&
            resInformation_Date.PAYMENTS !== null &&
            resInformation_Date.PAYMENTS !== ''">
                        <tbody>
                        <tr class="text-center">
                            <td class="text-left"><strong>{{
                                $t('submodules.integration.elektr_info.response.PAY_DATE')
                                }}</strong></td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_DATE[0] ? resInformation_Date.PAYMENTS.PAY_DATE[0] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_DATE[1] ? resInformation_Date.PAYMENTS.PAY_DATE[1] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_DATE[2] ? resInformation_Date.PAYMENTS.PAY_DATE[2] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_DATE[3] ? resInformation_Date.PAYMENTS.PAY_DATE[3] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_DATE[4] ? resInformation_Date.PAYMENTS.PAY_DATE[4] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_DATE[5] ? resInformation_Date.PAYMENTS.PAY_DATE[5] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_DATE[6] ? resInformation_Date.PAYMENTS.PAY_DATE[6] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_DATE[7] ? resInformation_Date.PAYMENTS.PAY_DATE[7] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_DATE[8] ? resInformation_Date.PAYMENTS.PAY_DATE[8] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_DATE[9] ? resInformation_Date.PAYMENTS.PAY_DATE[9] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_DATE[10] ? resInformation_Date.PAYMENTS.PAY_DATE[10] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_DATE[11] ? resInformation_Date.PAYMENTS.PAY_DATE[11] : '_ _ _'
                                }}
                            </td>
                        </tr>
                        <tr class="text-center">
                            <td class="text-left"><strong>{{
                                $t('submodules.integration.elektr_info.response.PAY_SUM')
                                }}</strong></td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_SUM[0] ? resInformation_Date.PAYMENTS.PAY_SUM[0] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_SUM[1] ? resInformation_Date.PAYMENTS.PAY_SUM[1] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_SUM[2] ? resInformation_Date.PAYMENTS.PAY_SUM[2] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_SUM[3] ? resInformation_Date.PAYMENTS.PAY_SUM[3] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_SUM[4] ? resInformation_Date.PAYMENTS.PAY_SUM[4] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_SUM[5] ? resInformation_Date.PAYMENTS.PAY_SUM[5] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_SUM[6] ? resInformation_Date.PAYMENTS.PAY_SUM[6] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_SUM[7] ? resInformation_Date.PAYMENTS.PAY_SUM[7] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_SUM[8] ? resInformation_Date.PAYMENTS.PAY_SUM[8] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_SUM[9] ? resInformation_Date.PAYMENTS.PAY_SUM[9] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_SUM[10] ? resInformation_Date.PAYMENTS.PAY_SUM[10] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_SUM[11] ? resInformation_Date.PAYMENTS.PAY_SUM[11] : '_ _ _'
                                }}
                            </td>
                        </tr>
                        <tr class="text-center">
                            <td class="text-left"><strong>{{
                                $t('submodules.integration.elektr_info.response.PAY_TYPE')
                                }}</strong></td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_TYPE[0] ? resInformation_Date.PAYMENTS.PAY_TYPE[0] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_TYPE[1] ? resInformation_Date.PAYMENTS.PAY_TYPE[1] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_TYPE[2] ? resInformation_Date.PAYMENTS.PAY_TYPE[2] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_TYPE[3] ? resInformation_Date.PAYMENTS.PAY_TYPE[3] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_TYPE[4] ? resInformation_Date.PAYMENTS.PAY_TYPE[4] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_TYPE[5] ? resInformation_Date.PAYMENTS.PAY_TYPE[5] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_TYPE[6] ? resInformation_Date.PAYMENTS.PAY_TYPE[6] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_TYPE[7] ? resInformation_Date.PAYMENTS.PAY_TYPE[7] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_TYPE[8] ? resInformation_Date.PAYMENTS.PAY_TYPE[8] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_TYPE[9] ? resInformation_Date.PAYMENTS.PAY_TYPE[9] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_TYPE[10] ? resInformation_Date.PAYMENTS.PAY_TYPE[10] : '_ _ _'
                                }}
                            </td>
                            <td>{{
                                resInformation_Date.PAYMENTS.PAY_TYPE[11] ? resInformation_Date.PAYMENTS.PAY_TYPE[11] : '_ _ _'
                                }}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <br>
                    <h5><b>{{ $t('submodules.integration.elektr_info.response.READINGS') }}</b></h5>
                    <b-row no-gutters v-if="
            resInformation_Date.READINGS !== undefined &&
            resInformation_Date.READINGS !== null &&
            resInformation_Date.READINGS !== ''">
                        <b-col md="6">
                            <b-card-text>
                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                    <b>
                                        {{ $t('submodules.integration.elektr_info.response.METER_TYPE') }}</b>
                                    <span variant="primary" pill>{{
                                        resInformation_Date.READINGS.METER_TYPE[0] ? resInformation_Date.READINGS.METER_TYPE[0] : '_ _ _'
                                        }}</span>
                                </b-list-group-item>
                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                    <b>
                                        {{ $t('submodules.integration.elektr_info.response.METER_NO') }} </b>
                                    <span variant="primary" pill>{{
                                        resInformation_Date.READINGS.METER_NO[0] ? resInformation_Date.READINGS.METER_NO[0] : '_ _ _'
                                        }}</span>
                                </b-list-group-item>
                            </b-card-text>
                        </b-col>
                        <b-col md="6">
                            <b-card-text>
                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                    <b>
                                        {{ $t('submodules.integration.elektr_info.response.READING') }}</b>
                                    <span variant="primary" pill>{{
                                        resInformation_Date.READINGS.READING[0] ? resInformation_Date.READINGS.READING[0] : '_ _ _'
                                        }}</span>
                                </b-list-group-item>
                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                    <b>
                                        {{ $t('submodules.integration.elektr_info.response.READING_DATE') }} </b>
                                    <span variant="primary" pill>{{
                                        resInformation_Date.READINGS.READING_DATE[0] ? resInformation_Date.READINGS.READING_DATE[0] : '_ _ _'
                                        }}</span>
                                </b-list-group-item>
                            </b-card-text>
                        </b-col>
                    </b-row>
                    <br>
                    <h5><b>{{ $t('submodules.integration.elektr_info.response.OTHER_DOCS') }}</b></h5>
                    <b-row no-gutters v-if="
            resInformation_Date.OTHER_DOCS !== undefined &&
            resInformation_Date.OTHER_DOCS !== null &&
            resInformation_Date.OTHER_DOCS !== ''">
                        <b-col md="6">
                            <b-card-text>
                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                    <b>
                                        {{ $t('submodules.integration.elektr_info.response.DOC_TYPE') }}</b>
                                    <span variant="primary" pill>{{
                                        resInformation_Date.OTHER_DOCS.DOC_TYPE[0] ? resInformation_Date.OTHER_DOCS.DOC_TYPE[0] : '_ _ _'
                                        }}</span>
                                </b-list-group-item>
                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                    <b>
                                        {{ $t('submodules.integration.elektr_info.response.NUM_DOC') }}</b>
                                    <span variant="primary" pill>{{
                                        resInformation_Date.OTHER_DOCS.NUM_DOC[0] ? resInformation_Date.OTHER_DOCS.NUM_DOC[0] : '_ _ _'
                                        }}</span>
                                </b-list-group-item>
                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                    <b>
                                        {{ $t('submodules.integration.elektr_info.response.DATE_DOC') }}</b>
                                    <span variant="primary" pill>{{
                                        resInformation_Date.OTHER_DOCS.DATE_DOC[0] ? resInformation_Date.OTHER_DOCS.DATE_DOC[0] : '_ _ _'
                                        }}</span>
                                </b-list-group-item>
                            </b-card-text>
                        </b-col>
                        <b-col md="6">
                            <b-card-text>
                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                    <b>
                                        {{ $t('submodules.integration.elektr_info.response.SUMM_DOC') }}</b>
                                    <span variant="primary" pill>{{
                                        resInformation_Date.OTHER_DOCS.SUMM_DOC[0] ? resInformation_Date.OTHER_DOCS.SUMM_DOC[0] : '_ _ _'
                                        }}</span>
                                </b-list-group-item>
                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                    <b>
                                        {{ $t('submodules.integration.elektr_info.response.STATE') }}</b>
                                    <span variant="primary" pill>{{
                                        resInformation_Date.OTHER_DOCS.STATE[0] ? resInformation_Date.OTHER_DOCS.STATE[0] : '_ _ _'
                                        }}</span>
                                </b-list-group-item>
                                <b-list-group-item class="d-flex justify-content-between align-items-center">
                                    <b>
                                        {{ $t('submodules.integration.elektr_info.response.PERIOD') }}</b>
                                    <span variant="primary" pill>{{
                                        resInformation_Date.OTHER_DOCS.PERIOD[0] ? resInformation_Date.OTHER_DOCS.PERIOD[0] : '_ _ _'
                                        }}</span>
                                </b-list-group-item>
                            </b-card-text>
                        </b-col>
                    </b-row>
                </div>
                <div>
                    <h6 class="mt-5"> {{ resInformation_Date.msg }}</h6>
                </div>
            </b-card>
            <div class="text-center" v-else-if="loadingTableItems">
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
            soato: "",
            code: "",
            passport_number: "",
            tin: "",
            resInformation_Date: null,
            resKR_Sert_asosiy: [],
            resTovar: [],
            loadingTableItems: false,
        }
    },
    computed: {
        computedObserver() {
            return this.$refs.observer
        },
    },
    methods: {
        findContractorBySenderPinfl() {
            this.computedObserver.validate().then(valid => {
                if (valid) {
                    this.loadingTableItems = true
                    integratsiyaService.getElektrTaminotInfoByPinflWith_kad_num({
                        pinfl: this.sender_pinfl,
                        kad_num: this.kad_num
                    }, true)
                        .then(res => {
                            this.resInformation_Date = res.data
                            this.loadingTableItems = false
                            this.$toast(res.data.msg, {type: 'success'});
                        })
                        .catch(e => {
                            this.loadingTableItems = false
                            this.$toast(this.$t('submodules.integration.statistics_info.download_error'), {type: 'error'});
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

table, th, td {
    border: 1px solid #676666;
    padding: 10px;
}

table {
    border-collapse: collapse;
    caption-side: bottom;
    width: 100%;
}

caption {
    font-size: 16px;
    font-weight: bold;
    padding-top: 5px;
}
</style>




