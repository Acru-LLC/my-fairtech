<template>
  <div class="row">
    <div class="col-12">
        <div class="col-md-12 text-sm-start">
            <b-button class="btn btn-warning" size="md" @click="$router.push({name: 'IntegrationMenuIndex'})">
                {{ $t("actions.back") }}
            </b-button>
        </div>
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.integration.osimlik_info.fullTitle') }}</div>
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
      json_fields: {
        'ID': 'id',
        [this.$t('submodules.integration.statistics_info.saoto_name')]: 'saoto_name',
        [this.$t('submodules.integration.statistics_info.saoto')]: 'saoto',
        [this.$t('submodules.integration.statistics_info.tovar')]: 'tovar',
        [this.$t('submodules.integration.statistics_info.price')]: 'price',
        [this.$t('submodules.integration.statistics_info.code_tovar')]: 'code_tovar',
        [this.$t('submodules.integration.statistics_info.date_inter')]: 'date_inter',

        [this.$t('submodules.integration.statistics_info.siis_view_created_at')]: 'siis_view_created_at',
      },
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
      tableFields: [
        {
          label: "#",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false,
          key: "index",
        },
        {label: this.$t('submodules.integration.statistics_info.saoto_name'), key: "saoto_name"},
        {label: this.$t('submodules.integration.statistics_info.soato'), key: "saoto"},
        {label: this.$t('submodules.integration.statistics_info.tovar'), key: "tovar"},
        {label: this.$t('submodules.integration.statistics_info.price'), key: "price"},
        {label: this.$t('submodules.integration.statistics_info.code_tovar'), key: "code_tovar"},
        {label: this.$t('submodules.integration.statistics_info.date_inter'), key: "date_inter"},
        {label: this.$t('submodules.integration.statistics_info.siis_view_created_at'), key: "siis_view_created_at"},
        {
          label: this.$t('column.actions'),
          key: "actions",
          thClass: "text-center",
          tdClass: "text-center",
          sortable: false
        },
      ],
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