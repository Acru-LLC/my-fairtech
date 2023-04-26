<template>
  <div class="row">
    <div class="col-md-12 text-center">
      <div class="h4 mb-4 d-inline-block">{{ $t('submodules.users.outer_users_title') }}</div>
    </div>
    <div class="col-xl-4">
      <div class="card">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <h3 class="card-title mb-0 org-str-title">{{ $t('not_translated.organizational_structure') }}</h3>
          </div>

          <!-- TREE VIEW -->
          <ul
              v-if="departments.length > 0"
              style="list-style-type: none;"
          >
            <template v-for="dep in departments">
              <org-str-tree-view
                  @deleteClicked="deleteOuterDepartment"
                  @toggleActiveClass="toggleActiveClass"
                  without-add-action
                  without-edit-action
                  class="item"
                  :key="dep.id + 'dep'"
                  :department-for-tree="dep"
              >
              </org-str-tree-view>
            </template>
          </ul>
          <template v-else>
            <h5>Ҳозирча бўлинмалар қўшилмаган</h5>
          </template>
          <!-- TREE VIEW -->
        </div>
      </div>
    </div>

    <div class="col-xl-8">
      <div class="card fixed-user-employee-list-card">
        <div class="card-body">
          <div class="row mb-2">
            <div class="col-sm-4">
            </div>
            <div class="col-sm-4">
              <div class="text-center">
                <h4>{{
                    activeTab == 'employees' ? $t('submodules.employees.personal_info') : $t('submodules.users.outer_users_title')
                  }}</h4>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="text-sm-end">
                <!-- <b-btn
                    type="button"
                    class="btn btn-success btn-rounded mb-2 me-2"
                    :to="activeTab == 'employees' ? {name: 'CreateOuterEmployee'} : {name: 'CreateOuterUser'}"
                >
                  <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add') }}
                </b-btn> -->
              </div>
            </div>
            <div class="col-12">
              <b-tabs
                  v-model="activeTabIndex"
                  justified
                  nav-class="nav-tabs-custom"
                  content-class="p-3 text-muted"
              >
                <b-tab
                    active
                    @click="fetchItemsByActiveTab('employees')"
                    style="max-height: 50vh; overflow: auto;"
                >
                  <!-- EMPLOYEES LIST -->

                  <template v-slot:title>
                                        <span class="d-inline-block d-sm-none">
                                            <i class="fas fa-home"></i>
                                        </span>
                    <span class="d-none d-sm-inline-block">{{ $t('submodules.employees.personal_info') }}</span>
                  </template>
                  <!-- Table data -->
                  <b-table
                      :items="employees"
                      :fields="employeeHeaders"
                      :busy.sync="loadingTableItems"
                      sticky-header="sticky-header"
                      id="employees-table"
                      class="custom-b-table max-height-40"
                      responsive
                      striped
                      bordered
                      small
                      hover
                      show-empty
                  >
                    <!-- NUMBER OF ITEM -->
                    <template #cell(index)="data">
                      {{ util_paginate(data.index, searchPayloadEmployees.page, searchPayloadEmployees.itemsPerPage) }}
                    </template>

                    <!-- NAME -->
                    <template #cell(fullName)="data">
                      {{ data.item.firstName }} {{ data.item.lastName }}
                      {{ data.item.middleName ? data.item.middleName : '' }}
                    </template>

                    <!-- SIZE -->
                    <template #cell(status)="data">
                      <!-- <div class="d-flex justify-content-between">
          <p
              class="mb-0"
              style="flex-basis: 0; flex-grow: 1;"
          ><span class="badge bg-primary">ЎЗ</span> : <span> {{ data.item.statusNameUz }}</span></p>
          <p
              class="mb-0"
              style="flex-basis: 0; flex-grow: 1;"
          ><span class="badge bg-primary">O'Z</span> : <span> {{ data.item.statusNameLt }}</span></p>
          <p
              class="mb-0"
              style="flex-basis: 0; flex-grow: 1;"
          ><span class="badge bg-primary">РУ</span> : <span> {{ data.item.statusNameRu }}</span></p>
      </div> -->
                      {{ data.item.statusNameUz }}
                    </template>

                    <!-- ACTIONS -->
                    <template #cell(actions)="data">
                      <div class="general-table__actions d-flex justify-content-center">
                        <b-btn
                            variant="link"
                            class="text-decoration-none p-0"
                            style="font-size: 1.2rem; margin-right: 1rem;"
                        >
                          <i
                              @click="editItem(data.item.id, 'employees')"
                              class="mdi mdi-circle-edit-outline edit"
                          ></i>
                        </b-btn>

                        <b-btn
                            variant="link"
                            class="text-decoration-none p-0 text-danger"
                            style="font-size: 1.2rem;"
                        >
                          <i
                              @click="deleteItem(data.item.id, 'employees')"
                              class="mdi mdi-trash-can delete"
                          ></i>
                        </b-btn>
                      </div>
                    </template>

                    <!-- EMPTY SLOT -->
                    <template #empty="">
                      <h4 class="text-center">{{ activeDep.id ? $t('not_found') : $t('choose_department') }}</h4>
                    </template>

                    <!-- TABLE_BUSY SLOT -->
                    <template #table-busy>
                      <div class="text-center my-2">
                        <b-spinner variant="primary" class="align-middle"></b-spinner>

                      </div>
                    </template>
                  </b-table>

                  <!-- end table -->
                  <b-pagination
                      v-model="searchPayloadEmployees.page"
                      :total-rows="totalEmployees"
                      :per-page="searchPayloadEmployees.itemsPerPage"
                      aria-controls="my-table"
                      class="justify-content-end"
                  ></b-pagination>
                </b-tab>
                <b-tab @click="fetchItemsByActiveTab('users')" style="max-height: 50vh; overflow: auto;">
                  <template v-slot:title>
                                        <span class="d-inline-block d-sm-none">
                                            <i class="far fa-user"></i>
                                        </span>
                    <span class="d-none d-sm-inline-block">{{ $t('submodules.users.outer_users_title') }}</span>
                  </template>
                  <!-- Table data -->
                  <b-table
                      :items="users"
                      :fields="userHeaders"
                      :busy.sync="loadingTableItems"
                      id="users-table"
                      class="custom-b-table"
                      responsive
                      striped
                      bordered
                      small
                      hover
                      show-empty
                  >
                    <!-- NUMBER OF ITEM -->
                    <template #cell(index)="data">
                      {{ util_paginate(data.index, searchPayloadUsers.page, searchPayloadUsers.itemsPerPage) }}
                    </template>

                    <!-- NAME -->
                    <template #cell(roleNames)="data">
                      <div class="d-flex justify-content-between">
                        <p
                            v-for="(role, index) in data.item.roleNames"
                            :key="`${role}-${index}`"
                            class="mb-0"
                            style="flex-basis: 0; flex-grow: 1; font-size: .95rem;"
                        ><span class="badge bg-primary badge-pill">{{ role }}</span></p>
                      </div>
                    </template>

                    <!-- SIZE -->
                    <template #cell(status)="data">
                      <p
                          class="mb-0"
                          style="font-size: .95rem;"
                      ><span
                          :class="['badge', data.item.statusUz == 'ACTIVE' ? 'bg-success' : data.item.statusUz == 'DELETED' ? 'bg-danger' : 'bg-info']">{{
                          data.item.statusUz
                        }}</span></p>
                    </template>

                    <!-- ACTIONS -->
                    <template #cell(actions)="data">
                      <div class="general-table__actions d-flex justify-content-center">
                        <b-btn
                            v-if="data.item.statusUz != 'DELETED'"
                            variant="link"
                            class="text-decoration-none p-0"
                            style="font-size: 1.2rem; margin-right: 1rem;"
                        >
                          <i
                              @click="editItem(data.item.id, 'users')"
                              class="mdi mdi-circle-edit-outline edit"
                          ></i>
                        </b-btn>

                        <b-btn
                            v-if="data.item.statusUz != 'DELETED'"
                            variant="link"
                            class="text-decoration-none p-0 text-danger"
                            style="font-size: 1.2rem;"
                        >
                          <i
                              @click="deleteItem(data.item.id, 'users')"
                              class="mdi mdi-trash-can delete"
                          ></i>
                        </b-btn>
                      </div>
                    </template>

                    <!-- EMPTY SLOT -->
                    <template #empty="">
                      <h4 class="text-center">{{ activeDep.id ? $t('not_found') : $t('choose_department') }}</h4>
                    </template>

                    <!-- TABLE_BUSY SLOT -->
                    <template #table-busy>
                      <div class="text-center my-2">
                        <b-spinner variant="primary" class="align-middle"></b-spinner>

                      </div>
                    </template>
                  </b-table>

                  <!-- end table -->
                  <b-pagination
                      v-model="searchPayloadUsers.page"
                      :total-rows="totalUsers"
                      :per-page="searchPayloadUsers.itemsPerPage"
                      aria-controls="my-table"
                      class="justify-content-end"
                  ></b-pagination>
                </b-tab>
              </b-tabs>
            </div>
            <!-- end col-->
          </div>
        </div>
        <!-- end card-body -->
      </div>
      <!-- end card -->
    </div>
    <!-- end col -->
  </div>
  <!-- end row -->
