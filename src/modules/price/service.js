import ApiService from '@/shared/services/api.service'

export default {
    // yuridik-shaxs
    getYuridikShaxsData: async function (stir, withLoader = false) {
        let res = await ApiService.post(`/yuridik-shaxs/get-info?&tin=${stir}`, withLoader);
        return res;
    },
    searchListWithKeyword: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.post(
                `${mainUrl}/list-search/${appendUrl}?keyword=${myPayload.keyword ? myPayload.keyword : ''}&type=${myPayload.type ? myPayload.type : ''}`,
                myPayload, withLoader
            );
        } else {
            return ApiService.post(
                `${mainUrl}/list-search?keyword=${myPayload.keyword ? myPayload.keyword : ''}&type=${myPayload.type ? myPayload.type : ''}`,
                myPayload, withLoader = true
            );
        }
    },
    saveData(data) {
        return ApiService.post(`/price_sum/create?maxPrice=${data.maxPrice}&minPrice=${data.minPrice}&middleSum=${data.middleSum}&date=${data.date}&productId=${data.productId}&marketId=${data.marketId}&code=web`)
    },
    listEnteredPrice(url, payload, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        return ApiService.post(
            `${url}/list-searchSet?keyword=${myPayload.keyword ? myPayload.keyword : ''}`,
            myPayload, withLoader
        );
    },
}

