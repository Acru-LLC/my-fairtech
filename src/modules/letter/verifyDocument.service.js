import ApiService from '@/shared/services/api.service'

const VerifyDocumentService = {
    verifyDocument: function (id) {
        return ApiService.get(`/verify/document/${id}`);
    },
    verifyDocumentById(id) {
        return ApiService.get(`dxa-visa-data/get-file/${id}`);
    },
    verifyResolution: function (id) {
        return ApiService.get(`/dxa-visa-data/get-file-by-qrcode/${id}`);
    },
    downloadResolutionPdf: function (id) {
        return ApiService.getFile(`/document/assignment/DownloadResolutionPdf/${id}?__lang=${TokenService.getLocale()}`)
    },
};
export default VerifyDocumentService;