</template>

<script>
import {mapState} from 'vuex'
import {TokenService} from '@/shared/services/storage.service'
import appConfig from "@/app.config";
import OrgStrTreeView from '@/modules/management/components/OrgStrTreeView.vue'
import crudAndListsService from '@/shared/services/crud_and_list.service'
import helperService from '@/shared/services/helper.service'

const MAIN_API_URL_USERS = 'user'
const MAIN_API_URL_EMPLOYEES = 'employee'
export default {
  page: {
    title: "Users and Employees",
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {
    OrgStrTreeView
  },
  data() {
    return {
      title: "Users and Employees",
      activeDep: {},
      loadingTableItems: false,
      activeTabIndex: 0,
      departments: [],
      users: [],
      totalUsers: 0,
      employees: [],
      totalEmployees: 0,
      searchPayloadEmployees: {},
      searchPayloadUsers: {}
    };
  },
  /*
  COMPUTED */
  computed: {
    ...mapState('managementUsersAndEmployees', ['userHeaders', 'employeeHeaders']),
    activeTab() {
      if (this.activeTabIndex == 0) {
        return 'employees'
      } else if (this.activeTabIndex == 1) {
        return 'users'
      } else {
        return ''
      }
    },
    userInfo() {
      return TokenService.getUserInfo()
    }
  },
  methods: {
    fetchDepartments() {
      crudAndListsService.searchList('department', this.var_default_search_payload, 'by-contractor', true)
          .then(res => {
            this.departments = res.data
          })
          .catch(e => {
            console.log(e)
          })
    },
    deleteOuterDepartment(dep) {
      if (dep.id) {
        this.$bvModal.msgBoxConfirm(<h5>{this.$t('messages.delete_title')} <b>({dep.shortName})</b></h5>, {
          okTitle: this.$t('actions.confirm'),
          cancelTitle: this.$t('actions.cancel')
        })
            .then(value => {
              if (value) {
                crudAndListsService
                    .deleteById('department', dep.id)
                    .then((res) => {
                      this.fetchDepartments()
                      if (dep.id == this.activeDep.id) {
                        this.activeDep = Object.assign({}, {})
                      }
                    })
                    .catch(e => {
                      console.log(e)
                    })
              }
            })
            .catch(err => {
              // An error occurred
            })
      }
    },
    deleteItem(id, tabName = this.activeTab) {
      this.$bvModal.msgBoxConfirm('Are you sure?', {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(value => {
            if (value) {
              if (tabName == 'employees') {
                crudAndListsService
                    .deleteById(MAIN_API_URL_EMPLOYEES, id)
                    .then((res) => {
                      this.fetchItemsByActiveTab()
                    })
                    .catch(e => {
                      console.log(e)
                    })
              } else if (tabName == 'users') {
                crudAndListsService
                    .deleteById(MAIN_API_URL_USERS, id)
                    .then((res) => {
                      if (this.userInfo.id == id) {
                        this.$store.dispatch('auth/logout')
                      }
                      this.fetchItemsByActiveTab()
                    })
                    .catch(e => {
                      console.log(e)
                    })
              }
            }
          })
          .catch(err => {
            // An error occurred
          })
    },
    editItem(id, tabName = this.activeTab) {
      this.$router.push(tabName == 'users' ?
          {name: 'UpdateOuterUser', params: {id: id}} :
          tabName == 'employees' ?
              {name: 'UpdateOuterEmployee', params: {id: id}} :
              this.$toast('Илтимос табни қайта босинг ва яна уриниб кўринг', {type: 'info'}))
    },
    fetchItemsByActiveTab(tab = this.activeTab) {
      if (this.activeDep.id) {
        if (tab == 'employees') {
          this.loadingTableItems = true
          let searchPayload = this.searchPayloadEmployees;
          this.employees = [];
          this.totalEmployees = 0
          helperService
              .searchEmployeesByDep(
                  searchPayload,
                  this.activeDep.id
              )
              .then((res) => {
                this.employees = res.data.list;
                this.totalEmployees = res.data.total
              })
              .catch(e => {
                console.log(e)
              })
              .finally(() => {
                this.loadingTableItems = false
              });
        } else if (tab == 'users') {
          this.loadingTableItems = true
          let payload = {
            data: this.searchPayloadUsers,
            depId: this.activeDep.id,
          };
          this.users = [];
          this.totalUsers = 0
          crudAndListsService
              .searchByDepId(MAIN_API_URL_USERS, payload)
              .then((res) => {
                this.users = res.data.list;
                this.totalUsers = res.data.total
              })
              .catch(e => {
                console.log(e)
              })
              .finally(() => {
                this.loadingTableItems = false
              });
        }
      } else {
        /* if (tab == 'employees') {
          this.loadingTableItems = true
          let searchPayload = this.searchPayloadEmployees;
          this.employees = [];
          helperService
              .searchEmployeesWithoutDep(
                  searchPayload,
              )
              .then((res) => {
                this.employees = res.data;
              })
              .catch(e => {
                console.log(e)
              })
              .finally(() => {
                this.loadingTableItems = false
              });
        } else if (tab == 'users') {
          this.loadingTableItems = true
          let payload = {
            data: this.searchPayloadUsers,
          };
          this.users = [];
          crudAndListsService
              .searchWithoutDep(MAIN_API_URL_USERS, payload)
              .then((res) => {
                this.users = res.data;
              })
              .catch(e => {
                console.log(e)
              })
              .finally(() => {
                this.loadingTableItems = false
              });
        } */
      }
    },
    giveActiveClassToDep(treeArr, activeId) {
      for (var el of treeArr) {
        if (el.id == activeId) {
          document.getElementById(`depId-${activeId}`).classList.add('active')
        } else {
          document.getElementById(`depId-${el.id}`).classList.remove('active')
        }
        if (el.children && el.children.length > 0) {
          this.giveActiveClassToDep(el.children, activeId);
        }
      }
    },
    showRefModal() {
    },
    toggleActiveClass(activeDep) {
      this.activeDep = Object.assign({}, activeDep)
      this.giveActiveClassToDep(this.departments, activeDep.id)
    }
  },
  /*
  CREATED */
  async created() {
    await this.fetchItemsByActiveTab()
    await this.fetchDepartments()
    // PAGINATION_PAYLOAD
    this.searchPayloadEmployees = Object.assign({}, this.var_default_search_payload)
    this.searchPayloadUsers = Object.assign({}, this.var_default_search_payload)
  },
  /*
  WATCH */
  watch: {
    activeDep: {
      deep: true,
      handler() {
        this.fetchItemsByActiveTab();
      },
    },
  }
};
</script>

<style scoped lang='scss'>
// STYLE FROM TREE COMPONENT BEGIN
.hoverable {
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .org-str-actions {
    display: flex;
    min-width: 20%;
    align-items: center;

    .btn {
      line-height: 1;

      &:focus {
        outline: none !important;
        box-shadow: none;
      }
    }

    i {
      font-size: 1.3rem;
    }
  }
}

.dep-name {
  display: inline-block;
  margin: 0;
}

.max-height-40 {
  max-height: 40vh;
}

::v-deep .org-str-actions {
  visibility: hidden;
  // display: inline-block;
}

::v-deep li > div {
  &:hover {
    .org-str-actions {
      // display: inline-block !important;
      visibility: visible !important;
      @media (max-width: 568px) {
        display: flex !important;
      }
      // margin: 0;
    }
  }
}

::v-deep li div div:first-child,
.add,
.delete,
.edit {
  display: inline-block;
  margin: 6px 0;
  cursor: pointer;
}

::v-deep li div {
  &:hover {
    p {
      text-decoration: underline;
    }
  }
}

::v-deep li .active {
  font-weight: bold;
}

.mdi {
  margin-right: 0.8em;
}

.building-icon {
  color: #f0d45f;
  font-size: 1.5rem;
  cursor: pointer;

  .mdi-office-building-outline {
    font-size: 1.4rem;
  }
}

// STYLE FROM TREE COMPONENT END

/* .org-str-actions {
    display: flex;
    min-width: 20%;
    justify-content: space-between;
    .btn {
        line-height: 1;
        &:focus {
            outline: none !important;
            box-shadow: none;
        }
    }
    i {
        font-size: 1.3rem;
    }
} */
.org-str-title {
  font-size: 1.2rem;
}
</style>
