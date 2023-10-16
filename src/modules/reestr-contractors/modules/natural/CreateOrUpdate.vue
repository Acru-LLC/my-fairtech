<template>
    <base-create-or-update-wrapper
        @save="save"
        has-save-suspend
        :custom-title="$t('actions.add_to_reestr')"
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
                        rules="required"
                        class="required"
                        v-model="editingItem.orderNumber"
                        :label="$t('column.order_number')"
                        :placeholder="$t('column.order_number')"
                    />
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseDatePickerWithValidation
                        rules="required"
                        class="required"
                        :label="$t('column.added_date_to_reestr')"
                        :placeholder="$t('column.added_date_to_reestr')"
                        disable-after
                        v-model="editingItem.reestrAcceptedDate"
                        lang="ru"
                    ></BaseDatePickerWithValidation>
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
                        v-model="editingItem.contractorId"
                        :has-next-page="hasNextPageContractors"
                        @reachedEndOfList="contractorReachedEndOfList"
                        @search-change="debounceSearchContractors"
                        :searchable="true"
                        :allow-empty="false"
                        preserve-search
                        :clear-on-select="false"
                        :loading="isLoadingContractors"
                        :internal-search="false"
                        :options="contractors.map(e => e.id)"
                        :label="$t('column.business_entity')"
                        placeholder=""
                        :custom-label="customLabelContractor"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                        with-create-addition
                    >
                        <template v-slot:append-slot>
                            <b-button
                                @click="contractorCreateModal = true"
                                variant="outline-primary"
                                style="padding: 2.5px 10px; font-size: 1.2rem;"
                            >
                                <i class="mdi mdi-plus-circle"></i>
                            </b-button>
                        </template>
                    </BaseMultiselectWithValidation>
                    <BaseModalForCreate
                        v-model="contractorCreateModal"
                        without-list-search
                        use-component-save-fn
                        mainApiUrl="contractor"
                        createFormName="CreateFormContractor"
                        @new-ref-created-without-list-search="newRefCreated"
                    />
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        v-model="editingItem.directoryProductOrServiceTypeId"
                        @select="productTypeSelected"
                        :options="productTypes.map(e => e.id)"
                        :label="$t('column.product_or_service_type')"
                        placeholder=""
                        :custom-label="customLabelProductType"
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
                    <!-- $can('republic', 'for reestr') -->
                    <b-row>
                        <b-col :cols="$can('republic', 'for reestr') ? 8 : 12">
                            <BaseMultiselectWithValidation
                                v-if="editingItem.isRepublic && !editingItem.contractorId"
                                rules="required"
                                class="required"
                                disabled
                                :custom-styles="$can('republic', 'for reestr') ? `grid-template-columns: 38% 62%;` : ''"
                                :options="regions.map(e => e.regionId)"
                                :value="null"
                                :label="$t('column.region')"
                                :placeholder="$t('messages.please_select_business_entity')"
                                :custom-label="customLabelRegion"
                                open-direction="bottom"
                                :max-height="600"
                                :show-labels="false"
                            />
                            <BaseMultiselectWithValidation
                                v-else-if="editingItem.isRepublic && !contractorHasParent"
                                rules="required"
                                class="required"
                                multiple
                                :hide-selected="true"
                                :close-on-select="false"
                                :custom-styles="$can('republic', 'for reestr') ? `grid-template-columns: 38% 62%;` : ''"
                                v-model="editingItem.regionIds"
                                :options="regions.map(e => e.regionId)"
                                @select="regionSelected"
                                :label="$t('column.region')"
                                placeholder=""
                                :custom-label="customLabelRegion"
                                open-direction="bottom"
                                :max-height="600"
                                :show-labels="false"
                            />
                            <BaseMultiselectWithValidation
                                v-else
                                rules="required"
                                class="required"
                                :custom-styles="$can('republic', 'for reestr') ? `grid-template-columns: 38% 62%;` : ''"
                                v-model="editingItem.regionId"
                                :options="regions.map(e => e.regionId)"
                                @select="regionSelected"
                                :label="$t('column.region')"
                                placeholder=""
                                :custom-label="customLabelRegion"
                                open-direction="bottom"
                                :max-height="600"
                                :show-labels="false"
                            />
                        </b-col>
                        <b-col
                            cols="4"
                            v-if="$can('republic', 'for reestr')"
                        >
                            <div class="form-check form-check-right">
                                <input
                                    v-model="editingItem.isRepublic"
                                    class="form-check-input"
                                    type="checkbox"
                                    id="formCheckIsLegal"
                                />
                                <label
                                    class="form-check-label font-weight-normal"
                                    for="formCheckIsLegal"
                                >
                                    {{ $t('column.is_republic') }}
                                </label>
                            </div>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        v-model="editingItem.directoryProductOrServiceId"
                        :options="products.map(el => el.id)"
                        :label="$t('submodules.product_or_services.title')"
                        placeholder=""
                        :custom-label="customLabelProduct"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                        :has-next-page="hasNextPageProductOrServices"
                        @reachedEndOfList="productOrServicesReachedEndOfList"
                        @search-change="debounceSearchProductOrServices"
                        :searchable="true"
                        :allow-empty="false"
                        preserve-search
                        :clear-on-select="false"
                        :loading="isLoadingProductOrServices"
                        :internal-search="false"
                    />
                </b-col>
            </b-row>
            <b-row
                v-if="isDominant && editingItem.isRepublic && !contractorHasParent"
                class="mb-3"
            >
                <b-col
                    sm="12"
                    md="6"
                >
                    <b-row>
                        <b-col cols="8">
                            <BaseMultiselectWithValidation
                                v-if="editingItem.isGroup"
                                rules="required"
                                class="required"
                                custom-styles="grid-template-columns: 38% 62%;"
                                v-model="editingItem.groupOfIndividualsId"
                                :options="groupOfIndividuals.map(e => e.id)"
                                :label="$t('column.group_of_individuals')"
                                placeholder=""
                                :custom-label="customLabelGroupOfIndividuals"
                                open-direction="bottom"
                                :max-height="600"
                                :show-labels="false"
                            />
                        </b-col>
                        <b-col cols="4">
                            <div class="form-check form-check-right">
                                <input
                                    v-model="editingItem.isGroup"
                                    class="form-check-input"
                                    type="checkbox"
                                    id="formCheckIsGroup"
                                />
                                <label
                                    class="form-check-label font-weight-normal"
                                    for="formCheckIsGroup"
                                >
                                    {{ $t('column.is_group') }}
                                </label>
                            </div>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >

                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseMultiselectWithValidation
                        v-if="!editingItem.isRepublic"
                        not-required
                        v-model="editingItem.districtIds"
                        multiple
                        :close-on-select="false"
                        :hide-selected="true"
                        :options="districts.map(e => e.id)"
                        :label="$t('column.district')"
                        :custom-label="customLabelDistrict"
                        placeholder=""
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
                        v-if="isDominant"
                        not-required
                        v-model="editingItem.okedId"
                        :options="okeds.map(e => e.id)"
                        :label="$t('column.oked')"
                        placeholder=""
                        :custom-label="customLabelOked"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                        :has-next-page="hasNextPageOked"
                        @reachedEndOfList="okedReachedEndOfList"
                        @search-change="debounceSearchOked"
                        :searchable="true"
                        preserve-search
                        :clear-on-select="false"
                        :loading="isLoadingOked"
                        :internal-search="false"
                    />
                    <BaseMultiselectWithValidation
                        v-else
                        rules="required"
                        class="required"
                        :allow-empty="false"
                        v-model="editingItem.okedId"
                        :options="okeds.map(e => e.id)"
                        :label="$t('column.oked')"
                        placeholder=""
                        :custom-label="customLabelOked"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                        :has-next-page="hasNextPageOked"
                        @reachedEndOfList="okedReachedEndOfList"
                        @search-change="debounceSearchOked"
                        :searchable="true"
                        preserve-search
                        :clear-on-select="false"
                        :loading="isLoadingOked"
                        :internal-search="false"
                    />
                </b-col>
            </b-row>
            <b-row
                v-if="isDominant"
                class="mb-3"
            >
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseMultiselectWithValidation
                        not-required
                        v-model="editingItem.tnvedId"
                        :options="tnveds.map(e => e.id)"
                        :label="$t('column.tnved_code')"
                        placeholder=""
                        :custom-label="customLabelTnved"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                        :has-next-page="hasNextPageTnved"
                        @reachedEndOfList="tnvedReachedEndOfList"
                        @search-change="debounceSearchTnved"
                        :searchable="true"
                        preserve-search
                        :clear-on-select="false"
                        :loading="isLoadingTnved"
                        :internal-search="false"
                    />
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseMultiselectWithValidation
                        not-required
                        v-model="editingItem.skpId"
                        :options="skps.map(e => e.id)"
                        :label="$t('column.skp_code')"
                        placeholder=""
                        :custom-label="customLabelSkp"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                        :has-next-page="hasNextPageSkp"
                        @reachedEndOfList="skpReachedEndOfList"
                        @search-change="debounceSearchSkp"
                        :searchable="true"
                        preserve-search
                        :clear-on-select="false"
                        :loading="isLoadingSkp"
                        :internal-search="false"
                    />
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseInputWithValidation
                        rules="required|positive"
                        class="required"
                        v-model="editingItem.governmentPercentage"
                        :label="$t('column.government_percentage')"
                        :placeholder="$t('column.government_percentage')"
                    />
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        v-model="editingItem.unitId"
                        :options="units.map(el => el.id)"
                        :label="$t('column.unit')"
                        placeholder=""
                        :custom-label="customLabelUnit"
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
                    <ValidationProvider
                        v-if="isModeCreate"
                        name="supplementDoc"
                        rules="required"
                        mode="passive"
                    >
                        <template v-slot:default="">
                            <BaseFileUploaderWithValidation
                                class="required"
                                ref="supplementDocUploader"
                                v-model="editingItem.supplementDocs"
                                data-vv-name="supplementDocFile"
                                data-vv-as="SupplementDocFile"
                                :max-files="1"
                                :label-on-top="false"
                                :label="$t('column.ilova')"
                            ></BaseFileUploaderWithValidation>
                        </template>
                    </ValidationProvider>
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseTextareaWithValidation
                        not-required
                        v-model="editingItem.comment"
                        max-rows="8"
                        :label="$t('column.comment')"
                        :placeholder="$t('column.comment')"
                    />
                </b-col>
            </b-row>

            <!-- PRICE_APPROVAL_BASIS -->
            <b-row
                v-if="isNatural"
                class="mb-3"
            >
                <b-col cols="12">
                    <h5 class="m-0 text-center">
                        {{ $t('column.price_approval_basis') }}
                    </h5>
                    <hr class="my-2">
                </b-col>
                <b-col
                    v-for="(el, index) in editingItem.priceApprovalDtos"
                    :key="`price-approval-dto-${index}`"
                    cols="12"
                >
                    <b-row class="mb-3">
                        <b-col
                            sm="12"
                            md="6"
                        >
                            <b-row>
                                <b-col
                                    sm="12"
                                    md="6"
                                >
                                    <BaseDatePickerWithValidation
                                        not-required
                                        custom-styles="grid-template-columns: 40% 60%;"
                                        :label="$t('column.date')"
                                        disable-after
                                        v-model="el.priceApprovalDate"
                                        lang="ru"
                                    ></BaseDatePickerWithValidation>
                                </b-col>
                                <b-col
                                    sm="12"
                                    md="6"
                                >
                                    <BaseDatePickerWithValidation
                                        not-required
                                        custom-styles="grid-template-columns: 40% 60%;"
                                        :label="$t('column.effective_date_price')"
                                        disable-after
                                        v-model="el.priceEffectiveDate"
                                        lang="ru"
                                    ></BaseDatePickerWithValidation>
                                </b-col>
                            </b-row>

                        </b-col>
                        <b-col
                            sm="12"
                            md="6"
                        >
                            <BaseInputWithValidation
                                not-required
                                v-model="el.priceApprovalNumber"
                                :label="$t('column.number')"
                            />
                        </b-col>
                    </b-row>
                    <b-row class="mb-3">
                        <b-col
                            sm="12"
                            md="6"
                        >
                            <ValidationProvider
                                v-if="isModeCreate"
                                name="priceApprovalFiles"
                                rules=""
                                mode="passive"
                            >
                                <template v-slot:default="">
                                    <BaseFileUploaderWithValidation
                                        not-required
                                        v-model="el.priceApprovalFiles"
                                        :max-files="5"
                                        :label-on-top="false"
                                        :label="$t('column.file')"
                                    ></BaseFileUploaderWithValidation>
                                </template>
                            </ValidationProvider>
                        </b-col>

                        <b-col
                            sm="12"
                            md="6"
                        >
                            <b-row>
                                <b-col
                                    cols="12"
                                    class="mb-3"
                                >
                                    <BaseInputWithValidation
                                        rules="positiveNotZero"
                                        v-model="el.currentPriceWithDuty"
                                        :label="$t('column.current_price_with_duty')"
                                    />
                                </b-col>
                                <b-col
                                    cols="12"
                                    class="mb-3"
                                >
                                    <BaseInputWithValidation
                                        rules="positiveNotZero"
                                        v-model="el.currentPriceWithoutDuty"
                                        :label="$t('column.current_price_without_duty')"
                                    />
                                </b-col>
                                <b-col
                                    sm="12"
                                    md="10"
                                    class="mb-3"
                                >
                                    <BaseTextareaWithValidation
                                        not-required
                                        v-model="el.additionalInformation"
                                        custom-styles="grid-template-columns: 30% 70%;"
                                        :label="$t('column.additional_info')"
                                    />
                                </b-col>
                                <b-col
                                    sm="12"
                                    md="2"
                                    class="d-flex align-items-start justify-content-end"
                                >
                                    <b-btn
                                        v-if="index == editingItem.priceApprovalDtos.length - 1"
                                        variant="success"
                                        class="mr-2"
                                        size="sm"
                                        @click="addPriceApprovalDto"
                                    ><i class="mdi mdi-plus"></i></b-btn>
                                    <b-btn
                                        v-if="editingItem.priceApprovalDtos.length > 1"
                                        variant="danger"
                                        size="sm"
                                        @click="editingItem.priceApprovalDtos.splice(index, 1)"
                                    ><i class="mdi mdi-trash-can"></i></b-btn>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                    <hr class="my-2">
                </b-col>
            </b-row>
            <!-- <b-col
                    sm="12"
                    md="6"
                >
                    <b-row>
                        <b-col
                            sm="12"
                            md="6"
                        >
                            <BaseDatePickerWithValidation
                                not-required
                                custom-styles="grid-template-columns: 40% 60%;"
                                :label="$t('column.date')"
                                disable-after
                                v-model="editingItem.priceApprovalDate"
                                lang="ru"
                            ></BaseDatePickerWithValidation>
                        </b-col>
                        <b-col
                            sm="12"
                            md="6"
                        >
                            <BaseDatePickerWithValidation
                                not-required
                                custom-styles="grid-template-columns: 40% 60%;"
                                :label="$t('column.effective_date_price')"
                                disable-after
                                v-model="editingItem.priceEffectiveDate"
                                lang="ru"
                            ></BaseDatePickerWithValidation>
                        </b-col>
                    </b-row>

                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseInputWithValidation
                        not-required
                        v-model="editingItem.priceApprovalNumber"
                        :label="$t('column.number')"
                    />
                </b-col> -->
            <!-- <b-row
                v-if="isNatural"
                class="mb-3"
            >
                <b-col
                    sm="12"
                    md="6"
                >
                    <ValidationProvider
                        v-if="isModeCreate"
                        name="priceApprovalFiles"
                        rules=""
                        mode="passive"
                    >
                        <template v-slot:default="">
                            <BaseFileUploaderWithValidation
                                not-required
                                v-model="editingItem.priceApprovalFiles"
                                :max-files="5"
                                :label-on-top="false"
                                :label="$t('column.file')"
                            ></BaseFileUploaderWithValidation>
                        </template>
                    </ValidationProvider>
                </b-col>

                <b-col
                    sm="12"
                    md="6"
                >
                    <b-row>
                        <b-col
                            cols="12"
                            class="mb-3"
                        >
                            <BaseInputWithValidation
                                rules="positiveNotZero"
                                v-model="editingItem.currentPriceWithDuty"
                                :label="$t('column.current_price_with_duty')"
                            />
                        </b-col>
                        <b-col
                            cols="12"
                            class="mb-3"
                        >
                            <BaseInputWithValidation
                                rules="positiveNotZero"
                                v-model="editingItem.currentPriceWithoutDuty"
                                :label="$t('column.current_price_without_duty')"
                            />
                        </b-col>
                        <b-col
                            cols="12"
                            class="mb-3"
                        >
                            <BaseTextareaWithValidation
                                not-required
                                v-model="editingItem.additionalInformation"
                                :label="$t('column.additional_info')"
                            />
                        </b-col>
                    </b-row>
                </b-col>
                <hr class="my-2">
            </b-row> -->
            <!-- END OF PRICE_APPROVAL_BASIS FORM -->
            <!-- ANNOUNCED_MEDIA_DTO -->
            <b-row
                v-if="isNatural"
                class="mb-3"
            >
                <b-col cols="12">
                    <h5 class="m-0 text-center">
                        {{ $t('column.announced_media') }}
                    </h5>
                    <hr class="my-2">
                </b-col>

                <b-col
                    v-for="(el, index) in editingItem.announcedMediaDtos"
                    :key="`announced-media-${index}`"
                    cols="12"
                >
                    <b-row class="mb-3">
                        <b-col
                            sm="12"
                            md="6"
                        >
                            <BaseInputWithValidation
                                not-required
                                v-model="el.announcedMediaName"
                                :label="$t('column.name')"
                            />
                        </b-col>
                        <b-col
                            sm="12"
                            md="6"
                        >
                            <BaseInputWithValidation
                                not-required
                                v-model="el.announcedMediaLink"
                                :label="$t('column.link')"
                            />
                        </b-col>
                    </b-row>
                    <b-row class="mb-3">
                        <b-col
                            sm="12"
                            md="6"
                        >
                            <ValidationProvider
                                v-if="isModeCreate"
                                name="annuncedMediaFiles"
                                rules=""
                                mode="passive"
                            >
                                <template v-slot:default="">
                                    <BaseFileUploaderWithValidation
                                        not-required
                                        v-model="el.announcedMediaFiles"
                                        :max-files="10"
                                        :label-on-top="false"
                                        :label="$t('column.files')"
                                    ></BaseFileUploaderWithValidation>
                                </template>
                            </ValidationProvider>
                        </b-col>

                        <b-col
                            sm="12"
                            md="5"
                        >
                            <BaseDatePickerWithValidation
                                not-required
                                custom-styles="grid-template-columns: 30% 70%;"
                                :label="$t('column.date')"
                                disable-after
                                v-model="el.announcedMediaDate"
                                lang="ru"
                            ></BaseDatePickerWithValidation>
                        </b-col>
                        <b-col
                            sm="12"
                            md="1"
                            class="d-flex align-items-start justify-content-end"
                        >
                            <b-btn
                                v-if="index == editingItem.announcedMediaDtos.length - 1"
                                variant="success"
                                class="mr-2"
                                size="sm"
                                @click="addAnnouncedMediaDto"
                            ><i class="mdi mdi-plus"></i></b-btn>
                            <b-btn
                                v-if="editingItem.announcedMediaDtos.length > 1"
                                variant="danger"
                                size="sm"
                                @click="editingItem.announcedMediaDtos.splice(index, 1)"
                            ><i class="mdi mdi-trash-can"></i></b-btn>
                        </b-col>
                    </b-row>
                    <hr class="my-2">
                </b-col>
            </b-row>
            <!-- END OF ANNOUNCED_MEDIA_DTO FORM -->

            <!-- COMMISSION_APPLICATION_DTO -->
            <b-row class="mb-3">
                <b-col cols="12">
                    <h5 class="m-0 text-center">
                        {{ $t('column.commission_applications') }}
                    </h5>
                    <hr class="my-2">
                </b-col>

                <b-col
                    v-for="(el, index) in editingItem.commissionApplicationDtos"
                    :key="`commission-application-${index}`"
                    cols="12"
                >
                    <b-row class="mb-3">
                        <b-col
                            sm="12"
                            md="6"
                        >
                            <BaseDatePickerWithValidation
                                not-required
                                :label="$t('column.date')"
                                disable-after
                                v-model="el.commencementDate"
                                lang="ru"
                            ></BaseDatePickerWithValidation>
                        </b-col>
                        <b-col
                            sm="12"
                            md="6"
                        >
                            <BaseInputWithValidation
                                not-required
                                v-model="el.commencementNumber"
                                :label="$t('column.number')"
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
                                v-model="el.initiatorName"
                                :label="$t('column.initiator')"
                            />
                        </b-col>

                        <b-col
                            sm="12"
                            md="6"
                        >
                            <BaseInputWithValidation
                                not-required
                                v-model="el.completionWorkType"
                                :label="$t('column.finishing_type')"
                            />
                        </b-col>
                    </b-row>
                    <b-row class="mb-3">
                        <b-col
                            sm="12"
                            md="6"
                        >
                            <BaseInputWithValidation
                                rules="positiveNotZero"
                                v-model="el.instructionAmount"
                                :label="$t('column.showcase_amount')"
                            />
                        </b-col>

                        <b-col
                            sm="12"
                            md="6"
                        >
                            <BaseInputWithValidation
                                rules="positiveNotZero"
                                v-model="el.residueAmount"
                                :label="$t('column.remainder_amount')"
                            />
                        </b-col>
                    </b-row>
                    <b-row class="mb-3">
                        <b-col
                            sm="12"
                            md="5"
                        >
                            <BaseDatePickerWithValidation
                                not-required
                                :label="$t('column.finishing_date')"
                                custom-styles="grid-template-columns: 30% 70%;"
                                disable-after
                                v-model="el.completionWorkDate"
                                lang="ru"
                            ></BaseDatePickerWithValidation>
                        </b-col>
                        <b-col
                            sm="12"
                            md="1"
                            class="d-flex align-items-start justify-content-end"
                        >
                            <b-btn
                                v-if="index == editingItem.commissionApplicationDtos.length - 1"
                                variant="success"
                                class="mr-2"
                                size="sm"
                                @click="addCommissionApplicationDto"
                            ><i class="mdi mdi-plus"></i></b-btn>
                            <b-btn
                                v-if="editingItem.commissionApplicationDtos.length > 1"
                                variant="danger"
                                size="sm"
                                @click="editingItem.commissionApplicationDtos.splice(index, 1)"
                            ><i class="mdi mdi-trash-can"></i></b-btn>
                        </b-col>
                    </b-row>
                    <hr class="my-2">
                </b-col>
            </b-row>
            <!-- END OF COMMISSION_APPLICATION_DTO FORM -->
        </ValidationObserver>
    </base-create-or-update-wrapper>
