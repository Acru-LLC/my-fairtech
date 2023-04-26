<template>
  <div>
    <b-card no-body class="overflow-hidden">
      <section class="contact-page-section">
        <div class="container">
          <div class="sec-title">
            <div class="title">
              {{ $t('send_message.user_send_message') }}
            </div>
            <!--            <h2>Murojaat bo'yicha fuqarolarga habar yuborish.</h2>-->
          </div>
          <div class="inner-container">
            <div class="row clearfix">

              <!--Form Column-->
              <div class="form-column col-md-8 col-sm-12 col-xs-12">
                <div class="inner-column">

                  <!--Contact Form-->
                  <div class="contact-form">
                    <div class="row clearfix">

                      <ValidationObserver
                          ref="observer"
                          v-slot="{}"
                      >

                        <b-row class="ml-2">
                          <b-col
                              sm="9"
                              md="9"
                              class="form-group"
                          >
                            <BaseInputWithValidation
                                rules="required"
                                v-model="appealNumber"
                                :label="$t('send_message.appealNumber')"
                                custom-styles="grid-template-columns: 0% 65%"
                                label-on-top
                                class="required"
                            />

                            <!--                            <BaseDatePickerWithValidation-->
                            <!--                                :label="$t('send_message.muraojaatDate')"-->
                            <!--                                lang="en"-->
                            <!--                                format="DD-MM-YYYY"-->
                            <!--                                v-model="mDate"-->
                            <!--                                class="required"-->
                            <!--                                rules="required"-->
                            <!--                                label-on-top-->
                            <!--                                placeholder="_ _ . _ _ . _ _ _ _"-->
                            <!--                                custom-styles="grid-template-columns: 0% 65%"-->
                            <!--                            ></BaseDatePickerWithValidation>-->

                          </b-col>
                          <b-col
                              sm="3"
                              md="3"
                              class="form-group"
                          ></b-col>
                          <b-col
                              sm="2"
                              md="2"
                              class="form-group"
                          >
                            <BaseInputWithValidation
                                :label="$t('send_message.uzb')"
                                label-on-top
                                placeholder="+998"
                                class="required"
                                :disabled="true"
                            />
                          </b-col>
                          <b-col
                              sm="2"
                              md="2"
                              class="form-group"
                          >
                            <BaseMultiselectWithValidation
                                rules="required"
                                class="required"
                                v-model="phoneId"
                                label-on-top
                                :options="phoneCodes.map(e => e.id)"
                                :label="$t('send_message.code')"
                                :placeholder="$t('send_message.code')"
                                open-direction="bottom"
                                :show-labels="false"
                                :custom-label="customLabelPhoneCode"
                            />
                          </b-col>
                          <b-col
                              sm="5"
                              md="5"
                              class="form-group"
                          >
                            <BaseInputWithValidation
                                type="tel"
                                rules="required"
                                class="required"
                                :label="$t('send_message.phone_number')"
                                label-on-top
                                custom-styles="grid-template-columns: 0% 80%"
                                v-model="phoneNumber"
                                mask="#######"
                                placeholder="###-##-##"
                            />
                          </b-col>
                          <b-col
                              sm="3"
                              md="3"
                              class="form-group"
                          ></b-col>
                          <b-col
                              sm="9"
                              md="9"
                              class="form-group"
                          >

                            <!--                            <label class="mb-2">{{ $t("send_message.region") }}</label>-->
                            <!--                            <b-form-select text-field="text" v-model="region">-->
                            <!--                              <option :value="null" disabled>&#45;&#45; Yuborish uchun hududni tanlang &#45;&#45;</option>-->
                            <!--                              <option v-for="(option, id) in regions" :value="option" :key="id">-->
                            <!--                                {{ option.text }}-->
                            <!--                              </option>-->
                            <!--                            </b-form-select>-->
                            <BaseMultiselectWithValidation
                                rules="required"
                                class="required"
                                v-model="region"
                                label-on-top
                                custom-styles="grid-template-columns: 0% 90%"
                                :options="regions.map(e => e.id)"
                                :label="$t('send_message.region')"
                                :placeholder="$t('send_message.region')"
                                open-direction="bottom"
                                :max-height="600"
                                :show-labels="false"
                                :custom-label="customLabelRegion"
                            />
                          </b-col>
                          <b-col
                              sm="3"
                              md="3"
                              class="form-group"
                          ></b-col>
                          <b-col
                              sm="12"
                              md="12"
                          >
                            <label class="mb-2">{{ $t("send_message.message") }}</label>
                            <div style="border: 1px solid #CED4DA; border-radius: 5px; height: 250px !important;"
                                 v-if="(regionFull && regionFull.isRepublic) ? true : false">
                              <b-aspect v-model="message" :appealNumber="appealNumber" :phoneNumber="phoneNumber"
                                        :region="region"
                                        style="padding: 25px">

                                {{ (appealNumber !== null && appealNumber !== "") ? appealNumber : '_ _ _ _ _ _ _  ' }}
                                murojaatingiz
                                {{
                                  (regionFull !== null && regionFull !== "") ? regionFull.regionalAdministration : '_ _ _ _ _ _ _'
                                }} Raqobat qo‘mitasiga ko‘rib chiqish uchun yuborildi.
                                <br>
                                <br>
                                Aloqa: <span v-if="regionFull !== null">
                                {{ regionFull.phoneNumber }}, {{
                                  regionFull.address
                                }}
                                </span>
                                <span v-else> {{ '_ _ _ _ _ _ _' }}</span>
                              </b-aspect>
                            </div>

                            <div style="border: 1px solid #CED4DA; border-radius: 5px; height: 250px !important;"
                                 v-else>
                              <b-aspect v-model="message" :appealNumber="appealNumber" :phoneNumber="phoneNumber"
                                        :region="region"
                                        style="padding: 25px">

                                {{ (appealNumber !== null && appealNumber !== "") ? appealNumber : '_ _ _ _ _ _ _  ' }}
                                murojaatingiz Raqobat qo‘mitasi
                                {{
                                  (regionFull !== null && regionFull !== "") ? regionFull.regionalAdministration : '_ _ _ _ _ _ _'
                                }}ga ko‘rib chiqish uchun yuborildi.
                                <br>
                                <br>
                                Aloqa: <span v-if="regionFull !== null">
                                {{ regionFull.phoneNumber }}, {{
                                  regionFull.address
                                }}
                                </span>
                                <span v-else> {{ '_ _ _ _ _ _ _' }}</span>
                              </b-aspect>
                            </div>
                          </b-col>
                        </b-row>
                        <!-- Qoraqalpogʻiston Respublikasi Raqobatni rivojlantirish organiga ijroga yuborildi.-->
                      </ValidationObserver>

                      <!--                      <div class="form-group col-md-12 col-sm-12 co-xs-12">-->
                      <!--                        <textarea name="message" placeholder="Massage"></textarea>-->
                      <!--                      </div>-->
                      <div class="form-group col-md-12 col-sm-12 co-xs-12">
                        <button type="submit" class="theme-btn btn-style-one" @click="sendMsg">
                          <b-spinner v-if="loader" label="Spinning"></b-spinner>
                          <span v-else> {{ $t('actions.send') }}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <!--End Contact Form-->

                </div>
              </div>

              <!--Info Column-->
              <div class="info-column col-md-4 col-sm-12 col-xs-12">
                <div class="inner-column">
                  <!--                  <h2>{{$t('send_message.message_info')}}</h2>-->
                  <ul class="list-info">
                    <div style="border: 1px solid #CED4DA; border-radius: 5px; cursor: pointer; padding: 15px">
                      <span
                          style="font-weight: bold; font-size: 18px; color: white">{{
                          $t('send_message.appealNumber')
                        }}</span>
                      <li><i class="fas fa-pen-alt"></i>
                        {{ (appealNumber !== null && appealNumber !== "") ? appealNumber : '_ _ _ _ _' }}
                      </li>
                    </div>
                    <div style="border: 1px solid #CED4DA; border-radius: 5px; cursor: pointer; padding: 15px"
                         class="mt-3">
                      <span
                          style="font-weight: bold; font-size: 18px; color: white">{{ $t('send_message.phone') }}</span>
                      <li><i class="fas fa-phone-alt"></i>
                        +998
                        {{ (phoneCode !== null && phoneCode !== "") ? phoneCode.code : '_ _' }}
                        {{ (phoneNumber !== null && phoneNumber !== "") ? phoneNumber : '_ _ _ _ _' }}
                      </li>
                    </div>
                    <div style="border: 1px solid #CED4DA; border-radius: 5px; cursor: pointer; padding: 15px"
                         class="mt-3">
                      <span
                          style="font-weight: bold; font-size: 18px; color: white">{{
                          $t('send_message.region1')
                        }}</span>
                      <li><i class="fas fa-globe"></i>
                        {{
                          (regionFull !== null && regionFull !== "") ? regionFull.regionalAdministration : '_ _ _ _ _'
                        }}
                      </li>
                    </div>
                  </ul>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </b-card>

  </div>
