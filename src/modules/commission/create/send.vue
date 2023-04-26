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
        v-model="isSidebar"
    >
      <members
          :notIn="false"
          @asyncValue="asyncValue"
          :async="true"
          @cancel="isSidebar = false"
          ref="partRef"
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
      <members
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
            @click.prevent="selectSendType(dc.value)"
            class="card my-card-hovered mr-3 card-border"
            v-for="(dc, index) in sendTypeList"
            :key="index + 'doc'"
            :class="dc.value == active ? 'my-card-active' : ''"
        >
          <div class="card-body text-center card-design">
            <div class="row">
              <div class="col-12">
                <img
                    :src="
                    dc.value === 'Signature'
                      ? require('@/assets/doc/2.png')
                      : dc.value === 'Review'
                      ? require('@/assets/doc/3.png')
                      : require('@/assets/doc/4.png')
                  "
                    alt="DOC"
                    height="80"
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
    <!-- SIGNATURE -->
    <div class="card" v-if="selectedSignature.employeeId">
      <div class="card-header bg-white d-flex align-items-center">
        <img :src="require('@/assets/doc/2.png')" alt="DOC" height="45"/>
        <h5 class="ml-3">
          <strong>{{ $t( "forSignature" ) }}</strong>
        </h5>
      </div>
      <div>
        <div class="table-responsive border-color-custom m-0">
          <table class="table table-centered m-0">
            <tbody>
            <tr>
              <td style="width: 50px">
                <div  class="avatar-sm mr-3">
                    <span class=" avatar-title rounded-circle bg-soft-primary text-white font-size-16 " >
                      {{ `${selectedSignature.fullName.charAt(0)}` }}
                    </span>
                </div>
              </td>
              <td>
                <h5 class="font-size-14 m-0">
                  <p class="text-dark m-0">
                    {{ `${selectedSignature.fullName}` }}
                  </p>
                </h5>
                <p class="m-0 text-muted">
                  {{
                    getName( {
                      nameUz: member.departmentNameUz,
                      nameLt: member.departmentNameLt,
                      nameRu: member.departmentNameUz,
                    } )
                  }}
                </p>
                <p class="m-0 text-muted">
                  {{
                    getName( {
                      nameUz: member.directoryPositionNameUz,
                      nameLt: member.directoryPositionNameLt,
                      nameRu: member.directoryPositionNameRu,
                    } )
                  }}
                </p>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- AGREEMENT -->
    <div class="card" v-if="selectedAgreement.length > 0">
      <div class="card-header bg-white d-flex align-items-center">
        <img :src="require('@/assets/doc/4.png')" alt="DOC" height="45"/>
        <h5 class="ml-3">
          <strong>{{ $t( "forAgreement" ) }}</strong>
        </h5>
      </div>
      <div>
        <div class="table-responsive m-0">
          <table class="table table-centered m-0">
            <tbody v-if="selectedAgreement.length > 0">
            <tr
                v-for="(member, index) in selectedAgreement"
                :key="index + 'AD'"
            >
              <td style="width: 50px">
                <div class="avatar-sm mr-3">
                    <span class=" avatar-title rounded-circle bg-soft-primary text-white font-size-16 " >
                      {{ `${member.fullName.charAt( 0 )}` }}
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
                    getName( {
                      nameUz: member.departmentNameUz,
                      nameLt: member.departmentNameLt,
                      nameRu: member.departmentNameUz,
                    } )
                  }}
                </p>
                <p class="m-0 text-muted">
                  {{
                    getName( {
                      nameUz: member.directoryPositionNameUz,
                      nameLt: member.directoryPositionNameLt,
                      nameRu: member.directoryPositionNameRu,
                    } )
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
    <div class="card" v-if="selectedReview.length > 0">
      <div class="card-header bg-white d-flex align-items-center">
        <img :src="require('@/assets/doc/3.png')" alt="DOC" height="45"/>
        <h5 class="ml-3">
          <strong>{{ $t( "submodules.doc.executors" ) }}</strong>
        </h5>
      </div>
      <div>
        <div class="table-responsive m-0">
          <table class="table table-centered m-0">
            <tbody v-if="selectedReview.length > 0">
            <tr v-for="(member, index) in selectedReview" :key="index + 'AD'">
              <td style="width: 50px">
                <div class="avatar-sm mr-3">
                    <span class=" avatar-title rounded-circle bg-soft-primary text-white font-size-16 " >
                      {{ `${member.fullName.charAt( 0 )}` }}
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
                    getName( {
                      nameUz: member.departmentNameUz,
                      nameLt: member.departmentNameLt,
                      nameRu: member.departmentNameUz,
                    } )
                  }}
                </p>
                <p class="m-0 text-muted">
                  {{
                    getName( {
                      nameUz: member.directoryPositionNameUz,
                      nameLt: member.directoryPositionNameLt,
                      nameRu: member.directoryPositionNameRu,
                    } )
                  }}
                </p>
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
import Members from "../members";
import MemberesSignature from "./MemberesSignature";

export default {
  watch: {
    "form.file": {
      handler(v) {
        if (v) {
          if (checkFileIsDoc( v ) === "err") {
            this.file = null;
          } else {
            const fileReader = new FileReader();
            fileReader.addEventListener( "load", () => {
              this.imgUrl = fileReader.result;
            } );
            fileReader.readAsDataURL( v );
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
    Members,
    MemberesSignature,
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
      if (v === "Agreement") {
        this.isSidebar = true;
        this.$refs.partRef.reset();
      } else if (v === "Review") {
        this.isSidebar_2 = true;
        this.$refs.partRef_2.reset();
      } else if (v === "Signature") {
        this.isSidebar_3 = true;
        this.$refs.partRef_3.reset();
      }
    },
    searchItemDocTypeList(v) {
      this.searchValue = v;
    },
    getValueDocTypeList(v) {
      this.form.docTypeId = v ? v.id : null;
    },
    getDocTypeList() {
      Service.getListDocumentType( this.params )
          .then( (rs) => {
            this.docTypeList = rs.data.list;
          } )
          .catch( (e) => {
            // this.catchErr( e );
          } );
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
      active: null,
      g_label: g_label,
      searchValue: "",
      docTypeList: [],
      sendTypeList: [
        {
          label: this.$t( "submodules.doc.executors" ),
          value: "Review",
        },
        {
          label: this.$t( "submodules.doc.to_whom" ),
          value: "Signature",
        },
        // {
        //   label: this.$t("forAgreement"),
        //   value: "Agreement",
        // },

      ],
      submitted: false,

      isSidebar: false,
      isSidebar_2: false,
      selectedReview: [],
      isSidebar_3: false,
      selectedAgreement: [],
      selectedSignature: {},
    };
  },
};
</script>

<style>
</style>

<style lang="scss" >
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

.card-border {
  box-shadow: 1rem 0.3rem 0.6rem -0.6rem #c8d0e7,
  -0.2rem -0.2rem 0.5rem #ffffff;
  border-radius: 1rem 1rem 1rem 1rem;
  border: 2px solid;
  border-color: #1f0df8;
}
.card-design {
  box-shadow: 1rem 0.3rem 0.6rem -0.6rem #c8d0e7,
  -0.2rem -0.2rem 0.5rem #ffffff;
  border-radius: 1rem 1rem 1rem 1rem;
  border: 2px solid;
  border-color: #1f0df8;
}

</style>
