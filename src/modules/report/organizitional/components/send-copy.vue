<template>
  <div style="min-height: 200px" class="border-color-custom">
    <!-- Signature -->
    <b-sidebar
        backdrop-variant="transparent"
        class="sidebar-part"
        shadow
        backdrop
        sidebar-class="p-0"
        :no-header="true"
        right
        v-model="isSidebar_3"
    >
      <MemberesSignature
          :notIn="false"
          @asyncValue="asyncValue_3"
          :async="true"
          @cancel="isSidebar_3 = false"
          ref="partRef_3"
      />
    </b-sidebar>

    <b-sidebar
        backdrop-variant="transparent"
        class="sidebar-part"
        shadow
        backdrop
        sidebar-class="p-0"
        :no-header="true"
        right
        v-model="isSidebar_2"
    >
      <DepartmentSignature
          :notIn="false"
          @asyncValue="asyncValue_2"
          :async="true"
          @cancel="isSidebar_2 = false"
          ref="partRef_2"
      />
    </b-sidebar>

    <!-- //isSidebar end -->
    <div>
      <div class="d-flex justify-content-center">
        <div
            :style="!(selected_me? (dc.value == 'Signature' ? 'visibility:hidden' : ''): '')"
            @click.prevent="selectSendType(dc.value)"
            class="card my-card-hovered mr-3"
            v-for="(dc, index) in sendTypeList"
            :key="index + 'doc'"
            :class="dc.value == active ? 'my-card-active' : ''"
            style="height: 13rem !important; width: 13rem !important"
        >
          <!--          :disabled="selected_me? (dc.value == 'Signature' ? true : false): false"-->
          <div

              class="card-body text-center card-design"
              :style="selected_me ?  (dc.value == 'withoutAgreement' ? 'background-color: #dce9ff': '') : ''">
            <div class="row">
              <div class="col-12">
                <img
                    style="border-radius: 50%"

                    :src="
                  dc.value == 'withoutAgreement'? require('@/assets/images/report/2.png'):
                    dc.value == 'Review'
                      ? require('@/assets/images/report/3.png')
                      : require('@/assets/images/report/4.png')
                  "
                    alt="DOC"
                    height="70"
                />
              </div>
              <div class="col-12">
                <div class="mt-3 col-12">
                  <p style="font-size: 14px">
                    <b>{{ dc.label }}</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- KELISHUVSIZ -->
    <div class="card" v-if="selected_me">
      <div class="card-header bg-white d-flex align-items-center">
        <img :src="require('@/assets/images/report/2.png')" alt="DOC" height="45"/>
        <h5 class="ml-3">
          <strong>{{ $t("actions.no_agreement_with_me") }}</strong>
        </h5>
      </div>
    </div>

    <!-- KELISHISH -->
    <div class="card" v-if="selectedSignature.length > 0">
      <div class="card-header bg-white d-flex align-items-center">
        <img :src="require('@/assets/images/report/4.png')" alt="DOC" height="45"/>
        <h5 class="ml-3">
          <strong>{{ $t("actions.for_agreement") }}</strong>
        </h5>
      </div>
      <div>
        <div class="table-responsive border-color-custom m-0">
          <table class="table table-centered m-0">
            <tbody v-if="selectedSignature.length > 0">
            <tr v-for="(member, index) in selectedSignature"
                :key="index + 'AD'">
              <td style="width: 50px">
                <img
                    v-if="member.uploadPath"
                    :src="`${hrUrl}/${member.uploadPath}`"
                    class="rounded-circle avatar-sm"
                    alt
                />
                <div v-else class="avatar-sm mr-3">
                    <span class=" avatar-title rounded-circle bg-soft-primary text-white font-size-16 " >
                      {{ `${member.fullName.charAt(0)}` }}
                    </span>
                </div>
              </td>
              <td>
                <h5 class="font-size-14 m-0">
                  <p class="text-dark m-0">
                    {{ `${member.fullName}` }}
                  </p>
                </h5>
                <p class="m-0 text-muted">
                  {{
                    getName({
                      nameLt: member.departmentNameLt,
                      nameRu: member.departmentNameRu,
                      nameUz: member.departmentNameUz,
                    })
                  }}
                </p>
                <p class="m-0 text-muted">
                  {{
                    getName({
                      nameLt: member.directoryPositionNameLt,
                      nameRu: member.directoryPositionNameRu,
                      nameUz: member.directoryPositionNameUz,
                    })
                  }}
                </p>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- REVIEW EMPLOYEE LIST -->
    <div class="card" v-if="selectedReview.id">
      <div class="card-header bg-white d-flex align-items-center">
        <img :src="require('@/assets/images/report/3.png')" alt="DOC" height="45"/>
        <h5 class="ml-3">
          <strong>{{ $t("actions.dep_work_with_report") }}</strong>
        </h5>
      </div>
      <div>
        <div class="table-responsive m-0">
          <table class="table table-centered m-0">
            <tbody v-if="selectedReview.id">
            <tr>
              <td>
                <h5 class="font-size-14 m-0">
                    <span class="text-muted">
                      {{
                        `${getName({
                          nameUz: selectedReview.parentNameUz,
                          nameLt: selectedReview.parentNameLt,
                          nameRu: selectedReview.parentNameRu,
                        })}`
                      }}
                    </span>
                  <br>
                  -
                  <span class="font-weight-bold">
                      {{
                      `${getName({
                        nameUz: selectedReview.nameUz,
                        nameLt: selectedReview.nameLt,
                        nameRu: selectedReview.nameRu,
                      })}`
                    }}
                    </span>
                </h5>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import {g_label, checkFileIsDoc} from "@/helper";
