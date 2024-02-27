<template>
  <ValidationObserver
      ref="observer"
      v-slot="{}"
  >
    <b-row class="text-center">
      <b-col cols="3"></b-col>
      <b-col cols="6">
        <b-form-group v-slot="{ ariaDescribedby }" class="text-center justify-content-center "
                      style="text-align: center">
          <b-form-radio-group v-model="editingItem.code" :aria-describedby="ariaDescribedby" name="radio-inline">
            <b-form-radio value="YURIDIK" class="form-check">{{
                $t("passport.json.legal")
              }}
            </b-form-radio>
            <b-form-radio value="YTT" class="form-check">{{
                $t("tender.yatt")
              }}
            </b-form-radio>
          </b-form-radio-group>
        </b-form-group>
      </b-col>
      <b-col cols="3"></b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col
          sm="12"
          md="6"
      >
        <BaseInputWithValidation
            v-if="editingItem.code == 'YURIDIK'"
            rules="required"
            class="required"
            v-model="editingItem.tin"
            @keyup.enter="findContractorByInn"
            with-input-append
            v-mask="'#########'"
            :label="$t('purchase_info.form1.tin')"
        >
          <template v-slot:append-slot>
            <b-button
                v-show="!loadingStirItems"
                @click="findContractorByInn"
                variant="outline-primary"
                id="contractorSearchButton"
                style="padding: 2.5px 10px; font-size: 1.2rem;"
            >
              <i class="mdi mdi-account-search"></i>
            </b-button>
            <b-button variant="primary" disabled v-show="loadingStirItems">
              <b-spinner small type="grow"></b-spinner>
            </b-button>
          </template>
        </BaseInputWithValidation>

        <BaseInputWithValidation
            v-if="editingItem.code == 'YTT'"
            rules="required"
            class="required"
            v-model="editingItem.pinfl"
            @keyup.enter="findContractorByPinfl"
            with-input-append
            v-mask="'##############'"
            :label="$t('jurist.data_window.form1.pinfl')"
        >
          <template v-slot:append-slot>
            <b-button
                v-show="!loadingStirItems"
                @click="findContractorByPinfl"
                variant="outline-primary"
                id="contractorSearchButton"
                style="padding: 2.5px 10px; font-size: 1.2rem;"
            >
              <i class="mdi mdi-account-search"></i>
            </b-button>
            <b-button variant="primary" disabled v-show="loadingStirItems">
              <b-spinner small type="grow"></b-spinner>
            </b-button>
          </template>
        </BaseInputWithValidation>
      </b-col>
      <b-col
          sm="12"
          md="6"
      >
        <BaseInputWithValidation
            rules="required"
            class="required"
            @input="($event) => (editingItem.nameUz = toCyrill($event))"
            not-required
            v-model="editingItem.nameLt"
            :label="$t('column.name_lt')"
            :placeholder="$t('column.name_lt')"
        />
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col
          sm="12"
          md="6"
      >

        <BaseInputWithValidation
            not-required
            v-model="editingItem.nameRu"
            :label="$t('column.name_ru')"
            :placeholder="$t('column.name_ru')"
        />
      </b-col>
      <b-col
          sm="12"
          md="6"
      >
        <BaseInputWithValidation
            @input="($event) => (editingItem.nameLt = toLatin($event))"
            v-model="editingItem.nameUz"
            :label="$t('column.name_uz')"
            :placeholder="$t('column.name_uz')"
        />
      </b-col>
    </b-row>

    <b-row class="mb-3">
      <b-col
          sm="12"
          md="6"
      >
        <BaseInputWithValidation
            not-required
            v-model="editingItem.address"
            :label="$t('submodules.doc.address')"
            :placeholder="$t('submodules.doc.address')"
        />
      </b-col>
      <b-col
          sm="12"
          md="6"
      >
        <BaseInputWithValidation
            not-required-
            v-model="editingItem.businessStructureName"
            :label="$t('submodules.integration.soliqQomita_info.response.formOfOwnership')"
            :placeholder="$t('submodules.integration.soliqQomita_info.response.formOfOwnership')"
        />

      </b-col>
    </b-row>

    <b-row class="mb-3">
      <b-col
          sm="12"
          md="6"
      >
        <BaseMultiselectWithValidation
            v-model="editingItem.marketTypeId"
            :custom-label="customLabelPriceMarketType"
            :label="$t('fair_price.references.type_of_shopping')"
            :max-height="600"
            :options="price_market_type.map(e => e.id)"
            :show-labels="false"
            class="required"
            open-direction="bottom"
            placeholder=""
            rules="required"
            @search-change="fetchprice_market_type"
        />
      </b-col>
      <b-col
          sm="12"
          md="6"
      >
        <BaseSelectWithValidation
            v-model="editingItem.statusId"
            class="required"
            rules="required"
            :label="$t('column.status')"
            value-field="id"
        >
          <template #first>
            <b-form-select-option
                :value="null"
                disabled
            >{{ $t('column.status') }}
            </b-form-select-option>
            <b-form-select-option v-for="(status, index) in statuses" :key="`${status}-${index}`"
                                  :value="status.id">{{
                getName({
                  nameRu: status.nameRu,
                  nameLt: status.nameLt,
                  nameUz: status.nameUz,
                })
              }}
            </b-form-select-option>
          </template>
        </BaseSelectWithValidation>
      </b-col>
    </b-row>

    <b-row class="mb-3">
      <b-col
          sm="12"
          md="6"
      >
        <BaseTextareaWithValidation
            v-model="editingItem.link"
            :label="$t('column.location_address')"
        />
      </b-col>
      <b-col
          sm="12"
          md="6"
      ></b-col>
    </b-row>
  </ValidationObserver>
