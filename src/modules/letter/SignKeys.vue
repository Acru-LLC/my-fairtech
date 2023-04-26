<template>
  <div>
    <b-row>
      <b-col cols="12">
        <div>
          <div v-if="keysList.length === 0">
            <b-row>
              <b-col>
                <div class="card p-5 text-center">
                  <i style="font-size: 40px" class="bx bx-info-circle text-danger" ></i>
                  <h4 class="text-danger m-0" style="font-size: 18px">
                    {{ $t("auth.no_e_signatures_found") }}
                  </h4>
                </div>
              </b-col>
            </b-row>
          </div>
          <div v-if="loading" class="text-center p-10">
            <b-spinner variant="primary" type="grow"></b-spinner>
          </div>
          <div v-else>
            <b-row class="mb-2" v-for="(item, index) in keysList" :key="index">
              <b-col>
                <b-overlay :opacity="0.1" :show="loadingButton && currentItem.TIN == item.TIN" rounded="sm" >
                  <b-card no-body>
                    <b-card-body>
                      <div class=" d-flex align-items-center justify-content-between " >
                        <p class="m-0 text-primary" style="font-size: 1rem; font-weight: 700" >
                          {{ item.CN }}
                        </p>
                        <button
                          style="width: 200px"
                          class="btn btn-success btn-md float-right"
                          :disabled="item.expired"
                          @click="openSignModal(item)"
                        >
                          <i class="fa fa-check"></i>
                          {{ $t("actions.selectKey") }}
                        </button>
                      </div>
                      <br />
                      <div class=" d-flex mt-2 align-items-center justify-content-start " >
                        <div>
                          <p class="m-0 text-muted font-weight-bold" style="font-size: 0.875rem" >
                            {{ $t("login.inn") }}
                          </p>
                          <p class="m-0 text-dark">{{ item.TIN }}</p>
                        </div>

                        <div class="pl-5 ml-3">
                          <p class="m-0 text-muted font-weight-bold text" style="font-size: 0.875rem" >
                            {{ $t("login.numberLicence") }}
                          </p>
                          <p class="m-0 text-dark">{{ item.serialNumber }}</p>
                        </div>

                        <div class="pl-5 ml-3">
                          <p class="m-0 text-muted font-weight-bold text" style="font-size: 0.875rem" >
                            {{ $t("login.srokLicence") }}
                          </p>
                          <p class="m-0 text-dark">
                            {{ getDateFormat(item.validFrom) }} -
                            {{ getDateFormat(item.validTo) }}
                          </p>
                        </div>
                      </div>
                    </b-card-body>
                  </b-card>
                </b-overlay>
              </b-col>
            </b-row>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-modal
      :no-close-on-backdrop="true"
      :hide-header="true"
      :ok-title="$t('actions.yes')"
      :cancel-title="$t('actions.no')"
      @close="hideModal('signModal')"
      @cancel="hideModal('signModal')"
      @ok="signByEimzo"
      v-model="signModal"
    >
      <h4>{{ modalTitle }}</h4>
      <div v-if="loadingButton" class="text-center p-10">
        <b-spinner variant="primary" type="grow"></b-spinner>
      </div>
    </b-modal>
  </div>
</template>

<script>
var EIMZO_MAJOR = 3;
var EIMZO_MINOR = 37;

const errorCAPIWS =
  "Ошибка соединения с E-IMZO. Возможно у вас не установлен модуль E-IMZO или Браузер E-IMZO.";
const errorBrowserWS =
  "Браузер не поддерживает технологию WebSocket. Установите последнюю версию браузера.";
const errorUpdateApp =
  'ВНИМАНИЕ !!! Установите новую версию приложения E-IMZO или Браузера E-IMZO.<br /><a href="https://e-imzo.uz/main/downloads/" role="button">Скачать ПО E-IMZO</a>';
const errorWrongPassword = "Пароль неверный.";

import AppSettings from "@/settings";

