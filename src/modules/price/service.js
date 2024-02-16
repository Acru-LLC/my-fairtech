import ApiService from '@/shared/services/api.service'

export default {
    // yuridik-shaxs
    getYuridikShaxsData: async function (stir, withLoader = false) {
        let res = await ApiService.post(`/yuridik-shaxs/get-info?&tin=${stir}`, withLoader);
        return res;
    },
    // yuridik-shaxs
    getYuridikShaxsDataByPinfl: async function (pinfl, withLoader = false) {
        let res = await ApiService.post(`/ytt/get-info?pinfl=${pinfl}`, withLoader);
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
    searchListWithKeywordAandType: function (type, code, mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.post(
                `${mainUrl}/list-search/${appendUrl}?keyword=${myPayload.keyword ? myPayload.keyword : ''}&code=${code ? code : ''}&type=${type ? type : ''}`,
                myPayload, withLoader
            );
        } else {
            return ApiService.post(
                `${mainUrl}/list-search?keyword=${myPayload.keyword ? myPayload.keyword : ''}&code=${code ? code : ''}&type=${type ? type : ''}`,
                myPayload, withLoader
            );
        }
    },
    searchListWithKeyword1: function (mainUrl, payload, appendUrl, withLoader = false) {
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
    async createWithFiles(bodyFormData, url) {
        const requestData = {
            method: 'post',
            url: '/price_sum/create',
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data'}
        };
        try {
            const response = await ApiService.customRequest(requestData);
            return response.data;
        } catch (error) {
            return error.response.data
        }
    },
    saveData(data) {
        return ApiService.post(`/price_sum/create?maxPrice=${data.maxPrice}&minPrice=${data.minPrice}&middleSum=${data.middleSum}&productId=${data.productId}&marketId=${data.marketId}&code=web`)
    },
    listEnteredPrice(date, url, payload, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        return ApiService.post(
            `${url}/list-searchSet?keyword=${myPayload.keyword ? myPayload.keyword : ''}&date=${date ? date : ''}`,
            myPayload, withLoader
        );
    },
    searchListWithKeywordOuter: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.post(
                `${mainUrl}/list-search-outer/${appendUrl}?keyword=${myPayload.keyword ? myPayload.keyword : ''}&type=${myPayload.type ? myPayload.type : ''}`,
                myPayload, withLoader
            );
        } else {
            return ApiService.post(
                `${mainUrl}/list-search-outer?keyword=${myPayload.keyword ? myPayload.keyword : ''}&type=${myPayload.type ? myPayload.type : ''}`,
                myPayload, withLoader = true
            );
        }
    },
}

