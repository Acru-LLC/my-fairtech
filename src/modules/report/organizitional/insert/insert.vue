<script>
import Layout from "../@/router/views/dashboards/default";

import GeneratedColumnAndRows from "../components/generateColumnAndRow";
import { dec } from "@/helper";
import Service from "../../reportService";
export default {
  components: { Layout, GeneratedColumnAndRows },
  data() {
    return {
      loader: false,

      selectedColumns: [],

      checkBoxDataB: [],

      checkBoxDataA: [],
      formulas: [],
    };
  },
  async created() {
    await this.getById();
  },
  methods: {
    save() {
      this.loader = true;
      let { thirdTrIdData } = this.$refs.viewRef;
      let sendData = [];
      let payload = thirdTrIdData.map((e) => e.value);
      payload.forEach((e) => {
        e.forEach((d) => {
          sendData.push(d);
        });
      });
      Service.fillDocReport(sendData, dec(this.$route.query.reportId))
        .then((rs) => {
          if (rs.data) {
            this.successSaved();
            this.$router.push("/report/organizitional/create");
          }
        })
        .catch((e) => {})
        .finally(() => (this.loader = false));
    },
    changeCheckboxDataB(v) {
      this.checkBoxDataB = v;
    },
    changeCheckboxDataA(v) {
      this.checkBoxDataA = v;
    },

    getById() {
      setTimeout(() => {
        this.$refs.viewRef.getById(
          dec(this.$route.params.id),
          dec(this.$route.query.reportId)
        );
      }, 300);
    },
  },
};
</script>

<template>
  <Layout>
    <div>
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row mb-2">
                <div class="col-lg-12">
                  <GeneratedColumnAndRows
                    @changeCheckboxDataB="changeCheckboxDataB"
                    @changeCheckboxDataA="changeCheckboxDataA"
                    ref="viewRef"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 
      <div class="row" v-if="checkBoxData.length > 0">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-4"></div>
                <div class="col-lg-8">
                  <div class="text-sm-right"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-4">
                  <Back :to="'/report/organizitional/create'" />
                </div>
                <div class="col-lg-8">
                  <div class="text-sm-right">
                    <b-button variant="success" @click.prevent="save">
                      <b-overlay :opacity="0.1" :show="loader" rounded="sm">
                        <div
                          class="
                            d-flex
                            align-items-center
                            justify-content-center
                          "
                        >
                          <i class="bx bx-save font-size-18 mr-2"></i>
                          {{ $t("actions.save") }}
                        </div>
                      </b-overlay>
                    </b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
