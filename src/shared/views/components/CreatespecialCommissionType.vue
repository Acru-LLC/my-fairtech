<template>
  <ValidationObserver ref="observer" v-slot="{}">
    <b-row class="mb-3">
      <b-col sm="12" md="6">
        <BaseInputWithValidation
            @input="($event) => (editingItem.nameUz = toCyrill($event))"
            not-required
            v-model="editingItem.nameLt"
            :label="$t('column.name_lt')"
            :placeholder="$t('column.name_lt')"
        />
      </b-col>
      <b-col sm="12" md="6">
        <BaseInputWithValidation
            @input="($event) => (editingItem.nameLt = toLatin($event))"
            rules="required"
            class="required"
            v-model="editingItem.nameUz"
            :label="$t('column.name_uz')"
            :placeholder="$t('column.name_uz')"
        />
      </b-col>
    </b-row>
    <b-row class="mb-3">
      <b-col sm="12" md="6">
        <BaseInputWithValidation
            not-required
            v-model="editingItem.nameRu"
            :label="$t('column.name_ru')"
            :placeholder="$t('column.name_ru')"
        />
      </b-col>

    </b-row>
    <!-- FROM_TO_EMPLOYEES -->
    <b-row class="mb-3">
      <b-col cols="12">
        <h5 class="m-0 text-center">
          {{ $t('column.commission_structure') }}
        </h5>
        <hr class="my-2">
      </b-col>
      <b-col v-for="(emp, index) in editingItem.directoryCommissionEmployeeDto"
             :key="`from-to-employees-${index}`" cols="12">
        <b>{{ index + 1 }}.</b>
        <b-row class="mb-3">
          <b-col cols="3">
            <BaseMultiselectWithValidation
                v-model="emp.employeeId"
                rules="required"
                class="required"
                :options="employees.map(e => e.employeeId)"
                :label="$t('column.employee')"
                label-on-top
                @select="employeeSelected($event, index+1)"
                :custom-label="customLabelEmployees"
                :placeholder="''"
                :max-height="600"
                :show-labels="false"
            >
              <template slot="singleLabel" slot-scope="props" v-if="employees.find(e => e.employeeId == props.option)">
                <span class="option__desc"><span class="option__title"><strong>{{
                    employees.find(e => e.employeeId == props.option).employeeFullName
                  }}</strong></span></span> <br>
                <span class="option__desc"><span class="option__title">{{
                    getName({
                      nameUz: employees.find(e => e.employeeId == props.option).departmentParentNameUz,
                      nameLt: employees.find(e => e.employeeId == props.option).departmentParentNameLt,
                      nameRu: employees.find(e => e.employeeId == props.option).departmentParentNameRu
                    })
                  }}</span></span> / <br>
                <span class="option__desc"><span class="option__title">{{
                    getName({
                      nameUz: employees.find(e => e.employeeId == props.option).departmentNameUz,
                      nameLt: employees.find(e => e.employeeId == props.option).departmentNameLt,
                      nameRu: employees.find(e => e.employeeId == props.option).departmentNameRu
                    })
                  }}</span></span>
                <div><span class="option__small"><i>{{
                    getName({
                      nameUz: employees.find(e => e.employeeId == props.option).positionNameUz,
                      nameLt: employees.find(e => e.employeeId == props.option).positionNameLt,
                      nameRu: employees.find(e => e.employeeId == props.option).positionNameRu
                    })
                  }}</i></span></div>
              </template>
              <template slot="option" slot-scope="props" v-if="employees.find(e => e.employeeId == props.option)">
                <span class="option__desc"><span class="option__title"><strong>{{
                    employees.find(e => e.employeeId == props.option).employeeFullName
                  }}</strong></span></span> <br>
                <span class="option__desc"><span class="option__title">{{
                    getName({
                      nameUz: employees.find(e => e.employeeId == props.option).departmentParentNameUz,
                      nameLt: employees.find(e => e.employeeId == props.option).departmentParentNameLt,
                      nameRu: employees.find(e => e.employeeId == props.option).departmentParentNameRu
                    })
                  }}</span></span> / <br>
                <span class="option__desc"><span class="option__title">{{
                    getName({
                      nameUz: employees.find(e => e.employeeId == props.option).departmentNameUz,
                      nameLt: employees.find(e => e.employeeId == props.option).departmentNameLt,
                      nameRu: employees.find(e => e.employeeId == props.option).departmentNameRu
                    })
                  }}</span></span>
                <div><span class="option__small"><i>{{
                    getName({
                      nameUz: employees.find(e => e.employeeId == props.option).positionNameUz,
                      nameLt: employees.find(e => e.employeeId == props.option).positionNameLt,
                      nameRu: employees.find(e => e.employeeId == props.option).positionNameRu
                    })
                  }}</i></span></div>
              </template>
            </BaseMultiselectWithValidation>
          </b-col>
          <b-col cols="3">
            <BaseMultiselectWithValidation
                rules="required"
                class="required"
                v-model="emp.commissionPositionId"
                :options="commissionPositions.map(e => e.id)"
                :label="$t('column.position')"
                label-on-top
                placeholder=""
                :custom-label="customLabelCommissionPositions"
                open-direction="bottom"
                :max-height="600"
                :show-labels="false"
            ></BaseMultiselectWithValidation>
          </b-col>
          <b-col cols="3">
            <BaseMultiselectWithValidation
                v-model="emp.subEmployeeId"
                not-required
                :options="employees.map(el => el.employeeId)"
                :label="$t('column.substitute')"
                label-on-top
                :custom-label="customLabelEmployees"
                :placeholder="''"
                open-direction="bottom"
                :max-height="600"
                :show-labels="false"
            >
              <template
                  slot="singleLabel"
                  slot-scope="props"
                  v-if="employees.find(e => e.employeeId == props.option)"
              >
                <span class="option__desc"><span class="option__title"><strong>{{
                    employees.find(e => e.employeeId == props.option).employeeFullName
                  }}</strong></span></span> <br>
                <span class="option__desc"><span class="option__title">{{
                    getName({
                      nameUz: employees.find(e => e.employeeId == props.option).departmentParentNameUz,
                      nameLt: employees.find(e => e.employeeId == props.option).departmentParentNameLt,
                      nameRu: employees.find(e => e.employeeId == props.option).departmentParentNameRu
                    })
                  }}</span></span> / <br>
                <span class="option__desc"><span class="option__title">{{
                    getName({
                      nameUz: employees.find(e => e.employeeId == props.option).departmentNameUz,
                      nameLt: employees.find(e => e.employeeId == props.option).departmentNameLt,
                      nameRu: employees.find(e => e.employeeId == props.option).departmentNameRu
                    })
                  }}</span></span>
                <div><span class="option__small"><i>{{
                    getName({
                      nameUz: employees.find(e => e.employeeId == props.option).positionNameUz,
                      nameLt: employees.find(e => e.employeeId == props.option).positionNameLt,
                      nameRu: employees.find(e => e.employeeId == props.option).positionNameRu
                    })
                  }}</i></span></div>
              </template>
              <template
                  slot="option"
                  slot-scope="props"
                  v-if="employees.find(e => e.employeeId == props.option)"
              >
                <span class="option__desc"><span class="option__title"><strong>{{
                    employees.find(e => e.employeeId == props.option).employeeFullName
                  }}</strong></span></span> <br>
                <span class="option__desc"><span class="option__title">{{
                    getName({
                      nameUz: employees.find(e => e.employeeId == props.option).departmentParentNameUz,
                      nameLt: employees.find(e => e.employeeId == props.option).departmentParentNameLt,
                      nameRu: employees.find(e => e.employeeId == props.option).departmentParentNameRu
                    })
                  }}</span></span> / <br>
                <span class="option__desc"><span class="option__title">{{
                    getName({
                      nameUz: employees.find(e => e.employeeId == props.option).departmentNameUz,
                      nameLt: employees.find(e => e.employeeId == props.option).departmentNameLt,
                      nameRu: employees.find(e => e.employeeId == props.option).departmentNameRu
                    })
                  }}</span></span>
                <div><span class="option__small"><i>{{
                    getName({
                      nameUz: employees.find(e => e.employeeId == props.option).positionNameUz,
                      nameLt: employees.find(e => e.employeeId == props.option).positionNameLt,
                      nameRu: employees.find(e => e.employeeId == props.option).positionNameRu
                    })
                  }}</i></span></div>
              </template>
            </BaseMultiselectWithValidation>
          </b-col>
          <b-col cols="3">
            <b-row class="mt-4">
              <b-col cols="6" class="float-left">
                <b-form-checkbox
                    :id="`isAdmin-${index}`"
                    v-model="emp.isAdmin"
                    @change="isAdminChanged($event, index)"
                    name="project-owner-checkbox"
                >
                  <strong>{{ $t('column.is_commission_chairman') }}</strong>
                </b-form-checkbox>
              </b-col>

              <b-col cols="6" class="float-right">
                <b-btn
                    v-if="index == editingItem.directoryCommissionEmployeeDto.length - 1"
                    variant="success"
                    class="mr-2"
                    size="sm"
                    @click="addMember"
                ><i class="mdi mdi-plus"></i></b-btn>
                <b-btn
                    v-if="editingItem.directoryCommissionEmployeeDto.length > 1 && index != 0"
                    variant="danger"
                    size="sm"
                    @click="editingItem.directoryCommissionEmployeeDto.splice(index, 1)"
                ><i class="mdi mdi-trash-can"></i></b-btn>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <hr class="my-2">
      </b-col>
    </b-row>
    <!-- END OF FROM_TO_EMPLOYEES FORM -->

  </ValidationObserver>
