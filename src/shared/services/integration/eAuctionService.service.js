import ApiService from "@/shared/services/api.service";

const statisticsService = {
    getAdditionalInfo(infoId, withLoader = false) {
        return ApiService.get(`e-auction-info/get-additional-info/${infoId}`, withLoader);
    },
};
export default statisticsService;