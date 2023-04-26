<template>
  <div class="row">
    <div class="col-12">
      <div class="col-md-12 text-center">
        <div class="h4 mb-4 d-inline-block">{{ $t('submodules.integration.soliq_info.fullTitle') }}</div>
      </div>
      <div class="card">
        <div>
          <b-card no-body>
            <b-tabs pills card vertical nav-wrapper-class="w-25">
              <!--              dsq info 1        -->
              <b-tab :title="$t('submodules.integration.soliq_info.methods.1')" active>
                <b-card-text>
                  <DSQ1></DSQ1>
                </b-card-text>
              </b-tab>
              <!--              dsq info 2        -->
              <b-tab :title="$t('submodules.integration.soliq_info.methods.2')">
                <b-card-text>
                  <DSQ2></DSQ2>
                </b-card-text>
              </b-tab>
              <!--              dsq info 3        -->
              <b-tab :title="$t('submodules.integration.soliq_info.methods.3')">
                <b-card-text>
                  <DSQ3></DSQ3>
                </b-card-text>
              </b-tab>
              <!--              dsq info 4        -->
              <b-tab :title="$t('submodules.integration.soliq_info.methods.4')">
                <b-card-text>
                  <DSQ4></DSQ4>
                </b-card-text>
              </b-tab>
              <!--              dsq info 5        -->
              <b-tab :title="$t('submodules.integration.soliq_info.methods.5')">
                <b-card-text>
                  <DSQ5></DSQ5>
                </b-card-text>
              </b-tab>
              <!--              dsq info 6        -->
              <b-tab :title="$t('submodules.integration.soliq_info.methods.6')">
                <b-card-text>
                  <DSQ6></DSQ6>
                </b-card-text>
              </b-tab>
              <!--              dsq info 7        -->
              <b-tab :title="$t('submodules.integration.soliq_info.methods.7')">
                <b-card-text>
                  <DSQ7></DSQ7>
                </b-card-text>
              </b-tab>
            </b-tabs>
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
import DSQ1 from './DSQ-methods/DSQ-methods1/DSQ-methods1'
import DSQ2 from './DSQ-methods/DSQ-methods2/DSQ-methods2'
import DSQ3 from './DSQ-methods/DSQ-methods3/DSQ-methods3'
import DSQ4 from './DSQ-methods/DSQ-methods4/DSQ-methods4'
import DSQ5 from './DSQ-methods/DSQ-methods5/DSQ-methods5'
import DSQ6 from './DSQ-methods/DSQ-methods6/DSQ-methods6'
import DSQ7 from './DSQ-methods/DSQ-methods7/DSQ-methods7'

export default {
  components: {
    DSQ1,
    DSQ2,
    DSQ3,
    DSQ4,
    DSQ5,
    DSQ6,
    DSQ7,

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
    this.fetchTableItems()
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