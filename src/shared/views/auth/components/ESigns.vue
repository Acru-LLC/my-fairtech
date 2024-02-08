<template>
  <div>
    <b-card class="e-signs-wrapper-card">
      <b-card-title>
        <b-row>
          <b-col md="4" sm="12">
            <h4>{{ $t('auth.e_signatures') }}</h4>
          </b-col>
          <b-col md="5" sm="12">
            <b-form-input v-model="SearchText"
                          size="sm"
                          :placeholder="$t('auth.e_sign_search')"
                          @input="debounceSearch">
              <template #append-content>
                <i class="mdi mdi-search"></i>
              </template>
            </b-form-input>
          </b-col>
          <b-col v-if="forLogin" class="text-sm-end" sm="3">
            <b-button class="btn btn-warning" size="sm" @click="$router.push({name: 'Login'})">
              {{ $t("actions.back") }}
            </b-button>
          </b-col>
        </b-row>
      </b-card-title>
      <b-card-body :style="forLogin ? {'max-height': '60vh', 'overflow': 'auto'} : ''">
        <div v-if="loading">
          <div style="position:absolute;left:0;top:0;bottom:0;right:0;background-color:rgb(255, 255, 255, 0.4);">
            <div style="position:absolute;bottom:50%;left:50%;transform:translateX(-50%);">
              <b-spinner color="success"/>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="keysList.length === 0">
            <b-card md="12" sm="12">
              <b-card-body>
                <h1 class="text-center text-danger">
                  {{ $t('auth.no_e_signatures_found') }}
                </h1>
              </b-card-body>
            </b-card>
          </div>
          <b-row v-else>
            <b-col v-for="(item, index) in keysList" :key="`signkey-${index}`" :md="forLogin ? 6 : 4" :sm="6"
                   :xl="forLogin ? 6 : 3">
              <b-card accent-color="primary" body-class="p-0" class="mr-3 mb-3 e-sign-card p-0">
                <b-card-title>{{ item.serialNumber }} - {{ item.CN }}</b-card-title>
                <b-card-body>
                  <b-row>
                    <p class="ml-2">
                      <i class="mdi mdi-file-key-outline" style="color: #2b6c58; font-size: 2.5rem;"/>
                      <b>{{ $t('auth.certificate_number') }}</b>: {{ item.serialNumber }}
                    </p>
                  </b-row>
                  <b-row>
                    <p class="ml-2 mt-2"><b>{{ $t('column.inn') }}</b>: {{ item.TIN }}</p>
                  </b-row>
                  <b-row>
                    <p class="ml-2"><b>{{ $t('column.fio') }}</b>: {{ item.CN }}</p>
                  </b-row>
                  <b-row>
                    <p class="ml-2"><b>{{ $t('auth.organisation') }}</b>: {{ item.O }}</p>
                  </b-row>
                  <b-row>
                    <p class="ml-2">
                      <b class="small">{{ $t('auth.certificate_validity_period') }}</b>:
                      {{ getDateFormat(item.validFrom) }} - {{ getDateFormat(item.validTo) }}
                    </p>
                    <p></p>
                  </b-row>
                </b-card-body>
                <footer class="d-flex justify-content-end">
                  <b v-if="item.expired" class="text-danger">
                    {{ $t('auth.certificate_expired') }}
                  </b>
                  <button v-else-if="signSelectBtnDisabled" class="btn btn-primary btn-sm" disabled>
                    {{ $t('auth.continue_with_this_signature') }}
                  </button>
                  <button v-else class="btn btn-primary btn-sm" @click="openSignModal(item)">
                    {{ $t('auth.continue_with_this_signature') }}
                  </button>
                </footer>
              </b-card>
            </b-col>
          </b-row>
        </div>
      </b-card-body>
      <footer v-if="!forLogin" class="d-flex justify-content-end">
        <button class="btn btn-warning" @click="$router.push({name: 'Login'})">
          {{ $t("actions.back") }}
        </button>
      </footer>
    </b-card>
  </div>
</template>

<script>
import HelperService from "@/shared/services/auth.service";
import AuthService from "@/shared/services/auth.service";
import AppSettings from "@/settings";