</template>
<script>
import helperService from "@/shared/services/helper.service";

const MAIN_API_URL = 'price_market'
import crudAndListsService from "@/shared/services/crud_and_list.service"
import BaseSelectWithValidation from "@/components/base/BaseSelectWithValidation.vue";
import Service from "../service";
import BaseTextareaWithValidation from "@/components/base/BaseTextareaWithValidation.vue";

export default {
  name: "CreateForm",
  props: {
    customIsModeCreate: {
      type: Boolean,
      default: false
    }
  },
  /*
  * COMPONENTS */
  components: {BaseTextareaWithValidation, BaseSelectWithValidation},
  /*
  * DATA */
  data() {
    return {
      editingItem: {},
      price_market_type: [],
      statuses: [],
      loadingStirItems: false,
    }
  },
  /*
  * COMPUTED */
  computed: {
    isModeCreate() {
      return this.customIsModeCreate ? this.customIsModeCreate : this.$route.name === 'CreatePriceMarkets'
    },
    computedObserver() {
      return this.$refs.observer
    }
  },
  /*
  * METHODS */
  methods: {
    findContractorByPinfl() {
      this.loadingStirItems = true
      if (this.editingItem.pinfl && this.editingItem.pinfl.length == 14) {
        this.loadingStirItems = true
        Service.getYuridikShaxsDataByPinfl(this.editingItem.pinfl, this.var_default_search_payload, true)
            .then(res => {
              this.editingItem = {
                code: 'YTT',
                id: this.editingItem.id,
                tin: this.editingItem.tin,
                pinfl: this.editingItem.pinfl,
                nameLt: res.data.company.shortName,
                nameUz: res.data.company.shortName,
                nameRu: res.data.company.shortName,
                businessStructureName: this.editingItem.businessStructureName,
                soato: res.data.companyBillingAddress.soato,
                marketTypeId: this.editingItem.marketTypeId,
                statusId: this.editingItem.statusId,
                link: this.editingItem.link,
                address: `${this.getName({
                  nameRu: res.data.companyBillingAddress.nameRu,
                  nameLt: res.data.companyBillingAddress.nameLt,
                  nameUz: res.data.companyBillingAddress.nameUz,
                })
                }`,
                // busisessStructureDto: `${this.getName({
                //   nameRu: res.data.company.businessStructureNameRu,
                //   nameLt: res.data.company.businessStructureNameLt,
                //   nameUz: res.data.company.businessStructureNameUz,
                // })
                // }`
              }
              this.$toast(this.$t('submodules.integration.statistics_info.download_success'), {type: 'success'});
              this.loadingStirItems = false
            })
            .catch(e => {
              this.loadingStirItems = false
              this.totalItems = 0;
              // this.computedObserver.setErrors({ INN: [this.$t('validator.inn_exist')] });
            })
      } else if (this.editingItem.tin && this.editingItem.tin.length < 14) {
        this.loadingStirItems = false
        this.$toast(this.$t('validator.inn'), {type: 'error'});
      } else {
        this.loadingStirItems = false
        this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
      }
    },
    findContractorByInn() {
      this.loadingStirItems = true
      if (this.editingItem.tin && this.editingItem.tin.length == 9) {
        this.loadingStirItems = true
        Service.getYuridikShaxsData(this.editingItem.tin, this.var_default_search_payload, true)
            .then(res => {
              this.editingItem = {
                code: 'YURIDIK',
                id: this.editingItem.id,
                tin: this.editingItem.tin,
                nameLt: res.data.company.shortName,
                nameUz: res.data.company.shortName,
                nameRu: res.data.company.shortName,
                soato: res.data.companyBillingAddress.soato,
                marketTypeId: this.editingItem.marketTypeId,
                statusId: this.editingItem.statusId,
                address: `${this.getName({
                  nameRu: res.data.companyBillingAddress.nameRu,
                  nameLt: res.data.companyBillingAddress.nameLt,
                  nameUz: res.data.companyBillingAddress.nameUz,
                })
                }`,
                businessStructureName: `${this.getName({
                  nameRu: res.data.company.businessStructureNameRu,
                  nameLt: res.data.company.businessStructureNameLt,
                  nameUz: res.data.company.businessStructureNameUz,
                })
                }`
              }
              this.$toast(this.$t('submodules.integration.statistics_info.download_success'), {type: 'success'});
              this.loadingStirItems = false
            })
            .catch(e => {
              this.loadingStirItems = false
              this.totalItems = 0;
              // this.computedObserver.setErrors({ INN: [this.$t('validator.inn_exist')] });
            })
      } else if (this.editingItem.tin && this.editingItem.tin.length < 9) {
        this.loadingStirItems = false
        this.$toast(this.$t('validator.inn'), {type: 'error'});
      } else {
        this.loadingStirItems = false
        this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
      }
    },
    treeClosed(veeName) {
      this.computedObserver.refs[veeName].validate();
    },
    normalizer(node) {
      if (!node.children || node.children.length === 0) {
        delete node.children
        return {
          id: node.id,
          label: node.name,
        }
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children && node.children.length > 0 ? node.children : [],
      }
    },
    save() {
      this.computedObserver.validate().then(valid => {
        if (valid) {
          if (this.editingItem.id) {
            crudAndListsService.update(MAIN_API_URL, this.editingItem).then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          } else {
            let form = {
              id: this.$refs.formOfficeType.editingItem.id,
              address: this.$refs.formOfficeType.editingItem.address,
              businessStructureName: this.$refs.formOfficeType.editingItem.businessStructureName,
              code: this.$refs.formOfficeType.editingItem.code,
              marketTypeId: this.$refs.formOfficeType.editingItem.marketTypeId,
              soato: this.$refs.formOfficeType.editingItem.soato,
              statusId: this.$refs.formOfficeType.editingItem.statusId,
              link: this.$refs.formOfficeType.editingItem.link,
              tin: this.$refs.formOfficeType.editingItem.tin,
              marketName: this.$refs.formOfficeType.editingItem.nameLt,
            }
            crudAndListsService.create(MAIN_API_URL, form).then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          }
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      });
    },
    fetchprice_market_type(keyword = '', callback = () => 0) {
      if (!keyword && this.price_market_type.length) {
        if (callback) {
          if (callback && typeof callback === 'function') {
            return callback(this.price_market_type)
          }
        }
        return this.price_market_type;
      }
      crudAndListsService.searchListWithKeyword('/price_market_type',
          {...this.var_default_search_payload, keyword: keyword})
          .then(res => {
            this.price_market_type = res.data.list
            if (callback && typeof callback === 'function') {
              return callback(res.data)
            }
          })
          .catch(e => {
            console.log(e)
          })
    },
    customLabelPriceMarketType(opt) {
      let selected = this.price_market_type.find(e => e.id == opt);
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
    },
  },
  /*
  * CREATED */
  async created() {
    this.var_default_search_payload.itemsPerPage = 500
    if (this.isModeCreate) {
      await crudAndListsService.getEmpty(MAIN_API_URL)
          .then(res => {
            this.editingItem = res.data
            this.editingItem.code = 'YURIDIK'
          })
          .catch(e => {
            console.log(e)
          })
    } else {
      await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, false)
          .then(res => {
            this.editingItem = res.data
          })
          .catch(e => {
            console.log(e)
          })
    }
    // GET STATUSES
    await helperService.getRefByCode('status')
        .then(res => {
          this.statuses = res.data.children
          if (this.isModeCreate) {
            let activeStatus = this.statuses.find(el => el.code == 'ACTIVE')
            if (activeStatus) {
              this.editingItem.statusId = activeStatus.id
            }
          }
        })
        .catch(e => {
          console.log(e)
        })

    await this.fetchprice_market_type();
  }
}
</script>
<style scoped>
.col-form-label {
  padding-top: 0;
}

ul {
  list-style-type: none;
}
</style>