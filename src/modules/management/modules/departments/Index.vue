<template>
  <div class="row">
    <div class="col-md-12 text-center">
      <div class="h4 mb-4 d-inline-block">{{ $t('submodules.organisation_structure.title') }}</div>
    </div>
    <div class="col-xl-5">
      <div class="card">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <h3 class="card-title mb-0 org-str-title">{{ $t('not_translated.organizational_structure') }}</h3>
            <!-- ACTIONS -->
            <!-- <div class="org-str-actions">
                <b-btn
                    variant="link"
                    class="text-decoration-none p-0"
                    :to="{name: 'CreateDepartment'}"
                >
                    <i class="mdi mdi-plus-circle add"></i>
                </b-btn>

                <b-btn
                    variant="link"
                    class="text-decoration-none p-0"
                >
                    <i
                        @click="editItem"
                        class="mdi mdi-circle-edit-outline edit"
                    ></i>
                </b-btn>

                <b-btn
                    variant="link"
                    class="text-decoration-none p-0"
                >
                    <i
                        @click="deleteItem"
                        class="mdi mdi-trash-can delete"
                    ></i>
                </b-btn>
            </div> -->
          </div>

          <!-- TREE VIEW -->
          <ul
              v-if="departments.length > 0"
              style="list-style-type: none; padding-left: 0;"
          >
            <template v-for="dep in departments">
              <org-str-tree-view
                  @addClicked="toggleDepTypeModalAndSetCurrentDep($event, true)"
                  @editClicked="editItem"
                  @deleteClicked="deleteItem"
                  @toggleActiveClass="toggleActiveClass"
                  class="item"
                  :key="dep.id + 'dep'"
                  :department-for-tree="dep"
              >
              </org-str-tree-view>
            </template>
          </ul>
          <template v-else>
            <h5>{{ $t('not_translated.not_added_sections') }}</h5>
            <p>{{ $t('not_translated.added_button') }}</p>
          </template>
          <!-- TREE VIEW -->
        </div>
      </div>
    </div>
    <div class="col-xl-7">
      <div class="card fixed-dep-info-card">
        <div class="card-body">
          <h3 class="card-title mb-4 org-str-title">
            {{
              activeDep.departmentDto.id ? getName({
                nameUz: activeDep.departmentDto.nameUz,
                nameLt: activeDep.departmentDto.nameLt,
                namaRu: activeDep.departmentDto.nameRu
              }) : $t('not_translated.selected_divide_info')
            }}</h3>
          <!-- SELECTED DEPARTMENT DETAILS -->
          <b-table-simple
              v-if="activeDep.departmentDto.id"
              hover
              small
              caption-top
              responsive
          >
            <b-tbody>
              <b-tr>
                <b-th scope="row">{{ $t('column.code') }}:</b-th>
                <b-td>{{ activeDep.departmentDto.code }}</b-td>
                <b-th scope="row">{{ $t('column.parent_department') }}:</b-th>
                <b-td>{{ activeDep.departmentDto.parentNameUz }}</b-td>
              </b-tr>
              <b-tr>
                <b-th scope="row">{{ $t('column.full_name') }}:</b-th>
                <b-td>{{ activeDep.departmentDto.nameUz }}</b-td>
                <b-th scope="row">{{ $t('column.short_name') }}:</b-th>
                <b-td>{{ activeDep.departmentDto.shortName }}</b-td>
              </b-tr>
              <b-tr>
                <b-th scope="row">{{ $t('column.curator') }}:</b-th>
                <b-td>{{
                    getName({
                      nameRu: activeDep.departmentDto.curatorNameRu,
                      nameLt: activeDep.departmentDto.curatorNameLt,
                      nameUz: activeDep.departmentDto.curatorNameUz,
                    })
                  }}
                </b-td>
                <b-th scope="row">{{ $t('column.status') }}:</b-th>
                <b-td>{{
                    getName({
                      nameRu: activeDep.departmentDto.statusNameRu,
                      nameLt: activeDep.departmentDto.statusNameLt,
                      nameUz: activeDep.departmentDto.statusNameUz,
                    })
                  }}
                </b-td>
              </b-tr>
              <b-tr>
                <b-th scope="row">{{ $t('submodules.department_types.title') }}:</b-th>
                <b-td>{{
                    getName({
                      nameRu: activeDep.departmentDto.typeNameRu,
                      nameLt: activeDep.departmentDto.typeNameLt,
                      nameUz: activeDep.departmentDto.typeNameUz,
                    })
                  }}
                </b-td>
                <b-th
                    v-if="isLegal"
                    scope="row"
                >{{ $t('column.inn') }}:
                </b-th>
                <b-td v-if="isLegal">{{ activeDep.contractorDto.inn }}</b-td>
              </b-tr>
              <b-tr v-if="isLegal">
                <b-th scope="row">{{ $t('column.director') }}:</b-th>
                <b-td>{{ activeDep.contractorDto.director }}</b-td>
                <b-th scope="row">{{ $t('column.accounter') }}:</b-th>
                <b-td>{{ activeDep.contractorDto.accounter }}</b-td>
              </b-tr>
              <b-tr v-if="isLegal">
                <b-th scope="row">{{ $t('column.oked') }}:</b-th>
                <b-td>{{ activeDep.contractorDto.oked }}</b-td>
                <b-th scope="row">{{ $t('column.vat_code') }}:</b-th>
                <b-td>{{ activeDep.contractorDto.vatCode }}</b-td>
              </b-tr>
              <b-tr v-if="isLegal">
                <b-th scope="row">{{ $t('column.region') }}:</b-th>
                <b-td>{{
                    getName({
                      nameRu: activeDep.contractorDto.addressDto.regionNameRu,
                      nameLt: activeDep.contractorDto.addressDto.regionNameLt,
                      nameUz: activeDep.contractorDto.addressDto.regionNameUz,
                    })
                  }}
                </b-td>
                <b-th scope="row">{{ $t('column.district') }}:</b-th>
                <b-td>{{
                    getName({
                      nameRu: activeDep.contractorDto.addressDto.districtNameRu,
                      nameLt: activeDep.contractorDto.addressDto.districtNameLt,
                      nameUz: activeDep.contractorDto.addressDto.districtNameUz,
                    })
                  }}
                </b-td>
              </b-tr>
              <b-tr v-if="isLegal">
                <b-th scope="row">{{ $t('column.address') }}:</b-th>
                <b-td>{{ activeDep.contractorDto.address }}</b-td>
                <b-th scope="row">{{ $t('column.mobile_number') }}:</b-th>
                <b-td>{{ activeDep.contractorDto.mobileNumber }}</b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
          <h5 v-else>
            {{ $t('not_translated.selected_section') }}
          </h5>
        </div>
      </div>
      <!-- end card -->
    </div>

    <!-- SELECT DEPARTMENT TYPE TO CREATE OR UPDATE -->
    <b-modal
        v-model="depTypeModal"
        id="create-update-modal-id"
        size="lg"
        title="Қандай бўлинма яратишни ҳоҳлайсиз"
        hide-header
        title-class="font-18"
        ok-only
        ok-variant="success"
        :ok-title="$t('actions.continue')"
        @ok="createDepByDepType"
        no-stacking
    >
      <b-row>
        <b-col
            xs="12"
            cols="6"
        >
          <b-card
              id="legalDepartmentCard"
              @click="selectedDepType = 'legal'"
              :bg-variant="selectedDepType == 'legal' ? 'primary' : 'light'"
              :text-variant="selectedDepType == 'legal' ? 'white' : ''"
              :header="$t('column.is_legal_org')"
              class="text-center w-100 mb-0"
              style="cursor: pointer; font-size: 1rem;"
          >
            <b-card-text style="font-size: 1rem;"><i
                style="font-size: 1.5rem;"
                class="mdi mdi-domain-plus"
            ></i> {{ $t('not_translated.created_legal_department') }}
            </b-card-text>
          </b-card>
        </b-col>
        <b-col
            xs="12"
            cols="6"
        >
          <b-card
              id="simpleDepartmentCard"
              @click="selectedDepType = 'simple'"
              :bg-variant="selectedDepType == 'simple' ? 'primary' : 'light'"
              :text-variant="selectedDepType == 'simple' ? 'white' : ''"
              :header="$t('column.department')"
              class="text-center w-100 mb-0"
              style="cursor: pointer; font-size: 1rem;"
          >
            <b-card-text style="font-size: 1rem;"><i
                style="font-size: 1.5rem;"
                class="mdi mdi-file-tree"
            ></i> {{ $t('not_translated.created_divide') }}
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-modal>

    <!-- DEPARTMENT CREATE OR UPDATE MODAL WITH FORM -->
    <b-modal
        v-model="createOrUpdateModal"
        id="create-update-modal-id"
        size="lg"
        :title="$t('not_translated.created_divide')"
        title-class="font-18"
        :ok-title="$t('actions.save')"
        ok-variant="success"
        @ok="saveSimpleDepartment"
        :cancel-title="$t('actions.cancel')"
        cancel-variant="danger"
        no-close-on-backdrop
        no-close-on-esc
    >
      <template v-if="loadingSimpleDepInfo">
        <b-card>
          <b-skeleton width="85%"></b-skeleton>
          <b-skeleton width="55%"></b-skeleton>
          <b-skeleton width="70%"></b-skeleton>
          <b-skeleton width="70%"></b-skeleton>
        </b-card>
        <b-card>
          <b-skeleton width="85%"></b-skeleton>
          <b-skeleton width="55%"></b-skeleton>
          <b-skeleton width="70%"></b-skeleton>
          <b-skeleton width="70%"></b-skeleton>
        </b-card>
      </template>

      <ValidationObserver
          v-else
          ref="department-form-observer"
          v-slot="{}"
      >
        <b-row>
          <b-col
              sm="12"
              class="mb-3"
          >
            <BaseMultiselectWithValidation
                rules="required"
                class="required"
                v-model="editingItem.departmentNameId"
                :options="departmentNames.map(e => e.id)"
                :label="$t('column.department')"
                :custom-label="customLabelDepartmentNames"
                :placeholder="$t('column.department')"
                open-direction="bottom"
                :max-height="600"
                :show-labels="false"
            />
          </b-col>
          <b-col
              sm="12"
              class="mb-3"
          >
            <BaseTreeselectWithValidation
                rules="required"
                class="required"
                :placeholder="$t('column.parent_department')"
                label="nameUz"
                :form-label="$t('column.parent_department')"
                ref="parentDep"
                :value="editingItem.parentId"
                disabled
                :options="departments"
                :show-count="true"
                :default-expand-level="1"
                :normalizer="normalizer"
                name="parentDep"
                @close="treeClosed('parentDepVeeName')"
            ></BaseTreeselectWithValidation>
          </b-col>
        </b-row>

        <!-- <b-row>
            <b-col
                sm="12"
                class="mb-3"
            >
                <BaseInputWithValidation
                    rules="required"
                    v-model="editingItem.nameUz"
                    :label="$t('column.full_name')"
                    :placeholder="$t('column.full_name')"
                    class="required"
                />
            </b-col>
            <b-col
                sm="12"
                class="mb-3"
            >
                <BaseInputWithValidation
                    rules="required"
                    v-model="editingItem.shortName"
                    :label="$t('column.short_name')"
                    :placeholder="$t('column.short_name')"
                    class="required"
                />
            </b-col>
        </b-row> -->

        <b-row>
          <b-col
              sm="12"
              class="mb-3"
          >
            <BaseMultiselectWithValidation
                not-required
                v-model="editingItem.curatorId"
                :options="curators.map(e => e.id)"
                :label="$t('column.curator')"
                :custom-label="customLabelCurators"
                :placeholder="$t('column.curator')"
                open-direction="bottom"
                :max-height="600"
                :show-labels="false"
            />
          </b-col>
          <b-col
              sm="12"
              class="mb-3"
          >
            <BaseSelectWithValidation
                v-model="editingItem.statusId"
                class="required"
                rules="required"
                :label="$t('column.status')"
                value-field="id"
            >
              <template #first>
                <b-form-select-option
                    :value="null"
                    disabled
                >{{ $t('column.status') }}
                </b-form-select-option>
                <b-form-select-option v-for="(status, index) in statuses" :key="`${status}-${index}`"
                                      :value="status.id">{{
                    getName({
                      nameRu: status.nameRu,
                      nameLt: status.nameLt,
                      nameUz: status.nameUz,
                    })
                  }}
                </b-form-select-option>
              </template>
            </BaseSelectWithValidation>
          </b-col>
        </b-row>

        <b-row>
          <b-col
              sm="12"
              class="mb-3"
          >
            <BaseMultiselectWithValidation
                rules="required"
                class="required"
                v-model="editingItem.typeId"
                :options="types.map(e => e.id)"
                :label="$t('submodules.department_types.title')"
                :custom-label="customLabelDepType"
                :placeholder="$t('submodules.department_types.title')"
                open-direction="bottom"
                :max-height="600"
                :show-labels="false"
            />
          </b-col>
          <b-col
              sm="12"
              md="6"
          >

          </b-col>
        </b-row>
      </ValidationObserver>
    </b-modal>
  </div>
  <!-- end row -->
