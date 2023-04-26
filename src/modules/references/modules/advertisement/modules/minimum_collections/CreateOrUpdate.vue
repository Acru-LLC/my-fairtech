<template>
    <base-create-or-update-wrapper
        @save="save"
        has-save-suspend
        :custom-title="isModeCreate ? $t('actions.create') : $t('actions.update')"
    >
        <ValidationObserver
            ref="observer"
            v-slot="{}"
        >
            <b-row class="mb-3 justify-content-end">
                <b-col
                    sm="12"
                    md="6"
                    :lg="isModeCreate ? '4' : '6'"
                >
                    <BaseInputWithValidation
                        rules="required"
                        class="required"
                        v-model="editingItem.decisionNumber"
                        :label="$t('column.decision_number')"
                        :placeholder="$t('column.decision_number')"
                    />
                </b-col>
                <b-col
                    sm="12"
                    md="6"
                    :lg="isModeCreate ? '4' : '6'"
                >
                    <BaseDatePickerWithValidation
                        rules="required"
                        class="required"
                        :label="$t('column.decision_date')"
                        :placeholder="$t('column.decision_date')"
                        v-model="editingItem.decisionDate"
                        lang="ru"
                    ></BaseDatePickerWithValidation>
                </b-col>

                <!-- MINIMUM_COLLECTION_TYPE SHOW ONLY ON UPDATE -->
                <b-col
                    v-if="!isModeCreate && editingItem.isExtended"
                    class="mt-3"
                    sm="12"
                    md="6"
                >
                    <!-- <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        v-model="editingItem.directoryMinimumCollectionTypeId"
                        :options="minimumCollectionTypes.map(el => el.id)"
                        :label="$t('submodules.minimum_collection_types.title')"
                        :custom-label="customLabelMinimumCollectionType"
                        :placeholder="$t('submodules.minimum_collection_types.title')"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                    /> -->
                    <BaseMultiselectWithValidation
                        rules="required"
                        class="required"
                        v-model="editingItem.districtId"
                        :options="districts.map(e => e.id)"
                        :label="$t('column.district')"
                        :custom-label="customLabelDistrict"
                        :placeholder="$t('column.district')"
                        open-direction="bottom"
                        :max-height="600"
                        :show-labels="false"
                    />
                </b-col>

                <b-col
                    sm="12"
                    md="6"
                    :lg="isModeCreate ? '4' : '6'"
                    :class="isModeCreate ? 'mt-md-2 mt-lg-0' : 'mt-3'"
                >
                    <BaseTextareaWithValidation
                        rules="required"
                        class="required"
                        v-model="editingItem.description"
                        max-rows="6"
                        :label="$t('column.reason')"
                        :placeholder="$t('column.reason')"
                    />
                </b-col>
            </b-row>
            <!-- IF UPDATE MODE -->
            <template v-if="!isModeCreate">
                <b-row class="mb-3">
                    <b-col
                        sm="12"
                        md="6"
                    >
                        <BaseMultiselectWithValidation
                            rules="required"
                            class="required"
                            v-model="editingItem.regionId"
                            @select="regionSelected($event, editingItem.directoryAdvertisementLocationTypeId)"
                            :options="regions.map(el => el.id)"
                            :label="$t('column.region')"
                            :custom-label="customLabelRegion"
                            :placeholder="$t('column.region')"
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
                            v-model="editingItem.unitId"
                            :options="units.map(el => el.id)"
                            :label="$t('column.unit')"
                            :custom-label="customLabelUnit"
                            :placeholder="$t('column.unit')"
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
                            v-model="editingItem.directoryAdvertisementLocationTypeId"
                            @select="adLocationTypeSelected"
                            :options="adLocationTypes.map(el => el.id)"
                            :label="$t('column.ad_location_type')"
                            :custom-label="customLabelAdLocationType"
                            :placeholder="$t('column.ad_location_type')"
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
                            v-model="editingItem.directoryAdvertisementDesignTypeId"
                            :options="adDesignTypes.map(el => el.id)"
                            :label="$t('column.ad_design_type')"
                            :custom-label="customLabelAdDesignType"
                            :placeholder="$t('column.ad_design_type')"
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
                        <BaseInputWithValidation
                            rules="required|positiveNotZero"
                            class="required"
                            v-model="editingItem.cost"
                            :label="$t('column.minimum_collection')"
                            :placeholder="$t('column.minimum_collection')"
                        />
                    </b-col>
                    <b-col
                        sm="12"
                        md="6"
                    >
                        <BaseMultiselectWithValidation
                            not-required
                            v-model="editingItem.directoryAdvertisementVolumeTypeId"
                            :options="adVolumeTypes.map(el => el.id)"
                            :label="$t('submodules.ad_volume_types.title')"
                            :custom-label="customLabelAdVolumeType"
                            :placeholder="$t('submodules.ad_volume_types.title')"
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
                        <BaseSelectWithValidation
                            v-model="editingItem.statusId"
                            class="required"
                            rules="required"
                            :label="$t('column.status')"
                            value-field="id"
                        >
                            <template #first>
                                <b-form-select-option
                                    :value="null"
                                    disabled
                                >{{ $t('column.status') }}</b-form-select-option>
                                <b-form-select-option
                                    v-for="(status, index) in statuses"
                                    :key="`${status}-${index}`"
                                    :value="status.id"
                                >{{
                                  getName({
                                    nameRu: status.nameRu,
                                    nameLt: status.nameLt,
                                    nameUz: status.nameUz,
                                  })
                                }}
                                </b-form-select-option>
                            </template>
                        </BaseSelectWithValidation>
                    </b-col>
                    <b-col
                        sm="12"
                        md="6"
                    >
                    </b-col>
                </b-row>
            </template>

            <!-- IF CREATE MODE -->
            <template v-else>
                <hr>
                <div class="inner-title d-flex justify-content-between align-items-center mb-3">
                    <span></span>
                    <div>
                        <h5 class="m-0">{{ $t('column.minimum_collections') }} <span class="text-danger">*</span></h5>
                    </div>
                    <b-btn
                        variant="info"
                        class="text-capitalize"
                        @click="createOrUpdateItem('create')"
                    >
                        {{ $t("actions.create") }}
                    </b-btn>
                </div>
                <!-- Table data -->
                <b-table
                    :items="minimumCollections"
                    :fields="tableFields"
                    id="my-table"
                    class="custom-b-table"
                    responsive
                    striped
                    bordered
                    small
                    hover
                    show-empty
                >
                    <!-- NUMBER OF ITEM -->
                    <template #cell(index)="data">
                        {{ util_paginate(data.index, var_default_search_payload.page, var_default_search_payload.itemsPerPage) }}
                    </template>

                    <!-- NAME -->
                    <template #cell(name)="data">
                        <div class="d-flex justify-content-between">
                            <p
                                class="mb-0 d-flex align-items-center"
                                style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                            ><span class="badge bg-primary">ЎЗ</span> : <span> {{ data.item.nameUz }}</span></p>
                            <p
                                class="mb-0 d-flex align-items-center"
                                style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                            ><span class="badge bg-primary">O'Z</span> &nbsp;:&nbsp; <span> {{ data.item.nameLt }}</span></p>
                            <p
                                class="mb-0 d-flex align-items-center"
                                style="flex-basis: 0; flex-grow: 1; gap: .3rem;"
                            ><span class="badge bg-primary">РУ</span> &nbsp;:&nbsp; <span> {{ data.item.nameRu }}</span></p>
                        </div>
                    </template>

                    <!-- ADVERTISEMENT LOCATION TYPE NAME -->
                    <template #cell(advertisementLocationTypeName)="data">
                        <p>
                            {{
                        getName({
                          nameRu: data.item.directoryAdvertisementLocationTypeNameRu,
                          nameLt: data.item.directoryAdvertisementLocationTypeNameLt,
                          nameUz: data.item.directoryAdvertisementLocationTypeNameUz,
                        })
                      }}
                        </p>
                    </template>

                    <!-- ADVERTISEMENT DESIGN TYPE NAME -->
                    <template #cell(advertisementDesignTypeName)="data">
                        <p>
                            {{
                        getName({
                          nameRu: data.item.directoryAdvertisementDesignTypeNameRu,
                          nameLt: data.item.directoryAdvertisementDesignTypeNameLt,
                          nameUz: data.item.directoryAdvertisementDesignTypeNameUz,
                        })
                      }}
                        </p>
                    </template>

                    <!-- ADVERTISEMENT VOLUME TYPE NAME -->
                    <template #cell(advertisementVolumeTypeName)="data">
                        <p>
                            {{
                        getName({
                          nameRu: data.item.directoryAdvertisementVolumeTypeNameRu,
                          nameLt: data.item.directoryAdvertisementVolumeTypeNameLt,
                          nameUz: data.item.directoryAdvertisementVolumeTypeNameUz,
                        })
                      }}
                        </p>
                    </template>

                    <!-- UNIT SHORT NAME -->
                    <template #cell(unitShortName)="data">
                        <p>
                            {{
                        getName({
                          nameRu: data.item.unitShortNameRu,
                          nameLt: data.item.unitShortNameLt,
                          nameUz: data.item.unitShortNameUz,
                        })
                      }}
                        </p>
                    </template>

                    <!-- REGION -->
                    <template #cell(regionName)="data">
                        <p>
                            {{
                        getName({
                          nameRu: data.item.regionNameRu,
                          nameLt: data.item.regionNameLt,
                          nameUz: data.item.regionNameUz,
                        })
                      }}
                        </p>
                    </template>

                    <!-- DISTRICT -->
                    <template #cell(districtName)="data">
                        <p>
                            {{
                        getName({
                          nameRu: data.item.districtNameRu,
                          nameLt: data.item.districtNameLt,
                          nameUz: data.item.districtNameUz,
                        })
                      }}
                        </p>
                    </template>

                    <!-- STATUS -->
                    <template #cell(status)="data">
                        <p>
                            {{
                        getName({
                          nameRu: data.item.statusNameRu,
                          nameLt: data.item.statusNameLt,
                          nameUz: data.item.statusNameUz,
                        })
                      }}
                        </p>
                    </template>

                    <!-- ACTIONS -->
                    <template #cell(actions)="data">
                        <div class="general-table__actions d-flex justify-content-center">
                            <b-btn
                                variant="link"
                                class="text-decoration-none p-0"
                                style="font-size: 1.2rem; margin-right: 1rem;"
                                @click="editItem(data.item, data.index)"
                            >
                                <i class="mdi mdi-circle-edit-outline edit"></i>
                            </b-btn>
                            <b-btn
                                variant="link"
                                class="text-decoration-none p-0 text-danger"
                                style="font-size: 1.2rem;"
                                @click="deleteItem(data.item, data.index)"
                            >
                                <i class="mdi mdi-trash-can delete"></i>
                            </b-btn>
                        </div>
                    </template>

                    <!-- EMPTY SLOT -->
                    <template #empty="">
                        <h4 class="text-center">{{ $t('messages.data_not_found') }}</h4>
                    </template>
                </b-table>

                <!-- MULTIPLE - MINIMUM_COLLECTIONS CREATE MODAL -->
                <b-modal
                    v-model="createMultipleMinimumCollectionsModal"
                    id="create-multiple-min-collections-modal-id"
                    size="xl"
                    :title="$t('column.minimum_collections')"
                    title-class="font-18"
                    :ok-title="$t('actions.save')"
                    ok-variant="success"
                    @ok="saveMultipleMinimumCollections"
                    :cancel-title="$t('actions.cancel')"
                    cancel-variant="danger"
                    no-close-on-backdrop
                    no-close-on-esc
                >
                    <ValidationObserver
                        ref="multiple-minimum-collections-observer"
                        v-slot="{}"
                    >
                        <b-row class="mb-3">
                            <b-col
                                sm="12"
                                md="6"
                            >
                                <BaseMultiselectWithValidation
                                    rules="required"
                                    class="required"
                                    v-model="editingItemForMultiple.region"
                                    @select="regionSelected($event, editingItemForMultiple.directoryAdvertisementLocationType ? editingItemForMultiple.directoryAdvertisementLocationType.id : null)"
                                    :options="regions"
                                    :label="$t('column.region')"
                                    :custom-label="customLabelRegion"
                                    :placeholder="$t('column.region')"
                                    open-direction="bottom"
                                    :max-height="600"
                                    :show-labels="false"
                                />
                            </b-col>
                            <b-col
                                sm="12"
                                md="6"
                            >
                                <div class="form-check form-check-right">
                                    <input
                                        v-model="editingItemForMultiple.isExtended"
                                        class="form-check-input"
                                        type="checkbox"
                                        id="formCheckIsLegal"
                                    />
                                    <label
                                        class="form-check-label font-weight-normal"
                                        for="formCheckIsLegal"
                                    >
                                        {{ $t('actions.select_district') }}
                                    </label>
                                </div>

                            </b-col>
                        </b-row>
                        <!-- DISTRICTS ROW -->
                        <b-row
                            v-if="editingItemForMultiple.isExtended"
                            class="mb-3"
                        >
                            <b-col
                                sm="12"
                                md="6"
                            >
                                <BaseMultiselectWithValidation
                                    rules="required"
                                    class="required"
                                    multiple
                                    :close-on-select="false"
                                    :hide-selected="true"
                                    track-by="id"
                                    v-model="editingItemForMultiple.districts"
                                    :options="districts"
                                    :label="$t('column.district')"
                                    :custom-label="customLabelDistrict"
                                    :placeholder="$t('column.district')"
                                    open-direction="bottom"
                                    :max-height="600"
                                    :show-labels="false"
                                />
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
                                    rules="required"
                                    class="required"
                                    v-model="editingItemForMultiple.directoryAdvertisementLocationType"
                                    @select="adLocationTypeSelected"
                                    :options="adLocationTypes"
                                    :label="$t('column.ad_location_type')"
                                    :custom-label="customLabelAdLocationType"
                                    :placeholder="$t('column.ad_location_type')"
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
                                    v-model="editingItemForMultiple.unit"
                                    :options="units"
                                    :label="$t('column.unit')"
                                    :custom-label="customLabelUnit"
                                    :placeholder="$t('column.unit')"
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
                                    multiple
                                    :close-on-select="false"
                                    :hide-selected="true"
                                    v-model="editingItemForMultiple.directoryAdvertisementDesignTypes"
                                    track-by="id"
                                    :options="adDesignTypes"
                                    :label="$t('column.ad_design_type')"
                                    :custom-label="customLabelAdDesignType"
                                    :placeholder="$t('column.ad_design_type')"
                                    open-direction="bottom"
                                    :max-height="600"
                                    :show-labels="false"
                                />
                            </b-col>
                            <b-col
                                sm="12"
                                md="6"
                            >
                                <BaseSelectWithValidation
                                    v-model="editingItemForMultiple.statusId"
                                    class="required"
                                    rules="required"
                                    :label="$t('column.status')"
                                    value-field="id"
                                >
                                    <template #first>
                                        <b-form-select-option
                                            :value="null"
                                            disabled
                                        >{{ $t('column.status') }}</b-form-select-option>
                                        <b-form-select-option
                                            v-for="(status, index) in statuses"
                                            :key="`${status}-${index}`"
                                            :value="status.id"
                                        >{{
                                          getName({
                                            nameRu: status.nameRu,
                                            nameLt: status.nameLt,
                                            nameUz: status.nameUz,
                                          })
                                        }}
                                        </b-form-select-option>
                                    </template>
                                </BaseSelectWithValidation>
                            </b-col>
                        </b-row>
                        <b-row class="mb-3">
                            <b-col cols="12">
                                <BaseMultiselectWithValidation
                                    not-required
                                    multiple
                                    :close-on-select="false"
                                    :hide-selected="true"
                                    v-model="editingItemForMultiple.directoryAdvertisementVolumeTypes"
                                    track-by="id"
                                    @input="adVolumeTypesSelected"
                                    :options="adVolumeTypes"
                                    :label="$t('submodules.ad_volume_types.title')"
                                    :custom-label="customLabelAdVolumeType"
                                    :placeholder="$t('submodules.ad_volume_types.title')"
                                    open-direction="bottom"
                                    :max-height="600"
                                    :show-labels="false"
                                />
                            </b-col>
                        </b-row>
                        <!-- MINIMAL COLLECTION COSTS  -->
                        <!-- EXTENDED WITH AD_VOLUME_TYPES -->
                        <b-row v-if="showVolumeTypesRow">
                            <hr v-if="showVolumeTypesRow">
                            <b-col
                                v-for="(adVolumeType, index) in editingItemForMultiple.directoryAdvertisementVolumeTypes"
                                :key="`ad-volume-type-${index}`"
                                sm="12"
                                md="6"
                                class="mb-3"
                            >
                                <BaseInputWithValidation
                                    rules="required|positiveNotZero"
                                    class="required"
                                    v-model="adVolumeType.cost"
                                    :label="`(M) ${adVolumeType.nameUz}`"
                                />
                            </b-col>
                        </b-row>
                        <!-- NOT_EXTENDED -->
                        <b-row v-else>
                            <hr v-if="editingItemForMultiple.directoryAdvertisementDesignTypes ? editingItemForMultiple.directoryAdvertisementDesignTypes.length : false">
                            <b-col
                                v-for="(adDesignType, index) in editingItemForMultiple.directoryAdvertisementDesignTypes"
                                :key="`ad-design-type-${index}`"
                                sm="12"
                                md="6"
                                class="mb-3"
                            >
                                <BaseInputWithValidation
                                    rules="required|positiveNotZero"
                                    class="required"
                                    v-model="adDesignType.cost"
                                    :label="`(M) ${adDesignType.nameUz}`"
                                    :placeholder="adDesignType.nameUz"
                                />
                            </b-col>
                        </b-row>
                    </ValidationObserver>
                </b-modal>

                <!-- SINGLE - MINIMUM_COLLECTION UPDATE (ON CREATE MODE) MODAL -->
                <b-modal
                    v-model="singleMinimumCollectionUpdateModal"
                    id="update-single-modal-id"
                    size="xl"
                    title="Minimal o'zgartirish"
                    title-class="font-18"
                    :ok-title="$t('actions.save')"
                    ok-variant="success"
                    @ok="updateSingleMinimumCollection"
                    :cancel-title="$t('actions.cancel')"
                    cancel-variant="danger"
                    no-close-on-backdrop
                    no-close-on-esc
                >
                    <ValidationObserver
                        ref="single-minimum-collection-update-observer"
                        v-slot="{}"
                    >
                        <b-row class="mb-3">
                            <b-col
                                sm="12"
                                md="6"
                            >
                                <BaseMultiselectWithValidation
                                    rules="required"
                                    class="required"
                                    v-model="currentEditingItem.regionId"
                                    @select="regionSelected($event, currentEditingItem.directoryAdvertisementLocationTypeId)"
                                    :options="regions.map(el => el.id)"
                                    :label="$t('column.region')"
                                    :custom-label="customLabelRegion"
                                    :placeholder="$t('column.region')"
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
                                    v-model="currentEditingItem.unitId"
                                    :options="units.map(el => el.id)"
                                    :label="$t('column.unit')"
                                    :custom-label="customLabelUnit"
                                    :placeholder="$t('column.unit')"
                                    open-direction="bottom"
                                    :max-height="600"
                                    :show-labels="false"
                                />
                            </b-col>
                        </b-row>

                        <!-- MINIMUM_COLLECTION_TYPES ROW -->
                        <b-row
                            v-if="currentEditingItem.isExtended"
                            class="mb-3"
                        >
                            <b-col
                                sm="12"
                                md="6"
                            >
                                <!-- <BaseMultiselectWithValidation
                                    rules="required"
                                    class="required"
                                    v-model="currentEditingItem.directoryMinimumCollectionTypeId"
                                    :options="minimumCollectionTypes.map(el => el.id)"
                                    :label="$t('submodules.minimum_collection_types.title')"
                                    :custom-label="customLabelMinimumCollectionType"
                                    :placeholder="$t('submodules.minimum_collection_types.title')"
                                    open-direction="bottom"
                                    :max-height="600"
                                    :show-labels="false"
                                /> -->
                                <BaseMultiselectWithValidation
                                    rules="required"
                                    class="required"
                                    v-model="currentEditingItem.districtId"
                                    :options="districts.map(e => e.id)"
                                    :label="$t('column.district')"
                                    :custom-label="customLabelDistrict"
                                    :placeholder="$t('column.district')"
                                    open-direction="bottom"
                                    :max-height="600"
                                    :show-labels="false"
                                />
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
                                    rules="required"
                                    class="required"
                                    v-model="currentEditingItem.directoryAdvertisementLocationTypeId"
                                    @select="adLocationTypeSelected"
                                    :options="adLocationTypes.map(el => el.id)"
                                    :label="$t('column.ad_location_type')"
                                    :custom-label="customLabelAdLocationType"
                                    :placeholder="$t('column.ad_location_type')"
                                    open-direction="bottom"
                                    :max-height="600"
                                    :show-labels="false"
                                />
                            </b-col>
                            <b-col
                                sm="12"
                                md="6"
                            >
                                <BaseSelectWithValidation
                                    v-model="currentEditingItem.statusId"
                                    class="required"
                                    rules="required"
                                    :label="$t('column.status')"
                                    value-field="id"
                                >
                                    <template #first>
                                        <b-form-select-option
                                            :value="null"
                                            disabled
                                        >{{ $t('column.status') }}</b-form-select-option>
                                        <b-form-select-option
                                            v-for="(status, index) in statuses"
                                            :key="`${status}-${index}`"
                                            :value="status.id"
                                        >{{
                                          getName({
                                            nameRu: status.nameRu,
                                            nameLt: status.nameLt,
                                            nameUz: status.nameUz,
                                          })
                                        }}
                                        </b-form-select-option>
                                    </template>
                                </BaseSelectWithValidation>
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
                                    v-model="currentEditingItem.directoryAdvertisementDesignTypeId"
                                    :options="adDesignTypes.map(el => el.id)"
                                    :label="$t('column.ad_design_type')"
                                    :custom-label="customLabelAdDesignType"
                                    :placeholder="$t('column.ad_design_type')"
                                    open-direction="bottom"
                                    :max-height="600"
                                    :show-labels="false"
                                />
                            </b-col>
                            <b-col
                                sm="12"
                                md="6"
                            >
                                <BaseInputWithValidation
                                    rules="required|positiveNotZero"
                                    class="required"
                                    v-model="currentEditingItem.cost"
                                    :label="$t('column.minimum_collection')"
                                    :placeholder="$t('column.minimum_collection')"
                                />
                            </b-col>
                        </b-row>
                        <b-row class="mb-3">
                            <b-col
                                sm="12"
                                md="6"
                            >
                                <BaseMultiselectWithValidation
                                    not-required
                                    v-model="currentEditingItem.directoryAdvertisementVolumeTypeId"
                                    :options="adVolumeTypes.map(el => el.id)"
                                    :label="$t('submodules.ad_volume_types.title')"
                                    :custom-label="customLabelAdVolumeType"
                                    :placeholder="$t('submodules.ad_volume_types.title')"
                                    open-direction="bottom"
                                    :max-height="600"
                                    :show-labels="false"
                                />
                            </b-col>
                            <b-col
                                sm="12"
                                md="6"
                            >
                            </b-col>
                        </b-row>
                    </ValidationObserver>
                </b-modal>
            </template>

        </ValidationObserver>
    </base-create-or-update-wrapper>
