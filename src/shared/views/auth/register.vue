<script>
import AuthLayout from "@/shared/layouts/auth"
import appConfig from "@/app.config";
import { FormWizard, TabContent, WizardButton, WizardStep } from "vue-form-wizard";

import AuthService from "@/shared/services/auth.service";
import helperService from "@/shared/services/helper.service";
import { mapMutations, mapState } from "vuex";
import ESigns from './components/ESigns'

const errorCAPIWS = 'Ошибка соединения с E-IMZO. Возможно у вас не установлен модуль E-IMZO или Браузер E-IMZO.';
const errorBrowserWS = 'Браузер не поддерживает технологию WebSocket. Установите последнюю версию браузера.';
const errorUpdateApp = 'ВНИМАНИЕ !!! Установите новую версию приложения E-IMZO или Браузера E-IMZO.<br /><a href="https://e-imzo.uz/main/downloads/" role="button">Скачать ПО E-IMZO</a>';
const errorWrongPassword = 'Пароль неверный.';
/**
 * Register component
 */
export default {
  components: {
    AuthLayout,
    FormWizard,
    TabContent,
    WizardButton,
    WizardStep,
    ESigns
  },
  page: {
    title: "Register",
    meta: [{ name: "description", content: appConfig.description }],
  },
  data: () => ({
    registerInProgress: false,
    isUsernameValid: null,
    interval: null,
    intervalForMail: null,
    isTimerOn: false,
    isTimerOnForMail: false,
    resendTimerSeconds: 119,
    resendTimerSecondsForMail: 119,
    currentLocale: {},
    showPassword: false,
    codeSent: false,
    disableGetCodeButton: false,
    disableConfirmBtn: false,
    isLoadingDistricts: false,
    districts: [], // DISTRICT - TUMAN
    isLoadingRegions: false,
    regions: [], // REGION - VILOYAT
    signupForm: {
      organisation: {
        shortName: null,
        fullName: null,
        inn: null,
        regionId: null,
        districtId: null,
        address: null,
        director: null,
        accounter: null,
        oked: null,
      },
      user: {
        inn: null,
        position: null,
        username: null,
        firstName: null,
        middleName: null,
        lastName: null,
        password: null,
        phoneNumber: null,
        mail: null,
        passwordConfirm: null,
      },
      verifyCode: null,
      signedData: null,
    },
    checkUsernameLoading: false,
    debounce: null,
    valid: true,
    KeySelected: false,
    currentSelectedEimzoKey: null,
    publicOfferCheckbox: false,
    publicOfferAccepted: false,
    e1: 1,
    steps: 3,
  }),

  /*
  * COMPUTED */
  computed: {
    ...mapState(["locales"]),
  },

  /*
  * METHODS */
  methods: {
    customLabelDistrict(opt) {
      let selectedDistrict = this.districts.find(e => e.id === opt);
      if (selectedDistrict) {
        return `${this.getName(selectedDistrict)}`
      }
      return ``;
    },
    customLabelRegion(opt) {
      let selectedRegion = this.regions.find(e => e.id === opt);
      if (selectedRegion) {
        return `${this.getName(selectedRegion)}`
      }
      return ``;
    },
    async regionSelected($event, dontResetDistrict = false) {
      if (!dontResetDistrict) {
        this.signupForm.organisation.districtId = null
      }
      // GET DISTRICTS
      if ($event)
        await helperService.getGeoLocationsByParentId($event)
            .then(res => {
              this.districts = res.data
            })
            .catch(e => {
              console.log(e)
            })
    },
    signup() {
      AuthService
          .signup(this.signupForm)
          .then((res) => {
            this.$toast(this.$t('auth.successfully_registered'), { type: 'success' });
            this.$router.push({ name: 'MailOrPhoneConfirmed' })
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
          });
    },
    async wsError() {
      if (e) {
        this.$toast(errorCAPIWS + " : " + e, { type: 'error' });
      } else {
        this.$toast(errorBrowserWS, { type: 'error' });
      }
    },
    async signForProvider() {
      this.registerInProgress = true;
      let vm = this;
      const clientInn = vm.signupForm.organisation ? vm.signupForm.organisation.inn : vm.signupForm.user.inn
      let data = JSON.stringify({
        ClientTin: clientInn,
        ProviderTins: []
      });
      const promise = new Promise((resolve, reject) => {
        EIMZOClient.loadKey(vm.currentSelectedEimzoKey, function (id) {
          EIMZOClient.createPkcs7(id, data, null, function (pkcs7) {
            resolve(pkcs7);
          }, function (e, r) {
            reject('error');
            vm.registerInProgress = false;
            if (r) {
              if (r.indexOf("BadPaddingException") !== -1) {
                vm.$toast(errorWrongPassword, { type: 'error' });
              } else {
                if (r === 'keystore password was incorrect') {
                  vm.$toast(vm.$t('auth.wrong_password'), { type: 'error' });
                } else {
                  vm.$toast(r, { type: 'error' });
                }
              }
            } else {
              vm.$toast(errorBrowserWS, { type: 'error' });
            }
            if (e) vm.wsError(e);
          });
        }, function (e, r) {
          reject('error');
          vm.registerInProgress = false;
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
          async (success) => {
            /* vm.registerInProgress = false;
            vm.signupForm.signedData = success;
            vm.signup(); */
            await vm.setKeySelectedTrue();
          },
          error => {
            vm.registerInProgress = false;
          },
      )
    },
    confirmPhone() {
      this.$refs.thirdStepObserver.validate()
          .then((valid) => {
            if (valid) {
              this.disableConfirmBtn = true
              AuthService
                  .confirmPhone(this.signupForm)
                  .then((res) => {
                    this.$toast(this.$t('auth.successfully_registered'), { type: 'success' });
                    this.$router.push({ name: 'Login' })
                  })
                  .catch((err) => {
                    console.log(err);
                  })
                  .finally(() => {
                    this.disableConfirmBtn = false
                  });
            } else {
              this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
            }
          })
          .catch(e => console.log(e))
    },
    toggleTimer(forMail = false) {
      let vm = this
      if (forMail) {
        if (this.isTimerOnForMail) {
          this.codeSent = false
          this.disableGetCodeButton = false
          clearInterval(this.intervalForMail);
        } else {
          this.intervalForMail = setInterval(function () {
            vm.incrementTime(true);
          }, 1000);
        }
        this.isTimerOnForMail = !this.isTimerOnForMail
      } else {
        if (this.isTimerOn) {
          this.codeSent = false
          this.disableGetCodeButton = false
          clearInterval(this.interval);
        } else {
          this.interval = setInterval(this.incrementTime, 1000);
        }
        this.isTimerOn = !this.isTimerOn
      }
    },
    incrementTime(forMail = false) {
      if (forMail) {
        this.resendTimerSecondsForMail = parseInt(this.resendTimerSecondsForMail) - 1;
        // if (this.resendTimerSecondsForMail < 10) {
        //     this.resendTimerSecondsForMail = this.resendTimerSecondsForMail;
        // }
        if (parseInt(this.resendTimerSecondsForMail) === 0) {
          this.isTimerOnForMail = true
          this.resendTimerSecondsForMail = 119;
          this.toggleTimer(forMail);
        }
      } else {
        this.resendTimerSeconds = parseInt(this.resendTimerSeconds) - 1;
        // if (this.resendTimerSeconds < 10) {
        //     this.resendTimerSeconds = this.resendTimerSeconds;
        // }
        if (parseInt(this.resendTimerSeconds) === 0) {
          this.isTimerOn = true;
          this.resendTimerSeconds = 119;
          this.toggleTimer();
        }
      }

    },
    ...mapMutations({
      setLocale: "SET_LOCALE"
    }),
    async changeLocale(localeCode) {
      if (this.$i18n.locale !== localeCode) {
        // window.location.reload();
        await this.setLocale(localeCode);
        this.currentLocale = this.locales.find(locale => locale.code === localeCode)
      }
    },
    async confirmLocaleChange(localeCode) {
      await this.changeLocale(localeCode)
    },
    /* getConfirmCodeMail () {
        this.signupForm.user.isMailConfirmation = true
        this.signupForm.verifyCode = null
        this.$refs.thirdStepObserver.reset()
        this.disableGetCodeButton = true
        AuthService
            .sendVerifyCodeToMail(this.signupForm)
            .then((res) => {
                this.$toast(this.$t('auth.code_is_sent'), { type: 'success' });
                this.codeSent = true
                this.toggleTimer(true)
            })
            .catch((err) => {
                this.codeSent = false
                this.disableGetCodeButton = false
                console.log(err);
            })
            .finally(() => {
            });
    }, */
    getConfirmCode(isMail = false) {
      this.signupForm.user.isMailConfirmation = isMail
      this.signupForm.verifyCode = null
      this.$refs.thirdStepObserver.reset()
      this.disableGetCodeButton = true
      let payload = Object.assign({}, this.signupForm)
      AuthService
          .sendVerifyCode(payload, true)
          .then((res) => {
            this.$toast(this.$t('auth.code_is_sent'), { type: 'success' });
            this.codeSent = true
            this.toggleTimer(isMail)
          })
          .catch((err) => {
            this.codeSent = false
            this.disableGetCodeButton = false
            console.log(err);
          })
          .finally(() => {
          });
    },
    /*async debounceSearchGeoRegion(searchQuery, parentId = 0) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(async () => {
        if (parentId && parentId !== 0) {
          this.districts = [];
          this.isLoadingDistricts = true;
        } else {
          this.isLoadingRegions = true
          this.regions = []
        }
        await this.searchGeoRegion(searchQuery, parentId)
      }, 800);
    },*/
    searchGeoRegion(searchQuery = '', parentId = 0) {
      /* helperService
          .fetchItemsByParentId('geographical-region', parentId)
          .then((res) => {
              if (parentId && parentId !== 0) {
                  this.districts = res.data;
                  this.isLoadingDistricts = false;
              } else {
                  this.regions = res.data
                  this.isLoadingRegions = false
              }
          })
          .catch((err) => {
              console.log(err);
          })
          .finally(() => {
              this.isLoadingDistricts = false;
              this.isLoadingRegions = false
          }); */
    },
    customLabel(item) {
      return `${item.name}`
    },
    async onBlurUsernameInput(value) {
      if (!this.isUsernameValid) {
        await this.checkNoUsername(value, true)
      }
    },
    async debounceCheckUsername(searchText) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(async () => {
        await this.checkNoUsername(searchText)
      }, 1000);
    },
    checkNoUsername(searchQuery = '', fromOnBlur = false) {
      /*
      * AVOID MULTIPLE REQUESTS AT ONCE */
      if (this.checkUsernameLoading)
        return
      this.checkUsernameLoading = true;
      AuthService
          .checkNoUsername(searchQuery)
          .then((res) => {
            this.isUsernameValid = res.data
            if (!this.isUsernameValid) {
              this.$refs.firstStepObserver.setErrors({ username: [this.$t('validator.username_already_in_use')] });
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
              let usernameInput = this.$refs.username.$el.querySelector('input')
              setTimeout(() => {
                usernameInput.focus()
              }, 50)
            }
          });
    },
    acceptPublicOffer() {
      this.publicOfferAccepted = true
      window.scrollTo(0, 0)
    },
    backToLogin() {
      this.$router.push({ name: 'Login' });
    },
    async eimzoKeySelected(resAndCurrentItem) {
      await this.searchGeoRegion()
      this.currentSelectedEimzoKey = resAndCurrentItem.currentItem;
      this.signupForm = Object.assign({}, resAndCurrentItem.responseData)
      if (this.signupForm.user) {
        this.signupForm.user.inn = resAndCurrentItem.currentItem.UID
        this.signupForm.user.position = resAndCurrentItem.currentItem.T
        this.signupForm.user.username = this.getOnlyCharacter(this.signupForm.user.firstName.toLowerCase()) + '.' + this.getOnlyCharacter(this.signupForm.user.lastName.toLowerCase());
      } else if (this.signupForm.organisation) {
        const director = this.signupForm.organisation.apiFromSoliq.director
        const directorContact = this.signupForm.organisation.apiFromSoliq.directorContact
        this.signupForm.user.inn = director.inn
        this.signupForm.user.position = resAndCurrentItem.currentItem.T
        this.signupForm.user.username = this.getOnlyCharacter(director.firstName.toLowerCase()) + '.' + this.getOnlyCharacter(director.lastName.toLowerCase());
        this.signupForm.user.firstName = director.firstName
        this.signupForm.user.middleName = director.middleName
        this.signupForm.user.lastName = director.lastName
        this.signupForm.user.phoneNumber = directorContact.phone || null;
        this.signupForm.user.mail = directorContact.mail || null;
      }
      // await this.setKeySelectedTrue();
      await this.signForProvider()
    },
    // for next step when key selected
    async setKeySelectedTrue() {
      this.KeySelected = true;
    },
    nextStep(props) {
      if (props.activeTabIndex === 2) {
        // IT IS FOR CONFIRM
        this.e1 = 1
      } else if (props.activeTabIndex === 0) {
        //  IT IS 1ST STEP
        this.$refs.firstStepObserver.validate()
            .then((valid) => {
              if (valid) {
                props.nextTab()
                // GET REGIONS
                if (!this.regions.length || !this.districts.length) {
                  helperService.fetchRegions()
                      .then(res => {
                        this.regions = res.data
                        this.regionSelected(this.signupForm.organisation.regionId, true)
                      })
                      .catch(e => {
                        console.log(e)
                      })
                }
              } else {
                this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
              }
            })
            .catch(e => console.log(e))
        return true
      } else if (props.activeTabIndex === 1) {
        //  IT IS 2ND STEP
        this.$refs.secondStepObserver.validate()
            .then((valid) => {
              if (valid) {
                props.nextTab()
              } else {
                this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
              }
            })
            .catch(e => console.log(e))
      }
    },
    /* submit () {
        this.$refs.form.validate();
        if (this.$refs.form.validate(true)) {
            this.$router.push({ path: "/pages/fulllogin" });
        }
    } */
  },

  /*
  * MOUNTED */
  mounted() {
    document.body.classList.add("auth-body-bg");
    // this.currentLocale = this.locales.find(locale => locale.code === this.$i18n.locale)
  },

  /*
  * WATCH */
  /* watch: {
      'signupForm.organisation.regionId': {
          handler (newVal, oldVal) {
              if (newVal) {
                  if (oldVal)
                      this.signupForm.organisation.districtId = null
                  this.searchGeoRegion('', newVal)
              }
          }
      }
  } */
};
</script>

<template>
  <!-- PUBLIC OFFER -->
  <div v-if="!publicOfferAccepted">
    <b-card
        no-body
        class="publicOfferCard"
    >
      <b-card-title
          header-tag="header"
          class="text-center h3"
      >
        <h4 class="mt-3">{{ $t('auth.public_offer') }}</h4>
      </b-card-title>
      <b-card-text class="text-left px-4">

        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;"><br/> _________________________________________, в лице ______________, действующего на основании ___________________ с одной стороны (именуемый в дальнейшем &laquo;Информационный посредник&raquo;), и ООО (ИП) _______________, (именуемый в дальнейшем &laquo;Клиент&raquo;) с другой стороны, а вместе именуемые &laquo;Стороны&raquo;, заключили настоящий </span></span></span><span
            style="color: #ff0000;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;"><span
            lang="uz-Cyrl-UZ">договор</span></span></span></span> <span style="color: #3c4b64;"><span
            style="font-family: 'Segoe UI', serif;"><span
            style="font-size: medium;">по оказанию информационных услуг.</span></span></span></span></span></p>
        <ol>
          <li>
            <p align="center"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
                style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span
                style="font-size: medium;"><strong>ОПРЕДЕЛЕНИЕ ТЕРМИНОВ</strong></span></span></span></span></span></p>
          </li>
        </ol>
        <p align="justify"><a name="_Hlk75965691"></a> <span style="font-family: 'Times New Roman', serif;"><span
            style="font-size: large;"><span style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span
            style="font-size: medium;">Система &laquo;</span></span></span><span style="color: #3c4b64;"><span
            style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;"><span
            lang="en-US">FAIR</span></span></span></span> <span style="color: #3c4b64;"><span
            style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;"><span
            lang="en-US">Tech</span></span></span></span><span style="color: #3c4b64;"><span
            style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">&raquo; (далее &ndash; Система) &ndash; специально разработанная информационная система, представляющая собой _______________ (далее &ndash; программные средства Системы), позволяющая ___________________ ____________________, а также для предоставления сопутствующего сервиса </span></span></span><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">Владелец &ndash; Антимонопольный комитет Республики Узбекистан предоставляющий услуги, связанные с _________________ в соответствии с законодательством Республики Узбекистан</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">Клиент &ndash; юридическое лицо или физическое лицо, занимающиеся предпринимательской деятельностью без образования юридического лица, акцептовавшее настоящую оферту</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">Сайт Системы https://</span></span></span><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;"> &ndash; ресурс Антимонопольного комитета Республики Узбекистан в глобальной компьютерной сети Интернет, на котором Антимонопольный комитет Республики Узбекистан размещает информацию о собственных услугах, включая информацию о любых изменениях в настоящую Оферту, раскрытие которой предусмотрено настоящей Офертой. Постоянный адрес сайта Системы https:// </span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">Личный кабинет &ndash; сервис, предоставляемый Антимонопольным комитетом Республики Узбекистан своим Клиентам для управления предоставляемыми услугами, </span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">Участник - отправитель электронного документа и получатель электронного документа</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">Регламент &ndash; совокупность правил, определяющих порядок работы Система &laquo;FAIR Tech&raquo; и являющаяся неотъемлемой частью настоящей публичной оферты</span></span></span></span></span>
        </p>
        <ol start="2">
          <li>
            <p align="center"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
                style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span
                style="font-size: medium;"><strong>ПРЕДМЕТ ПУБЛИЧНОЙ ОФЕРТЫ</strong></span></span></span></span></span>
            </p>
          </li>
        </ol>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">2.1. Антимонопольный комитет Республики Узбекистан в рамках </span></span></span><span
            style="color: #ff0000;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">настоящего </span></span></span><span
            style="color: #ff0000;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;"><span
            lang="uz-Cyrl-UZ">договора</span></span></span></span> <span style="color: #3c4b64;"><span
            style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">подключает Клиента к Системе ___________и оказывает услуги по организации электронного документооборота, а Клиент принимает и обязуется оплачивать оказанные услуги в размерах и порядке, согласно условиям </span></span></span><span
            style="color: #ff0000;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">настоящего </span></span></span><span
            style="color: #ff0000;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;"><span
            lang="uz-Cyrl-UZ">договора</span></span></span></span><span style="color: #3c4b64;"><span
            style="font-family: 'Segoe UI', serif;"><span
            style="font-size: medium;">.</span></span></span></span></span></p>
        <ol start="3">
          <li>
            <p align="center"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
                style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span
                style="font-size: medium;"><strong>ОБЩИЕ ПОЛОЖЕНИЯ</strong></span></span></span></span></span></p>
          </li>
        </ol>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">3.1. Стороны признают электронные документы, подписанные электронной подписью, оформляемые посредством Системе &laquo;FAIR Tech&raquo; равнозначными документу на бумажном носителе, подписанному собственноручной подписью и заверенному печатью, признают все юридические действия, оформляемые посредством электронных документов, и договариваются не оспаривать законность и действительность указанных действий только на том основании, что они совершены в электронном виде.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">3.2. Стороны признают применение средств криптографической защиты информации, программно-аппаратных и организационных мер информационной безопасности в соответствии с Регламентом Системы ___________, достаточным для обеспечения конфиденциальности и целостности информации и невозможности ее фальсификации при организации электронного документооборота.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">3.3. Клиент несет сам ответственность перед Антимонопольным комитетом Республики Узбекистан за достоверность и правильность данных в электронных документах.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">3.4. Клиент не может ни при каких обстоятельствах распространять и отправлять информацию, направленную на подрыв государственного, конституционного и общественного строя, нарушение территориальной целостности, политической независимости и государственного суверенитета Республики Узбекистан и иных государств, пропаганду войны, терроризма, насилия, национальной исключительности и религиозной ненависти, расизма и его разновидностей (антисемитизм, фашизм), порочащую, честь и достоинство граждан Республики Узбекистан, вмешательство в их личную жизнь, материалы порнографического содержания, любую информацию, содержащую компьютерные вирусы или другие компоненты, приравненные к ним, а также совершение других действий, влекущих за собой уголовную ответственность.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">3.5. Предусмотренные настоящей публичной офертой услуги оказываются при условии наличия у Клиента программного средства пользователя Системы &laquo;FAIR Tech&raquo;, реализующего функции, предусмотренные действующими нормативными правовыми и иными актами, Перечень программных средств пользователя Системы &laquo;FAIR Tech&raquo; опубликован на сайте https:// </span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">3.8. Настоящая публичная оферта и возникающие из нее правоотношения Сторон регулируются действующим законодательством Республики Узбекистан: &bull; Законом Республики Узбекистан &laquo;О конкуренции&raquo; и другими.</span></span></span></span></span>
        </p>
        <ol start="4">
          <li>
            <p align="center"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
                style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span
                style="font-size: medium;"><strong>ПРАВА И ОБЯЗАННОСТИ СТОРОН</strong></span></span></span></span></span>
            </p>
          </li>
        </ol>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">4.1. Клиент вправе получать от Антимонопольного комитета Республики Узбекистан консультации по вопросам, связанным с обменом электронных документов в Системе &laquo;FAIR Tech&raquo;.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">4.2. Антимонопольный комитет Республики Узбекистан имеет право вносить изменения и дополнения в Регламент (в том числе, путем утверждения Регламента в новой редакции) с последующим уведомлением Клиента.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">4.3. Антимонопольный комитет Республики Узбекистан имеет право инициировать расторжение настоящей Публичной оферты в случае неисполнения или ненадлежащего исполнения Клиентом обязанностей, предусмотренных настоящей Публичной офертой.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">4.4. Антимонопольный комитет Республики Узбекистан имеет право приостанавливать предоставление услуг Клиентам в случае нарушения ими установленных правил.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">4.5. Клиент обязуется выполнять требования Регламента и условия настоящей публичной оферты.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">4.6. Клиент обязуется устанавливать необходимые аппаратные средства в соответствии с требованиями к минимальным или рекомендуемым техническим характеристикам компьютера, а также поддерживать их в работоспособном состоянии.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">4.7. Клиент обязуется использовать полученные в рамках настоящей публичной оферты от Антимонопольного комитета Республики Узбекистан программно-технические средства только в рамках своей деятельности в Системе &laquo;FAIR Tech&raquo; и не передавать их третьим лицам.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">4.8. Исключить возможность проведения декомпиляции, модификации программного кода, не совершать относительно указанных программно-технических средств других действий, нарушающих действующее законодательство.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">4.9. Клиент обязуется не совершать действий, способных привести к нарушению целостности Системы &laquo;FAIR Tech&raquo;, а также незамедлительно сообщать в Антимонопольный комитет Республики Узбекистан о ставших известными клиенту попытках третьих лиц совершить действия, направленные на нарушение целостности Системы &laquo;FAIR Tech&raquo; </span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">4.10. Самостоятельно обеспечивать доступ через сеть общего пользования Интернет к телекоммуникационным ресурсам Антимонопольного комитета Республики Узбекистан, используемым в Системе &laquo;FAIR Tech&raquo;. </span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">4.11. Самостоятельно (или через уполномоченных лиц) не реже одного раза в неделю: - обращаться на сайт https:// &ndash; для своевременного ознакомления с изменениями, произведенными в составе и условиях предоставления услуг (в том числе финансовых) - обращаться в личный кабинет Клиента на сайте https:// для своевременного получения информации по настоящей оферте от Антимонопольного комитета Республики Узбекистан -осуществлять прием информации с помощью программных средств пользователя Системы &laquo;FAIR Tech&raquo; для своевременного получения электронных документов Антимонопольного комитета Республики Узбекистан, других участников Системы &laquo;FAIR Tech&raquo;, формируемых в рамках настоящей Публичной оферты.</span></span></span></span></span>
        </p>
        <ol start="5">
          <li>
            <p align="center"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
                style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span
                style="font-size: medium;"><strong>ОТВЕТСТВЕННОСТЬ СТОРОН</strong></span></span></span></span></span>
            </p>
          </li>
        </ol>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">5.1. За неисполнение и/или ненадлежащее исполнение обязательств по настоящей публичной оферте Стороны несут ответственность в соответствии с действующим законодательством Республики Узбекистан.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">5.2. В случае отсутствия технической возможности направить уведомление об обстоятельствах непреодолимой силы в результате действия таких обстоятельств, Сторона, затронутая обстоятельствами непреодолимой силы, обязана сообщить о них незамедлительно, как только это будет возможно.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">5.3. Несвоевременное извещение Стороны другой Стороной, для которой была создана невозможность выполнения обязательств по настоящей Публичной оферте, о наступлении форс-мажорных обстоятельств влечет за собой утрату права ссылаться на такие обстоятельства как на основании освобождения от ответственности.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">5.4. За неисполнение либо ненадлежащее исполнение обязательств по настоящей Публичной оферте Стороны несут ответственность, предусмотренную настоящей офертой, а также законодательством Республики Узбекистан.</span></span></span></span></span>
        </p>
        <ol start="6">
          <li>
            <p align="center"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
                style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span
                style="font-size: medium;"><strong>КОНФИДЕНЦИАЛЬНОСТЬ</strong></span></span></span></span></span></p>
          </li>
        </ol>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">6.1. Под конфиденциальной информацией подразумевается любая информация и данные, письменные или устные, включающие, помимо прочего, деловую, коммерческую, в том числе информацию о налоговой, бухгалтерской и иной отчетности, о ценах и объемах продаж, исследовательскую, производственную информацию, информацию о разработках, деятельности, результативности работы, процессах, продуктах и любую иную коммерческую и техническую информацию, ноу-хау, образцы, модели, аппаратуру (при наличии таковой) и все носители данных, содержащие или раскрывающие такую информацию и технологии, которые разглашаются Сторонами друг другу в соответствии с настоящей Публичной офертой.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">6.2. Конфиденциальная информация, которой обмениваются Стороны в соответствии с настоящей Публичной офертой, не распределяется, не раскрывается или не распространяется каким-либо способом или в какой-либо форме получающей стороной кому-либо, кроме своих собственных служащих, и привлекаемых для исполнения обязательств, предусмотренных настоящей Публичной офертой и приложениями к ней, третьих лиц, у которых есть обоснованная необходимость знать вышеуказанную информацию.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">6.3. Обязательства не применимы к любой информации, которая: уже находится в общедоступной сфере или становится доступной общественности без нарушения получающей стороной правомерно находилась в распоряжении получающей стороны без обязательства о неразглашении конфиденциальной информации до ее получения от раскрывающей стороны, что подтверждается письменными документами получающей стороны согласно имеющимся доказательствам правомерно получена от третьей стороны без обязательства о неразглашении конфиденциальной информации одобрена для обнародования путем письменного согласия раскрывающей стороны подлежит обязательному оглашению согласно нормам действующего законодательства РУз.</span></span></span></span></span>
        </p>
        <ol start="7">
          <li>
            <p align="center"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
                style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span
                style="font-size: medium;"><strong>УРЕГУЛИРОВАНИЕ СПОРОВ</strong></span></span></span></span></span></p>
          </li>
        </ol>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">7.1. Все споры, разногласия или требования, претензии, конфликтные и спорные ситуации, которые могут возникнуть при исполнении настоящей Публичной офертой, разрешаются Сторонами путем переговоров.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">7.2. В случае, если возникшая ситуация не разрешена путем переговоров, в случае прямого или косвенного отказа одной из Сторон от участия в переговорах, а также в иных случаях, если одна из Сторон считает, что ее права были нарушены, она обязана направить Стороне, которая, по его мнению, нарушила ее права, мотивированную письменную претензию.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">7.3. Сторона, получившая претензию, обязана в срок до 30 (тридцати) дней с момента ее получения удовлетворить требования претензии или представить мотивированный отказ в их удовлетворении. Непредставление ответа на претензию в течение указанного срока может рассматриваться в качестве отказа в удовлетворении требований претензии.</span></span></span></span></span>
        </p>
        <ol start="8">
          <li>
            <p align="center"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
                style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span
                style="font-size: medium;"><strong>РАСТОРЖЕНИЕ ОФЕРТЫ</strong></span></span></span></span></span></p>
          </li>
        </ol>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">8.1. Любая из Сторон вправе расторгнуть настоящую Публичную оферту в одностороннем порядке, известив об этом другую Сторону в письменном виде не позднее чем за 15 (Пятнадцать) дней до предполагаемой даты расторжения настоящей Публичной оферты. Стороны осуществляют окончательные взаиморасчеты в течение 10 (Десяти) дней с даты расторжения оферты.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">8.2. Антимонопольный комитет Республики Узбекистан вправе в одностороннем порядке отказаться от исполнения настоящей Публичной оферты без предварительного оповещения Клиента в случае нарушения Клиентом положений настоящей Публичной оферты, направив Клиенту в разумный срок соответствующее уведомление.</span></span></span></span></span>
        </p>
        <ol start="9">
          <li>
            <p align="center"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
                style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span
                style="font-size: medium;"><strong>ПОРЯДОК ВНЕСЕНИЯ ИЗМЕНЕНИЙ В ОФЕРТУ</strong></span></span></span></span></span>
            </p>
          </li>
        </ol>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">9.1. Вследствие совершенствования процесса оказания услуг, Антимонопольный комитет Республики Узбекистан вправе изменять условия настоящей Публичной оферты, публикуя уведомления о таких изменениях или его новые редакции на своем web-сайте. При этом Антимонопольный комитет Республики Узбекистан подтверждает, что вносимые в настоящую Оферту изменения не отменяют ранее акцептованных условий предыдущей редакции настоящей Оферты.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">9.2. Изменения и/или дополнения, вносимые Антимонопольным комитетом Республики Узбекистан в официальные документы в связи с изменением законодательного и нормативного регулирования, вступают в силу одновременно с вступлением в силу изменений в указанных актах.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">9.3. Изменения и/или дополнения, вносимые Антимонопольным комитетом Республики Узбекистан в официальные документы в связи с расширением состава услуг, изменением терминологии, изменением структурного содержания официальных документов и другими подобными изменениями, вступают в силу после опубликования соответствующих документов на сайте Антимонопольного комитета Республики Узбекистан.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">9.4. С целью обеспечения гарантированного ознакомления всех лиц, присоединившихся к настоящей Публичной оферте до вступления в силу изменений и/или дополнений, настоящей офертой установлена обязанность для Клиента не реже одного раза в неделю самостоятельно или через уполномоченных лиц обращаться на сайт Антимонопольного комитета Республики Узбекистан за сведениями об изменениях, произведенных в составе и условиях предоставления услуг (в том числе финансовых), определенных официальными документами Антимонопольного комитета Республики Узбекистан. Акцепт настоящей Публичной оферты на иных условиях не допускается.</span></span></span></span></span>
        </p>
        <ol start="10">
          <li>
            <p align="center"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
                style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span
                style="font-size: medium;"><strong>ДОПОЛНИТЕЛЬНЫЕ УСЛОВИЯ</strong></span></span></span></span></span>
            </p>
          </li>
        </ol>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">10.1. Названия разделов настоящей Оферты используются только в целях удобства и ссылок, и не оказывают влияния на структуру или толкование его условий.</span></span></span></span></span>
        </p>
        <p align="justify"><a name="_GoBack"></a> <span style="font-family: 'Times New Roman', serif;"><span
            style="font-size: large;"><span style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span
            style="font-size: medium;">10.2. Клиент подтверждает, что он ознакомлен и согласен с услугами Антимонопольного комитета Республики Узбекистан, содержанием и условиями, изложенными в Регламенте и обязуется их соблюдать.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">10.3. Правоотношения, не урегулированные настоящей Офертой, регулируются в соответствии с действующим законодательством РУз.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">10.4. По всем вопросам, не урегулированном в настоящем Договоре, Стороны руководствуются действующим законодательством Узбекистана.</span></span></span></span></span>
        </p>
        <p align="justify"><span style="font-family: 'Times New Roman', serif;"><span style="font-size: large;"><span
            style="color: #3c4b64;"><span style="font-family: 'Segoe UI', serif;"><span style="font-size: medium;">10.5. Клиент не имеет права передавать свои права и обязанности настоящей Публичной оферте третьей стороне без согласия Антимонопольного комитета Республики Узбекистан.</span></span></span></span></span>
        </p>
        <p align="justify">&nbsp;</p>
        <p align="justify">&nbsp;</p>
      </b-card-text>
      <footer
          footer-tag="footer"
          class="text-right d-flex align-items-center justify-content-between"
      >
        <b-form-checkbox
            v-model="publicOfferCheckbox"
            name="acceptPublicOffer"
            class="form-check mb-3"
        >{{ $t('auth.accept_public_offer') }}
        </b-form-checkbox>
        <div class="publicOfferButtons mb-3">
          <b-button
              variant="warning"
              style="margin-right: 1rem;"
              :to="{name: 'Login'}"
          > {{ $t('actions.back') }}
          </b-button>
          <b-button
              v-if="publicOfferCheckbox"
              variant="primary"
              @click="publicOfferAccepted = !publicOfferAccepted"
          >
            {{ $t('auth.registration') }}
          </b-button>
        </div>
      </footer>
    </b-card>
  </div>
  <ESigns
      v-else-if="!KeySelected"
      @keySelected="eimzoKeySelected($event)"
      @back="$router.push({name: 'Login'})"
  ></ESigns>
  <AuthLayout v-else>
    <div class="mt-4 auth-register-form-wrapper">
      <form-wizard
          shape="tab"
          color="#2b6c58"
      >
        <wizard-step
            slot-scope="props"
            slot="step"
            :tab="props.tab"
            :transition="props.transition"
            :index="props.index"
        >
        </wizard-step>
        <!-- <validation-observer
            ref="mainObserver"
            v-slot="{}"
        > -->
        <!--           FIRST STEP           -->
        <tab-content icon="mdi mdi-briefcase-account">
          <validation-observer
              ref="firstStepObserver"
              v-slot="{}"
          >
            <b-row class="mb-3">
              <b-col
                  cols="12"
                  sm="6"
              >
                <BaseInputWithValidation
                    name="username"
                    rules="required"
                    ref="username"
                    v-model="signupForm.user.username"
                    @input="debounceCheckUsername"
                    @blur="onBlurUsernameInput($event.target.value)"
                    :label="$t('auth.username')"
                    :placeholder="$t('auth.username')"
                    class="required"
                />
              </b-col>
              <b-col cols="12" sm="6" >
                <BaseInputWithValidation
                    rules="required"
                    v-model="signupForm.user.firstName"
                    :label="$t('auth.first_name')"
                    :placeholder="$t('auth.first_name')"
                    class="required"
                />
              </b-col>
            </b-row>
            <b-row class="mb-3">
              <b-col cols="12" sm="6" >
                <BaseInputWithValidation
                    rules="required"
                    v-model="signupForm.user.lastName"
                    :label="$t('auth.last_name')"
                    :placeholder="$t('auth.last_name')"
                    class="required"
                />
              </b-col>
              <b-col cols="12" sm="6" >
                <BaseInputWithValidation
                    rules="required"
                    v-model="signupForm.user.middleName"
                    :label="$t('auth.middle_name')"
                    :placeholder="$t('auth.middle_name')"
                    class="required"
                />
              </b-col>
            </b-row>
            <!--            PHONE AND EMAIL ROW              -->
            <b-row class="mb-3">
              <b-col cols="12" sm="6" >
                <BaseInputWithValidation
                    rules="required"
                    class="required"
                    v-model="signupForm.user.phoneNumber"
                    :label="$t('column.mobile_number')"
                    mask="+998#########"
                    placeholder="+998#########"
                />
              </b-col>
              <b-col
                  cols="12"
                  sm="6"
              >
                <BaseInputWithValidation
                    :rules="{email: true, required: true}"
                    placeholder="meningEmail@gmail.com"
                    v-model="signupForm.user.mail"
                    class="required"
                    :label="$t('column.mail')"
                />
              </b-col>
            </b-row>
            <b-row class="mb-3">
              <b-col
                  cols="12"
                  sm="6"
              >
                <BaseInputWithValidation
                    name="password"
                    with-input-append
                    class="required password-in-register"
                    :rules="{'required':true,'regex':/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/}"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="signupForm.user.password"
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
                  cols="12"
                  sm="6"
              >
                <BaseInputWithValidation
                    with-input-append
                    class="required password-in-register"
                    rules="required|password:@password"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="signupForm.user.rePassword"
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
          </validation-observer>
          <!-- end row -->
        </tab-content>
        <!-- SECOND STEP -->
        <tab-content icon="mdi mdi-office-building">
          <validation-observer
              ref="secondStepObserver"
              v-slot="{}"
          >
            <b-row class="mb-3">
              <b-col
                  cols="12"
                  sm="6"
              >
                <BaseInputWithValidation
                    name="INN"
                    :rules="{required: true, regex: /\b\d{9}\b/}"
                    :value="signupForm.organisation.inn"
                    disabled
                    mask="#########"
                    :label="$t('column.inn')"
                    placeholder="123456789"
                    class="required"
                />
              </b-col>
              <b-col
                  cols="12"
                  sm="6"
              >
                <BaseInputWithValidation
                    rules="required"
                    v-model="signupForm.organisation.address"
                    :label="$t('column.address')"
                    :placeholder="$t('column.address')"
                    class="required"
                />
              </b-col>
            </b-row>
            <b-row class="mb-3">
              <b-col
                  cols="12"
                  sm="6"
              >
                <BaseInputWithValidation
                    rules="required"
                    v-model="signupForm.organisation.fullName"
                    :label="$t('column.full_name')"
                    :placeholder="$t('column.full_name')"
                    class="required"
                />
              </b-col>
              <b-col
                  cols="12"
                  sm="6"
              >
                <BaseInputWithValidation
                    rules="required"
                    v-model="signupForm.organisation.shortName"
                    :label="$t('column.short_name')"
                    :placeholder="$t('column.short_name')"
                    class="required"
                />
              </b-col>
            </b-row>

            <b-row class="mb-3">
              <b-col
                  cols="12"
                  sm="6"
              >
                <BaseMultiselectWithValidation
                    rules="required"
                    class="required"
                    v-model="signupForm.organisation.regionId"
                    @select="regionSelected"
                    :options="regions.map(e => e.id)"
                    :label="$t('column.region')"
                    :custom-label="customLabelRegion"
                    :placeholder="$t('column.region')"
                    open-direction="bottom"
                    :max-height="600"
                    :show-labels="false"
                />
              </b-col>
              <b-col
                  cols="12"
                  sm="6"
              >
                <BaseMultiselectWithValidation
                    rules="required"
                    class="required"
                    v-model="signupForm.organisation.districtId"
                    :options="districts.map(e => e.id)"
                    :label="$t('column.district')"
                    :custom-label="customLabelDistrict"
                    :placeholder="$t('column.district')"
                    open-direction="bottom"
                    :max-height="600"
                    :show-labels="false"
                />
              </b-col>
            </b-row>
            <b-row class="mb-3">
              <b-col
                  cols="12"
                  sm="6"
              >
                <BaseInputWithValidation
                    rules="required"
                    v-model="signupForm.organisation.director"
                    :label="$t('column.director')"
                    :placeholder="$t('column.director')"
                    class="required"
                />
              </b-col>
              <b-col
                  cols="12"
                  sm="6"
              >
                <BaseInputWithValidation
                    rules="required"
                    v-model="signupForm.organisation.accounter"
                    :label="$t('column.accounter')"
                    :placeholder="$t('column.accounter')"
                    class="required"
                />
              </b-col>
            </b-row>
            <b-row class="mb-3">
              <b-col
                  cols="12"
                  sm="6"
              >
                <BaseInputWithValidation
                    :rules="{required: true, regex: /\b\d{5}\b/}"
                    class="required"
                    v-model="signupForm.organisation.oked"
                    mask="#####"
                    :label="$t('column.oked')"
                    placeholder="12345"
                />
              </b-col>
              <b-col
                  cols="12"
                  sm="6"
              >
              </b-col>
            </b-row>
          </validation-observer>
        </tab-content>
        <!-- THIRD STEP -->
        <tab-content icon="mdi mdi-checkbox-marked-circle">
          <validation-observer
              ref="thirdStepObserver"
              v-slot="{}"
          >
            <b-row>
              <b-col
                  cols="6"
                  class="pb-0"
              >
                <i
                    class="mdi mdi-email-check-outline"
                    style="color: #2b6c58; font-size: 2.5rem;"
                ></i>
                <p class="ml-2 d-inline-block"><b>{{ signupForm.user.mail }}</b></p>
                <p>{{ $t('auth.confirm_with_email') }}</p>
                <b-btn
                    v-if="disableGetCodeButton"
                    disabled
                    variant="primary"
                >
                  {{ $t('auth.send_verify_code') }}
                </b-btn>
                <b-btn
                    v-else
                    variant="primary"
                    @click="getConfirmCode(true)"
                >
                  {{ $t('auth.send_verify_code') }}
                </b-btn>
                <span
                    v-if="isTimerOnForMail && disableGetCodeButton"
                    class="mt-3 d-block"
                >
                                    {{ $t('auth.resend_code_after') }}: <b>{{ resendTimerSecondsForMail >= 60
                    ? `01:${resendTimerSecondsForMail - 60 > 9 ? resendTimerSecondsForMail - 60 : '0' + (resendTimerSecondsForMail - 60)}`
                    : `00:${resendTimerSecondsForMail > 9 ? resendTimerSecondsForMail : '0' + resendTimerSecondsForMail}` }}</b>
                                </span>
              </b-col>

              <b-col
                  cols="6"
                  class="pb-0"
              >
                <i
                    class="mdi mdi-phone-check-outline"
                    style="color: #2b6c58; font-size: 2.5rem;"
                ></i>
                <p class="ml-2 d-inline-block"><b>{{ signupForm.user.phoneNumber }}</b></p>
                <p>{{ $t('auth.confirm_with_phone_number') }}</p>
                <b-btn
                    v-if="disableGetCodeButton"
                    disabled
                    :class="!isTimerOn && disableGetCodeButton ? 'mb-3' : ''"
                    variant="primary"
                >
                  {{ $t('auth.send_verify_code') }}
                </b-btn>
                <b-btn
                    v-else
                    variant="primary"
                    :class="!isTimerOn && !disableGetCodeButton ? 'mb-3' : ''"
                    @click="getConfirmCode(false)"
                >
                  {{ $t('auth.send_verify_code') }}
                </b-btn>
                <span
                    v-if="isTimerOn && disableGetCodeButton"
                    class="mt-3 mb-3 d-block"
                >
                                    {{ $t('auth.resend_code_after')
                  }}: <b>{{ resendTimerSeconds >= 60 ? `01:${resendTimerSeconds - 60 > 9 ? resendTimerSeconds - 60 : '0' + (resendTimerSeconds - 60)}` : `00:${resendTimerSeconds > 9 ? resendTimerSeconds : '0' + resendTimerSeconds}` }}</b>
                                </span>
                <BaseInputWithValidation
                    v-if="!disableGetCodeButton"
                    disabled
                    not-required
                    :value="signupForm.verifyCode"
                    :label="$t('auth.verify_code')"
                    :placeholder="$t('auth.verify_code')"
                    class="required"
                />

                <BaseInputWithValidation
                    v-else
                    rules="required"
                    v-model="signupForm.verifyCode"
                    :label="$t('auth.verify_code')"
                    :placeholder="$t('auth.verify_code')"
                    class="required"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col
                  cols="6"
                  class="pt-3"
              >

              </b-col>
            </b-row>
            <!--              STEP ACTIONS            -->
            <!-- <b-row class="step-actions d-flex justify-space-between">
                <b-col class="flex-grow-0">
                    <b-btn
                        color="warning"
                        @click="e1 -= 1"
                    >
                        {{ $t('actions.back') }}
                    </b-btn>
                </b-col>
                <b-col class="flex-grow-0">
                    <b-btn
                        v-if="registerInProgress"
                        color="success"
                        disabled
                    >
                        {{ $t('auth.confirm') }}
                    </b-btn>
                    <b-btn
                        v-else
                        color="success"
                        @click="signForProvider"
                    >
                        {{ $t('auth.confirm') }}
                    </b-btn>
                </b-col>
            </b-row> -->
          </validation-observer>
        </tab-content>
        <template
            slot="footer"
            slot-scope="props"
        >
          <div class=wizard-footer-left>
            <wizard-button
                v-if="props.activeTabIndex > 0"
                @click.native="props.prevTab()"
                :style="{backgroundColor: '#f1b44c', borderColor: '#f1b44c', color: '#ffffff'}"
            >{{ $t('actions.back') }}
            </wizard-button>
          </div>
          <div class="wizard-footer-right">
            <wizard-button
                v-if="!props.isLastStep"
                @click.native="nextStep(props)"
                class="wizard-footer-right"
                :style="props.fillButtonStyle"
            >{{ $t('actions.next') }}
            </wizard-button>

            <wizard-button
                v-else-if="!disableConfirmBtn"
                @click.native="confirmPhone"
                class="wizard-footer-right finish-button"
                :style="{backgroundColor: '#34c38f', borderColor: '#34c38f', color: '#ffffff'}"
            >{{ $t('actions.confirm') }}
            </wizard-button>
            <!-- DISABLED STATE OF CONFIRM BUTTON -->
            <wizard-button
                v-else
                disabled
                class="wizard-footer-right finish-button"
                :style="{backgroundColor: '#34c38f', borderColor: '#34c38f', color: '#ffffff'}"
            >{{ $t('actions.confirm') }}
            </wizard-button>
          </div>

        </template>
        <!-- </validation-observer> -->
      </form-wizard>

      <div class="mt-5 text-center">
        <p>
          {{ $t('auth.already_registered') }}
          <router-link
              :to="{name: 'Login'}"
              class="fw-medium text-primary"
          >
            {{ $t('auth.login') }}
          </router-link>
        </p>
      </div>
    </div>
  </AuthLayout>
</template>

<style lang="scss" scoped>
::v-deep.auth-register-form-wrapper {
  width: 95%;
  margin-right: auto;
  margin-left: auto;
  @media (max-width: 768px) {
    width: 90%;
  }

  .vue-form-wizard {
    .wizard-icon-circle.tab_shape {
      background-color: #fafafa;

      &#step-0 {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }

      &#step-2 {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }

      .wizard-icon-container.tab_shape {
        border-radius: 10px;
      }
    }
  }

  .password-in-register {
    div.base-form-input-with-append {
      grid-template-columns: 1% 83.5% 4.5% !important;

      @media (min-width: 400px) {
        grid-template-columns: 25% 61.5% 5.5% !important;
      }

      @media (min-width: 579px) {
        grid-template-columns: 25% 58.5% 5.5% !important;
      }

      @media (min-width: 768px) {
        grid-template-columns: 25% 63.5% 9.5% !important;
      }

      @media (min-width: 1200px) {
        grid-template-columns: 25% 61.5% 9.5% !important;
      }

      @media (min-width: 1400px) {
        grid-template-columns: 25% 64.5% 9.5% !important;
      }

      @media (min-width: 1650px) {
        grid-template-columns: 25% 66% 5% !important;
      }
    }
  }
}

.publicOfferCard {
  height: 100vh;
  width: 60vw;
  @media (max-width: 768px) {
    width: 96vw;
    footer {
      flex-wrap: wrap;
    }
    .publicOfferButtons {
      flex: 1 0 100%;
      display: flex;
      justify-content: flex-end;
    }
  }
  margin: 0 auto;

  .card-text {
    overflow: auto;
    font-size: 14px;
  }
}
</style>