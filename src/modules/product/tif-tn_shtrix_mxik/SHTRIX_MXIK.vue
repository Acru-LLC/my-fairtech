<template>
    <div v-if="resTableItems">
        <b-row>
            <b-col cols="3">
                <div style="border:1px solid #2b675b; padding:15px; border-radius: 7px">
                    <img v-if="(resTableItems.marking_info && resTableItems.marking_info.catalog_data[0] && resTableItems.marking_info.catalog_data[0].product_image_url)"
                         class="honeycomb-cell__image" style=" width: 100%; height: 400px; object-fit: contain;"
                         :src="resTableItems.marking_info && resTableItems.marking_info.catalog_data.length > 0 && resTableItems.marking_info.catalog_data[0].product_image_url">
                    <img v-else class="honeycomb-cell__image" style=" width: 100%; height: 400px; object-fit: contain;"
                         src="./no_foto.png" alt="">
                </div>
            </b-col>
            <b-col cols="9">
                <div class="pl-5 pr-5 pt-2">
                    <b-row class="mt-4">
                        <b-col cols="5">
                            <span v-if="resTableItems.mxik_code && resTableItems.mxik_code.substring(0,3) < 99"
                                  style="opacity: 0.7; color: #2b675b">{{ $t('product_info.name') }}</span>
                            <span v-else style="opacity: 0.7; color: #2b675b">{{
                                    $t('product_info.mxik_name')
                                }}</span>
                            <br>
                            <span style="color: #2b675b; font-weight: lighter; font-size: 14px"> {{
                                    (resTableItems.marking_info && resTableItems.marking_info.product_name && resTableItems.marking_info.product_name !== '' && resTableItems.marking_info.product_name !== null && resTableItems.marking_info.product_name !== undefined)
                                        ? resTableItems.marking_info.product_name : (resTableItems.mxik_info ? resTableItems.mxik_info.mxik_name : '---')
                                }}</span>
                        </b-col>
                        <b-col cols="5">
                            <span style="opacity: 0.7; color: #2b675b">{{ $t('product_info.MXIK_code') }}</span>
                            <br>
                            <span style="color: #2b675b; font-weight: lighter; font-size: 14px"> {{
                                    resTableItems.mxik_code
                                }}</span>
                        </b-col>
                    </b-row>
                    <!--                    resTableItems.mxik_code.substring(0,3) < 99-->
                    <b-row class="mt-4" v-if="resTableItems.mxik_code && resTableItems.mxik_code.substring(0,3) < 99">
                        <b-col cols="5">
                            <span style="opacity: 0.7; color: #2b675b">{{ $t('product_info.brand') }}</span> <br>
                            <span style="color: #2b675b; font-weight: lighter; font-size: 14px"> {{
                                    resTableItems.mxik_info && resTableItems.mxik_info.brand_name
                                }}</span>
                        </b-col>
                        <b-col cols="5">
                            <span style="opacity: 0.7; color: #2b675b">{{
                                    $t('product_info.Shtrix_code')
                                }}</span> <br>
                            <span style="color: #2b675b; font-weight: lighter; font-size: 14px"> {{
                                    resTableItems.mxik_info && resTableItems.mxik_info.international_code
                                }}</span>
                        </b-col>
                    </b-row>
                    <b-row class="mt-4">
                        <b-col cols="5">
                            <span style="opacity: 0.7; color: #2b675b">{{ $t('product_info.group') }}</span> <br>
                            <span style="color: #2b675b; font-weight: lighter; font-size: 14px"> {{
                                    resTableItems.mxik_info && resTableItems.mxik_info.group_name
                                }}</span>
                        </b-col>
                        <b-col cols="5">
                            <span style="opacity: 0.7; color: #2b675b">{{ $t('product_info.class') }}</span> <br>
                            <span style="color: #2b675b; font-weight: lighter; font-size: 14px"> {{
                                    resTableItems.mxik_info && resTableItems.mxik_info.class_name
                                }}</span>
                        </b-col>

                    </b-row>
                    <b-row class="mt-4">

                        <b-col cols="5">
                            <span style="opacity: 0.7; color: #2b675b">{{ $t('product_info.pozition') }}</span>
                            <br>
                            <span style="color: #2b675b; font-weight: lighter; font-size: 14px"> {{
                                    resTableItems.mxik_info && resTableItems.mxik_info.position_name
                                }}</span>
                        </b-col>
                        <b-col cols="5">
                            <span style="opacity: 0.7; color: #2b675b">{{
                                    $t('product_info.subpozition')
                                }}</span> <br>
                            <span style="color: #2b675b; font-weight: lighter; font-size: 14px"> {{
                                    resTableItems.mxik_info && resTableItems.mxik_info.sub_position_name
                                }}</span>
                        </b-col>
                    </b-row>

                    <b-row class="mt-4">
                        <b-button @click="openModal" class="ml-3 mr-3" block variant="outline-light"
                                  style="border:1px solid #2b675b;">
                            <i class="mdi mdi-arrow-expand-all"></i>
                            {{ $t("product_info.all") }}
                        </b-button>
                    </b-row>
                </div>

            </b-col>
        </b-row>
        <b-modal
            :no-close-on-backdrop="true"
            :hide-footer="true"
            :ok-title="$t('actions.yes')"
            :cancel-title="$t('actions.no')"
            @close="isModal == false"
            @cancel="isModal == false"
            size="xl"
            v-model="isModal"
        >
            <b-card>
                <!--                <div style="border:1px solid #2b675b; padding:15px; border-radius: 7px" class="text-center">-->
                <!--                   <span style="font-size: 1.3rem!important; line-height: 2rem!important;">-->
                <!--                       {{-->
                <!--                       resTableItems.mxik_info && resTableItems.mxik_info.mxik_name-->
                <!--                       }}-->
                <!--                   </span>-->
                <!--                </div>-->
                <div style="padding:15px; padding-top: 35px" class="text-center">
                   <span v-if="resTableItems.mxik_code && resTableItems.mxik_code.substring(0,3) < 99" style="font-size: 1.3rem!important; line-height: 2rem!important;">
                        {{
                           $t('product_info.xarakteristika')
                       }}
                   </span>
                    <span v-else style="font-size: 1.3rem!important; line-height: 2rem!important;">
                        {{
                            $t('product_info.xarakteristika_xizmat')
                        }}
                   </span>
                </div>
                <div style="border:1px solid #2b675b; padding:15px; border-radius: 7px">
                    <b-row>
                        <b-col cols="5"><b>{{ $t('product_info.MXIK_code') }}</b></b-col>
                        <b-col cols="7">
                            {{
                                resTableItems.mxik_code ? resTableItems.mxik_code : '_ _ _'
                            }}
                        </b-col>
                    </b-row>
                </div>
                <div style="border:1px solid #2b675b; padding:15px; border-radius: 7px" class="mt-2">
                    <b-row>
                        <b-col cols="5"><b>{{ $t('product_info.mxik_name') }}</b></b-col>
                        <b-col cols="7">
                            {{
                                resTableItems.mxik_info && resTableItems.mxik_info.mxik_name ? resTableItems.mxik_info && resTableItems.mxik_info.mxik_name : '_ _ _'
                            }}
                        </b-col>
                    </b-row>
                </div>
                <div v-show="resTableItems.mxik_code && resTableItems.mxik_code.substring(0,3) < 99"
                     style="border:1px solid #2b675b; padding:15px; border-radius: 7px" class="mt-2">
                    <b-row>
                        <b-col cols="5"><b>{{ $t('product_info.name') }}</b></b-col>
                        <b-col cols="7">
                            {{
                                resTableItems.marking_info && resTableItems.marking_info.product_name ? resTableItems.marking_info && resTableItems.marking_info.product_name : '_ _ _'
                            }}
                        </b-col>
                    </b-row>
                </div>
                <div v-show="resTableItems.mxik_code && resTableItems.mxik_code.substring(0,3) < 99"
                     style="border:1px solid #2b675b; padding:15px; border-radius: 7px" class="mt-2">
                    <b-row>
                        <b-col cols="5"><b>{{ $t('product_info.Shtrix_code') }}</b></b-col>
                        <b-col cols="7">
                            {{
                                resTableItems.mxik_info && resTableItems.mxik_info.international_code ? resTableItems.mxik_info && resTableItems.mxik_info.international_code : '_ _ _'
                            }}
                        </b-col>
                    </b-row>
                </div>

                <div style="padding:15px; padding-top: 35px" class="text-center"
                     v-show="resTableItems.mxik_code && resTableItems.mxik_code.substring(0,3) < 99">
                   <span style="font-size: 1.3rem!important; line-height: 2rem!important;">
                       {{
                           $t('product_info.alll')
                       }}
                   </span>
                </div>

                <div v-show="resTableItems.mxik_code && resTableItems.mxik_code.substring(0,3) < 99"
                     style="border:1px solid #2b675b; padding:15px; border-radius: 7px; max-height:300px; !important; overflow:auto;"
                     class="mt-3">
                    <div
                        style="max-height:300px; !important; overflow:auto;"
                        v-for="(item, index) in resTableItems.marking_info &&  resTableItems.marking_info.catalog_data &&  resTableItems.marking_info.catalog_data[0] && resTableItems.marking_info.catalog_data[0].good_attrs"
                        :key="index">
                        <h6><b>{{ item.attr_name }}</b>: {{ item.attr_value }} </h6>
                    </div>
                </div>

                <div style="padding:15px; padding-top: 35px" class="text-center">
                   <span style="font-size: 1.3rem!important; line-height: 2rem!important;">
                       {{
                           $t('product_info.packages')
                       }}
                   </span>
                </div>

                <div style="border:1px solid #2b675b; padding:15px; border-radius: 7px; max-height:300px; !important; overflow:auto;"
                     class="mt-3">
                    <b-row>
                        <b-col cols="5"><b>{{$t('product_info.units')}}</b></b-col>
                        <b-col cols="7"><b>{{$t('product_info.code')}}</b></b-col>
                    </b-row>
                </div>


                <div class="mt-1"  v-for="(item, index) in resTableItems.mxik_info &&  resTableItems.mxik_info.packages"
                     :key="index"
                     style="border:1px solid #2b675b; padding:15px; border-radius: 7px">
                    <b-row>
                        <b-col cols="5">{{    item.package_name ? item.package_name : '_ _ _' }}</b-col>
                        <b-col cols="7">
                            {{
                                item.package_code ? item.package_code : '_ _ _'
                            }}
                        </b-col>
                    </b-row>
                </div>

            </b-card>
        </b-modal>
    </div>
</template>

<script>

export default {
    props: {
        resTableItems: {
            type: Object,
            default: () => {
            },
        },
    },
    data() {
        return {
            isModal: false,
            tableItems: []
        }
    },
    methods: {
        openModal() {
            this.isModal = true
        }
    },
    created() {
    },
}
</script>

<style lang="scss" scoped>

</style>