var EIMZO_MAJOR = 3;
var EIMZO_MINOR = 37;
const errorCAPIWS = 'Ошибка соединения с E-IMZO. Возможно у вас не установлен модуль E-IMZO или Браузер E-IMZO.';
const errorBrowserWS = 'Браузер не поддерживает технологию WebSocket. Установите последнюю версию браузера.';
const errorUpdateApp = 'ВНИМАНИЕ !!! Установите новую версию приложения E-IMZO или Браузера E-IMZO.<br /><a href="https://e-imzo.uz/main/downloads/" role="button">Скачать ПО E-IMZO</a>';
const errorWrongPassword = 'Пароль неверный.';
export default {
  props: {
    forLogin: {
      type: Boolean,
      default: false
    },
    dataToSign: {
      default: () => {
      }
    }
  },
  name: "ESigns",
  data() {
    return {
      signSelectBtnDisabled: false,
      openConfirmModal: false,
      signModal: false,
      SearchText: '',
      alertShow: false,
      alertMsg: '',
      alertType: '',
      dataToSignIfNot: {},
      publicPath: process.env.BASE_URL,
      Invoice: {},
      pkcs7: null,
      signByImzoText: null,
      vo: null,
      keysList: [],
      fullKeyList: [],
      alertMessage: null,
      showMessage: false,
      currentAlertCounter: 5,
      loading: false,
      confirmDialog: false,
      isYur: null,
      currentItem: null,
      modalTitle: null,
      loadingButton: false,
      AppSettings: AppSettings
    }
  },
  methods: {
    debounceSearch(event) {
      let vm = this;

      clearTimeout(vm.debounce);
      vm.debounce = setTimeout(() => {
        vm.keyFilter(event);
      }, 500);
    },
    keyFilter(text) {
      let value = text.toUpperCase();
      if (value) {
        this.keysList = this.fullKeyList.filter((el) => {
          if (
              el.CN.includes(value) ||
              el.O.includes(value) ||
              el.T.includes(value) ||
              el.TIN.includes(value) ||
              el.UID.includes(value) ||
              el.name.includes(value) ||
              el.serialNumber.includes(value)
          ) {
            return el;
          }
        });
      } else {
        this.keysList = this.fullKeyList;
      }
    },
    async signByEimzo() {
      this.loadingButton = true;
      let vm = this;
      let data = null
      if (this.dataToSign && this.dataToSign.key) {
        data = JSON.stringify({ key: this.dataToSign.key, inn: this.dataToSign.inn })
        // data = JSON.stringify(this.dataToSign)
      } else if (this.dataToSignIfNot && this.dataToSignIfNot.key) {
        data = JSON.stringify({
          key: this.dataToSignIfNot.key,
          PNFL: this.dataToSignIfNot.PNFL,
          TIN: this.dataToSignIfNot.TIN,
          INN: this.dataToSignIfNot.INN,
        })
        // data = JSON.stringify(this.dataToSignIfNot)
      }
      // var data = JSON.stringify((this.dataToSign && this.dataToSign.key) ? { key: this.dataToSign.key, inn: this.dataToSign.inn } : (this.dataToSignIfNot && this.dataToSignIfNot.key) ? { key: this.dataToSignIfNot.key, inn: this.dataToSignIfNot.inn } : { key: null, inn: null });
      const promise = new Promise((resolve, reject) => {
        EIMZOClient.loadKey(vm.currentItem, function (id) {
          EIMZOClient.createPkcs7(id, data, null, function (pkcs7) {
            resolve(pkcs7);
          }, function (e, r) {
            reject('error');
            vm.loadingButton = false;
            if (r) {
              if (r.indexOf("BadPaddingException") !== -1) {
                vm.$toast(errorWrongPassword, { type: 'error' });
              }
            } else {
              document.getElementById('keyId').innerHTML = '';
              vm.$toast(errorBrowserWS, { type: 'error' });
            }
            if (e) vm.wsError(e);
          });
        }, function (e, r) {
          reject('error');
          vm.loadingButton = false;
          if (r) {
            if (r.indexOf("BadPaddingException") !== -1) {
              vm.$toast(errorWrongPassword, { type: 'error' });
            } else {
              vm.$toast(r, { type: 'error' });
            }
          } else {
            vm.$toast(errorBrowserWS, { type: 'error' });
          }
          if (e) vm.wsError(e);
        });
      });
      promise.then(
          success => {
            vm.$emit('sign', success, vm.dataToSignIfNot.TIN, vm.dataToSignIfNot.PNFL, vm.dataToSignIfNot.INN);
          },
          error => {
            console.log(error)
          },
      ).finally(() => {
        vm.confirmDialog = false;
        vm.loadingButton = false;
      })
    },
    async continueRegistration(isConfirmed) {
      if (isConfirmed) {
        if (this.forLogin) {
          await this.signByEimzo()
        } else {
          this.signSelectBtnDisabled = true
          const isYur = !!this.currentItem.T && this.currentItem.TIN !== this.currentItem.UID;
          AuthService.isOrgRegistered(this.currentItem.TIN, this.currentItem.PINFL,this.currentItem.UID, isYur, this.currentItem.T)
            .then((response) => {
              let payload = {
                responseData: response.data,
                currentItem: this.currentItem
              }
              this.$emit("keySelected", payload);
            })
            .catch((e) => {
              console.log(e)
            })
            .finally((e) => {
              this.signSelectBtnDisabled = false
              // this.hideModal("openConfirmModal");
            });
      }
      }
    },
    async appLoad() {
      let vm = this;
      EIMZOClient.API_KEYS = AppSettings.api_keys;
      await EIMZOClient.checkVersion(async function (major, minor) {
        var newVersion = EIMZO_MAJOR * 100 + EIMZO_MINOR;
        var installedVersion = parseInt(major) * 100 + parseInt(minor);
        if (installedVersion < newVersion) {
          // vm.loading = false;
          vm.$toast(errorUpdateApp, { type: 'error' });
        } else {
          await EIMZOClient.installApiKeys(async function () {
            await vm.uiLoadKeys()
            // vm.loading = false
          }, function (e, r) {
            vm.loading = false;
            if (r) {
              vm.$toast(r, { type: 'error' });
            } else {
              vm.wsError(e, vm.$t('actions.error'), 'error');
            }
          });
        }
      }, function (e, r) {
        vm.loading = false;
        if (r) {
          vm.$toast(r, { type: 'error' });
        } else {
          vm.$toast(vm.$t('auth.is_e_signature_installed'), { type: 'error' });
        }
      });
      return 1;
    },
    async openSignModal(item, isYur) {
      this.currentItem = item;
      this.isYur = isYur;
      this.modalTitle = item.serialNumber + " - " + item.CN;
      if (!this.dataToSign || !this.dataToSign.key) {
        await AuthService.getKeyForLoginSign(item.TIN, item.UID, item.PINFL).then(response => {
          this.dataToSignIfNot = response.data;
        })
      }
      this.$bvModal.msgBoxConfirm(this.forLogin ? <h5 class="mb-0">{this.$t('auth.continue_login_with_this_signature')}</h5> : <h5 class="mb-0">{this.$t('auth.continue_reg_with_this_signature')}</h5>, {
        okTitle: this.$t('actions.confirm'),
        cancelTitle: this.$t('actions.cancel')
      })
          .then(async value => {
            if (value) {
              await this.continueRegistration(value)
            }
          })
          .catch(err => {
          })
    },
    hideModal(modal) {
      this.$data[modal] = false;
    },
    async timestamper(signature_hex, callback, fail) {

      try {
        await HelperService.getTimestamper(signature_hex).then(response => {
          callback(response.data.data)
        });
      } catch (e) {
        if (e.request) {
          fail(e.request.response);
        }
      }

    },
    getDateFormat(date) {
      let data = new Date(date);
      let month = data.getMonth() + 1
      return data.getDate().toString() + "." + (month <= 9 ? "0" + month : month).toString() + "." + data.getFullYear().toString();
    },
    async getImzo() {
      let vm = this;
      EIMZOClient.installApiKeys(function () {
        vm.uiLoadKeys();
      }, function (e, r) {
        if (r) {
          vm.$toast(r, { type: 'error' });
        } else {
          vm.wsError(e);
        }
      });
    },
    async uiCreateItem(itmkey, vo) {
      let vm = this;
      var now = new Date();
      vo.expired = dates.compare(now, vo.validTo) > 0;
      var itm = document.createElement("option");
      itm.value = itmkey;
      itm.text = vo.CN;
      if (!vo.expired) {

      } else {
        itm.style.color = 'gray';
        itm.text = itm.text + ' (срок истек)';
      }
      vm.keysList.push(vo);
      vm.fullKeyList.push(vo);
      itm.setAttribute('vo', JSON.stringify(vo));
      itm.setAttribute('id', itmkey);
      return itm;
    },
    async uiLoadKeys() {
      let vm = this;
      await EIMZOClient.listAllUserKeys(async function (o, i) {
        return "itm-" + o.serialNumber + "-" + i;
      }, async function (itemId, v) {
        return await vm.uiCreateItem(itemId, v)
      }, function (items, firstId) {
        vm.keysList = vm.fullKeyList;
        //vm.uiFillCombo(items);
        //vm.uiComboSelect(firstId);
      }, function (e, r) {
        vm.$toast(errorCAPIWS + " : " + e, { type: 'error' });
      });
      return 1
    },
    async wsError() {
      if (e) {
        this.$toast(errorCAPIWS + " : " + e, { type: 'error' });
      } else {
        this.$toast(errorBrowserWS, { type: 'error' });
      }
    },
    uiComboSelect(itm) {
      if (itm) {
        var id = document.getElementById(itm);
        id.setAttribute('selected', 'true');
      }
    },
    cbChanged(c) {
      document.getElementById('keyId').innerHTML = '';
    },
    uiClearCombo() {
      var combo = document.getElementById('user_eimzo_keys');
      combo.length = 0;
    },
    uiFillCombo(items) {
      var combo = document.getElementById('user_eimzo_keys');
      this.itemList = items;

    }
  },
  computed: {
    ImgUser: () => require("@/assets/images/users/user.png"),
    ImgCompany: () => require("@/assets/images/users/company.png"),
  },
  created() {
    this.loading = true;
    this.appLoad()
        .catch(e => {
          this.loading = false
        })
    this.loading = false;
  }
}
</script>

<style lang="scss" scoped>
.card {
  -webkit-box-shadow: none;
  box-shadow: none;
}

.e-signs-wrapper-card {
  .card-title,
  footer {
    padding: 1.25rem;
  }
}

.e-sign-card {
  -webkit-box-shadow: 0rem 0.75rem 3rem rgb(18 38 63 / 15%);
  box-shadow: 0rem 0.75rem 3rem rgb(18 38 63 / 15%);
}
</style>