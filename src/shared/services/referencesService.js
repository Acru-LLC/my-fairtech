import ApiService from '@/shared/services/api.service'

export default {
    extended(data, {id, applicationDxaId}) {
        return ApiService.post(`before-commission/application/application-review/extended?id=${id}&applicationDXAId=${applicationDxaId}`, data)
    },
    viewPdfById(letterId) {
        return ApiService.get(`/docSample/convertToPdf/${letterId}`)
    },
    saveHeader(file) {
        let formData = new FormData()
        formData.append("file", file)
        return ApiService.formDataFile(`/letter/saveHeader`, formData)
    },

    convert(data) {
        return ApiService.post(`/letter/letterConvert`, {html: data})
    },
    //DocType editor
    getListDocumentTypeEditor({params, search}) {
        return ApiService.post(`/docSample/list?search=${search}`, params)
    },

    createDocumentTypeEditor(text, data) {
        let payload = {
            ...data,
            body: text
        }
        return ApiService.post(`/docSample/create`, payload)
    },
    deleteDocumentTypeEditor(id) {
        return ApiService.delete(`/docSample/delete/${id}`)
    },
    updateDocumentTypeEditor(id, body) {
        return ApiService.post(`/docSample/update`, {id, body})
    },
    //Room
    getListRoom({params, search}) {
        return ApiService.post(`/meeting-room/list?search=${search}`, params)
    },
    createRoom(data) {
        return ApiService.post(`/meeting-room/create`, data)
    },
    deleteRoom(id) {
        return ApiService.delete(`/meeting-room/delete/${id}`)
    },
    updateRoom(data) {
        return ApiService.post(`/meeting-room/update`, data)
    },

    //ProjectTypes
    getListProjectTypes({params, search}) {
        return ApiService.post(`/directoryProjectType/list?search=${search}`, params)
    },
    createProjectTypes(data) {
        return ApiService.post(`/directoryProjectType/create`, data)
    },
    deleteProjectTypes(id) {
        return ApiService.delete(`/directoryProjectType/delete/${id}`)
    },
    updateProjectTypes(data) {
        return ApiService.post(`/directoryProjectType/update`, data)
    },


    //DocType
    getListDocumentType({params, search}) {
        return ApiService.post(`/docType/list?search=${search}`, params)
    },

    createDocumentType(data) {
        let formData = new FormData()
        formData.append("nameLt", data.nameLt)
        formData.append("nameRu", data.nameRu)
        formData.append("file", data.file)
        return ApiService.formDataFile(`/docType/create`, formData)
    },
    deleteDocumentType(id) {
        return ApiService.delete(`/docType/delete/${id}`)
    },
    updateDocumentType(data) {
        return ApiService.post(`/docType/update`, data)
    },


    //DateTypes
    getListDateTypesChild({params, search}, id) {
        return ApiService.post(`/dateType/listByParentId/${id}?search=${search}`, params)
    },
    getListDateTypes({params, search}) {
        return ApiService.post(`/dateType/list?search=${search}`, params)
    },
    createDateTypes(data, id = null) {
        if (id) {
            data.parentId = id
        }
        return ApiService.post(`/dateType/create`, data)
    },
    deleteDateTypes(id) {
        return ApiService.delete(`/dateType/delete/${id}`)
    },
    updateDateTypes(data, id) {
        if (id) {
            data.parentId = id
        }
        return ApiService.post(`/dateType/update`, data)
    },

    listSearchTemplateSample(keyword= '', type= '', payload = {page: 0, itemsPerPage: 20}, withLoader = true) {
        return ApiService.post(`/template-sample/list-search?keyword=${keyword}&type=${type}`, payload, withLoader)
    },
    getTemplateSample(id) {
        return ApiService.get(`/template-sample/get-by-id/${id}`, true)
    },
    deleteTemplateSample(id) {
        return ApiService.delete(`/template-sample/delete/${id}`, true)
    },
    updateTemplateSample(id, writtenName, type, file) {
        let formData = new FormData()
        formData.append("file", file?.file)
        return ApiService.put(`/template-sample/update/${id}?writtenName=${writtenName}&type=${type}`, formData, true)
    },
    createTemplateSample(writtenName, type, file) {
        let formData = new FormData()
        formData.append("file", file?.file)
        return ApiService.post(`/template-sample/create?writtenName=${writtenName}&type=${type}`, formData, true)
    },
}
