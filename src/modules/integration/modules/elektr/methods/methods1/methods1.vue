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
                  @keyup.enter="findContractorBySenderPinfl"
                  with-input-append
                  :label="$t('submodules.integration.elektr_info.info_1')"
                  class="required"
                  rules="required"
                  placeholder="01:01:01:01:01:0101:0101:010"
              >
                <template v-slot:append-slot>
                  <b-button
                      @click="findContractorBySenderPinfl"
                      variant="outline-primary"
                      id="contractorSearchButton"
                      style="padding: 2.5px 10px; font-size: 1.2rem;"
                  >
                    <i class="mdi mdi-account-search"></i>
                  </b-button>
                </template>
              </BaseInputWithValidation>
              <br>
              <h6>
                Example: 10:08:04:01:01:5045:0001:004
              </h6>
            </b-col>
            <b-col
                sm="12"
                md="4"
                class="ml-4"
            >
              <BaseInputWithValidation
                  v-model="sender_pinfl"
                  @keyup.enter="findContractorBySenderPinfl"
                  with-input-append
                  v-mask="'##############'"
                  :label="$t('submodules.integration.farmasevtika_info.fields2.pinfl')"

              >
                <template v-slot:append-slot>
                  <b-button
                      @click="findContractorBySenderPinfl"
                      variant="outline-primary"
                      id="contractorSearchButton"
                      style="padding: 2.5px 10px; font-size: 1.2rem;"
                  >
                    <i class="mdi mdi-account-search"></i>
                  </b-button>
                </template>
              </BaseInputWithValidation>
              <br>
              <h6>
                Example: 42706690241265
              </h6>
            </b-col>
          </b-row>
        </ValidationObserver>

      </template>


      <b-card :title="$t('submodules.integration.farmasevtika_info.response')" v-if="resInformation_Date">

        <b-card no-body class="overflow-hidden">
          <b-row no-gutters>
            <b-col md="6">
              <b-card-text>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>
                    Abonent FIO</b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].abonent_fio ? resInformation_Date[0].abonent_fio : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Hisob raqam</b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].licshet ? resInformation_Date[0].licshet : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Pasport raqami</b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].passport_number ? resInformation_Date[0].passport_number : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Pinfl</b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].pinfl ? resInformation_Date[0].pinfl : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Kadastr raqami </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].kadastr_number ? resInformation_Date[0].kadastr_number : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Telefon raqami </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].phone ? resInformation_Date[0].phone : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Viloyat nomi </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].regions_name ? resInformation_Date[0].regions_name : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Tuman nomi </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].areas_name ? resInformation_Date[0].areas_name : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Mahalla nomi </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].mahalla_name ? resInformation_Date[0].mahalla_name : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Ko'cha nomi </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].streets_name ? resInformation_Date[0].streets_name : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Manzil</b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].address ? resInformation_Date[0].address : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Uy </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].house ? resInformation_Date[0].house : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Uy indeks</b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].ind ? resInformation_Date[0].ind : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Kvartira </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].flat ? resInformation_Date[0].flat : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Korxona nomi </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].company_name ? resInformation_Date[0].company_name : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Shartnoma raqami </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].contract_number ? resInformation_Date[0].contract_number : '_ _ _'
                    }}</span>
                </b-list-group-item>

              </b-card-text>
            </b-col>
            <b-col md="6">
              <b-card-text>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Shartnoma sanasi </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].contract_date ? resInformation_Date[0].contract_date : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Hozirgi tarif</b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].current_tariff ? resInformation_Date[0].current_tariff : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Yil boshidagi yashovchilar soni </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].pres_cnt_nachale_god ? resInformation_Date[0].pres_cnt_nachale_god : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Hozirgi kundagi yashovchilar soni</b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].current_liver_count ? resInformation_Date[0].current_liver_count : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Oxirgi to'lov qiymati </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].last_pay_amount ? resInformation_Date[0].last_pay_amount : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Oxirgi to'lov sanasi </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].last_pay_date ? resInformation_Date[0].last_pay_date : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Oxirgi to'lov turi </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].last_pay_type ? resInformation_Date[0].last_pay_type : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>INN </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].inn ? resInformation_Date[0].inn : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Davr </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].period ? resInformation_Date[0].period : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Saldo boshi </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].saldo_n ? resInformation_Date[0].saldo_n : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Kreditor </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].credit ? resInformation_Date[0].credit : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Debitor </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].debit ? resInformation_Date[0].debit : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Saldo oxiro </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].saldo_k ? resInformation_Date[0].saldo_k : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Oylik to'lov qiymati </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].nachis ? resInformation_Date[0].nachis : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>akt </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].akt ? resInformation_Date[0].akt : '_ _ _'
                    }}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                  <b>Penya </b>
                  <span variant="primary" pill>{{
                      resInformation_Date[0].penya ? resInformation_Date[0].penya : '_ _ _'
                    }}</span>
                </b-list-group-item>
              </b-card-text>
            </b-col>
          </b-row>
        </b-card>
        <h5><b>Abonent haqidagi ma'lumotlar</b></h5>
        <b-table
            :items="resInformation_Date[0].osvList" :fields="tableFields" :busy="loadingTableItems" id="my-table"
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

        <h5><b>To'lovlar ro'yhati</b></h5>
        <b-table
            :items="resInformation_Date[0].postupList" :fields="tableFieldsPostupList" :busy="loadingTableItems"
            id="my-table"
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
      tableFieldsPostupList: [
        {
          label: "#",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
          key: "index",
        },
        {
          label: "To'lov turi",
          key: 'pay_type',
          thStyle: {
            minWidth: '230px',
          },
        },
        {
          label: "To'lov summasi",
          key: 'amount',
          thStyle: {
            minWidth: '230px',
          },
        },
        {
          label: "To'lov sanasi",
          key: 'pay_date',
          thStyle: {
            minWidth: '230px',
          },
        }
      ],
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
                console.log(res)
                this.resInformation_Date = res.data
                // if (res.data.code == 200) {
                //   this.$toast(res.data.message, {type: 'success'});
                // }
                this.loadingTableItems = false
              })
              .catch(e => {
                // this.computedObserver.setErrors({ INN: [this.$t('validator.inn_exist')] });
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




