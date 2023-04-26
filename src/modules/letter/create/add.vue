<template>
  <div style="min-height: 200px">
    <div v-if="active == null" class="p-5">
      <b-list-group>
        <b-list-group-item
          button
          class="bg-hover-custom"
          @click.prevent="active = 'VADocType'"
          :class="active == 'VADocType' ? 'bg-active-custom' : ''"
        >
          <div class="d-flex align-items-center">
            <img :src="require('@/assets/word.png')" alt="DOC" height="50" />
            <h5 class="ml-3 font-weight-bold">{{ $t("VADocType") }}</h5>
          </div>
        </b-list-group-item>
        <!-- <b-list-group-item
            button
            class="bg-hover-custom p-3"
            @click.prevent="active = 'HRDocType'"
            :class="active == 'HRDocType' ? 'bg-active-custom' : ''"
          >
            <h5 class="m-0">{{ $t("HRDocType") }}</h5>
          </b-list-group-item> -->

        <b-list-group-item
          button
          class="bg-hover-custom"
          @click.prevent="active = 'YUDocType'"
          :class="active == 'YUDocType' ? 'bg-active-custom' : ''"
        >
          <div class="d-flex align-items-center">
            <img :src="require('@/assets/word.png')" alt="DOC" height="50" />
            <h5 class="ml-3 font-weight-bold">{{ $t("YUDocType") }}</h5>
          </div>
        </b-list-group-item>
      </b-list-group>
    </div>

    <div v-else-if="form.docSampleId == null && active != null">
      <div class="d-flex justify-content-between mb-3">
        <h4 class="m-0">
          <strong>
            {{ $t(active) }}
          </strong>
        </h4>
        <b-button variant="light" @click="active = null">
          <i class="fa fa-times text-danger"></i>
        </b-button>
      </div>

      <hr />

      <div class="row">
        <div class="col-lg-4"></div>
        <div class="col-lg-4">
          <div class="search-box mb-4">
            <div class="position-relative">
              <input
                type="text"
                v-model="searchValue"
                class="form-control rounded bg-light border-light"
                :placeholder="$t('actions.search')"
              />
              <i class="mdi mdi-magnify search-icon"></i>
            </div>
          </div>
        </div>
        <div class="col-lg-4"></div>
        <div  class="col-xl-2 col-sm-6 col-lg-3 col-md-6">
          <div class="card my-card-hovered mr-2" @click.prevent="clickSelect(blank)">
            <div class="card-body text-center">
              <div class="row">
                <div class="col-12">
                  <img
                    :src="require('@/assets/doc/1.png')"
                    alt="DOC"
                    height="60"
                  />
                </div>
                <div class="col-12">
                  <div class="mt-1 col-12">
                    <p style="font-size: 13px">
                      <strong>
                        {{ $t("blank") }}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          :key="index + 'doc'"
          v-for="(dc, index) in docTypeList"
          class="col-xl-2 col-sm-6 col-lg-3 col-md-6"
        >
          <div class="card my-card-hovered mr-2" >
            <div class="card-body text-center" @click.prevent="clickSelect(dc)">
              <div class="row">
                <div class="col-12">
                  <img
                    :src="require('@/assets/doc/1.png')"
                    alt="DOC"
                    height="60"
                  />
                </div>
                <div class="col-12">
                  <div class="mt-1 col-12">
                    <p style="font-size: 13px">
                      <strong>
                        {{
                          g_name({
                            nameLt: dc.docSampleNameLt,
                            nameRu: dc.docSampleNameRu,
                          })
                        }}
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-12">
          <div class="d-flex align-items-center justify-content-center">
            <b-pagination
              size="sm"
              class="m-0 mb-2"
              :total-rows="total"
              :per-page="18"
              v-model="page"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="active != null && form.docSampleId != null">
      <div class="d-flex justify-content-between mb-3">
        <h4 class="m-0">
          <strong>
            {{
              g_name({
                nameLt: selectedObj.docSampleNameLt,
                nameRu: selectedObj.docSampleNameRu,
              })
            }}
          </strong>
        </h4>
        <b-button variant="light" @click="form.docSampleId = null">
          <i class="fa fa-times text-danger"></i>
        </b-button>
      </div>

      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <div class="mb-3">
            <label class="m-0">{{ $t("docName") }}</label>
            <b-form-input
              :class="submitted && $v.form.name.$anyError ? 'is-invalid' : ''"
              rows="2"
              class="mb-2"
              size="lg"
              v-model="$v.form.name.$model"
            ></b-form-input>
          </div>

          <div class="mb-3">
            <label class="m-0">{{ $t("docNumber") }}</label>
            <b-form-input
              :class="
                submitted && $v.form.regNumber.$anyError ? 'is-invalid' : ''
              "
              rows="2"
              class="mb-2"
              size="lg"
              v-model="$v.form.regNumber.$model"
            ></b-form-input>
          </div>

          <div class="mb-3">
            <label class="m-0">{{ $t("docDate") }}</label>
            <date-picker
              size="lg"
              format="DD-MM-YYYY"
              :class="submitted && $v.form.date.$anyError ? 'dateClass' : ''"
              value-type="format"
              v-model="$v.form.date.$model"
              :first-day-of-week="1"
              lang="en"
            ></date-picker>
          </div>
        </div>
        <div class="col-2"></div>
      </div>

      <!-- <div class="mt-3">
        <label class="mb-2">{{ $t("document.type") }}</label>
        <MultiselectCustomized
          ref="docTypeRef"
          :label="g_label('nameLt', 'nameRu')"
          :options="docTypeList"
          :trackId="'id'"
          @value="getValueDocTypeList"
          :submitted="submitted"
          @searchItem="searchItemDocTypeList"
        />
      </div> -->

      <div class="mt-4">
        <b-button
          size="lg"
          class="float-right"
          variant="success"
          @click="$emit('save')"
          >{{ $t("actions.createNewDoc") }}</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import DatePicker from "vue2-datepicker";
