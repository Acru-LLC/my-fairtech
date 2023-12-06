<template>
    <div v-if="resTableItems">
        <b-row>
            <b-col cols="3">
                <div style="border:1px solid #2b675b; padding:15px; border-radius: 7px">
                    <img class="honeycomb-cell__image" style=" width: 100%; height: 500px; object-fit: contain;"
                         :src="resTableItems.marking_info && resTableItems.marking_info.catalog_data.length > 0 && resTableItems.marking_info.catalog_data[0].product_image_url">
                </div>
            </b-col>
            <b-col cols="9">
                <div class="pl-5 pr-5 pt-2">
                    <b-row>
                        <b-col cols="5">
                            <span style="opacity: 0.7; color: #2b675b">{{ $t('system.product_info.name') }}</span> <br>
                            <span style="color: #2b675b; font-weight: lighter; font-size: 14px"> {{
                                    resTableItems.marking_info && resTableItems.marking_info.product_name
                                }}</span>
                        </b-col>
                        <b-col cols="5">
                            <span style="opacity: 0.7; color: #2b675b">{{ $t('system.product_info.brand') }}</span> <br>
                            <span style="color: #2b675b; font-weight: lighter; font-size: 14px"> {{
                                    resTableItems.mxik_info && resTableItems.mxik_info.brand_name
                                }}</span>
                        </b-col>

                    </b-row>
                    <b-row class="mt-4">

                        <b-col cols="5">
                            <span style="opacity: 0.7; color: #2b675b">{{ $t('system.product_info.MXIK_code') }}</span>
                            <br>
                            <span style="color: #2b675b; font-weight: lighter; font-size: 14px"> {{
                                    resTableItems.mxik_code
                                }}</span>
                        </b-col>
                        <b-col cols="5">
                            <span style="opacity: 0.7; color: #2b675b">{{
                                    $t('system.product_info.Shtrix_code')
                                }}</span> <br>
                            <span style="color: #2b675b; font-weight: lighter; font-size: 14px"> {{
                                    resTableItems.mxik_info & resTableItems.mxik_info.international_code
                                }}</span>
                        </b-col>
                    </b-row>
                    <b-row class="mt-4">
                        <b-col cols="5">
                            <span style="opacity: 0.7; color: #2b675b">{{ $t('system.product_info.group') }}</span> <br>
                            <span style="color: #2b675b; font-weight: lighter; font-size: 14px"> {{
                                    resTableItems.mxik_info && resTableItems.mxik_info.group_name
                                }}</span>
                        </b-col>
                        <b-col cols="5">
                            <span style="opacity: 0.7; color: #2b675b">{{ $t('system.product_info.class') }}</span> <br>
                            <span style="color: #2b675b; font-weight: lighter; font-size: 14px"> {{
                                    resTableItems.mxik_info && resTableItems.mxik_info.class_name
                                }}</span>
                        </b-col>

                    </b-row>
                    <b-row class="mt-4">

                        <b-col cols="5">
                            <span style="opacity: 0.7; color: #2b675b">{{ $t('system.product_info.pozition') }}</span>
                            <br>
                            <span style="color: #2b675b; font-weight: lighter; font-size: 14px"> {{
                                    resTableItems.mxik_info && resTableItems.mxik_info.position_name
                                }}</span>
                        </b-col>
                        <b-col cols="5">
                            <span style="opacity: 0.7; color: #2b675b">{{
                                    $t('system.product_info.subpozition')
                                }}</span> <br>
                            <span style="color: #2b675b; font-weight: lighter; font-size: 14px"> {{
                                    resTableItems.mxik_info && resTableItems.mxik_info.sub_position_name
                                }}</span>
                        </b-col>
                    </b-row>
                </div>

            </b-col>
        </b-row>
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
}
</script>

<style lang="scss" scoped>

</style>