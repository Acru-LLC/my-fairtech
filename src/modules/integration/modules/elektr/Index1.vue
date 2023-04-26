<template>
  <div class="row">
    <div class="col-12">
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.integration.elektr_info.fullTitle') }}</div>
      </div>
      <div class="mb-4">
        <b-card-group deck>
          <b-card @click="$router.push({name: 'IntegrationElektrInfo1Index'})" style="cursor: pointer"
                  bg-variant="primary" text-variant="white" no-header class="text-center">
            <b-card-text>{{ $t('submodules.integration.elektr_info.method_1') }}</b-card-text>
          </b-card>

          <b-card @click="$router.push({name: 'IntegrationElektrInfo2Index'})" style="cursor: pointer"
                  bg-variant="warning" text-variant="white" class="text-center">
            <b-card-text>{{ $t('submodules.integration.elektr_info.method_2') }}</b-card-text>
          </b-card>
        </b-card-group>
      </div>
      <div class="card">
        <div>
          <b-card no-body>

            <Info></Info>

          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const MAIN_API_URL = '/'
const INTEGRATION_API_URL = '/statistics-info/deploy-information'
import crudAndListService from '@/shared/services/crud_and_list.service'
import Info from './methods/methods1/methods1'

export default {
  components: {
    Info
  },
  data() {
    return {
      loadingTableItems: false,
      json_data: [],
      searchKeyword: '',
      selected: 20,
      activeDep: {},
      tableItems: [],
      totalItems: 0,
      searchInterval: null,
    };
  },
  /*
  COMPUTED */
  computed: {
    numberOfPages() {
      return (!this.totalItems || this.totalItems <= 0 || this.totalItems < this.var_default_search_payload.itemsPerPage) ? 1 : this.totalItems / this.var_default_search_payload.itemsPerPage
    }
  },
  methods: {
    downloadExcel() {
      this.json_data = this.tableItems
    },
    selectList($event) {
      if ($event === 'all') {
        this.var_default_search_payload.itemsPerPage = this.totalItems
      } else {
        this.var_default_search_payload.itemsPerPage = $event
      }
      this.fetchTableItems();
    },
    fetchTableItems() {
      this.loadingTableItems = true
      this.var_default_search_payload.keyword = this.searchKeyword
      this.var_default_search_payload.sortDesc.push(false)
      crudAndListService.searchListWithKeyword(MAIN_API_URL, this.var_default_search_payload)
          .then((res) => {
            this.tableItems = res.data.list;
            this.totalItems = res.data.total;
          })
          .catch(e => {
            this.tableItems = [];
            this.totalItems = 0;
          })
          .finally(() => {
            this.loadingTableItems = false
          })
    },
    downloadAllInfo() {
      crudAndListService.downloadIntegrationData(INTEGRATION_API_URL)
          .then((res) => {
            setTimeout(() => {
              this.$toast(this.$t('submodules.integration.statistics_info.download_success'), {type: 'success'});
            }, 200);
          })
          .catch(e => {
            this.$toast(this.$t('submodules.integration.statistics_info.download_error'), {type: 'error'});
          })
          .finally(() => {
            this.fetchTableItems()
          })
    },
    changeSearchKeyword() {
      clearTimeout(this.searchInterval)
      this.searchInterval = setTimeout(() => {
        this.fetchTableItems()
      }, 500)
    },
    confirmItem(item) {
      this.$router.push({
        name: 'IntegrationStatisticsInfoConfirm',
        params: {
          id: item.id
        }
      })
    },
  },
  /* CREATED */
  created() {
    // this.fetchTableItems()
  },
  /* WATCH */
  watch: {
    'var_default_search_payload.page': {
      handler() {
        this.fetchTableItems()
      }
    }
  }
};
</script>

<style lang='scss' scoped>
</style>