<template>
  <div>
    <b-modal
        :cancel-variant="'outline-danger'"
        :ok-variant="'success'"
        size="lg"
        scrollable
        v-model="showSelectedModal"
        :title="$t('reportRoles')"
    >
      <ul id="il" class="list-unstyled chat-list">
        <li
            v-for="(data, index) in objectMembers"
            :key="data.id + 'EMPLOYEE' + index"
        >
          <div>
            <a href="javascript: void(0);">
              <div class="media d-flex" style="align-items: center">
                <div class="align-self-center mr-3"></div>

                <div class="media-body overflow-hidden">
                  <div class="d-flex align-items-center">
                    <i class="fa fa-check mr-2"></i>
                    <h5 :class="check(data)" class="font-size-14 m-0">
                      {{
                        `${getName( {
                          nameLt: data.parentNameLt,
                          nameRu: data.parentNameRu,
                          nameUz: data.parentNameUz,
                        } )}`
                      }}
                      -
                      {{
                        `${getName( {
                          nameLt: data.nameLt,
                          nameRu: data.nameRu,
                          nameUz: data.nameUz,
                        } )}`
                      }}
                    </h5>

                    <b-button
                        @click="pushMember(data)"
                        size="sm"
                        variant="danger"
                        class="ml-3"
                    >
                      <i class="bx bx-trash"></i>
                    </b-button>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </li>
      </ul>

      <template v-slot:modal-footer>
        <b-button variant="secondary" @click="showSelectedModal = false">{{
            $t( "actions.close" )
          }}
        </b-button>
      </template>
    </b-modal>
    <div class="text-center">
      <strong> {{ $t( "reportRoles" ) }} </strong>
      <span class="text-success"> ({{ members.length }}) </span>
      <b-button
          @click="showSelectedModal = true"
          variant="light"
          size="sm"
          class="ml-2"
      >
        <i class="fa fa-eye font-size-16"></i>
      </b-button>
    </div>
    <div class="card mb-0" v-if="!childView">
      <div>
        <div class="p-4">
          <div class="search-box mb-2">
            <div class="position-relative">
              <input
                  type="text"
                  class="form-control"
                  v-model="searchValue"
                  :placeholder="$t('actions.filter')"
              />
              <i class="bx bx-search-alt search-icon"></i>
            </div>
          </div>
          <div v-if="!childView">
            <b-overlay :show="loader" rounded="sm" opacity="0.1">
              <ul id="il" class="list-unstyled chat-list_2">
                <li
                    v-for="(data, index) in computedData"
                    :key="data.id + 'EMPLOYEE' + index"
                >
                  <div >
                    <a href="javascript: void(0);" >
                      <div class="media d-flex" style="align-items: center">
                        <div class="align-self-center mr-3"></div>
                        <!--parent-->
                        <div >
                          <b-button
                              @click="pushMember(data)"
                              size="sm"
                              class="mr-3"
                              :variant="check(data) ? 'primary' : 'light'"
                          >
                            <i class="fa fa-square-o p-1" v-show="!check(data)"></i>
                            <i class="fa fa-check" v-show="check(data)"></i>
                          </b-button>
                        </div>
                        <div class="media-body overflow-hidden" @click="showChildren(data)">
                          <h5 :class="check(data)" class="font-size-14 mb-1 effect">
                            {{
                              `${getName( {
                                nameLt: data.nameLt,
                                nameRu: data.nameRu,
                                nameUz: data.nameUz,
                              } )}`
                            }}
                          </h5>
                        </div>
                      </div>
                    </a>
                  </div>
                </li>
              </ul>
            </b-overlay>
          </div>
        </div>
      </div>
    </div>

    <!-- child -->
    <div class="card mb-0" v-if="childView">
      <div>
        <div >
          <h5 class="font-size-14 text-center text-primary mb-1">
            {{
              `${getName( {
                nameLt: childDataObj.nameLt,
                nameRu: childDataObj.nameRu,
                nameUz: childDataObj.nameUz,
              } )}`
            }}
          </h5>
        </div>
        <div class="p-4">
          <div class="d-flex align-items-center mb-3">
            <div style="width: 10%" @click="childView = false">
              <Back/>
            </div>
            <div class="search-box" style="width: 90%">
              <div class="position-relative">
                <input
                    type="text"
                    class="form-control"
                    v-model="searchValue2"
                    :placeholder="$t('actions.filter')"
                />
                <i class="bx bx-search-alt search-icon"></i>
              </div>
            </div>
          </div>
          <div>
            <b-overlay :show="loader" rounded="sm" opacity="0.1">
              <ul id="il" class="list-unstyled chat-list_2">
                <li
                    v-for="(data, index) in computedDataChildren"
                    :key="data.id + 'EMPLOYEE' + index"
                >
                  <div class="d-flex align-items-center p-1">
                    <div style="width: 6%">
                      <b-button
                          @click="pushMember(data)"
                          size="sm"
                          class="mr-3"
                          :variant="check(data) ? 'primary' : 'light'"
                      >
                        <i class="fa fa-square-o p-1" v-show="!check(data)"></i>
                        <i class="fa fa-check" v-show="check(data)"></i>
                      </b-button>
                    </div>
                    <a style="width: 90%" href="javascript: void(0);">
                      <div class="media d-flex" style="align-items: center">
                        <div class="align-self-center mr-3"></div>

                        <div class="media-body overflow-hidden" >
                          <h5 :class="check(data)" class="font-size-14 mb-1">
                            {{
                              `${getName( {
                                nameLt: data.nameLt,
                                nameRu: data.nameRu,
                                nameUz: data.nameUz,
                              } )}`
                            }}
                          </h5>
                        </div>
                      </div>
                    </a>
                  </div>
                </li>
              </ul>
            </b-overlay>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from "../../reportService";