</template>
<script>
const MAIN_API_URL = 'directory/commission/commission-type'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
  name: "CreatespecialCommissionType",
  props: {
    customIsModeCreate: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      editingItem: {},
      statuses: [],
      employees: [],
      commissionPositions: []
    }
  },
  computed: {
    isModeCreate() {
      return this.customIsModeCreate ? this.customIsModeCreate : this.$route.name === 'CreatespecialCommissionType'
    },
    computedObserver() {
      return this.$refs.observer
    }
  },
  methods: {
    isAdminChanged(e, index) {
      this.editingItem.directoryCommissionEmployeeDto = this.editingItem.directoryCommissionEmployeeDto.map((emp, idx) => {
        if (index == idx) {
          this.$set(emp, 'isAdmin', e)
        } else {
          this.$set(emp, 'isAdmin', false)
        }
        return emp
      })
    },
    addMember() {
      this.editingItem.directoryCommissionEmployeeDto.push({
        commissionPositionId: null,
        employeeId: null,
        subEmployeeId: null,
        isAdmin: false
      })
    },
    customLabelCommissionPositions(opt) {
      let selected = this.commissionPositions.find(e => e.id == opt);
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
    customLabelEmployees(opt) {
      let selected = this.employees.find(e => e.employeeId == opt);
      if (selected) {
        return `${selected.employeeFullName} (${this.getName({
          nameUz: selected.departmentParentNameUz,
          nameLt: selected.departmentParentNameLt,
          nameRu: selected.departmentParentNameRu
        })})`
      }
      return ``;
    },
    employeeSelected(employee, index) {
      this.editingItem.directoryCommissionEmployeeDto.map(el => {
        if (el.id == index) {
          el.employeeId = employee.id
        }
      })
      // this.editingItem.employeeId = this.assignment
    },
    save() {
      this.computedObserver.validate().then(valid => {
        if (valid) {
          if (this.editingItem.id) {
            crudAndListsService.update(MAIN_API_URL, this.editingItem, null, true).then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
            })
          } else {
            crudAndListsService.create(MAIN_API_URL, this.editingItem, null, true).then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
            })
          }
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
        }
      });
    },

    // GET COMMISSION_POSITIONS
    fetchCommissionPosition(){
      crudAndListsService.searchList('directory/commission/commission-position', this.var_default_search_payload, null, true)
          .then(res => {
            this.commissionPositions = res.data.list
          })
          .catch(e => {
            console.log(e)
          })
    },

    // GET INNER USERS WITH EMPLOYEES
    fetchInnerEmployees(){
      this.var_default_search_payload.itemsPerPage = 1000;
      crudAndListsService.searchListWithKeyword('user', this.var_default_search_payload, 'inner', true)
          .then(res => {
            this.employees = res.data.list
          })
          .catch(e => {
            console.log(e)
          })
    },
  },
  async created() {
    if (this.isModeCreate) {
      await crudAndListsService.getEmpty(MAIN_API_URL)
          .then(res => {
            this.editingItem = res.data
            this.editingItem.directoryCommissionEmployeeDto = [{
              commissionPositionId: null,
              employeeId: null,
              subEmployeeId: null,
              isAdmin: false
            }]
          })
          .catch(e => {
            console.log(e)
          })
    } else {
      await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, false)
          .then(res => {
            this.editingItem = res.data
            if (!this.editingItem.directoryCommissionEmployeeDto.length) {
              this.editingItem.directoryCommissionEmployeeDto = [{
                commissionPositionId: null,
                employeeId: null,
                subEmployeeId: null,
                isAdmin: false
              }]
            }
          })
          .catch(e => {
            console.log(e)
          })
    }

    // GET INNER USERS WITH EMPLOYEES
    await this.fetchInnerEmployees()
    await this.fetchCommissionPosition()
  }
}
</script>
<style scoped>
.col-form-label {
  padding-top: 0;
}

ul {
  list-style-type: none;
}
</style>
