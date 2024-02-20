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
                  <b-col class="px-3 py-0">
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
                            @click="findContractorByInn"
                            variant="outline-primary"
                            id="contractorSearchButton"
                            style="padding: 2.5px 10px; font-size: 1.2rem;"
                        >
                          <i class="mdi mdi-account-search"></i>
                        </b-button>
                      </template>
                    </BaseInputWithValidation>
                  </b-col>
                  <b-col class="px-3">
                    <BaseInputWithValidation
                        v-model="editingItem.ktut"
                        :label="$t('reporting.main.form1.name2')"
                        :placeholder="$t('')"
                        class="required"
                        rules="required"
                        label-on-top
                    />
                  </b-col>
                  <b-col class="px-3">
                    <BaseInputWithValidation
                        v-model="editingItem.name"
                        :label="$t('reporting.main.form1.name3')"
                        :placeholder="$t('')"
                        class="required"
                        rules="required"
                        label-on-top
                    />
                  </b-col>
                  <b-col class="px-3">
                    <BaseInputWithValidation
                        v-model="editingItem.fio"
                        :label="$t('reporting.main.form1.name4')"
                        :placeholder="$t('')"
                        class="required"
                        rules="required"
                        label-on-top
                    />
                  </b-col>
                  <b-col class="px-3">
                    <BaseInputWithValidation
                        v-model="editingItem.address"
                        :label="$t('reporting.main.form1.name5')"
                        :placeholder="$t('')"
                        class="required"
                        rules="required"
                        label-on-top
                    />
                  </b-col>

                </b-row>
              </b-card>
              <b-card style="border:1px solid #2b675b; border-radius: 5px; margin:15px; padding: 15px;margin-top:10px;">
                <b-row>
                  <b-col cols="3" class="px-3 py-0">
                    <div
                        style="font-size: 16px;background: #2b675b; color: white; padding: 5px; width: 100%; margin-bottom: 20px; border-radius: 2px; font-weight: bold">
                      {{ $t('reporting.main.form2.title') }}
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="12" md="3" class="px-3 py-0">
                    <BaseSelectWithValidation
                        v-model="editingItem.codeSoxa"
                        class="required"
                        rules="required"
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

                  <b-col cols="12" md="3" class="px-3">
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
                  <b-col cols="12" md="3" class="px-3"
                         v-if="editingItem.codeXisobod == 'YILLIK'">
                    <BaseDatePickerWithValidation
                        class="required"
                        rules="required"
                        :label="$t('column.birthdate')"
                        type="year"
                        format="YYYY"
                        label-on-top
                        lang="ru"
                        v-model="editingItem.year"
                    ></BaseDatePickerWithValidation>
                  </b-col>
                  <b-col cols="12" md="3" class="px-3 mt-3"
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
                              custom-styles="grid-template-columns: 100%;"
                              :only-form-element="true"
                              v-model="editingItem.dateFrom"
                              lang="ru"
                              :placeholder="$t('reporting.main.form2.name6')"
                          >
                          </BaseDatePickerWithValidation>
                        </b-col>
                        <b-col>
                          <BaseDatePickerWithValidation
                              class="required"
                              rules="required"
                              custom-styles="grid-template-columns: 100%;"
                              :only-form-element="true"
                              v-model="editingItem.dateTo"
                              :placeholder="$t('reporting.main.form2.name7')"
                              lang="ru"
                          ></BaseDatePickerWithValidation>
                        </b-col>
                      </b-row>
                    </b-form-group>
                  </b-col>

                </b-row>
              </b-card>
            </ValidationObserver>

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
                <b-col cols="3" class="px-3 py-0"></b-col>
                <b-col cols="3" class="px-3 py-0">
                  <b-button-group style="width: 100%;">
                    <b-button
                        @click="addFormSanoat"
                        block
                        variant="primary"
                        class="pt-1 mb-4 pb-1 pr-2 pl-2"
                    >
                      <i class="fa fa-plus"></i>
                      <span style="font-size: 14px">
                        {{ $t("actions.add") }}
                      </span>
                    </b-button>
                    <b-button
                        v-show="sanoat.length > 0"
                        variant="warning"
                        class="pt-1 mb-4 pb-1 pr-2 pl-2"
                        @click="isModalSanoat = true"
                    >
                      <i class="fa fa-eye"></i>
                    </b-button>
                  </b-button-group>
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
                        mask="#########"
                        :label="$t('reporting.main.form3.name1')"
                        :placeholder="$t('')"
                        class="required"
                        rules="required"
                        label-on-top
                    />
                  </b-col>
                  <b-col class="px-3">
                    <BaseInputWithValidation
                        v-model="editingItem.nameProduct"
                        :label="$t('reporting.main.form3.name2')"
                        :placeholder="$t('')"
                        class="required"
                        rules="required"
                        label-on-top
                    />
                  </b-col>
                  <b-col class="px-3">
                    <BaseInputWithValidation
                        v-model="editingItem.codeMct"
                        :label="$t('reporting.main.form3.name3')"
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
            </b-card>

            <b-card v-else-if="editingItem.codeSoxa == 'HIZMAT'"
                    style="border:1px solid #2b675b; border-radius: 5px; margin:15px; padding: 15px;margin-top:10px;">
              <b-row>
                <b-col cols="3" class="px-3 py-0">
                  <div
                      style="font-size: 16px;background: #2b675b; color: white; padding: 5px; width: 100%; margin-bottom: 20px; border-radius: 2px; font-weight: bold">
                    {{ $t('reporting.main.form4.title') }}
                  </div>
                </b-col>
                <b-col cols="3" class="px-3 py-0"></b-col>
                <b-col cols="3" class="px-3 py-0"></b-col>
                <b-col cols="3" class="px-3 py-0">
                  <b-button-group style="width: 100%;">
                    <b-button
                        @click="addFormHizmat"
                        block
                        variant="primary"
                        class="pt-1 mb-4 pb-1 pr-2 pl-2"
                    >
                      <i class="fa fa-plus"></i>
                      <span style="font-size: 14px">
                        {{ $t("actions.add") }}
                      </span>
                    </b-button>
                    <b-button
                        @click="isModalHizmat = true"
                        v-show="hizmat.length > 0"
                        variant="warning"
                        class="pt-1 mb-4 pb-1 pr-2 pl-2"
                    >
                      <i class="fa fa-info-circle"></i>
                    </b-button>
                  </b-button-group>
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
            </b-card>

            <b-row class="p-1">
              <b-col cols="12" md="10"></b-col>
              <b-col cols="12" md="2" class="mt-3">
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
                      style="background: #2b675b; font-size: 16px"
                  >
                    {{ $t("actions.save") }}
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
            <b-col cols="12" md="3">
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
            <b-col cols="12" md="3">
              <div>
                <div style="color:#88a59e;">{{ $t('reporting.main.form3.name2') }}:</div>
                <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                  {{ card.nameProduct ? card.nameProduct : '- - -' }}
                </div>
              </div>
            </b-col>
            <b-col cols="12" md="3">
              <div>
                <div style="color:#88a59e;">
                  {{
                    $t('reporting.main.form3.name3')
                  }}:
                </div>
                <div style="font-size: 16px; font-weight: bold; color: #2b675b;">
                  {{ card.codeMct ? card.codeMct : '- - -' }}
                </div>
              </div>
            </b-col>
            <b-col cols="12" md="3">
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
  </div>
