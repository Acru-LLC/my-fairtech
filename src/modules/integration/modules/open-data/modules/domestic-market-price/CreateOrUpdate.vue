<template>
  <b-row class="mb-3">
    <b-col md="12" class="text-center">
      <div class="h4 mb-4 d-inline-block">
        {{ $t('open_data.domestic_market_price.code') }} - {{ $t('open_data.domestic_market_price.title') }}
      </div>
    </b-col>
    <b-col md="12">
      <base-create-or-update-wrapper
          @save="save"
          has-save-suspend
          :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
      >
        <ValidationObserver
            ref="observer"
            v-slot="{}"
        >
          <b-row class="mb-3">
            <b-col sm="12" md="6" class="mt-2">
              <BaseDatePickerWithValidation
                  required
                  disable-after
                  custom-styles="grid-template-columns: 25% 75%;"
                  :label="$t('open_data.domestic_market_price.date')"
                  v-model="editingItem.date"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.formedBread"
                  :label="$t('open_data.domestic_market_price.formedBread')"
                  :placeholder="$t('open_data.domestic_market_price.formedBread')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.highGradeFlourImport"
                  :label="$t('open_data.domestic_market_price.highGradeFlourImport')"
                  :placeholder="$t('open_data.domestic_market_price.highGradeFlourImport')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.firstGradeFlourImport"
                  :label="$t('open_data.domestic_market_price.firstGradeFlourImport')"
                  :placeholder="$t('open_data.domestic_market_price.firstGradeFlourImport')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.firstGradeFlourLocal"
                  :label="$t('open_data.domestic_market_price.firstGradeFlourLocal')"
                  :placeholder="$t('open_data.domestic_market_price.firstGradeFlourLocal')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.cottonOilLocal"
                  :label="$t('open_data.domestic_market_price.cottonOilLocal')"
                  :placeholder="$t('open_data.domestic_market_price.cottonOilLocal')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.sunflowerOilImport"
                  :label="$t('open_data.domestic_market_price.sunflowerOilImport')"
                  :placeholder="$t('open_data.domestic_market_price.sunflowerOilImport')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.sugar"
                  :label="$t('open_data.domestic_market_price.sugar-stations')"
                  :placeholder="$t('open_data.domestic_market_price.sugar-stations')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.milkLocal"
                  :label="$t('open_data.domestic_market_price.milkLocal')"
                  :placeholder="$t('open_data.domestic_market_price.milkLocal')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.egg"
                  :label="$t('open_data.domestic_market_price.egg')"
                  :placeholder="$t('open_data.domestic_market_price.egg')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.riceAlanga"
                  :label="$t('open_data.domestic_market_price.riceAlanga')"
                  :placeholder="$t('open_data.domestic_market_price.riceAlanga')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.pasta"
                  :label="$t('open_data.domestic_market_price.pasta')"
                  :placeholder="$t('open_data.domestic_market_price.pasta')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.pastaPackaged"
                  :label="$t('open_data.domestic_market_price.pastaPackaged')"
                  :placeholder="$t('open_data.domestic_market_price.pastaPackaged')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.beefBoneless"
                  :label="$t('open_data.domestic_market_price.beefBoneless')"
                  :placeholder="$t('open_data.domestic_market_price.beefBoneless')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.beefWithBone"
                  :label="$t('open_data.domestic_market_price.beefWithBone')"
                  :placeholder="$t('open_data.domestic_market_price.beefWithBone')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.mutton"
                  :label="$t('open_data.domestic_market_price.mutton')"
                  :placeholder="$t('open_data.domestic_market_price.mutton')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.chicken"
                  :label="$t('open_data.domestic_market_price.chicken')"
                  :placeholder="$t('open_data.domestic_market_price.chicken')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.potato"
                  :label="$t('open_data.domestic_market_price.potato')"
                  :placeholder="$t('open_data.domestic_market_price.potato')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.onion"
                  :label="$t('open_data.domestic_market_price.onion')"
                  :placeholder="$t('open_data.domestic_market_price.onion')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.carrot"
                  :label="$t('open_data.domestic_market_price.carrot')"
                  :placeholder="$t('open_data.domestic_market_price.carrot')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.butter"
                  :label="$t('open_data.domestic_market_price.butter')"
                  :placeholder="$t('open_data.domestic_market_price.butter')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.buckwheat"
                  :label="$t('open_data.domestic_market_price.buckwheat')"
                  :placeholder="$t('open_data.domestic_market_price.buckwheat')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.babyFood"
                  :label="$t('open_data.domestic_market_price.babyFood')"
                  :placeholder="$t('open_data.domestic_market_price.babyFood')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.mask"
                  :label="$t('open_data.domestic_market_price.mask')"
                  :placeholder="$t('open_data.domestic_market_price.mask')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.sanitizerGel"
                  :label="$t('open_data.domestic_market_price.sanitizerGel')"
                  :placeholder="$t('open_data.domestic_market_price.sanitizerGel')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.dryNapkin"
                  :label="$t('open_data.domestic_market_price.dryNapkin')"
                  :placeholder="$t('open_data.domestic_market_price.dryNapkin')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.wetNapkin"
                  :label="$t('open_data.domestic_market_price.wetNapkin')"
                  :placeholder="$t('open_data.domestic_market_price.wetNapkin')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.babyDiaper"
                  :label="$t('open_data.domestic_market_price.babyDiaper')"
                  :placeholder="$t('open_data.domestic_market_price.babyDiaper')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.toiletPaper"
                  :label="$t('open_data.domestic_market_price.toiletPaper')"
                  :placeholder="$t('open_data.domestic_market_price.toiletPaper')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.chlorine"
                  :label="$t('open_data.domestic_market_price.chlorine')"
                  :placeholder="$t('open_data.domestic_market_price.chlorine')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.toothpaste"
                  :label="$t('open_data.domestic_market_price.toothpaste')"
                  :placeholder="$t('open_data.domestic_market_price.toothpaste')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.perfumeSoap"
                  :label="$t('open_data.domestic_market_price.perfumeSoap')"
                  :placeholder="$t('open_data.domestic_market_price.perfumeSoap')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.liquidSoap"
                  :label="$t('open_data.domestic_market_price.liquidSoap')"
                  :placeholder="$t('open_data.domestic_market_price.liquidSoap')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.ethylAlcohol"
                  :label="$t('open_data.domestic_market_price.ethylAlcohol')"
                  :placeholder="$t('open_data.domestic_market_price.ethylAlcohol')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.washingPowder"
                  :label="$t('open_data.domestic_market_price.washingPowder')"
                  :placeholder="$t('open_data.domestic_market_price.washingPowder')"
              />
            </b-col>
            <b-col sm="12" md="6" class="mt-2">
              <BaseInputWithValidation
                  v-model="editingItem.laundrySoap"
                  :label="$t('open_data.domestic_market_price.laundrySoap')"
                  :placeholder="$t('open_data.domestic_market_price.laundrySoap')"
              />
            </b-col>
          </b-row>
        </ValidationObserver>
      </base-create-or-update-wrapper>
    </b-col>
  </b-row>
