<template>
  <div>
    <Treeselect
      :multiple="true"
      :normalizer="nrm"
      :class="
        submitted && !selectedYuridik.length ? 'tr_select_red' : 'tr_select'
      "
      :key="'sdad'"
      :options="allYuridik"
      :placeholder="$t('yuridikDep')"
      v-model="selectedYuridik"
    />
  </div>
</template>

<script>
import { nrm } from "@/helper";
import Treeselect from "@riophae/vue-treeselect";

// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import Service from "../../reportService";
export default {
  components: {
    Treeselect,
  },
  data() {
    return {
      allYuridik: [],
      nrm: nrm,
      selectedYuridik: [],
      submitted: false,
    };
  },
  created() {
    this.getAllYuridik();
  },
  methods: {
    getByDepartments(id) {
      Service.getByDepartments(id).then((res) => {
        this.selectedYuridik = res.data.map(e => e.id);
      });
    },
    getAllYuridik() {
      Service.getAllYuridik()
        .then((rs) => {
          this.allYuridik = rs.data;
        })
        .catch((err) => {
          // this.catchErr(err);
        });
    },
  },
};
</script>

<style>
</style>