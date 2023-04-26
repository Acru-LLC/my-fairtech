<template>
  <div class="row">
    <div class="col-12">
        <div class="col-md-12 text-sm-start">
            <b-button class="btn btn-warning" size="md" @click="$router.push({name: 'IntegrationMenuIndex'})">
                {{ $t("actions.back") }}
            </b-button>
        </div>
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.integration.hududgaz_info.fullTitle') }}</div>
      </div>
      <div class="mb-4">
          <b-card-group deck>
              <b-card @click="$router.push({name: 'IntegrationHududgazInfo1Index'})" style="cursor: pointer; height: 50px"
                      bg-variant="primary" text-variant="white" no-header class="text-center">
                  <b-card-text>{{ $t('submodules.integration.hududgaz_info.method_1') }}</b-card-text>
              </b-card>

              <b-card @click="$router.push({name: 'IntegrationHududgazInfo2Index'})" style="cursor: pointer; height: 50px"
                      bg-variant="warning" text-variant="white" class="text-center">
                  <b-card-text>{{ $t('submodules.integration.hududgaz_info.method_2') }}</b-card-text>
              </b-card>

              <b-card @click="$router.push({name: 'IntegrationHududgazInfo3Index'})" style="cursor: pointer; height: 50px"
                      bg-variant="success" text-variant="white" class="text-center">
                  <b-card-text>{{ $t('submodules.integration.hududgaz_info.method_3') }}</b-card-text>
              </b-card>

              <b-card @click="$router.push({name: 'IntegrationHududgazInfo4Index'})" style="cursor: pointer; height: 50px"
                      bg-variant="info" text-variant="white" class="text-center">
                  <b-card-text>{{ $t('submodules.integration.hududgaz_info.method_4') }}</b-card-text>
              </b-card>
          </b-card-group>
      </div>
      <div class="card">
        <div>
          <b-card no-body>

            <Info2></Info2>

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
import Info2 from './methods/methods2'

export default {
  components: {
    Info2
  },
  data() {
    return {
      loadingTableItems: false,

      json_data: [],
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      searchKeyword: '',
      selected: 20,
      optionsTable: [
        {value: 20, text: 20},
        {value: 50, text: 50},
        {value: 100, text: 100},
        {value: 150, text: 150},
        {value: 200, text: 200},
      ],
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