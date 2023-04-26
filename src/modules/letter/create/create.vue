<script>
import Layout from "@/router/layouts/main";
import PageHeader from "@/components/page-header";

/**
 * Products-order component
 */

export default {
  components: { Layout, PageHeader },
  data() {
    return {
      title: this.$t("d.create"),
      items: [
        {
          text: this.$t("menu"),
          href: "/",
        },
        {
          text: this.$t("d.myDoc"),
          active: true,
        },
      ],
      list: [],
      searchValue: "",
      page: 1,
      limit: 20,
      total: 1,
      showModal: false,
      mode: "create",
      currentSort: "block",
      currentSortDir: "asc",
   
    };
  },
  computed: {
    params() {
      return {
        params: {
          limit: this.limit,
          page: this.page - 1,
        },
        search: this.searchValue,
      };
    },
  },

};
</script>

<template>
  <Layout>
    <div>
      <PageHeader :title="title" :items="items" />
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row mb-2">
                <div class="col-sm-4">
                  <div class="mr-2 mb-2 d-inline-block">
                    <!-- <b-input-group style="max-width: 450px">
                      <b-form-input
                        size="md"
                        v-model="searchValue"
                        :placeholder="`${$t('actions.filter')}`"
                        type="search"
                      ></b-form-input>
                      <b-input-group-append>
                        <b-button size variant="outline-primary">
                          <i class="fa fa-search"></i>
                        </b-button>
                      </b-input-group-append>
                    </b-input-group> -->
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="text-sm-right">
                    <b-button to="/office" target="_blank" type="button" variant="primary">
                      <i class="mdi mdi-plus mr-1"></i>
                      {{ $t("actions.add") }}
                    </b-button>
                  </div>
                </div>
                <div class="col-lg-12">
                  <div id="placeholder" style="height:100vh"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
