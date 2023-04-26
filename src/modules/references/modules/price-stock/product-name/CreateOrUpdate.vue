<template>
  <base-create-or-update-wrapper
      @save="save"
      has-save-suspend
      :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
  >
    <ValidationObserver ref="observer" v-slot="{}">
      <b-row class="mb-1">
        <b-col sm="11">
          <b-row class="mb-1">
            <b-col sm="4">{{ $t('column.connected_product') }}</b-col>
            <b-col sm="8">{{ $t('submodules.integration.price_stock.product_name') }}</b-col>
          </b-row>
        </b-col>
        <b-col sm="1">
          <b-btn v-if="isModeCreate" variant="success" @click="addNewLine">
            <i class="fa fa-plus"></i>
          </b-btn>
        </b-col>
      </b-row>
      <b-row class="mb-1" v-for="(item, key) in items" :key="key">
        <b-col sm="11">
          <b-row class="mb-1">
            <b-col sm="4">
              <BaseInputWithValidation
                  rules="required"
                  v-model="item.spProductName"
                  label-on-top
                  label=""
                  :placeholder="''"
              />
            </b-col>
            <b-col sm="8">
              <BaseMultiselectWithValidation
                  v-model="item.productId"
                  rules="required"
                  placeholder=""
                  label-on-top
                  open-direction="bottom"
                  :label="''"
                  :options="productList.map(el => el.id)"
                  :searchable="true"
                  :show-labels="false"
                  :custom-label="customLabelProductList"
                  @search-change="handleSearchProduct"
              />
            </b-col>
          </b-row>
        </b-col>
        <b-col sm="1">
          <b-btn v-if="isModeCreate" variant="danger" @click="removeLine(key)">
            <i class="fa fa-times"></i>
          </b-btn>
        </b-col>
      </b-row>
    </ValidationObserver>
  </base-create-or-update-wrapper>
</template>
<script>
/** YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListService from "@/shared/services/crud_and_list.service";
import crudAndListsService from "@/shared/services/crud_and_list.service";

const MAIN_API_URL = 'price/stock/product-name'

export default {
  /** DATA */
  data() {
    return {
      empty: {},
      items: [],
      productList: []
    }
  },
  /** COMPUTED */
  computed: {
    isModeCreate() {
      return this.$route.name === 'ReferencesPriceStockProductNameCreate'
    },
    computedObserver() {
      return this.$refs.observer
    }
  },
  /** METHODS */
  methods: {
    treeClosed(veeName) {
      this.computedObserver.refs[veeName].validate();
    },
    customLabelProductList(opt) {
      let selected = this.productList.find(e => e.id === (opt.id ? opt.id : opt));
      if (selected) {
        return this.getName({
          nameRu: `${selected.nameRu} (${selected.unitNameRu})`,
          nameLt: `${selected.nameLt} (${selected.unitNameLt})`,
          nameUz: `${selected.nameUz} (${selected.unitNameUz})`,
        })
      }
      return '';
    },
    save() {
      this.computedObserver.validate().then(valid => {
        if (valid) {
          if (this.items.id) {
            crudAndListsService.update(MAIN_API_URL, this.items).then(res => {
              this.computedObserver.reset()
              this.items = [];
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
            })
          } else {
            crudAndListsService.create(MAIN_API_URL, this.items).then(res => {
              this.computedObserver.reset()
              this.items = [];
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
            })
          }
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
        }
      });
    },
    addNewLine() {
      this.items.push({ ...this.empty })
    },
    removeLine(index) {
      this.items.splice(index, 1)
    },
    fetchProducts(search = '') {
      crudAndListService.searchList('price/product', { page: 1, itemsPerPage: 100 }, '')
          .then(res => {
            this.productList = res.data.list
          })
          .catch(e => {
            console.log(e)
          })
          .finally(() => {
            this.loadingTableItems = false
          })
    },
    handleSearchProduct(a, b, c) {
      console.log(a, b, c)
    },
  },
  /** CREATED */
  async created() {
    this.var_default_search_payload.itemsPerPage = 500
    await crudAndListsService.getEmpty(MAIN_API_URL)
        .then(res => {
          this.empty = res.data
        })
        .catch(e => {
          console.log(e)
        })
    if (this.isModeCreate) {
      this.addNewLine()
    } else {
      await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, false)
          .then(({ data }) => {
            this.items = [data]
            const exist = this.productList.find(e => e.id === data.productId)
            if (!exist) {
              crudAndListService.getById('price/product', data.productId).then(({ data }) => {
                this.productList.push(data)
              })
            }
          })
          .catch(e => {
            console.log(e)
          })
    }
    this.fetchProducts()
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