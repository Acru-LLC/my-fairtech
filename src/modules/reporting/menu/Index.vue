<template>
  <div>
    <div class="col-md-12 text-center">
      <div class="h3 mt-4 d-inline-block" style="color: #2b675b; font-weight: 500">
        {{ $t('reporting.title') }}
      </div>
    </div>
    <b-card>
      <b-container fluid="100%">

        <b-row>
          <b-col>

            <ValidationObserver
                ref="observer"
                v-slot="{}"
            >
              <b-card style="border:1px solid #2b675b; border-radius: 5px; margin:15px; padding: 15px;margin-top:10px;">
                <b-row>
                  <b-col cols="3" class="px-3 py-0">
                    <div
                        style="font-size: 16px;background: #2b675b; color: white; padding: 5px; width: 100%; margin-bottom: 20px; border-radius: 2px; font-weight: bold">
                      {{ $t('reporting.main.form1.title') }}
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="3" class="px-3 py-0">
                    <BaseInputWithValidation
                        v-model="editingItem.stir"
                        mask="#########"
                        class="required"
                        placeholder="123456789"
                        with-input-append
                        :rules="{regex: /\b\d{9}\b/}"
                        :label="$t('reporting.main.form1.name1')"
                        @keyup.enter="findContractorByInn"
                        label-on-top
                    >
                      <template v-slot:append-slot>
                        <b-button
                            :disabled="loadingStirItems"
                            @click="findContractorByInn"
                            variant="outline-primary"
                            id="contractorSearchButton"
                            style="padding: 2.5px 10px; font-size: 1.2rem;"
                        >
                          <b-spinner small v-if="loadingStirItems" label="Spinning"></b-spinner>
                          <i v-else class="mdi mdi-account-search"></i>
                        </b-button>
                      </template>
                    </BaseInputWithValidation>
                  </b-col>
                  <b-col cols="3" class="px-3">
                    <BaseInputWithValidation
                        v-model="editingItem.name"
                        :label="$t('reporting.main.form1.name3')"
                        :placeholder="$t('')"
                        class="required"
                        rules="required"
                        label-on-top
                    />
                  </b-col>
                  <b-col cols="3" class="px-3">
                    <BaseInputWithValidation
                        v-model="editingItem.fio"
                        :label="$t('reporting.main.form1.name4')"
                        :placeholder="$t('')"
                        class="required"
                        rules="required"
                        label-on-top
                    />
                  </b-col>
                  <b-col cols="3" class="px-3">
                    <BaseInputWithValidation
                        v-model="editingItem.address"
                        :label="$t('reporting.main.form1.name5')"
                        :placeholder="$t('')"
                        class="required"
                        rules="required"
                        label-on-top
                    />
                  </b-col>
                  <!--                  <b-col cols="3" class="px-3">-->
                  <!--                    <BaseInputWithValidation-->
                  <!--                        v-model="editingItem.ktut"-->
                  <!--                        :label="$t('reporting.main.form1.name2')"-->
                  <!--                        :placeholder="$t('')"-->
                  <!--                        class="required"-->
                  <!--                        rules="required"-->
                  <!--                        label-on-top-->
                  <!--                    />-->
                  <!--                  </b-col>-->

                  <b-col cols="3" class="px-3">
                    <b-row>
                      <b-col cols="2">
                        <BaseMultiselectWithValidation
                            rules="required"
                            class="required"
                            v-model="phoneId"
                            label-on-top
                            :options="phoneCodes.map(e => e.id)"
                            :label="$t('send_message.code')"
                            :placeholder="$t('')"
                            open-direction="bottom"
                            :show-labels="false"
                            :custom-label="customLabelPhoneCode"
                        />
                      </b-col>
                      <b-col cols="1"></b-col>
                      <b-col>
                        <BaseInputWithValidation
                            type="tel"
                            rules="required"
                            class="required"
                            :label="$t('send_message.phone_number')"
                            label-on-top
                            custom-styles="grid-template-columns: 0% 80%"
                            v-model="phoneNumber"
                            mask="###-##-##"
                            placeholder="###-##-##"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="3" class="px-3 mt-4 ml-4">
                    <b-form-checkbox
                        :value="true"
                        :unchecked-value="false"
                        v-model="editingItem.check"
                        style="font-size: medium;"
                    >
                      <strong style="color: #2b675b;">{{ $t('reporting.check') }}</strong>
                    </b-form-checkbox>
                  </b-col>

                  <b-col cols="3" class="px-3 mt-4">
                    <b-form-checkbox
                        :value="true"
                        :unchecked-value="false"
                        v-model="editingItem.isOthers"
                        style="font-size: medium;"
                    >
                      <strong style="color: #2b675b;">{{ $t('reporting.other') }}</strong>
                    </b-form-checkbox>
                  </b-col>

                  <b-col cols="2" class="" v-if="editingItem.isOthers">
                    <b-row v-if="uploadFilename !== ''">
                      <b-col cols="6" class="mt-3">
                        {{ uploadFilename }}
                      </b-col>
                      <b-col cols="6">
                        <b-button
                            style=" background: #f39138"
                            class="mt-3 p-1"
                            @click="clearFile"
                        >
                          <i class="fa fa-window-close"></i>
                          {{ $t("validator.cancel") }}
                        </b-button>
                      </b-col>
                    </b-row>
                    <b-button
                        v-else
                        class="mt-3 p-2"
                        :block="uploadFilename !== '' ? false : true"
                        style="border: 1px solid #2b675b; background: #FFFFFF; width: 200px"
                        @click="uploadFile"
                    >
                                <span style="color: #2b675b; !important;">
                                                <i class="fa fa-upload"></i>
                                            {{ $t("actions.upload_file") }}
                                  <span style="color: red">
                                    *
                                  </span>
                                           </span>
                    </b-button>
                    <b-form-file
                        @change="onFileChange"
                        v-model="uploadFiles"
                        class="d-none"
                        ref="ilovaRef"
                    ></b-form-file>
                  </b-col>
                </b-row>
              </b-card>

              <b-card v-if="!editingItem.check && !editingItem.isOthers"
                      style="border:1px solid #2b675b; border-radius: 5px; margin:15px; padding: 15px;margin-top:10px;">
                <b-row>
                  <b-col cols="3" class="px-3 py-0">
                    <div
                        style="font-size: 16px;background: #2b675b; color: white; padding: 5px; width: 100%; margin-bottom: 20px; border-radius: 2px; font-weight: bold">
                      {{ $t('reporting.main.form2.title') }}
                    </div>
                  </b-col>
                  <b-col cols="3" class="px-3 py-0"></b-col>
                  <b-col cols="4" class="px-3 py-0"></b-col>
                  <!--                  v-if="sanoat.length > 0 ||  hizmat.length > 0"-->
                  <b-col cols="2" class="px-3 py-0">
                    <!--                    <b-button-group style="width: 70%; float: right"-->
                    <!--                                    v-if="editingItem.soato  && editingItem.soato !== '' && (hizmat.length > 0 || sanoat.length > 0)">-->
                    <!--                      <b-button-->
                    <!--                          @click="fileGeneration"-->
                    <!--                          block-->
                    <!--                          variant="primary"-->
                    <!--                          class="pt-1 mt-2 pb-1 pr-2 pl-2"-->
                    <!--                      >-->
                    <!--                      <span style="font-size: 14px">-->
                    <!--                         <i class="mdi mdi-file-document"></i>-->
                    <!--                        {{ $t("reporting.pdf.file_generation") }}-->
                    <!--                      </span>-->
                    <!--                      </b-button>-->
                    <!--                    </b-button-group>-->
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="3" class="px-3 py-0">
                    <BaseSelectWithValidation
                        v-model="editingItem.codeSoxa"
                        :label="$t('reporting.main.form2.name1')"
                        label-on-top
                    >
                      <b-form-select-option
                          value="SANOAT">{{ $t('reporting.main.form3.title') }}
                      </b-form-select-option>
                      <b-form-select-option
                          value="HIZMAT">{{ $t('reporting.main.form4.title') }}
                      </b-form-select-option>
                    </BaseSelectWithValidation>
                  </b-col>
                  <b-col cols="3" class="px-3">
                    <BaseSelectWithValidation
                        v-model="editingItem.codeXisobod"
                        class="required"
                        rules="required"
                        :label="$t('reporting.main.form2.name2')"
                        label-on-top
                    >
                      <b-form-select-option
                          value="6OYLIK">{{ $t('reporting.main.form2.name3') }}
                      </b-form-select-option>
                      <b-form-select-option
                          value="YILLIK">{{ $t('reporting.main.form2.name4') }}
                      </b-form-select-option>
                    </BaseSelectWithValidation>
                  </b-col>
                  <b-col cols="2" class="px-3"
                         v-if="editingItem.codeXisobod == 'YILLIK'">
                    <BaseDatePickerWithValidation
                        class="required"
                        rules="required"
                        :label="$t('reporting.year')"
                        type="year"
                        format="YYYY"
                        label-on-top
                        lang="ru"
                        v-model="editingItem.year"
                    ></BaseDatePickerWithValidation>
                  </b-col>
                  <b-col cols="3" class="px-3 mt-3"
                         v-if="editingItem.codeXisobod == '6OYLIK'">
                    <b-form-group
                        :label="$t('reporting.main.form2.name5')"
                        label-for="nested-city"
                        label-cols-sm="3"
                        label-align-sm="right"
                    >
                      <b-row>
                        <b-col>
                          <BaseDatePickerWithValidation
                              class="required"
                              rules="required"
                              format="DD-MM-YYYY"
                              custom-styles="grid-template-columns: 100%;"
                              :only-form-element="true"
                              v-model="editingItem.dateFrom"
                              lang="ru"
                              :placeholder="$t('reporting.main.form2.name6')"
                          >
                          </BaseDatePickerWithValidation>
                        </b-col>
                        <b-col cols="1"></b-col>
                        <b-col>
                          <BaseDatePickerWithValidation
                              class="required"
                              rules="required"
                              custom-styles="grid-template-columns: 100%;"
                              :only-form-element="true"
                              v-model="editingItem.dateTo"
                              format="DD-MM-YYYY"
                              :placeholder="$t('reporting.main.form2.name7')"
                              lang="ru"
                          ></BaseDatePickerWithValidation>
                        </b-col>
                      </b-row>
                    </b-form-group>
                  </b-col>
                  <b-col cols="3" class="py-0 px-3"></b-col>

                </b-row>
              </b-card>

            </ValidationObserver>

            <div v-if="!editingItem.check && !editingItem.isOthers">
              <b-card v-if="editingItem.codeSoxa == 'SANOAT'"
                      style="border:1px solid #2b675b; border-radius: 5px; margin:15px; padding: 15px;margin-top:10px;">
                <b-row>
                  <b-col cols="3" class="px-3 py-0">
                    <div
                        style="font-size: 16px;background: #2b675b; color: white; padding: 5px; width: 100%; margin-bottom: 20px; border-radius: 2px; font-weight: bold">
                      {{ $t('reporting.main.form3.title') }}
                    </div>
                  </b-col>
                  <b-col cols="3" class="px-3 py-0"></b-col>
                  <b-col cols="4" class="px-3 py-0"></b-col>
                  <b-col cols="2" class="px-3 py-0">
                  </b-col>
                </b-row>
                <ValidationObserver
                    ref="observerSanoat"
                    v-slot="{}"
                >

                  <b-row>
                    <b-col class="px-3">
                      <BaseInputWithValidation
                          v-model="editingItem.codeTiftn"
                          :label="$t('reporting.main.form3.name1')"
                          :placeholder="$t('')"
                          class="required"
                          rules="required"
                          type="number"
                          label-on-top
                          with-input-append
                          @keyup.enter="findByCodeTiftn"
                      >
                        <template v-slot:append-slot>
                          <b-button
                              v-if="!loaderTifTn"
                              @click="findByCodeTiftn"
                              variant="outline-primary"
                              id="contractorSearchButton"
                              style="padding: 2.5px 10px; font-size: 1.2rem;"
                          >
                            <i class="mdi mdi-account-search"></i>
                          </b-button>
                          <b-button style="padding: 2.5px 10px; font-size: 1.2rem;"
                                    variant="primary"
                                    disabled v-else>
                            <b-spinner small type="grow"></b-spinner>
                          </b-button>
                        </template>
                      </BaseInputWithValidation>
                    </b-col>
                    <b-col class="px-3">
                      <!--                    <label style="color: #2b6c58">-->
                      <!--                      {{ $t('reporting.main.form3.name2') }}-->
                      <!--                    </label>-->
                      <!--                    <div-->
                      <!--                        style="border: 1px solid #2b6c58; min-height: 35px;max-height: 35px; overflow-y: auto; border-radius: 3px">-->
                      <!--                      <span style="width: 20px; text-overflow: hidden">-->
                      <!--                        {{ editingItem.nameProduct }}-->
                      <!--                      </span>-->

                      <!--                    </div>-->
