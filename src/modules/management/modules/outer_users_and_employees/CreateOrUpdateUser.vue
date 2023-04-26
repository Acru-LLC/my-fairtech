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
                        name="username"
                        rules="required"
                        ref="username"
                        v-model="editingItem.username"
                        @input="debounceCheckUsername"
                        @blur="
                            onBlurUsernameInput(
                                $event.target.value
                            )
                        "
                        :label="$t('auth.username')"
                        :placeholder="$t('auth.username')"
                        class="required"
                    />
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
<!--                    <BaseTreeselectWithValidation-->
<!--                        rules="required"-->
<!--                        class="required"-->
<!--                        :placeholder="$t('column.department')"-->
<!--                        label="nameUz"-->
<!--                        :form-label="$t('column.department')"-->
<!--                        ref="department"-->
<!--                        v-model="editingItem.departmentId"-->
<!--                        :options="departments"-->
<!--                        :show-count="true"-->
<!--                        :default-expand-level="1"-->
<!--                        :normalizer="normalizer"-->
<!--                        vee-name="userDepVeeName"-->
<!--                        @close="treeClosed('userDepVeeName')"-->
<!--                        @select="departmentSelected"-->
<!--                    ></BaseTreeselectWithValidation>-->
                </b-col>
            </b-row>

            <b-row class="mb-3">
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        v-model="editingItem.employeeId"
                        :options="employees.map(e => e.id)"
                        :label="$t('column.employee')"
                        :custom-label="customLabelEmployees"
                        :placeholder="$t('column.employee')"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                    />
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseMultiselectWithValidation
                        not-required
                        multiple
                        v-model="editingItem.roleIds"
                        :options="roles.map(e => e.id)"
                        :label="$t('submodules.roles.title')"
                        :custom-label="customLabelRoles"
                        :placeholder="$t('submodules.roles.title')"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                    />
                </b-col>
            </b-row>
            <!-- THIS PASSWORD FORM IS FOR CREATING ONLY -->
            <b-row
                v-if="isModeCreate"
                class="mb-3"
            >
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseInputWithValidation
                        name="password"
                        with-input-append
                        class="required"
                        :rules="{'required':true,'regex':/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/}"
                        :type="showPassword ? 'text' : 'password'"
                        v-model="editingItem.password"
                        :info-msg="$t('auth.password_info')"
                        :label="$t('auth.password')"
                        :placeholder="$t('auth.password')"
                    >
                        <template v-slot:append-slot>
                            <b-button
                                @click="showPassword = !showPassword"
                                variant="outline-primary"
                                id="contractorSearchButton"
                                style="padding: 2.5px 10px; font-size: 1.2rem;"
                            >
                                <i :class="showPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"></i>
                            </b-button>
                        </template>
                    </BaseInputWithValidation>
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseInputWithValidation
                        with-input-append
                        class="required"
                        rules="required|password:@password"
                        :type="showPassword ? 'text' : 'password'"
                        v-model="editingItem.rePassword"
                        :label="$t('auth.re_password')"
                        :placeholder="$t('auth.re_password')"
                    >
                        <template v-slot:append-slot>
                            <b-button
                                @click="showPassword = !showPassword"
                                variant="outline-primary"
                                id="contractorSearchButton"
                                style="padding: 2.5px 10px; font-size: 1.2rem;"
                            >
                                <i :class="showPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"></i>
                            </b-button>
                        </template>
                    </BaseInputWithValidation>
                </b-col>
            </b-row>

            <!-- PASSWORD FORM FOR UPDATING USER'S PASSWORD -->
            <b-row
                v-if="!isModeCreate"
                class="mb-3"
            >
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseInputWithValidation
                        v-if="!isModeCreate && wantToChangePassword"
                        name="oldPassword"
                        with-input-append
                        class="required"
                        rules="required"
                        :type="showPassword ? 'text' : 'password'"
                        v-model="passwordPayload.currentPassword"
                        :label="$t('auth.current_password')"
                        :placeholder="$t('auth.current_password')"
                    >
                        <template v-slot:append-slot>
                            <b-button
                                @click="showPassword = !showPassword"
                                variant="outline-primary"
                                id="contractorSearchButton"
                                style="padding: 2.5px 10px; font-size: 1.2rem;"
                            >
                                <i :class="showPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"></i>
                            </b-button>
                        </template>
                    </BaseInputWithValidation>
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <div class="form-check form-check-right">
                        <input
                            v-model="wantToChangePassword"
                            class="form-check-input"
                            type="checkbox"
                            id="formCheckIsLegal"
                        />
                        <label
                            class="form-check-label font-weight-normal"
                            for="formCheckIsLegal"
                        >
                            {{ $t('actions.change_password') }}
                        </label>
                    </div>
                </b-col>
            </b-row>

            <b-row
                v-if="!isModeCreate && wantToChangePassword"
                class="mb-3"
            >
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseInputWithValidation
                        name="newPassword"
                        with-input-append
                        class="required"
                        :rules="{'required':true,'regex':/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/}"
                        :type="showPassword ? 'text' : 'password'"
                        v-model="passwordPayload.newPassword"
                        :info-msg="$t('auth.password_info')"
                        :label="$t('auth.new_password')"
                        :placeholder="$t('auth.new_password')"
                    >
                        <template v-slot:append-slot>
                            <b-button
                                @click="showPassword = !showPassword"
                                variant="outline-primary"
                                id="contractorSearchButton"
                                style="padding: 2.5px 10px; font-size: 1.2rem;"
                            >
                                <i :class="showPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"></i>
                            </b-button>
                        </template>
                    </BaseInputWithValidation>
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseInputWithValidation
                        with-input-append
                        class="required"
                        rules="required|password:@newPassword"
                        :type="showPassword ? 'text' : 'password'"
                        v-model="passwordPayload.newPasswordConfirm"
                        :label="$t('auth.re_new_password')"
                        :placeholder="$t('auth.re_new_password')"
                    >
                        <template v-slot:append-slot>
                            <b-button
                                @click="showPassword = !showPassword"
                                variant="outline-primary"
                                id="contractorSearchButton"
                                style="padding: 2.5px 10px; font-size: 1.2rem;"
                            >
                                <i :class="showPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"></i>
                            </b-button>
                        </template>
                    </BaseInputWithValidation>
                </b-col>
            </b-row>

            <b-row class="mb-3">
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
                                disabled
                            >{{ $t('column.status') }}</b-form-select-option>
                          <b-form-select-option v-for="(status, index) in statuses" :key="`${status}-${index}`" :value="status.id">{{
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
                <b-col
                    sm="12"
                    md="6"
                >

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
import AuthService from "@/shared/services/auth.service"
const MAIN_API_URL = 'user'
export default {
    name: "CreateOrUpdate",
    /*
    * COMPONENTS */
    components: {

    },
    /*
    * DATA */
    data () {
        return {
            statuses: [],
            wantToChangePassword: false,
            showPassword: false,
            checkUsernameLoading: false,
            isUsernameValid: null,
            debounce: null,
            roles: [],
            departments: [],
            employees: [],
            editingItem: {},
            dbUsername: '',
            passwordPayload: {
                currentPassword: null,
                id: null,
                newPassword: null,
                newPasswordConfirm: null
            }
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.$route.name === 'CreateOuterUser'
        },
        computedObserver () {
            return this.$refs.observer
        }
    },
    /*
    * METHODS */
    methods: {
        // fetchEmployees () {
        //     this.employees = []
        //     helperService
        //         .searchEmployeesWithoutDep(
        //             this.var_default_search_payload,
        //         )
        //         .then((res) => {
        //             this.employees = res.data.list;
        //         })
        //         .catch(e => {
        //             console.log(e)
        //         })
        // },
        // departmentSelected (dep) {
        //     if (dep) {
        //         this.editingItem.employeeId = null
        //         this.fetchEmployees(dep.id)
        //     }
        // },
        customLabelRoles (opt) {
            let selected = this.roles.find(e => e.id == opt);
            if (selected) {
                return `${selected.name}`
            }
            return ``;
        },
        customLabelEmployees (opt) {
            let selected = this.employees.find(e => e.id == opt);
            if (selected) {
                return `${selected.firstName} ${selected.lastName} ${selected.middleName ? selected.middleName : ''}`
            }
            return ``;
        },
        checkNoUsername (searchQuery = "", fromOnBlur = false) {
            /*
             * AVOID MULTIPLE REQUESTS AT ONCE */
            if (this.checkUsernameLoading || (!this.isModeCreate && this.editingItem.username == this.dbUsername)) return;
            this.checkUsernameLoading = true;
            AuthService.checkNoUsername(searchQuery)
                .then((res) => {
                    this.isUsernameValid = res.data;
                    if (!this.isUsernameValid) {
                        this.computedObserver.setErrors({
                            username: [
                                this.$t("validator.username_already_in_use"),
                            ],
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.checkUsernameLoading = false;
                    /*
                     * FOYDALANUVCHI YOZAYOTGAN BO'LSA INPUTNI QAYTA FOCUS QIL (ON_BLUR EVENTDAN BO'LSA FOCUS QILMA) */
                    if (!fromOnBlur) {
                        let usernameInput = this.$refs.username.$el.querySelector(
                            "input"
                        );
                        setTimeout(() => {
                            usernameInput.focus();
                        }, 50);
                    }
                });
        },
        async debounceCheckUsername (searchText) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(async () => {
                await this.checkNoUsername(searchText);
            }, 1000);
        },
        async onBlurUsernameInput (value) {
            if (!this.isUsernameValid) {
                await this.checkNoUsername(value, true);
            }
        },
        treeClosed (veeName) {
            this.computedObserver.refs[veeName].validate();
        },
        normalizer (node) {
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
        customFilter (item, queryText, itemText) {
            const textOne = item.name.toLowerCase()
            const textTwo = item.code.toLowerCase()
            const searchText = queryText.toLowerCase()

            return textOne.indexOf(searchText) > -1 ||
                textTwo.indexOf(searchText) > -1
        },
        save () {
            this.computedObserver.validate().then(valid => {
                if (valid) {
                    if (this.editingItem.id) {
                        crudAndListsService.update(MAIN_API_URL, this.editingItem).then(res => {
                            // IF USER WANT TO CHANGE PASSWORD 
                            if (this.wantToChangePassword) {
                                this.passwordPayload.id = this.editingItem.id
                                helperService.updateUserPassword(this.passwordPayload, true)
                                    .then(res => {
                                        this.computedObserver.reset()
                                        this.editingItem = Object.assign({}, {});
                                        this.$router.go(-1)
                                        this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                                    })
                                    .catch(e => {
                                        console.log(e)
                                    })
                            } else {
                                this.computedObserver.reset()
                                this.editingItem = Object.assign({}, {});
                                this.$router.go(-1)
                                this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                            }
                        })
                    } else {
                        crudAndListsService.create(MAIN_API_URL, this.editingItem).then(res => {
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
        }
    },
    /*
    * CREATED */
    async created () {
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
                    // ASSIGN OLD_SAVED_USERNAME ON DATABASE TO LOCAL VARIABLE
                    this.dbUsername = this.editingItem.username
                    this.fetchEmployees(this.editingItem.departmentId)
                })
                .catch(e => {
                    console.log(e)
                })
        }
        // GET DEPARTMENTS
        await crudAndListsService.searchList('department', this.var_default_search_payload, 'by-contractor')
            .then(res => {
                   this.departments = res.data
            })
            .catch(e => {
                console.log(e)
            })
        // GET ROLES
        await crudAndListsService.searchList('role', this.var_default_search_payload)
            .then(res => {
                this.roles = res.data.list
            })
            .catch(e => {
                console.log(e)
            })

    // GET EMPLOYEES
         await helperService
            .searchEmployeesWithoutDep(
                this.var_default_search_payload,
            )
            .then((res) => {
              this.employees = res.data;
            })
            .catch(e => {
              console.log(e)
            })

        // GET STATUSES
        await helperService.getRefByCode('status')
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
    },
  /*
 WATCH */
  watch: {

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