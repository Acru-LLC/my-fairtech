<template>
  <div>
    <b-card>
      <div style="border:1px solid #2b675b; padding:15px; border-radius: 7px">
        <b-container fluid="100%">
          <b-row>
            <b-col cols="2">
              <ValidationObserver
                  ref="observer"
                  v-slot="{}"
              >
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
    <b-card>
      <div v-show="resSuccess">
                <span style="background: #2b675b" class="p-1 text-white">
            {{ $t('product_info.response') }}
                </span>
        <div style="border:1px solid #2b675b; padding:15px; border-radius: 7px">
          <span v-if="tableItems2.mxik_code == null">{{ $t("messages.data_not_found_0") }}</span>
          <SHTRIX_MXIK v-else :resTableItems="tableItems2"></SHTRIX_MXIK>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>

import i18n from "@/i18n";
import integratsiyaService from "../../shared/services/integratsiya.service";
import SHTRIX_MXIK from "../product/tif-tn_shtrix_mxik/SHTRIX_MXIK.vue";

export default {
  components: {
    SHTRIX_MXIK
  },
  data() {
    return {
      optionsTable: [
        {value: 'MXIK', text: i18n.t("product_info.MXIK")}
      ],
      selected: 'MXIK',
      TIF_TN: '',
      SHTRIX: '',
      MXIK: '',
      loadingTableItems: false,
      tableItems1: [],
      tableItems2: {},
      resSuccess: null,
    }
  },
  computed: {
    computedObserver() {
      return this.$refs.observer
    },
  },
  methods: {
    findInfosBy() {
      this.tableItems = null
      this.resSuccess = null
      this.computedObserver.validate().then(valid => {
        if (valid) {
          this.loadingTableItems = true
          integratsiyaService.getInfosByCode(this.selected, this.TIF_TN, this.SHTRIX, this.MXIK, true)
              .then(res => {
                this.tableItems2 = res.data.data
                this.$toast(res.data.message, {type: 'success'});
                this.loadingTableItems = false
                this.resSuccess = res.data.success
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