<!--                      <b-input-group class="mt-3">-->
<!--                        <b-form-input v-model="editingItem.nameProduct" disabled></b-form-input>-->
<!--                        <b-input-group-append>-->
<!--                          <b-button v-b-popover.hover.top="{title:editingItem.nameProduct,content:null}"-->
<!--                                    style="padding: 2.5px 10px; font-size: 1.2rem;"-->
<!--                                    variant="outline-primary"-->
<!--                          >-->
<!--                            <i class="mdi mdi-information"></i>-->
<!--                          </b-button>-->
<!--                        </b-input-group-append>-->
<!--                      </b-input-group>-->
                                            <BaseInputWithValidation
                                                v-model="editingItem.nameProduct"
                                                :label="$t('reporting.main.form3.name2')"
                                                :placeholder="$t('')"
                                                class="required"
                                                rules="required"
                                                label-on-top
                                                with-input-append
                                            >
                                              <template v-slot:append-slot>
                                                <b-button v-b-popover.hover.top="{title:editingItem.nameProduct,content:null}"
                                                          style="padding: 2.5px 10px; font-size: 1.2rem;"
                                                          variant="outline-primary"
                                                >
                                                  <i class="mdi mdi-information"></i>
                                                </b-button>
                                              </template>
                                            </BaseInputWithValidation>
                    </b-col>
                    <!--                  <b-col class="px-3">-->
                    <!--                    <BaseInputWithValidation-->
                    <!--                        v-model="editingItem.codeMct"-->
                    <!--                        :label="$t('reporting.main.form3.name3')"-->
                    <!--                        :placeholder="$t('')"-->
                    <!--                        label-on-top-->
                    <!--                    />-->
                    <!--                  </b-col>-->

                    <b-col>

                      <BaseInputWithValidation
                          v-model="editingItem.measureName"
                          :label="$t('product_info.units')"
                          :placeholder="$t('')"
                          class="required"
                          rules="required"
                          label-on-top
                      />
                    </b-col>

                    <b-col class="px-3">
                      <BaseInputWithValidation
                          v-model="editingItem.madePowerAll"
                          :label="$t('reporting.main.form3.name4')"
                          :placeholder="$t('')"
                          class="required"
                          rules="required"
                          label-on-top
                      />
                    </b-col>
                  </b-row>
                  <b-row class="mt-4">
                    <b-col cols="3" class="px-3 py-0">
                      <div class="text-center"
                           style="font-size: 14px;border:1px solid #2b675b;  padding: 5px; width: 100%; margin-bottom: 20px; border-radius: 4px; font-weight: bold; cursor: none">
                        {{ $t('reporting.main.form3.name5') }} <br>
                        {{ $t('reporting.main.form3.name11') }}
                      </div>
                      <b-row>
                        <b-col class="px-1 py-0">
                          <BaseInputWithValidation
                              v-model="editingItem.madeTonna"
                              :label="$t('reporting.main.form3.name9')"
                              :placeholder="$t('')"
                              class="required"
                              rules="required"
                              label-on-top
                          />
                        </b-col>
                        <b-col class="px-1 py-0">
                          <BaseInputWithValidation
                              v-model="editingItem.madeSum"
                              :label="$t('reporting.main.form3.name10')"
                              :placeholder="$t('')"
                              class="required"
                              rules="required"
                              label-on-top
                          />
                        </b-col>
                      </b-row>
                    </b-col>

                    <b-col cols="3" class="px-3 py-0">
                      <div class="text-center"
                           style="font-size: 14px;border:1px solid #2b675b;  padding: 5px; width: 100%; margin-bottom: 20px; border-radius: 4px; font-weight: bold; cursor: none">
                        {{ $t('reporting.main.form3.name6') }} <br>
                        {{ $t('reporting.main.form3.name11') }}
                      </div>
                      <b-row>
                        <b-col class="px-1 py-0">
                          <BaseInputWithValidation
                              v-model="editingItem.buyTonna"
                              :label="$t('reporting.main.form3.name9')"
                              :placeholder="$t('')"
                              class="required"
                              rules="required"
                              label-on-top
                          />
                        </b-col>
                        <b-col class="px-1 py-0">
                          <BaseInputWithValidation
                              v-model="editingItem.buySum"
                              :label="$t('reporting.main.form3.name10')"
                              :placeholder="$t('')"
                              class="required"
                              rules="required"
                              label-on-top
                          />
                        </b-col>
                      </b-row>
                    </b-col>

                    <b-col cols="3" class="px-3 py-0">
                      <div class="text-center"
                           style="font-size: 14px;border:1px solid #2b675b;  padding: 5px; width: 100%; margin-bottom: 20px; border-radius: 4px; font-weight: bold; cursor: none">
                        {{ $t('reporting.main.form3.name7') }} <br>
                        {{ $t('reporting.main.form3.name11') }}
                      </div>
                      <b-row>
                        <b-col class="px-1 py-0">
                          <BaseInputWithValidation
                              v-model="editingItem.exportTonna"
                              :label="$t('reporting.main.form3.name9')"
                              :placeholder="$t('')"
                              class="required"
                              rules="required"
                              label-on-top
                          />
                        </b-col>
                        <b-col class="px-1 py-0">
                          <BaseInputWithValidation
                              v-model="editingItem.exportSum"
                              :label="$t('reporting.main.form3.name10')"
                              :placeholder="$t('')"
                              class="required"
                              rules="required"
                              label-on-top
                          />
                        </b-col>
                      </b-row>
                    </b-col>

                    <b-col cols="3" class="px-3 py-0">
                      <div class="text-center"
                           style="font-size: 14px;border:1px solid #2b675b;  padding: 5px; width: 100%; margin-bottom: 20px; border-radius: 4px; font-weight: bold; cursor: none">
                        {{ $t('reporting.main.form3.name8') }} <br>
                        {{ $t('reporting.main.form3.name11') }}
                      </div>
                      <b-row>
                        <b-col class="px-1 py-0">
                          <BaseInputWithValidation
                              v-model="editingItem.finallyTonna"
                              :label="$t('reporting.main.form3.name9')"
                              :placeholder="$t('')"
                              class="required"
                              rules="required"
                              label-on-top
                          />
                        </b-col>
                        <b-col class="px-1 py-0">
                          <BaseInputWithValidation
                              v-model="editingItem.finallySum"
                              :label="$t('reporting.main.form3.name10')"
                              :placeholder="$t('')"
                              class="required"
                              rules="required"
                              label-on-top
                          />
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </ValidationObserver>
                <b-row>
                  <b-col cols="3" class="px-3 py-0">

                  </b-col>
                  <b-col cols="3" class="px-3 py-0"></b-col>
                  <b-col cols="4" class="px-3 py-0"></b-col>
                  <b-col cols="2" class="px-3 py-0">
                    <b-button-group style="width: 70%; float: right">
                      <b-button
                          @click="addFormSanoat"
                          block
                          variant="primary"
                          class="pt-1 mt-2 pb-1 pr-2 pl-2"
                      >
                      <span style="font-size: 14px">
                        {{ $t("actions.add") }}
                      </span>
                      </b-button>
                      <!--                    <b-button-->
                      <!--                        v-show="sanoat.length > 0"-->
                      <!--                        variant="warning"-->
                      <!--                        class="pt-1 mb-4 pb-1 pr-2 pl-2"-->
                      <!--                        @click="isModalSanoat = true"-->
                      <!--                    >-->
                      <!--                      <i class="fa fa-eye"></i>-->
                      <!--                    </b-button>-->
                    </b-button-group>
                  </b-col>
                </b-row>
              </b-card>
            </div>

            <div v-if="!editingItem.check && !editingItem.isOthers">
              <b-card v-if="editingItem.codeSoxa == 'HIZMAT'"
                      style="border:1px solid #2b675b; border-radius: 5px; margin:15px; padding: 15px;margin-top:10px;">
                <b-row>
                  <b-col cols="3" class="px-3 py-0">
                    <div
                        style="font-size: 16px;background: #2b675b; color: white; padding: 5px; width: 100%; margin-bottom: 20px; border-radius: 2px; font-weight: bold">
                      {{ $t('reporting.main.form4.title') }}
                    </div>
                  </b-col>
                  <b-col cols="3" class="px-3 py-0"></b-col>
                  <b-col cols="4" class="px-3 py-0"></b-col>
                  <b-col cols="2" class="px-3 py-0">

                  </b-col>
                </b-row>
                <ValidationObserver
                    ref="observerHizmat"
                    v-slot="{}"
                >
                  <b-row>
                    <b-col class="px-3">
                      <BaseInputWithValidation
                          v-model="editingItem.nameService"
                          :label="$t('reporting.main.form4.name1')"
                          :placeholder="$t('')"
                          class="required"
                          rules="required"
                          label-on-top
                      />
                    </b-col>
                    <b-col class="px-3">
                      <BaseInputWithValidation
                          v-model="editingItem.codeSevice"
                          :label="$t('reporting.main.form4.name2')"
                          :placeholder="$t('')"
                          class="required"
                          rules="required"
                          label-on-top
                      />
                    </b-col>
                    <b-col class="px-3">
                      <BaseInputWithValidation
                          v-model="editingItem.sumService"
                          :label="$t('reporting.main.form4.name3')"
                          :placeholder="$t('')"
                          class="required"
                          rules="required"
                          label-on-top
                      />
                    </b-col>
                    <b-col class="px-3">
                      <BaseInputWithValidation
                          v-model="editingItem.exportSumService"
                          :label="$t('reporting.main.form4.name4')"
                          :placeholder="$t('')"
                          class="required"
                          rules="required"
                          label-on-top
                      />
                    </b-col>
                  </b-row>
                </ValidationObserver>
                <b-row>
                  <b-col cols="3" class="px-3 py-0">

                  </b-col>
                  <b-col cols="3" class="px-3 py-0"></b-col>
                  <b-col cols="4" class="px-3 py-0"></b-col>
                  <b-col cols="2" class="px-3 py-0">
                    <b-button-group style="width: 70%; float: right">
                      <b-button
                          @click="addFormHizmat"
                          block
                          variant="primary"
                          class="pt-1 mt-2 pb-1 pr-2 pl-2"
                      >
                      <span style="font-size: 14px">
                        {{ $t("actions.add") }}
                      </span>
                      </b-button>
                      <!--                    <b-button-->
                      <!--                        v-show="sanoat.length > 0"-->
                      <!--                        variant="warning"-->
                      <!--                        class="pt-1 mb-4 pb-1 pr-2 pl-2"-->
                      <!--                        @click="isModalSanoat = true"-->
                      <!--                    >-->
                      <!--                      <i class="fa fa-eye"></i>-->
                      <!--                    </b-button>-->
                    </b-button-group>
                  </b-col>
                </b-row>
              </b-card>
            </div>

            <b-card style="border:1px solid #2b675b; border-radius: 5px; margin:15px; padding: 15px;margin-top:10px;"
                    v-if="sanoat.length > 0">
              <div
                  style="font-size: 16px;background: #2b675b; color: white; padding: 5px; width: 100%; margin-bottom: 20px; border-radius: 2px; font-weight: bold">
                {{ $t('reporting.main.form3.title') }}
              </div>
              <div v-for="(card, index) in sanoat" :key="index"
                   style="border:1px solid #2b675b; padding: 10px 20px; margin-bottom: 20px;">
                <b-col cols="12">
                  <b-row>
                    <b-col cols="2">
                      <div class="d-flex justify-content-start align-items-center">
                        <div class="mr-3" style="font-size: 16px; font-weight: bold;">
                          {{ index + 1 }}.
                        </div>
                        <div>
                          <div style="color:#88a59e;">{{ $t('reporting.main.form3.name1') }}:</div>
                          <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                            {{ card.codeTiftn ? card.codeTiftn : '- - -' }}
                          </div>
                        </div>
                      </div>
                    </b-col>
                    <b-col cols="3">
                      <div>
                        <div style="color:#88a59e;">{{ $t('reporting.main.form3.name2') }}:</div>
                        <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                          {{ card.nameProduct ? card.nameProduct : '- - -' }}
                        </div>
                      </div>
                    </b-col>
                    <b-col></b-col>
                    <!--                    <b-col cols="2">-->
                    <!--                      <div>-->
                    <!--                        <div style="color:#88a59e;">-->
                    <!--                          {{-->
                    <!--                            $t('reporting.main.form3.name3')-->
                    <!--                          }}:-->
                    <!--                        </div>-->
                    <!--                        <div style="font-size: 16px; font-weight: bold; color: #2b675b;">-->
                    <!--                          {{ card.codeMct ? card.codeMct : '- - -' }}-->
                    <!--                        </div>-->
                    <!--                      </div>-->
                    <!--                    </b-col>-->
                    <b-col cols="3">
                      <div>
                        <div style="color:#88a59e;">{{ $t('product_info.units') }}</div>
                        <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                          {{ card.measureName ? card.measureName : '- - -' }}
                        </div>
                      </div>
                    </b-col>
                    <b-col cols="3">
                      <div>
                        <div style="color:#88a59e;">{{ $t('reporting.main.form3.name4') }}</div>
                        <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                          {{ card.madePowerAll ? card.madePowerAll : '- - -' }}
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <div style="position: absolute; top: 0px; right: 8px;">
                    <b-btn style="border: none; background-color: transparent;" @click="deleteSanoat(index)">
                      <i class="mdi mdi-trash-can-outline cursor-pointer"
                         style="font-size: 30px; color:red"></i>
                    </b-btn>
                  </div>
                </b-col>
                <b-row class="mt-4">
                  <b-col cols="3" class="px-3 py-0">
                    <div class="text-center"
                         style="font-size: 14px;border:1px solid #2b675b;  padding: 5px; width: 100%; margin-bottom: 20px; border-radius: 4px; font-weight: bold; cursor: none">
                      {{ $t('reporting.main.form3.name5') }}
                      {{ $t('reporting.main.form3.name11') }}
                    </div>
                    <b-row>
                      <b-col class="px-1 py-0">
                        <div>
                          <div style="color:#88a59e;">
                            {{ $t('reporting.main.form3.name9') }}:
                          </div>
                          <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                            {{ card.madeTonna ? card.madeTonna : '- - -' }}
                          </div>
                        </div>
                      </b-col>
                      <b-col class="px-1 py-0">
                        <div>
                          <div style="color:#88a59e;">
                            {{ $t('reporting.main.form3.name10') }}:
                          </div>
                          <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                            {{ card.madeSum ? card.madeSum : '- - -' }}
                          </div>
                        </div>
                      </b-col>
                    </b-row>
                  </b-col>

                  <b-col cols="3" class="px-3 py-0">
                    <div class="text-center"
                         style="font-size: 14px;border:1px solid #2b675b;  padding: 5px; width: 100%; margin-bottom: 20px; border-radius: 4px; font-weight: bold; cursor: none">
                      {{ $t('reporting.main.form3.name6') }}
                      {{ $t('reporting.main.form3.name11') }}
                    </div>
                    <b-row>
                      <b-col class="px-1 py-0">
                        <div>
                          <div style="color:#88a59e;">
                            {{ $t('reporting.main.form3.name9') }}:
                          </div>
                          <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                            {{ card.buyTonna ? card.buyTonna : '- - -' }}
                          </div>
                        </div>
                      </b-col>
                      <b-col class="px-1 py-0">
                        <div>
                          <div style="color:#88a59e;">
                            {{ $t('reporting.main.form3.name10') }}:
                          </div>
                          <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                            {{ card.buySum ? card.buySum : '- - -' }}
                          </div>
                        </div>
                      </b-col>
                    </b-row>

                  </b-col>

                  <b-col cols="3" class="px-3 py-0">
                    <div class="text-center"
                         style="font-size: 14px;border:1px solid #2b675b;  padding: 5px; width: 100%; margin-bottom: 20px; border-radius: 4px; font-weight: bold; cursor: none">
                      {{ $t('reporting.main.form3.name7') }}
                      {{ $t('reporting.main.form3.name11') }}
                    </div>
                    <b-row>
                      <b-col class="px-1 py-0">
                        <div>
                          <div style="color:#88a59e;">
                            {{ $t('reporting.main.form3.name9') }}:
                          </div>
                          <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                            {{ card.exportTonna ? card.exportTonna : '- - -' }}
                          </div>
                        </div>
                      </b-col>
                      <b-col class="px-1 py-0">
                        <div>
                          <div style="color:#88a59e;">
                            {{ $t('reporting.main.form3.name10') }}:
                          </div>
                          <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                            {{ card.exportSum ? card.exportSum : '- - -' }}
                          </div>
                        </div>
                      </b-col>
                    </b-row>
                  </b-col>

                  <b-col cols="3" class="px-3 py-0">
                    <div class="text-center"
                         style="font-size: 14px;border:1px solid #2b675b;  padding: 5px; width: 100%; margin-bottom: 20px; border-radius: 4px; font-weight: bold; cursor: none">
                      {{ $t('reporting.main.form3.name8') }}
                      {{ $t('reporting.main.form3.name11') }}
                    </div>
                    <b-row>
                      <b-col class="px-1 py-0">
                        <div>
                          <div style="color:#88a59e;">
                            {{ $t('reporting.main.form3.name9') }}:
                          </div>
                          <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                            {{ card.finallyTonna ? card.finallyTonna : '- - -' }}
                          </div>
                        </div>
                      </b-col>
                      <b-col class="px-1 py-0">
                        <div>
                          <div style="color:#88a59e;">
                            {{ $t('reporting.main.form3.name10') }}:
                          </div>
                          <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                            {{ card.finallySum ? card.finallySum : '- - -' }}
                          </div>
                        </div>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </div>
            </b-card>


            <b-card style="border:1px solid #2b675b; border-radius: 5px; margin:15px; padding: 15px;margin-top:10px;"
                    v-if="hizmat.length > 0">
              <div
                  style="font-size: 16px;background: #2b675b; color: white; padding: 5px; width: 100%; margin-bottom: 20px; border-radius: 2px; font-weight: bold">
                {{ $t('reporting.main.form4.title') }}
              </div>
              <div v-for="(card, index) in hizmat" :key="index">
                <b-col cols="12" style="border:1px solid #2b675b; padding: 10px 20px; margin-bottom: 20px;">
                  <b-row>
                    <b-col cols="12" md="3">
                      <div class="d-flex justify-content-start align-items-center">
                        <div class="mr-3" style="font-size: 16px; font-weight: bold;">
                          {{ index + 1 }}.
                        </div>
                        <div>
                          <div style="color:#88a59e;">{{ $t('reporting.main.form4.name1') }}:</div>
                          <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                            {{ card.codeSevice ? card.codeSevice : '- - -' }}
                          </div>
                        </div>
                      </div>
                    </b-col>
                    <b-col cols="12" md="3">
                      <div>
                        <div style="color:#88a59e;">{{ $t('reporting.main.form4.name2') }}:</div>
                        <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                          {{ card.nameService ? card.nameService : '- - -' }}
                        </div>
                      </div>
                    </b-col>
                    <b-col cols="12" md="3">
                      <div>
                        <div style="color:#88a59e;">
                          {{
                            $t('reporting.main.form4.name3')
                          }}:
                        </div>
                        <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                          {{ card.sumService ? card.sumService : '- - -' }}
                        </div>
                      </div>
                    </b-col>
                    <b-col cols="12" md="3">
                      <div>
                        <div style="color:#88a59e;">{{ $t('reporting.main.form4.name4') }}</div>
                        <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                          {{ card.exportSumService ? card.exportSumService : '- - -' }}
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                  <div style="position: absolute; top: 15px; right: 8px;">
                    <b-btn style="border: none; background-color: transparent;" @click="deleteHizmat(index)">
                      <i class="mdi mdi-trash-can-outline cursor-pointer"
                         style="font-size: 24px; color:red"></i>
                    </b-btn>
                  </div>
                </b-col>
              </div>
            </b-card>


            <b-row class="p-3 mb-5">
              <b-col cols="3">
                <b-col class="mb-2 mt-3">
                  <b-button style="background: #F39138; width: 150px; height: 33px" class="btn btn-warning" size="md"
                            @click="$router.go(-1)">
                    {{ $t("actions.back") }}
                  </b-button>
                </b-col>
              </b-col>
              <b-col cols="3" class="mt-3"></b-col>
              <b-col cols="2" class="mt-3" style="float: right">
                <div v-if="isFileGeneration">
                  <b-row v-if="uploadFilename !== ''">
                    <b-col cols="6" class="mt-1">
                      {{ uploadFilename }}
                    </b-col>
                    <b-col cols="6">
                      <b-button
                          style=" background: #f39138;float: right"
                          class=" p-1"
                          @click="clearFile"
                      >
                        <i class="fa fa-window-close"></i>
                        {{ $t("validator.cancel") }}
                      </b-button>
                    </b-col>
                  </b-row>
                  <b-button
                      v-else
                      class="p-2"
                      :block="uploadFilename !== '' ? false : true"
                      style="border: 1px solid #2b675b; background: #FFFFFF; width: 200px;float: right"
                      @click="uploadFile"
                  >
                                <span style="color: #2b675b; !important;">
                                                <i class="fa fa-upload"></i>
                                            {{ $t("actions.upload_file") }}
                                    <span style="color: red">
                                    *
                                  </span>
                                           </span>
                  </b-button>
                  <b-form-file
                      @change="onFileChange"
                      v-model="uploadFiles"
                      class="d-none"
                      ref="ilovaRef"
                  ></b-form-file>
                </div>

              </b-col>
              <b-col cols="2" class="mt-3">
                <b-button
                    @click="fileGeneration"
                    block
                    style="background: #2b675b; font-size: 16px; width: 200px; float: right"
                    class="text-capitalize float-end p-1 ml-1"
                    v-if="editingItem.soato  && editingItem.soato !== '' && (hizmat.length > 0 || sanoat.length > 0)">
                                      <span style="font-size: 14px">
                                         <i class="mdi mdi-file-document"></i>
                                        {{ $t("reporting.pdf.file_generation") }}
                                         <span style="color: red">
                                    *
                                  </span>
                                      </span>
                </b-button>
              </b-col>

              <b-col cols="2" class="mt-3">
                <b-overlay
                    :show="loader"
                    rounded
                    opacity="0.6"
                    spinner-small
                    spinner-variant="primary"
                    class="px-3"
                >
                  <b-button
                      :disabled="loader"
                      class="text-capitalize float-end p-1 ml-1"
                      @click="saveData"
                      block
                      style="background: #2b675b; font-size: 16px; width: 200px; float: right"
                  >
                    {{ $t("reporting.send_button") }}
                  </b-button>
                </b-overlay>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>
    </b-card>

    <b-modal
        size="xl"
        :no-close-on-backdrop="true"
        scrollable
        :hide-header="true"
        v-model="isModalSanoat"
    >
      <div v-for="(card, index) in sanoat" :key="index">
        <b-col cols="12" style="border:1px solid #2b675b; padding: 10px 20px; margin-bottom: 20px;">
          <b-row>
            <b-col cols="12" md="4">
              <div class="d-flex justify-content-start align-items-center">
                <div class="mr-3" style="font-size: 16px; font-weight: bold;">
                  {{ index + 1 }}.
                </div>
                <div>
                  <div style="color:#88a59e;">{{ $t('reporting.main.form3.name1') }}:</div>
                  <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                    {{ card.codeTiftn ? card.codeTiftn : '- - -' }}
                  </div>
                </div>
              </div>
            </b-col>
            <b-col cols="12" md="4">
              <div>
                <div style="color:#88a59e;">{{ $t('reporting.main.form3.name2') }}:</div>
                <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                  {{ card.nameProduct ? card.nameProduct : '- - -' }}
                </div>
              </div>
            </b-col>
            <!--            <b-col cols="12" md="3">-->
            <!--              <div>-->
            <!--                <div style="color:#88a59e;">-->
            <!--                  {{-->
            <!--                    $t('reporting.main.form3.name3')-->
            <!--                  }}:-->
            <!--                </div>-->
            <!--                <div style="font-size: 16px; font-weight: bold; color: #2b675b;">-->
            <!--                  {{ card.codeMct ? card.codeMct : '- - -' }}-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </b-col>-->
            <b-col cols="12" md="4">
              <div>
                <div style="color:#88a59e;">{{ $t('reporting.main.form3.name4') }}</div>
                <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                  {{ card.madePowerAll ? card.madePowerAll : '- - -' }}
                </div>
              </div>
            </b-col>
          </b-row>
          <div style="position: absolute; top: 15px; right: 8px;">
            <b-btn style="border: none; background-color: transparent;" @click="deleteSanoat(index)">
              <i class="mdi mdi-trash-can-outline cursor-pointer"
                 style="font-size: 24px; color:red"></i>
            </b-btn>
          </div>
        </b-col>
      </div>
      <template v-slot:modal-footer>
        <b-button class="pt-1 pl-3 pr-3 pb-1" variant="danger" @click="isModalSanoat = false">
          {{ $t("actions.close") }}
        </b-button>
      </template>
    </b-modal>

    <b-modal
        size="xl"
        :no-close-on-backdrop="true"
        scrollable
        :hide-header="true"
        v-model="isModalHizmat"
    >
      <div v-for="(card, index) in hizmat" :key="index">
        <b-col cols="12" style="border:1px solid #2b675b; padding: 10px 20px; margin-bottom: 20px;">
          <b-row>
            <b-col cols="12" md="3">
              <div class="d-flex justify-content-start align-items-center">
                <div class="mr-3" style="font-size: 16px; font-weight: bold;">
                  {{ index + 1 }}.
                </div>
                <div>
                  <div style="color:#88a59e;">{{ $t('reporting.main.form4.name1') }}:</div>
                  <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                    {{ card.codeSevice ? card.codeSevice : '- - -' }}
                  </div>
                </div>
              </div>
            </b-col>
            <b-col cols="12" md="3">
              <div>
                <div style="color:#88a59e;">{{ $t('reporting.main.form4.name2') }}:</div>
                <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                  {{ card.nameService ? card.nameService : '- - -' }}
                </div>
              </div>
            </b-col>
            <b-col cols="12" md="3">
              <div>
                <div style="color:#88a59e;">
                  {{
                    $t('reporting.main.form4.name3')
                  }}:
                </div>
                <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                  {{ card.sumService ? card.sumService : '- - -' }}
                </div>
              </div>
            </b-col>
            <b-col cols="12" md="3">
              <div>
                <div style="color:#88a59e;">{{ $t('reporting.main.form4.name4') }}</div>
                <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                  {{ card.exportSumService ? card.exportSumService : '- - -' }}
                </div>
              </div>
            </b-col>
          </b-row>
          <div style="position: absolute; top: 15px; right: 8px;">
            <b-btn style="border: none; background-color: transparent;" @click="deleteHizmat(index)">
              <i class="mdi mdi-trash-can-outline cursor-pointer"
                 style="font-size: 24px; color:red"></i>
            </b-btn>
          </div>
        </b-col>
      </div>
      <template v-slot:modal-footer>
        <b-button class="pt-1 pl-3 pr-3 pb-1" variant="danger" @click="isModalHizmat = false">
          {{ $t("actions.close") }}
        </b-button>
      </template>
    </b-modal>


    <b-modal
        size="xl"
        :no-close-on-backdrop="true"
        scrollable
        :hide-header="true"
        v-model="isFileGenerationModal"
    >
      <div class="container-main">
        <div class="container" id="element-to-print">
          <h5 style="color: #236257; text-align: center">
            <b> {{ editingItem.name }} {{ $t('reporting.pdf.title') }}</b>
          </h5>

          <div style="border-radius: 3px; margin: 25px 0" class="mt-4" v-if="sanoat.length > 0">
            <h6 style="color: #236257;"><b> {{ $t('reporting.main.form3.title') }}</b></h6>
            <table class="table">
              <thead>
              <tr>
                <th rowspan="2" class="text-center" style="vertical-align: inherit !important;">№</th>
                <th rowspan="2" class="text-center" style="vertical-align: inherit !important;">
                  {{ $t('reporting.main.form2.name2') }}<br>
                </th>
                <th rowspan="2" class="text-center" style="vertical-align: inherit !important;">
                  {{ $t('reporting.main.form2.name5') }}<br>
                </th>
                <th rowspan="2" class="text-center" style="vertical-align: inherit !important;">
                  {{ $t('reporting.main.form3.name2') }}
                </th>

                <th rowspan="2" class="text-center" style="vertical-align: inherit !important;">
                  {{ $t('reporting.main.form3.name1') }}
                </th>
                <th rowspan="2" class="text-center" style="vertical-align: inherit !important;">
                  {{ $t('product_info.units') }}
                </th>
                <th rowspan="2" class="text-center" style="vertical-align: inherit !important;">
                  {{ $t('reporting.main.form3.name4') }}<br>
                </th>
                <th colspan="2" class="text-center" style="vertical-align: inherit !important; width: 15%">
                  {{ $t('reporting.main.form3.name5') }} <br> <i
                    style="font-size: 11px">{{ $t('reporting.main.form3.name11') }}</i>
                </th>
                <th colspan="2" class="text-center" style="vertical-align: inherit !important; width: 15%">
                  {{ $t('reporting.main.form3.name6') }} <br> <i
                    style="font-size: 11px">{{ $t('reporting.main.form3.name11') }}</i>
                </th>
                <th colspan="2" class="text-center" style="vertical-align: inherit !important; width: 15%">
                  {{ $t('reporting.main.form3.name7') }} <br> <i
                    style="font-size: 11px">{{ $t('reporting.main.form3.name11') }}</i>
                </th>
                <th colspan="2" class="text-center" style="vertical-align: inherit !important; width: 15%">
                  {{ $t('reporting.main.form3.name8') }} <br> <i
                    style="font-size: 11px">{{ $t('reporting.main.form3.name11') }}</i>
                </th>

              </tr>
              <tr>
                <th class="text-center" style="vertical-align: inherit !important;font-size: 12px !important;">
                  {{ $t('reporting.pdf.miqdor') }} <br> <i style="font-size: 11px">{{ $t('reporting.pdf.natura') }}</i>
                </th>
                <th class="text-center" style="vertical-align: inherit !important;font-size: 12px !important;">
                  {{ $t('reporting.pdf.qiymat') }} <br> <i style="font-size: 11px">{{ $t('reporting.pdf.som') }}</i>
                </th>
                <th class="text-center" style="vertical-align: inherit !important;font-size: 12px !important;">
                  {{ $t('reporting.pdf.miqdor') }} <br> <i style="font-size: 11px">{{ $t('reporting.pdf.natura') }}</i>
                </th>
                <th class="text-center" style="vertical-align: inherit !important;font-size: 12px !important;">
                  {{ $t('reporting.pdf.qiymat') }} <br> <i style="font-size: 11px">{{ $t('reporting.pdf.som') }}</i>
                </th>
                <th class="text-center" style="vertical-align: inherit !important;font-size: 12px !important;">
                  {{ $t('reporting.pdf.miqdor') }} <br> <i style="font-size: 11px">{{ $t('reporting.pdf.natura') }}</i>
                </th>
                <th class="text-center" style="vertical-align: inherit !important;font-size: 12px !important;">
                  {{ $t('reporting.pdf.qiymat') }} <br> <i style="font-size: 11px">{{ $t('reporting.pdf.som') }}</i>
                </th>
                <th class="text-center" style="vertical-align: inherit !important;font-size: 12px !important;">
                  {{ $t('reporting.pdf.miqdor') }} <br> <i style="font-size: 11px">{{ $t('reporting.pdf.natura') }}</i>
                </th>
                <th class="text-center" style="vertical-align: inherit !important;font-size: 12px !important;">
                  {{ $t('reporting.pdf.qiymat') }} <br> <i style="font-size: 11px">{{ $t('reporting.pdf.som') }}</i>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data, index) in sanoat"
                  :key="index">
                <td class="text-center" style="color: #2b675b">{{ index + 1 }}</td>
                <td class="text-center">
                   <span v-if="data.codeXisobod && data.codeXisobod == '6OYLIK'">
                       {{ $t('reporting.main.form2.name3') }}
                  </span>
                  <span v-else-if="data.codeXisobod && data.codeXisobod == 'YILLIK'">
                       {{ $t('reporting.main.form2.name4') }}
                  </span>
                </td>
                <td class="text-center">
                   <span v-if="data.codeXisobod && data.codeXisobod == '6OYLIK'">
                    <b-badge variant="light" style="color: #2b675b">
                       {{ data.dateFrom }}
                    </b-badge> -
                        <b-badge variant="light" style="color: #2b675b">
                       {{ data.dateTo }}
                    </b-badge>
                  </span>
                  <span v-else-if="data.codeXisobod && data.codeXisobod == 'YILLIK'">
                         {{ data.year }}
                  </span>
                </td>

                <td class="text-center">{{ editingItem.name ? editingItem.name : '-' }}</td>
                <td class="text-center">{{ data.codeTiftn ? data.codeTiftn : '-' }}</td>
                <td class="text-center">{{ data.measureName ? data.measureName : '-' }}</td>
                <td class="text-center">{{ data.madePowerAll ? formatNumber(data.madePowerAll) : '-' }}</td>

                <td class="text-center">{{ data.madeTonna ? formatNumber(data.madeTonna) : '-' }}</td>
                <td class="text-center">{{ data.madeSum ? formatNumber(data.madeSum) : '-' }}</td>
                <td class="text-center">{{ data.buyTonna ? formatNumber(data.buyTonna) : '-' }}</td>
                <td class="text-center">{{ data.buySum ? formatNumber(data.buySum) : '-' }}</td>
                <td class="text-center">{{ data.exportTonna ? formatNumber(data.exportTonna) : '-' }}</td>
                <td class="text-center">{{ data.exportSum ? formatNumber(data.exportSum) : '-' }}</td>
                <td class="text-center">{{ data.finallyTonna ? formatNumber(data.finallyTonna) : '-' }}</td>
                <td class="text-center">{{ data.finallySum ? formatNumber(data.finallySum) : '-' }}</td>
              </tr>
              <tr>
                <td colspan="6"><b>{{ $t('reporting.pdf.all') }}</b>:</td>
                <td>{{ formatNumber(countMadePowerAll()) }}</td>
                <td>{{ formatNumber(countmadeTonnaAll()) }}</td>
                <td>{{ formatNumber(countmadeSumAll()) }}</td>
                <td>{{ formatNumber(countbuyTonnaAll()) }}</td>
                <td>{{ formatNumber(countbuySumAll()) }}</td>
                <td>{{ formatNumber(countexportTonnaAll()) }}</td>
                <td>{{ formatNumber(countexportSumAll()) }}</td>
                <td>{{ formatNumber(countfinallyTonnaAll()) }}</td>
                <td>{{ formatNumber(countfinallySumAll()) }}</td>
              </tr>
              </tbody>
            </table>
          </div>

          <div style="border-radius: 3px; margin: 25px 0" class="mt-5" v-if="hizmat.length > 0">
            <h6 style="color: #236257;"><b> {{ $t('reporting.main.form4.title') }}</b></h6>
            <table class="table">
              <thead>

              <tr class="text-center" style="vertical-align: inherit !important;">
                <th class="text-center" style="vertical-align: inherit !important;">№</th>
                <th class="text-center" style="vertical-align: inherit !important;">
                  {{ $t('reporting.main.form2.name2') }}<br>
                </th>
                <th class="text-center" style="vertical-align: inherit !important;">
                  {{ $t('reporting.main.form2.name5') }}<br>
                </th>
                <th class="text-center" style="vertical-align: inherit !important;">
                  {{ $t('reporting.main.form4.name1') }}
                </th>
                <th class="text-center" style="vertical-align: inherit !important;">
                  {{ $t('reporting.main.form4.name2') }}
                </th>
                <th class="text-center" style="vertical-align: inherit !important;">
                  {{ $t('reporting.main.form4.name3') }}
                </th>
                <th class="text-center" style="vertical-align: inherit !important;">
                  {{ $t('reporting.main.form4.name4') }}
                </th>
              </tr>

              </thead>
              <tbody>
              <tr v-for="(data, index) in hizmat"
                  :key="index">
                <td class="text-center" style="color: #2b675b">{{ index + 1 }}</td>
                <td class="text-center">
                   <span v-if="data.codeXisobod && data.codeXisobod == '6OYLIK'">
                       {{ $t('reporting.main.form2.name3') }}
                  </span>
                  <span v-else-if="data.codeXisobod && data.codeXisobod == 'YILLIK'">
                       {{ $t('reporting.main.form2.name4') }}
                  </span>
                </td>
                <td class="text-center">
                   <span v-if="data.codeXisobod && data.codeXisobod == '6OYLIK'">
                    <b-badge variant="light" style="color: #2b675b">
                       {{ data.dateFrom }}
                    </b-badge> -
                        <b-badge variant="light" style="color: #2b675b">
                       {{ data.dateTo }}
                    </b-badge>
                  </span>
                  <span v-else-if="data.codeXisobod && data.codeXisobod == 'YILLIK'">
                         {{ data.year }}
                  </span>
                </td>

                <td class="text-center">{{ data.nameService ? data.nameService : '-' }}</td>
                <td class="text-center">{{ data.codeSevice ? data.codeSevice : '-' }}</td>
                <td class="text-center">{{ data.sumService ? formatNumber(data.sumService) : '-' }}</td>
                <td class="text-center">{{ data.exportSumService ? formatNumber(data.exportSumService) : '-' }}</td>
              </tr>

              <tr>
                <td colspan="5"><b>{{ $t('reporting.pdf.all') }}</b>:</td>
                <td>{{ formatNumber(countsumService()) }}</td>
                <td>{{ formatNumber(countexportSumService()) }}</td>
              </tr>
              </tbody>
            </table>
          </div>

          <div style="margin-top: 60px">
            <b-row>
              <b-col cols="1"></b-col>
              <b-col cols="3" class="text-center" style="color: #2b675b; font-size: 15px">
                <b>{{ $t('reporting.pdf.rahbar') }}</b></b-col>
              <b-col cols="2"></b-col>
              <b-col cols="2">
                <h6 style="border-top: 1px solid #2b675b; color: #2b675b; width: 70%; margin-top: 20px"
                    class="text-center">
                  <b>{{ $t('reporting.pdf.fio') }}</b></h6>
              </b-col>
              <b-col cols="2">
                <h6 style="border-top: 1px solid #2b675b; color: #2b675b; width: 70%; margin-top: 20px"
                    class="text-center">
                  <b>{{ $t('reporting.pdf.imzo') }}</b></h6>
              </b-col>
              <b-col cols="2"></b-col>
            </b-row>
          </div>

          <div style="margin-top: 40px">
            <b-row>
              <b-col cols="1"></b-col>
              <b-col cols="3" class="text-center" style="color: #2b675b; font-size: 15px">
                <b>{{ $t('reporting.pdf.masul') }}</b></b-col>
              <b-col cols="2"></b-col>
              <b-col cols="2">
                <h6 style="border-top: 1px solid #2b675b;color: #2b675b; width: 70%; margin-top: 30px"
                    class="text-center">
                  <b>{{ $t('reporting.pdf.fio') }}</b></h6>
              </b-col>
              <b-col cols="2">
                <h6 style="border-top: 1px solid #2b675b;color: #2b675b; width: 70%; margin-top: 30px"
                    class="text-center">
                  <b>{{ $t('reporting.pdf.imzo') }}</b></h6>
              </b-col>
              <b-col cols="2"></b-col>
            </b-row>
          </div>

        </div>
      </div>

      <template v-slot:modal-footer>

        <b-button @click="generatePdf" class="pt-1 pl-3 pr-3 pb-1 float-right mr-2"
                  style="background: #2b675b;color: white ">
          <i class="bx bx-download label-icon"></i>
          {{ $t('actions.upload_file') }} {{ $t('reporting.pdf.pdf') }}
        </b-button>

        <b-button class="pt-1 pl-3 pr-3 pb-1" style="background: rgb(243, 145, 56); color: white"
                  @click="isFileGenerationModal = false">
          {{ $t("actions.close") }}
        </b-button>

      </template>
    </b-modal>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";

