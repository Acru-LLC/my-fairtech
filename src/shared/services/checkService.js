import ApiService from "@/shared/services/api.service";

const checkService = {
  dxaVisaDataGetFileByQrcode(applicationId) {
    return ApiService.get(`/dxa-visa-data/get-file-by-qrcode/${applicationId}`)
  },
  pharmCheckOutside(data){
    return ApiService.post(`/pharm/checkOutside?phoneNumber=${data.phoneNumber ? data.phoneNumber : ''}&pinfl=${data.pinfl ? data.pinfl : ''}`)
  },

  //   sud xabarnomasi
  courtCheckOnline(data){
    return ApiService.post(`/complaens_info_case_field/get-work-number?stir=${data.stir ? data.stir : ''}&pinfl=${data.pinfl ? data.pinfl : ''}`)
  },

  // online sud qarori
  onlineSudQarori(data){
    return ApiService.post(`/complaens_info_case_field/get-work-qaror?stir=${data.stir ? data.stir : ''}&pinfl=${data.pinfl ? data.pinfl : ''}`)
  },

  // sud jadvali
  courtTable(data){
    return ApiService.post(`/complaens_info_case_field/get-works-soato-date?soato=${data.soato ? data.soato : ''}&date=${data.date ? data.date : ''}`)
  },
  // Online kuzatuv
  onlineKuzatuv(data){
    return ApiService.post(`/complaens_info_case_field/get-all-workNumber?workNumber=${data.workNumber ? data.workNumber : ''}&pinfl=${data.pinfl ? data.pinfl : ''}&stir=${data.stir ? data.stir : ''}`)
  },
  getProductInfo(data) {
    return ApiService.post(`price_sum/parents-table-outer?code=${data.code}`)
  },
  getDexqonInfo(data) {
    return ApiService.get(`price_market/get/type-only-data-outer?type=${data.type}&soato=${data.soato}&productId=${data.productId}`);
  },
  getYirikInfo(data) {
    return ApiService.get(`price_market/get/type-only-data-outer?type=${data.type}&soato=${data.soato}&productId=${data.productId}`);
  },
  getKichikInfo(data) {
    return ApiService.get(`price_market/get/type-only-data-outer?type=${data.type}&soato=${data.soato}&productId=${data.productId}`);
  },
  getProductById(id) {
    return ApiService.get(`price_product/get-with-child-outer/${id}`)
  },
  getAllBySearchs(data){
    return ApiService.post(`/price_sum/one-product-all-sums-outer?productId=${data.productId}&marketId1=${data.marketId1}&marketId2=${data.marketId2}&marketId3=${data.marketId3}&soato=${data.soato}`)
  }

}

export default checkService
