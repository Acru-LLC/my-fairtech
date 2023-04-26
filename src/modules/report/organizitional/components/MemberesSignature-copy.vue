<template>
  <div>
    <div class="card mb-0">
      <div class="card-body">
        <div class="button-items d-flex" style="justify-content: space-between">
          <b-button variant="primary" class="btn-label">
            <i class="bx bx-smile label-icon"></i>
            {{ `(${members.length})` }}
          </b-button>
          <span>
            <b-button variant="outline-danger" @click="$emit('cancel')">
              <i class="fa fa-times"></i>
              {{ $t("actions.close") }}</b-button
            >
            <b-button v-if="!async" variant="success" @click="save">
              <i class="fa fa-save"></i>
              {{ $t("actions.save") }}
            </b-button>
          </span>
        </div>
      </div>
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

          <simplebar
              :key="cmpKey + 'ADS'"
              data-simplebar-auto-hide="false"
              :style="`height:${heightWindow - 165}px`"
              id="contact-list"
              ref="contactsRef"
          >
            <ul id="il" class="list-unstyled chat-list">
              <li
                  :id="
                  contactList[contactList.length - 1].id == data.id ? 'lid' : ''
                "
                  v-for="(data, index) in contactList"
                  :key="data.id + 'EMPLOYEE' + index"
                  @click="pushMember(data)"
              >
                <a href="javascript: void(0);">
                  <div class="media d-flex" style="align-items: center">
                    <div class="align-self-center mr-3"></div>
                    <div class="align-self-center mr-3" v-if="data.uploadPath">
                      <img
                          height="auto"
                          :src="`${publicPath}/${data.uploadPath}`"
                          class="rounded-circle avatar-sm"
                          alt
                      />
                    </div>
                    <div
                        class="avatar-sm align-self-center mr-3"
                        v-if="!data.uploadPath"
                    >
                      <span class=" avatar-title rounded-circle bg-soft-primary text-white " >
                        {{ data.fullName.charAt(0) }}
                      </span
                      >
                    </div>

                    <div class="media-body overflow-hidden">
                      <h5 :class="check(data)" class="font-size-14 mb-1">
                        {{ `${data.fullName}` }}
                      </h5>
                      <p class="m-0" :class="check(data)">
                        {{
                          getName({
                            nameLt: data.departmentNameLt,
                            nameRu: data.departmentNameRu,
                            nameUz: data.departmentNameUz,
                          })
                        }}
                      </p>
                      <p class="m-0" :class="check(data)">
                        {{
                          getName({
                            nameLt: data.directoryPositionNameLt,
                            nameRu: data.directoryPositionNameRu,
                            nameUz: data.directoryPositionNameUz,
                          })
                        }}
                      </p>
                    </div>

                    <i
                        v-if="check(data)"
                        class="fas fa-user-check font-size-18 text-primary"
                    ></i>
                  </div>
                </a>
              </li>
            </ul>
          </simplebar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeService from "@/shared/services/employeeService";
import simplebar from "simplebar-vue";
import {dec} from "@/helper";

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
  components: {
    simplebar,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      heightWindow: window.innerHeight,
      dec: dec,
      // getName: getName,
      contactList: [],
      contactPage: 0,
      members: [],
      objectMembers: [],
      groupModal: false,
      searchValue: "",
      cmpKey: 0,
    };
  },
  methods: {
    resetSelectedMembers() {
      this.objectMembers = []
      this.members = []
    },
    reset() {
      this.cmpKey += 1;
      setTimeout(() => {
        this.scrollActive();
      }, 200);
    },
    scrollActive() {
      if (this.$refs.contactsRef.SimpleBar) {
        this.$refs.contactsRef.SimpleBar.getScrollElement().addEventListener(
            "scroll",
            (e) => {
              let {scrollTop, scrollHeight, clientHeight} = event.target;
              const offsetForTrigger = 1;
              if (scrollHeight - clientHeight - offsetForTrigger < scrollTop) {
                this.loadMoreContact();
              }
            }
        );
      }
    },
    save() {
      this.$emit("save", this.members);
      this.members = [];
      this.objectMembers = [];
      setTimeout(() => {
        this.getContacts({page: 0, itemsPerPage: 20});
      }, 300);
    },
    pushMember(v) {
      let index = this.members.indexOf(v.id);
      if (index > -1) {
        this.members.splice(index, 1);
        this.objectMembers.splice(index, 1);
      } else {
        this.members.unshift(v.id);
        this.objectMembers.unshift(v);
      }

      // if (v.id == this.objectMembers.id) {
      //   this.objectMembers = {};
      // } else {
      //   this.objectMembers = v;
      // }
    },
    check(v) {
      let index = this.members.indexOf(v.id);
      if (index > -1) {
        return ["font-weight-bold", "text-primary"];
      } else {
        return false;
      }
    },
    getContacts(v) {
      EmployeeService.getByYurDepForSign({
        params: v,
        search: this.searchValue,
      }).then((res) => {
        this.$nextTick(() => {
          this.contactList = res.data.list;
        });
      });
    },
    loadMoreContact() {
      EmployeeService.getByYurDepForSign({
        params: {
          page: (this.contactPage += 1),
          itemsPerPage: 20,
        },
        search: this.searchValue,
      }).then(async ({data}) => {
        if (data.list.length > 0) {
          this.$nextTick(() => {
            this.contactList = this.contactList.concat(data.list);
          });
        } else {
          this.contactPage = this.contactPage - 1;
        }
      });
    },
  },
  mounted() {
    var container3 = document.querySelector(
        "#contact-list .simplebar-content-wrapper"
    );
    if (container3) {
      container3.scrollTo({top: 500, behavior: "smooth"});
    }

    // Contact list actions

    this.scrollActive();
  },
  async created() {
    await this.getContacts({page: 0, itemsPerPage: 20});
  },
  watch: {
    searchValue: {
      async handler() {
        await this.getContacts({page: 0, itemsPerPage: 20});
      },
    },
    objectMembers: {
      async handler(v) {
        if (this.async) {
          this.$emit("asyncValue", v);
        }
      },
    },
  },
};
</script>

<style>
</style>