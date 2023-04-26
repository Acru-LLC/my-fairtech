<script>
// import Layout from "@/router/views/dashboards/default";
// import PageHeader from "@/components/page-header";

/**
 * Products-order component
 */

import TableColumns from "../columns/components/for templates/table";
import TableRows from "../rows/components/table";
import TableTemplate from "./table/table";
import Service from "../reportService";
// import { getName } from "@/helper";
import Create from "./components/addUpdate";

export default {
  components: {
    // Layout,
    // PageHeader,
    TableColumns,
    TableRows,
    TableTemplate,
    Create,
  },
  watch: {
    isSidebarColumns: {
      handler(v) {
        if (v) {
          this.getListColumns();
        }
      },
    },

    isSidebarRows: {
      handler(v) {
        if (v) {
          this.getListRows();
        }
      },
    },

    searchValueColumns: {
      handler() {
        this.getListColumns();
      },
    },

    searchValueRows: {
      handler() {
        this.getListRows();
      },
    },
  },
  data() {
    return {
      title: this.$t("createReportTemplate"),
      items: [
        {
          text: this.$t("Hisobotlar"),
          href: "/",
        },
        {
          text: this.$t("reportTemplates"),
          href: "/report/templates",
        },
        {
          text: this.$t("createReportTemplate"),
          active: true,
        },
      ],
      isGenerated: false,
      // getName: getName,
      isSidebarColumns: false,
      limitColumns: 20,
      pageColumns: 1,
      totalColumns: 0,
      listColumns: [],
      loadingColumns: false,
      searchValueColumns: "",
      secondSelectedColumns: [],
      selectedColumns: [],
      isSidebarRows: false,
      limitRows: 20,
      pageRows: 1,
      totalRows: 0,
      listRows: [],
      loadingRows: false,
      searchValueRows: "",
      firstColumns: [],
      secondColumns: [],
      selectedRows: [],
      oldSelectedRows: [],
      thirdColumns: [],
      thirdTrIdData: [],
      loader: false,
      saveModal: false,
      mode: "create",
    };
  },
  computed: {
    paramsRows() {
      return {
        params: {
          limit: this.limitRows,
          page: this.pageRows - 1,
        },
        search: this.searchValueRows,
      };
    },
    paramsColumns() {
      return {
        params: {
          limit: this.limitColumns,
          page: this.pageColumns - 1,
        },
        search: this.searchValueColumns,
      };
    },
  },
  methods: {
    isGeneratedChanged($event) {
      if ($event) {
        this.oldSelectedRows = JSON.parse(JSON.stringify(this.selectedRows))
        this.selectedRows = []
      } else {
        this.selectedRows = JSON.parse(JSON.stringify(this.oldSelectedRows))
      }
      console.log(this.selectedRows)
    },
    changePageRow() {
      this.getListRows();
    },
    changePageColumn() {
      this.getListColumns();
    },
    saveTableModal() {
      this.saveModal = true;
    },
    checkAndReturnIsGathered(cols) {
      for (let i = 0; i < cols.length; i++) {
        const element = cols[i];
        if (element.children && element.children.length) {
          this.checkAndReturnIsGathered(element.children)
        } else {
          if (element.typeCode != 'BIGDECIMAL') {
            return false
          }
        }
      }
      return true
    },
    //create
    create() {
      this.$refs.addRef.form.isGathered = this.checkAndReturnIsGathered(this.selectedColumns)
      this.$refs.addRef.form.isGenerated = this.isGenerated

      let columnObjects = this.selectedColumns.map((el, index) => {
        return {
          id: el.id,
          index: index,
          isVertical: el.isVertical === 1 ? 1 : 0
        };
      });

      let rowObjects = this.selectedRows.map((el, index) => {
        return {
          id: el.id,
          index: index,
        };
      });
      this.loader = true;
      if (!this.$refs.addRef.form.generateType || !this.isGenerated) {
        this.$refs.addRef.form.generateType = 'OTHER'
      }
      Service.saveTable(
          this.$refs.addRef.form,
          this.selectedColumns,
          this.selectedRows,
          columnObjects,
          rowObjects
      )
          .then((rs) => {
            if (rs.data) {
              this.successSaved();
              this.$router.push("/report/templates");
            }
          })
          .catch((err) => {
            // this.catchErr(err);
          })
          .finally(() => {
            this.loader = false;
          });
    },
    update() {
      this.loader = true;
      if (!this.$refs.addRef.form.generateType || !this.isGenerated) {
        this.$refs.addRef.form.generateType = 'OTHER'
      }
      Service.updateRow(this.$refs.addRef.form)
          .then((rs) => {
            if (rs.data) {
              this.successCreateAndEdit();
            }
          })
          .catch((err) => {
            // this.catchErr(err);
          })
          .finally(() => {
            this.loader = false;
          });
    },

    okModal(b) {
      b.preventDefault();
      if (!this.$refs.addRef.checkValidity()) {
        if (this.mode === "create") {
          this.create();
        } else {
          this.update();
        }
      } else {
        this.enterInfo();
      }
    },

    setColumns(v) {
      this.selectedColumns = []
      this.selectedColumns = v;
      this.firstColumns = [];
      this.secondColumns = [];
      this.thirdColumns = [];
      v.forEach((el1) => {
        let isVerticalOfEl1 = el1.isVertical
        this.$set(el1, 'isVertical', isVerticalOfEl1)
        this.firstColumns.push(el1);
        el1.children.forEach((el2) => {
          el2.isVertical = el1.isVertical
          this.secondColumns.push(el2);
          el2.children.forEach((el3) => {
            el3.isVertical = el1.isVertical
            this.thirdColumns.push({...el3, fId: el1.id});
          });
        });
      });
      setTimeout(() => {
        this.thirdTrIdData = Array.prototype.slice.call(
            document.getElementsByClassName("thirdTrId")
        );
      }, 300);
    },
    setRow(v) {
      this.selectedRows = v;
      // this.$refs.refTable.setRows(v)
    },
    getListRows() {
      this.loadingRows = true;
      Service.getListRow(this.paramsRows)
          .then((rs) => {
            this.listRows = rs.data.list;
            this.totalRows = rs.data.total;
          })
          .catch((e) => {
            // this.catchErr(e);
          })
          .finally(() => {
            this.loadingRows = false;
          });
    },
    getListColumns() {
      this.loadingColumns = true;
      Service.getListColumnWithChildren(this.paramsColumns)
          .then((rs) => {
            this.listColumns = rs.data.list;
            this.totalColumns = rs.data.total;
          })
          .catch((e) => {
            // this.catchErr(e);
          })
          .finally(() => {
            this.loadingColumns = false;
          });
    },
    addRows() {
      this.isSidebarRows = true;
      setTimeout(() => {
        this.$refs.tableRefRow.reset(this.selectedRows);
      }, 300);
    },
    addColumns() {
      this.isSidebarColumns = true;
      setTimeout(() => {
        this.$refs.tableRefColumn.reset(this.selectedColumns);
      }, 300);
    },

    rowspanFirst(el) {
      return el.children.length > 0
          ? 1
          : el.children.length > 0 && this.thirdColumns.length > 0
              ? 3
              : 3;
    },
    colspanFirst(el) {
      let found = this.thirdColumns.filter((i) => i.fId === el.id);
      let totalNotChild = el.children.filter((d) => d.children.length == 0);
      return el.children.length > 0 && found.length == 0
          ? el.children.length
          : el.children.length > 0 && found.length > 0
              ? totalNotChild.length + found.length
              : 1;
    },

    rowspanSecond(el) {
      return el.children.length == 0 && this.thirdColumns.length == 0
          ? 1
          : el.children.length == 0 && this.thirdColumns.length > 0
              ? 2
              : 1;
    },
    colspanSecond(el) {
      return el.children.length > 0 ? el.children.length : 1;
    },
    rowspanFirstClass(el) {
      return el.children.length > 0
          ? ""
          : el.children.length > 0 && this.thirdColumns.length > 0
              ? "thirdTrId"
              : "thirdTrId";
    },
    rowspanSecondClass(el) {
      return el.children.length == 0 && this.thirdColumns.length == 0
          ? "thirdTrId"
          : el.children.length == 0 && this.thirdColumns.length > 0
              ? "thirdTrId"
              : "";
    },
  },
};
</script>

