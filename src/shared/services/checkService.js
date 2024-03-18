import ApiService from "@/shared/services/api.service";

const checkService = {
  dxaVisaDataGetFileByQrcode(applicationId) {
    return ApiService.get(`/dxa-visa-data/get-file-by-qrcode/${applicationId}`)
  },
  pharmCheckOutside(data){
    return ApiService.post(`/pharm/checkOutside?phoneNumber=${data.phoneNumber ? data.phoneNumber : ''}&pinfl=${data.pinfl ? data.pinfl : ''}`)
  },
  getProductInfo(data) {
    return ApiService.post(`price_sum/parents-table?code=${data.code}`)
  },
  getDexqonInfo(data) {
    return ApiService.get(`price_market/get/type-only-data?type=${data.type}&soato=${data.soato}&productId=${data.productId}`);
  },
  getYirikInfo(data) {
    return ApiService.get(`price_market/get/type-only-data?type=${data.type}&soato=${data.soato}&productId=${data.productId}`);
  },
  getKichikInfo(data) {
    return ApiService.get(`price_market/get/type-only-data?type=${data.type}&soato=${data.soato}&productId=${data.productId}`);
  },
  getProductById(id) {
    return ApiService.get(`price_product/get-with-child/${id}`)
  },
  getAllBySearchs(data){
    return ApiService.post(`/price_sum/one-product-all-sums?productId=${data.productId}&marketId1=${data.marketId1}&marketId2=${data.marketId2}&marketId3=${data.marketId3}&soato=${data.soato}`)
  }
  
}

export default checkService
