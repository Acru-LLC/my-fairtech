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
                        v-model="editingItem.regionId"
                        :options="regions.map(e => e.regionId)"
                        :label="$t('column.region')"
                        placeholder=""
                        :custom-label="customLabelRegion"
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
                    <!-- <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        multiple
                        :close-on-select="false"
                        :hide-selected="true"
                        v-model="editingItem.directoryProductOrServiceIds"
                        :options="products.map(e => e.id)"
                        :label="$t('submodules.product_or_services.title')"
                        placeholder=""
                        :custom-label="customLabelProduct"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                    /> -->
                    <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        multiple
                        :close-on-select="false"
                        :hide-selected="true"
                        v-model="editingItem.directoryProductOrServiceIds"
                        :options="products"
                        track-by="id"
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
            <b-row class="mb-3">
                <b-col
                    sm="12"
                    md="6"
                >
                    <BaseInputWithValidation
                        rules="required|positiveNotZero"
                        class="required"
                        v-model="editingItem.governmentPercentage"
                        :label="$t('column.government_percentage')"
                        :placeholder="$t('column.government_percentage')"
                    />
                    <b-row class="mt-3">
                        <b-col>
                            <ValidationProvider
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
                    </b-row>
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                >
                    <b-row>
                        <!-- <b-col
                            v-for="(p, index) in editingItem.directoryProductOrServiceIds"
                            :key="`oked-for-product-or-service-${index}`"
                            class="col-12 mb-3"
                        >
                            <BaseMultiselectWithValidation
                                rules="required"
                                class="required"
                                v-model="p.okedId"
                                :options="okeds.map(e => e.id)"
                                :label="getName({nameLt: p.nameLt, nameUz: p.nameUz, nameRu: p.nameRu})"
                                :placeholder="$t('column.oked')"
                                :custom-label="customLabelOked"
                                open-direction="bottom"
                                :max-height="600"
                                :show-labels="false"
                                :has-next-page="hasNextPageOked"
                                @reachedEndOfList="okedReachedEndOfList"
                                @search-change="debounceSearchOked"
                                :searchable="true"
                                :allow-empty="false"
                                preserve-search
                                :clear-on-select="false"
                                :loading="isLoadingOked"
                                :internal-search="false"
                            />
                        </b-col> -->
                        <b-col>
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
                </b-col>
            </b-row>
            <!-- PRICE_APPROVAL_BASIS -->
            <b-row class="mb-3">
                <b-col cols="12">
                    <h5 class="m-0 text-center">
                        {{ $t('column.price_approval_basis') }}
                    </h5>
                    <hr class="my-2">
                </b-col>

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
                </b-col>
            </b-row>
            <b-row class="mb-3">
                <b-col
                    sm="12"
                    md="6"
                >
                    <ValidationProvider
                        name="annuncedMediaFiles"
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
            </b-row>
            <!-- END OF PRICE_APPROVAL_BASIS FORM -->
            <!-- ANNOUNCED_MEDIA_DTO -->
            <b-row class="mb-3">
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
                                v-model="editingItem.instructionAmount"
                                :label="$t('column.showcase_amount')"
                            />
                        </b-col>

                        <b-col
                            sm="12"
                            md="6"
                        >
                            <BaseInputWithValidation
                                rules="positiveNotZero"
                                v-model="editingItem.residueAmount"
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
const APPEND_API_URL = 'daminiriushiy'
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
            defaultCommissionApplicationDto: {},
            defaultAnnouncedMediaDto: {},
            regions: [],
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
            okeds: [],
            units: [],
            hasNextPageOked: false,
            isLoadingOked: false,
            okedSearchPayload: {},
            contractorCreateModal: false
        }
    },
    /*
    * COMPUTED */
    computed: {
        computedObserver () {
            return this.$refs.observer
        },
        isModeCreate () {
            return this.$route.name === 'CreateDominantContractorReestr'
        },
    },
    /*
    * METHODS */
    methods: {
        save () {
            this.computedObserver.validate().then(async valid => {
                if (valid) {
                    let tmpPriceApprovalFiles = JSON.parse(JSON.stringify(this.editingItem.priceApprovalFiles))
                    let tmpProductOrServices = JSON.parse(JSON.stringify(this.editingItem.directoryProductOrServiceIds))
                    let tmpAnnouncedMedia = JSON.parse(JSON.stringify(this.editingItem.announcedMediaDtos))
                    let tmpCommissions = JSON.parse(JSON.stringify(this.editingItem.commissionApplicationDtos))
                    if (this.editingItem.id) {
                        crudAndListsService.update(MAIN_API_URL, this.makeAndReturnFormDataForBase64(), null, true).then(res => {
                            this.computedObserver.reset()
                            this.editingItem = Object.assign({}, {});
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    } else {
                        let payload = await this.makeAndReturnFormDataForBase64()
                        crudAndListsService.create(MAIN_API_URL, payload,
                            `for-acceptance-${APPEND_API_URL}`, true).then(res => {
                                this.computedObserver.reset()
                                this.editingItem = Object.assign({}, {});
                                this.$router.go(-1)
                                this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                            })
                            .catch(e => {
                                this.editingItem.directoryProductOrServiceIds = JSON.parse(JSON.stringify(tmpProductOrServices))
                                this.editingItem.commissionApplicationDtos = JSON.parse(JSON.stringify(tmpCommissions))
                                this.editingItem.announcedMediaDtos = JSON.parse(JSON.stringify(tmpAnnouncedMedia))
                                this.editingItem.priceApprovalFiles = JSON.parse(JSON.stringify(tmpPriceApprovalFiles))
                            })
                    }
                } else {
                    this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
                }
            });
        },
        addCommissionApplicationDto () {
            let tmp = Object.assign({}, this.defaultCommissionApplicationDto)
            this.editingItem.commissionApplicationDtos.push(tmp)
        },
        addAnnouncedMediaDto () {
            let tmp = Object.assign({}, this.defaultAnnouncedMediaDto)
            this.editingItem.announcedMediaDtos.push(tmp)
            // console.log(this.editingItem.announcedMediaDtos)
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
            this.editingItem.directoryProductOrServiceIds.forEach(id => {
                queryString += `&directoryProductOrServiceIds=${id}`
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
        makeAndReturnFormData () {
            let form = new FormData();
            this.editingItem.supplementDocs.forEach(f => {
                form.append("file", f.file);
            })
            this.editingItem.priceApprovalFiles.forEach(f => {
                form.append("priceApprovalFiles", f.file);
            })
            form.append("contractorId", this.editingItem.contractorId)
            form.append("regionId", this.editingItem.regionId)
            form.append("directoryProductOrServiceTypeId", this.editingItem.directoryProductOrServiceTypeId)
            form.append("governmentPercentage", this.editingItem.governmentPercentage)
            form.append("orderNumber", this.editingItem.orderNumber)
            // form.append("reestrAcceptedDate", this.editingItem.reestrAcceptedDate)
            this.editingItem.directoryProductOrServiceIds.forEach(p => {
                form.append("directoryProductOrServiceIds", p.id)
                // form.append("okedIds", p.okedId)
            })
            this.editingItem.announcedMediaDtos.forEach(el => {
                form.append("announcedMediaName", el.announcedMediaName)
                form.append("announcedMediaLink", el.announcedMediaLink)
                // form.append("announcedMediaDate", el.announcedMediaDate)
                el.announcedMediaFiles.forEach(f => {
                    form.append("announcedMediaFiles", f.file);
                })
                /* el.announcedMediaFiles = el.announcedMediaFiles.map(f => f.file)
                console.log(el) */
                // form.append("announcedMediaDtos", JSON.stringify(el))
            })
            return form
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
            let base64PriceFiles = []
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
            this.editingItem.priceApprovalFiles = base64PriceFiles
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
            this.editingItem.directoryProductOrServiceIds = this.editingItem.directoryProductOrServiceIds.map(el => {
                return el.id
            })
            this.editingItem.commissionApplicationDtos = this.editingItem.commissionApplicationDtos.filter(el => {
                if (el.commencementNumber && el.initiatorName) {
                    return el
                }
            })
            /* this.editingItem.okedIds = []
            this.editingItem.directoryProductOrServiceIds = this.editingItem.directoryProductOrServiceIds.map(el => {
                this.editingItem.okedIds.push(el.okedId)
                return el.id
            }) */
            if (this.editingItem.supplementDocs[0].file.dataURL) {
                this.editingItem.file = this.editingItem.supplementDocs[0].file.dataURL
                // delete this.editingItem.supplementDocs
                return this.editingItem
            } else {
                let res = await this.getBase64(this.editingItem.supplementDocs[0].file)
                this.editingItem.file = res
                // delete this.editingItem.supplementDocs
                return this.editingItem
                /* this.getBase64(this.editingItem.supplementDocs[0].file).then(data => {
                    
                }) */
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
        customLabelProduct (opt) {
            let selected = this.products.find(e => e.id === (opt.id ? opt.id : opt));
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
        customLabelOked (opt) {
            let selected = this.okeds.find(e => e.id == opt);
            if (selected) {
                return `${selected.code} - ${selected.shortName}`
            }
            return ``;
        },
        async productTypeSelected ($event, dontResetDistrict = false) {
            if (!dontResetDistrict) {
                this.products = []
                this.editingItem.directoryProductOrServiceIds = []
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
        okedReachedEndOfList (e) {
            if (e) {
                this.fetchOkeds()
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
        async debounceSearchOked (searchText) {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(async () => {
                await this.fetchOkedsWithKeyword(searchText);
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
        fetchOkedsWithKeyword (keyword) {
            this.okeds = []
            this.okedSearchPayload.page = 1
            this.okedSearchPayload.keyword = keyword ? keyword : ''
            this.fetchOkeds()
        },
        async fetchOkeds () {
            this.isLoadingOked = true
            await crudAndListsService.searchListWithKeyword(MAIN_API_URL, this.okedSearchPayload, 'for-oked')
                .then(res => {
                    this.okeds.push(...res.data.list)
                    this.hasNextPageOked = res.data.total / this.okedSearchPayload.itemsPerPage > this.okedSearchPayload.page
                    this.okedSearchPayload.page += 1
                })
                .catch(e => {
                    console.log(e)
                    this.okeds = []
                })
                .finally(() => {
                    this.isLoadingOked = false
                })
        },
        async fetchProductOrServices (typeId) {
            this.isLoadingProductOrServices = true
            await helperService.getProductOrServicesByTypeId(typeId, this.productOrServicesSearchPayload)
                .then(res => {
                    this.products.push(...res.data.list)
                    this.hasNextPageProductOrServices = res.data.total / this.productOrServicesSearchPayload.itemsPerPage > this.productOrServicesSearchPayload.page
                    this.productOrServicesSearchPayload.page += 1
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
            await crudAndListsService.getById(MAIN_API_URL, this.$route.params.id, false)
                .then(res => {
                    this.editingItem = res.data
                })
                .catch(e => {
                    console.log(e)
                })
        }
        // GET CONTRACTORS
        await this.fetchContractors()

        // GET OKEDS
        // await this.fetchOkeds()

        // GET REGIONS
        await helperService.fetchRegionsForContractorReestrByCurrentUserId()
            .then(res => {
                this.regions = res.data
            })
            .catch(e => {
                console.log(e)
            })

        // GET PRODUCT_OR_SERVICE_TYPES
        crudAndListsService
            .searchList('directory/product-or-service-types', this.var_default_search_payload, APPEND_API_URL)
            .then((res) => {
                this.productTypes = res.data.list;
                this.productTypeSelected(this.editingItem.directoryProductOrServiceTypeId, true)
            })
            .catch(e => {
                console.log(e)
            })

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