<template>
  <div>
    <div>
      <!-- saveModal -->
      <b-modal
          :cancel-variant="'outline-danger'"
          :ok-variant="'success'"
          :no-close-on-backdrop="true"
          :ok-title="$t('actions.save')"
          :cancel-title="$t('actions.cancel')"
          @close="saveModal = false"
          @cancel="saveModal = false"
          @ok="okModal"
          size="md"
          v-model="saveModal"
          :title="$t('actions.add')"
      >
        <Create :isGenerated='isGenerated' ref="addRef"/>

        <template v-slot:modal-footer>
          <b-button variant="secondary" @click="saveModal = false" >
            {{$t("actions.close")}}
          </b-button>
          <b-overlay
              :opacity="0.1"
              :show="loader"
              rounded="sm"
          >
            <b-button variant="success" @click="okModal" >
              {{$t("actions.save")}}
            </b-button>
          </b-overlay>
        </template>
      </b-modal>
      <!-- columns list for select -->
      <b-modal
          size="xl"
          footer-bg-variant="light"
          header-bg-variant="light"
          v-model="isSidebarColumns"
          scrollable
      >
        <template v-slot:modal-header>
          <div
              class="d-flex align-items-center justify-content-center"
              style="width: 100%"
          >
            <b-input-group style="width: 300px">
              <b-form-input
                  size="md"
                  v-model="searchValueColumns"
                  :placeholder="`${$t('reportColumn')}`"
                  type="search"
              ></b-form-input>
              <b-input-group-append>
                <b-button size variant="outline-primary" >
                  <i class="fa fa-search"></i>
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
        </template>
        <template v-slot:modal-footer>
          <b-button variant="secondary" @click="isSidebarColumns = false" >
            {{$t("actions.close")}}
          </b-button>
        </template>
        <div>
          <TableColumns
              @changePage="changePageColumn"
              @setColumns="setColumns"
              :page="pageColumns"
              :limit="limitColumns"
              ref="tableRefColumn"
              :list="listColumns"
              :loading="loadingColumns"
              :sidebar="true"
          >
            <template v-slot:thead>
              <tr>
                <th class="text-center" style="width: 5% !important" >
                  №
                </th>
                <th style="width: 80% !important">
                  <div class="pl-2">
                    {{ $t("submodules.templates_row.nm") }}
                  </div>
                </th>
                <th style="width: 30% " class="text-center">{{ $t("column.comment") }}</th>
                <th class="text-center" style="width: 5% !important" >
                  {{ $t('column.status') }}
                </th>
              </tr>
            </template>
            <template v-slot:pagination>
              <div class="row" v-if="listColumns.length > 0" >
                <div class="col-lg-12">
                  <b-pagination
                      size="sm"
                      class="m-0"
                      :total-rows="totalColumns"
                      :per-page="limitColumns"
                      v-model="pageColumns"
                  />
                </div>
              </div>
            </template>
          </TableColumns>
        </div>
      </b-modal>
      <!-- end -->

      <!-- rows list for select -->
      <b-modal
          size="xl"
          footer-bg-variant="light"
          header-bg-variant="light"
          scrollable
          v-model="isSidebarRows"
      >
        <template v-slot:modal-header>
          <div
              class="d-flex align-items-center justify-content-center"
              style="width: 100%"
          >
            <b-input-group style="max-width: 300px">
              <b-form-input
                  size="md"
                  v-model="searchValueRows"
                  :placeholder="`${$t('reportRows')}`"
                  type="search"
              ></b-form-input>
              <b-input-group-append>
                <b-button
                    size
                    variant="outline-primary"
                >
                  <i class="fa fa-search"></i>
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
        </template>
        <template v-slot:modal-footer>
          <b-button
              variant="secondary"
              @click="isSidebarRows = false"
          >{{
              $t("actions.close")
            }}
          </b-button>
        </template>
        <div class="p-2 table-reponsive">
          <TableRows
              :sidebar="true"
              @changePage="changePageRow"
              :page="pageRows"
              :limit="limitRows"
              ref="tableRefRow"
              :list="listRows"
              :loading="loadingRows"
              @setRow="setRow"
          >
            <template v-slot:thead>
              <tr>
                <th
                    class="text-center"
                    style="width: 5% !important"
                >№
                </th>
                <th>{{ $t("submodules.templates_row.nm") }}</th>
              </tr>
            </template>
            <template v-slot:pagination>
              <div
                  class="row"
                  v-if="listRows.length > 0"
              >
                <div class="col-lg-12">
                  <b-pagination
                      size="sm"
                      class="m-0"
                      :total-rows="totalRows"
                      :per-page="limitRows"
                      v-model="pageRows"
                  />
                </div>
              </div>
            </template>
          </TableRows>
        </div>
      </b-modal>
      <!-- end -->

      <!-- <PageHeader :title="title" :items="items" /> -->
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="mr-2 d-inline-block">
                    <Back :to="`/report/templates`"/>
                  </div>
                </div>
                <!-- <div class="col-sm-4">

                </div> -->
                <div class="col-sm-8">
                  <div class="d-flex align-items-center justify-content-end">
                    <div class="mr-2 d-flex w-100 h-100 align-items-center justify-content-end"
                         v-if="$can('create', 'auto-generated-doctable')">
                      <label
                          class="mb-0 mr-2 mt-2"
                          for="isGenerated"
                      >{{ `${$t("auto_generate_info")}` }}</label>
                      <b-form-checkbox
                          class=""
                          switch
                          @change="isGeneratedChanged"
                          id="isGenerated"
                          size="lg"
                          v-model="isGenerated"
                          :value="true"
                          :unchecked-value="false"
                      ></b-form-checkbox>
                    </div>
                    <b-button-group style="width: 60%;">
                      <b-button
                          @click.prevent="addColumns"
                          type="button"
                          class="d-flex align-items-center"
                          variant="outline-primary"
                      >
                        <i class="bx bx-columns mr-1"></i>
                        {{ $t("selectColumns") }}
                      </b-button>
                      <b-button
                          @click.prevent="addRows"
                          :disabled="isGenerated"
                          type="button"
                          class="d-flex align-items-center"
                          variant="outline-primary"
                      >
                        <i class="bx bx-table mr-1"></i>
                        {{ $t("selectRows") }}
                      </b-button>

                      <b-button
                          :disabled="selectedColumns.length == 0"
                          @click.prevent="saveTableModal"
                          type="button"
                          class="d-flex align-items-center"
                          variant="success"
                      >
                        <i class="bx bx-save mr-1"></i>
                        {{ $t("actions.save") }}
                      </b-button>
                    </b-button-group>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <div
              class="bg-white p-3"
              style="min-height: 75vh"
          >

            <TableTemplate
                :listRows="selectedRows"
                ref="refTable"
                :thirdColumns="thirdTrIdData"
            >
              <template v-slot:thead>
                <tr class="tr-text-center">
                  <th
                      style="width: 3%"
                      :class="rowspanFirstClass(el, index)"
                      :rowspan="rowspanFirst(el)"
                      :colspan="colspanFirst(el)"
                      v-for="(el, index) in firstColumns"
                      :key="index + 'first'"
                  >
                    <div style="
                        max-height: 200px;
                          display: inline-block;
                        ">
                      <div
                          v-b-tooltip="{ variant: 'success' }"
                          :title="
                          getName({ nameLt: el.nameLt, nameRu: el.nameRu, nameUz: el.nameUz })
                        "
                          :class="  (el.isVertical == 1 )   ? 'rotate_text'  : ''
                        "
                      >
                        {{ getName({nameLt: el.nameLt, nameRu: el.nameRu, nameUz: el.nameUz}) }}
                      </div>
                    </div>
                  </th>
                </tr>
                <tr class="tr-text-center">
                  <th
                      style="width: 3%"
                      :class="rowspanSecondClass(el)"
                      :rowspan="rowspanSecond(el)"
                      :colspan="colspanSecond(el)"
                      v-for="(el, index) in secondColumns"
                      :key="index + 'second'"
                  >
                    <div style="
                        position: relative;
                        display: inline-block;
                        cursor: pointer;
                      ">
                      <div
                          v-b-tooltip="{ variant: 'success' }"
                          :title="
                          getName({ nameLt: el.nameLt, nameRu: el.nameRu, nameUz: el.nameUz })
                        "
                          :class="(el.isVertical == 1 )  ? 'rotate_text' : ''"
                          style="max-height: 150px"
                      >
                        {{ getName({nameLt: el.nameLt, nameRu: el.nameRu, nameUz: el.nameUz}) }}
                      </div>
                    </div>
                  </th>
                </tr>

                <tr class="tr-text-center">
                  <th
                      style="width: 3%"
                      class="thirdTrId"
                      :colspan="el.children.length > 0 ? el.children.length : 1"
                      v-for="(el, index) in thirdColumns"
                      :key="index + 'third'"
                  >
                    <div
                        style="
                            max-height: 200px;
                            position: relative;
                            display: inline-block;
                            cursor: pointer;
                          "
                    >

                      <div
                          v-b-tooltip="{ variant: 'success' }"
                          :title="
                          getName({ nameLt: el.nameLt, nameRu: el.nameRu, nameUz: el.nameUz })
                        "
                          :class="(el.isVertical == 1 )  ? 'rotate_text' : ''"
                      >
                        {{ getName({nameLt: el.nameLt, nameRu: el.nameRu, nameUz: el.nameUz}) }}
                      </div>
                    </div>
                  </th>
                </tr>
                <tr class="tr-text-center">
                  <td
                      v-for="(item, index) of thirdTrIdData"
                      :key="index + 'I-1'"
                  >
                    <strong v-if="selectedRows.length > 1">{{
                        selectedRows.length > 1 && index == 0 ? "" : index
                      }}</strong>

                    <strong v-else>{{ index + 1 }}</strong>
                  </td>
                </tr>
              </template>
            </TableTemplate>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.rotate_text {
  height: 100%;
  word-break: normal;
  writing-mode: vertical-rl;
  -ms-writing-mode: vertical-lr;
  -webkit-transform: rotate(-180deg);
  -moz-transform: rotate(-180deg);
  -o-transform: rotate(-180deg);
  transform: rotate(-180deg);
  padding-bottom: 20px !important;
  padding-top: 20px !important;
}
</style>

