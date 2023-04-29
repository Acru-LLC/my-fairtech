import ApiService from '@/shared/services/api.service'
import projectService from '@/shared/services/projectService'
// import {cxonfigure} from 'vee-validate'

export default {
    fetchChartDataApplicationsByStatusesForYearForDXA(year) {
        return ApiService.get(`application-dxa/get-data-for-chart-by-month?year=${year}`)
    },
    giveVisaForDXA(applicationId, params) {
        return ApiService.post(`letter/get-visa/${applicationId}?employeeId=${params.id}&comment=${params.comment}`)
    },
    sendToCommissionFromDxa(applicationId, commissionTypeId, comment = '') {
        return ApiService.post(`letter/send-to-commission/from-dxa/${applicationId}/${commissionTypeId}?comment=${comment}`)
    },
    SignatureGiveVisaForDXA(data, bodyDate) {
        return ApiService.post(`letter/approve-visa/${data.applicationId}?employeeId=${data.employeeId}&letterId=${data.letterId}&comment=${bodyDate.comment}&giveVisaDate=${bodyDate.giveVisaDate}`)
    },
    fetchChartDataCurrentApplicationStatusesForDXA() {
        return ApiService.get(`application-dxa/get-data-for-chart`)
    },
    fetchChartDataApplicationsByStatusesForYear(year) {
        return ApiService.get(`before-commission/application/get-data-for-chart-by-month?year=${year}`)
    },
    fetchChartDataCurrentApplicationStatuses() {
        return ApiService.get(`before-commission/application/get-data-for-chart`)
    },
    listApplicationsByStatus: function (payload, status = '', keyword = '') {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        return ApiService.post(`before-commission/application/list-search-by-application-status?keyword=${keyword}&status=${status ? status : ''}`, myPayload)
    },
    listDXA_ApplicationsByStatus: function (payload, status = '', keyword = '', activeDXATab) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        return ApiService.post(`application-dxa/list-search/by-status?keyword=${keyword}&status=${status ? status : ''}&applicationType=${activeDXATab == 'FOR_SALE' ? 'FOR_SALE' : 'FOR_ADD'}`, myPayload)
    },
    getListMonitor({params, search}, activeDXATab) {
        return ApiService.post(`/application-dxa/list-search/before-register?keyword=${search}&applicationType=${activeDXATab == 'FOR_SALE' ? 'FOR_SALE' : 'FOR_ADD'}`, params)
    },
    getRegions() {
        return ApiService.post(`/department/list-search/yurdep`)
    },
    acceptAppilcation(application_id, department_id) {
        return ApiService.post(`application-dxa/receive?id=${application_id}&department_id=${department_id ? department_id : ''}`)
    },
    acceptSenderRegion(application_id, department_id) {
        return ApiService.post(`application-dxa/receive?id=${application_id}&department_id=${department_id ? department_id : ''}`)
    },
    applicationReviewNOT_COMPLETE(obj, ID) {
        return ApiService.post(`/before-commission/application/application-review/not-completed?id=${ID}`, obj)
    },
    getBody(id) {
        return ApiService.get(`/letter/getBodyById/${id}`)
    },
    viewPdfByLetterId(letterId) {
        return ApiService.get(`/letter/letterView/${letterId}`)
    },
    saveLetterBody(letterId, text, signer) {
        return ApiService.post(`/letter/letterSave?letterId=${letterId}&signerId=${signer ? signer : ''}`, {body: text})
    },
    removeLetter(letterId) {
        return ApiService.delete(`/letter/delete/${letterId}`)
    },
    removeFile(letterId) {
        return ApiService.delete(`/letterAttachedFile/delete/${letterId}`)
    },
    getAttachedFilesById(letterId) {
        return ApiService.get(`/letterAttachedFile/list/${letterId}`)
    },
    projectLettersByLetterId(letterId) {
        return ApiService.post(`letter/project-letters/by-letter-id/${letterId}`)
    },
    createAttachedFile(letterId, file) {
        let formData = new FormData()
        formData.append("file", file)
        return ApiService.formData(`/letterAttachedFile/create/${letterId}`, formData)
    },
    getListDocumentType({params, search}, v) {
        return ApiService.post(`/docSample/list?search=${search}&code=${v}`, params)
    },
    async convertToPdfByApi(config, withLoader = false) {
        return ApiService.post(`/letter/callback?type=convert`, config, withLoader)
    },
    getList({params, search}) {
        return ApiService.post(`/document/list`, params)
    },
    getById(id) {
        return ApiService.get(`/document/get-by-id/${id}`)
    },
    setLetterRejtOrAccept(id, bool) {
        return ApiService.post(`letter/reject-or-accept/${id}?isRejected=${bool}`)
    },
    rejectLetterToReject(payload, assignmentId, x, y, currentPage, comment) {
        return ApiService.post(`/letter/makeSigned-reject-letter/to-reject/${assignmentId}?comment=${comment}&x=${x}&y=${y}&page=${currentPage}`, payload, true)
    },
    getIncomeTotalCount() {
        return ApiService.get(`/letter/totalCount`)
    },
    upload(data) {
        let query_data = `?fileName=${data.name}&regNumber=${data.regNumber}&date=${data.date}&docSampleId=${data.docSampleId == 'blank' ? '' : data.docSampleId}`
        return ApiService.post(`/letter/letterSave${query_data}`)
    },
    getListLetter({params, search}) {
        return ApiService.post(`/letter/draftList?search=${search}`, params)
    },
    getListLetterIncome({params, search}, action) {
        return ApiService.post(`/letter/incomeList?search=${search}&action=${action}`, params)
    },
    getListLetterVisa({params, search}, action) {
        return ApiService.post(`letter/forVisaList?search=${search}&action=${action}`, params)
    },
    getVisaInfo(applicationId) {
        return ApiService.get(`letter/visa-info/${applicationId}`)
    },
    getListLetterSend({params, search}) {
        return ApiService.post(`/letter/sendList?search=${search}`, params)
    },

    getByIdLetter(id) {
        return ApiService.get(`/letter/get-by-id/${id}`)
    },
    getByIdSendToRais(id) {
        return ApiService.get(`/letter/get-by-id/by-application-id/${id}`)
    },
    getRejectLetter(letterId) {
        return ApiService.get(`/letter/get-reject-letter/${letterId}`)
    },
    sendDoc(id, params) {
        return ApiService.post(`/letter/send/${id}`, params)
    },
    sendQuorum(projectId, params) {
        return ApiService.put(`/project/no-quorum/${projectId}?date=${params.date}`, params)
    },
    onlyDocSign(payload, id, x, y, currentPage) {
        return ApiService.post(`/letter/makeSigned/${id}?x=${x}&y=${y}&page=${currentPage}`, payload, true)
    },
    signDecision(payload, id, x, y, currentPage, comment) {
        return ApiService.post(`/letter/makeSigned/decision/${id}?x=${x}&y=${y}&page=${currentPage}&comment=${comment}`, payload, true)
    },
    onlyDocSignSendToRais(payload, id, x, y, currentPage, commissionTypeId, commissionComment) {
        return ApiService.post(`/letter/makeSigned/from-dxa/${id}/${commissionTypeId}?comment=${commissionComment}&x=${x}&y=${y}&page=${currentPage}`, payload, true)
    },
    onlyDocSignSendToRaisOnInner(payload, id, x, y, currentPage, managementEmployeeId, comment) {
        return ApiService.post(`/letter/makeSigned/to-sign/${id}/${managementEmployeeId}?comment=${comment}&x=${x}&y=${y}&page=${currentPage}`, payload, true)
    },
    onlyDocSignFORNotBelong(payload, id, x, y, currentPage) {
        return ApiService.post(`/letter/makeSigned/not-belong/${id}?x=${x}&y=${y}&page=${currentPage}`, payload, true)
    },
    onlyDocSignForToReturn(payload, id, x, y, currentPage) {
        return ApiService.post(`/letter/makeSigned/to-return/${id}?x=${x}&y=${y}&page=${currentPage}`, payload, true)
    },
    onlyDocMakeSignedToReject(payload, assignmentId, employeeId, comment, x, y, currentPage) {
        return ApiService.post(`/letter/makeSigned-compromise-decision/to-reject/${assignmentId}/${employeeId}?x=${x}&y=${y}&page=${currentPage}&comment=${comment}`, payload, true)
    },
    onlyDocSignFORBeforeProject(payload, id, x, y, currentPage) {
        return ApiService.post(`letter/makeSigned/from-dxa/for-confirm/${id}?x=${x}&y=${y}&page=${currentPage}`, payload, true)
    },
    makeSignedInvokeLetter(payload, projectId, letterId, employeeId, comment, x, y, currentPage) {
        return ApiService.post(`letter/makeSigned-invoke-letter/${projectId}/${letterId}/${employeeId}/?x=${x}&y=${y}&page=${currentPage}&comment=${comment}`, payload, true)
    },
    onlyDocSignNotBelong(payload, letterId) {
        return ApiService.post(`before-commission/application/application-review/not-belong?letterId=${letterId}`, payload)
    },
    onlyDocSignForRevision(payload, id, comment) {
        return ApiService.post(`letter/for-revision/from-commission/${id}?comment=${comment}`, payload, true)
    },
    onlyDocSignForRRejectedByRais(payload, letterId, id, comment) {
        return ApiService.post(`letter/for-revision/to-commission/${letterId}/${id}?comment=${comment}`, payload, true)
    },
    letterCancelled(payload, letterId, assignmentId, comment) {
        return ApiService.post(`/letter/cancelled/${letterId}/${assignmentId}?comment=${comment}`, payload, true)
    },
    resultApplicationForDXA(payload, letterId, applicationDXAId, paymentAmount, files = []) {
        const formData = new FormData()
        files.forEach((item) => {
            formData.append("paymentFiles", item.file)
        })
        return ApiService.formDataFile(`/before-commission/application/application-review/accepted?letterId=${letterId}&applicationDXAId=${applicationDXAId}&paymentAmount=${paymentAmount}`, formData)
    },
    resultApplicationForDXARejected(payload, letterId) {
        return ApiService.post(`before-commission/application/application-review/rejected?letterId=${letterId}`, payload)
    },
    uploadRejectLetter(letterAssignmentId, letterType, letterName = "Rad etish xati") {
        return ApiService.put(`/letter/upload-reject-letter/${letterAssignmentId}?letterType=${letterType}&letterName=${letterName}`, null, true)
    },
    signDoc(payload, id, x, y, currentPage, commissionTypeId, commissionComment) {
        return ApiService.post(`/letter/makeSignedNew/${id}/${commissionTypeId}?comment=${commissionComment}&x=${x}&y=${y}&page=${currentPage}`, payload, true)
    },
    makeSignedNewWithHeadOfDepartment(payload, id, x, y, currentPage, commissionTypeId, commissionComment, headOfDepartmentId) {
        return ApiService.post(`/letter/makeSignedNew/withHeadOfDepartment/${id}/${commissionTypeId}?headOfDepartmentId=${headOfDepartmentId}&comment=${commissionComment}&x=${x}&y=${y}&page=${currentPage}`, payload, true)
    },
    makeSignedToClosed(payload, assignmentId, comment, x, y, currentPage) {
        return ApiService.post(`/letter/makeSigned-to-closed/${assignmentId}?comment=${comment}&x=${x}&y=${y}&page=${currentPage}`, payload, true)
    },
    signDocToManagement(payload, letterAssignmentId, x, y, currentPage, managementEmployeeId, comment) {
        return ApiService.post(`/letter/makeSignedNew/to-management/${letterAssignmentId}/${managementEmployeeId}?comment=${comment}&x=${x}&y=${y}&page=${currentPage}`, payload, true)
    },
    getReceivers(id) {
        return ApiService.get(`/letter/letterInfo/${id}`)
    },
    makeAgree(id) {
        return ApiService.get(`/letter/makeAgreed/${id}`)
    },
    makeReviewForCommission(id, comment) {
        return ApiService.post(`/letter/makeViewedForCommissionProject/${id}?comment=${comment ? comment : ''}`)
    },
    makeReviewForCommissionManagement(letterAssignmentId, commissionTypeId, comment, commissionCompletionDate) {
        return ApiService.post(`/letter/send-to-commission/${letterAssignmentId}/${commissionTypeId}?comment=${comment ? comment : ''}&completionDate=${commissionCompletionDate ? commissionCompletionDate : ''}`)
    },
    makeLetterSendFinishLetterToChairman(applicationId, letterId, comment = '') {
        return ApiService.put(`/letter/send-finish-letter/to-chairman/${applicationId}/${letterId}?comment=${comment}`)
    },
    makeSignedBeforeCommission(payload, letterAssignmentId, comment, x, y, currentPage) {
        return ApiService.post(`/letter/makeSigned/before-commission/${letterAssignmentId}/?x=${x}&y=${y}&page=${currentPage}&comment=${comment}`, payload)
    },
    makeReview(id) {
        return ApiService.get(`/letter/makeViewed/${id}`)
    },
    makeCompromiseDecisionViewed(id) {
        return ApiService.get(`/letter/make-compromise-decision-viewed/${id}`)
    },
    makeAgreedLetterToClosed(letterAssignmentId) {
        return ApiService.get(`/letter/makeViewed-letter/to-closed/${letterAssignmentId}`)
    },
    letterAcceptForReopen(letterId) {
        return ApiService.get(`/letter/accept-for-reopen/${letterId}`)
    },
    makeViewedLetterToReject(letterAssignmentId) {
        return ApiService.get(`/letter/makeViewed-letter/to-reject/${letterAssignmentId}`)
    },
    makeViewedLetterToFinish(letterAssignmentId) {
        return ApiService.get(`/letter/makeViewed-letter/to-finish/${letterAssignmentId}`)
    },
    makeAgreedLetter(assignmentId) {
        return ApiService.get(`/letter/makeViewed-letter/${assignmentId}`)
    },
    makeSignedFinishLetter(assignmentId, employeeId, comment, payload, x, y, currentPage) {
        return ApiService.post(`/letter/makeSigned-finish-letter/${assignmentId}/${employeeId}?x=${x}&y=${y}&page=${currentPage}&comment=${comment}`, payload)
    },
    saveRejected(letterId, id, comment, payload) {
        return ApiService.post(`/letter/cancelled/${letterId}/${id}?comment=${comment}`, payload)
    },
    saveQrCode(left, top, page) {
        return ApiService.get(`/letter/letterAsPdf?x=${left}&y=${top}&page=${page - 1}`)
    },
    handleSendLetterToChairman(letterId, comment) {
        return ApiService.put(`/letter/send-letter/to-chairman/${letterId}?comment=${comment}`)
    },
    letterQRCODE(letterId) {
        return ApiService.get(`/letter/letterQRCode/${letterId}`)
    },
    letterQRCODESendToRais(letterId) {
        return ApiService.get(`/letter/letterQRCode/from-dxa/${letterId}`)
    },
    getDocPdf(letterId) {
        return ApiService.get(`/letter/convertLetterToPdf/${letterId}`)
    },
    convert(data) {
        return ApiService.post(`/letter/letterConvert`, {html: data})
    },
    applicationReviewNoPermitRequired(applicationId, decisionText) {
        return ApiService.post(`/before-commission/application/application-review/no-permit-required?applicationDXAId=${applicationId}`, {
            decision_text: decisionText
        }, true)
    },
    applicationReopenProject(applicationId) {
        return ApiService.post(`/before-commission/application/reopen-project?applicationId=${applicationId}`, null, true)
    },
    returnApplicationByRegion(applicationDxaId, id) {
        return ApiService.post(`before-commission/application/return-to-central-section?applicationDXAId=${applicationDxaId}&id=${id}`)
    },
    getAllManagementEmployees() {
        return ApiService.get(`employee/get-all-employee/in-management`)
    },
    uploadFinishLetter(applicationId, letterType, letterName) {
        return ApiService.put(`/letter/upload-finish-letter/${applicationId}?letterType=${letterType}&letterName=${letterName}`)
    },
    letterGetFinishLetter(applicationId) {
        return ApiService.get(`letter/get-finish-letter/${applicationId}`)
    },
    letterGetFinishLetterWithSigner(applicationId) {
        return ApiService.get(`letter/get-finish-letter/with-signer/${applicationId}`)
    },
    searchList: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.post(`${mainUrl}/list-search/${appendUrl}`, payload ? myPayload : payload, withLoader);
        } else {
            return ApiService.post(`${mainUrl}/list-search`, payload ? myPayload : payload, withLoader);
        }
    },
    dxaVisaDataGetFile(applicationId) {
        return ApiService.get(`dxa-visa-data/get-file/${applicationId}`);
    },
    projectInformationCompleted(projectId, date) {
        return ApiService.post(`project/information-completed/${projectId}?date=${date}`);
    },

    changeStatusService(component, grid, selectedFilter = null) {
        component.cnf().then((v) => {
            if (v.value) {
                let status = 'REVIEW_FINISHED';
                if (grid.projectType === 'COMMISSION' && grid.applicationType !== "FROM_DXA") {
                    switch (grid.returnType) {
                        case 'FOR_FINISH_WORK':
                            projectService.getLettersById(grid.id)
                                .then(res => {
                                    if (!res.data || res.data.length <= 0) {
                                        return component.$toast(component.$t('messages.project_files_not_exist'), {type: 'error'})
                                    }
                                    let notPdfDocs = res.data.filter(d => d.fileType.toString().toLowerCase() !== 'pdf'
                                        && ['DECISION_COMMISSION', 'PROTOCOL_COMMISSION'].indexOf(d.letterType) !== -1);
                                    for (let i = 0; i < notPdfDocs.length; i++) {
                                        const d = notPdfDocs[i];
                                        component.convertToPdf(d).then(r => {
                                            if (!r.uploadPath) {
                                                component.$toast(component.$t('messages.project_files_convert_pdf_error'), {type: 'error'})
                                            } else if (!r.uploadPath.endsWith('.pdf')) {
                                                component.$toast(component.$t('messages.project_files_convert_pdf_error'), {type: 'error'})
                                            } else if (i === notPdfDocs.length - 1) {
                                                component.closeProject(grid.id, status, selectedFilter)
                                            }
                                        })
                                            .catch(e => console.log(e))
                                    }
                                })
                                .catch(e => {
                                    console.log(e)
                                })
                            break;
                        case 'FOR_SUSPEND_WORK':
                            projectService.getLettersById(grid.id)
                                .then(res => {
                                    if (!res.data || res.data.length <= 0) {
                                        return component.$toast(component.$t('messages.project_files_not_exist'), {type: 'error'})
                                    }
                                    let notPdfDocs = res.data.filter(d => d.fileType.toString().toLowerCase() !== 'pdf'
                                        && ['COMPROMISE_DECISION_SUSPEND', 'PROTOCOL_SUSPEND'].indexOf(d.letterType) !== -1);
                                    for (let i = 0; i < notPdfDocs.length; i++) {
                                        const d = notPdfDocs[i];
                                        component.convertToPdf(d).then(r => {
                                            if (!r.uploadPath) {
                                                component.$toast(component.$t('messages.project_files_convert_pdf_error'), {type: 'error'})
                                            } else if (!r.uploadPath.endsWith('.pdf')) {
                                                component.$toast(component.$t('messages.project_files_convert_pdf_error'), {type: 'error'})
                                            } else if (i === notPdfDocs.length - 1) {
                                                component.closeProject(grid.id, status, selectedFilter)
                                            }
                                        })
                                            .catch(e => console.log(e))
                                    }
                                })
                                .catch(e => {
                                    console.log(e)
                                })
                            break;
                        case 'FOR_DELAY_WORK':
                            projectService.getLettersById(grid.id)
                                .then(res => {
                                    if (!res.data || res.data.length <= 0) {
                                        return component.$toast(component.$t('messages.project_files_not_exist'), {type: 'error'})
                                    }
                                    let notPdfDocs = res.data.filter(d => d.fileType.toString().toLowerCase() !== 'pdf'
                                        && ['COMPROMISE_DECISION_DELAY', 'PROTOCOL_DELAY'].indexOf(d.letterType) !== -1);
                                    for (let i = 0; i < notPdfDocs.length; i++) {
                                        const d = notPdfDocs[i];
                                        component.convertToPdf(d).then(r => {
                                            if (!r.uploadPath) {
                                                component.$toast(component.$t('messages.project_files_convert_pdf_error'), {type: 'error'})
                                            } else if (!r.uploadPath.endsWith('.pdf')) {
                                                component.$toast(component.$t('messages.project_files_convert_pdf_error'), {type: 'error'})
                                            } else if (i === notPdfDocs.length - 1) {
                                                component.closeProject(grid.id, status, selectedFilter)
                                            }
                                        })
                                            .catch(e => console.log(e))
                                    }
                                })
                                .catch(e => {
                                    console.log(e)
                                })
                            break;
                        case 'FOR_RESUME_WORK':
                            projectService.getLettersById(grid.id)
                                .then(res => {
                                    if (!res.data || res.data.length <= 0) {
                                        return component.$toast(component.$t('messages.project_files_not_exist'), {type: 'error'})
                                    }
                                    let notPdfDocs = res.data.filter(d => d.fileType.toString().toLowerCase() !== 'pdf'
                                        && ['COMPROMISE_DECISION_RESUME', 'PROTOCOL_RESUME'].indexOf(d.letterType) !== -1);
                                    for (let i = 0; i < notPdfDocs.length; i++) {
                                        const d = notPdfDocs[i];
                                        component.convertToPdf(d).then(r => {
                                            if (!r.uploadPath) {
                                                component.$toast(component.$t('messages.project_files_convert_pdf_error'), {type: 'error'})
                                            } else if (!r.uploadPath.endsWith('.pdf')) {
                                                component.$toast(component.$t('messages.project_files_convert_pdf_error'), {type: 'error'})
                                            } else if (i === notPdfDocs.length - 1) {
                                                component.closeProject(grid.id, status, selectedFilter)
                                            }
                                        })
                                            .catch(e => console.log(e))
                                    }
                                })
                                .catch(e => {
                                    console.log(e)
                                })
                            break;
                        default:
                            component.closeProject(grid.id, status, selectedFilter);
                            break;
                    }
                } else {
                    projectService.getLettersById(grid.id)
                        .then(async res => {
                            if (grid.applicationType === "NOT_BELONG") {
                                if ((component.projectType === 'BEFORE_COMMISSION' && res.data && res.data.length >= 1) || (component.projectType !== 'BEFORE_COMMISSION' && res.data && res.data.length >= 0)) {
                                    if (grid.projectType === 'COMMISSION') {
                                        await component.closeProject(grid.id, status, selectedFilter)
                                    } else {
                                        await component.closeProject(grid.id, 'FINISHED', selectedFilter)
                                    }
                                } else {
                                    await component.$toast(component.$t('messages.project_files_not_exist'), {type: 'error'})
                                }
                            } else if (grid.applicationType === "FROM_DXA") {
                                if ((component.projectType === 'BEFORE_COMMISSION' && res.data && res.data.length >= 1) || (component.projectType !== 'BEFORE_COMMISSION' && component.projectType !== 'COMMISSION' && res.data && res.data.length >= 0)) {
                                    if (grid.projectType === 'COMMISSION') {
                                        await component.closeProject(grid.id, status, selectedFilter)
                                    } else {
                                        await component.closeProject(grid.id, status, selectedFilter)
                                    }
                                } else if (grid.projectType === 'COMMISSION') {
                                    let notPdfDocs = await res.data.filter(d => d.fileType.toString().toLowerCase() !== 'pdf')
                                    for (let i = 0; i < notPdfDocs.length; i++) {
                                        const d = notPdfDocs[i];
                                        await component.convertToPdf(d).then(async (r) => {
                                            // CHECK AND RESEND 1ST REQUEST
                                            if (!r.uploadPath) {
                                                await component.$toast(component.$t('messages.project_files_convert_pdf_error'), {type: 'error'})
                                            } else if (!r.uploadPath.endsWith('.pdf')) {
                                                await component.$toast(component.$t('messages.project_files_convert_pdf_error'), {type: 'error'})
                                            } else if (i === notPdfDocs.length - 1) { // check last request
                                                await component.closeProject(grid.id, status, selectedFilter)
                                            }
                                        })
                                            .catch(e => console.log(e))
                                    }
                                } else {
                                    component.$toast(component.$t('messages.project_files_not_exist'), {type: 'error'})
                                }
                            } else {
                                if ((component.projectType === 'BEFORE_COMMISSION' && res.data && res.data.length > 1) || (component.projectType !== 'BEFORE_COMMISSION' && res.data && res.data.length > 0)) {
                                    if (grid.projectType === 'COMMISSION') {
                                        component.closeProject(grid.id, status, selectedFilter)
                                    } else {
                                        let notPdfDocs = res.data.filter(d => d.fileType.toString().toLowerCase() !== 'pdf')
                                        let convertToPdf = []
                                        switch (grid.returnType) {
                                            case "FOR_COMMISSION":
                                                convertToPdf = notPdfDocs.filter(l => l.letterType === 'REFERENCE')
                                                break;
                                            case "FOR_NOT_COMPLETED":
                                                convertToPdf = notPdfDocs.filter(l => l.letterType === 'NOTICE_NOT_COMPLETED')
                                                status = 'FINISHED'
                                                break;
                                            case "FOR_NOT_BELONG":
                                                convertToPdf = notPdfDocs.filter(l => l.letterType === 'NOTICE_NOT_BELONG')
                                                status = 'FINISHED'
                                                break;
                                            case "FOR_REGION":
                                                convertToPdf = notPdfDocs.filter(l => l.letterType === 'NOTICE_REGION')
                                                status = 'FINISHED'
                                                break;
                                        }
                                        let convertToPdfLength = convertToPdf.length;
                                        for (let i = 0; i < convertToPdfLength; i++) {
                                            const d = convertToPdf[i];
                                            component.convertToPdf(d).then(r => {

                                                // CHECK AND RESEND 1ST REQUEST
                                                if (!r.uploadPath) {
                                                    component.$toast(component.$t('messages.project_files_convert_pdf_error'), {type: 'error'})
                                                } else if (!r.uploadPath.endsWith('.pdf')) {
                                                    component.$toast(component.$t('messages.project_files_convert_pdf_error'), {type: 'error'})
                                                } else if (i === convertToPdfLength - 1) {
                                                    component.closeProject(grid.id, status, selectedFilter)
                                                }
                                            })
                                                .catch(e => console.log(e))
                                        }
                                    }
                                } else {
                                    component.$toast(component.$t('messages.project_files_not_exist'), {type: 'error'})
                                }
                            }
                        })
                        .catch(e => {
                            console.log(e)
                        })
                }
            }
        });
    },

    // PHARM SERVICE
    getListPharmMonitor(data) {
        return ApiService.post(`/pharm/list-search?keyword=${data.search}`, data.params)
    },
    getByIdPharmAppeals(application_id, department_id) {
        return ApiService.post(`application-dxa/receive?id=${application_id}&department_id=${department_id ? department_id : ''}`)
    },
    getEmployeesInnerDepartment(data) {
        return ApiService.post(`/pharm/doer/get-all-employee/by-keyword?keyword=${data.search}`, data.params)
    },
    setEmployeesAttachchedToAppeal(data) {
        return ApiService.post(`/pharm/doer/attached-employee`, data)
    },
    getUserAppealInfoById(mNumber) {
        return ApiService.post(`/pharm/pharm-sms/confirm?mNumber=${mNumber}`)
    },
    setRepeatMessageFromUser(data) {
        return ApiService.post(`/pharm/pharm-sms/confirm-answer`, data)
    },
    getDoerAppealList(data) {
        return ApiService.post(`/pharm/doer/list-search?keyword=${data.search}&status=${data.status}`, data.pg)
    },
    getByIdApplicationInfo: function (id, withLoader = false) {
        return ApiService.get(`/pharm/get/${id}`, withLoader)
    },
    getUserApplicationInfo: function (id, withLoader = false) {
        return ApiService.get(`/pharm/doer/get-pdf-by-id/${id}`, withLoader)
    },
    // Soliq Qomitasi'
    getSoliqQomitasiInfoByInn(inn, withLoader = false) {
        return ApiService.get(`pharm/get-pharmacy-data/by-pharm-id/${inn}`, withLoader);
    },
    leaveFile: function (id, cmt, file, code) {
        let bodyFormData = new FormData();
        bodyFormData.append('file', file)
        bodyFormData.append('comment', cmt)
        bodyFormData.append('pharmId', id)
        bodyFormData.append('sector_code', code)
        return ApiService.formDataFile(`/pharm/doer/attachedFile-create`, bodyFormData)
    },
    listFiles: function (pharmId, search, code, data) {
        return ApiService.post(`/pharm/doer/list-pharmId/${pharmId}?code=${code}&search=${search}`, data)
    },

    // listFiles: function (pharmId, keyword) {
    //     return ApiService.post(`/pharm/doer/list-file?keyword=${keyword}&pharmId=${pharmId}`)
    // },

    // listFiles: function (id, data) {
    //     return ApiService.post(`/project-comment/attached-file/${id}`, data)
    // },
}

