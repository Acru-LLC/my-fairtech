<script>
import Service from "@/modules/report/reportService";
import { dec } from "@/helper";
import XLSX from 'xlsx';
export default {
  data() {
    return {
      // getName: getName,
      selectedColumns: [],
      selectedRows: [],

      firstColumns: [],
      secondColumns: [],
      thirdColumns: [],

      thirdTrIdData: [],
      loader: false,

      table: {},
      valueList: [],
      loaderExcel:false
    };
  },

  methods: {
    exportExcel() {
      let fileName = `Report`
      let table = document.getElementById("reportTableId")
      let wb = XLSX.utils.table_to_book(table, {sheet:"sheet1"})
      return XLSX.writeFile(wb, `${fileName}.xlsx`)
    },
    getById(id) {
      this.loader = true;
      Service.getByIdTable(id)
        .then((rs) => {
          if (rs.data) {
            this.setColumns(rs.data.columns);
            this.setRow(rs.data.rows);
            this.table = rs.data.table;
            this.getReportById();
          }
        })
        .catch((e) => {})
        .finally(() => (this.loader = false));
    },
    getReportById() {
      Service.getReportById(dec(this.$route.query.reportId))
        .then((rs2) => {
          this.valueList = rs2.data;
        })
        .catch((e) => {})
        .finally(() => (this.loader = false));
    },
    setColumns(v) {
      this.selectedColumns = v;
      this.firstColumns = [];
      this.secondColumns = [];
      this.thirdColumns = [];
      v.forEach((el1) => {
        this.firstColumns.push(el1);
        el1.children.forEach((el2) => {
          this.secondColumns.push(el2);
          el2.children.forEach((el3) => {
            this.thirdColumns.push({ ...el3, fId: el1.id });
          });
        });
      });

      setTimeout(() => {
        this.thirdTrIdData = Array.prototype.slice
          .call(document.getElementsByClassName("thirdTrId"))
          .map((e) => {
            let array = e.id.split(",");
            return {
              columnId: array[0],
              typeCode: array[1],
              rowId: null,
              value: null,
            };
          });
      }, 300);
    },
    setRow(v) {
      this.selectedRows = v;
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
      <div class="row">
        <div class="col-lg-12">
          <h5 class="text-center mb-1">
            <strong>
              {{ getName({ nameLt: table.titleLt,nameUz: table.titleUz, nameRu: table.titleRu }) }}
            </strong>
          </h5>
          <p class="text-center m-0">
            {{
              getName({
                nameLt: table.conditionLt,
                nameRu: table.conditionRu,
                nameUz: table.conditionUz
              })
            }}
          </p>
        </div>
        <div class="col-lg-12">
          <div class="float-left">
            <b-button variant="success" @click="exportExcel">
              <b-overlay :show="loaderExcel" opacity="0.1" rounded="sm">
                {{ $t("excel") }}
              </b-overlay>
            </b-button>
          </div>
          <div class="pr-3 float-right">
            <strong>
              {{ getName({ nameLt: table.nameLt, nameUz: table.nameUz, nameRu: table.nameRu }) }}
            </strong>
          </div>
        </div>
        <div class="col-lg-12">
          <b-overlay :opacity="0.1" :show="loader" rounded="sm">
            <div class="bg-white pl-3 pr-3 pt-1" style="min-height: 60vh">
              <div style="overflow: auto" class="pb-5">
                <table
                  id="reportTableId"
                  class="
                    table table-centered table-nowrap table-custom-bordered
                  "
                >
                  <thead>
                    <tr class="tr-text-center">
                      <th
                        :id="[el.id, el.typeCode]"
                        :class="rowspanFirstClass(el, index)"
                        :rowspan="rowspanFirst(el)"
                        :colspan="colspanFirst(el)"
                        v-for="(el, index) in firstColumns"
                        :key="index + 'first'"
                      >
                        <div
                          :class="
                            el.children.length > 0 || index == 0
                              ? ''
                              : 'rotate_text'
                          "
                        >
                          {{ getName({ nameLt: el.nameLt, nameUz: el.nameUz, nameRu: el.nameRu }) }}
                        </div>
                      </th>
                    </tr>
                    <tr class="tr-text-center">
                      <th
                        :id="[el.id, el.typeCode]"
                        :class="rowspanSecondClass(el)"
                        :rowspan="rowspanSecond(el)"
                        :colspan="colspanSecond(el)"
                        v-for="(el, index) in secondColumns"
                        :key="index + 'second'"
                      >
                        <div
                          :class="
                            el.children.length > 0 || index == 0
                              ? ''
                              : 'rotate_text'
                          "
                        >
                          {{ getName({ nameLt: el.nameLt,nameUz: el.nameUz, nameRu: el.nameRu }) }}
                        </div>
                      </th>
                    </tr>

                    <tr class="tr-text-center">
                      <th
                        :id="[el.id, el.typeCode]"
                        class="thirdTrId"
                        :colspan="
                          el.children.length > 0 ? el.children.length : 1
                        "
                        v-for="(el, index) in thirdColumns"
                        :key="index + 'third'"
                      >
                        <div :class="(el.isVertical == 1 )  ? 'rotate_text' : ''">
                          {{ getName({ nameLt: el.nameLt,nameUz: el.nameUz, nameRu: el.nameRu }) }}
                        </div>
                      </th>
                    </tr>

                    <tr class="tr-text-center">
                      <td></td>
                      <td
                        v-for="(item, index) of thirdTrIdData"
                        :key="index + 'I-1'"
                      >
                        <strong>
                          {{ index + 1 }}
                        </strong>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(data, index) in selectedRows"
                      :key="index + 'MM'"
                    >
                      <!-- <th>
                        {{ getName({ ...data }) }}
                      </th> -->

                      <td
                        v-for="(i, index) in valueList"
                        :key="index + 'td'"
                        class="text-center p"
                      >
                        {{ i.value }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </b-overlay>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.check {
  margin-top: 5px;
  .m-chckbox--container {
    margin: 0px !important;
    width: 22px !important;
  }
  label {
    margin: 0;
    display: none;
  }
}
</style>
<style lang="scss">
.rotate_text {
  writing-mode: vertical-lr;
  -webkit-writing-mode: vertical-lr;
  -ms-writing-mode: vertical-lr;
  -webkit-transform: rotate(-180deg);
  -moz-transform: rotate(-180deg);
  -o-transform: rotate(-180deg);
  transform: rotate(-180deg);
}
</style>