</template>


<script>
import crudAndListsService from "@/shared/services/crud_and_list.service";
import helperService from "@/shared/services/helper.service";


export default {
  components: {},
  validations: {
    appealNumber: null,
    phoneNumber: null,
    message: null,
    region: null,
    phoneCode: null
  },
  async created() {
    await this.getRegion();
    await this.getPhoneCode();
  },

  watch: {
    region: {
      handler(id) {
        if (id !== null) {
          this.regionFull = this.regions.find(e => e.id == id);
        } else {
          this.regionFull = null;
        }
      },
    },
    phoneId(id) {
      if (id !== null) {
        this.phoneCode = this.phoneCodes.find(e => e.id == id);
      } else {
        this.phoneCode = null;
      }
    },
  },
  computed: {
    computedObserver() {
      return this.$refs.observer
    }
  },
  methods: {
    customLabelRegion(opt) {
      let selectedRegion = this.regions.find(e => e.id == opt);
      if (selectedRegion) {
        return selectedRegion.regionalAdministration;
      }
      return ``;
    },
    customLabelPhoneCode(opt) {
      let selectedCode = this.phoneCodes.find(e => e.id == opt);
      if (selectedCode) {
        return selectedCode.code;
      }
      return ``;
    },

    getValue(v) {
      console.log(v)
      // this.form.tableId = v;
    },
    async getRegion() {
      // this.var_default_search_payload.itemsPerPage = 100
      await crudAndListsService.searchListWithKeyword("message", this.var_default_search_payload)
          .then(res => {
            this.regions = res.data.list
          })
          .catch(e => {
            console.log(e)
          })
    },
    async getPhoneCode() {
      // this.var_default_search_payload.itemsPerPage = 100
      await crudAndListsService.searchListWithKeyword("message-phone-code", this.var_default_search_payload)
          .then(res => {
            this.phoneCodes = res.data.list
          })
          .catch(e => {
            console.log(e)
          })
    },
    async reset() {
      this.appealNumber = null,
          this.phoneNumber = null,
          this.regionFull = null,
          this.phoneCode = null
      this.phoneId = null
      this.region = null
    },
    async sendMsg() {
      this.computedObserver.validate().then(valid => {
        if (valid) {
          this.loader = true
          let info = {
            uNumber: '+998' + this.phoneCode.code + this.phoneNumber,
            mNumber: this.appealNumber,
            isRepublic: this.regionFull.isRepublic,
            rAdministration: this.regionFull.regionalAdministration,
            rAddress: this.regionFull.address,
            rPhoneNumber: this.regionFull.phoneNumber
          }

          helperService.sendMessageToUser(info)
              .then(res => {
                this.$toast(this.$t('send_message.success'), {type: 'success'});
                this.loader = false
                this.computedObserver.reset()
                this.reset();

              })
              .catch(e => {
                console.log(e)
              })
              .finally(f => {
                this.loader = false
              })
        } else {
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      })
    }
  },
  data() {
    return {
      regionFull: null,
      regions: [],
      phoneCodes: [],
      phoneCode: null,
      phoneId: null,
      appealNumber: null,
      phoneNumber: null,
      mDate: null,
      region: null,
      message: null,
      title: null,
      submitted: false,
      loader: false
    };
  }
  ,
}
;
</script>

<style lang="css" scoped>
li, ul {
  list-style: none;
  padding: 0;
  margin: 0
}

.sec-title {
  position: relative;
  padding-bottom: 40px
}

.sec-title .title {
  padding-top: 40px;
  position: relative;
  color: #00b8ca;
  font-size: 18px;
  font-weight: 700;
  padding-right: 50px;
  margin-bottom: 15px;
  /*display: inline-block;*/
  text-transform: none;
}

.sec-title .title:before {
  position: absolute;
  content: '';
  right: 0;
  bottom: 7px;
  width: 40px;
  height: 1px;
  background-color: #bbb
}

.sec-title h2 {
  position: relative;
  color: #252525;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.5em;
  display: block
}

.sec-title.light h2 {
  color: #fff
}

.contact-page-section {
  position: relative;
  padding-bottom: 110px;
}

.contact-page-section .inner-container {
  position: relative;
  z-index: 1;
  background-color: #00b8ca;
  box-shadow: 0 0 15px 5px rgba(0, 0, 0, .1)
}

.contact-page-section .form-column {
  position: relative;
  padding: 0 0 0 15px
}

.contact-page-section .form-column .inner-column {
  position: relative;
  padding: 60px 45px 30px;
  background-color: #fff
}

.contact-page-section .info-column {
  position: relative
}

.contact-page-section .info-column .inner-column {
  position: relative;
  padding: 60px 35px
}

.contact-page-section .info-column h2 {
  position: relative;
  color: #fff;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.4em;
  margin-bottom: 45px
}

.contact-page-section .info-column .list-info {
  position: relative;
  margin-bottom: 60px
}

.contact-page-section .info-column .list-info li {
  position: relative;
  margin-bottom: 25px;
  font-size: 18px;
  color: #fff;
  line-height: 1.8em;
  padding-left: 45px
}

.contact-page-section .info-column .list-info li:last-child {
  margin-bottom: 0
}

.contact-page-section .info-column .list-info li i {
  position: absolute;
  left: 0;
  top: 8px;
  color: #fff;
  font-size: 30px
}

.contact-form {
  position: relative
}

.contact-form .form-group {
  position: relative;
  margin-bottom: 20px
}

.contact-form input[type=text], .contact-form input[type=email], .contact-form textarea {
  position: relative;
  display: block;
  width: 100%;
  height: 60px;
  color: #222;
  font-size: 14px;
  line-height: 38px;
  padding: 10px 30px;
  border: 1px solid #ddd;
  background-color: #fff;
  transition: all .3s ease;
  -ms-transition: all .3s ease;
  -webkit-transition: all .3s ease
}

.contact-form input[type=text]:focus, .contact-form input[type=email]:focus, .contact-form textarea:focus {
  border-color: #00b8ca
}

.contact-form textarea {
  height: 250px;
  resize: none
}

.contact-form .theme-btn {
  font-size: 16px;
  font-weight: 700;
  margin-top: 10px;
  text-transform: capitalize;
  padding: 16px 39px;
  border: 2px solid #00b8ca;
  font-family: Arimo, sans-serif;
  background: #00b8ca;
  display: inline-block;
  position: relative;
  line-height: 24px;
  cursor: pointer;
  color: #fff;
  border-radius: 6px;
  margin-left: 5px;
}

.contact-form .theme-btn:hover {
  color: #00b8ca;
  border-color: #00b8ca;
  background: 0 0
}

.contact-form input.error, .contact-form select.error, .contact-form textarea.error {
  border-color: red !important
}

.contact-form label.error {
  display: block;
  line-height: 24px;
  padding: 5px 0 0;
  margin: 0;
  text-transform: uppercase;
  font-size: 12px;
  color: red;
  font-weight: 500
}

.social-icon-four {
  position: relative
}

.social-icon-four li {
  position: relative;
  margin-right: 18px;
  display: inline-block
}

.social-icon-four li.follow {
  color: #fff;
  font-weight: 600;
  font-size: 24px;
  display: block;
  margin-bottom: 20px
}

.social-icon-four li a {
  position: relative;
  font-size: 20px;
  color: #fff;
  -webkit-transition: all .3s ease;
  -ms-transition: all .3s ease;
  -o-transition: all .3s ease;
  -moz-transition: all .3s ease;
  transition: all .3s ease
}

.social-icon-four li a:hover {
  color: #222
}

.b-aspect {
  border-color: black;
}
</style>