</template>
<script>
const MAIN_API_URL = 'open-data/domestic-market-price';
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

export default {
  name: "CreateOrUpdate",
  /*
  * DATA */
  data() {
    return {
      editingItem: {},
      statuses: []
    }
  },
  /*
  * COMPUTED */
  computed: {
    isModeCreate() {
      return this.$route.name === 'CreateOpenDataDomesticMarketPrice'
    },
    computedObserver() {
      return this.$refs.observer
    }
  },
  /*
  * METHODS */
  methods: {
    treeClosed(veeName) {
      this.computedObserver.refs[veeName].validate();
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
            crudAndListsService.create(MAIN_API_URL, this.editingItem).then(res => {
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
    async handleCreated() {
      this.var_default_search_payload.itemsPerPage = 500
      if (this.isModeCreate) {
        await crudAndListsService.getEmpty(MAIN_API_URL, null, true)
            .then(res => {
              this.editingItem = res.data
            })
            .catch(e => {
              console.log(e)
            })
      } else {
        await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, true)
            .then(res => {
              this.editingItem = res.data
            })
            .catch(e => {
              console.log(e)
            })
      }
    }
  },
  async created() {
    await this.handleCreated();
  }
}
</script>
<style scoped>
ul {
  list-style-type: none;
}
</style>