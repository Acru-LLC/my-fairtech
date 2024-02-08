<template>
  <!--  <Layout>-->
  <!--    <PageHeader :items="breadcrumbs" :title="title"/>-->
  <div>
    <div>
      <b-overlay :show="loadingContent">
        <b-form-file
            ref="userAvatarFileRef"
            style="display: none"
            v-model="fileForUserAvatar"
            @input="updateUserAvatar"
        ></b-form-file>
        <b-card>
          <b-row class="text-right">
            <b-col>
              <template v-if="!editAccountInfo">
                <b-button :disabled="loadingButton" @click="changeStateEditAccountInfo('change')"
                          class="mr-1 ml-1"
                          size="sm" variant="success">
                  <i class="fa fa-pen"></i> {{ $t('profile.change') }}
                </b-button>
              </template>
              <template v-else>
                <b-button :disabled="loadingButton || !canSaveUserInfo" @click="saveChanges" size="sm"
                          variant="success">
                  <i class="fa fa-save"></i> {{ $t('profile.password.update') }}
                </b-button>
                <b-button :disabled="loadingButton" @click="changeStateEditAccountInfo('cancel')"
                          class="mr-1 ml-1"
                          size="sm" variant="danger">
                  <i class="fa fa-times"></i> {{ $t('profile.password.cancel') }}
                </b-button>
              </template>
            </b-col>
          </b-row>
          <br>
          <b-row>
            <b-col class="text-center" md="4" sm="12">
              <template-logo-component></template-logo-component>
              <br>
              <!--                            <b-button class="btn-default btn-circle" size="sm"><i class="fa fa-upload"></i>-->
              <!--                            </b-button>-->
              <!--              <b-button variant="success" size="sm" @click="openFileBrowser"><i class="fa fa-pen"></i>-->
              <!--                {{ $t('profile.change') }}-->
              <!--              </b-button>-->
              <div class="avatar-container">
                <b-spinner
                    v-if="userAvatarLoading"
                    variant="primary"
                    label="Loading"
                ></b-spinner>
                <img
                    v-else
                    class="rounded-circle bg-light image"
                    :src="`${userInfos.passportPhoto ? `data:image/png;base64, ${userInfos.passportPhoto}`: require('../../assets/images/users/default-avatar.png')}`"
                />
                <div class="overlay">
                  <div
                      @click="userAvatarClicked"
                      class="avatar-edit-pencil
                               d-flex
                               align-items-center
                               justify-content-center
                               bg-primary"
                  >
                    <i
                        class="mdi mdi-camera-plus-outline text-white"
                        style="font-size: 2rem;"
                    ></i>
                  </div>
                </div>
              </div>
              <div class="user-full-name mt-4">
                <p class="text">{{ userInfos.lastName }} {{ userInfos.firstName }} {{ userInfos.middleName }}</p>
                <b-button @click="openChangePasswordModal" class="btn-default btn-circle"
                          size="sm"><i class="fa fa-key"></i>
                </b-button>
              </div>

            </b-col>
            <b-col md="8" sm="12">
              <div class="mt-2 table-striped">
                <table class="table">
                  <tbody>
                  <tr>
                    <th scope="row" width="20%">{{ $t('profile.fio') }}</th>
                    <td>{{ userInfos.lastName }} {{ userInfos.firstName }} {{ userInfos.middleName }}</td>
                  </tr>
                  <tr>
                    <th scope="row">{{ $t('column.birthdate') }}</th>
                    <td>
                      <b-row>
                        <b-col lg="6" md="6" sm="12" xl="4">
<!--                          <template v-if="editAccountInfo">-->

<!--                            &lt;!&ndash;                            <b-form-input size="sm" v-mask="myDateMask"&ndash;&gt;-->
<!--                            &lt;!&ndash;                                          :state="globalRegexDateOfBirth.test(itemCopy.employee.dateOfBirth)"&ndash;&gt;-->
<!--                            &lt;!&ndash;                                          v-model="itemCopy.employee.dateOfBirth"&ndash;&gt;-->
<!--                            &lt;!&ndash;                            ></b-form-input>&ndash;&gt;-->

