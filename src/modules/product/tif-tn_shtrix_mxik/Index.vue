<template>
    <div>
        <div style="border:1px solid #2b675b; padding:15px; margin: 10px; border-radius: 7px"
             v-for="(item, index) in resTableItems" :key="index"
             :value="item.id"
        >
            <div class="pl-5 pr-5 pt-2">
                <b-row>
                    <b-col cols="1" style="text-align: center">
                        <span style="opacity: 0.7; color: #2b675b">{{
                                $t('bojxona_info.number_commodity')
                            }}</span> <br>
                        <span style="color: #2b675b; font-weight: lighter; font-size: 14px">  {{
                                item.number_commodity
                            }}</span>
                    </b-col>
                    <b-col cols="3" style="text-align: center">
                        <span style="opacity: 0.7; color: #2b675b">{{
                                $t('bojxona_info.receiver_name')
                            }}</span> <br>
                        <span style="color: #2b675b; font-weight: lighter; font-size: 14px">  {{
                                item.receiver_name
                            }}</span>
                    </b-col>
                    <b-col cols="5" style="text-align: center">
                        <span style="opacity: 0.7; color: #2b675b">{{
                                $t('bojxona_info.product_name')
                            }}</span> <br>
                        <span style="color: #2b675b; font-weight: lighter; font-size: 14px">  {{
                                item.product_name
                            }}</span>
                    </b-col>
                    <b-col cols="2" style="text-align: center">
                          <span style="opacity: 0.7; color: #2b675b">{{
                                  $t('bojxona_info.made_in_country')
                              }}</span> <br>
                        <span style="color: #2b675b; font-weight: lighter; font-size: 14px; text-align: center !important;">  {{
                                item.made_in_country
                            }}</span>
                    </b-col>

                    <b-col cols="1" style="text-align: center">
                        <span style="opacity: 0.7; color: #2b675b">{{
                                $t('bojxona_info.tn_code')
                            }}</span> <br>
                        <span style="color: #2b675b; font-weight: lighter; font-size: 14px">  {{
                                item.tn_code
                            }}</span>
                    </b-col>

                </b-row>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "methods2",
    props: {
        resTableItems: {
            type: Array,
            default: () => {
            },
        },
    },
    data() {
        return {
            items: []
        }
    },
    methods: {},
}
</script>
