<template>
  <div>
    <b-card>
      <div style="border:1px solid #2b675b; padding:15px; border-radius: 7px">
        <b-container fluid="100%">
          <b-row>
            <b-col cols="3">
              <BaseSelectWithValidation
                  v-model="selected"
                  :label="$t('messages.search')"
                  value-field="id"
                  label-on-top
              >
                <b-form-select-option v-for="(item, index) in optionsTable" :key="index"
                                      :value="item.value"> {{
                    item.text
                  }}
                </b-form-select-option>
              </BaseSelectWithValidation>
            </b-col>
            <b-col cols="2">
              <ValidationObserver
                  ref="observer"
                  v-slot="{}"
              >
                <BaseInputWithValidation
                    v-if="selected == 'TIF_TN'"
                    class="required"
                    rules="required"
                    v-model="TIF_TN"
                    @keyup.enter="findInfosBy"
                    :label="$t('product_info.tif_tn_code')"
                    label-on-top
                >
                </BaseInputWithValidation>

                <BaseInputWithValidation
                    v-if="selected == 'SHTRIX'"
                    class="required"
                    rules="required"
                    v-model="SHTRIX"
                    @keyup.enter="findInfosBy"
                    :label="$t('product_info.Shtrix_code')"
                    label-on-top
                >
                </BaseInputWithValidation>

                <BaseInputWithValidation
                    v-if="selected == 'MXIK'"
                    class="required"
                    rules="required"
                    v-model="MXIK"
                    @keyup.enter="findInfosBy"
                    :label="$t('product_info.MXIK_code')"
                    label-on-top
                >
                </BaseInputWithValidation>
              </ValidationObserver>
            </b-col>
            <b-col cols="3">
              <b-button
                  v-if="selected !== null"
                  class="mt-3"
                  v-show="!loadingTableItems"
                  @click="findInfosBy"
                  id="contractorSearchButton"
                  style="background: #2b6c58"
              >
                <i
                    style="font-size: 15px"
                    class="mdi mdi-search-web">
                </i>
                {{ $t('product_info.search') }}
              </b-button>
              <b-button class="mt-3" style="background: #2b6c58" disabled v-show="loadingTableItems">
                <b-spinner small type="grow"></b-spinner>
              </b-button>
            </b-col>
            <b-col class="text-right mt-3">
              <b-button style="background: #2b6c58" class="btn" size="md" @click="$router.go(-1)">
                {{ $t("actions.back") }}
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-card>
    <b-card v-show="resSuccess">

      <div v-if="selected == 'TIF_TN'">
                <span style="background: #2b675b" class="p-1 text-white">
            {{ $t('product_info.response') }}
                </span>
        <div style="border:1px solid #2b675b; padding:15px; border-radius: 7px">
          <span v-if="tableItems2.mxik_code == null">{{ $t("messages.data_not_found_0") }}</span>
          <TIF_TN v-else :resTableItems="tableItems1"></TIF_TN>

        </div>
      </div>
      <div v-if="selected == 'SHTRIX' || selected == 'MXIK'">
                <span style="background: #2b675b" class="p-1 text-white">
            {{ $t('product_info.response') }}
                </span>
        <div style="border:1px solid #2b675b; padding:15px; border-radius: 7px">
          <span v-if="tableItems2.mxik_code == null">{{ $t("messages.data_not_found_0") }}</span>
          <SHTRIX_MXIK v-else :resTableItems="tableItems2"></SHTRIX_MXIK>
        </div>
      </div>
    </b-card>
    <div v-if="tableItems1 && tableItems1.length > 0">
    <div style="border:1px solid #2b675b; padding:15px; margin: 10px; border-radius: 7px"
         v-for="(item, index) in tableItems1" :key="index"
         :value="item.id"
    >
      <div class="pl-5 pr-5 pt-2">
        <b-row>
          <b-col cols="1" style="text-align: center">
                        <span style="opacity: 0.7; color: #2b675b">{{
                            $t('bojxona_info.number_commodity')
                          }}</span> <br>
            <span style="color: #2b675b; font-weight: lighter; font-size: 14px">  {{
                item.number_commodity
              }}</span>
          </b-col>
          <b-col cols="3" style="text-align: center">
                        <span style="opacity: 0.7; color: #2b675b">{{
                            $t('bojxona_info.receiver_name')
                          }}</span> <br>
            <span style="color: #2b675b; font-weight: lighter; font-size: 14px">  {{
                item.receiver_name
              }}</span>
          </b-col>
          <b-col cols="5" style="text-align: center">
                        <span style="opacity: 0.7; color: #2b675b">{{
                            $t('bojxona_info.product_name')
                          }}</span> <br>
            <span style="color: #2b675b; font-weight: lighter; font-size: 14px">  {{
                item.product_name
              }}</span>
          </b-col>
          <b-col cols="2" style="text-align: center">
                          <span style="opacity: 0.7; color: #2b675b">{{
                              $t('bojxona_info.made_in_country')
                            }}</span> <br>
            <span style="color: #2b675b; font-weight: lighter; font-size: 14px; text-align: center !important;">  {{
                item.made_in_country
              }}</span>
          </b-col>

          <b-col cols="1" style="text-align: center">
                        <span style="opacity: 0.7; color: #2b675b">{{
                            $t('bojxona_info.tn_code')
                          }}</span> <br>
            <span style="color: #2b675b; font-weight: lighter; font-size: 14px">  {{
                item.tn_code
              }}</span>
          </b-col>

        </b-row>
      </div>
    </div>
    </div>
    <div v-if="tableItems1 && tableItems1.length == 0" class="text-color text-center">
      {{ $t("messages.data_not_found") }}
    </div>
  </div>
