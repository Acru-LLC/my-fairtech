import ApiService from "@/shared/services/api.service";

const checkService = {
  dxaVisaDataGetFileByQrcode(applicationId) {
    return ApiService.get(`/dxa-visa-data/get-file-by-qrcode/${applicationId}`)
  },
  pharmCheckOutside(data){
    return ApiService.post(`/pharm/checkOutside?phoneNumber=${data.phoneNumber ? data.phoneNumber : ''}&pinfl=${data.pinfl ? data.pinfl : ''}`)
  }
}

export default checkService
