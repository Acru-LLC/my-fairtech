import ApiService from "@/shared/services/api.service";

const adMonitoringService = {
    getEAuctionShortInfoById(id, withLoader = true){
        return ApiService.get(`contractor-advertising-construction/get-eAuction-short-info/${id}`, withLoader);
    },
    getEAuctionAdditionalInfoById(id, withLoader = true){
        return ApiService.get(`contractor-advertising-construction/get-eAuction-additional-info/${id}`, withLoader);
    },
};

export default adMonitoringService;