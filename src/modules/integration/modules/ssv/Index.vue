<template>
    <div>
        <div class="col-md-12 text-sm-start">
            <b-button class="btn btn-warning" size="md" @click="$router.push({name: 'IntegrationMenuIndex'})">
                {{ $t("actions.back") }}
            </b-button>
        </div>
        <div class="col-md-12 text-center">
            <div class="h4 d-inline-block">{{ $t('submodules.integration.ssv_info.fullTitle') }}</div>
        </div>
        <b-card no-body style="min-height: auto">
            <b-tabs pills card align="right" class="ml-1">
                <b-tab :title="$t('submodules.integration.ssv_info.pinfl')" active @click="headerTab('pinfl')"></b-tab>
                <b-tab :title="$t('submodules.integration.ssv_info.pasport')" @click="headerTab('pasport')"></b-tab>
                <b-tab :title="$t('submodules.integration.ssv_info.by_cert')" @click="headerTab('by_cert')"></b-tab>
            </b-tabs>
            <b-tabs pills card vertical nav-wrapper-class="w-25" class="ml-1" content-class="ml-4 pb-3">
                <b-tab :title="$t('submodules.integration.ssv_info.narko')" active @click="selectTab('narko')">

                    <div v-if="activeTab == 'pinfl'">
                        <b-row class="mb-2">
                            <b-col cols="4">
                                <BaseInputWithValidation
                                        rules="integer|min:14|max:14"
                                        v-model="form.pinfl"
                                        mask="##############"
                                        label-on-top
                                        :label="$t('submodules.integration.farmasevtika_info.fields2.pinfl')"
                                        :placeholder="$t('submodules.integration.farmasevtika_info.fields2.pinfl')"
                                >
                                </BaseInputWithValidation>
                            </b-col>
                            <b-col cols="1">
                                <b-btn variant="success" class="mt-3"
                                       :disabled="!pinflBtn || loadingTableItems" @click="getInfos">
                                    <i v-show="!loadingTableItems" class="fa fa-search"/>
                                    <b-spinner v-show="loadingTableItems" small type="grow"></b-spinner>
                                </b-btn>
                            </b-col>
                        </b-row>

                        <b-card v-if="userInfo  == null" border-variant="primary" bg-variant="light"
                                class="text-center">
                            {{ $t('messages.data_not_found') }}
                        </b-card>
                        <b-card v-else border-variant="primary" bg-variant="light">
                            <b-list-group>
                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.pasport')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.passportNo ? userInfo.passportNo : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.full_name')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.surname ? userInfo.surname : '_ _ _'
                                        }} {{
                                        userInfo.name ? userInfo.name : '_ _ _'
                                        }} {{
                                        userInfo.middleName ? userInfo.middleName : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.date_birth')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.birthDate ? userInfo.birthDate : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.sex')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.gender ? userInfo.gender : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.institution_name')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.patientPermAddress ? userInfo.patientPermAddress : '_ _ _'
                                        }}</span>
                                </b-list-group-item>
                            </b-list-group>
                        </b-card>

                    </div>

                    <div v-else-if="activeTab == 'pasport'">
                        <b-row class="mb-2">
                            <b-col cols="2">
                                <BaseInputWithValidation
                                        rules="min:2|max:2"
                                        mask="AA"
                                        v-model="form.passportSeries"
                                        label-on-top
                                        :label="$t('column.passport_series')"
                                        :placeholder="$t('column.passport_series')"
                                />
                            </b-col>
                            <b-col cols="3">
                                <BaseInputWithValidation
                                        rules="integer|min:7|max:7"
                                        v-model="form.passportNumber"
                                        mask="#######"
                                        label-on-top
                                        :label="$t('column.passport_number')"
                                        :placeholder="$t('column.passport_number')"
                                />
                            </b-col>
                            <b-col cols="1">
                                <b-btn variant="success" class="mt-3" :disabled="loadingTableItems" @click="getInfos">
                                    <i v-show="!loadingTableItems" class="fa fa-search"/>
                                    <b-spinner v-show="loadingTableItems" small type="grow"></b-spinner>
                                </b-btn>
                            </b-col>
                        </b-row>

                        <b-card v-if="userInfo  == null" border-variant="primary" bg-variant="light"
                                class="text-center">
                            {{ $t('messages.data_not_found') }}
                        </b-card>
                        <b-card v-else border-variant="primary" bg-variant="light">
                            <b-list-group>
                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.pasport')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.passportNo ? userInfo.passportNo : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.full_name')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.surname ? userInfo.surname : '_ _ _'
                                        }} {{
                                        userInfo.name ? userInfo.name : '_ _ _'
                                        }} {{
                                        userInfo.middleName ? userInfo.middleName : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.date_birth')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.birthDate ? userInfo.birthDate : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.sex')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.gender ? userInfo.gender : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.institution_name')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.patientPermAddress ? userInfo.patientPermAddress : '_ _ _'
                                        }}</span>
                                </b-list-group-item>
                            </b-list-group>
                        </b-card>
                    </div>

                    <div v-else-if="activeTab == 'by_cert'">
                        <b-row class="mb-2">
                            <b-col cols="2">
                                <BaseInputWithValidation
                                        rules="min:2|max:2"
                                        mask="AA"
                                        v-model="form.certificateSeries"
                                        label-on-top
                                        :label="$t('submodules.integration.ssv_info.serial')"
                                        :placeholder="$t('submodules.integration.ssv_info.serial')"
                                />
                            </b-col>
                            <b-col cols="3">
                                <BaseInputWithValidation
                                        rules="integer|min:7|max:7"
                                        v-model="form.certificateNumber"
                                        mask="#######"
                                        label-on-top
                                        :label="$t('submodules.integration.ssv_info.number')"
                                        :placeholder="$t('submodules.integration.ssv_info.number')"
                                />
                            </b-col>
                            <b-col cols="3">
                                <BaseDatePickerWithValidation
                                        :label="$t('column.birthdate')"
                                        placeholder="xx-xx-xxxx"
                                        label-on-top
                                        lang="ru"
                                        format="DD-MM-YYYY"
                                        v-model="form.birthdate"
                                ></BaseDatePickerWithValidation>
                            </b-col>
                            <b-col cols="1">
                                <b-btn variant="success" class="mt-3" :disabled="loadingTableItems" @click="getInfos">
                                    <i v-show="!loadingTableItems" class="fa fa-search"/>
                                    <b-spinner v-show="loadingTableItems" small type="grow"></b-spinner>
                                </b-btn>
                            </b-col>
                        </b-row>

                        <b-card v-if="userInfo  == null" border-variant="primary" bg-variant="light"
                                class="text-center">
                            {{ $t('messages.data_not_found') }}
                        </b-card>
                        <b-card v-else border-variant="primary" bg-variant="light">
                            <b-list-group>
                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.pasport')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.passportNo ? userInfo.passportNo : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.full_name')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.surname ? userInfo.surname : '_ _ _'
                                        }} {{
                                        userInfo.name ? userInfo.name : '_ _ _'
                                        }} {{
                                        userInfo.middleName ? userInfo.middleName : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.date_birth')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.birthDate ? userInfo.birthDate : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.sex')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.gender ? userInfo.gender : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.institution_name')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.patientPermAddress ? userInfo.patientPermAddress : '_ _ _'
                                        }}</span>
                                </b-list-group-item>
                            </b-list-group>
                        </b-card>
                    </div>

                </b-tab>
                <b-tab :title="$t('submodules.integration.ssv_info.psix')" @click="selectTab('psix')">

                    <div v-if="activeTab == 'pinfl'">
                        <b-row class="mb-2">
                            <b-col cols="4">
                                <BaseInputWithValidation
                                        rules="integer|min:14|max:14"
                                        v-model="form.pinfl"
                                        mask="##############"
                                        label-on-top
                                        :label="$t('submodules.integration.farmasevtika_info.fields2.pinfl')"
                                        :placeholder="$t('submodules.integration.farmasevtika_info.fields2.pinfl')"
                                >
                                </BaseInputWithValidation>
                            </b-col>
                            <b-col cols="1">
                                <b-btn variant="success" class="mt-3"
                                       :disabled="!pinflBtn || loadingTableItems" @click="getInfos">
                                    <i v-show="!loadingTableItems" class="fa fa-search"/>
                                    <b-spinner v-show="loadingTableItems" small type="grow"></b-spinner>
                                </b-btn>
                            </b-col>
                        </b-row>

                        <b-card v-if="userInfo  == null " border-variant="primary" bg-variant="light"
                                class="text-center">
                            {{ $t('messages.data_not_found') }}
                        </b-card>
                        <b-card v-else border-variant="primary" bg-variant="light">
                            <b-list-group>
                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.pasport')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.passportNo ? userInfo.passportNo : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.full_name')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.surname ? userInfo.surname : '_ _ _'
                                        }} {{
                                        userInfo.name ? userInfo.name : '_ _ _'
                                        }} {{
                                        userInfo.middleName ? userInfo.middleName : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.date_birth')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.birthDate ? userInfo.birthDate : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.sex')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.gender ? userInfo.gender : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.institution_name')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.patientPermAddress ? userInfo.patientPermAddress : '_ _ _'
                                        }}</span>
                                </b-list-group-item>
                            </b-list-group>
                        </b-card>
                    </div>

                    <div v-else-if="activeTab == 'pasport'">
                        <b-row class="mb-2">
                            <b-col cols="2">
                                <BaseInputWithValidation
                                        rules="min:2|max:2"
                                        mask="AA"
                                        v-model="form.passportSeries"
                                        label-on-top
                                        :label="$t('column.passport_series')"
                                        :placeholder="$t('column.passport_series')"
                                />
                            </b-col>
                            <b-col cols="3">
                                <BaseInputWithValidation
                                        rules="integer|min:7|max:7"
                                        v-model="form.passportNumber"
                                        mask="#######"
                                        label-on-top
                                        :label="$t('column.passport_number')"
                                        :placeholder="$t('column.passport_number')"
                                />
                            </b-col>
                            <b-col cols="1">
                                <b-btn variant="success" class="mt-3" :disabled="loadingTableItems" @click="getInfos">
                                    <i v-show="!loadingTableItems" class="fa fa-search"/>
                                    <b-spinner v-show="loadingTableItems" small type="grow"></b-spinner>
                                </b-btn>
                            </b-col>
                        </b-row>
                        <b-card v-if="userInfo  == null" border-variant="primary" bg-variant="light"
                                class="text-center">
                            {{ $t('messages.data_not_found') }}
                        </b-card>
                        <b-card v-else border-variant="primary" bg-variant="light">
                            <b-list-group>
                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.pasport')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.passportNo ? userInfo.passportNo : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.full_name')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.surname ? userInfo.surname : '_ _ _'
                                        }} {{
                                        userInfo.name ? userInfo.name : '_ _ _'
                                        }} {{
                                        userInfo.middleName ? userInfo.middleName : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.date_birth')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.birthDate ? userInfo.birthDate : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.sex')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.gender ? userInfo.gender : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.institution_name')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.patientPermAddress ? userInfo.patientPermAddress : '_ _ _'
                                        }}</span>
                                </b-list-group-item>
                            </b-list-group>
                        </b-card>
                    </div>

                    <div v-else-if="activeTab == 'by_cert'">
                        <b-row class="mb-2">
                            <b-col cols="2">
                                <BaseInputWithValidation
                                        rules="min:2|max:2"
                                        mask="AA"
                                        v-model="form.certificateSeries"
                                        label-on-top
                                        :label="$t('submodules.integration.ssv_info.serial')"
                                        :placeholder="$t('submodules.integration.ssv_info.serial')"
                                />
                            </b-col>
                            <b-col cols="3">
                                <BaseInputWithValidation
                                        rules="integer|min:7|max:7"
                                        v-model="form.certificateNumber"
                                        mask="#######"
                                        label-on-top
                                        :label="$t('submodules.integration.ssv_info.number')"
                                        :placeholder="$t('submodules.integration.ssv_info.number')"
                                />
                            </b-col>
                            <b-col cols="3">
                                <BaseDatePickerWithValidation
                                        :label="$t('column.birthdate')"
                                        placeholder="xx-xx-xxxx"
                                        label-on-top
                                        lang="ru"
                                        format="DD-MM-YYYY"
                                        v-model="form.birthdate"
                                ></BaseDatePickerWithValidation>
                            </b-col>
                            <b-col cols="1">
                                <b-btn variant="success" class="mt-3" :disabled="loadingTableItems" @click="getInfos">
                                    <i v-show="!loadingTableItems" class="fa fa-search"/>
                                    <b-spinner v-show="loadingTableItems" small type="grow"></b-spinner>
                                </b-btn>
                            </b-col>
                        </b-row>
                        <b-card v-if="userInfo  == null" border-variant="primary" bg-variant="light"
                                class="text-center">
                            {{ $t('messages.data_not_found') }}
                        </b-card>
                        <b-card v-else border-variant="primary" bg-variant="light">
                            <b-list-group>
                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.pasport')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.passportNo ? userInfo.passportNo : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.full_name')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.surname ? userInfo.surname : '_ _ _'
                                        }} {{
                                        userInfo.name ? userInfo.name : '_ _ _'
                                        }} {{
                                        userInfo.middleName ? userInfo.middleName : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.date_birth')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.birthDate ? userInfo.birthDate : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.sex')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.gender ? userInfo.gender : '_ _ _'
                                        }}</span>
                                </b-list-group-item>

                                <b-list-group-item class="d-flex justify-content-between align-items-center"><b>
                                    {{
                                    $t('submodules.integration.ssv_info.res.institution_name')
                                    }}</b>
                                    <span variant="primary" pill>{{
                                        userInfo.patientPermAddress ? userInfo.patientPermAddress : '_ _ _'
                                        }}</span>
                                </b-list-group-item>
                            </b-list-group>
                        </b-card>

                    </div>

                </b-tab>
                <!--        <b-tab :title="$t('submodules.integration.ssv_info.tibbiy')">-->

                <!--          <div v-if="activeTab == 'pinfl'">-->
                <!--            <b-row class="mb-2">-->
                <!--              <b-col cols="4">-->
                <!--                <BaseInputWithValidation-->
                <!--                    v-model="form.pinfl"-->
                <!--                    label-on-top-->
                <!--                    :label="$t('submodules.integration.farmasevtika_info.fields2.pinfl')"-->
                <!--                    :placeholder="$t('submodules.integration.farmasevtika_info.fields2.pinfl')"-->
                <!--                    v-mask="'##############'"-->
                <!--                >-->
                <!--                </BaseInputWithValidation>-->
                <!--              </b-col>-->
                <!--              <b-col cols="1">-->
                <!--                <b-btn variant="success" class="mt-3"><i class="fa fa-search"/></b-btn>-->
                <!--              </b-col>-->
                <!--            </b-row>-->
                <!--            &lt;!&ndash;                <b-card border-variant="primary" bg-variant="light">&ndash;&gt;-->
                <!--            &lt;!&ndash;                  asdf asdasd asdsadasdasd asd asd s&ndash;&gt;-->
                <!--            &lt;!&ndash;                </b-card>&ndash;&gt;-->
                <!--            <b-card border-variant="primary" bg-variant="light" class="text-center">-->
                <!--              {{ $t('messages.data_not_found') }}-->
                <!--            </b-card>-->
                <!--          </div>-->

                <!--          <div v-else-if="activeTab == 'pasport'">-->
                <!--            <b-row class="mb-2">-->
                <!--              <b-col cols="2">-->
                <!--                <BaseInputWithValidation-->
                <!--                    rules="min:2|max:2"-->
                <!--                    mask="AA"-->
                <!--                    v-model="form.passportSeries"-->
                <!--                    label-on-top-->
                <!--                    :label="$t('column.passport_series')"-->
                <!--                    :placeholder="$t('column.passport_series')"-->
                <!--                />-->
                <!--              </b-col>-->
                <!--              <b-col cols="3">-->
                <!--                <BaseInputWithValidation-->
                <!--                    rules="integer|min:7|max:7"-->
                <!--                    v-model="form.passportNumber"-->
                <!--                    mask="#######"-->
                <!--                    label-on-top-->
                <!--                    :label="$t('column.passport_number')"-->
                <!--                    :placeholder="$t('column.passport_number')"-->
                <!--                />-->
                <!--              </b-col>-->
                <!--              <b-col cols="1">-->
                <!--                <b-btn variant="success" class="mt-3"><i class="fa fa-search"/></b-btn>-->
                <!--              </b-col>-->
                <!--            </b-row>-->
                <!--            &lt;!&ndash;                <b-card border-variant="primary" bg-variant="light">&ndash;&gt;-->
                <!--            &lt;!&ndash;                  asdf asdasd asdsadasdasd asd asd s&ndash;&gt;-->
                <!--            &lt;!&ndash;                </b-card>&ndash;&gt;-->
                <!--            <b-card border-variant="primary" bg-variant="light" class="text-center">-->
                <!--              {{ $t('messages.data_not_found') }}-->
                <!--            </b-card>-->
                <!--          </div>-->

                <!--          <div v-else-if="activeTab == 'by_cert'">-->
                <!--            <b-row class="mb-2">-->
                <!--              <b-col cols="2">-->
                <!--                <BaseInputWithValidation-->
                <!--                    rules="min:2|max:2"-->
                <!--                    mask="AA"-->
                <!--                    v-model="form.passportSeries"-->
                <!--                    label-on-top-->
                <!--                    :label="$t('column.passport_series')"-->
                <!--                    :placeholder="$t('column.passport_series')"-->
                <!--                />-->
                <!--              </b-col>-->
                <!--              <b-col cols="3">-->
                <!--                <BaseInputWithValidation-->
                <!--                    rules="integer|min:7|max:7"-->
                <!--                    v-model="form.passportNumber"-->
                <!--                    mask="#######"-->
                <!--                    label-on-top-->
                <!--                    :label="$t('column.passport_number')"-->
                <!--                    :placeholder="$t('column.passport_number')"-->
                <!--                />-->
                <!--              </b-col>-->
                <!--              <b-col cols="3">-->
                <!--                <BaseDatePickerWithValidation-->
                <!--                    :label="$t('column.birthdate')"-->
                <!--                    placeholder="XX-XX-XXXX"-->
                <!--                    label-on-top-->
                <!--                    lang="ru"-->
                <!--                    format="DD-MM-YYYY"-->
                <!--                    v-model="form.period_date"-->
                <!--                ></BaseDatePickerWithValidation>-->
                <!--              </b-col>-->
                <!--              <b-col cols="1">-->
                <!--                <b-btn variant="success" class="mt-3"><i class="fa fa-search"/></b-btn>-->
                <!--              </b-col>-->
                <!--            </b-row>-->

                <!--            &lt;!&ndash;                <b-card border-variant="primary" bg-variant="light">&ndash;&gt;-->
                <!--            &lt;!&ndash;                  asdf asdasd asdsadasdasd asd asd s&ndash;&gt;-->
                <!--            &lt;!&ndash;                </b-card>&ndash;&gt;-->
                <!--            <b-card border-variant="primary" bg-variant="light" class="text-center">-->
                <!--              {{ $t('messages.data_not_found') }}-->
                <!--            </b-card>-->
                <!--          </div>-->

                <!--        </b-tab>-->
            </b-tabs>
        </b-card>
    </div>

