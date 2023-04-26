import ApiService from "@/shared/services/api.service";

const checkService = {
  dxaVisaDataGetFileByQrcode(applicationId) {
    return ApiService.get(`/dxa-visa-data/get-file-by-qrcode/${applicationId}`)
  },
}

export default checkService;