// import { getName } from "@/helper";
export default {
  props: {
    notIn: {
      type: Boolean,
      default: false,
    },
    async: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      showSelectedModal: false,
      // getName: getName,
      members: [],
      objectMembers: [],
      searchValue: "",
      contactList: [],
      loader: false,
      children: [],
      childView: false,
      searchValue2: "",
      childDataObj: {},
    };
  },
  computed: {
    computedData() {
      if (this._empty( this.searchValue )) {
        return this.contactList;
      } else {
        return this.contactList.filter(
            (e) =>
                e.nameUz.toLowerCase().indexOf( this.searchValue.toLowerCase() ) >
                -1 ||
                e.nameRu.toLowerCase().indexOf( this.searchValue.toLowerCase() ) >
                -1 ||
                e.nameLt.toLowerCase().indexOf( this.searchValue.toLowerCase() ) > -1
        );
      }
    },

    computedDataChildren() {
      if (this._empty( this.searchValue2 )) {
        return this.children;
      } else {
        return this.children.filter(
            (e) =>
                e.nameUz.toLowerCase().indexOf( this.searchValue2.toLowerCase() ) >
                -1 ||
                e.nameRu.toLowerCase().indexOf( this.searchValue2.toLowerCase() ) >
                -1 ||
                e.nameLt.toLowerCase().indexOf( this.searchValue2.toLowerCase() ) > -1
        );
      }
    },
  },
  methods: {
    showChildren(data) {
      this.childDataObj = data;
      this.childView = true;
      // this.loader = true;
      this.children = data.children
      // Service.getByparentId(data.id)
      //   .then((res) => {
      //     this.children = res.data;
      //   })
      //   .finally(() => {
      //     this.loader = false;
      //   });
    },
    getByDepartments(id) {
      Service.getByDepartments( id ).then( (res) => {
        this.members = res.data.map( (e) => e.id );
      } );
    },
    pushMember(v) {
      let index = this.members.indexOf( v.id );
      if (index > -1) {
        this.members.splice( index, 1 );
        this.objectMembers.splice( index, 1 );
      } else {
        this.members.unshift( v.id );
        this.objectMembers.unshift( v );
      }
    },
    check(v) {
      let index = this.members.indexOf( v.id );
      if (index > -1) {
        return ["font-weight-bold", "text-primary"];
      } else {
        return false;
      }
    },
    getContacts() {
      this.loader = true;
      Service.getAllYuridik()
          .then( (res) => {
            this.$nextTick( () => {
              this.contactList = [res.data];
            } );
          } )
          .finally( () => {
            this.loader = false;
          } );
    },
  },

  async created() {
    await this.getContacts();
  },
  watch: {
    objectMembers: {
      async handler(v) {
        if (this.async) {
          this.$emit( "asyncValue", v );
        }
      },
    },
  },
};
</script>

<style scoped>
.effect{
  position: relative;
  transition:600ms;
}
.effect:after{
  content: attr(data-hover);
  position: absolute;
  left: 0;
  bottom: 0;
  transform:rotateX(90deg);
  -webkit-transform:rotateX(90deg);
  -moz-transform:rotateX(90deg);
  -o-transform:rotateX(90deg);
  -ms-transform:rotateX(90deg);
  transition:150ms;
  opacity: 0.7;
  color: #0169af;
  height: 0;
}
.effect:hover:after{
  transform:rotateX(0deg);
  -webkit-transform:rotateX(0deg);
  -moz-transform:rotateX(0deg);
  -o-transform:rotateX(0deg);
  -ms-transform:rotateX(0deg);
  top: 0;
  opacity: 1;
  height: 100%;
}
.effect:hover{
  color: #ab1af3;
}

</style>