</template>

<script>
import appConfig from "@/app.config";
import OrgStrTreeView from '@/modules/management/components/OrgStrTreeView.vue'
import crudAndListsService from '@/shared/services/crud_and_list.service'
import helperService from "@/shared/services/helper.service"

const MAIN_API_URL = 'department'
export default {
  page: {
    title: "Departments",
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {
    OrgStrTreeView
  },
  data() {
    return {
      loadingSimpleDepInfo: false,
      selectedDepType: 'simple',
      types: [],
      departments: [],
      departmentNames: [],
      curators: [],
      regions: [],
      districts: [],
      statuses: [],
      editingItem: {},
      createOrUpdateModal: false,
      depTypeModal: false,
      title: "Departments",
      activeDep: {
        departmentDto: {},
        contractorDto: {}
      }
    };
  },
  /*
  COMPUTED */
  computed: {
    isLegal() {
      if (this.activeDep.departmentDto.id) {
        return this.activeDep.departmentDto.inn ? true : false
      } else return false
    },
    departmentFormObserver() {
      return this.$refs['department-form-observer']
    }
  },
  methods: {
    saveSimpleDepartment(e) {
      // PREVENT MODAL CLOSING
      e.preventDefault();

      this.departmentFormObserver.validate()
          .then((valid) => {
            if (valid) {
              if (this.editingItem.id) {
                crudAndListsService.update('department', this.editingItem, `by-department-name/${this.editingItem.id}`)
                    .then(res => {
                      this.createOrUpdateModal = false
                      this.fetchItems()
                      this.departmentFormObserver.reset()
                      this.editingItem = Object.assign({}, {});
                      this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
                    })
                    .catch(e => console.log(e))
              } else {
                crudAndListsService.create('department', this.editingItem, 'by-department-name')
                    .then(res => {
                      this.createOrUpdateModal = false
                      this.fetchItems()
                      this.departmentFormObserver.reset()
                      this.editingItem = Object.assign({}, {});
                      this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
                    })
                    .catch(e => console.log(e))
              }
            }
          })
          .catch(e => console.log(e))
    },
    customLabelDepartmentNames(opt) {
      let selected = this.departmentNames.find(e => e.id == opt);
      if (selected) {
        return `${
            this.getName({
              nameRu: selected.nameRu,
              nameLt: selected.nameLt,
              nameUz: selected.nameUz,
            })
        }`
      }
      return ``;
    },
    customLabelDepType(opt) {
      let selected = this.types.find(e => e.id == opt);
      if (selected) {
        return `${
            this.getName({
              nameRu: selected.nameRu,
              nameLt: selected.nameLt,
              nameUz: selected.nameUz,
            })
        }`
      }
      return ``;
    },
    customLabelCurators(opt) {
      let selected = this.curators.find(e => e.id == opt);
      if (selected) {
        return `${
            this.getName({
              nameRu: selected.nameRu,
              nameLt: selected.nameLt,
              nameUz: selected.nameUz,
            })
        }`
      }
      return ``;
    },
    treeClosed(veeName) {
      this.departmentFormObserver.refs[veeName].validate();
    },
    normalizer(node) {
      if (!node.children || node.children.length === 0) {
        delete node.children
        return {
          id: node.id,
          label: this.getName({
            nameRu: node.nameRu,
            nameLt: node.nameLt,
            nameUz: node.nameUz,
          }),
        }
      }
      return {
        id: node.id,
        label: this.getName({
          nameRu: node.nameRu,
          nameLt: node.nameLt,
          nameUz: node.nameUz,
        }),
        children: node.children && node.children.length > 0 ? node.children : [],
      }
    },
    async getSimpleDepInfo() {
      this.var_default_search_payload.itemsPerPage = 500
      // GET DEPARTMENT NAMES
      await crudAndListsService.searchList('directory/department-name', this.var_default_search_payload)
          .then(res => {
            this.departmentNames = res.data.list
          })
          .catch(e => {
            console.log(e)
          })

      // GET CURATORS
      await helperService.getCuratorsForDepartment()
          .then(res => {
            this.curators = res.data
          })
          .catch(e => {
            console.log(e)
          })

      // GET DEPARTMENT TYPES
      await crudAndListsService.searchList('directory/department-type', this.var_default_search_payload)
          .then(res => {
            this.types = res.data.list
          })
          .catch(e => {
            console.log(e)
          })
      // GET STATUSES
      await helperService.getRefByCode('status')
          .then(res => {
            this.statuses = res.data.children
            let activeStatus = this.statuses.find(el => el.code == 'ACTIVE')
            if (activeStatus && !this.editingItem.id) {
              this.editingItem.statusId = activeStatus.id
            }
          })
          .catch(e => {
            console.log(e)
          })
    },
    async editSimpleDep(dep) {
      this.selectedDepType = 'simple'
      this.editingItem = Object.assign({}, dep)
      this.createOrUpdateModal = true
      this.loadingSimpleDepInfo = true
      await this.getSimpleDepInfo()
      this.loadingSimpleDepInfo = false
    },
    async createDepByDepType() {
      // AGAR DEPARTMENT INN SI BO'LSA ODDIY/YURIDIK TANLAY OLADI BO'LMASA FAQAT ODDIY YARATADI
      if (this.currentDep.inn) {
        if (this.selectedDepType == 'simple') {
          this.editingItem = Object.assign({}, {})
          this.editingItem.parentId = this.currentDep.id
          this.createOrUpdateModal = true
          this.loadingSimpleDepInfo = true
          await this.getSimpleDepInfo()
          this.loadingSimpleDepInfo = false
        } else if (this.selectedDepType == 'legal') {
          this.$router.push({name: 'CreateDepartment', params: {parentDepId: this.currentDep.id}})
        }
      } else {
        this.selectedDepType = 'simple'
        this.editingItem = Object.assign({}, {})
        this.editingItem.parentId = this.currentDep.id
        this.createOrUpdateModal = true
        this.loadingSimpleDepInfo = true
        await this.getSimpleDepInfo()
        this.loadingSimpleDepInfo = false
      }
    },
    deleteItem(dep) {
      if (dep.id) {
        this.$bvModal.msgBoxConfirm(<h5>{this.$t('messages.delete_title')} <b>({dep.shortName})</b></h5>, {
          okTitle: this.$t('actions.confirm'),
          cancelTitle: this.$t('actions.cancel')
        })
            .then(value => {
              if (value) {
                crudAndListsService
                    .deleteById(MAIN_API_URL, dep.id)
                    .then((res) => {
                      this.fetchItems()
                      if (dep.id == this.activeDep.departmentDto.id) {
                        this.activeDep = Object.assign({}, {
                          departmentDto: {},
                          contractorDto: {}
                        })
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
    editItem(dep) {
      if (dep.id) {
        if (dep.inn) {
          this.$router.push({name: 'UpdateDepartment', params: {id: dep.id}})
        } else {
          this.editSimpleDep(dep)
        }
      }
    },
    fetchItems() {
      crudAndListsService.searchList('department', this.var_default_search_payload, null, true)
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
    toggleDepTypeModalAndSetCurrentDep(dep, booleanValue = false) {
      if (!booleanValue) {
        this.currentDep = Object.assign({}, {})
      } else {
        this.currentDep = Object.assign({}, dep)
      }
      if (dep.inn) {
        this.depTypeModal = booleanValue
      } else if (booleanValue) {
        // AGAR DEPARTMENT INN SI BO'LSA ODDIY/YURIDIK TANLAY OLADI BO'LMASA FAQAT ODDIY YARATADI
        this.selectedDepType = 'simple'
        this.createDepByDepType()
      }
    },
    deleteDepartment() {
    },
    toggleActiveClass(selectedDep) {
      if (selectedDep.inn) {
        crudAndListsService.getById('department', selectedDep.id)
            .then(res => {
              this.activeDep = Object.assign({}, res.data)
              this.giveActiveClassToDep(this.departments, selectedDep.id)
            })
            .catch(e => {
              console.log(e)
            })
      } else {
        this.activeDep.departmentDto = Object.assign({}, selectedDep)
        this.giveActiveClassToDep(this.departments, selectedDep.id)
      }
    },
  },
  /*
  CREATED */
  async created() {
    await this.fetchItems();
  },
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