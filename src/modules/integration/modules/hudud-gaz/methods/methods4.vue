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
                md="6"
            >
              <BaseInputWithValidation
                  v-model="value"
                  @keyup.enter="findDataForMip"
                  with-input-append
                  :label="$t('submodules.integration.hududgaz_info.response.customer_code')"
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
                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.hududgaz_info.response.customer_code') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.customer_code ? resInformation_Date.customer_code : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.hududgaz_info.response.name') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.name ? resInformation_Date.name : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.hududgaz_info.response.address') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.address ? resInformation_Date.address : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.hududgaz_info.response.tariff_summa') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.tariff_summa ? resInformation_Date.tariff_summa : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.hududgaz_info.response.meter_type') }}</b>
                    <span variant="primary"
                          pill>{{ resInformation_Date.meter_type ? resInformation_Date.meter_type : '_ _ _' }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.hududgaz_info.response.meter_number') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.meter_number ? resInformation_Date.meter_number : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.hududgaz_info.response.is_askug') }}</b>
                    <span variant="primary"
                          pill>{{ resInformation_Date.is_askug ? resInformation_Date.is_askug : '_ _ _' }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.hududgaz_info.response.last_reading_val') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.last_reading_val ? resInformation_Date.last_reading_val : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.hududgaz_info.response.last_reading_date') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.last_reading_date ? resInformation_Date.last_reading_date : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.hududgaz_info.response.paid_volume') }}</b>
                    <span variant="primary"
                          pill>{{ resInformation_Date.paid_volume ? resInformation_Date.paid_volume : '_ _ _' }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.hududgaz_info.response.last_payment_date') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.last_payment_date ? resInformation_Date.last_payment_date : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.hududgaz_info.response.last_payment_sum') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.last_payment_sum ? resInformation_Date.last_payment_sum : '_ _ _'
                      }}</span>
                  </b-list-group-item>

                  <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                    {{ $t('submodules.integration.hududgaz_info.response.current_balance') }}</b>
                    <span variant="primary" pill>{{
                        resInformation_Date.current_balance ? resInformation_Date.current_balance : '_ _ _'
                      }}</span>
                  </b-list-group-item>
                </b-list-group>
              </b-card-text>
            </b-col>
          </b-row>
        </b-card>
        <h5><b> {{ $t('submodules.integration.hududgaz_info.response.interraction') }}</b></h5>
        <b-table
            :items="resTovar" :fields="tableFields" :busy="loadingTableItems" id="my-table"
            class="custom-b-table" responsive striped bordered small hover show-empty
        >
          <template #cell(index)="data">
            {{ util_paginate(data.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage) }}
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
      <h6 class="text-center">
        {{ resMessage }}
      </h6>
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
  name: "methods4",
  data() {
    return {
      dataa: {
        "abonent": {
          "id": 6,
          "customer_code": "1********",
          "name": ".  *******",
          "address": "Х **********",
          "tariff_summa": 380.0,
          "meter_type": "TEGH-G1.6",
          "meter_number": "TP******",
          "is_askug": 1,
          "last_reading_val": 528.0,
          "last_reading_date": "24.03.2022",
          "paid_volume": 995.0,
          "last_payment_date": "07.01.2022",
          "last_payment_sum": 200000.0,
          "current_balance": 177502.83,
          "interraction": [
            {
              "period": "03.2022",
              "reading_value": 528.0,
              "gas_consume": 38.0,
              "accrual": 14440.0,
              "act": 0.0,
              "fine": 0.0,
              "saldo_k": -177502.83255052246,
              "people_count": 2,
              "gas_equipments_count": 1,
              "heating_field": 0.0
            },
            {
              "period": "02.2022",
              "reading_value": 490.0,
              "gas_consume": 49.0,
              "accrual": 18620.0,
              "act": 0.0,
              "fine": 0.0,
              "saldo_k": -191942.83255052246,
              "people_count": 2,
              "gas_equipments_count": 1,
              "heating_field": 0.0
            },
            {
              "period": "01.2022",
              "reading_value": 441.0,
              "gas_consume": 47.0,
              "accrual": 17860.0,
              "act": 0.0,
              "munis_payments": 200000.0,
              "fine": 0.0,
              "saldo_k": -210562.83255052246,
              "people_count": 2,
              "gas_equipments_count": 1,
              "heating_field": 0.0
            }
          ],
          "result_code": -1,
          "result_message": "Внутренняя ошибка"
        },
        "result_code": 0,
        "result_message": "OK"
      },
      value: '',
      resMessage: '',
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
          label:i18n.t("submodules.integration.hududgaz_info.response.reading_value"),
          key: 'reading_value',
          thStyle: {
            minWidth: '230px',
          },
        },
        {
          label:i18n.t("submodules.integration.hududgaz_info.response.gas_consume"),
          key: 'gas_consume',
          thStyle: {
            minWidth: '230px',
          },
        },
        {
          label:i18n.t("submodules.integration.hududgaz_info.response.accrual"),
          key: 'accrual',
          thStyle: {
            minWidth: '230px',
          },
        }, {
          label:i18n.t("submodules.integration.hududgaz_info.response.act"),
          key: 'act',
          thStyle: {
            minWidth: '230px',
          },
        },
        {
          label:i18n.t("submodules.integration.hududgaz_info.response.fine"),
          key: 'fine',
          thStyle: {
            minWidth: '230px',
          },
        },
        {
          label:i18n.t("submodules.integration.hududgaz_info.response.saldo_k"),
          key: 'saldo_k',
          thStyle: {
            minWidth: '230px',
          },
        },
        {
          label:i18n.t("submodules.integration.hududgaz_info.response.people_count"),
          key: 'people_count',
          thStyle: {
            minWidth: '230px',
          },
        },
        {
          label:i18n.t("submodules.integration.hududgaz_info.response.gas_equipments_count"),
          key: 'gas_equipments_count',
          thStyle: {
            minWidth: '230px',
          },
        },
        {
          label:i18n.t("submodules.integration.hududgaz_info.response.heating_field"),
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
      integratsiyaService.getHududGazInfoMethod4(this.value, true)
          .then(res => {
            this.resInformation_Date = res.data.abonent ? res.data.abonent : null
            this.resTovar = res.data.abonent ? res.data.abonent.interraction : []
            this.resMessage = res.data ? res.data.result_message : ''
            this.loadingTableItems = false
            this.value = ''
            setTimeout(() => {
              this.$toast(this.resMessage, {type: 'success'});
            }, 200);
          })
          .catch(e => {
            this.$toast(this.$t('submodules.integration.statistics_info.download_error'), {type: 'error'});
            this.loadingTableItems = false
          })
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