</template>

<script>

import integratsiyaService from "@/shared/services/integratsiya.service";

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
      loader: false,
      loadingStirItems: false,
      summm: '',
      editingItem: {},
      sanoat: [],
      hizmat: [],
      isModalSanoat: false,
      isModalHizmat: false,
      loaderSanoat: false,
      loaderHizmat: false,
    }
  },
  watch: {
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
  },
  async created() {
  },
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
  },
  methods: {
    deleteSanoat(index) {
      this.sanoat.splice(index, 1)
    },
    addFormSanoat() {
      this.loaderSanoat = true;
      this.computedObserverSanoat.validate().then(valid => {
        if (valid) {
          let objSanoat = {
            codeSoxa: this.editingItem.codeSoxa,
            codeTiftn: this.editingItem.codeTiftn,
            nameProduct: this.editingItem.nameProduct,
            codeMct: this.editingItem.codeMct,
            madePowerAll: this.editingItem.madePowerAll.replaceAll(' ', ''),
            madeTonna: this.editingItem.madeTonna.replaceAll(' ', ''),
            madeSum: this.editingItem.madeSum.replaceAll(' ', ''),
            buyTonna: this.editingItem.buyTonna.replaceAll(' ', ''),
            buySum: this.editingItem.buySum.replaceAll(' ', ''),
            exportTonna: this.editingItem.exportTonna.replaceAll(' ', ''),
            exportSum: this.editingItem.exportSum.replaceAll(' ', ''),
            finallyTonna: this.editingItem.finallyTonna.replaceAll(' ', ''),
            finallySum: this.editingItem.finallySum.replaceAll(' ', ''),
          }
          this.editingItem.codeTiftn = ''
          this.editingItem.nameProduct = ''
          this.editingItem.codeMct = ''
          this.editingItem.madePowerAll = ''
          this.editingItem.madeTonna = ''
          this.editingItem.madeSum = ''
          this.editingItem.buyTonna = ''
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
    },
    deleteHizmat(index) {
      this.hizmat.splice(index, 1)
    },
    addFormHizmat() {

      this.loaderHizmat = true;
      this.computedObserverHizmat.validate().then(valid => {
        if (valid) {
          let objHizmat = {
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
    },
    findContractorByInn() {
      this.loadingStirItems = true
      if (this.editingItem.stir && this.editingItem.stir.length == 9) {
        this.loadingStirItems = true
        Service.getYuridikShaxsData(this.editingItem.stir, true)
            .then(res => {
              console.log(res.data)
              this.editingItem.name = res.data.company.name
              this.editingItem.fio = res.data.accountant.firstName + res.data.accountant.lastName + res.data.accountant.middleName
              this.editingItem.address = res.data.fullName

              this.$toast(this.$t('submodules.integration.statistics_info.download_success'), {type: 'success'});
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

    },
    saveData() {
      this.loader = true;
      this.computedObserver.validate().then(valid => {
        if (valid) {
          let obj = {
            codeXisobod: this.editingItem.codeXisobod ? this.editingItem.codeXisobod : '',
            dateFrom: this.editingItem.dateFrom ? this.editingItem.dateFrom : '',
            dateTo: this.editingItem.dateTo ? this.editingItem.dateTo : '',
            year: this.editingItem.year ? this.editingItem.year : '',
            name: this.editingItem.name ? this.editingItem.name : '',
            ktut: this.editingItem.ktut ? this.editingItem.ktut : '',
            stir: this.editingItem.stir ? this.editingItem.stir : '',
            address: this.editingItem.address ? this.editingItem.address : '',
            fio: this.editingItem.fio ? this.editingItem.fio : ''
          }

          Service.createReporting(obj, this.sanoat.concat(this.hizmat))
              .then(async () => {
                await this.successSaved();
                this.computedObserver.reset()
                this.computedObserverHizmat.reset()
                this.computedObserverSanoat.reset()
                this.editingItem = Object.assign({}, {});
              })
              .finally(() => {
                this.loader = false;
              });
        } else {
          this.loader = false;
          this.$toast(this.$t('messages.fill_required_fields'), {type: 'error'});
        }
      })


    }
  }
}
const i18n = require("@/i18n");
</script>

<style scoped lang="scss">
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
</style>
