import ApiService from "../../../../shared/services/api.service";

const Main_Url = 'report/general-inventory-reports'

const InventoryReportService = {
    create(constructionId, data) {
        return ApiService.post(`${Main_Url}/create/${constructionId}`, data)
    },
    update(constructionId, id, data) {
        return ApiService.put(`${Main_Url}/update/${constructionId}/${id}`, data)
    },
    get(id) {
        return ApiService.get(`${Main_Url}/get/${id}`)
    },
    delete(id) {
        return ApiService.delete(`${Main_Url}/delete/${id}`)
    },
    list(constructionId, payload) {
        return ApiService.post(`${Main_Url}/list-search-by-owner/${constructionId}`, payload)
    }
}

export default InventoryReportService