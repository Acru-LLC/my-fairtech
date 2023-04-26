<template>
  <div>
    <BaseInputWithValidation
        @input="($event) => (form.nameLt = toLatin($event))"
        rules="required"
        v-model="form.nameUz"
        :label="$t('column.name_uz')"
        label-on-top
        class="required"
    />
    <BaseInputWithValidation
        @input="($event) => (form.nameUz = toCyrill($event))"
        not-required
        custom-classes="mt-3"
        v-model="form.nameLt"
        :label="$t('column.name_lt')"
        label-on-top
    />
    <BaseInputWithValidation
        not-required
        custom-classes="mt-3"
        v-model="form.nameRu"
        :label="$t('column.name_ru')"
        label-on-top
    />
    <div class="mt-3">
      <label class="mb-2">{{ $t("date") }}</label><br>
      <BaseDatePickerWithValidation
          not-required
          v-model="form.date"
          only-form-element
          lang="ru"
      ></BaseDatePickerWithValidation>
    </div>

    <div class="mt-3">
      <label class="mb-2">{{ $t("reportTemplates") }}</label>
      <!--      <MultiselectCustomized-->
      <!--          :submitted="submitted"-->
      <!--          ref="refSelect"-->
      <!--          :label="g_label_Uz('nameRu', 'nameLt', 'nameUz')"-->
      <!--          :options="valueList"-->
      <!--          @searchItem="searchItem"-->
      <!--          @value="getValue"-->
      <!--      />-->
      <div class="p-2" style="border:1px solid #ccc;  border-radius: 4px; cursor: not-allowed"> {{
          form.tableId ? getName({
            nameUz: form.tableId.nameUz,
            nameLt: form.tableId.nameLt,
            nameRu: form.tableId.nameRu,
          }) : ""
        }}
      </div>
    </div>


    <div class="mt-3">
      <label class="mb-2">{{ $t("dateTypes") }}</label>
            <MultiselectCustomized
                :submitted="submitted"
                ref="refSelect"
                :label="g_label_Uz('nameRu', 'nameLt', 'nameUz')"
                :options="list"
                @searchItem="searchItem2"
                @value="getValue2"
            />
<!--      <div class="p-2" style="border:1px solid #ccc; border-radius: 4px;cursor: not-allowed"> {{-->
<!--          form.dateTypeId ? getName({-->
<!--            nameUz: form.dateTypeId.nameUz,-->
<!--            nameLt: form.dateTypeId.nameLt,-->
<!--            nameRu: form.dateTypeId.nameRu,-->
<!--          }) : ''-->
<!--        }}-->
<!--      </div>-->
    </div>

    <div class="mt-3" v-if="title">
      <label class="mb-2">{{ $t("titleTable") }}</label>

      <div class="border p-2">
        {{ getName({nameUz: title.titleUz, NameRu: title.titleRu, nameLt: title.titleLt}) }}
      </div>
    </div>
  </div>
</template>

<script>
import {validationMixin} from "vuelidate";
import {required} from "vuelidate/lib/validators";
// import DatePicker from "vue2-datepicker";
import Service from "../../reportService";

import {g_label_Uz} from "@/helper";

export default {
  components: {
    // DatePicker,
  },
  validations: {
    form: {
      date: {},
      tableId: {
      },
      dateTypeId: {
      }
    },
  },
  mixins: [validationMixin],
  methods: {
    getListDateTypesChild(docTableId) {
      if (docTableId) {
        Service.getListDateTypesChild(this.params2, docTableId).then(
            (rs) => {
              this.list = rs.data.list;
            }
        );
      }
    },
    searchItem(q) {
      this.search = q;
      this.getListTable();
    },
    getValue(v) {
      this.title = v
      this.form.tableId = v;
      this.getListDateTypesChild()
    },
    searchItem2(q) {
      this.search2 = q;
      this.getListDateTypesChild();
    },
    getValue2(v) {
      this.title2 = v
      this.form.dateTypeId = v;
    },
    checkValidity() {
      this.submitted = true;
      this.$v.form.$touch();
      return this.$v.form.$anyError;
    },
    setFormData(item) {
      this.form = {...this.form, ...item};
      this.form.tableId = {
        id: item.docTableId,
        nameLt: item.docTableNameLt,
        nameRu: item.docTableNameRu,
        nameUz: item.docTableNameUz,
      }
      this.form.dateTypeId = {
        id: item.dateTypeId,
        nameLt: item.dateTypeNameLt,
        nameRu: item.dateTypeNameRu,
        nameUz: item.dateTypeNameUz,
      }

      this.getListDateTypesChild(item.parentDateTypeId)
    },
    async getListTable() {
      await Service.getOwnTable(this.params)
          .then((rs) => {
            if (rs.data) {
              this.valueList = rs.data.list;
            }
          })
          .catch((e) => {});
    },
  },
  created() {
    // this.getListTable();
  },
  computed: {

    params() {
      return {
        params: {
          limit: 20,
          page: 0,
        },
        search: this.search,
      };
    },
    params2() {
      return {
        params: {
          limit: 20,
          page: 0,
        },
        search: this.search2,
      };
    },
  },
  data() {
    return {
      title: null,
      search2: "",
      list: [],
      g_label_Uz: g_label_Uz,
      submitted: false,
      valueList: [],
      search: "",
      form: {
        date: "",
        tableId: null,
        dateTypeId: null,
        nameUz: "",
        nameLt: "",
        nameRu: ""
      },
    };
  },
};
</script>

<style>
</style>
