<template>
    <b-row>
        <div class="col-md-12 text-sm-start">
            <b-button class="btn btn-warning" size="md" @click="goBack">
                {{ $t("actions.back") }}
            </b-button>
        </div>
        <b-col sm="12" class="text-center">
            <div class="h4 mb-4 d-inline-block">{{ title }}</div>
        </b-col>
        <b-col sm="12">
            <b-card border-variant="primary"
                    header="Общая информация"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="center">
                <b-card-header>
                    <b-card-text>
                        <b-list-group>

                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                <b>идентификационный номер лекарственного препарата с учетом упаковки</b>
                                <span variant="primary" pill>
                  {{ editingItem.box_group_id ? editingItem.box_group_id : '_ _ _' }}
                </span>
                            </b-list-group-item>

                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                <b>название лекарственного препарата с учетом упаковки на русском</b>
                                <span variant="primary" pill>
                  {{ editingItem.box_group_name_ru ? editingItem.box_group_name_ru : '_ _ _' }}
                </span>
                            </b-list-group-item>

                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                <b>наличие вторичной упаковки</b>
                                <span variant="primary" pill>
                  {{ editingItem.group_box_exist ? editingItem.group_box_exist : '_ _ _' }}
                </span>
                            </b-list-group-item>

                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                <b>наличие вторичной упаковки</b>
                                <span variant="primary" pill>
                  {{ editingItem.outer_box_exist ? editingItem.outer_box_exist : '_ _ _' }}
                </span>
                            </b-list-group-item>

                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                <b>наличие промежуточной упаковки</b>
                                <span variant="primary" pill>
                  {{ editingItem.mono_box_exist ? editingItem.mono_box_exist : '_ _ _' }}
                </span>
                            </b-list-group-item>

                            <b-list-group-item class="d-flex justify-content-between align-items-center">
                                <b>первичная упаковка одинарная</b>
                                <span variant="primary" pill>
                  {{ editingItem.inner_box_single ? editingItem.inner_box_single : '_ _ _' }}
                </span>
                            </b-list-group-item>

                        </b-list-group>
                    </b-card-text>
                </b-card-header>
                <b-card-body>
                    <b-card-group deck class="p-2">
                        <!-- certificate-->
                        <b-card border-variant="primary"
                                header="перечень регистрационных удостоверений"
                                header-bg-variant="primary"
                                header-text-variant="white"
                                align="center">
                            <b-card-text>
                                <b-list-group v-if="editingItem.certificate">
                                    <div>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>идентификационный номер <br>регистрационного удостоверения</b>
                                            <span variant="primary" pill>
                       {{ editingItem.certificate.certificate_id ? editingItem.certificate.certificate_id : '_ _ _' }}
                    </span>
                                        </b-list-group-item>

                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>№ регистрационного удостоверения</b>
                                            <span variant="primary" pill>
                       {{
                                                editingItem.certificate.certificate_number ? editingItem.certificate.certificate_number : '_ _ _'
                                                }}
                    </span>
                                        </b-list-group-item>

                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>дата выдачи регистрационного удостоверения</b>
                                            <span variant="primary" pill>
                       {{
                                                editingItem.certificate.certificate_date ? editingItem.certificate.certificate_date : '_ _ _'
                                                }}
                    </span>
                                        </b-list-group-item>

                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>название фармакотерапевтической группы</b>
                                            <span variant="primary" pill>
                       {{
                                                editingItem.certificate.pharmacotherapeutic_group ? editingItem.certificate.pharmacotherapeutic_group : '_ _ _'
                                                }}
                    </span>
                                        </b-list-group-item>

                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>код фармакотерапевтической группы</b>
                                            <span variant="primary" pill>
                       {{
                                                editingItem.certificate.pharmacotherapeutic_group_code ? editingItem.certificate.pharmacotherapeutic_group_code : '_ _ _'
                                                }}
                    </span>
                                        </b-list-group-item>

                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>название способа введения</b>
                                            <span variant="primary" pill>
                       {{
                                                editingItem.certificate.route_administration ? editingItem.certificate.route_administration : '_ _ _'
                                                }}
                    </span>
                                        </b-list-group-item>

                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>код способа введения</b>
                                            <span variant="primary" pill>
                       {{
                                                editingItem.certificate.route_administration_code ? editingItem.certificate.route_administration_code : '_ _ _'
                                                }}
                    </span>
                                        </b-list-group-item>

                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>в составе лекарственного препарата имеется нпп.<br>нпп=наркотический,
                                                психотропный, прекурсор</b>
                                            <span variant="primary" pill>
                       {{ editingItem.certificate.exist_npp ? editingItem.certificate.exist_npp : '_ _ _' }}
                    </span>
                                        </b-list-group-item>

                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>в составе лекарственного препарата имеется растительное вещество</b>
                                            <span variant="primary" pill>
                       {{ editingItem.certificate.is_herbal ? editingItem.certificate.is_herbal : '_ _ _' }}
                    </span>
                                        </b-list-group-item>
                                    </div>
                                    <!-- confidant-->
                                    <b-card border-variant="info"
                                            header="Правообладатель"
                                            header-bg-variant="info"
                                            header-text-variant="white"
                                            align="center"
                                            class="mt-3"
                                    >
                                        <b-card-text>
                                            <b-list-group
                                                    v-if="editingItem.certificate && editingItem.certificate.confidant">

                                                <b-list-group-item
                                                        class="d-flex justify-content-between align-items-center">
                                                    <b>идентификационный номер правообладателя</b>
                                                    <span variant="primary" pill>
                       {{
                                                        editingItem.certificate.confidant.confidant_id ? editingItem.certificate.confidant.confidant_id : '_ _ _'
                                                        }}
                    </span>
                                                </b-list-group-item>

                                                <b-list-group-item
                                                        class="d-flex justify-content-between align-items-center">
                                                    <b>название правообладателя</b>
                                                    <span variant="primary" pill>
                       {{
                                                        editingItem.certificate.confidant.confidant_name ? editingItem.certificate.confidant.confidant_name : '_ _ _'
                                                        }}
                    </span>
                                                </b-list-group-item>

                                                <b-list-group-item
                                                        class="d-flex justify-content-between align-items-center">
                                                    <b>идентификационный номер страны</b>
                                                    <span variant="primary" pill>
                       {{
                                                        editingItem.certificate.confidant.region_id ? editingItem.certificate.confidant.region_id : '_ _ _'
                                                        }}
                    </span>
                                                </b-list-group-item>

                                                <b-list-group-item
                                                        class="d-flex justify-content-between align-items-center">
                                                    <b>название страны</b>
                                                    <span variant="primary" pill>
                       {{
                                                        editingItem.certificate.confidant.region_name ? editingItem.certificate.confidant.region_name : '_ _ _'
                                                        }}
                    </span>
                                                </b-list-group-item>

                                                <b-list-group-item
                                                        class="d-flex justify-content-between align-items-center">
                                                    <b>идентификационный номер формы собственности</b>
                                                    <span variant="primary" pill>
                       {{
                                                        editingItem.certificate.confidant.legal_form_id ? editingItem.certificate.confidant.legal_form_id : '_ _ _'
                                                        }}
                    </span>
                                                </b-list-group-item>

                                                <b-list-group-item
                                                        class="d-flex justify-content-between align-items-center">
                                                    <b>короткое название формы собственности</b>
                                                    <span variant="primary" pill>
                       {{
                                                        editingItem.certificate.confidant.legal_form_short_name ? editingItem.certificate.confidant.legal_form_short_name : '_ _ _'
                                                        }}
                    </span>
                                                </b-list-group-item>

                                                <b-list-group-item
                                                        class="d-flex justify-content-between align-items-center">
                                                    <b>название формы собственности</b>
                                                    <span variant="primary" pill>
                       {{
                                                        editingItem.certificate.confidant.legal_form_name ? editingItem.certificate.confidant.legal_form_name : '_ _ _'
                                                        }}
                    </span>
                                                </b-list-group-item>

                                            </b-list-group>
                                        </b-card-text>
                                    </b-card>
                                    <!-- holder-->
                                    <b-card border-variant="info"
                                            header="Держатель РУ (Правообладатель или производитель или другой держатель)"
                                            header-bg-variant="info"
                                            header-text-variant="white"
                                            align="center"
                                            class="mt-3"
                                    >
                                        <b-card-text>
                                            <b-list-group
                                                    v-if="editingItem.certificate && editingItem.certificate.holder">
                                                <b-list-group-item
                                                        class="d-flex justify-content-between align-items-center">
                                                    <b>ИД держателя</b>
                                                    <span variant="primary" pill>
                       {{
                                                        editingItem.certificate.holder.holder_id ? editingItem.certificate.holder.holder_id : '_ _ _'
                                                        }}
                    </span>
                                                </b-list-group-item>

                                                <b-list-group-item
                                                        class="d-flex justify-content-between align-items-center">
                                                    <b>Наименование держателя</b>
                                                    <span variant="primary" pill>
                            {{
                                                        editingItem.certificate.holder.holder_name ? editingItem.certificate.holder.holder_name : '_ _ _'
                                                        }}
                          </span>
                                                </b-list-group-item>
                                                <b-list-group-item
                                                        class="d-flex justify-content-between align-items-center">
                                                    <b>идентификационный номер страны</b>
                                                    <span variant="primary" pill>
                            {{
                                                        editingItem.certificate.holder.region_id ? editingItem.certificate.holder.region_id : '_ _ _'
                                                        }}
                          </span>
                                                </b-list-group-item>
                                                <b-list-group-item
                                                        class="d-flex justify-content-between align-items-center">
                                                    <b>название страны</b>
                                                    <span variant="primary" pill>
                            {{
                                                        editingItem.certificate.holder.region_name ? editingItem.certificate.holder.region_name : '_ _ _'
                                                        }}
                          </span>
                                                </b-list-group-item>
                                                <b-list-group-item
                                                        class="d-flex justify-content-between align-items-center">
                                                    <b>Полное наименование держателя</b>
                                                    <span variant="primary" pill>
                            {{
                                                        editingItem.certificate.holder.holder_gen_name ? editingItem.certificate.holder.holder_gen_name : '_ _ _'
                                                        }}
                          </span>
                                                </b-list-group-item>
                                                <b-list-group-item
                                                        class="d-flex justify-content-between align-items-center">
                                                    <b>идентификационный номер формы собственности</b>
                                                    <span variant="primary" pill>
                            {{
                                                        editingItem.certificate.holder.legal_form_id ? editingItem.certificate.holder.legal_form_id : '_ _ _'
                                                        }}
                          </span>
                                                </b-list-group-item>
                                                <b-list-group-item
                                                        class="d-flex justify-content-between align-items-center">
                                                    <b>короткое название формы собственности</b>
                                                    <span variant="primary" pill>
                            {{
                                                        editingItem.certificate.holder.legal_form_short_name ? editingItem.certificate.holder.legal_form_short_name : '_ _ _'
                                                        }}
                          </span>
                                                </b-list-group-item>
                                                <b-list-group-item
                                                        class="d-flex justify-content-between align-items-center">
                                                    <b>название формы собственности</b>
                                                    <span variant="primary" pill>
                            {{
                                                        editingItem.certificate.holder.legal_form_name ? editingItem.certificate.holder.legal_form_name : '_ _ _'
                                                        }}
                          </span>
                                                </b-list-group-item>
                                            </b-list-group>
                                        </b-card-text>
                                    </b-card>


                                </b-list-group>
                            </b-card-text>
                        </b-card>
                        <!-- medicine_mark-->
                        <b-card border-variant="primary"
                                header="торговые марки"
                                header-bg-variant="primary"
                                header-text-variant="white"
                                align="center">
                            <b-card-text>
                                <b-list-group v-if="editingItem.medicine_mark">

                                    <div>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>идентификационный номер торгового наименования</b>
                                            <span variant="primary" pill>
                       {{
                                                editingItem.medicine_mark.medicine_mark_id ? editingItem.medicine_mark.medicine_mark_id : '_ _ _'
                                                }}
                    </span>
                                        </b-list-group-item>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>торговое наименование на русском</b>
                                            <span variant="primary" pill>
                       {{
                                                editingItem.medicine_mark.medicine_mark_name_ru ? editingItem.medicine_mark.medicine_mark_name_ru : '_ _ _'
                                                }}
                    </span>
                                        </b-list-group-item>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>торговое наименование на узбекском</b>
                                            <span variant="primary" pill>
                       {{
                                                editingItem.medicine_mark.medicine_mark_name_uz ? editingItem.medicine_mark.medicine_mark_name_uz : '_ _ _'
                                                }}
                    </span>
                                        </b-list-group-item>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>торговое наименование на английском</b>
                                            <span variant="primary" pill>
                       {{
                                                editingItem.medicine_mark.medicine_mark_name_en ? editingItem.medicine_mark.medicine_mark_name_en : '_ _ _'
                                                }}
                    </span>
                                        </b-list-group-item>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>название мнн</b>
                                            <span variant="primary" pill>
                       {{ editingItem.medicine_mark.inn_name ? editingItem.medicine_mark.inn_name : '_ _ _' }}
                    </span>
                                        </b-list-group-item>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>код атх</b>
                                            <span variant="primary" pill>
                       {{ editingItem.medicine_mark.atc_code ? editingItem.medicine_mark.atc_code : '_ _ _' }}
                    </span>
                                        </b-list-group-item>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>название atx на русском</b>
                                            <span variant="primary" pill>
                       {{ editingItem.medicine_mark.atc_name_ru ? editingItem.medicine_mark.atc_name_ru : '_ _ _' }}
                    </span>
                                        </b-list-group-item>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>название atx на английском</b>
                                            <span variant="primary" pill>
                       {{ editingItem.medicine_mark.atc_name_en ? editingItem.medicine_mark.atc_name_en : '_ _ _' }}
                    </span>
                                        </b-list-group-item>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>тип периода срока годности лекарственного препаратa</b>
                                            <span variant="primary" pill>
                       {{
                                                editingItem.medicine_mark.shelf_life_kind ? editingItem.medicine_mark.shelf_life_kind : '_ _ _'
                                                }}
                    </span>
                                        </b-list-group-item>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>числовое значение срока годности лекарственного препарата</b>
                                            <span variant="primary" pill>
                       {{ editingItem.medicine_mark.shelf_life ? editingItem.medicine_mark.shelf_life : '_ _ _' }}
                    </span>
                                        </b-list-group-item>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>тип периода срока годности после вскрытия упаковки</b>
                                            <span variant="primary" pill>
                       {{
                                                editingItem.medicine_mark.opened_shelf_life_kind ? editingItem.medicine_mark.opened_shelf_life_kind : '_ _ _'
                                                }}
                    </span>
                                        </b-list-group-item>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>числовое значение срока годности после вскрытия упаковки</b>
                                            <span variant="primary" pill>
                       {{
                                                editingItem.medicine_mark.opened_shelf_life ? editingItem.medicine_mark.opened_shelf_life : '_ _ _'
                                                }}
                    </span>
                                        </b-list-group-item>
                                    </div>

                                    <!-- producer-->
                                    <b-card border-variant="info"
                                            header="производители"
                                            header-bg-variant="info"
                                            header-text-variant="white"
                                            align="center"
                                            class="mt-3"
                                    >
                                        <b-card-text>
                                            <b-list-group
                                                    v-if="editingItem.medicine_mark && editingItem.medicine_mark.producer">

                                                <div>
                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>идентификационный номер производителя</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine_mark.producer.producer_id ? editingItem.medicine_mark.producer.producer_id : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>

                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>название производителя</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine_mark.producer.producer_name ? editingItem.medicine_mark.producer.producer_name : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>
                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>название производителя</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine_mark.producer.region_id ? editingItem.medicine_mark.producer.region_id : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>

                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>название страны</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine_mark.producer.region_name ? editingItem.medicine_mark.producer.region_name : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>
                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>инн производителя</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine_mark.producer.tin ? editingItem.medicine_mark.producer.tin : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>

                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>идентификационный номер формы собственности</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine_mark.producer.legal_form_id ? editingItem.medicine_mark.producer.legal_form_id : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>
                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>короткое название формы собственности</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine_mark.producer.legal_form_short_name ? editingItem.medicine_mark.producer.legal_form_short_name : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>
                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>название формы собственности</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine_mark.producer.legal_form_name ? editingItem.medicine_mark.producer.legal_form_name : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>
                                                </div>

                                            </b-list-group>
                                        </b-card-text>
                                    </b-card>
                                </b-list-group>
                            </b-card-text>
                        </b-card>
                    </b-card-group>
                    <b-card-group deck class="p-2">


                        <b-card border-variant="primary"
                                header="лекарственного препараты"
                                header-bg-variant="primary"
                                header-text-variant="white"
                                align="center">
                            <b-card-text>
                                <b-list-group v-if="editingItem.medicine">
                                    <div>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>идентификационный номер регистрационного удостоверения</b>
                                            <span variant="primary" pill>
                       {{ editingItem.medicine.medicine_id ? editingItem.medicine.medicine_id : '_ _ _' }}
                    </span>
                                        </b-list-group-item>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>идентификационный номер регистрационного удостоверения</b>
                                            <span variant="primary" pill>
                       {{ editingItem.medicine.medicine_name ? editingItem.medicine.medicine_name : '_ _ _' }}
                    </span>
                                        </b-list-group-item>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>идентификационный номер регистрационного удостоверения</b>
                                            <span variant="primary" pill>
                       {{ editingItem.medicine.vat_enabled ? editingItem.medicine.vat_enabled : '_ _ _' }}
                    </span>
                                        </b-list-group-item>
                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>идентификационный номер регистрационного удостоверения</b>
                                            <span variant="primary" pill>
                       {{ editingItem.medicine.vat_percent ? editingItem.medicine.vat_percent : '_ _ _' }}
                    </span>
                                        </b-list-group-item>
                                    </div>
                                    <b-card border-variant="info"
                                            header="Лекарственная форма"
                                            header-bg-variant="info"
                                            header-text-variant="white"
                                            align="center"
                                            class="mt-3">
                                        <div>
                                            <b-card-text>
                                                <b-list-group
                                                        v-if="editingItem.medicine && editingItem.medicine.medicine_forms[0].length > 0">
                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>идентификационный номер лекарственной формы</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine.medicine_forms[0].medicine_form_item_id ? editingItem.medicine.medicine_forms[0].medicine_form_item_id : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>
                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>название лекарственной формы</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine.medicine_forms[0].medicine_form_item_name ? editingItem.medicine.medicine_forms[0].medicine_form_item_name : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>
                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>идентификационный номер группы лекарственных форм</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine.medicine_forms[0].medicine_form_id ? editingItem.medicine.medicine_forms[0].medicine_form_id : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>
                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>название группы лекарственных форм</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine.medicine_forms[0].medicine_form_name ? editingItem.medicine.medicine_forms[0].medicine_form_name : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>
                                                </b-list-group>
                                            </b-card-text>
                                        </div>
                                        <b-card border-variant="info"
                                                header="состав"
                                                header-bg-variant="info"
                                                header-text-variant="white"
                                                align="center"
                                                class="mt-3">
                                            <b-card-text>
                                                <b-list-group
                                                        v-if="editingItem.medicine.medicine_forms[0].length > 0 && editingItem.medicine.medicine_forms[0].compositions[0].length > 0">

                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>идентификационный номер группы лекарственных форм</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine.medicine_forms[0].compositions[0] && editingItem.medicine.medicine_forms[0].compositions[0].composition_id
                                                                ? editingItem.medicine.medicine_forms[0].compositions[0].composition_id : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>

                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>количества(доза / концентрация) веществ <br>в составе
                                                            лекарственного препарата</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine.medicine_forms[0].compositions[0].quantity
                                                                ? editingItem.medicine.medicine_forms[0].compositions[0].quantity : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>

                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>объем лекарственного препарата</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine.medicine_forms[0].compositions[0].measure_id
                                                                ? editingItem.medicine.medicine_forms[0].compositions[0].measure_id : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>

                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>название единицы измерения</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine.medicine_forms[0].compositions[0].measuere_name
                                                                ? editingItem.medicine.medicine_forms[0].compositions[0].measuere_name : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>
                                                </b-list-group>
                                            </b-card-text>
                                            <b-card border-variant="info"
                                                    header="вещества"
                                                    header-bg-variant="info"
                                                    header-text-variant="white"
                                                    align="center"
                                                    class="mt-3">
                                                <b-card-text>
                                                    <b-list-group
                                                            v-if="editingItem.medicine.medicine_forms[0].length > 0
                                                            && editingItem.medicine.medicine_forms[0].compositions[0].length > 0
                                                            && editingItem.medicine.medicine_forms[0].compositions[0].substances[0].length > 0">

                                                        <b-list-group-item
                                                                class="d-flex justify-content-between align-items-center">
                                                            <b>идентификационный номер субстанции (вещество)</b>
                                                            <span variant="primary" pill>
                       {{
                                                                editingItem.medicine.medicine_forms[0].compositions[0].substances[0].substance_id
                                                                    ? editingItem.medicine.medicine_forms[0].compositions[0].substances[0].substance_id : '_ _ _'
                                                                }}
                    </span>
                                                        </b-list-group-item>

                                                        <b-list-group-item
                                                                class="d-flex justify-content-between align-items-center">
                                                            <b>название субстанции</b>
                                                            <span variant="primary" pill>
                       {{
                                                                editingItem.medicine.medicine_forms[0].compositions[0].substances[0].substance_name
                                                                    ? editingItem.medicine.medicine_forms[0].compositions[0].substances[0].substance_name : '_ _ _'
                                                                }}
                    </span>
                                                        </b-list-group-item>

                                                        <b-list-group-item
                                                                class="d-flex justify-content-between align-items-center">
                                                            <b>количества(доза / концентрация) веществ <br>в составе
                                                                лекарственного препарата</b>
                                                            <span variant="primary" pill>
                       {{
                                                                editingItem.medicine.medicine_forms[0].compositions[0].substances[0].quantity
                                                                    ? editingItem.medicine.medicine_forms[0].compositions[0].substances[0].quantity : '_ _ _'
                                                                }}
                    </span>
                                                        </b-list-group-item>

                                                        <b-list-group-item
                                                                class="d-flex justify-content-between align-items-center">
                                                            <b>отображение в торговом наименовании <br>дозы/концентрации</b>
                                                            <span variant="primary" pill>
                       {{
                                                                editingItem.medicine.medicine_forms[0].compositions[0].substances[0].gen_quantity
                                                                    ? editingItem.medicine.medicine_forms[0].compositions[0].substances[0].gen_quantity : '_ _ _'
                                                                }}
                    </span>
                                                        </b-list-group-item>

                                                        <b-list-group-item
                                                                class="d-flex justify-content-between align-items-center">
                                                            <b>идентификационный номер единицы измерения</b>
                                                            <span variant="primary" pill>
                       {{
                                                                editingItem.medicine.medicine_forms[0].compositions[0].substances[0].measure_id
                                                                    ? editingItem.medicine.medicine_forms[0].compositions[0].substances[0].measure_id : '_ _ _'
                                                                }}
                    </span>
                                                        </b-list-group-item>

                                                        <b-list-group-item
                                                                class="d-flex justify-content-between align-items-center">
                                                            <b>название единицы измерения</b>
                                                            <span variant="primary" pill>
                       {{
                                                                editingItem.medicine.medicine_forms[0].compositions[0].substances[0].measure_name
                                                                    ? editingItem.medicine.medicine_forms[0].compositions[0].substances[0].measure_name : '_ _ _'
                                                                }}
                    </span>
                                                        </b-list-group-item>
                                                    </b-list-group>
                                                </b-card-text>
                                            </b-card>
                                        </b-card>
                                    </b-card>
                                </b-list-group>
                            </b-card-text>
                        </b-card>
                        <b-card border-variant="primary"
                                header="Упаковки"
                                header-bg-variant="primary"
                                header-text-variant="white"
                                align="center">
                            <b-card-text>
                                <b-list-group v-if="editingItem.medicine_boxes[0].length > 0">
                                    <div>

                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>идентификационный номер упаковки</b>
                                            <span variant="primary" pill>
                       {{ editingItem.medicine_boxes[0].box_id ? editingItem.medicine_boxes[0].box_id : '_ _ _' }}
                    </span>
                                        </b-list-group-item>

                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>идентификационный номер типа упаковки</b>
                                            <span variant="primary" pill>
                       {{
                                                editingItem.medicine_boxes[0].box_type_id ? editingItem.medicine_boxes[0].box_type_id : '_ _ _'
                                                }}
                    </span>
                                        </b-list-group-item>

                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>название типа упаковки</b>
                                            <span variant="primary" pill>
                       {{
                                                editingItem.medicine_boxes[0].box_type_name ? editingItem.medicine_boxes[0].box_type_name : '_ _ _'
                                                }}
                    </span>
                                        </b-list-group-item>

                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>вид упаковки</b>
                                            <span variant="primary" pill>
                       {{ editingItem.medicine_boxes[0].box_kind ? editingItem.medicine_boxes[0].box_kind : '_ _ _' }}
                    </span>
                                        </b-list-group-item>

                                        <b-list-group-item class="d-flex justify-content-between align-items-center">
                                            <b>отображение в торговом наименовании <br>дозы/концентрации</b>
                                            <span variant="primary" pill>
                       {{ editingItem.medicine_boxes[0].quantity ? editingItem.medicine_boxes[0].quantity : '_ _ _' }}
                    </span>
                                        </b-list-group-item>
                                    </div>
                                    <b-card border-variant="info"
                                            header="Лекарственная форма"
                                            header-bg-variant="info"
                                            header-text-variant="white"
                                            align="center"
                                            class="mt-3">
                                        <div>
                                            <b-card-text>
                                                <b-list-group>
                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>идентификационный номер лекарственной формы</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine_boxes[0].medicine_forms[0].medicine_form_item_id ? editingItem.medicine_boxes[0].medicine_forms[0].medicine_form_item_id : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>
                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>название лекарственной формы</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine_boxes[0].medicine_forms[0].medicine_form_item_name ? editingItem.medicine_boxes[0].medicine_forms[0].medicine_form_item_name : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>
                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>идентификационный номер группы лекарственных форм</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine_boxes[0].medicine_forms[0].medicine_form_id ? editingItem.medicine_boxes[0].medicine_forms[0].medicine_form_id : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>
                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>название группы лекарственных форм</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine_boxes[0].medicine_forms[0].medicine_form_name ? editingItem.medicine_boxes[0].medicine_forms[0].medicine_form_name : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>
                                                </b-list-group>
                                            </b-card-text>
                                        </div>
                                        <b-card border-variant="info"
                                                header="состав"
                                                header-bg-variant="info"
                                                header-text-variant="white"
                                                align="center"
                                                class="mt-3">
                                            <b-card-text>
                                                <b-list-group>

                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>идентификационный номер группы лекарственных форм</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine_boxes[0].medicine_forms[0].compositions[0] && editingItem.medicine_boxes[0].medicine_forms[0].compositions[0].composition_id
                                                                ? editingItem.medicine_boxes[0].medicine_forms[0].compositions[0].composition_id : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>

                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>приставка на русском</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine_boxes[0].medicine_forms[0].compositions[0].infix_ru
                                                                ? editingItem.medicine_boxes[0].medicine_forms[0].compositions[0].infix_ru : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>

                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>приставка на узбекском</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine_boxes[0].medicine_forms[0].compositions[0].infix_uz
                                                                ? editingItem.medicine_boxes[0].medicine_forms[0].compositions[0].infix_uz : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>

                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>приставка на английском</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine_boxes[0].medicine_forms[0].compositions[0].infix_en
                                                                ? editingItem.medicine_boxes[0].medicine_forms[0].compositions[0].infix_en : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>

                                                    <b-list-group-item
                                                            class="d-flex justify-content-between align-items-center">
                                                        <b>количества(доза / концентрация) веществ <br>в составе
                                                            лекарственного препарата</b>
                                                        <span variant="primary" pill>
                       {{
                                                            editingItem.medicine_boxes[0].medicine_forms[0].compositions[0].quantity
                                                                ? editingItem.medicine_boxes[0].medicine_forms[0].compositions[0].quantity : '_ _ _'
                                                            }}
                    </span>
                                                    </b-list-group-item>
                                                </b-list-group>
                                            </b-card-text>
                                        </b-card>
                                    </b-card>
                                </b-list-group>
                            </b-card-text>
                        </b-card>
                    </b-card-group>

                    <b-card-group deck class="p-2">
                        <b-card border-variant="primary"
                                header="референтная ценаобразование"
                                header-bg-variant="primary"
                                header-text-variant="white"
                                align="center">
                            <b-card-text>
                                <b-list-group v-if="editingItem.reference_price">

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>название валюты</b>
                                        <span variant="primary" pill>
                       {{
                                            editingItem.reference_price.currency_name ? editingItem.reference_price.currency_name : '_ _ _'
                                            }}
                    </span>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>дата установки референтной цены лекарственного препарата с учетом
                                            упаковки</b>
                                        <span variant="primary" pill>
                       {{ editingItem.reference_price.price_date ? editingItem.reference_price.price_date : '_ _ _' }}
                    </span>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>предельная цена лекарственного препарата с учетом упаковки</b>
                                        <span variant="primary" pill>
                       {{ editingItem.reference_price.price ? editingItem.reference_price.price : '_ _ _' }}
                    </span>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>оптовая цена лекарственного препарата с учетом упаковки</b>
                                        <span variant="primary" pill>
                       {{
                                            editingItem.reference_price.wholesale_price ? editingItem.reference_price.wholesale_price : '_ _ _'
                                            }}
                    </span>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>розничная цена лекарственного препарата с учетом упаковки</b>
                                        <span variant="primary" pill>
                       {{
                                            editingItem.reference_price.retail_price ? editingItem.reference_price.retail_price : '_ _ _'
                                            }}
                    </span>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>предельная цена в базовой валюте лекарственного препарата с учетом
                                            упаковки</b>
                                        <span variant="primary" pill>
                       {{ editingItem.reference_price.price_base ? editingItem.reference_price.price_base : '_ _ _' }}
                    </span>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>оптовая цена в базовой валюте лекарственного препарата с учетом упаковки</b>
                                        <span variant="primary" pill>
                       {{
                                            editingItem.reference_price.wholesale_price_base ? editingItem.reference_price.wholesale_price_base : '_ _ _'
                                            }}
                    </span>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <b>розничная цена в базовой валюте лекарственного препарата с учетом
                                            упаковки</b>
                                        <span variant="primary" pill>
                       {{
                                            editingItem.reference_price.retail_price_base ? editingItem.reference_price.retail_price_base : '_ _ _'
                                            }}
                    </span>
                                    </b-list-group-item>

                                </b-list-group>
                            </b-card-text>
                        </b-card>
                        <b-card border-variant="primary"></b-card>
                    </b-card-group>
                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
