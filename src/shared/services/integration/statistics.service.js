import ApiService from "@/shared/services/api.service";
const statisticsService = {
    getStatisticInfo(params, withLoader = false) {
        return ApiService.post(`statistic-committee/deploy-information`, params, withLoader);
    },
    getStatisticInfoListWithFilter(regionSoatos, districtSoatos, productCodes, issueDate, withLoader = false) {
        return ApiService.post(`statistic-committee/list-with-filter?regionSoatos=${regionSoatos}&districtSoatos=${districtSoatos}&productCodes=${productCodes}&issueDate=${issueDate}`, {},  withLoader);
    },
    getStatisticInfoProductCodes(withLoader = false) {
        return ApiService.get(`statistic-committee/get-product-codes`, withLoader);
    },
    getRegionsWithSoato(){
        return ApiService.get('statistic-committee/get-regions-with-soato')
    },
    getDistrictsWithSoato(regionId = null){
        let url = 'statistic-committee/get-districts-with-soato';
        if (regionId) url += "?regionIds=" + regionId
        return ApiService.get(url)
    },
    getGeograficalRegionsWithSoatos() {
        return ApiService.get('geographical-region/get-region-soatos')
    },
    getGeograficalDistrictsWithSoatos(parentId) {
        return ApiService.get(`geographical-region/get-district-soatos?parentId=${parentId}`)
    }
};
export default statisticsService;