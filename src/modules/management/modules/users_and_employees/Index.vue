<template>
  <div class="row">
    <div class="col-md-12 text-center">
      <div class="h4 mb-4 d-inline-block">{{ $t('submodules.users.title') }}</div>
    </div>
    <div class="col-xl-4">
      <div class="card">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <h3 class="card-title mb-0 org-str-title">{{ $t('not_translated.organizational_structure') }}</h3>
          </div>
          <ul v-if="departments.length > 0" style="list-style-type: none;">
            <template v-for="dep in departments">
              <org-str-tree-view
                  @showRefModal="showRefModal"
                  @deleteDep="deleteDepartment"
                  @toggleActiveClass="toggleActiveClass"
                  without-actions
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
              <h5 class="mb-0">{{ selectedDep }}</h5>
            </div>
            <div class="col-sm-4">
              <div class="text-center">
                <h4>
                  {{activeTab === 'employees' ? $t('submodules.employees.title') : $t('submodules.users.title')}}
                </h4>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="text-sm-end">
                <b-btn
                    type="button"
                    class="btn btn-success btn-rounded mb-2 me-2"
                    :to="activeTab === 'employees' ? {name: 'CreateEmployee'} : {name: 'CreateUser'}"
                >
                  <i class="mdi mdi-plus me-1"></i> {{ $t('actions.add') }}
                </b-btn>
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
                    style="max-height: 50vh; overflow: auto;"
                    active
                    @click="fetchItemsByActiveTab('employees')"
                >
                  <template v-slot:title>
                    <span class="d-inline-block d-sm-none">
                        <i class="fas fa-home"></i>
                    </span>
                    <span class="d-none d-sm-inline-block">{{ $t('submodules.employees.title') }}</span>
                  </template>
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
                    <template #cell(index)="data">
                      {{ util_paginate(data.index, searchPayloadEmployees.page, searchPayloadEmployees.itemsPerPage) }}
                    </template>
                    <template #cell(fullName)="data">
                      {{ data.item.lastName }} {{ data.item.firstName }}
                      {{ data.item.middleName ? data.item.middleName : '' }}
                    </template>
                    <template #cell(positionName)="data">
                      <div class="d-flex justify-content-between">
                        <span>
                          {{
                            getName({
                              nameRu: data.item.directoryPositionNameRu,
                              nameLt: data.item.directoryPositionNameLt,
                              nameUz: data.item.directoryPositionNameUz,
                            })
                          }}
                        </span>
                      </div>
                    </template>
                    <template #cell(departmentName)="data">
                      <div class="d-flex justify-content-between">
                        <span>
                          {{
                            getName({
                              nameRu: data.item.departmentNameRu,
                              nameLt: data.item.departmentNameLt,
                              nameUz: data.item.departmentNameUz,
                            })
                          }}
                        </span>
                      </div>
                    </template>
                    <template #cell(status)="data">
                      <p class="mb-0" style="font-size: .95rem;">
                        <span :class="['badge', data.item.statusNameEn === 'ACTIVE' ? 'bg-success' :
                                                data.item.statusNameEn === 'DELETED' ? 'bg-danger' : 'bg-info']">
                          {{
                            getName({
                              nameRu: data.item.statusNameRu,
                              nameLt: data.item.statusNameLt,
                              nameUz: data.item.statusNameUz,
                            })
                          }}
                        </span>
                      </p>
                    </template>
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
                    <template #empty="">
                      <h4 class="text-center">{{ activeDep.id ? $t('not_found') : $t('choose_department') }}</h4>
                    </template>
                    <template #table-busy>
                      <div class="text-center my-2">
                        <b-spinner
                            variant="primary"
                            class="align-middle"
                        ></b-spinner>
                      </div>
                    </template>
                  </b-table>
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
                    <span class="d-none d-sm-inline-block">{{ $t('submodules.users.title') }}</span>
                  </template>
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
                    <template #cell(index)="data">
                      {{ util_paginate(data.index, searchPayloadUsers.page, searchPayloadUsers.itemsPerPage) }}
                    </template>
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
                    <template #cell(status)="data">
                      <p class="mb-0" style="font-size: .95rem;" >
                        <span :class="['badge', data.item.statusUz === 'ACTIVE' ? 'bg-success' :
                                                data.item.statusUz === 'DELETED' ? 'bg-danger' : 'bg-info']">
                          {{
                            getName({
                              nameRu: data.item.statusRu,
                              nameLt: data.item.statusLt,
                              nameUz: data.item.statusUz,
                            })
                          }}
                        </span>
                      </p>
                    </template>
                    <template #cell(actions)="data">
                      <div
                          v-if="data.item.id !== currentUserId"
                          class="general-table__actions d-flex justify-content-center"
                      >
                        <b-btn
                            v-if="data.item.statusUz !== 'DELETED'"
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
                            v-if="data.item.statusUz !== 'DELETED'"
                            variant="link"
                            class="text-decoration-none p-0"
                            style="font-size: 1.2rem; margin-right: 1rem;"
                        >
                          <i
                              @click="updateDepPerms(data.item)"
                              class="mdi mdi-office-building edit"
                          ></i>
                        </b-btn>
                        <b-btn
                            v-if="data.item.statusUz !== 'DELETED'"
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
                    <template #empty="">
                      <h4 class="text-center">{{ activeDep.id ? $t('not_found') : $t('choose_department') }}</h4>
                    </template>
                    <template #table-busy>
                      <div class="text-center my-2">
                        <b-spinner
                            variant="primary"
                            class="align-middle"
                        ></b-spinner>
                      </div>
                    </template>
                  </b-table>
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
          </div>
        </div>
      </div>
    </div>
  </div>
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
      currentUserId: TokenService.getUserId(),
      title: "Users and Employees",
      selectedDep: '',
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
      if (this.activeTabIndex === 0) {
        return 'employees'
      } else if (this.activeTabIndex === 1) {
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
    getActiveTabIndexByTabName(tabName){
      if (tabName === 'employees') {
        return 0;
      } else if (tabName === 'users') {
        return 1;
      }
      return 0;
    },
    updateDepPerms(user) {
      this.$router.push({
        name: 'UpdateUserPermissionsToDepartments',
        params: {id: user.id},
        query: {name: user.employeeFullName}
      })
    },
    async fetchDepartments() {
      await crudAndListsService.searchList('department', this.var_default_search_payload, null, true)
          .then(res => {
            this.departments = []
            if (res.data.id) {
              this.departments.push(res.data)
            }
          })
          .catch(e => {
            console.log(e)
          })
    },
    deleteItem(id, tabName = this.activeTab) {
      this.$bvModal.msgBoxConfirm('Are you sure?', {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(value => {
            if (value) {
              if (tabName === 'employees') {
                crudAndListsService
                    .deleteById(MAIN_API_URL_EMPLOYEES, id)
                    .then((res) => {
                      this.fetchItemsByActiveTab()
                    })
                    .catch(e => {
                      console.log(e)
                    })
              } else if (tabName === 'users') {
                crudAndListsService
                    .deleteById(MAIN_API_URL_USERS, id)
                    .then((res) => {
                      if (this.userInfo.id === id) {
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
      this.$router.push(tabName === 'users' ?
          {name: 'UpdateUser', params: {id: id}} :
          tabName === 'employees' ?
              {name: 'UpdateEmployee', params: {id: id}} :
              this.$toast('Илтимос табни қайта босинг ва яна уриниб кўринг', {type: 'info'}))
    },
    async fetchItemsByActiveTab(tab = this.activeTab) {
      this.urlPushState({
        't': tab
      })
      if (this.activeDep.id) {
        if (tab === 'employees') {
          this.loadingTableItems = true
          let searchPayload = this.searchPayloadEmployees;
          this.employees = [];
          this.totalEmployees = 0
          await helperService
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
        } else if (tab === 'users') {
          this.loadingTableItems = true
          let payload = {
            data: this.searchPayloadUsers,
            depId: this.activeDep.id,
          };
          this.users = [];
          this.totalUsers = 0
          await crudAndListsService
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
      }
    },
    async giveActiveClassToDep(treeArr, activeId, step = 0, parents = {}) {
      for (const el of treeArr) {
        if (el.id === activeId) {
          document.getElementById(`depId-${activeId}`).classList.add('active')
        } else {
          document.getElementById(`depId-${el.id}`).classList.remove('active')
          if (el.children && el.children.length > 0) {
            await this.giveActiveClassToDep(el.children, activeId, step, parents);
          }
        }
      }
    },
    showRefModal() {

    },
    deleteDepartment() {

    },
    async toggleActiveClass(activeDep) {
      if (!activeDep) {
        activeDep = await this.findDepartmentById(this.$route.query.d, null, true)
      }
      if (parseInt(this.$route.query.d) !== activeDep.id) {
        await this.urlPushState({
          'd': activeDep.id
        })
      }
      this.activeDep = Object.assign({}, activeDep)
      await this.giveActiveClassToDep(this.departments, activeDep.id)
      this.selectedDep = activeDep.nameUz
      this.openDepartmentTreeStyle(activeDep)
    },
    async openDepartmentTreeStyle(activeDep){
      if (!activeDep.parentId) {
        return false;
      }
      const parent = await this.findDepartmentById(activeDep.parentId, null, true)
      await this.openDepartmentTreeStyle(parent)
      const self = document.getElementById(`dep-toggle-icon-id-${activeDep.id}`)
      if (self) {
        self.click();
      }
    },
    async findDepartmentById(id, children = null, activate = true) {
      if (!this.departments) {
        await this.fetchDepartments()
      }
      if (typeof id === 'string') {
        id = parseInt(id)
      }
      if (!children) {
        children = this.departments
      }
      for (const el of children) {
        if (el.id === id) {
          return el
        }
        if (el.children && el.children.length > 0) {
          const res = await this.findDepartmentById(id, el.children)
          if (res) {
            return res
          }
        }
      }
    },
  },
  async created() {
    await this.fetchDepartments()
    this.searchPayloadEmployees = Object.assign({}, this.var_default_search_payload)
    this.searchPayloadUsers = Object.assign({}, this.var_default_search_payload)
    if (this.$route.query.d) {
      const dep = await this.findDepartmentById(this.$route.query.d)
      await this.toggleActiveClass(dep)
      if (this.$route.query.t) {
        this.activeTabIndex = this.getActiveTabIndexByTabName(this.$route.query.t);
        await this.fetchItemsByActiveTab(this.$route.query.t)
      }
    }
  },
  watch: {
    activeDep: {
      deep: true,
      handler() {
        this.fetchItemsByActiveTab(this.$route.query.t);
      },
    },
  }
};
</script>
<style scoped lang='scss'>
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

.max-height-40 {
  max-height: 40vh;
}

.max-height-40 {
  max-height: 40vh;
}

.dep-name {
  display: inline-block;
  margin: 0;
}

::v-deep .org-str-actions {
  visibility: hidden;
}

::v-deep li > div {
  &:hover {
    .org-str-actions {
      visibility: visible !important;
      @media (max-width: 568px) {
        display: flex !important;
      }
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

.org-str-title {
  font-size: 1.2rem;
}
</style>