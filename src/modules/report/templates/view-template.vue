<script>
// import Layout from "@/router/views/dashboards/default";
// import PageHeader from "@/components/page-header";

import GeneratedColumnAndRows from "./components/generateColumnAndRow";
import {dec, cnf, g_label} from "@/helper";
import Service from "../reportService";

export default {
  components: {GeneratedColumnAndRows},
  data() {
    return {
      g_label: g_label,
      loader: false,
      selectedColumns: [],
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
      checkBoxDataB: [],

      checkBoxDataA: [],
      formulas: [],
      formulas_2: [],
      docTableFormulas: [], // Bahriddin ishlatgan
      listDepartments: [],
    };
  },

  async created() {
    await this.getById();
    await this.formulasByTableId();
    await this.getByDepartments();
    await this.formulasByTableId_2();
    await this.getDocTableFormulasList();
  },
  methods: {
    deleteFormula(id, type) {
      this.cnf().then((res) => {
        if (res.value) {
          Service.deleteFormula(id).then((res) => {
            this.deleteSuccess();
            if (type == "left") {
              this.formulasByTableId();
            } else {
              this.formulasByTableId_2();
            }
          });
        }
      });
    },
    success() {
      this.formulasByTableId_2();
    },
    openConf() {
      cnf().then((rs) => {
        if (rs.value) {
        }
      });
    },
    getByDepartments() {
      Service.getByDepartments(dec(this.$route.params.id)).then((res) => {
        this.listDepartments = res.data;
      });
    },
    saveFormula() {
      this.loader = true;
      let payload = {
        f1: this.checkBoxDataA,
        f2: this.checkBoxDataB,
      };
      Service.saveFormula(payload, dec(this.$route.params.id))
          .then((rs) => {
            if (rs.data) {
              this.successSaved();
              this.formulasByTableId();
              this.checkBoxDataB = [];
              this.checkBoxDataA = [];
              setTimeout(() => {
                this.$refs.viewRef.reset();
              }, 300);
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
    formulasByTableId_2() {
      Service.formulasByTableId_2(dec(this.$route.params.id))
          .then((rs) => {
            this.formulas_2 = rs.data;
          })
          .catch((e) => {});
    },
    formulasByTableId() {
      Service.formulasByTableId(dec(this.$route.params.id))
          .then((rs) => {
            this.formulas = rs.data;
          })
          .catch((e) => {});
    },
    getDocTableFormulasList() {
      Service.getDocTableFormulasList(dec(this.$route.params.id))
          .then((rs) => {
            let list = {};
            const length = rs.data.length;
            for (let i = 0; i < length; i++) {
              if (typeof list[rs.data[i].targetColumnId] === "undefined") {
                list[rs.data[i].targetColumnId] = [];
              }
              list[rs.data[i].targetColumnId].push(rs.data[i]);
            }
            this.docTableFormulas = list;
          })
          .catch((e) => {
            console.log(e);
          });
    },
    deleteDocTableFormulas(docTableId, targetDocColumnId) {
      this.cnf().then((res) => {
        if (res.value) {
          Service.deleteDocTableFormulas(docTableId, targetDocColumnId).then(() => {
            this.deleteSuccess();
            this.getDocTableFormulasList();
          });
        }
      });
    },
    getById() {
      setTimeout(() => {
        this.$refs.viewRef.getById(dec(this.$route.params.id));
      }, 300);
    },
  },
  computed: {
    renderDocTabFormulasList() {
      let result = [];
      for (let key in this.docTableFormulas) {
        let targetColumn;
        let docTableId;
        let list = this.docTableFormulas[key].map(item => {
          targetColumn = item.targetColumn !== targetColumn ? item.targetColumn : targetColumn;
          docTableId = item.docTableId !== docTableId ? item.docTableId : docTableId;
          return item.code;
        });
        result.push({
          id: key,
          docTableId: docTableId,
          target: targetColumn,
          list: list.join(" "),
        });
      }
      return result
    },
  },
};
</script>

<template>
  <div>
    <div>
      <!-- <PageHeader
          :title="title"
          :items="items"
      /> -->

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row mb-2">
                <div class="col-lg-12">
                  <GeneratedColumnAndRows
                      @success="success"
                      @getDocTableFormulasList="getDocTableFormulasList"
                      @changeCheckboxDataB="changeCheckboxDataB"
                      @changeCheckboxDataA="changeCheckboxDataA"
                      ref="viewRef"
                  >

                    <!--                                      COMMENT QILIB QO"YILDI FORMULALAR. SHABLONNI KO'RISHNI OCHIB.-->
                    <template v-slot:save>
                      <b-button
                          :disabled="
                        !checkBoxDataB.length > 0 || !checkBoxDataA.length > 0
                      "
                          variant="success"
                          @click.prevent="saveFormula"
                      >
                        <b-overlay
                            :opacity="0.1"
                            :show="loader"
                            rounded="sm"
                        >
                          <div class="
                            d-flex
                            align-items-center
                            justify-content-center
                          ">
                            <i class="bx bx-save font-size-18 mr-2"></i>
                            {{ $t("actions.save") }}
                          </div>
                        </b-overlay>
                      </b-button>
                    </template>

                    <template v-slot:formulaFloat>
                      <div class="row">
                        <div class="col-lg-12">
                          <h5 class="mb-4">{{ $t("conditionTable") }}</h5>

                          <div class="d-flex align-items-center">
                            <div>
                              <p
                                  v-for="(formula, index) in formulas"
                                  :key="index + 'f-1-f-2'"
                              >

                              <ul class="list-unstyled">
                                <li class="mb-1 hov-li-formula">
                                  <div class="d-flex align-items-center">
                                    <div>

                                <span class="pre text-success ">
                                   {{
                                    formula.f1Cols.map(e => e[g_label('nameRu', 'nameUz', 'nameLt')]).join(" , ")
                                  }}
                                 </span>
                                    </div>
                                    <strong class="mr-3 ml-3">
                                      ==
                                    </strong>

                                    <div>

                                    <span class="pre text-primary">
                                     {{
                                        formula.f2Cols.map(e => e[g_label('nameRu', 'nameUz', 'nameLt')]).join(" , ")
                                      }}
                                   </span>

                                    </div>
                                    <div>
                                      <b-button
                                          @click="deleteFormula(formula.id, 'left')"
                                          size="sm"
                                          class="mr-3 ml-3 trashFormulaCss"
                                          variant="light"
                                      >
                                        <i class="bx bx-trash"></i>
                                      </b-button>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <!-- {{ formula }} -->
                              </p>
                            </div>

                          </div>
                        </div>
                      </div>
                    </template>


                    <template v-slot:formulaRight>
                      <div class="row">
                        <div class="col-lg-12">
                          <h5 class="mb-4">{{ $t("selectSumColumnsLabel") }}</h5>

                          <div class="d-flex align-items-center">
                            <div>
                              <p
                                  v-for="(formula, index) in formulas_2"
                                  :key="index + 'f-1-f-2'"
                              >

                              <ul class="list-unstyled">
                                <li class="mb-1  hov-li-formula_2">

                                  <div class="d-flex align-items-center">
                                                                        <span class="pre text-warning">
                                                                            {{
                                                                            formula.f1Cols.map(e => e[g_label('nameRu', 'nameUz', 'nameLt')]).join(" , ")
                                                                          }} =
                                                                        </span>

                                    <span>
                                                                            {{
                                        formula.f2Cols.map(e => e[g_label('nameRu', 'nameUz', 'nameLt')]).join(" + ")
                                      }}
                                                                        </span>

                                    <div>
                                      <b-button
                                          @click="deleteFormula(formula.id, 'right')"
                                          size="sm"
                                          class="mr-3 ml-3 trashFormulaCss_2"
                                          variant="light"
                                      >
                                        <i class="bx bx-trash"></i>
                                      </b-button>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                              <!-- {{ formula }} -->
                              </p>
                            </div>

                          </div>
                        </div>
                      </div>
                    </template>

                    <template v-slot:formulasList>
                      <div class="row">
                        <div class="col-lg-12">
                          <h5 class="mb-4">{{ $t("submodules.doc_table_formulas.formula_form") }}</h5>
                        </div>
                        <div class="col-12">
                          <div v-for="(item, key) in renderDocTabFormulasList" :key="key">
                            <div class="d-flex align-items-center">
                              <ul class="list-unstyled">
                                <li class="mb-1  hov-li-formula_2">
                                  <div class="d-flex align-items-center">
                                      <span class="pre success">
                                        {{ getName(item.target)}}
                                      </span>
                                      &nbsp; = &nbsp;
                                      <span class="pre text-warning">
                                        {{ item.list }}
                                      </span>
                                      <b-button
                                          @click="deleteDocTableFormulas(item.docTableId, item.target.id)"
                                          size="sm"
                                          class="mr-3 ml-3 trashFormulaCss_2"
                                          variant="light"
                                      >
                                        <i class="bx bx-trash"></i>
                                      </b-button>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </GeneratedColumnAndRows>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-4">
                  <!--                                    <h5>{{ $t("template_departments") }}</h5>-->
                  <!-- <Back :to="'/report/templates'" /> -->
                </div>
                <div class="col-lg-8">
                  <div class="text-sm-right">

                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <ol class="mt-2 pl-3">
                    <li
                        class="p-2 lidep"
                        v-for="(item, index) in listDepartments"
                        :key="index + 'Departments'"
                    >
                      {{
                        getName({
                          nameRu: item.nameRu,
                          nameLt: item.nameLt,
                          nameUz: item.nameUz,
                        })
                      }}
                      <!-- <b-button
  @click="openConf"
  class="li-hide ml-2"
  size="sm"
  variant="light"
>
  <i class="bx bx-trash"></i>
</b-button> -->
                    </li>
                  </ol>
                  <Back :to="'/report/templates'"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.lidep:hover .li-hide {
  visibility: visible;
}

.lidep:hover {
  font-weight: bold;
  cursor: pointer;
}

.li-hide {
  visibility: hidden;
}

.hov-li-formula:hover .trashFormulaCss {
  visibility: visible;
}

.hov-li-formula:hover {
  font-weight: bold;
  cursor: pointer;
}

.trashFormulaCss {
  visibility: hidden;
}

.hov-li-formula_2:hover .trashFormulaCss_2 {
  visibility: visible;
}

.hov-li-formula_2:hover {
  font-weight: bold;
  cursor: pointer;
}

.trashFormulaCss_2 {
  visibility: hidden;
}
</style>
