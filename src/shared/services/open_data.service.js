import ApiService from "@/shared/services/api.service";

const openDataService = {
    createToken: function (code, token, withLoader = true) {
        return ApiService.post(`open-data/object-token/create-token/${code}?token=${token}`, {}, withLoader);
    },
    post: function(url, payload, withLoader = false) {
        return ApiService.post(url, payload, withLoader);
    }
};
export default openDataService;