const REF_NAME = 'court_instantions'
import appConfig from "@/app.config";
import crudAndListsService from '@/shared/services/crud_and_list.service'
import Service from '../service'

const MAIN_API_URL = 'contractor-advertising-construction'
export default {
  page: {
    title: "Passport info",
    meta: [{name: "description", content: appConfig.description}],
  },
  components: {},
  data() {
    return {
      measures: [],
      loader: false,
      loadingStirItems: false,
      summm: '',
      editingItem: {
        name: '',
        fio: '',
        address: '',
        check: false,
        isOthers: false
      },
      isFileGeneration: false,
      isFileGenerationModal: false,
      sanoat: [],
      hizmat: [],
      isModalSanoat: false,
      isModalHizmat: false,
      loaderSanoat: false,
      loaderHizmat: false,
      uploadFiles: null,
      uploadFilename: '',
      upload_files: null,
      phoneId: null,
      phoneNumber: '',
      phoneCodes: [],
      phoneCode: null,
      loaderTifTn: false,
      dataTifTn: null
    }
  },
  watch: {
    phoneId(id) {
      if (id !== null) {
        this.phoneCode = this.phoneCodes.find(e => e.id == id);
      } else {
        this.phoneCode = null;
      }
    },
    'editingItem.dateFrom': {
      async handler(newValue) {
        // if (newValue) {
        //   var input = newValue.split("-");

// Get the day of the month
//           var dd = input[0]

// Get the month (adding 1 because months are zero-based)
//           var mm = parseInt(input[1]) + 6
//
// Get the year
//           var yyyy = input[2]

// Add leading zero if the day is less than 10
//           if (dd < 10) {
//             dd = '0' + dd;
//           }

// Add leading zero if the month is less than 10
//           if (mm < 10) {
//             mm = '0' + mm;
//           }

        //   this.editingItem.dateTo = dd + '-' + mm + '-' + yyyy;
        // } else {
        //   this.editingItem.dateTo = null
        // }
      }
    },
    'dataTifTn': {
      async handler() {
          this.editingItem.nameProduct = this.dataTifTn.name
        this.editingItem.measureName = this.getName({
          nameRu: this.dataTifTn.measureDto.nameRu,
          nameUz: this.dataTifTn.measureDto.nameUz,
          nameLt: this.dataTifTn.measureDto.nameLt,
        })
      }
    },
    'editingItem.check': {
      async handler() {
        if (this.editingItem.check) {
          this.editingItem.isOthers = false
        }
      }
    },
    'editingItem.isOthers': {
      async handler() {
        if (this.editingItem.isOthers) {
          this.editingItem.check = false
        }
      }
    },
    'editingItem.codeSoxa': {
      async handler() {
        this.editingItem.codeXisobod = ''
        this.editingItem.dateFrom = ''
        this.editingItem.dateTo = ''
        this.editingItem.year = ''
      }
    },
    'editingItem.stir': {
      async handler() {
        if (this.editingItem.stir && this.editingItem.stir.length == 9) {
          this.findContractorByInn()
        }
      }
    },
    'editingItem.madePowerAll': {
      async handler(newValue) {
        if (this.editingItem.madePowerAll) {
          const result = newValue.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          this.editingItem.madePowerAll = result
        }
      }
    },
    'editingItem.madeTonna': {
      async handler(newValue) {
        if (this.editingItem.madeTonna) {
          const result = newValue.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          this.editingItem.madeTonna = result
        }
      }
    },
    'editingItem.madeSum': {
      async handler(newValue) {
        if (this.editingItem.madeSum) {
          const result = newValue.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          this.editingItem.madeSum = result
        }
      }
    },
    'editingItem.buyTonna': {
      async handler(newValue) {
        if (this.editingItem.buyTonna) {
          const result = newValue.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          this.editingItem.buyTonna = result
        }
      }
    },
    'editingItem.buySum': {
      async handler(newValue) {
        if (this.editingItem.buySum) {
          const result = newValue.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          this.editingItem.buySum = result
        }
      }
    },
    'editingItem.exportTonna': {
      async handler(newValue) {
        if (this.editingItem.exportTonna) {
          const result = newValue.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          this.editingItem.exportTonna = result
        }
      }
    },
    'editingItem.exportSum': {
      async handler(newValue) {
        if (this.editingItem.exportSum) {
          const result = newValue.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          this.editingItem.exportSum = result
        }
      }
    },
    'editingItem.finallyTonna': {
      async handler(newValue) {
        if (this.editingItem.finallyTonna) {
          const result = newValue.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          this.editingItem.finallyTonna = result
        }
      }
    },
    'editingItem.finallySum': {
      async handler(newValue) {
        if (this.editingItem.finallySum) {
          const result = newValue.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          this.editingItem.finallySum = result
        }
      }
    },
    'editingItem.sumService': {
      async handler(newValue) {
        if (this.editingItem.sumService) {
          const result = newValue.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          this.editingItem.sumService = result
        }
      }
    },
    'editingItem.exportSumService': {
      async handler(newValue) {
        if (this.editingItem.exportSumService) {
          const result = newValue.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          this.editingItem.exportSumService = result
        }
      }
    },
  }
  ,
  async created() {
    await this.getMeasure();
    await this.getPhoneCode();
  }
  ,
  computed: {
    computedObserver() {
      return this.$refs.observer
    },
    computedObserverSanoat() {
      return this.$refs.observerSanoat
    },
    computedObserverHizmat() {
      return this.$refs.observerHizmat
    },
    checkMethod() {
      var checks = false
      if ((!this.editingItem.check && !this.editingItem.isOthers) && this.uploadFilename !== '') {
        checks = true
      } else if (this.editingItem.isOthers && this.uploadFilename !== '') {
        checks = true
      }

      return checks
    },
  },
  methods: {
    // formatNumber
    formatNumber(num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    }
    ,
    countexportSumService() {
      var exportSumService = parseInt(0)
      for (let i = 0; i < this.hizmat.length; i++) {
        exportSumService += parseInt(this.hizmat[i].exportSumService)
      }
      return exportSumService
    }
    ,
    countsumService() {
      var sumService = parseInt(0)
      for (let i = 0; i < this.hizmat.length; i++) {
        sumService += parseInt(this.hizmat[i].sumService)
      }
      return sumService
    }
    ,
    countfinallySumAll() {
      var finallySum = parseInt(0)
      for (let i = 0; i < this.sanoat.length; i++) {
        finallySum += parseInt(this.sanoat[i].finallySum)
      }
      return finallySum
    }
    ,
    countfinallyTonnaAll() {
      var finallyTonna = parseInt(0)
      for (let i = 0; i < this.sanoat.length; i++) {
        finallyTonna += parseInt(this.sanoat[i].finallyTonna)
      }
      return finallyTonna
    }
    ,
    countexportSumAll() {
      var exportSum = parseInt(0)
      for (let i = 0; i < this.sanoat.length; i++) {
        exportSum += parseInt(this.sanoat[i].exportSum)
      }
      return exportSum
    }
    ,
    countexportTonnaAll() {
      var exportTonna = parseInt(0)
      for (let i = 0; i < this.sanoat.length; i++) {
        exportTonna += parseInt(this.sanoat[i].exportTonna)
      }
      return exportTonna
    }
    ,
    countbuySumAll() {
      var buySum = parseInt(0)
      for (let i = 0; i < this.sanoat.length; i++) {
        buySum += parseInt(this.sanoat[i].buySum)
      }
      return buySum
    }
    ,
    countbuyTonnaAll() {
      var buyTonna = parseInt(0)
      for (let i = 0; i < this.sanoat.length; i++) {
        buyTonna += parseInt(this.sanoat[i].buyTonna)
      }
      return buyTonna
    }
    ,
    countmadeSumAll() {
      var madeSum = parseInt(0)
      for (let i = 0; i < this.sanoat.length; i++) {
        madeSum += parseInt(this.sanoat[i].madeSum)
      }
      return madeSum
    }
    ,
    countmadeTonnaAll() {
      var madeTonna = parseInt(0)
      for (let i = 0; i < this.sanoat.length; i++) {
        madeTonna += parseInt(this.sanoat[i].madeTonna)
      }
      return madeTonna
    }
    ,
    countMadePowerAll() {
      var madePower = parseInt(0)
      for (let i = 0; i < this.sanoat.length; i++) {
        madePower += parseInt(this.sanoat[i].madePowerAll)
      }
      return madePower
    }
    ,
    generatePdf() {
      try {
        var element = document.getElementById("element-to-print");

        var opt = {
          margin: 0.4,
          filename: "myfiles.pdf",
          image: {
            type: 'jpeg',
            quality: 0.98
          },
          html2canvas: {
            scale: 3,
            letterRendering: true,
            useCORS: true
          },
          pagebreak: {mode: 'legacy', before: '.newPage'},
          jsPDF: {
            unit: "mm",
            format: 'a4',
            orientation: "landscape",
            putTotalPages: true,
          },
        };
        html2pdf().set(opt).from(element).save();
        this.isFileGenerationModal = false
        this.isFileGeneration = true
      } catch (error) {
        this.isFileGenerationModal = true
      }

    },
    fileGeneration() {
      this.isFileGenerationModal = true
    },
    findByCodeTiftn() {
      this.editingItem.nameProduct = ''
      this.editingItem.measureName = ''
      this.loaderTifTn = true
      Service.getByCodeTiftn(this.editingItem.codeTiftn, true)
          .then(res => {
                this.loaderTifTn = false

                this.dataTifTn = res.data

                // this.editingItem.nameProduct = dataTifTn.name
                // this.editingItem.measureName = this.getName({
                //   nameRu: dataTifTn.measureDto.nameRu,
                //   nameUz: dataTifTn.measureDto.nameUz,
                //   nameLt: dataTifTn.measureDto.nameLt,
                // })

                // this.$set(this.editingItem, "nameProduct", res.data.name);
                // this.$set(this.editingItem, "measureName", this.getName({
                //   nameRu: res.data.measureDto.nameRu,
                //   nameUz: res.data.measureDto.nameUz,
                //   nameLt: res.data.measureDto.nameLt,
                // }));

                this.$toast(this.$t(this.$t('actions.success')), {type: 'success'});
              }
          )
          .catch(e => {
            console.log(e)
            this.loaderTifTn = false
          });
    }
    ,
    async getPhoneCode() {
      // this.var_default_search_payload.itemsPerPage = 100
      await crudAndListsService.searchListWithKeyword("message-phone-code", this.var_default_search_payload)
          .then(res => {
            this.phoneCodes = res.data.list
          })
          .catch(e => {
            console.log(e)
          })
    }
    ,
    customLabelPhoneCode(opt) {
      let selectedCode = this.phoneCodes.find(e => e.id == opt);
      if (selectedCode) {
        return selectedCode.code;
      }
      return ``;
    }
    ,
    onFileChange(e) {

      const file = e.target.files[0];
      this.upload_files = file
      this.uploadFilename = file.name;
    }
    ,
    uploadFile() {
      this.$refs.ilovaRef.$el.firstChild.click();
    }
    ,
    clearFile() {
      this.upload_files = null
      this.uploadFilename = ''
    }
    ,
    deleteSanoat(index) {
      this.sanoat.splice(index, 1)
    }
    ,
    addFormSanoat() {
      this.loaderSanoat = true;
      this.computedObserverSanoat.validate().then(valid => {
        if (valid) {
          let objSanoat = {
            codeXisobod: this.editingItem.codeXisobod ? this.editingItem.codeXisobod : '',
            dateFrom: this.editingItem.dateFrom ? this.editingItem.dateFrom : '',
            dateTo: this.editingItem.dateTo ? this.editingItem.dateTo : '',
            year: this.editingItem.year ? this.editingItem.year : '',

            codeSoxa: this.editingItem.codeSoxa,
            codeTiftn: this.editingItem.codeTiftn,
            nameProduct: this.editingItem.nameProduct,
            measureName: this.editingItem.measureName,
            // codeMct: this.editingItem.codeMct,
            madePowerAll: this.editingItem.madePowerAll.replaceAll(' ', ''),
            madeTonna: this.editingItem.madeTonna.replaceAll(' ', ''),
            madeSum: this.editingItem.madeSum.replaceAll(' ', ''),
            buyTonna: this.editingItem.buyTonna.replaceAll(' ', ''),
            buySum: this.editingItem.buySum.replaceAll(' ', ''),
            measureId: this.editingItem.measureId,
            exportTonna: this.editingItem.exportTonna.replaceAll(' ', ''),
            exportSum: this.editingItem.exportSum.replaceAll(' ', ''),
            finallyTonna: this.editingItem.finallyTonna.replaceAll(' ', ''),
            finallySum: this.editingItem.finallySum.replaceAll(' ', ''),
          }
          this.editingItem.codeTiftn = ''
          this.editingItem.nameProduct = ''
          this.editingItem.measureName = ''
          // this.editingItem.codeMct = ''
          this.editingItem.madePowerAll = ''
          this.editingItem.madeTonna = ''
          this.editingItem.madeSum = ''
          this.editingItem.buyTonna = ''
          this.editingItem.measureId = ''
          this.editingItem.buySum = ''
          this.editingItem.exportTonna = ''
          this.editingItem.exportSum = ''
          this.editingItem.finallyTonna = ''
          this.editingItem.finallySum = ''

          this.sanoat.push(objSanoat);
        } else {
          this.loaderSanoat = false;
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      })
    }
    ,
    deleteHizmat(index) {
      this.hizmat.splice(index, 1)
    }
    ,
    addFormHizmat() {
      this.loaderHizmat = true;
      this.computedObserverHizmat.validate().then(valid => {
        if (valid) {
          let objHizmat = {
            codeXisobod: this.editingItem.codeXisobod ? this.editingItem.codeXisobod : '',
            dateFrom: this.editingItem.dateFrom ? this.editingItem.dateFrom : '',
            dateTo: this.editingItem.dateTo ? this.editingItem.dateTo : '',
            year: this.editingItem.year ? this.editingItem.year : '',

            codeSoxa: this.editingItem.codeSoxa,
            codeSevice: this.editingItem.codeSevice,
            nameService: this.editingItem.nameService,
            sumService: this.editingItem.sumService.replaceAll(' ', ''),
            exportSumService: this.editingItem.exportSumService.replaceAll(' ', ''),
          }
          this.editingItem.codeSevice = ''
          this.editingItem.nameService = ''
          this.editingItem.sumService = ''
          this.editingItem.exportSumService = ''
          this.hizmat.push(objHizmat);
        } else {
          this.loaderHizmat = false;
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      })
    }
    ,

    findContractorByInn() {
      this.loadingStirItems = true
      if (this.editingItem.stir && this.editingItem.stir.length == 9) {
        this.loadingStirItems = true
        Service.getYuridikShaxsData(this.editingItem.stir, true)
            .then(res => {
              if (res.data) {
                this.editingItem.name = res.data.company && res.data.company.name
                if (res.data.director) {
                  this.editingItem.fio = res.data.director.firstName + ' ' + res.data.director.lastName + ' ' + res.data.director.middleName
                }
                if (res.data.companyBillingAddress) {
                  this.editingItem.soato = res.data.companyBillingAddress.soato
                  this.editingItem.address = this.getName({
                        nameRu: res.data.companyBillingAddress.regionNameRu,
                        nameUz: res.data.companyBillingAddress.regionNameUz,
                        nameLt: res.data.companyBillingAddress.regionNameLt,
                      })
                      + ', ' +
                      this.getName({
                        nameRu: res.data.companyBillingAddress.nameRu,
                        nameUz: res.data.companyBillingAddress.nameUz,
                        nameLt: res.data.companyBillingAddress.nameLt,
                      })
                      + ', ' +
                      res.data.companyBillingAddress.streetName
                }
              }

              this.$toast(this.$t('actions.success'), {type: 'success'});
              this.loadingStirItems = false
            })
            .catch(e => {
              this.loadingStirItems = false
              // this.computedObserver.setErrors({ INN: [this.$t('validator.inn_exist')] });
            })
      } else {
        this.loadingStirItems = false
        this.$toast(this.$t('validator.inn'), {type: 'error'});
        this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
      }

    }
    ,
    async getMeasure() {
      // GET STATUSES
      this.var_default_search_payload.keyword = this.searchKeyword
      this.var_default_search_payload.itemsPerPage = 500

      crudAndListsService.searchListWithKeyword('price_measure', this.var_default_search_payload)
          .then((res) => {
            this.measure = res.data.list;
          })
          .catch(e => {
            this.measure = [];
          })
          .finally(() => {
          })
    }
    ,

    saveData() {
      this.computedObserver.validate().then(valid => {
        if (valid && this.checkMethod) {
          this.loader = true;
          let obj = {
            phone: '+998' + this.phoneCode.code + this.phoneNumber.replaceAll('-', ''),
            name: this.editingItem.name ? this.editingItem.name : '',
            soato: this.editingItem.soato ? this.editingItem.soato : '',
            // ktut: this.editingItem.ktut ? this.editingItem.ktut : '',
            stir: this.editingItem.stir ? this.editingItem.stir : '',
            address: this.editingItem.address ? this.editingItem.address : '',
            check: this.editingItem.check,
            isOthers: this.editingItem.isOthers,
            fio: this.editingItem.fio ? this.editingItem.fio : ''
          }

          if (this.editingItem.check || this.editingItem.isOthers) {

            let bodyData = []
            bodyData = bodyData.concat(this.sanoat)
            bodyData = bodyData.concat(this.hizmat)

            obj.dtoList = bodyData
            Service.createReporting(obj).then(res => {

              let bodyFormData = new FormData()
              bodyFormData.append("id", res.data.id)
              bodyFormData.append("file", this.upload_files)

              Service.createWithFiles1(bodyFormData).then(res2 => {
                this.$toast.success(this.$t('messages.send_successfully'), {position: "top-right"});
                setTimeout(function () {
                  location.reload();
                }, 500); //
                this.editingItem = {}
                this.phoneId = null
                this.phoneNumber = ''
                this.upload_files = null
                this.uploadFiles = null
                this.uploadFilename = ''
                this.sanoat = []
                this.hizmat = []
                this.computedObserver.reset()
                this.computedObserverHizmat.reset()
                this.computedObserverSanoat.reset()
                this.editingItem = Object.assign({}, {});
              })
            })
                .finally(() => {
                  this.loader = false;
                });
          } else if ((!this.editingItem.check && !this.editingItem.isOthers) && (this.editingItem.codeTiftn == '' || this.editingItem.nameService == '')) {

            let bodyData = []
            bodyData = bodyData.concat(this.sanoat)
            bodyData = bodyData.concat(this.hizmat)

            obj.dtoList = bodyData
            Service.createReporting(obj).then(res => {

              let bodyFormData = new FormData()
              bodyFormData.append("id", res.data.id)
              bodyFormData.append("file", this.upload_files)

              Service.createWithFiles1(bodyFormData).then(res2 => {
                this.$toast.success(this.$t('messages.send_successfully'), {position: "top-right"});
                setTimeout(function () {
                  location.reload();
                }, 500); // 3000 milliseconds = 3 seconds
                this.editingItem = {}
                this.phoneId = null
                this.phoneNumber = ''
                this.upload_files = null
                this.uploadFiles = null
                this.uploadFilename = ''
                this.sanoat = []
                this.hizmat = []
                this.computedObserver.reset()
                this.computedObserverHizmat.reset()
                this.computedObserverSanoat.reset()
                this.editingItem = Object.assign({}, {});

              })
            })
                .finally(() => {
                  this.loader = false;
                });
          } else {
            this.loader = false;
            if (this.editingItem.codeTiftn !== '' && this.editingItem.codeSoxa == 'SANOAT') {
              this.$toast(this.$t('reporting.error1'), {type: 'error'});
            } else if (this.editingItem.nameService !== '' && this.editingItem.codeSoxa == 'HIZMAT') {
              this.$toast(this.$t('reporting.error2'), {type: 'error'});
            }
          }
        } else {
          this.loader = false;
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      })
    }
    ,
  }
}
const i18n = require("@/i18n");
</script>

<style scoped lang="scss">

.container-main {
  border: 1px solid #2b675b;
  border-radius: 5px;
  margin: 3px;
}

.container {
  padding: 40px;
  font-family: sans-serif;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

::v-deep .modal-title {
  width: 97%;
  padding: 2px 0px 0px 10px;
  background-color: #2b675b;
  color: white;
}

table, td, th {
  border: 1px solid #2b6c58;
  color: #2b6c58;
  text-align: center;
  padding: 5px 2px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

::v-deep label {
  font-family: inherit !important;
}

::v-deep .base-form-component__label {
  color: #88a59e;
}

::v-deep .custom-select {
  border: 1px solid #2b675b;
}

::v-deep .form-control {
  border: 1px solid #2b675b;
}

::v-deep .mx-input {
  border: 1px solid #2b675b;
}

::v-deep .multiselect__tags {
  border: 1px solid #2b675b;

}

::v-deep .base-form-component__date-picker {
  border: 1px solid #2b675b;
  border-radius: 5px;
}

::v-deep .vue-treeselect {
  border: 1px solid #2b675b;
  border-radius: 5px;
}

::v-deep .custom-multiselect {
  border: 1px solid #2b675b;
  border-radius: 5px;
}

table {
  border: 1px solid #2b675b;
}

thead th {
  border: 1px solid #2b675b;
  padding: 3px;
}

tbody td {
  padding: 3px;
  border: 1px solid #2b675b;
}

tbody td {
  padding: 3px;
}
</style>