<!--                            <BaseDatePickerWithValidation-->
<!--                                custom-styles="grid-template-columns: 100%"-->
<!--                                v-model="itemCopy.employee.dateOfBirth"-->
<!--                                lang="ru"-->
<!--                            ></BaseDatePickerWithValidation>-->
<!--                          </template>-->

<!--                          <template v-else>-->
<!--                            {{ item.employee.dateOfBirth }}-->
<!--                          </template>-->
                          <template>
                            {{ userInfos.birthday }}
                          </template>

                        </b-col>
                      </b-row>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">{{ $t('profile.inn') }}</th>
                    <td>
                      <b-row>
                        <b-col lg="6" md="6" sm="12" xl="4">
<!--                          <template v-if="editAccountInfo">-->

<!--                            <b-form-input :disabled="loadingButton"-->
<!--                                          :state="globalRegexInn.test(itemCopy.employee.inn)"-->
<!--                                          size="sm"-->
<!--                                          v-mask="'##############'"-->
<!--                                          v-model="itemCopy.employee.inn"-->
<!--                            >-->
<!--                            </b-form-input>-->


<!--                          </template>-->
<!--                          <template v-else>-->
<!--                            {{ item.employee.inn }}-->
<!--                          </template>-->
                          <template>
                            <p> </p>
                          </template>

                        </b-col>
                      </b-row>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">{{ $t('profile.pinfl') }}</th>
                    <td>
                      <b-row>
                        <b-col lg="6" md="6" sm="12" xl="4">
<!--                          <template v-if="editAccountInfo">-->
<!--                            <b-form-input :disabled="loadingButton"-->
<!--                                          size="sm"-->
<!--                                          v-mask="'##############'"-->
<!--                                          v-model="itemCopy.employee.pinfl"-->
<!--                            >-->
<!--                            </b-form-input>-->
<!--                          </template>-->

<!--                          <template v-else>-->
<!--                            {{ item.employee.pinfl }}-->
<!--                          </template>-->

                          <template>
                            {{ userInfos.pinfl }}
                          </template>
                        </b-col>
                      </b-row>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">{{ $t('profile.title') }}</th>
                    <td>{{ userInfos.username }}</td>
                  </tr>
                  <tr>
                    <th scope="row">{{ $t('profile.email') }}</th>
                    <td>
                      <b-row>
                        <b-col cols="12"
                               sm="6">
<!--                          <template v-if="editAccountInfo">-->
<!--                            <BaseInputWithValidation-->
<!--                                :rules="{email: true}"-->
<!--                                custom-styles="grid-template-columns: 0% 65%"-->
<!--                                placeholder="meningEmail@gmail.com"-->
<!--                                v-model="itemCopy.mail"-->
<!--                            />-->
<!--                            &lt;!&ndash;                            <b-input-group append="@gmail.com" size="sm">&ndash;&gt;-->
<!--                            &lt;!&ndash;                              <b-form-input :disabled="loadingButton"&ndash;&gt;-->
<!--                            &lt;!&ndash;                                            v-model="itemCopy.email"&ndash;&gt;-->
<!--                            &lt;!&ndash;                              >&ndash;&gt;-->
<!--                            &lt;!&ndash;                              </b-form-input>&ndash;&gt;-->
<!--                            &lt;!&ndash;                            </b-input-group>&ndash;&gt;-->
<!--                          </template>-->

<!--                          <template v-else>-->
<!--                            {{ item.mail }}-->
<!--                          </template>-->
                          <template>
                            {{ userInfos.mail }}
                          </template>

                        </b-col>
                      </b-row>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">{{ $t('profile.phonenumber') }}</th>
                    <td>
                      <b-row>
<!--                        <template v-if="editAccountInfo">-->
<!--                          <b-col-->
<!--                              sm="12"-->
<!--                              md="6"-->
<!--                          >-->
<!--                            <BaseInputWithValidation-->
<!--                                not-required-->
<!--                                custom-styles="grid-template-columns: 0% 65%"-->
<!--                                v-model="itemCopy.phoneNumber"-->
<!--                                mask="+998#########"-->
<!--                                placeholder="+998#########"-->
<!--                            />-->
<!--                          </b-col>-->