</template>
<script>
import integratsiyaService from "@/shared/services/integratsiya.service";

const MAIN_API_URL = 'customs-product';
import {bus} from "@/main";
import crudAndListsService from "@/shared/services/crud_and_list.service"

export default {
    name: "View",
    data() {
        return {
            title: this.$t('submodules.integration.farmasevtika_info.fullTitle'),
            editingItem: {},
            statuses: []
        }
    },
    computed: {
        items() {
            let result = [];
            for (const index in this.editingItem) {
                if (this.labels[index]) {
                    result.push({
                        label: this.labels[index],
                        value: this.editingItem[index],
                    });
                }
            }
            return result;
        },
        labels() {
            return {
                infoDateOfIssue: this.$t('submodules.integration.customs_product.infoDateOfIssue'),
                infoMode: this.$t('submodules.integration.customs_product.infoMode'),
                infoShipperAddress: this.$t('submodules.integration.customs_product.infoShipperAddress'),
                infoShipperName: this.$t('submodules.integration.customs_product.infoShipperName'),
                tifTnCode: this.$t('submodules.integration.customs_product.tifTnCode'),
                productName: this.$t('submodules.integration.customs_product.productName'),
                unitName: this.$t('submodules.integration.customs_product.unitName'),
                productWeight: this.$t('submodules.integration.customs_product.productWeight'),
                productWeightUnit: this.$t('submodules.integration.customs_product.productWeightUnit'),
                productAmount: this.$t('submodules.integration.customs_product.productAmount'),
                infoDollarExchangeRate: this.$t('submodules.integration.customs_product.infoDollarExchangeRate'),
                infoConsigneeName: this.$t('submodules.integration.customs_product.infoConsigneeName'),
                infoConsigneeAddress: this.$t('submodules.integration.customs_product.infoConsigneeAddress'),
                productStatisticalValue: this.$t('submodules.integration.customs_product.productStatisticalValue'),
                productStatisticalValueUnit: this.$t('submodules.integration.customs_product.productStatisticalValueUnit'),
            }
        }
    },
    methods: {
        goBack() {
            bus.leaveWithConfirm = true
            if (this.goBackRoute && this.goBackRoute.name) {
                this.$router.push(this.goBackRoute)
            } else {
                this.$router.go(-1)
            }
        },
        async handleCreated() {
            integratsiyaService.getFarmasevtikaInformationByBoxGroupId(this.$route.params.id, true)
                .then(res => {
                    this.editingItem = res.data[0];
                })
                .catch(e => {
                    this.tableItems = [];
                    this.totalItems = 0;
                    this.loadingTableItems = false
                })
        }
    },
    async created() {
        await this.handleCreated();
    }
}
</script>
<style>
.card-header {
    background: white;
}
</style>