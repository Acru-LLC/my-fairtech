import ApiService from "@/shared/services/api.service";

const priceStockService = {
  listEmbeddingRealization(keyword = '', payload = {}, withLoader = false){
    return ApiService.post(`price/stock/product/list/embedding-realization?keyword=${keyword}`, { ...payload, page: payload.page-1 }, withLoader)
  },
  getEmbeddingRealizationById(id = '', withLoader = false){
    return ApiService.post(`price/stock/product/get-embedding-realization-by-id/${id}`, {}, withLoader)
  },
  uploadByExcelEmbeddingRealization(file, withLoader = true){
    const formData = new FormData()
    formData.append('file', file.file);
    return ApiService.formDataFile(`price/stock/product/uploadByExcel/embedding-realization`, formData, withLoader)
  },

  listRealization(keyword = '', payload = {}, withLoader = false){
    return ApiService.post(`price/stock/product/list/realization?keyword=${keyword}`, { ...payload, page: payload.page-1 }, withLoader)
  },
  getRealizationById(id = '', withLoader = false){
    return ApiService.post(`price/stock/product/get-realization-by-id/${id}`, {}, withLoader)
  },
  uploadByExcelRealization(file, withLoader = true){
    const formData = new FormData()
    formData.append('file', file.file);
    return ApiService.formDataFile(`price/stock/product/uploadByExcel/realization`, formData, withLoader)
  },
};
export default priceStockService;