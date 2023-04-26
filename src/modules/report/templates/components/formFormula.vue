<template>
  <b-col md="12">
    <hr>
    <b-row>
      <b-col md="6" class="mt-2">
        <b-form-select :options="targetSelectOptions" v-model="target">
          <b-form-select-option :value="null">
            {{ 'Выберите поле' }}
          </b-form-select-option>
        </b-form-select>
      </b-col>
      <b-col md="6" class="mt-2">
        <div
            v-for="(item, key) in formulaList"
            class="d-inline-block rounded-lg"
            :title="item.parentName"
            :class="item.type === types.ARGUMENTS ? 'border border-secondary p-1' : (
                item.type === types.OPERATORS ? 'p-1 my-1' : (
                    item.type === types.NUMBER ? 'bg-light-green border p-1' : 'btn-rounded bg-white p-1'
                )
            )"
            v-bind:key="key">
          <span class="text-dark">{{ item.name }}</span>
        </div>
        <div>
          <b-button @click="saveFormulas" variant="success" :disabled="isSaveFormulasDisabled">
            {{ $t("submodules.doc_table_formulas.save_formula") }}
          </b-button>
        </div>
      </b-col>
      <b-col md="6" class="my-2">
        <div class="text-center">
          <b-btn
              class="bg-secondary btn bg-white mx-1 bg-light-yellow"
              v-for="(item, key) in targetSelectOptions"
              v-bind:key="key"
              :title="item.parentName"
              @click="addArgument(item)">
            <span class="text-dark">{{ item.text }}</span>
          </b-btn>
        </div>
        <div class="text-center mt-3">
          <span>
          <b-btn
              class="bg-secondary btn bg-white mx-1"
              v-for="(item, key) in operatorsList"
              v-bind:key="key"
              @click="addOperator(item)">
            <span class="text-dark">{{ item.name }}</span>
          </b-btn>
          </span>
          <span>
          <b-btn
              class="bg-secondary btn bg-white mx-1"
              v-for="(item, key) in bracketList"
              v-bind:key="key"
              @click="addBracket(item)">
            <span class="text-dark">{{ item.name }}</span>
          </b-btn>
          </span>
          <span>
          <b-btn
              class="bg-secondary btn bg-white mx-1"
              @click="removeLasted()">
            <span class="text-dark"><i class="bx bx-arrow-back"></i></span>
          </b-btn>
          </span>
          <span>
          <b-btn
              class="bg-secondary btn bg-white mx-1"
              @click="removeAll()">
            <span class="text-dark">C</span>
          </b-btn>
          </span>
          <span>
          <input
              type="number"
              class="form-control bg-light-green mx-1 d-inline-block w-auto"
              v-model="numberOption.value"
              @keyup.enter="addNumber">

          </span>
        </div>
      </b-col>
    </b-row>
    <hr>
  </b-col>
</template>

<script>
const MAIN_API_URL = '/docTable'
import apiService from "@/shared/services/api.service";

