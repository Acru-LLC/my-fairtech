<script>
import Layout from "@/router/layouts/main";

/**
 * Dashboard Component
 */
export default {
  components: {
    Layout,
    // PageHeader,
  },
  data() {
    return {
      items: [
        { title: 'Box 1', /* other properties if needed */ },
        { title: 'Box 2', /* other properties if needed */ },
        { title: 'Box 3', /* other properties if needed */ },
        // Add more items as needed
      ],
      selectedItem: null,
    };
  },
  /*
  COMPUTED */
  computed: {},
  /*
  METHODS */
  methods: {
    openNewComponent(index) {
      // Handle click event for a specific box
      // You can customize this method based on your requirements
      this.selectedItem = this.items[index];
    },
  },
  mounted() {},
  /*
  WATCH */
  watch: {}
};
</script>

<template>
  <Layout>
  <b-row class="p-3">
    <b-col v-for="(item, index) in items" :key="index" @click="openNewComponent(index)" cols="12" sm="6" lg="4" class="frame-hover">
    <div class="box-style">
      {{$t('interactive_services.check_appeal.title')}}
    </div>
    </b-col>
    <b-col cols="12" sm="6" lg="4" class="frame-hover">
    <div class="box-style">
      {{$t('interactive_services.check_appeal.title')}}
    </div>
    </b-col>
    <b-col cols="12" sm="6" lg="4" class="frame-hover">
    <div class="box-style">
      {{$t('interactive_services.check_appeal.title')}}
    </div>
    </b-col>
  </b-row>
    <div v-if="selectedItem" class="col-12 mt-4">
      <div class="text-center">
        <h4 class="font-weight-bold d-inline-block mb-4" style="color: #226358; width: 530px">
          {{ $t('pharm_check_sms.main_title') }}
        </h4>
      </div>
      <h1>Hello World</h1>
    </div>
  </Layout>
</template>
<style>
.box-style {
  width: 100%;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px solid #029984;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.4s ease;

  .box-title-style {
    padding: 20px;
    font-size: 21px;
    font-weight: 700;
    color: #029984;
    text-align: center;
    transition: all 0.4s ease;
  }
}
.frame-hover {
  padding: 15px;
  margin: 5px 0px 10px 0;
  border-width: 10px;
  border-style: solid;
  border-radius: 10px;
  border-color: transparent;
  transition: all 0.4s ease;
}
.frame-hover:hover {
  border-width: 10px;
  border-style: solid;
  border-color: #029984;
}

.frame-hover:hover .box-style {
  border: 3px solid #029984;
  box-shadow: 0 0 13px #029984
}

.frame-hover:hover .box-title-style {
  color: #2c675b;

}
</style>
