import ApiService from "@/shared/services/api.service";

export default {
    removeLetter(letterId) {
        return ApiService.delete(`/letter/delete/${letterId}`)
    },
    removeFile(letterId) {
        return ApiService.delete(`/letterAttachedFile/delete/${letterId}`)
    },
    getAttachedFilesById(letterId) {
        return ApiService.get(`/letterAttachedFile/list/${letterId}`)
    },
    createAttachedFile(letterId, file) {
        let formData = new FormData()
        formData.append("file", file)
        return ApiService.formDataFile(`/letterAttachedFile/create/${letterId}`, formData)
    },
    getListDocumentType({ params, search }, v) {
        return ApiService.post(`/docType/list?search=${search}&code=${v}`, params)
    },
    convertToPdfByApi(config) {
        return ApiService.post(`/letter/callback?type=convert`, config)
    },
    getList({ params, search }) {
        return ApiService.post(`/document/list`, params)
    },
    getById(id) {
        return ApiService.get(`/letter/get-by-id/${id}`)
    },
    getIncomeTotalCount() {
        return ApiService.get(`/letter/totalCount`)
    },
    upload(data) {
        let query_data = `?fileName=${data.name}&regNumber=${data.regNumber}&date=${data.date}&docTypeId=${data.docTypeId}`
        return ApiService.get(`/letter/upload${query_data}`)
    },
    getListLetter({ params, search }) {
        return ApiService.post(`/letter/draftList?search=${search}`, params)
    },
    getListLetterIncome({ params, search }, action) {
        return ApiService.post(`/letter/incomeList?search=${search}&action=${action}`, params)
    },
    getListLetterSend({ params, search }) {
        return ApiService.post(`/letter/sendList?search=${search}`, params)
    },
    getByIdLetter(id) {
        return ApiService.get(`/letter/get-by-id/${id}`)
    },
    sendDoc(id, params) {
        return ApiService.post(`/letter/send/${id}`, params)
    },
    signDoc(payload, id, x, y, page) {
        return ApiService.post(`/letter/makeSigned/${id}?x=${x}&y=${y}&page=${page-1}`, payload)
    },
    getReceivers(id) {
        return ApiService.get(`/letter/letterInfo/${id}`)
    },
    makeAgree(id) {
        return ApiService.get(`/letter/makeAgreed/${id}`)
    },
    makeReview(id) {
        return ApiService.get(`/letter/makeViewed/${id}`)
    },
    saveRejected(letterId, id, comment) {
        return ApiService.get(`/letter/cancelled/${letterId}/${id}?comment=${comment}`)
    },
    saveQrCode(left, top, page) {
        return ApiService.get(`/letter/letterAsPdf?x=${left}&y=${top}&page=${page-1}`)
    },
    letterQRCODE(letterId) {
        return ApiService.get(`/letter/letterQRCode/${letterId}`)
    },
    getDocPdf(letterId) {
        return ApiService.get(`/letter/convertLetterToPdf/${letterId}`)
    },


}