<!--                          &lt;!&ndash;                            <b-form-input :disabled="loadingButton" size="sm"&ndash;&gt;-->
<!--                          &lt;!&ndash;                                          v-mask="'## ### ## ##'"&ndash;&gt;-->
<!--                          &lt;!&ndash;                                          v-model="itemCopy.phoneNumber"&ndash;&gt;-->
<!--                          &lt;!&ndash;                            >&ndash;&gt;-->
<!--                          &lt;!&ndash;                            </b-form-input>&ndash;&gt;-->

<!--                        </template>-->

<!--                        <template v-else>-->
<!--                          {{ item.phoneNumber }}-->
<!--                          &lt;!&ndash;                            {{ getCorrectPhoneNumber(item.phoneNumber) }}&ndash;&gt;-->
<!--                        </template>-->
                        <b-col sm="12">
                          <template>
                            {{ userInfos.phoneNumber }}
                          </template>
                        </b-col>
                      </b-row>

                    </td>
                  </tr>
                  <!--                  <tr>-->
                  <!--                    <th scope="row">{{ $t('profile.inPhoneNumber') }}</th>-->
                  <!--                    <td>-->
                  <!--                      <b-row>-->
                  <!--                        <b-col lg="5" md="5" sm="12" xl="3">-->
                  <!--                          <template v-if="editAccountInfo">-->
                  <!--                            <b-form-input :disabled="loadingButton" size="sm"-->
                  <!--                                          v-mask="'#####'"-->
                  <!--                                          v-model="itemCopy.inPhoneNumber"-->
                  <!--                            >-->
                  <!--                            </b-form-input>-->

                  <!--                          </template>-->

                  <!--                          <template v-else>-->
                  <!--                            {{ item.inPhoneNumber }}-->
                  <!--                          </template>-->
                  <!--                        </b-col>-->
                  <!--                      </b-row>-->
                  <!--                    </td>-->
                  <!--                  </tr>-->
                  <!--                  <tr>-->
                  <!--                    <th scope="row">{{ $t('profile.departmentCode') }}</th>-->
                  <!--                    <td>-->
                  <!--                      <b-row>-->
                  <!--                        <b-col lg="5" md="5" sm="12" xl="3">-->
                  <!--                          <template v-if="editAccountInfo">-->
                  <!--                            <b-form-input :disabled="loadingButton" size="sm"-->
                  <!--                                          v-mask="'##-##'"-->
                  <!--                                          v-model="itemCopy.departmentCode"-->
                  <!--                            >-->
                  <!--                            </b-form-input>-->

                  <!--                          </template>-->

                  <!--                          <template v-else>-->
                  <!--                            {{ item.departmentCode }}-->
                  <!--                          </template>-->

                  <!--                        </b-col>-->
                  <!--                      </b-row>-->

                  <!--                    </td>-->
                  <!--                  </tr>-->
                  <!--                  <tr>-->
                  <!--                    <th scope="row">{{ $t('profile.trustedUsers') }}</th>-->
                  <!--                    <td>-->
                  <!--                      <b-row>-->
                  <!--                        <b-col md="6" sm="12">-->
                  <!--                          <template v-if="editAccountInfo">-->

                  <!--                            <v-select-->
                  <!--                                :clearable="false"-->
                  <!--                                :filterBy="myFilterUserList"-->
                  <!--                                :getOptionLabel="myDefaultLabelUserList"-->
                  <!--                                :loading="loadingUser"-->
                  <!--                                :options="userList"-->
                  <!--                                class="sel mt-2"-->
                  <!--                                multiple-->
                  <!--                                name="bank"-->
                  <!--                                v-model="itemCopy.trustedUsers"-->
                  <!--                            >-->
                  <!--                              <template #no-options="{ search, searching, loading }">-->
                  <!--                                {{ $t("profile.empty_table") }}-->
                  <!--                              </template>-->
                  <!--                            </v-select>-->

                  <!--                          </template>-->
                  <!--                          <template v-else>-->
                  <!--&lt;!&ndash;                            <template v-for="el in item.trustedUsers">&ndash;&gt;-->
                  <!--&lt;!&ndash;                              <p>&ndash;&gt;-->
                  <!--&lt;!&ndash;                                <b-badge size="md" variant="primary">{{ el.text }}&ndash;&gt;-->
                  <!--&lt;!&ndash;                                </b-badge>&ndash;&gt;-->
                  <!--&lt;!&ndash;                              </p>&ndash;&gt;-->
                  <!--&lt;!&ndash;                            </template>&ndash;&gt;-->
                  <!--                          </template>-->

                  <!--                        </b-col>-->
                  <!--                      </b-row>-->

                  <!--                    </td>-->
                  <!--                  </tr>-->

                  </tbody>
                </table>
              </div>
              <table class="table">
                <tbody>

                </tbody>
              </table>
            </b-col>
          </b-row>


        </b-card>
      </b-overlay>
    </div>


    <b-modal hide-footer hide-header ref="my-modal" size="md" v-model="changePasswordModal">
      <header class="modal-header">
        <b-col cols="10">
          <h5 class="modal-title text-center"><b>{{
              $t('profile.password.change')
            }}</b></h5>
        </b-col>
        <b-col cols="2">
          <button @click="showModal('changePasswordModal',false)" aria-label="Close" class="close"
                  type="button">×
          </button>
        </b-col>


      </header>
      <div class="modal-body">

        <ValidationObserver ref="form" v-slot="errors">
          {{ setAllErrors(errors.errors) }}
          <b-row>
            <b-col md="12" sm="12">
              <ValidationProvider
                  name="oldPassword"
                  v-slot="v">
                <b-form-group
                    label-cols-sm="5"
                    label-for="input-1"
                >
                  <template slot="label">
                    <label class="d-block">{{
                        $t('profile.password.old')
                      }}
                      <span class="text-danger"> *</span></label>
                  </template>
                  <b-form-input
                      :placeholder="$t('profile.password.old')"

                      class="mt-1"
                      size="sm"
                      type="password"
                      v-model="account.currentPassword"
                  ></b-form-input>
                  <b-form-invalid-feedback

                      id="usernameInput-feedback"
                  >
                    {{ v.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>

            </b-col>
            <b-col md="12" sm="12">
              <ValidationProvider
                  name="password"
                  v-slot="v">
                <b-form-group
                    label-cols-sm="5"
                    label-for="input-1"
                >
                  <template slot="label">
                    <label class="d-block">{{
                        $t('profile.password.new')
                      }}
                      <span class="text-danger"> *</span></label>
                  </template>
                  <b-input-group class="mt-1" size="sm">
                    <b-form-input
                        :placeholder="$t('profile.password.new')"

                        :type="inputType ? 'password' : 'text'"
                        v-model="account.password"
                    ></b-form-input>
                    <template #append>
                      <button @click="showPassword" class="btn btn-sm btn-primary">
                        <i class="fa fa-eye" v-if="inputType"></i>
                        <i class="fa fa-eye-slash" v-else></i>

                      </button>
                    </template>
                  </b-input-group>
                  <b-form-invalid-feedback

                      id="usernameInput-feedback"
                  >
                    {{ v.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>

            </b-col>
            <b-col md="12" sm="12">
              <ValidationProvider
                  name="confirmPassword"
                  v-slot="v">
                <b-form-group
                    label-cols-sm="5"
                    label-for="input-1"
                >
                  <template slot="label">
                    <label class="d-block">{{
                        $t('profile.password.confirm')
                      }}
                      <span class="text-danger"> *</span></label>
                  </template>
                  <b-input-group class="mt-1" size="sm">
                    <b-form-input
                        :placeholder="$t('profile.password.new')"
                        :type="inputType ? 'password' : 'text'"
                        v-model="account.rePassword"
                    ></b-form-input>
                    <template #append>
                      <button @click="showPassword" class="btn btn-sm btn-primary">
                        <i class="fa fa-eye" v-if="inputType"></i>
                        <i class="fa fa-eye-slash" v-else></i>

                      </button>
                    </template>
                  </b-input-group>
                  <b-form-invalid-feedback
                      id="usernameInput-feedback"
                  >
                    {{ v.errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>

            </b-col>
          </b-row>
        </ValidationObserver>
        <hr>
        <b-row>
          <b-col md="12" sm="12">
            <button :disabled="!modalFormValid"
                    @click="changePassword" class="btn btn-sm btn-success float-right">
              <b-spinner small v-if="loadingButton"></b-spinner>
              {{ $t('profile.password.update') }}
            </button>
          </b-col>
        </b-row>
      </div>

    </b-modal>
  </div>

  <!--  </Layout>-->

</template>
<script>
// import Layout from "@/router/layouts/main";
// import PageHeader from "@/components/page-header";
import AccountService from "../../shared/services/profile/account.service";
import TemplateLogoComponent from "../../components/template-logo-component/template-logo-component";
import ManualService from "../../shared/services/profile/manual.service";
import {mapState} from "vuex";
import appConfig from "@/app.config";
import {TokenService} from "@/shared/services/storage.service"
import messengerService from "@/shared/services/messengerService";
import crudAndListsService from "@/shared/services/crud_and_list.service";

export default {
  name: "Profile",
  data() {
    return {
      userInfos:{},
      publicPath: process.env.BASE_URL,
      localUserAvatarUrl: null,
      userAvatarLoading: false,
      innerWidth: window.innerWidth,
      userFullName: TokenService.getFullName(),
      userId: TokenService.getUserId(),
      loaderEdit: false,
      fileForUserAvatar: null,
      user_info: {
        profile_img: require("../../assets/images/profile/profile-avatar.png"),
      },
      breadcrumbs: [
        {
          text: this.$t('actions.profile'),
          href: "#"

        },
      ],
      appConfig,
      title: this.$t('actions.profile'),
      item: {
        fullName: "",
        userName: "",
        phoneNumber: "",
        mail: "",
        employee: {
          pinfl: "",
          inn: "",
          dateOfBirth: ""
        },
        trustedUsers: [],
        avatarUrl: ""
      },
      changePasswordModal: false,
      account: {
        currentPassword: "",
        password: "",
        rePassword: ""
      },
      loadingButton: false,
      inputType: true,
      allErrors: {},
      editAccountInfo: false,
      itemCopy: {},
      globalRegexPinfl: new RegExp('^\\d{14}$'),
      globalRegexInn: new RegExp('^\\d{9}$'),
      globalRegexDateOfBirth: new RegExp('^\\d{2}.\\d{2}.\\d{4}$'),
      loadingUser: false,
      userList: [],
      loadingContent: false,
      uploadFile: null
    }
  },
  methods: {
    updateUserAvatar() {
      this.userAvatarLoading = true
      messengerService
          .changeUserProfileAvatar(this.fileForUserAvatar)
          .then((rs) => {
            this.userAvatarLoading = false
            if (rs.data) {
              this.localUserAvatarUrl = rs.data
              TokenService.setUserAvatarUrl(rs.data)
            }
          })
          .catch((e) => {
            console.log(e)
            this.userAvatarLoading = false
          })
    },
    userAvatarClicked() {
      this.$refs.userAvatarFileRef.$el.firstChild.click()
    },
    myDateMask(value) {
      let regex = [/[0|1|2|3]/]
      if (value) {
        if (value[0] === 3) {
          regex.push(/[0|1]/)

        } else {
          regex.push(/[0-9]/)

        }
        regex.push(/[.]/);
        regex.push(/[0|1]/);
        if (value[3] === 1) {
          regex.push(/[0|1|2]/);
        } else {
          regex.push(/[0-9]/)
        }
        regex.push(/[.]/);
        regex.push(/[1|2]/)
        regex.push(/[0-9]/)
        regex.push(/[0-9]/)
        regex.push(/[0-9]/)

      }
      return regex
    },
    async setLoadingContent(value) {
      this.loadingContent = value
    },
    async searchUserByString(search = "") {
      let filter = {
        Search: search,
        SortColumn: "",
        OrderType: "",
        PageNumber: 1,
        PageLimit: 1000
      };
      this.loadingUser = true;
      await ManualService.getUserList(filter).then(response => {
        this.userList = response.data.rows;
      }).finally(() => {
        this.loadingUser = false;
      })
    },
    myFilterUserList(option, label, search) {
      let text = option.text.includes(search.toLowerCase()) || option.text.includes(search.toUpperCase()) ||
          option.text.includes(search.charAt(0).toUpperCase() + search.slice(1));

      return text;
    },
    myDefaultLabelUserList(option) {
      let text = option.text;
      return `${text}`;
    },
    getCorrectPhoneNumber(phoneNumber) {
      return "998" + " " + phoneNumber.substr(0, 2) + " " + phoneNumber.substr(2);
    },
    async saveChanges() {
      this.loadingButton = true;
      // this.itemCopy.trustedUsers.forEach(el => {
      //   trustedUsers.push(el.value)
      // });
      let obj = {
        phoneNumber: this.itemCopy.phoneNumber,
        inn: this.itemCopy.employee.inn,
        personalNumber: this.itemCopy.employee.pinfl,
        mail: this.itemCopy.mail,
        birthday: this.itemCopy.employee.dateOfBirth,
      };
      await AccountService.changeUserInfo(obj)
          .then(async (response) => {
            if (300 > response.status && response.status >= 200) {
              // await this.getUserInfo();
              this.successEdited();
              await this.getUserInfo();
              this.changeStateEditAccountInfo('cancel')

              // this.changeStateEditAccountInfo();

              // this.$myMakeToast(
              //     this.$t(`actions.messages.update_success`),
              //     this.$t("actions.success"),
              //     "success"
              // );

            } else {
              // this.$myMakeToast(
              //     response.data.error,
              //     this.$t("actions.error"),
              //     "danger"
              // );
              this.enterInfo();
            }
          })
          .catch((e) => {
            this.enterInfo();
            // this.$myMakeToast(
            //     this.$globalCreateErrorMessageFromArray(
            //         this.$getArrayFromArrayList(Object.values(e.response.data.errors))),
            //     this.$t("actions.error"),
            //     "danger"
            // );
          }).finally(() => {
            this.loadingButton = false;
          });
    },
    changeStateEditAccountInfo(mode) {
      if (mode === 'change') {
        this.$set(this.itemCopy, 'phoneNumber', this.item.phoneNumber)
        this.$set(this.itemCopy, 'mail', this.itemCopy.mail);
        this.$set(this.itemCopy.employee, 'inn', this.item.employee.inn)
        this.$set(this.itemCopy.employee, 'pinfl', this.item.employee.pinfl)
      }
      this.editAccountInfo = !this.editAccountInfo
    },
    showPassword() {
      this.inputType = !this.inputType;
    },
    setAllErrors(errors) {
      this.allErrors = errors;
    },
    checkValid() {
      let valid = false;
      if (
          this.modalFormValid &&
          (this.account.currentPassword !== '' && this.account.currentPassword !== null) &&
          (this.account.password !== '' && this.account.password !== null) &&
          (this.account.rePassword !== '' && this.account.rePassword !== null)
      ) {
        valid = true;
      } else {
        valid = false;
      }
      return valid
    },
    async changePassword() {
      this.loadingButton = true;
      let vm = this;
      if (vm.checkValid()) {
        await AccountService.changePassword(vm.account).then((response) => {
          if (300 > response.status && response.status >= 200) {
            this.changePasswordModal = false
            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
            // vm.$myMakeToast(
            //     vm.$t(`actions.messages.update_success`),
            //     vm.$t("actions.success"),
            //     "success"
            // );
            setTimeout(function () {
              vm.showModal('changePasswordModal', false);
            }, 500);
          } else {
            // this.$myMakeToast(
            //     response.data.error,
            //     this.$t("actions.error"),
            //     "danger"
            // );
            this.enterInfo();

          }
        })
            .catch((e) => {
              this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
              // this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
              // this.$myMakeToast(
              //     this.$globalCreateErrorMessageFromArray(
              //         this.$getArrayFromArrayList(Object.values(e.response.data.errors))),
              //     this.$t("actions.error"),
              //     "danger"
              // );
            })
            .finally(() => {
              this.loadingButton = false;
            });
      } else {
        vm.loadingButton = false;
        this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
        // vm.$myMakeToast(vm.$t('actions.messages.all_field_required'), vm.$t('actions.error'), 'danger');
      }
    },
    showModal(modal, value) {
      this.$data[modal] = value;
    },
    openChangePasswordModal() {
      this.changePasswordModal = true;
    },
    getUserInfos() {
      crudAndListsService.getUserInformation()
          .then((res) => {
            this.userInfos = res.data;
          })
          .catch(e => {
            console.log(e)
          })
    },
    async getUserInfo() {
      await AccountService.getUserInfo().then((response) => {
        this.item = response.data;
        this.item = {
          fullName: response.data.employeeLastName + ' ' + response.data.employeeFirstName + ' ' + response.data.employeeMiddleName,
          userName: response.data.username,
          phoneNumber: response.data.phoneNumber,
          mail: response.data.mail,
          employee: {
            pinfl: response.data.personalNumber,
            inn: response.data.inn,
            dateOfBirth: response.data.birthday
          },
          trustedUsers: [],
          avatarUrl: '',
        },
            // this.$store.commit('auth/setUserInfo', response.data);
            TokenService.setUserInfo(response.data);
        this.itemCopy = JSON.parse(JSON.stringify(this.item));
        this.$set(this.itemCopy, 'mail', this.itemCopy.mail);
      })
    }
  },
  async created() {
    // await this.setLoadingContent(true);
    // await this.searchUserByString();
    // await this.getUserInfo();
    await this.getUserInfos();
    await this.setLoadingContent(false);
  },
  computed: {
    ...mapState('auth', ['UserInfo']),
    userAvatarUrlFromStorage() {
      let triggerForUrl = this.localUserAvatarUrl
      return TokenService.getUserAvatarUrl()
    },
    modalFormValid() {
      let valid = true;
      if (Object.keys(this.allErrors).length > 1) {

        Object.entries(this.allErrors).forEach(([key, value]) => {
          if (value.length > 0) {
            valid = false;
          }
        })
      }
      return valid;
    },
    canSaveUserInfo() {
      return this.itemCopy.phoneNumber &&
          this.itemCopy.mail &&
          (this.itemCopy.employee.pinfl ? this.globalRegexPinfl.test(this.itemCopy.employee.pinfl) : true) &&
          this.globalRegexInn.test(this.itemCopy.employee.inn);
    }
  },
  watch: {
    // 'itemCopy.employee.dateOfBirth': {
    //   async handler(newValue) {
    //     if (newValue.length === 2 || newValue.length === 5) {
    //       this.itemCopy.employee.dateOfBirth += "-";
    //     }
    //
    //   }
    // }
  },
  components: {
    TemplateLogoComponent,
    // Layout,
    // PageHeader
  }
}
</script>
<style scoped>

.user-full-name:hover .change-password-button {
  opacity: 1;
  margin-top: 25px;
}

.btn-circle {
  width: 30px;
  height: 30px;
  padding: 6px 0px;
  border-radius: 15px;
  text-align: center;
  font-size: 12px;
  line-height: 1.42857;
}

.btn-circle:hover {
  background-color: #1808ec;
  font-size: 13px;
}
</style>

<style lang="scss" scoped>
::v-deep.sidebar-chat {
  .b-sidebar {
    width: 100vw;
    background: white;
  }
}

::v-deep.avatar-edit-pencil {
  width: 100%;
  height: 100%;
  transition: all 0.5s ease;
  box-shadow: 5px 5px 5px #eee;
  border-radius: 50px;
  border: 3px solid white;
  cursor: pointer;
  /* background: #2b6c58; */
}

::v-deep.avatar-container {
  position: relative;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep.avatar-container:hover .overlay {
  opacity: 1 !important;
}


::v-deep.image {
  display: block;
  width: 5rem;
  height: 5rem;
}

::v-deep.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 5rem;
  opacity: 0;
  transition: 0.3s ease;
}

::v-deep.icon {
  color: white;
  font-size: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

::v-deep.fa-user:hover {
  color: #eee;
}
</style>