export default {
  props: {
    docTable: {
      type: Object,
      required: true
    },
    labelList: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      types: {
        OPERATORS: 'OPERATORS',
        ARGUMENTS: 'ARGUMENTS',
        OPEN_BRACKET: 'OPEN_BRACKET',
        CLOSE_BRACKET: 'CLOSE_BRACKET',
        NUMBER: 'NUMBER',
      },
      numberOption: {},
      operatorsList: [],
      bracketList: [],
      formulaList: [],
      currentStepType: null,
      openedBracketCount: 0,
      target: null,
      isSaveFormulasDisabled: false,
    }
  },
  created() {
    this.types = {
      OPERATORS: 'OPERATORS',
      ARGUMENTS: 'ARGUMENTS',
      OPEN_BRACKET: 'OPEN_BRACKET',
      CLOSE_BRACKET: 'CLOSE_BRACKET',
      NUMBER: 'NUMBER',
    };
    this.operatorsList = [
      {
        name: '+',
        type: this.types.OPERATORS
      },
      {
        name: '-',
        type: this.types.OPERATORS
      },
      {
        name: '*',
        type: this.types.OPERATORS
      },
      {
        name: '/',
        type: this.types.OPERATORS
      }
    ];
    this.bracketList = [
      {
        name: '(',
        type: this.types.OPEN_BRACKET
      },
      {
        name: ')',
        type: this.types.CLOSE_BRACKET
      }
    ];
    this.numberOption = {
      name: '0',
      type: this.types.NUMBER,
      value: 0
    }
  },
  methods: {
    addArgument(item) {
      if (this.currentStepType !== this.types.ARGUMENTS) {
        this.setCurrentStepType(this.types.ARGUMENTS);
        this.formulaList.push({
          id: item.id,
          name: item.nameUz,
          nameEn: item.nameEn,
          nameLt: item.nameLt,
          nameRu: item.nameRu,
          nameUz: item.nameUz,
          typeCode: item.typeCode,
          parentName: item.parentName,
          type: this.types.ARGUMENTS
        });
      }
    },
    addOperator(item) {
      if (this.currentStepType === this.types.ARGUMENTS) {
        this.setCurrentStepType(this.types.OPERATORS);
        this.formulaList.push(item);
      }
    },
    addBracket(item) {
      if (this.currentStepType === this.types.OPERATORS && item.type === this.types.OPEN_BRACKET) {
        this.openedBracketCount++;
        this.formulaList.push(item);
      } else if (this.currentStepType === this.types.ARGUMENTS && item.type === this.types.CLOSE_BRACKET) {
        if (this.openedBracketCount > 0) {
          this.openedBracketCount--;
          this.formulaList.push(item);
        }
      }
    },
    addNumber(e) {
      if (this.currentStepType !== this.types.ARGUMENTS) {
        let value = parseFloat(this.numberOption.value);
        if (value !== 0) {
          this.setCurrentStepType(this.types.ARGUMENTS);
          this.formulaList.push({
            id: null,
            name: value,
            typeCode: "BIGDECIMAL",
            type: this.types.NUMBER,
            value: value
          });
          this.numberOption.value = 0;
        }
      }
    },
    removeLasted() {
      if (this.formulaList.length === 0) {
        return null;
      }
      if (this.formulaList.length === 1) {
        return this.removeAll();
      }
      const removed = this.formulaList.pop();
      if (removed.type === this.types.OPEN_BRACKET) {
        this.openedBracketCount--;
      } else if (removed.type === this.types.CLOSE_BRACKET) {
        this.openedBracketCount++;
      } else {
        const lastItem = this.formulaList[this.formulaList.length - 1];
        this.setCurrentStepType(lastItem.type);
      }
    },
    removeAll() {
      this.formulaList = [];
      this.setCurrentStepType(null);
      this.openedBracketCount = 0;
    },
    setCurrentStepType(type) {
      this.currentStepType = type;
    },
    validateFormulas() {
      if (!this.target) {
        return false;
      }
      if (this.openedBracketCount !== 0) {
        return false;
      }
      if (this.formulaList.length === 0) {
        return false;
      }
      let lastFormula = this.formulaList[this.formulaList.length - 1];
      if (lastFormula.type === this.types.OPERATORS) {
        return false;
      }
      if (lastFormula.type === this.types.OPEN_BRACKET) {
        return false;
      }
      return true;
    },
    saveFormulas() {
      if (this.validateFormulas()) {
        apiService.post(MAIN_API_URL + "/save-tables-formulas", this.formulaList.map((item) => {
          item.docTableId = this.docTable.id;
          item.targetColumnId = this.target;
          item.docColumnId = item.id ?? null;
          item.code = item.name;
          return item;
        })).then(response => {
          this.$emit('getDocTableFormulasList');
          this.$toast(this.$t('submodules.doc_table_formulas.saved'), {type: 'success'});
        }).catch(error => {
          this.$toast(error, {type: 'error'});
        });
      } else {
        this.$toast(('Формула не валидна'), {type: 'warning'});
      }
    },
    getBigdecimalList(inList = [], outList = [], parentName = '') {
      inList.map((item) => {
        let name = this.getName({
          nameUz: item.nameUz,
          nameLt: item.nameLt,
          nameRu: item.nameRu,
        });
        if (item.typeCode === 'BIGDECIMAL') {
          outList.push({
            ...item,
            text: name,
            parentName: parentName,
            value: item.id
          });
        }
        if (item.children) {
          this.getBigdecimalList(item.children, outList, (parentName ? parentName + ' / ' : '') + name);
        }
      })
      return outList;
    },
  },
  computed: {
    targetSelectOptions() {
      return this.getBigdecimalList(this.labelList, []);
    },
  },
}
</script>

<style scoped>
.bg-light-yellow {
  background-color: #ffc107 !important;
}

.bg-light-green {
  background-color: #c1ffc1 !important;
}
</style>
