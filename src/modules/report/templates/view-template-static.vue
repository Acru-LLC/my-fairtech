<template>
  <div>
    <div>
      <!-- <PageHeader :title="title" :items="items" /> -->
      <b-card v-if="$route.params.name == '2B_shakl'">
        <Shakl2B />
        <Back :to="`/report/templates?page=static`" />
      </b-card>

      <b-card v-else-if="$route.params.name == '17_shakl'">
        <Shakl17 />
        <Back :to="`/report/templates?page=static`" />
      </b-card>

      <b-card v-else-if="$route.params.name == '5A_shakl'">
        <Shakl5A />
        <Back :to="`/report/templates?page=static`" />
      </b-card>

      <b-card v-else-if="$route.params.name == '5_shakl'">
        <Shakl5 />
        <Back :to="`/report/templates?page=static`" />
      </b-card>

      <b-card v-else-if="$route.params.name == '2Б_shakl'">
        <Shakl2BB />
        <Back :to="`/report/templates?page=static`" />
      </b-card>
      <b-card v-else-if="$route.params.name == '16_shakl'">
        <Shakl16 />
        <Back :to="`/report/templates?page=static`" />
      </b-card>

      <b-card v-else-if="$route.params.name == '16A_shakl'">
        <Shakl16A />
        <Back :to="`/report/templates?page=static`" />
      </b-card>


       <b-card v-else-if="$route.params.name == '16Б_shakl'">
        <Shakl16B />
        <Back :to="`/report/templates?page=static`" />
      </b-card>
    </div>
  </div>
</template>

<script>
import Shakl2B from "../static/view/2-shakl.vue";

// import Layout from "@/router/views/dashboards/default";
// import PageHeader from "@/components/page-header";
import Shakl5A from "../static/view/5-A-shakl.vue";
import Shakl17 from "../static/view/17-shakl.vue";
import Shakl5 from "../static/view/5shakl.vue";
import Shakl2BB from "../static/view/2-shaklБ.vue";
import Shakl16 from "../static/view/16-shakl.vue";

import Shakl16A from "../static/view/16A-shakl.vue";

import Shakl16B from "../static/view/16Б-shakl.vue";
export default {
  data() {
    return {
      title: this.$t("actions.view"),
      items: [
        {
          text: this.$t("Hisobotlar"),
          href: "/",
        },
        {
          text: this.$t("actions.view"),
          active: true,
        },
      ],
    };
  },
  components: {
    Shakl2B,
    Shakl5A,
    Shakl17,
    Shakl5,
    Shakl2BB,
    Shakl16,
    Shakl16A,
    Shakl16B,
    // Layout,
    // PageHeader,
  },
};
</script>

<style>
</style>