import { g_label, g_name, checkFileIsDoc } from "@/helper";
import Service from "../letterService";

export default {
  watch: {
    "form.file": {
      handler(v) {
        if (v) {
          if (checkFileIsDoc(v) == "err") {
            this.file = null;
          } else {
            const fileReader = new FileReader();
            fileReader.addEventListener("load", () => {
              this.imgUrl = fileReader.result;
            });
            fileReader.readAsDataURL(v);
          }
        }
      },
    },
    searchValue: {
      handler() {
        this.getDocTypeList();
      },
    },

    active: {
      handler(v) {
        if (v) {
          if (v == "VADocType") {
            this.getDocTypeList();
          } else {
            this.getDocTypeList("lawyer");
          }
        }
      },
    },

    page: {
      handler() {
        this.getDocTypeList();
      },
    },
  },
  components: {
    DatePicker,
  },
  validations: {
    form: {
      name: {
        required,
      },
      regNumber: {
        required,
      },
      date: {
        required,
      },
      docSampleId: {
        required,
      },
    },
  },
  mixins: [validationMixin],
  computed: {
    params() {
      return {
        params: {
          limit: 18,
          page: this.page - 1,
        },
        search: this.searchValue,
      };
    },
  },
  methods: {
    clickSelect(dc) {
      this.form.docSampleId = dc.docSampleId;
      this.selectedObj = dc;
    },
    searchItemDocTypeList(v) {
      this.searchValue = v;
    },
    getValueDocTypeList(v) {
      this.form.docSampleId = v ? v.id : null;
    },
    getDocTypeList(v = "") {
      Service.getListDocumentType(this.params, v)
        .then((rs) => {
          this.docTypeList = rs.data.list;
          this.total = rs.data.total;
        })
        .catch((e) => {
          // this.catchErr(e);
        });
    },
    checkValidity() {
      this.submitted = true;
      this.$v.form.$touch();
      return this.$v.form.$anyError;
    },
    setFormData(item) {
      this.form = { ...this.form, ...item };
    },
  },

  data() {
    return {
      blank: {
        docTypeNameLt: this.$t("blank"),
        docTypeNameRu: this.$t("blank"),
        docSampleId: 'blank',
      },
      page: 1,
      selectedObj: {},
      g_name: g_name,
      active: null,
      g_label: g_label,
      searchValue: "",
      docTypeList: [],
      submitted: false,
      total: 0,
      form: {
        name: "",
        date: "",
        regNumber: "",
        docSampleId: null,
      },
    };
  },
};
</script>

<style>
</style>