import Service from "@/shared/services/referencesService";
import MemberesSignature from "./MemberesSignature";
import DepartmentSignature from "./DepartmentsSignature.vue";

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
  },
  components: {
    MemberesSignature,
    DepartmentSignature,
  },

  computed: {
    params() {
      return {
        params: {
          limit: 30,
          page: 0,
        },
        search: this.searchValue,
      };
    },
  },
  methods: {
    asyncValue(v) {
      this.selectedAgreement = v;
    },
    asyncValue_2(v) {
      this.selectedReview = v;
    },
    asyncValue_3(v) {
      this.selectedSignature = v;
    },
    selectSendType(v) {
      this.active = v;

      if (v == "Agreement") {
        this.isSidebar = true;
        this.$refs.partRef.reset();
      } else if (v == "Review") {
        this.isSidebar_2 = true;
        this.$refs.partRef_2.reset();
      } else if (v == "Signature") {
        if (this.selected_me) {
          this.$toast(this.$t('error.self_sign_selected'), {type: 'error'});
        } else {
          this.isSidebar_3 = true;
          this.$refs.partRef_3.reset();
        }
      } else if (v == "withoutAgreement") {
        this.selected_me = !this.selected_me
        this.selectedSignature = {}
        this.$refs.partRef_3.resetSelectedMembers();
        // this.isSidebar_3 = true;
        // this.$refs.partRef_3.reset();
      }
    },
    searchItemDocTypeList(v) {
      this.searchValue = v;
    },
    getValueDocTypeList(v) {
      this.form.docTypeId = v ? v.id : null;
    },
    getDocTypeList() {
      Service.getListDocumentType(this.params)
          .then((rs) => {
            this.docTypeList = rs.data.list;
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
      this.form = {...this.form, ...item};
    },
  },
  created() {
    // this.getDocTypeList();
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      active: null,
      g_label: g_label,
      searchValue: "",
      docTypeList: [],
      sendTypeList: [

        {
          label: this.$t("actions.for_agreement"),
          value: "Signature",
        },
        {
          label: this.$t("actions.no_agreement_with_me"),
          value: "withoutAgreement",
        },
        {
          label: this.$t("actions.dep_work_with_report"),
          value: "Review",
        },
      ],
      submitted: false,
      selected_me: false,

      isSidebar: false,
      isSidebar_2: false,
      selectedReview: {},
      isSidebar_3: false,
      selectedAgreement: {},
      selectedSignature: {},
    };
  },
};
</script>

<style scoped lang="css">
.card-design {
  box-shadow: 1rem 0.3rem 0.6rem -0.6rem #c8d0e7,
  -0.2rem -0.2rem 0.5rem #ffffff;
  border-radius: 1rem 1rem 1rem 1rem;
  cursor: pointer;
}

.card-design:hover {
  transform: translateY(-2px) scale(1.005) translateZ(0);
}

</style>

<style lang="scss">
.sidebar-part {
  .b-sidebar {
    width: 600px;
    background: white;
  }
}

.border-color-custom {
  th,
  td {
    border-color: #ccc !important;
  }
}
</style>