</template>

<script>
import Service from "./ssvService"

export default {
    name: "index",
    data() {
        return {
            pinflBtn: false,
            loadingTableItems: false,
            activeTab: 'pinfl',
            activeSelectTab: 'narko',
            form: {
                pinfl: '',
                passportSeries: '',
                passportNumber: '',
                certificateSeries: '',
                certificateNumber: '',
                birthdate: null,
            },
            formDefault: {
                pinfl: '',
                passportSeries: '',
                passportNumber: '',
                certificateSeries: '',
                certificateNumber: '',
                birthdate: null,
            },
            userInfo: null,
        }
    },
    watch: {
        'form.pinfl': {
            async handler() {
                this.pinflBtn = this.form.pinfl.toString().length == 14
            },
        },
    },
    methods: {

        headerTab(value) {
            this.userInfo = null
            this.activeTab = value
            this.form = this.formDefault
        },
        selectTab(value) {
            this.userInfo = null
            this.activeSelectTab = value
            this.form = this.formDefault
        },
        getInfos() {
            this.loadingTableItems = true
            this.userInfo = null

            let data = {
                pinfl: this.form.pinfl,
                passportSeries: this.form.passportSeries,
                passportNumber: this.form.passportNumber,
                certificateSeries: this.form.certificateSeries,
                certificateNumber: this.form.certificateNumber,
                birthdate: this.form.birthdate,
            }

            if (this.activeSelectTab === 'narko') {
                if (this.activeTab === 'pinfl') {
                    Service.getInfoNarkoBypinfl(data)
                        .then(res => {
                            this.userInfo = res.data.data.object
                            this.$toast(res.data.status.message, {type: 'success'});
                        })
                        .catch(e => console.log(e))
                        .finally(() => {
                            this.loadingTableItems = false
                        })
                } else if (this.activeTab === 'pasport') {
                    Service.getInfoNarkoByPasport(data)
                        .then(res => {
                            this.userInfo = res.data.data.object
                            this.$toast(res.data.status.message, {type: 'success'});
                        })
                        .catch(e => console.log(e))
                        .finally(() => {
                            this.loadingTableItems = false
                        })
                } else if (this.activeTab === 'by_cert') {
                    Service.getInfoNarkoByCert(data)
                        .then(res => {
                            this.userInfo = res.data.data.object
                            this.$toast(res.data.status.message, {type: 'success'});
                        })
                        .catch(e => console.log(e))
                        .finally(() => {
                            this.loadingTableItems = false
                        })
                }

            } else if (this.activeSelectTab === 'psix') {
                this.userInfo = null
                if (this.activeTab === 'pinfl') {
                    Service.getInfoPsixBypinfl(data)
                        .then(res => {
                            this.userInfo = res.data.data.object
                            this.$toast(res.data.status.message, {type: 'success'});
                        })
                        .catch(e => console.log(e))
                        .finally(() => {
                            this.loadingTableItems = false
                        })
                } else if (this.activeTab === 'pasport') {
                    Service.getInfoPsixByPasport(data)
                        .then(res => {
                            this.userInfo = res.data.data.object
                            this.$toast(res.data.status.message, {type: 'success'});
                        })
                        .catch(e => console.log(e))
                        .finally(() => {
                            this.loadingTableItems = false
                        })
                } else if (this.activeTab === 'by_cert') {
                    Service.getInfoPsixByCert(data)
                        .then(res => {
                            this.userInfo = res.data.data.object
                            this.$toast(res.data.status.message, {type: 'success'});
                        })
                        .catch(e => console.log(e))
                        .finally(() => {
                            this.loadingTableItems = false
                        })
                }
            }

        }
    },

}
</script>

<style scoped>

</style>