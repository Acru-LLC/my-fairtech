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
                                md="3"
                        >
                            <BaseInputWithValidation
                                    label-on-top
                                    rules="required"
                                    v-model="form.firstname"
                                    :label="$t('auth.first_name')"
                                    :placeholder="$t('auth.first_name')"
                                    class="required"
                            />
                        </b-col>
                        <b-col
                                sm="12"
                                md="3"
                        >
                            <BaseInputWithValidation
                                    label-on-top
                                    rules="required"
                                    v-model="form.lastname"
                                    :label="$t('auth.last_name')"
                                    :placeholder="$t('auth.last_name')"
                                    class="required"
                            />
                        </b-col>
                        <b-col
                                sm="12"
                                md="3"
                        >
                            <BaseInputWithValidation
                                    label-on-top
                                    v-model="form.middlename"
                                    :label="$t('auth.middle_name')"
                                    :placeholder="$t('auth.middle_name')"
                            />
                        </b-col>
                        <b-col
                                sm="12"
                                md="3"
                        >
                            <BaseDatePickerWithValidation
                                    class="required"
                                    rules="required"
                                    :label="$t('column.birthdate')"
                                    type="year"
                                    format="YYYY"
                                    label-on-top
                                    lang="ru"
                                    v-model="form.birth_year"
                            ></BaseDatePickerWithValidation>
                        </b-col>

                    </b-row>
                    <b-row class="mt-3">
                        <b-col
                                sm="12"
                                md="2"
                        >
                            <BaseInputWithValidation
                                    rules="integer|min:14|max:14"
                                    v-model="form.pinfl"
                                    mask="##############"
                                    label-on-top
                                    :label="$t('submodules.integration.farmasevtika_info.fields2.pinfl')"
                                    :placeholder="$t('submodules.integration.farmasevtika_info.fields2.pinfl')"
                            >
                            </BaseInputWithValidation>
                        </b-col>
                        <b-col
                                sm="12"
                                md="2"
                        >
                            <BaseInputWithValidation
                                    v-model="form.passport"
                                    label-on-top
                                    :label="$t('submodules.integration.ssv_info.res.pasport')"
                                    :placeholder="$t('submodules.integration.ssv_info.res.pasport')"
                            />
                        </b-col>
                        <b-col
                                sm="12"
                                md="2"
                        >
                            <BaseInputWithValidation
                                    label-on-top
                                    rules="required"
                                    v-model="form.organization_id"
                                    :label="$t('submodules.integration.iiv_info.organization_id')"
                                    :placeholder="$t('submodules.integration.iiv_info.organization_id')"
                                    class="required"
                            />
                        </b-col>
                        <b-col
                                sm="12"
                                md="2"
                        >
                            <BaseInputWithValidation
                                    label-on-top
                                    rules="required"
                                    v-model="form.region_id"
                                    :label="$t('submodules.integration.iiv_info.region_id')"
                                    :placeholder="$t('submodules.integration.iiv_info.region_id')"
                                    class="required"
                            />
                        </b-col>
                        <b-col
                                sm="12"
                                md="3"
                        >
                            <!--                            <b-form-checkbox-group-->
                            <!--                                class="mt-4"-->
                            <!--                                v-model="form.consent"-->
                            <!--                                :options="{text: $t('submodules.integration.iiv_info.consent')}"-->
                            <!--                                :state="state"-->
                            <!--                                name="checkbox-validation"-->
                            <!--                            >-->
                            <!--                                <b-form-invalid-feedback :state="state">{{$t('validator.required')}}</b-form-invalid-feedback>-->
                            <!--                                <b-form-valid-feedback :state="state">Thank you</b-form-valid-feedback>-->
                            <!--                            </b-form-checkbox-group>-->
                            <b-form-checkbox class="mt-4" v-model="form.consent" switch>
                              <span>
                      {{ $t('submodules.integration.iiv_info.consent') }}
                        </span>
                            </b-form-checkbox>
                        </b-col>
                        <b-col
                                sm="12"
                                md="1"
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
                lastname: "",
                middlename: "",
                firstname: "",
                birth_year: "",
                pinfl: "",
                passport: "",
                organization_id: "",
                region_id: "",
                consent: false,
            },
            resInformation_Date: null,
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
                    label: 'abonent id',
                    key: 'abonents_id',
                    thStyle: {
                        minWidth: '230px',
                    },
                },
                {

                    label: 'davr',
                    key: 'period',
                    thStyle: {
                        minWidth: '150px',
                    },
                },
                {
                    label: 'saldo boshi',
                    key: 'saldo_n',
                    thStyle: {
                        minWidth: '220px',
                    }
                },
                {
                    label: "oylik to'lov qiymati",
                    key: 'nachis',
                    thStyle: {
                        minWidth: '120px',
                    }
                },
                {
                    label: 'akt',
                    key: 'akt',
                    thStyle: {
                        minWidth: '120px',
                    }
                },
                {
                    label: "To'lov",
                    key: 'postup',
                    thStyle: {
                        minWidth: '120px',
                    }
                },
                {
                    label: "Saldo oxiri",
                    key: 'saldo_k',
                    thStyle: {
                        minWidth: '120px',
                    }
                },


            ],
        }
    },
    computed: {
        computedObserver() {
            return this.$refs.observer
        },
        state() {
            return this.form.consent ? true : false
        }
    },
    methods: {
        getInfos() {
            this.computedObserver.validate().then(valid => {
                if (valid) {

                    this.loadingTableItems = true
                    let data = {
                        lastname: this.form.lastname,
                        middlename: this.form.middlename,
                        firstname: this.form.firstname,
                        birth_year: this.form.birth_year,
                        pinfl: this.form.pinfl,
                        passport: this.form.passport,
                        organization_id: this.form.organization_id,
                        region_id: this.form.region_id,
                        consent: this.form.consent,
                    }
                    integratsiyaService.getIIVInfo(data, true)
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




