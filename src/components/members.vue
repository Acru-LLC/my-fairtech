<template>
  <div>
    <div class="card mb-0">
      <div class="card-body">
        <div
            class="button-items d-flex"
            style="justify-content: space-between"
        >
          <b-button
              variant="primary"
              class="btn-label"
          >
            <i class="bx bx-smile label-icon"></i>
            {{ `(${members.length})` }}
          </b-button>
          <span>
                        <b-button
                            variant="outline-danger"
                            @click="$emit('cancel')"
                        >
                            <i class="fa fa-times"></i>
                            {{ $t("actions.close") }}
                        </b-button>
                        <b-button
                            v-if="!async"
                            variant="success"
                            @click="save"
                        >
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
            <ValidationObserver
                ref="observer"
                v-slot="{}"
            >
              <ul
                  id="il"
                  class="list-unstyled chat-list"
              >
                <li
                    :id="
                    contactList[contactList.length - 1].id == data.id ? 'lid' : ''
                    "
                    v-for="(data, index) in contactList"
                    :key="data.id + 'EMPLOYEE' + index"
                >
                  <a @click="pushMember(data)" href="javascript: void(0);">
                    <div
                        class="media d-flex"
                        style="align-items: center"
                    >
                      <div class="align-self-center mr-3"></div>
                      <div
                          class="align-self-center mr-3"
                          v-if="data.uploadPath"
                      >
                        <img
                            height="auto"
                            :src="`${hrUrl}/${data.uploadPath}`"
                            class="rounded-circle avatar-sm"
                            alt
                        />
                      </div>
                      <div
                          class="avatar-sm align-self-center mr-3"
                          v-if="!data.uploadPath"
                      >
                        <span class=" avatar-title rounded-circle bg-soft-primary text-white">
                          {{ data.employeeFullName.charAt(0) }}
                        </span>
                      </div>

                      <div class="media-body overflow-hidden">
                        <h5
                            :class="check(data)"
                            class="font-size-14 mb-1"
                        >
                          {{ `${data.employeeFullName}` }}
                        </h5>
                        <p
                            class="m-0"
                            :class="check(data)"
                        >
                          {{
                            getName({
                              nameLt: data.departmentNameLt,
                              nameUz: data.departmentNameUz,
                              nameRu: data.departmentNameRu,
                            })
                          }}
                        </p>
                        <p
                            class="m-0"
                            :class="check(data)"
                        >
                          {{
                            getName({
                              nameLt: data.positionNameLt,
                              nameUz: data.positionNameUz,
                              nameRu: data.positionNameRu,
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
                  <BaseMultiselectWithValidation
                      v-if="check(data) && forProject"
                      rules="required"
                      class="required"
                      v-model="data.mailingPurposeId"
                      :options="mailingPurposes.map(e => e.id)"
                      :label="$t('submodules.mailing_purpose.title')"
                      label-on-top
                      placeholder=""
                      :custom-label="customLabelMailingPurpose"
                      open-direction="bottom"
                      :max-height="600"
                      :show-labels="false"
                  ></BaseMultiselectWithValidation>
                </li>
              </ul>
            </ValidationObserver>
          </simplebar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeService from "@/shared/services/employeeService";
import crudAndListsService from "@/shared/services/crud_and_list.service"
import simplebar from "simplebar-vue";
import {g_name} from "@/helper";

export default {
  props: {
    forProject: {
      type: Boolean,
      default: false,
    },
    notIn: {
      type: Boolean,
      default: false,
    },
    async: {
      type: Boolean,
      default: false,
    },
    application: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    simplebar,
  },
  data() {
    return {
      mailingPurposes: [],
      g_name: g_name,
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
    customLabelMailingPurpose(opt) {
      let selected = this.mailingPurposes.find(e => e.id == opt);
      if (selected) {
        return `${this.getName({
          nameRu: selected.nameRu,
          nameLt: selected.nameLt,
          nameUz: selected.nameUz,
        })
        }`
      }
      return ``;
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
      this.$refs.observer.validate().then(valid => {
        if (valid) {
          this.$emit("save", this.members);
          this.members = [];
          this.objectMembers = [];
          setTimeout(() => {
            this.getContacts({page: 0, itemsPerPage: 20});
          }, 300);
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      });
    },
    pushMember(v) {
      let index = this.members.indexOf(this.forProject ? v : v.employeeId);
      if (index > -1) {
        this.members.splice(index, 1);
        this.objectMembers.splice(index, 1);
      } else {
        this.members.unshift(this.forProject ? v : v.employeeId);
        this.objectMembers.unshift(v);
      }
    },
    check(v) {
      let index = this.members.indexOf(this.forProject ? v : v.employeeId);
      if (index > -1) {
        return ["font-weight-bold", "text-primary"];
      } else {
        return false;
      }
    },
    getContacts(v) {
      if (this.application?.applicationTypeInProject === 'NOT_BELONG') {
        return;
      }
      if (this.notIn) {
        let projectId = this.$route.query.id;
        if (projectId) {
          if (v.page == 0) {
            v.page = 1
          }
          crudAndListsService
              .searchListWithKeyword('user', {
                ...v,
                keyword: this.searchValue,
              }, 'inner')
              .then((res) => {
                this.$nextTick(() => {
                  this.contactList = res.data.list;
                });
              })
              .catch(e => {
                console.log(e)
              })
        }
      } else {
        if (v.page == 0) {
          v.page = 1
        }
        crudAndListsService
            .searchListWithKeyword('user', {
              ...v,
              keyword: this.searchValue,
            }, 'inner')
            .then((res) => {
              this.$nextTick(() => {
                this.contactList = res.data.list;
              });
            })
            .catch(e => {
              console.log(e)
            })
      }
    },
    loadMoreContact() {
      if (this.notIn) {
        let projectId = this.$route.query.id;
        if (projectId) {
          EmployeeService.getListByYurDepartmentNotInProj({
            params: {
              page: (this.contactPage += 1),
              itemsPerPage: 20,
            },
            projectId: projectId,
            search: this.searchValue,
          }).then(async ({data}) => {
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
        EmployeeService.getListByYurDepartment({
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
      }
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
    if (this.forProject) {
      // FETCH MAILING_PURPOSE
      crudAndListsService.searchList('before-commission/directory/mailing-purpose', this.var_default_search_payload)
          .then(res => {
            this.mailingPurposes = res.data.list
          })
          .catch(e => {
            console.log(e)
          })
    }
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