</template>
<script>
const MAIN_API_URL = 'directory/minimum-collections'
const MAIN_API_URL_EXTENDED = 'directory/extended-minimum-collections'
/*
* YOU MUST SEND {{ MAIN_API_URL }} TO CRUD_SERVICE */
import crudAndListsService from "@/shared/services/crud_and_list.service"
import helperService from "@/shared/services/helper.service"

export default {
    name: "CreateOrUpdate",
    /*
    * COMPONENTS */
    components: {

    },
    /*
    * DATA */
    data () {
        return {
            editingItem: {},
            showVolumeTypesRow: false,
            editingItemForMultiple: {},
            currentEditingItem: {},
            minimumCollections: [],
            createMultipleMinimumCollectionsModal: false,
            singleMinimumCollectionUpdateModal: false,
            statuses: [],
            regions: [],
            units: [],
            adLocationTypes: [],
            adDesignTypes: [],
            adVolumeTypes: [],
            districts: [],
            adDesignTypesByMinCollTypeForExtended: [],
            tableFields: [
                {
                    label: "#",
                    thClass: "text-center",
                    tdClass: "text-center",
                    sortable: false,
                    key: "index",
                },
                { label: this.$t('column.ad_location_type'), key: "advertisementLocationTypeName" },
                { label: this.$t('column.ad_design_type'), key: "advertisementDesignTypeName" },
                { label: this.$t('submodules.ad_volume_types.title'), key: "advertisementVolumeTypeName" },
                { label: this.$t('column.region'), key: "regionName" },
                { label: this.$t('column.district'), key: "districtName" },
                { label: this.$t('column.unit'), key: "unitShortName" },
                { label: this.$t('column.minimum_collection'), key: "cost" },
                { label: this.$t('column.status'), key: "status" },
                {
                    label: this.$t('column.actions'),
                    key: "actions",
                    thClass: "text-center",
                    tdClass: "text-center",
                    sortable: false
                },
            ],
        }
    },
    /*
    * COMPUTED */
    computed: {
        isModeCreate () {
            return this.$route.name === 'CreateMinimumCollection'
        },
        isOnExtendedPage () {
            return this.$route.name === 'UpdateMinimumCollectionExtended'
        },
        computedObserver () {
            return this.$refs.observer
        },
        multipleMinimumCollectionsComputedObserver () {
            return this.$refs['multiple-minimum-collections-observer']
        },
        singleMinimumCollectionUpdateComputedObserver () {
            return this.$refs['single-minimum-collection-update-observer']
        }
    },
    /*
    * METHODS */
    methods: {
        adVolumeTypesSelected () {
            this.showVolumeTypesRow = false
            if (this.editingItemForMultiple.directoryAdvertisementVolumeTypes.length > 0) {
                this.showVolumeTypesRow = true
            }
        },
        async regionSelected ($event, adLocationTypeId, dontResetDistrict = false) {
            if (!dontResetDistrict) {
                this.editingItem.districtId = null
                this.editingItemForMultiple.districts = []
                this.currentEditingItem.districtId = null
                // RESET AD_DESIGN_TYPE
                this.editingItem.directoryAdvertisementDesignTypeId = null
                this.editingItemForMultiple.directoryAdvertisementDesignTypes = []
                this.currentEditingItem.directoryAdvertisementDesignTypeId = null
            }
            // GET DISTRICTS
            if ($event) {
                if (adLocationTypeId) {
                    // GET AD_DESIGN_TYPES
                    helperService
                        .getAdDesignTypesByAdLocationTypeId(adLocationTypeId, $event.id ? $event.id : $event)
                        .then((res) => {
                            this.adDesignTypes = res.data
                        })
                        .catch(e => {
                            console.log(e)
                        })
                }
                if (this.isModeCreate || this.editingItem.isExtended) {
                    await helperService.getGeoLocationsByParentId($event.id ? $event.id : $event)
                        .then(res => {
                            this.districts = res.data
                        })
                        .catch(e => {
                            console.log(e)
                        })
                }
            }
        },
        /* makeDirectoryAdDesignTypesForExtended () {
            if (this.editingItemForMultiple.isExtended) {
                this.adDesignTypesByMinCollTypeForExtended = []
                if (!this.editingItemForMultiple.directoryMinimumCollectionTypes) {
                    this.editingItemForMultiple.directoryMinimumCollectionTypes = []
                }
                this.editingItemForMultiple.directoryMinimumCollectionTypes.forEach(minCollectionType => {
                    let tempMinCollTypeWithDesignType = {
                        minCollectionTypeId: null,
                        minCollectionTypeNameUz: '',
                        adDesignTypesByMinCollectionType: []
                    }
                    this.$set(tempMinCollTypeWithDesignType, 'minCollectionTypeId', minCollectionType.id)
                    this.$set(tempMinCollTypeWithDesignType, 'minCollectionTypeNameUz', minCollectionType.nameUz)

                    if (!this.editingItemForMultiple.directoryAdvertisementDesignTypes) {
                        this.editingItemForMultiple.directoryAdvertisementDesignTypes = []
                    }
                    this.editingItemForMultiple.directoryAdvertisementDesignTypes.forEach(adDesignType => {
                        let tempAdDesignType = Object.assign({}, adDesignType)
                        tempMinCollTypeWithDesignType.adDesignTypesByMinCollectionType.push(tempAdDesignType)
                    })
                    this.adDesignTypesByMinCollTypeForExtended.push(tempMinCollTypeWithDesignType)
                })
            }
        }, */
        updateSingleMinimumCollection (e) {
            e.preventDefault();
            // TODO: DUBLICATE LIKKA TEKSHIR (XUDDI SHUNDAYI TABLE GA QO'SHILMAGAN BO'LSIN)
            this.singleMinimumCollectionUpdateComputedObserver.validate().then(valid => {
                if (valid) {
                    if (this.currentEditingItem.isExtended) {
                        this.currentEditingItem.districtNameUz = this.districts.find(el => el.id == this.currentEditingItem.districtId).nameUz
                        this.currentEditingItem.districtNameRu = this.districts.find(el => el.id == this.currentEditingItem.districtId).nameRu
                        this.currentEditingItem.districtNameLt = this.districts.find(el => el.id == this.currentEditingItem.districtId).nameLt
                        this.currentEditingItem.directoryAdvertisementDesignTypeNameUz = this.adDesignTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementDesignTypeId).nameUz
                        this.currentEditingItem.directoryAdvertisementDesignTypeNameRu = this.adDesignTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementDesignTypeId).nameRu
                        this.currentEditingItem.directoryAdvertisementDesignTypeNameLt = this.adDesignTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementDesignTypeId).nameLt

                        this.currentEditingItem.directoryAdvertisementVolumeTypeNameUz = this.currentEditingItem.directoryAdvertisementVolumeTypeId ? this.adVolumeTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementVolumeTypeId).nameUz : null
                        this.currentEditingItem.directoryAdvertisementVolumeTypeNameRu = this.currentEditingItem.directoryAdvertisementVolumeTypeId ? this.adVolumeTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementVolumeTypeId).nameRu : null
                        this.currentEditingItem.directoryAdvertisementVolumeTypeNameLt = this.currentEditingItem.directoryAdvertisementVolumeTypeId ? this.adVolumeTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementVolumeTypeId).nameLt : null

                        this.currentEditingItem.directoryAdvertisementLocationTypeNameUz = this.adLocationTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementLocationTypeId).nameUz
                        this.currentEditingItem.directoryAdvertisementLocationTypeNameRu = this.adLocationTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementLocationTypeId).nameRu
                        this.currentEditingItem.directoryAdvertisementLocationTypeNameLt = this.adLocationTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementLocationTypeId).nameLt

                        this.currentEditingItem.regionNameUz = this.regions.find(el => el.id == this.currentEditingItem.regionId).nameUz
                        this.currentEditingItem.regionNameRu = this.regions.find(el => el.id == this.currentEditingItem.regionId).nameRu
                        this.currentEditingItem.regionNameLt = this.regions.find(el => el.id == this.currentEditingItem.regionId).nameLt
                        this.currentEditingItem.statusNameUz = this.statuses.find(s => s.id == this.currentEditingItem.statusId).nameUz
                        this.currentEditingItem.statusNameRu = this.statuses.find(s => s.id == this.currentEditingItem.statusId).nameRu
                        this.currentEditingItem.statusNameLt = this.statuses.find(s => s.id == this.currentEditingItem.statusId).nameLt
                        this.currentEditingItem.unitShortNameUz = this.units.find(el => el.id == this.currentEditingItem.unitId).shortNameUz
                        this.currentEditingItem.unitShortNameRu = this.units.find(el => el.id == this.currentEditingItem.unitId).shortNameRu
                        this.currentEditingItem.unitShortNameLt = this.units.find(el => el.id == this.currentEditingItem.unitId).shortNameLt

                        this.$set(this.minimumCollections, this.currentEditingItem.index, this.currentEditingItem)
                        this.singleMinimumCollectionUpdateModal = false
                        this.currentEditingItem = Object.assign({}, {})
                    } else {
                        this.currentEditingItem.directoryAdvertisementDesignTypeNameUz = this.adDesignTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementDesignTypeId).nameUz
                        this.currentEditingItem.directoryAdvertisementDesignTypeNameRu = this.adDesignTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementDesignTypeId).nameRu
                        this.currentEditingItem.directoryAdvertisementDesignTypeNameLt = this.adDesignTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementDesignTypeId).nameLt

                        this.currentEditingItem.directoryAdvertisementVolumeTypeNameUz = this.currentEditingItem.directoryAdvertisementVolumeTypeId ? this.adVolumeTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementVolumeTypeId).nameUz : null
                        this.currentEditingItem.directoryAdvertisementVolumeTypeNameRu = this.currentEditingItem.directoryAdvertisementVolumeTypeId ? this.adVolumeTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementVolumeTypeId).nameRu : null
                        this.currentEditingItem.directoryAdvertisementVolumeTypeNameLt = this.currentEditingItem.directoryAdvertisementVolumeTypeId ? this.adVolumeTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementVolumeTypeId).nameLt : null

                        this.currentEditingItem.directoryAdvertisementLocationTypeNameUz = this.adLocationTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementLocationTypeId).nameUz
                        this.currentEditingItem.directoryAdvertisementLocationTypeNameRu = this.adLocationTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementLocationTypeId).nameRu
                        this.currentEditingItem.directoryAdvertisementLocationTypeNameLt = this.adLocationTypes.find(el => el.id == this.currentEditingItem.directoryAdvertisementLocationTypeId).nameLt
                        this.currentEditingItem.regionNameUz = this.regions.find(el => el.id == this.currentEditingItem.regionId).nameUz
                        this.currentEditingItem.regionNameRu = this.regions.find(el => el.id == this.currentEditingItem.regionId).nameRu
                        this.currentEditingItem.regionNameLt = this.regions.find(el => el.id == this.currentEditingItem.regionId).nameLt
                        this.currentEditingItem.statusNameUz = this.statuses.find(s => s.id == this.currentEditingItem.statusId).nameUz
                        this.currentEditingItem.statusNameRu = this.statuses.find(s => s.id == this.currentEditingItem.statusId).nameRu
                        this.currentEditingItem.statusNameLt = this.statuses.find(s => s.id == this.currentEditingItem.statusId).nameLt
                        this.currentEditingItem.unitShortNameUz = this.units.find(el => el.id == this.currentEditingItem.unitId).shortNameUz
                        this.currentEditingItem.unitShortNameRu = this.units.find(el => el.id == this.currentEditingItem.unitId).shortNameRu
                        this.currentEditingItem.unitShortNameLt = this.units.find(el => el.id == this.currentEditingItem.unitId).shortNameLt

                        this.$set(this.minimumCollections, this.currentEditingItem.index, this.currentEditingItem)
                        this.singleMinimumCollectionUpdateModal = false
                        this.currentEditingItem = Object.assign({}, {})
                    }
                } else {
                    this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
                }
            });
        },
        async adLocationTypeSelected (adLocationTypeObjectOrId, dontResetAdDesignType = false) {
            if (!dontResetAdDesignType) {
                // RESET AD_DESIGN_TYPE
                this.editingItem.directoryAdvertisementDesignTypeId = null
                this.editingItemForMultiple.directoryAdvertisementDesignTypes = []
                this.currentEditingItem.directoryAdvertisementDesignTypeId = null
                // RESET AD_VOLUME_TYPE
                this.editingItem.directoryAdvertisementVolumeTypeId = null
                this.editingItemForMultiple.directoryAdvertisementVolumeTypes = []
                this.currentEditingItem.directoryAdvertisementVolumeTypeId = null
            }
            if (adLocationTypeObjectOrId) {
                if (this.isModeCreate ? (this.editingItemForMultiple.region && this.editingItemForMultiple.region.id) : this.editingItem.regionId) {
                    // GET AD_DESIGN_TYPES
                    helperService
                        .getAdDesignTypesByAdLocationTypeId(adLocationTypeObjectOrId.id ? adLocationTypeObjectOrId.id : adLocationTypeObjectOrId, this.isModeCreate ? this.editingItemForMultiple.region.id : this.editingItem.regionId)
                        .then((res) => {
                            this.adDesignTypes = res.data
                        })
                        .catch(e => {
                            console.log(e)
                        })
                }
                // GET AD_VOLUME_TYPES
                helperService
                    .getAdVolumeTypesByAdLocationTypeId(adLocationTypeObjectOrId.id ? adLocationTypeObjectOrId.id : adLocationTypeObjectOrId)
                    .then((res) => {
                        this.adVolumeTypes = res.data
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }
        },
        editItem (item, index) {
            this.currentEditingItem = Object.assign({}, item)
            this.$set(this.currentEditingItem, 'index', index)
            this.singleMinimumCollectionUpdateModal = true
        },
        deleteItem (item, index) {
            this.$bvModal.msgBoxConfirm(this.$t('messages.delete_title'), {
                okTitle: this.$t('actions.confirm'),
                cancelTitle: this.$t('actions.cancel')
            })
                .then(value => {
                    if (value) {
                        this.minimumCollections.splice(index, 1)
                    }
                })
                .catch(err => {
                    // An error occurred
                })
        },
        createOrUpdateItem (mode) {
            if (mode == 'create') {
                this.computedObserver.validate().then(valid => {
                    if (valid) {
                        this.editingItemForMultiple = Object.assign({}, {})
                        let activeStatus = this.statuses.find(el => el.code == 'ACTIVE')
                        if (activeStatus) {
                            this.editingItemForMultiple.statusId = activeStatus.id
                        }
                        this.createMultipleMinimumCollectionsModal = true
                    } else {
                        this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
                    }
                })
            }
        },
        resetEditingItem () {
            let decisionNumber = this.editingItem.decisionNumber
            let decisionDate = this.editingItem.decisionDate
            let description = this.editingItem.description
            this.editingItem = Object.assign({}, {})
            this.$set(this.editingItem, 'decisionNumber', decisionNumber)
            this.$set(this.editingItem, 'decisionDate', decisionDate)
            this.$set(this.editingItem, 'description', description)
        },
        createMinCollectionsFromAdDesignTypesForMultipleSaveFn (eachDistrict = false, eachVolumeType = false) {
            this.editingItemForMultiple.directoryAdvertisementDesignTypes.forEach(adDesignType => {
                this.resetEditingItem()
                if (eachDistrict) {
                    this.editingItem.districtId = eachDistrict.id
                    this.editingItem.districtNameUz = eachDistrict.nameUz
                    this.editingItem.districtNameRu = eachDistrict.nameRu
                    this.editingItem.districtNameLt = eachDistrict.nameLt
                }

                this.editingItem.isExtended = this.editingItemForMultiple.isExtended

                this.editingItem.directoryAdvertisementDesignTypeId = adDesignType.id
                this.editingItem.directoryAdvertisementDesignTypeNameUz = adDesignType.nameUz
                this.editingItem.directoryAdvertisementDesignTypeNameRu = adDesignType.nameRu
                this.editingItem.directoryAdvertisementDesignTypeNameLt = adDesignType.nameLt

                if (eachVolumeType) {
                    this.editingItem.directoryAdvertisementVolumeTypeId = eachVolumeType.id
                    this.editingItem.directoryAdvertisementVolumeTypeNameUz = eachVolumeType.nameUz
                    this.editingItem.directoryAdvertisementVolumeTypeNameRu = eachVolumeType.nameRu
                    this.editingItem.directoryAdvertisementVolumeTypeNameLt = eachVolumeType.nameLt
                    this.editingItem.cost = eachVolumeType.cost
                } else {
                    this.editingItem.cost = adDesignType.cost
                }

                this.editingItem.directoryAdvertisementLocationTypeId = this.editingItemForMultiple.directoryAdvertisementLocationType.id
                this.editingItem.directoryAdvertisementLocationTypeNameUz = this.editingItemForMultiple.directoryAdvertisementLocationType.nameUz
                this.editingItem.directoryAdvertisementLocationTypeNameRu = this.editingItemForMultiple.directoryAdvertisementLocationType.nameRu
                this.editingItem.directoryAdvertisementLocationTypeNameLt = this.editingItemForMultiple.directoryAdvertisementLocationType.nameLt
                this.editingItem.regionId = this.editingItemForMultiple.region.id
                this.editingItem.regionNameUz = this.editingItemForMultiple.region.nameUz
                this.editingItem.regionNameRu = this.editingItemForMultiple.region.nameRu
                this.editingItem.regionNameLt = this.editingItemForMultiple.region.nameLt
                this.editingItem.statusId = this.editingItemForMultiple.statusId

                this.editingItem.statusNameUz = this.statuses.find(s => s.id == this.editingItemForMultiple.statusId).nameUz
                this.editingItem.statusNameRu = this.statuses.find(s => s.id == this.editingItemForMultiple.statusId).nameRu
                this.editingItem.statusNameLt = this.statuses.find(s => s.id == this.editingItemForMultiple.statusId).nameLt

                this.editingItem.unitId = this.editingItemForMultiple.unit.id
                this.editingItem.unitShortNameUz = this.editingItemForMultiple.unit.shortNameUz
                this.editingItem.unitShortNameRu = this.editingItemForMultiple.unit.shortNameRu
                this.editingItem.unitShortNameLt = this.editingItemForMultiple.unit.shortNameLt

                let copiedItem = Object.assign({}, this.editingItem)

                copiedItem.decisionNumber = this.editingItem.decisionNumber
                copiedItem.createdDate = this.editingItem.createdDate
                copiedItem.description = this.editingItem.description

                this.minimumCollections.push(copiedItem)
            })
        },
        saveMultipleMinimumCollections (e) {
            e.preventDefault();

            this.multipleMinimumCollectionsComputedObserver.validate().then(valid => {
                if (valid) {

                    if (this.editingItemForMultiple.isExtended) {
                        this.editingItemForMultiple.districts.forEach(district => {
                            if (this.editingItemForMultiple.directoryAdvertisementVolumeTypes && this.editingItemForMultiple.directoryAdvertisementVolumeTypes.length > 0) {
                                this.editingItemForMultiple.directoryAdvertisementVolumeTypes.forEach(volumeType => {
                                    this.createMinCollectionsFromAdDesignTypesForMultipleSaveFn(district, volumeType)
                                })
                            } else {
                                this.createMinCollectionsFromAdDesignTypesForMultipleSaveFn(district)
                            }
                        })
                    } else {
                        if (this.editingItemForMultiple.directoryAdvertisementVolumeTypes && this.editingItemForMultiple.directoryAdvertisementVolumeTypes.length > 0) {
                            this.editingItemForMultiple.directoryAdvertisementVolumeTypes.forEach(volumeType => {
                                this.createMinCollectionsFromAdDesignTypesForMultipleSaveFn(false, volumeType)
                            })
                        } else {
                            this.createMinCollectionsFromAdDesignTypesForMultipleSaveFn()
                        }

                        /* this.editingItemForMultiple.directoryAdvertisementDesignTypes.forEach(adDesignType => {
                            this.resetEditingItem()
                            this.editingItem.directoryAdvertisementDesignTypeId = adDesignType.id
                            this.editingItem.directoryAdvertisementDesignTypeNameUz = adDesignType.nameUz
                            this.editingItem.directoryAdvertisementDesignTypeNameRu = adDesignType.nameRu
                            this.editingItem.directoryAdvertisementDesignTypeNameLt = adDesignType.nameLt
                            this.editingItem.cost = adDesignType.cost

                            this.editingItem.directoryAdvertisementLocationTypeId = this.editingItemForMultiple.directoryAdvertisementLocationType.id
                            this.editingItem.directoryAdvertisementLocationTypeNameUz = this.editingItemForMultiple.directoryAdvertisementLocationType.nameUz
                            this.editingItem.directoryAdvertisementLocationTypeNameRu = this.editingItemForMultiple.directoryAdvertisementLocationType.nameRu
                            this.editingItem.directoryAdvertisementLocationTypeNameLt = this.editingItemForMultiple.directoryAdvertisementLocationType.nameLt
                            this.editingItem.regionId = this.editingItemForMultiple.region.id
                            this.editingItem.regionNameUz = this.editingItemForMultiple.region.nameUz
                            this.editingItem.regionNameRu = this.editingItemForMultiple.region.nameRu
                            this.editingItem.regionNameLt = this.editingItemForMultiple.region.nameLt
                            this.editingItem.statusId = this.editingItemForMultiple.statusId

                            this.editingItem.statusNameUz = this.statuses.find(s => s.id == this.editingItemForMultiple.statusId).nameUz
                            this.editingItem.statusNameRu = this.statuses.find(s => s.id == this.editingItemForMultiple.statusId).nameRu
                            this.editingItem.statusNameLt = this.statuses.find(s => s.id == this.editingItemForMultiple.statusId).nameLt

                            this.editingItem.unitId = this.editingItemForMultiple.unit.id
                            this.editingItem.unitShortNameUz = this.editingItemForMultiple.unit.shortNameUz
                            this.editingItem.unitShortNameRu = this.editingItemForMultiple.unit.shortNameRu
                            this.editingItem.unitShortNameLt = this.editingItemForMultiple.unit.shortNameLt

                            let copiedItem = Object.assign({}, this.editingItem)

                            copiedItem.decisionNumber = this.editingItem.decisionNumber
                            copiedItem.createdDate = this.editingItem.createdDate
                            copiedItem.description = this.editingItem.description

                            this.minimumCollections.push(copiedItem)
                        }) */
                    }
                    this.createMultipleMinimumCollectionsModal = false
                } else {
                    this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
                }
            });
        },
        customLabelAdLocationType (opt) {
            let selected = this.adLocationTypes.find(e => e.id == (opt.id ? opt.id : opt));
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
        customLabelDistrict (opt) {
            let selected = this.districts.find(e => e.id == (opt.id ? opt.id : opt));
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
        customLabelAdDesignType (opt) {
            let selected = this.adDesignTypes.find(e => e.id == (opt.id ? opt.id : opt));
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
        customLabelAdVolumeType (opt) {
            let selected = this.adVolumeTypes.find(e => e.id == (opt.id ? opt.id : opt));
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
        customLabelRegion (opt) {
            let selected = this.regions.find(e => e.id == (opt.id ? opt.id : opt));
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
            let selected = this.units.find(e => e.id == (opt.id ? opt.id : opt));
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
        treeClosed (veeName) {
            this.computedObserver.refs[veeName].validate();
        },
        normalizer (node) {
            if (!node.children || node.children.length === 0) {
                delete node.children
                return {
                    id: node.id,
                    label: this.getName({
                        nameRu: node.nameRu,
                        nameLt: node.nameLt,
                        nameUz: node.nameUz,
                    }),
                }
            }
            return {
                id: node.id,
                label: this.getName({
                    nameRu: node.nameRu,
                    nameLt: node.nameLt,
                    nameUz: node.nameUz,
                }),
                children: node.children && node.children.length > 0 ? node.children : [],
            }
        },
        save () {
            this.computedObserver.validate().then(valid => {
                if (valid && (this.minimumCollections.length || !this.isModeCreate)) {
                    this.minimumCollections.forEach(c => {
                        c.decisionNumber = this.editingItem.decisionNumber
                        c.createdDate = this.editingItem.createdDate
                        c.description = this.editingItem.description
                    })
                    if (this.editingItem.id) {
                        crudAndListsService.update(this.isOnExtendedPage ? MAIN_API_URL_EXTENDED : MAIN_API_URL, this.editingItem).then(res => {
                            this.computedObserver.reset()
                            this.editingItem = Object.assign({}, {});
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    } else {
                        crudAndListsService.create(MAIN_API_URL, this.minimumCollections).then(res => {
                            this.computedObserver.reset()
                            this.editingItem = Object.assign({}, {});
                            this.$router.go(-1)
                            this.$toast(this.$t('messages.saved_successfully'), { type: 'success' });
                        })
                    }
                } else {
                    this.$toast(this.$t('messages.fill_required_fields'), { type: 'error' });
                }
            });
        }
    },
    /*
    * CREATED */
    async created () {
        this.var_default_search_payload.itemsPerPage = 500;
        if (this.isModeCreate) {
            await crudAndListsService.getEmpty(MAIN_API_URL)
                .then(res => {
                    this.editingItem = res.data
                })
                .catch(e => {
                    console.log(e)
                })
        } else {
            await crudAndListsService.getById(this.isOnExtendedPage ? MAIN_API_URL_EXTENDED : MAIN_API_URL, this.$route.params.id, false)
                .then(res => {
                    this.editingItem = res.data
                })
                .catch(e => {
                    console.log(e)
                })
        }
        // GET STATUSES
        await helperService.getRefByCode('status')
            .then(res => {
                this.statuses = res.data.children
                if (this.isModeCreate) {
                    let activeStatus = this.statuses.find(el => el.code == 'ACTIVE')
                    if (activeStatus) {
                        this.editingItem.statusId = activeStatus.id
                        this.editingItemForMultiple.statusId = activeStatus.id
                    }
                }
            })
            .catch(e => {
                console.log(e)
            })

        // GET REGIONS
        await helperService.fetchRegions()
            .then(res => {
                this.regions = res.data
                this.regionSelected(this.editingItem.regionId, this.editingItem.directoryAdvertisementLocationTypeId, true)
            })
            .catch(e => {
                console.log(e)
            })

        // GET AD_LOCATION_TYPES
        crudAndListsService
            .searchList('directory/advertisement-location-types', this.var_default_search_payload)
            .then((res) => {
                this.adLocationTypes = res.data.list;
                this.adLocationTypeSelected(this.editingItem.directoryAdvertisementLocationTypeId, true)
            })
            .catch(e => {
                console.log(e)
            })

        // GET UNITS
        crudAndListsService
            .searchList('directory/units', this.var_default_search_payload)
            .then((res) => {
                this.units = res.data.list;
            })
            .catch(e => {
                console.log(e)
            })

        // GET MINIMUM_COLLECTION_TYPES
        /* crudAndListsService
            .searchList('directory/minimum-collection-types', this.var_default_search_payload)
            .then((res) => {
                this.minimumCollectionTypes = res.data.list;
            })
            .catch(e => {
                console.log(e)
            }) */
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