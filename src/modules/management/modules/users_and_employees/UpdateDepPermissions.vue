<template>
  <base-create-or-update-wrapper
      @save="save"
      has-save-suspend
      :custom-title="$t('column.employee') + ' ' + ($route.query.name ? $route.query.name : '')"
  >
    <div class="row">
      <!-- <div class="col-xl-6">
      <div class="card">
          <div class="card-body">
              <div class="d-flex align-items-center justify-content-between mb-4">
                  <h3 class="card-title mb-0 org-str-title">Ташкилий тузилма</h3>
              </div>
              <ul
                  v-if="departments.length > 0"
                  style="list-style-type: none;"
              >
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
          </div>
      </div>
  </div> -->

      <div class="col-xl-12">
        <div class="card overflow-auto">
          <ul
              v-if="departments.length > 0"
              class="px-0 list-unstyled"
              style="min-width: 1400px;"
          >
            <template v-for="(dep, index) in departments">
              <org-str-tree-view-with-checkboxes
                  :allDepPermTypes="depPermTypes"
                  class="item"
                  :key="dep.id + 'dep' + index"
                  :department-for-tree="dep"
              />
            </template>
          </ul>
          <template v-else>
            <h5>Ҳозирча бўлинмалар қўшилмаган</h5>
          </template>
          <!-- TREE VIEW -->
        </div>
        <!-- end card-body -->
      </div>
      <!-- end card -->
    </div>
    <!-- end col -->
  </base-create-or-update-wrapper>
</template>

<script>
import {mapState} from 'vuex'
import {TokenService} from '@/shared/services/storage.service'
import appConfig from "@/app.config";
// import OrgStrTreeView from '@/modules/management/components/OrgStrTreeView.vue'
import helperService from '@/shared/services/helper.service'
import OrgStrTreeViewWithCheckboxes from '@/modules/management/components/OrgStrTreeViewWithCheckboxes.vue';

const MAIN_API_URL = 'department/save/permitted/by-user-id/for-dep-perm-control'
export default {
  name: 'UpdateDepPermissions',
  page: {
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {
    OrgStrTreeViewWithCheckboxes
  },
  data() {
    return {
      depPermTypes: [],
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
    save() {
      helperService.savePermittedDepsByUserId(this.$route.params.id, this.departments[0], true)
          .then(res => {
            this.$router.go(-1)
            this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
          })
          .catch(e => console.log(e))
    },
    fetchDepartments() {
      helperService.fetchControlPermittedDepsByUser(this.$route.params.id, true)
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
    /* deleteItem (id, tabName = this.activeTab) {
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
    }, */
    editItem(id, tabName = this.activeTab) {
      this.$router.push(tabName == 'users' ?
          {name: 'UpdateUser', params: {id: id}} :
          tabName == 'employees' ?
              {name: 'UpdateEmployee', params: {id: id}} :
              this.$toast('Илтимос табни қайта босинг ва яна уриниб кўринг', {type: 'info'}))
    },
    /* fetchItemsByActiveTab (tab = this.activeTab) {
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
        }
    }, */
    /* giveActiveClassToDep (treeArr, activeId) {
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
    }, */
    /* showRefModal () {
        console.log('showRefmodal')
    },
    deleteDepartment () {
        console.log('del dep')
    }, */
    /* toggleActiveClass (activeDep) {
        this.activeDep = Object.assign({}, activeDep)
        this.giveActiveClassToDep(this.departments, activeDep.id)
        this.selectedDep = activeDep.nameUz
    } */
  },
  /*
  CREATED */
  async created() {
    // AGAR FOYDALANUVCHI O'ZINI O'ZI TAHRIRLAMOQCHI BO'LSA, BITTA OLDINGI SAHIFAGA YO'NALTIRVOR
    if (this.$route.params.id == TokenService.getUserId()) {
      this.$router.go(-1)
    }
    await this.fetchDepartments()
    // GET DEPARTMENT_PERMISSION_TYPES
    await helperService.getRefByCode('department_permission_type', true)
        .then(res => {
          this.depPermTypes = res.data.children
        })
        .catch(e => {
          console.log(e)
        })
    // PAGINATION_PAYLOAD
    this.searchPayloadEmployees = Object.assign({}, this.var_default_search_payload)
    this.searchPayloadUsers = Object.assign({}, this.var_default_search_payload)
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
    // padding-left: -1.7em !important;
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

/* ::v-deep .org-str-actions {
    visibility: hidden;
    display: inline-block;
} */

::v-deep li > div {
  &:hover {
    .org-str-actions {
      // display: inline-block !important;
      // visibility: visible !important;
      @media (max-width: 568px) {
        // display: flex !important;
      }
      // margin: 0;
    }
  }
}

::v-deep li div div:first-child,
.add,
.delete,
.edit {
  // display: inline-block;
  margin: 3px 0;
  // cursor: pointer;
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