export default {
  props: ["dataToSign"],
  data() {
    return {
      loading: false,
      keysList: [],
      currentItem: null,
      modalTitle: null,
      signModal: false,
      loadingButton: false,
    };
  },
  name: "LOGINESP",
  async created() {
    this.loading = true;
    await this.appLoad();
    this.loading = false;
  },
  methods: {
    hideModal(modal) {
      this.$data[modal] = false;
    },
    async wsError(e) {
      if (e) {
        this.uiShowMessage("errorCAPIWS" + " : " + e);
      } else {
        this.uiShowMessage("errorBrowserWS");
      }
    },

    async signByEimzo(data2) {
      this.loadingButton = true;
      let vm = this;
      var data = JSON.stringify(this.dataToSign);
      const promise = new Promise((resolve, reject) => {
        EIMZOClient.loadKey(
          vm.currentItem,
          function (id) {
            EIMZOClient.createPkcs7(
              id,
              data,
              null,
              function (pkcs7) {
                resolve(pkcs7);
              },
              function (e, r) {
                reject("error");
                vm.loadingButton = false;
                if (r) {
                  if (r.indexOf("BadPaddingException") != -1) {
                    vm.showMsgError(errorWrongPassword);
                  } else {
                    vm.showMsgError(r);
                  }
                } else {
                  let keyId = document.getElementById("keyId");
                  if (keyId) {
                    keyId.innerHTML = "";
                  }
                  vm.showMsgError(errorBrowserWS);
                }
                if (e) vm.wsError(e);
              }
            );
          },
          function (e, r) {
            reject("error");
            vm.loadingButton = false;
            if (r) {
              if (r.indexOf("BadPaddingException") != -1) {
                vm.showMsgError(errorWrongPassword);
              } else {
                vm.showMsgError(r);
              }
            } else {
              vm.$showMsgErro(errorBrowserWS);
            }
            if (e) vm.wsError(e);
          }
        );
      });
      promise
        .then(
          (success) => {
            vm.$emit("sign", { inn: vm.currentItem.TIN, content: success,pnfl: vm.currentItem.PINFL  });
          },
          (error) => {
            console.log(error);
            vm.showMsgError("Server error...");
          }
        )
        .finally(() => {
          vm.signModal = false;
          vm.loadingButton = false;
        });
    },
    async openSignModal(item) {
      this.currentItem = item;
      this.modalTitle = item.serialNumber + " - " + item.CN;
      this.signByEimzo();
      // this.signModal = true;
    },
    getDateFormat(date) {
      let data = new Date(date);
      let month = data.getMonth() + 1;
      return (
        data.getDate().toString() +
        "." +
        (month <= 9 ? "0" + month : month).toString() +
        "." +
        data.getFullYear().toString()
      );
    },
    uiCreateItem(itmkey, vo) {
      let vm = this;
      var now = new Date();
      vo.expired = dates.compare(now, vo.validTo) > 0;
      var itm = document.createElement("option");
      itm.value = itmkey;
      itm.text = vo.CN;
      if (!vo.expired) {
      } else {
        itm.style.color = "gray";
        itm.text = itm.text + " (срок истек)";
      }
      vm.keysList.push(vo);
      itm.setAttribute("vo", JSON.stringify(vo));
      itm.setAttribute("id", itmkey);
      return itm;
    },

    async uiLoadKeys() {
      let vm = this;
      EIMZOClient.listAllUserKeys(
        function (o, i) {
          var itemId = "itm-" + o.serialNumber + "-" + i;
          return itemId;
        },
        function (itemId, v) {
          return vm.uiCreateItem(itemId, v);
        },
        function (items, firstId) {
          //vm.uiFillCombo(items);
          //vm.uiComboSelect(firstId);
        },
        function (e, r) {
          vm.showMsgError(errorCAPIWS);
        }
      );
    },
    appLoad() {
      let vm = this;
      vm.loading = true;
      EIMZOClient.API_KEYS = AppSettings.api_keys;
      EIMZOClient.checkVersion(
        function (major, minor) {
          var newVersion = EIMZO_MAJOR * 100 + EIMZO_MINOR;
          var installedVersion = parseInt(major) * 100 + parseInt(minor);
          if (installedVersion < newVersion) {
            vm.loading = false;
            vm.showMsgError(errorUpdateApp);
          } else {
            EIMZOClient.installApiKeys(
              function () {
                vm.loading = false;
                vm.uiLoadKeys();
              },
              function (e, r) {
                vm.loading = false;
                if (r) {
                  vm.showMsgError(r);
                } else {
                  vm.wsError(e);
                }
              }
            );
          }
        },
        function (e, r) {
          vm.loading = false;
          if (r) {
            vm.showMsgError(r);
          } else {
            vm.showMsgError(e);
          }
        }
      );
    },

    async close() {
      await this.$emit("close");
    },
  },
};
</script>

<style></style>