</template>
<script>
const MAIN_API_URL = 'reestr/contractor-reestr-documents'
const APPEND_API_URL_NATURAL = 'estestveniy'
const APPEND_API_URL_DOMINANT = 'daminiriushiy'
const OKED_API_URL = 'reestr/info-oked'
const SKP_API_URL = 'reestr/info-skp'
const TNVED_API_URL = 'reestr/info-tnved'
const PRICE_APPROVAL_API_URL = 'reestr/contractor-reestr-documents/get/price-approval'
const ANNOUNCED_MEDIA_API_URL = 'reestr/contractor-reestr-documents/get/announced-media'
const COMMISSION_APPLICATION_API_URL = 'reestr/contractor-reestr-documents/get/commission-application'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

export default {
    name: "CreateOrUpdate",
    /*
    * COMPONENTS */
    components: {},
    /*
    * DATA */
    data () {
        return {
            editingItem: {},
            publicPath: process.env.BASE_URL,
            defaultCommissionApplicationDto: {},
            defaultAnnouncedMediaDto: {},
            defaultPriceApprovalDto: {},
            regions: [],
            districts: [],
            hasNextPageContractors: false,
            hasNextPageProductOrServices: false,
            contractors: [],
            debounce: null,
            isLoadingContractors: false,
            isLoadingProductOrServices: false,
            contractorSearchPayload: {},
            productOrServicesSearchPayload: {},
            productTypes: [],
            products: [],
            units: [],
            // OKED VARIABLES
            okeds: [],
            hasNextPageOked: false,
            isLoadingOked: false,
            okedSearchPayload: {},
            // ----------------
            // SKP VARIABLES
            skps: [],
            hasNextPageSkp: false,
            isLoadingSkp: false,
            skpSearchPayload: {},
            // ----------------
            // TNVED VARIABLES
            tnveds: [],
            hasNextPageTnved: false,
            isLoadingTnved: false,
            tnvedSearchPayload: {},
            // ----------------
            contractorCreateModal: false,
            groupOfIndividuals: []
        }
    },
    /*
    * COMPUTED */
    computed: {
        computedObserver () {
            return this.$refs.observer
        },
        isModeCreate () {
            return this.$route.name === 'CreateNaturalContractorReestr' || this.$route.name === 'CreateDominantContractorReestr'
        },
        isDominant () {
            return this.$route.name === 'CreateDominantContractorReestr' || this.$route.name === 'UpdateDominantContractorReestr'
        },
        isNatural () {
            return this.$route.name === 'CreateNaturalContractorReestr' || this.$route.name === 'UpdateNaturalContractorReestr'
        },
        contractorHasParent () {
            let contractor = this.contractors.find(el => el.id == this.editingItem.contractorId)
            if (contractor) {
                return contractor.parent
            } else {
                return false
            }
        }
    },
    /*
    * METHODS */
    methods: {
        save () {
            this.computedObserver.validate().then(async valid => {
                if (valid) {
                    if (this.isDominant && !this.editingItem.okedId && !this.editingItem.skpId) {
                        this.$toast(this.$t('messages.oked_or_skp_is_required'), { type: 'error' });
                        return
                    }
                    if (!this.isDominant || !this.editingItem.isRepublic && this.contractorHasParent) {
                        this.editingItem.isGroup = false
                    }
                    let tmpPriceApprovalFiles = (this.editingItem.priceApprovalFiles && this.editingItem.priceApprovalFiles.length) ? JSON.parse(JSON.stringify(this.editingItem.priceApprovalFiles)) : []
                    let tmpProductOrServices = JSON.parse(JSON.stringify(this.editingItem.directoryProductOrServiceId))
                    let tmpAnnouncedMedia = JSON.parse(JSON.stringify(this.editingItem.announcedMediaDtos))
                    let tmpPriceApprovalDtos = JSON.parse(JSON.stringify(this.editingItem.priceApprovalDtos))
                    let tmpCommissions = JSON.parse(JSON.stringify(this.editingItem.commissionApplicationDtos))
                    if (this.editingItem.id) {
                        let payload = await this.makeAndReturnFormDataForBase64()
                        helperService.updateReestr(MAIN_API_URL, payload, `for-acceptance-${this.isDominant ? APPEND_API_URL_DOMINANT : this.isNatural ? APPEND_API_URL_NATURAL : ''}/${this.editingItem.id}`, true).then(res => {
                            this.computedObserver.reset()
                            this.editingItem = Object.assign({}, {});
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    } else {
                        let payload = await this.makeAndReturnFormDataForBase64()
                        crudAndListsService.create(MAIN_API_URL, payload,
                            `for-acceptance-${this.isDominant ? APPEND_API_URL_DOMINANT : this.isNatural ? APPEND_API_URL_NATURAL : ''}`, true).then(res => {
                                this.computedObserver.reset()
                                this.editingItem = Object.assign({}, {});
                                this.$router.go(-1)
                                this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                            })
                            .catch(e => {
                                this.editingItem.directoryProductOrServiceId = JSON.parse(JSON.stringify(tmpProductOrServices))
                                this.editingItem.commissionApplicationDtos = JSON.parse(JSON.stringify(tmpCommissions))
                                this.editingItem.announcedMediaDtos = JSON.parse(JSON.stringify(tmpAnnouncedMedia))
                                this.editingItem.priceApprovalDtos = JSON.parse(JSON.stringify(tmpPriceApprovalDtos))
                                this.editingItem.priceApprovalFiles = JSON.parse(JSON.stringify(tmpPriceApprovalFiles))
                            })
                    }
                } else {
                    this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
                }
            });
        },
        async setFilesFromServer () {
            // ILOVA
            fetch(this.publicPath + this.editingItem.fileUrl)
                .then((res) => res.blob())
                .then((myBlob) => {
                    myBlob.name = f.name;
                    myBlob.lastModified = new Date();
                    const myFile = new File([myBlob], f.name, {
                        type: myBlob.type,
                    });

                    let url = this.publicPath + f.url;
                    this.$refs.supplementDocUploader.$refs.dropzone.manuallyAddFile(myFile, url);
                })
                .catch(e => console.log(e));

            // this.editingItem.objectPhotoList.forEach(f => {
            //     fetch(this.publicPath + f.url)
            //         .then((res) => res.blob())
            //         .then((myBlob) => {
            //             myBlob.name = f.name;
            //             myBlob.lastModified = new Date();
            //             const myFile = new File([myBlob], f.name, {
            //                 type: myBlob.type,
            //             });

            //             let url = this.publicPath + f.url;
            //             this.$refs.photosUploader.$refs.dropzone.manuallyAddFile(myFile, url);
            //         })
            //         .catch(e => console.log(e));
            // })
        },
        async regionSelected ($event, dontResetDistrict = false) {
            if (!dontResetDistrict) {
                this.editingItem.districtIds = []
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
        addCommissionApplicationDto () {
            let tmp = Object.assign({}, this.defaultCommissionApplicationDto)
            this.editingItem.commissionApplicationDtos.push(tmp)
        },
        addAnnouncedMediaDto () {
            let tmp = Object.assign({}, this.defaultAnnouncedMediaDto)
            this.editingItem.announcedMediaDtos.push(tmp)
        },
        addPriceApprovalDto () {
            let tmp = Object.assign({}, this.defaultPriceApprovalDto)
            this.editingItem.priceApprovalDtos.push(tmp)
        },
        newRefCreated (formName) {
            if (formName == 'CreateFormContractor') {
                this.fetchContractorsWithKeyword('', true)
            }
        },
        /* makeAndReturnQueryParams () {
            let queryString = `contractorId=${this.editingItem.contractorId}
                         &directoryProductOrServiceTypeId=${this.editingItem.directoryProductOrServiceTypeId}
                         &governmentPercentage=${this.editingItem.governmentPercentage}
                         &orderNumber=${this.editingItem.orderNumber}
                         &reestrAcceptedDate=${this.editingItem.reestrAcceptedDate}`
            this.editingItem.directoryProductOrServiceId.forEach(id => {
                queryString += `&directoryProductOrServiceId=${id}`
            })
            return queryString
        }, */
        getBase64 (file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },
        async makeAndReturnFormDataForBase64 () {
            // this.editingItem.supplementDocs = this.editingItem.supplementDocs.map(f => f.file.dataURL)
            let vm = this
            /* if (this.editingItem.priceApprovalFiles && this.editingItem.priceApprovalFiles.length) {
                if (this.editingItem.priceApprovalFiles[0].file.dataURL) {
                    this.editingItem.priceApprovalFiles = this.editingItem.priceApprovalFiles[0].file.dataURL
                } else {
                    let res = await this.getBase64(this.editingItem.priceApprovalFiles[0].file)
                    this.editingItem.priceApprovalFiles = res
                }
            } */
            /* let base64PriceFiles = []
            if (this.editingItem.priceApprovalFiles) {
                this.editingItem.priceApprovalFiles.forEach(async f => {
                    if (f.file.dataURL) {
                        base64PriceFiles.push(f.file.dataURL)
                    } else {
                        let res = await this.getBase64(f.file)
                        base64PriceFiles.push(res)
                    }
                })
            }
            this.editingItem.priceApprovalFiles = base64PriceFiles */
            /* this.editingItem.priceApprovalFiles = this.editingItem.priceApprovalFiles ? this.editingItem.priceApprovalFiles.map(async function (f) {
                let url = null
                if (f.file.dataURL) {
                    url = f.file.dataURL
                } else {
                    let res = await vm.getBase64(f.file)
                    url = res
                }
                return url
            }) : [] */
            this.editingItem.announcedMediaDtos = await this.editingItem.announcedMediaDtos.filter(el => {
                if (el.announcedMediaName) {
                    let base64AnnouncementFiles = []
                    if (el.announcedMediaFiles) {
                        el.announcedMediaFiles.forEach(async f => {
                            if (f.file.dataURL) {
                                base64AnnouncementFiles.push(f.file.dataURL)
                            } else {
                                let res = await this.getBase64(f.file)
                                base64AnnouncementFiles.push(res)
                            }
                        })
                    }
                    el.announcedMediaFiles = base64AnnouncementFiles
                    /* el.announcedMediaFiles = el.announcedMediaFiles ? el.announcedMediaFiles.map(async function (f) {
                        let url = null
                        if (f.file.dataURL) {
                            url = f.file.dataURL
                        } else {
                            let res = await vm.getBase64(f.file)
                            url = res
                        }
                        return url
                    }) : [] */
                    return el
                }
            })

            this.editingItem.priceApprovalDtos = await this.editingItem.priceApprovalDtos.filter(el => {
                if (el.priceApprovalNumber) {
                    let base64PriceApprovalFiles = []
                    if (el.priceApprovalFiles) {
                        el.priceApprovalFiles.forEach(async f => {
                            if (f.file.dataURL) {
                                base64PriceApprovalFiles.push(f.file.dataURL)
                            } else {
                                let res = await this.getBase64(f.file)
                                base64PriceApprovalFiles.push(res)
                            }
                        })
                    }
                    el.priceApprovalFiles = base64PriceApprovalFiles
                    return el
                }
            })

            this.editingItem.commissionApplicationDtos = this.editingItem.commissionApplicationDtos.filter(el => {
                if (el.commencementNumber && el.initiatorName) {
                    return el
                }
            })
            // this.editingItem.okedIds = []
            // this.editingItem.directoryProductOrServiceId = this.editingItem.directoryProductOrServiceId.map(el => {
            //     this.editingItem.okedIds.push(el.okedId)
            //     return el.id
            // })
            if (this.editingItem.supplementDocs && this.editingItem.supplementDocs[0].file.dataURL) {
                this.editingItem.file = this.editingItem.supplementDocs[0].file.dataURL
                // delete this.editingItem.supplementDocs
                return this.editingItem
            } else if (this.editingItem.supplementDocs) {
                let res = await this.getBase64(this.editingItem.supplementDocs[0].file)
                this.editingItem.file = res
                // delete this.editingItem.supplementDocs
                return this.editingItem
                /* this.getBase64(this.editingItem.supplementDocs[0].file).then(data => {

                }) */
            } else {
                return this.editingItem
            }

        },
        customLabelRegion (opt) {
            let selected = this.regions.find(e => e.regionId == (opt.regionId ? opt.regionId : opt));
            if (selected) {
                return `${this.getName({
                    nameRu: selected.regionNameRu,
                    nameLt: selected.regionNameLt,
                    nameUz: selected.regionNameUz,
                })}`
            }
            return ``;
        },
        customLabelDistrict (opt) {
            let selectedDistrict = this.districts.find(e => e.id == opt);
            if (selectedDistrict) {
                return `${this.getName({
                    nameRu: selectedDistrict.nameRu,
                    nameLt: selectedDistrict.nameLt,
                    nameUz: selectedDistrict.nameUz,
                })
                    }`
            }
            return ``;
        },
        customLabelProduct (opt) {
            let selected = this.products.find(e => e.id == opt);
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
        customLabelUnit (opt) {
            let selected = this.units.find(e => e.id == opt);
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
        customLabelGroupOfIndividuals (opt) {
            let selected = this.groupOfIndividuals.find(e => e.id == opt);
            if (selected) {
                return `${selected.name}`
            }
            return ``;
        },
        customLabelProductType (opt) {
            let selected = this.productTypes.find(e => e.id == opt);
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
        async productTypeSelected ($event, dontResetDistrict = false) {
            if (!dontResetDistrict) {
                this.products = []
                this.editingItem.directoryProductOrServiceId = null
                this.productOrServicesSearchPayload.page = 1
            }
            if ($event) {
                // GET PRODUCT_OR_SERVICES
                await this.fetchProductOrServices($event)
                // await helperService.getProductsByProdectTypeId($event)
                //     .then(res => {
                //         this.products = res.data
                //     })
                //     .catch(e => {
                //         this.products = []
                //         console.log(e)
                //     })
            }
        },
        contractorReachedEndOfList (e) {
            if (e && !this.isLoadingContractors) {
                this.fetchContractors()
            }
        },
        productOrServicesReachedEndOfList (e) {
            if (e) {
                this.fetchProductOrServices(this.editingItem.directoryProductOrServiceTypeId)
            }
        },
        customLabelContractor (opt) {
            let selected = this.contractors.find(e => e.id == opt);
            if (selected) {
                return `${selected.fullName}`
            }
            return ``;
        },
        async debounceSearchProductOrServices (searchText) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(async () => {
                await this.fetchProductOrServicesWithKeyword(searchText);
            }, 1000);
        },
        async debounceSearchContractors (searchText) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(async () => {
                await this.fetchContractorsWithKeyword(searchText);
            }, 1000);
        },
        fetchProductOrServicesWithKeyword (keyword) {
            this.products = []
            this.productOrServicesSearchPayload.page = 1
            this.productOrServicesSearchPayload.keyword = keyword ? keyword : ''
            this.fetchProductOrServices(this.editingItem.directoryProductOrServiceTypeId)
        },
        // OKED METHODS
        okedReachedEndOfList (e) {
            if (e) {
                this.fetchOkeds()
            }
        },
        async debounceSearchOked (searchText) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(async () => {
                await this.fetchOkedsWithKeyword(searchText);
            }, 1000);
        },
        fetchOkedsWithKeyword (keyword) {
            this.okeds = []
            this.okedSearchPayload.page = 1
            this.okedSearchPayload.keyword = keyword ? keyword : ''
            this.fetchOkeds()
        },
        async fetchOkeds () {
            this.isLoadingOked = true
            await crudAndListsService.searchListWithKeyword(OKED_API_URL, this.okedSearchPayload)
                .then(res => {
                    this.okeds.push(...res.data.list)
                    this.hasNextPageOked = res.data.total / this.okedSearchPayload.itemsPerPage > this.okedSearchPayload.page
                    this.okedSearchPayload.page += 1
                    if (!this.isModeCreate && this.editingItem.okedId) {
                        let foundItm = this.okeds.find(el => el.id == this.editingItem.okedId)
                        if (!foundItm && this.editingItem.infoOkedDto) {
                            this.okeds.push(this.editingItem.infoOkedDto)
                        }
                    }
                })
                .catch(e => {
                    console.log(e)
                    this.okeds = []
                })
                .finally(() => {
                    this.isLoadingOked = false
                })
        },
        customLabelOked (opt) {
            let selected = this.okeds.find(e => e.id == opt);
            if (selected) {
                return `${selected.code} - ${this.getName({
                    nameRu: selected.nameRu,
                    nameLt: selected.nameLt,
                    nameUz: selected.nameUz,
                })}`
            }
            return ``;
        },
        // --------------------------

        // SKP METHODS
        skpReachedEndOfList (e) {
            if (e) {
                this.fetchSkps()
            }
        },
        async debounceSearchSkp (searchText) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(async () => {
                await this.fetchSkpsWithKeyword(searchText);
            }, 1000);
        },
        fetchSkpsWithKeyword (keyword) {
            this.skps = []
            this.skpSearchPayload.page = 1
            this.skpSearchPayload.keyword = keyword ? keyword : ''
            this.fetchSkps()
        },
        async fetchSkps () {
            this.isLoadingSkp = true
            await crudAndListsService.searchListWithKeyword(SKP_API_URL, this.skpSearchPayload)
                .then(res => {
                    this.skps.push(...res.data.list)
                    this.hasNextPageSkp = res.data.total / this.skpSearchPayload.itemsPerPage > this.skpSearchPayload.page
                    this.skpSearchPayload.page += 1
                    if (!this.isModeCreate && this.editingItem.skpId) {
                        let foundItm = this.skps.find(el => el.id == this.editingItem.skpId)
                        if (!foundItm && this.editingItem.infoSKPDto) {
                            this.skps.push(this.editingItem.infoSKPDto)
                        }
                    }
                })
                .catch(e => {
                    console.log(e)
                    this.skps = []
                })
                .finally(() => {
                    this.isLoadingSkp = false
                })
        },
        customLabelSkp (opt) {
            let selected = this.skps.find(e => e.id == opt);
            if (selected) {
                return `${selected.code} - ${this.getName({
                    nameRu: selected.nameRu,
                    nameLt: selected.nameLt,
                    nameUz: selected.nameUz,
                })}`
            }
            return ``;
        },
        // --------------------------

        // TNVED METHODS
        tnvedReachedEndOfList (e) {
            if (e) {
                this.fetchTnveds()
            }
        },
        async debounceSearchTnved (searchText) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(async () => {
                await this.fetchTnvedsWithKeyword(searchText);
            }, 1000);
        },
        fetchTnvedsWithKeyword (keyword) {
            this.tnveds = []
            this.tnvedSearchPayload.page = 1
            this.tnvedSearchPayload.keyword = keyword ? keyword : ''
            this.fetchTnveds()
        },
        async fetchTnveds () {
            this.isLoadingTnved = true
            await crudAndListsService.searchListWithKeyword(TNVED_API_URL, this.tnvedSearchPayload)
                .then(res => {
                    this.tnveds.push(...res.data.list)
                    this.hasNextPageTnved = res.data.total / this.tnvedSearchPayload.itemsPerPage > this.tnvedSearchPayload.page
                    this.tnvedSearchPayload.page += 1
                    if (!this.isModeCreate && this.editingItem.tnvedId) {
                        let foundItm = this.tnveds.find(el => el.id == this.editingItem.tnvedId)
                        if (!foundItm && this.editingItem.infoTNVEDDto) {
                            this.tnveds.push(this.editingItem.infoTNVEDDto)
                        }
                    }
                })
                .catch(e => {
                    console.log(e)
                    this.tnveds = []
                })
                .finally(() => {
                    this.isLoadingTnved = false
                })
        },
        customLabelTnved (opt) {
            let selected = this.tnveds.find(e => e.id == opt);
            if (selected) {
                return `${selected.code} - ${this.getName({
                    nameRu: selected.nameRu,
                    nameLt: selected.nameLt,
                    nameUz: selected.nameUz,
                })}`
            }
            return ``;
        },
        // --------------------------
        async fetchProductOrServices (typeId) {
            this.isLoadingProductOrServices = true
            await helperService.getProductOrServicesByTypeId(typeId, this.productOrServicesSearchPayload)
                .then(res => {
                    this.products.push(...res.data.list)
                    this.hasNextPageProductOrServices = res.data.total / this.productOrServicesSearchPayload.itemsPerPage > this.productOrServicesSearchPayload.page
                    this.productOrServicesSearchPayload.page += 1
                    if (!this.isModeCreate && this.editingItem.directoryProductOrServiceId) {
                        let foundItm = this.products.find(el => el.id == this.editingItem.directoryProductOrServiceId)
                        if (!foundItm && this.editingItem.directoryProductOrServiceDto) {
                            this.products.push(this.editingItem.directoryProductOrServiceDto)
                        }
                    }
                })
                .catch(e => {
                    console.log(e)
                    this.products = []
                })
                .finally(() => {
                    this.isLoadingProductOrServices = false
                })
        },
        fetchContractorsWithKeyword (keyword, makeFirstSelected = false) {
            this.contractors = []
            this.contractorSearchPayload.page = 1
            this.contractorSearchPayload.keyword = keyword ? keyword : ''
            // this.contractorSearchPayload.sortBy = []
            // this.contractorSearchPayload.sortBy.push('created')
            // this.contractorSearchPayload.sortDesc = []
            // this.contractorSearchPayload.sortDesc.push(false)
            this.fetchContractors(makeFirstSelected)
        },
        async fetchContractors (makeFirstSelected) {
            this.contractorSearchPayload.sortBy = []
            this.contractorSearchPayload.sortBy.push('created')
            this.contractorSearchPayload.sortDesc = []
            this.contractorSearchPayload.sortDesc.push(true)
            this.isLoadingContractors = true
            await crudAndListsService.searchListWithKeyword('contractor', this.contractorSearchPayload, 'by-contractor')
                .then(res => {
                    this.contractors.push(...res.data.list)
                    this.hasNextPageContractors = res.data.total / this.contractorSearchPayload.itemsPerPage > this.contractorSearchPayload.page
                    this.contractorSearchPayload.page += 1
                    if (makeFirstSelected) {
                        this.editingItem.contractorId = this.contractors.length ? this.contractors[0].id : null
                    }
                    if (!this.isModeCreate && this.editingItem.contractorId) {
                        let contractorFound = this.contractors.find(el => el.id == this.editingItem.contractorId)
                        if (!contractorFound && this.editingItem.contractorDto) {
                            this.contractors.push(this.editingItem.contractorDto)
                        }
                    }
                })
                .catch(e => {
                    console.log(e)
                    this.contractors = []
                })
                .finally(() => {
                    this.isLoadingContractors = false
                })
        },
    },
    /*
    * CREATED */
    async created () {
        this.contractorSearchPayload = Object.assign({}, this.var_default_search_payload)
        this.productOrServicesSearchPayload = Object.assign({}, this.var_default_search_payload)
        this.okedSearchPayload = Object.assign({}, this.var_default_search_payload)
        this.skpSearchPayload = Object.assign({}, this.var_default_search_payload)
        this.tnvedSearchPayload = Object.assign({}, this.var_default_search_payload)
        this.var_default_search_payload.itemsPerPage = 500
        if (this.isModeCreate) {
            await crudAndListsService.getEmpty(MAIN_API_URL)
                .then(res => {
                    this.editingItem = res.data
                    crudAndListsService.getEmptyCustomUrl(`${ANNOUNCED_MEDIA_API_URL}/empty`)
                        .then(res => {
                            this.defaultAnnouncedMediaDto = res.data
                            if (!this.editingItem.announcedMediaDtos || !this.editingItem.announcedMediaDtos.length) {
                                this.editingItem.announcedMediaDtos = []
                                let tmp = Object.assign({}, this.defaultAnnouncedMediaDto)
                                this.editingItem.announcedMediaDtos.push(tmp)
                            }
                        })
                        .catch(e => {
                            console.log(e)
                        })

                    crudAndListsService.getEmptyCustomUrl(`${PRICE_APPROVAL_API_URL}/empty`)
                        .then(res => {
                            this.defaultPriceApprovalDto = res.data
                            if (!this.editingItem.priceApprovalDtos || !this.editingItem.priceApprovalDtos.length) {
                                this.editingItem.priceApprovalDtos = []
                                let tmp = Object.assign({}, this.defaultPriceApprovalDto)
                                this.editingItem.priceApprovalDtos.push(tmp)
                            }
                        })
                        .catch(e => {
                            console.log(e)
                        })

                    crudAndListsService.getEmptyCustomUrl(`${COMMISSION_APPLICATION_API_URL}/empty`)
                        .then(res => {
                            this.defaultCommissionApplicationDto = res.data
                            if (!this.editingItem.commissionApplicationDtos || !this.editingItem.commissionApplicationDtos.length) {
                                this.editingItem.commissionApplicationDtos = []
                                let tmp = Object.assign({}, this.defaultCommissionApplicationDto)
                                this.editingItem.commissionApplicationDtos.push(tmp)
                            }
                        })
                        .catch(e => {
                            console.log(e)
                        })
                })
                .catch(e => {
                    console.log(e)
                })

        } else {
            await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, true)
                .then(res => {
                    if (res.data.documentStatusCode != 'PENDING') {
                        this.$router.go(-1)
                    }
                    this.editingItem = res.data
                    // this.setFilesFromServer()

                    if (!this.editingItem.announcedMediaDtos || !this.editingItem.announcedMediaDtos.length) {
                        crudAndListsService.getEmptyCustomUrl(`${ANNOUNCED_MEDIA_API_URL}/empty`)
                            .then(res => {
                                this.defaultAnnouncedMediaDto = res.data
                                if (!this.editingItem.announcedMediaDtos || !this.editingItem.announcedMediaDtos.length) {
                                    this.editingItem.announcedMediaDtos = []
                                    let tmp = Object.assign({}, this.defaultAnnouncedMediaDto)
                                    this.editingItem.announcedMediaDtos.push(tmp)
                                }
                            })
                            .catch(e => {
                                console.log(e)
                            })
                    }

                    if (!this.editingItem.priceApprovalDtos || !this.editingItem.priceApprovalDtos.length) {
                        crudAndListsService.getEmptyCustomUrl(`${PRICE_APPROVAL_API_URL}/empty`)
                            .then(res => {
                                this.defaultPriceApprovalDto = res.data
                                if (!this.editingItem.priceApprovalDtos || !this.editingItem.priceApprovalDtos.length) {
                                    this.editingItem.priceApprovalDtos = []
                                    let tmp = Object.assign({}, this.defaultPriceApprovalDto)
                                    this.editingItem.priceApprovalDtos.push(tmp)
                                }
                            })
                            .catch(e => {
                                console.log(e)
                            })
                    }

                    if (!this.editingItem.commissionApplicationDtos || !this.editingItem.commissionApplicationDtos.length) {
                        crudAndListsService.getEmptyCustomUrl(`${COMMISSION_APPLICATION_API_URL}/empty`)
                            .then(res => {
                                this.defaultCommissionApplicationDto = res.data
                                if (!this.editingItem.commissionApplicationDtos || !this.editingItem.commissionApplicationDtos.length) {
                                    this.editingItem.commissionApplicationDtos = []
                                    let tmp = Object.assign({}, this.defaultCommissionApplicationDto)
                                    this.editingItem.commissionApplicationDtos.push(tmp)
                                }
                            })
                            .catch(e => {
                                console.log(e)
                            })
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        }
        // GET CONTRACTORS
        await this.fetchContractors()

        // GET OKEDS
        await this.fetchOkeds()

        if (this.isDominant) {
            // GET SKPS
            await this.fetchSkps()

            // GET TNVEDS
            await this.fetchTnveds()

            // GET GROUP_OF_INDIVIDUALS
            crudAndListsService
                .searchList('reestr/group-of-individuals', this.var_default_search_payload)
                .then((res) => {
                    this.groupOfIndividuals = res.data.list;
                })
                .catch(e => {
                    console.log(e)
                })
        }

        // GET REGIONS
        await helperService.fetchRegionsForContractorReestrByCurrentUserId()
            .then(res => {
                this.regions = res.data
                this.regionSelected(this.editingItem.regionId, true)
            })
            .catch(e => {
                console.log(e)
            })

        if (this.$route.name.includes('Create') || this.$route.name.includes('Update')) {
            // GET PRODUCT_OR_SERVICE_TYPES
            crudAndListsService
                .searchList('directory/product-or-service-types', this.var_default_search_payload, this.isDominant ? APPEND_API_URL_DOMINANT : this.isNatural ? APPEND_API_URL_NATURAL : '')
                .then((res) => {
                    this.productTypes = res.data.list;
                    this.productTypeSelected(this.editingItem.directoryProductOrServiceTypeId, true)
                })
                .catch(e => {
                    console.log(e)
                })
        }

        // GET UNITS
        crudAndListsService
            .searchListWithKeyword('directory/units', this.var_default_search_payload)
            .then((res) => {
                this.units = res.data.list;
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
