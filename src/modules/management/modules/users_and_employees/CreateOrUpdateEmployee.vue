<template>
  <base-create-or-update-wrapper
      @save="save"
      has-save-suspend
      :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
  >
    <ValidationObserver
        ref="observer"
        v-slot="{}"
    >
      <b-row class="mb-3">
        <b-col
            sm="12"
            md="6"
        >
          <BaseInputWithValidation
              :rules="{regex: /\b\d{9}\b/}"
              name="INN"
              v-model="editingItem.inn"
              @keyup.enter="getIndividualInfoByInn"
              with-input-append
              mask="#########"
              :label="$t('column.inn')"
              placeholder="123456789"
          >
            <template v-slot:append-slot>
              <b-button
                  @click="getIndividualInfoByInn"
                  variant="outline-primary"
                  id="contractorSearchButton"
                  style="padding: 2.5px 10px; font-size: 1.2rem;"
              >
                <i class="mdi mdi-account-search"></i>
              </b-button>
              <!-- <b-tooltip
                      target="contractorSearchButton"
                      variant="primary"
                  >{{ $t('document.search_contractor') }}</b-tooltip> -->
            </template>
          </BaseInputWithValidation>
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
          <BaseTreeselectWithValidation
              rules="required"
              class="required"
              :placeholder="$t('column.department')"
              label="nameUz"
              :form-label="$t('column.department')"
              ref="department"
              v-model="editingItem.departmentId"
              :options="departments"
              :show-count="true"
              :default-expand-level="1"
              :normalizer="normalizer"
              vee-name="employeeDepVeeName"
              @close="treeClosed('employeeDepVeeName')"
          ></BaseTreeselectWithValidation>
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col
            sm="12"
            md="6"
        >
          <BaseInputWithValidation
              rules="required"
              v-model="editingItem.firstName"
              :label="$t('auth.first_name')"
              :placeholder="$t('auth.first_name')"
              class="required"
          />
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
          <BaseInputWithValidation
              rules="required"
              v-model="editingItem.lastName"
              :label="$t('auth.last_name')"
              :placeholder="$t('auth.last_name')"
              class="required"
          />
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col
            sm="12"
            md="6"
        >
          <BaseInputWithValidation
              not-required
              v-model="editingItem.middleName"
              :label="$t('auth.middle_name')"
              :placeholder="$t('auth.middle_name')"
          />
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
          <BaseMultiselectWithValidation
              rules="required"
              class="required"
              v-model="editingItem.directoryPositionId"
              :options="positions.map(e => e.id)"
              :label="$t('column.position')"
              :custom-label="customLabelPosition"
              :placeholder="$t('column.position')"
              open-direction="bottom"
              :max-height="600"
              :show-labels="false"
          />
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col
            sm="12"
            md="6"
        >
          <BaseDatePickerWithValidation
              not-required
              :label="$t('column.birthdate')"
              :placeholder="$t('column.birthdate')"
              v-model="editingItem.birthday"
              lang="ru"
          ></BaseDatePickerWithValidation>
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
          <BaseSelectWithValidation
              v-model="editingItem.genderId"
              class="required"
              rules="required"
              :label="$t('column.gender')"
              value-field="id"
          >
            <template #first>
              <b-form-select-option
                  :value="null"
                  disabled
              >{{ $t('column.gender') }}
              </b-form-select-option>
              <b-form-select-option
                  v-for="(gender, index) in genders"
                  :key="`${gender}-${index}`"
                  :value="gender.id"
              >{{
                  getName({
                    nameRu: gender.nameRu,
                    nameLt: gender.nameLt,
                    nameUz: gender.nameUz,
                  })
                }}
              </b-form-select-option>
            </template>
          </BaseSelectWithValidation>
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col
            sm="12"
            md="6"
        >
          <BaseInputWithValidation
              :rules="{min: 2, max: 2, regex: /^[A-Za-z]+$/}"
              @keyup="forceInputUppercase"
              v-model="editingItem.passportSeries"
              :label="$t('column.passport_series')"
              :placeholder="$t('column.passport_series')"
          />
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
          <BaseInputWithValidation
              rules="integer|min:7|max:7"
              v-model="editingItem.passportNumber"
              mask="#######"
              :label="$t('column.passport_number')"
              :placeholder="$t('column.passport_number')"
          />
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col
            sm="12"
            md="6"
        >
          <BaseDatePickerWithValidation
              not-required
              :label="$t('column.passport_given_date')"
              :placeholder="$t('column.passport_given_date')"
              v-model="editingItem.passportGivenDate"
          ></BaseDatePickerWithValidation>
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
          <BaseDatePickerWithValidation
              not-required
              :label="$t('column.passport_end_date')"
              :placeholder="$t('column.passport_end_date')"
              v-model="editingItem.passportEndDate"
          ></BaseDatePickerWithValidation>
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col
            sm="12"
            md="6"
        >
          <BaseInputWithValidation
              not-required
              v-model="editingItem.passportGivenWho"
              :label="$t('column.passport_given_by')"
              :placeholder="$t('column.passport_given_by')"
          />
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
          <BaseInputWithValidation
              name="PERSONAL_NUMBER"
              :rules="{regex: /\b\d{14}\b/}"
              v-model="editingItem.personalNumber"
              mask="##############"
              :label="$t('column.personal_number')"
              :placeholder="$t('column.personal_number')"
          />
        </b-col>
      </b-row>

      <b-row class="mb-3">
        <b-col
            sm="12"
            md="6"
        >
          <BaseInputWithValidation
              not-required
              v-model="editingItem.currentAddress"
              :label="$t('column.address')"
              :placeholder="$t('column.address')"
          />
        </b-col>
        <b-col
            sm="12"
            md="6"
        >
          <!-- STATUS -->
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
                  disableds
              >{{ $t('column.status') }}
              </b-form-select-option>
              <b-form-select-option
                  v-for="(status, index) in statuses"
                  :key="`${status}-${index}`"
                  :value="status.id"
              >{{
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
    </ValidationObserver>
  </base-create-or-update-wrapper>
</template>
<script>
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

const MAIN_API_URL = 'employee'
const APPEND_URL_CREATE_BY_SOLIQ = 'by-soliq-api'
export default {
  name: "CreateOrUpdate",
  /*
  * COMPONENTS */
  components: {},
  /*
  * DATA */
  data() {
    return {
      types: [],
      departments: [],
      positions: [],
      statuses: [],
      genders: [],
      editingItem: {},
    }
  },
  /*
  * COMPUTED */
  computed: {
    isModeCreate() {
      return this.$route.name === 'CreateEmployee'
    },
    computedObserver() {
      return this.$refs.observer
    }
  },
  /*
  * METHODS */
  methods: {
    forceInputUppercase(e) {
      let start = e.target.selectionStart;
      let end = e.target.selectionEnd;
      e.target.value = e.target.value.toUpperCase();
      e.target.setSelectionRange(start, end);
    },
    customLabelPosition(opt) {
      let selected = this.positions.find(e => e.id == opt);
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
    getIndividualInfoByInn() {
      if (this.computedObserver.fields.INN.valid)
        helperService.validateInnFromApi(this.editingItem.inn, true)
            .then(res => {
              if (res.data) {
                helperService.getIndividualInfoByInn(this.editingItem.inn, true)
                    .then(res => {
                      let id = this.editingItem.id
                      let depId = this.editingItem.departmentId
                      this.editingItem = Object.assign({}, res.data)
                      let activeStatus = this.statuses.find(el => el.code == 'ACTIVE')
                      if (activeStatus) {
                        this.$set(this.editingItem, 'statusId', activeStatus.id)
                      }
                      this.$set(this.editingItem, 'id', id)
                      this.$set(this.editingItem, 'departmentId', depId)
                      if (res.data.regEmployeeDto && res.data.regEmployeeDto.sex) {
                        this.$set(this.editingItem, 'genderId', this.genders.find(el => {
                          if (this.editingItem.regEmployeeDto.sex == 1) {
                            return el.code == 'ERKAK'
                          } else if (this.editingItem.regEmployeeDto.sex == 2) {
                            return el.code == 'AYOL'
                          }
                        }) ? this.genders.find(el => {
                          if (this.editingItem.regEmployeeDto.sex == 1) {
                            return el.code == 'ERKAK'
                          } else if (this.editingItem.regEmployeeDto.sex == 2) {
                            return el.code == 'AYOL'
                          }
                        }).id : null)
                      }
                    })
              } else {
                this.computedObserver.setErrors({INN: [this.$t('validator.inn')]});
              }
            })
            .catch(e => {
              console.log(e)

            })
      else
        this.computedObserver.refs.INN.validate()
    },
    treeClosed(veeName) {
      this.computedObserver.refs[veeName].validate();
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
    customFilter(item, queryText, itemText) {
      const textOne = item.name.toLowerCase()
      const textTwo = item.code.toLowerCase()
      const searchText = queryText.toLowerCase()

      return textOne.indexOf(searchText) > -1 ||
          textTwo.indexOf(searchText) > -1
    },
    save() {
      this.computedObserver.validate().then(valid => {
        if (valid) {
          if (this.editingItem.id) {
            crudAndListsService.update(MAIN_API_URL, this.editingItem).then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
          } else {
            if (this.editingItem.inn && this.editingItem.inn.length > 0) {
              helperService.validateInnFromApi(this.editingItem.inn)
                  .then(res => {
                    if (res.data) {
                      this.saveEmployee()
                    } else {
                      this.computedObserver.setErrors({INN: [this.$t('validator.inn')]});
                    }
                  })
                  .catch(e => {
                    console.log(e)

                  })
            } else {
              this.saveEmployee()
            }
          }
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      });
    },
    saveEmployee() {
      if (this.editingItem.regEmployeeDto && this.editingItem.regEmployeeDto.tin) {
        crudAndListsService.create(MAIN_API_URL, this.editingItem, APPEND_URL_CREATE_BY_SOLIQ)
            .then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
            .catch(e => console.log(e))
      } else {
        crudAndListsService.create(MAIN_API_URL, this.editingItem)
            .then(res => {
              this.computedObserver.reset()
              this.editingItem = Object.assign({}, {});
              this.$router.go(-1)
              this.$toast(this.$t('messages.saved_successfully'), {type: 'success'});
            })
            .catch(e => console.log(e))
      }
    },
  },
  /*
  * CREATED */
  async created() {
    this.var_default_search_payload.itemsPerPage = 500
    if (this.isModeCreate) {
      await crudAndListsService.getEmpty(MAIN_API_URL)
          .then(res => {
            this.editingItem = res.data
          })
          .catch(e => {
            console.log(e)
          })
    } else {
      await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, true)
          .then(res => {
            this.editingItem = res.data
          })
          .catch(e => {
            console.log(e)
          })
    }
    // GET DEPARTMENTS
    await crudAndListsService.searchList('department', this.var_default_search_payload, null, true)
        .then(res => {
          if (res.data.id)
            this.departments.push(res.data)
        })
        .catch(e => {
          console.log(e)
        })
    // GET GENDERS
    await helperService.getRefByCodeNew('gender', true)
        .then(res => {
          this.genders = res.data.children
        })
        .catch(e => {
          console.log(e)
        })
    // GET POSITIONS
    await crudAndListsService.searchList('directory/position', this.var_default_search_payload, null, true)
        .then(res => {
          this.positions = res.data.list
        })
        .catch(e => {
          console.log(e)
        })

    // GET STATUSES
    await helperService.getRefByCode('status', true)
        .then(res => {
          this.statuses = res.data.children
          if (this.isModeCreate) {
            let activeStatus = this.statuses.find(el => el.code == 'ACTIVE')
            if (activeStatus) {
              this.editingItem.statusId = activeStatus.id
            }
          }
        })
        .catch(e => {
          console.log(e)
        })
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