</template>

<script>

import i18n from "@/i18n";
import BaseSelectWithValidation from "@/components/base/BaseSelectWithValidation.vue";
import integratsiyaService from "../../shared/services/integratsiya.service";
import TIF_TN from "../product/tif-tn_shtrix_mxik/Index.vue";
import SHTRIX_MXIK from "../product/tif-tn_shtrix_mxik/SHTRIX_MXIK.vue";

export default {
  components: {
    BaseSelectWithValidation,
    TIF_TN,
    SHTRIX_MXIK
  },
  watch: {
    selected: {
      async handler() {
        this.resSuccess = null
        if (this.selected == 'TIF_TN') {
          this.tableItems2 = {}
          this.SHTRIX = ''
          this.MXIK = ''
        } else if (this.selected == 'SHTRIX') {
          this.tableItems1 = []
          this.TIF_TN = ''
          this.MXIK = ''
        } else if (this.selected == 'MXIK') {
          this.tableItems1 = []
          this.TIF_TN = ''
          this.SHTRIX = ''
        }
      }
    }
  },
  data() {
    return {
      optionsTable: [
        {value: 'TIF_TN', text: i18n.t("product_info.tif_tn")},
        {value: 'SHTRIX', text: i18n.t("product_info.Shtrix")},
        {value: 'MXIK', text: i18n.t("product_info.MXIK")}
      ],
      selected: null,
      TIF_TN: '',
      SHTRIX: '',
      MXIK: '',
      loadingTableItems: false,
      resSuccess: null,
      // tableItems1: [],
      tableItems2: {}
    }
  },
  computed: {
    computedObserver() {
      return this.$refs.observer
    },
  },
  methods: {
    findInfosBy() {
      this.tableItems1 = []
      this.resSuccess = null
      this.computedObserver.validate().then(valid => {
        if (valid) {
          this.loadingTableItems = true
          integratsiyaService.getInfosByCode(this.selected, this.TIF_TN, this.SHTRIX, this.MXIK, true)
              .then(res => {
                if (this.selected == 'TIF_TN') {
                  for (let i = 0; i < res.data.data.length; i++) {
                    for (let j = 0; j < res.data.data[i].goods.length; j++) {
                      res.data.data[i].goods[j].made_in_country = res.data.data[i].departure_recipient_countryName
                      res.data.data[i].goods[j].receiver_name = res.data.data[i].receiver_name

                      this.tableItems1.push(res.data.data[i].goods[j])
                    }

                  }
                } else {
                  this.tableItems2 = res.data.data
                }
                this.resSuccess = res.data.success
                this.$toast(res.data.message, {type: 'success'});
                this.loadingTableItems = false
              })
              .catch(e => {
                this.loadingTableItems = false
                // this.computedObserver.setErrors({ INN: [this.$t('validator.inn_exist')] });
              })
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      });

    },
  },

}
</script>

<style lang="scss" scoped>

::v-deep label {
  font-family: inherit !important;
}

::v-deep .base-form-component__label {
  color: #88a59e;
}

::v-deep .custom-select {
  border: 1px solid #2b675b;
}

::v-deep .form-control {
  border: 1px solid #2b675b;
}

::v-deep .mx-input {
  border: 1px solid #2b675b;
}
</style>
