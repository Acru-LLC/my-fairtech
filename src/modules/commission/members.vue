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
                  v-for="(data, index) in contactList"
                  :id="contactList[contactList.length - 1].id === data.id ? 'lid' : ''"
                  :key="data.id + 'EMPLOYEE' + index"
                  @click="pushMember(data)"
              >
                <a href="javascript: void(0);">
                  <div class="media d-flex" style="align-items: center">
                    <div class="align-self-center mr-3"></div>
                    <div class="avatar-sm align-self-center mr-3">
                      <span class=" avatar-title rounded-circle bg-soft-primary text-white ">
                        {{ data.fullName.charAt(0) }}
                      </span>
                    </div>

                    <div class="media-body overflow-hidden">
                      <h5 :class="check(data)" class="font-size-14 mb-1">
                        {{ `${data.fullName}` }}
                      </h5>
                      <p class="m-0" :class="check(data)">
                        {{
                          getName({
                            nameUz: data.departmentNameUz,
                            nameLt: data.departmentNameLt,
                            nameRu: data.departmentNameUz,
                          })
                        }}
                      </p>
                      <p class="m-0" :class="check(data)">
                        {{
                          getName({
                            nameUz: data.directoryPositionNameUz,
                            nameLt: data.directoryPositionNameLt,
                            nameRu: data.directoryPositionNameRu,
                          })
                        }}
                      </p>
                    </div>

                    <i v-if="check(data)" class="fas fa-user-check font-size-18 text-primary" ></i>
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
import simplebar from "simplebar-vue";

import helperService from "@/shared/services/helper.service"

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
              let { scrollTop, scrollHeight, clientHeight } = event.target;
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
        this.getContacts({ page: 0, limit: 20 });
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
    },
    check(v) {
      let index = this.members.indexOf(v.id);
      if (index > -1) {
        return ["font-weight-bold", "text-primary"];
      } else {
        return false;
      }
    },
    getContacts() {
      if (this.notIn) {
        let projectId = this.$route.query.id;
        if (projectId) {
          helperService.getListByYurDepartmentNotInProj({
            params: v,
            search: this.searchValue,
            projectId: projectId,
          }).then((res) => {
            this.$nextTick(() => {
              this.contactList = res.data.list;
            });
          });
        }
      } else {
        helperService.searchEmployeesByDepID(this.var_default_search_payload).then((res) => {
          this.$nextTick(() => {
            this.contactList = res.data.list;
          });
        });
      }
    },
    loadMoreContact() {
      if (this.notIn) {
        let projectId = this.$route.query.id;
        if (projectId) {
          helperService.getListByYurDepartmentNotInProj({
            params: {
              page: (this.contactPage += 1),
              limit: 20,
            },
            projectId: projectId,
            search: this.searchValue,
          }).then(async ({ data }) => {
            if (data.list.length > 0) {
              this.$nextTick(() => {
                this.contactList = this.contactList.concat(data.list);
              });
            } else {
              this.contactPage + -1;
            }
          });
        }
      } else {
        helperService.searchEmployeesByDepID(this.var_default_search_payload).then(async ({ data }) => {
          if (data.list.length > 0) {
            this.$nextTick(() => {
              this.contactList = this.contactList.concat(data.list);
            });
          } else {
            this.contactPage = this.contactPage - 1;
          }
        });
      }
    },
  },
  mounted() {
    var container3 = document.querySelector(
        "#contact-list .simplebar-content-wrapper"
    );
    if (container3) {
      container3.scrollTo({ top: 500, behavior: "smooth" });
    }

    // Contact list actions

    this.scrollActive();
  },
  async created() {
    await this.getContacts({ page: 0, limit: 20 });
  },
  watch: {
    searchValue: {
      async handler() {
        await this.getContacts({ page: 0, limit: 20 });
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
