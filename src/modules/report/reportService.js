import ApiService from '@/shared/services/api.service'

export default {

    stopFormingTheReport(reportId) {
        return ApiService.post(`/docReport/changeReportType?reportId=${reportId}`)
    },
    deleteRowId(rowId, reportId) {
        return ApiService.delete(`/docReport/delete/report-data/${rowId}?reportId=${reportId}`)
    },
    deleteDocReport(id) {
        return ApiService.delete(`/docReport/delete/${id}`)
    },
    saveGatheredReport({tableId, childDateTypeId}, reportDate, reportData) {
        return ApiService.post(`/docReport/saveGatheredDocReportData?childDateTypeId=${childDateTypeId.id}&tableId=${tableId.id}&reportDate=${new Date(reportDate.date).ddmmyyyyWithDash()}`, reportData)
    },
    checkEmployeeIfWorksInDep() {
        return ApiService.get(`/docReportDepartment/checkEmployeeIfWorksInDep`)
    },
    makeCancelled2(id, reason) {
        return ApiService.post(`/docReport/makeCancelled2/${id}?decidedComment=${reason}`)
    },
    makeApproved2(id) {
        return ApiService.post(`/docReport/makeApproved2/${id}`)
    },
    getGather({tableId, childDateTypeId}) {
        return ApiService.post(`/docReport/gatherDocReport/${tableId.id}/${childDateTypeId.id}`)
    },
    getQrCode(id) {
        return ApiService.get(`/docReport/getQRCode/${id}`)
    },
    saveRejectedReport(id, reason) {
        return ApiService.post(`/docReport/makeCancelled/${id}?comment=${reason}`)
    },
    signDocReport(payload, id) {
        return ApiService.post(`/docReport/makeSigned/${id}`, payload)
    },
    getReceivers(id) {
        return ApiService.get(`/docReport/getAssigmentByReportId/${id}`)
    },
    sendDocReport({receiverDepId, signerId, reportId}) {
        return ApiService.post(`/docReport/sendDocReport?receiverDepId=${receiverDepId}&reportId=${reportId}&signerId=${signerId}`)
    },
    sendDocReportSignerMe(payload, payload1) {
        return ApiService.post(`/docReport/sendDocReportAndMakeSigned?receiverDepId=${payload.receiverDepId}&reportId=${payload.reportId}`, payload1)
    },
    listDocReportIncome({params, search}, status) {
        let copyParams = Object.assign({}, params)
        copyParams.itemsPerPage = params.limit
        delete copyParams.limit
        return ApiService.post(`/docReport/incomeList?search=${search}`, copyParams)
    },
    listDepartmentForDocument(docReportId) {
        return ApiService.post(`/department/list-search/for-document/${docReportId}`)
    },
    listDocReportSent({params, search}, status) {
        let copyParams = Object.assign({}, params)
        copyParams.itemsPerPage = params.limit
        delete copyParams.limit
        return ApiService.post(`/docReport/sendList?search=${search}`, copyParams)
    },
    listDocReportDraft({params, search}, status) {
        let copyParams = Object.assign({}, params)
        copyParams.itemsPerPage = params.limit
        delete copyParams.limit
        return ApiService.post(`/docReport/draftList?search=${search}`, copyParams)
    },
    listDocReportGathered({params, search}, status) {
        let copyParams = Object.assign({}, params)
        copyParams.itemsPerPage = params.limit
        delete copyParams.limit
        return ApiService.post(`/docReport/gatherList?search=${search}`, copyParams)
    },
    deleteDepartmentsTashkiliy(id) {
        return ApiService.delete(`/docReportDepartment/delete/${id}`)
    },
    saveDepartmentsTashkiliy(data) {
        return ApiService.post(`/docReportDepartment/create`, data)
    },
    getDepartmentsTashkiliy({params, search}) {
        let copyParams = Object.assign({}, params)
        copyParams.itemsPerPage = params.limit
        delete copyParams.limit
        return ApiService.post(`/docReportDepartment/list?search=${search}`, copyParams)
    },
    getByparentId(id) {
        return ApiService.post(`directoryDepartment/listByParentId/${id}`)
    },
    deleteFormula(formulaId) {
        return ApiService.delete(`/docTable/delete-formula/${formulaId}`)
    },
    reportGetById(id) {
        return ApiService.get(`/docReport/get-by-id/${id}`)
    },
    sendReportForConfirmation(id) {
        return ApiService.post(`/docReport/sendDocReport?reportId=${id}`)
    },
    getOwnTable({params, search}) {
        let copyParams = Object.assign({}, params)
        copyParams.itemsPerPage = params.limit
        delete copyParams.limit
        return ApiService.post(`/departmentTable/ownDocTableList?search=${search}`, copyParams)
    },
    getOwnTableForGather({params, search}) {
        let copyParams = Object.assign({}, params)
        copyParams.itemsPerPage = params.limit
        delete copyParams.limit
        return ApiService.post(`/departmentTable/ownDocTableList/for-gather?search=${search}`, copyParams)
    },
    getOwnTableForGather_D({params, search}) {
        let copyParams = Object.assign({}, params)
        copyParams.itemsPerPage = params.limit
        delete copyParams.limit
        return ApiService.post(`/departmentTable/ownDocTableList/for-gather?search=${search}`, copyParams)
    },
    getByDepartments(id) {
        return ApiService.get(`/departmentTable/depsByTableId/${id}`)
    },
    getListDateTypes(params, search) {
        let copyParams = Object.assign({}, params)
        copyParams.itemsPerPage = params.limit
        delete copyParams.limit
        return ApiService.post(`/dateType/list-search?keyword=${search??''}`, copyParams)
    },
    getListByParentId(parentId, params) {
        return ApiService.post(`/dateType/listByParentId/${parentId}`, params)
    },
    addDepartmentTable(data, table) {
        let payload = {
            departmentIds: data,
            docTableIds: [table.id]
        }
        return ApiService.post(`/departmentTable/fullCreate`, payload)
    },
    getAllYuridik() {
        return ApiService.post(`/department/list-search`)
    },
    //Tables
    saveTable(data, columns, rows, columnObjects, rowObjects) {
        let payload = {
            ...data,
            columnIds: columns.map(e => e.id),
            rowIds: rows.map(e => e.id),
            columnObjects: columnObjects,
            rowObjects: rowObjects
        }
        return ApiService.post(`/docTable/create`, payload)
    },
    getReportById(id) {
        return ApiService.get(`/docReport/getDataById/${id}`)
    },
    autoGenerateReport(id, columnIds) {
        return ApiService.post(`/docReport/automatic-generate?reportId=${id}&columnIds=${columnIds}`, {})
    },
    fillDocReport(data, id) {
        return ApiService.post(`/docReport/fillDocReport?reportId=${id}`, data)
    },
    getListTable({params, search, departmentId}) {
        let paramss = {
            itemsPerPage: params.limit,
            page: params.page
        }
        return ApiService.post(`/docTable/list-search?keyword=${search}&departmentId=${departmentId ? departmentId : ''}`, paramss)
    },
    getByIdTable(id) {
        return ApiService.get(`/docTable/mixTableByTableId/${id}`)
    },
    getByIdTableWithReportId(id, reportId) {
        return ApiService.get(`/docTable/mixTableByReportId/${id}/${reportId}`)
    },
    getDocTableFormulasList(docTableId) {
        return ApiService.get(`/docTable/get-tables-formulas/${docTableId}`)
    },
    deleteDocTableFormulas(docTableId, targetDocColumnId) {
        return ApiService.delete(`/docTable/delete-tables-formulas/${docTableId}/${targetDocColumnId}`)
    },
    saveFormulaRight(data, id) {
        return ApiService.post(`/docTable/add-formula/${id}?disabledF1=${true}`, data)
    },
    saveFormula(data, id) {
        return ApiService.post(`/docTable/add-formula/${id}`, data)
    },
    saveAddReturnableDepartment(tableId, departmentId) {
        return ApiService.post(`/docTable/add-returnable-department/${tableId}/${departmentId}`)
    },
    formulasByTableId_2(id) {
        return ApiService.get(`/docTable/formulasByTableId/${id}?disabledF1=${true}`)
    },
    formulasByTableId(id) {
        return ApiService.get(`/docTable/formulasByTableId/${id}`)
    },
    createDocReport(data) {
        return ApiService.post(`/docReport/createDocReport?date=${data.date}&tableId=${data.tableId ? data.tableId.id : ''}&dateTypeId=${data.dateTypeId ? data.dateTypeId.id : ''}&nameUz=${data.nameUz}&nameLt=${data.nameLt}&nameRu=${data.nameRu}`)
    },
    createCopyDocReport(data) {
        return ApiService.post(`/docReport/createDuplicateDocReport?date=${data.date}&reportId=${data.id}&dateTypeId=${data.dateTypeId ? data.dateTypeId.id : ''}&nameUz=${data.nameUz}&nameLt=${data.nameLt}&nameRu=${data.nameRu}`)
    },
    listDocReport({params, search}, status) {
        return ApiService.post(`/docReport/list?search=${search}&status=${status}`, params)
    },
    //Columns

    getListColumnWithChildren({params, search}) {
        let paramss = {
            itemsPerPage: params.limit,
            page: params.page
        }
        return ApiService.post(`/docColumn/list-with-children?search=${search}`, paramss)
    },
    getListColumn({params, search}) {
        return ApiService.post(`/docColumn/list?search=${search}`, params)
    },
    createColumn(e) {
        // let payload = {
        //     nameLt: e.nameLt,
        //     nameUz: e.nameUz,
        //     nameRu: e.nameRu,
        //     typeId: e.typeId ? e.typeId.id : null
        // }
        return ApiService.post(`/docColumn/create`, e)
    },
    deleteColumn(id) {
        return ApiService.delete(`/docColumn/delete/${id}`)
    },
    updateColumn(data) {
        return ApiService.post(`/docColumn/update`, data)
    },
    createColumnWithParent(data, ids, childObjects) {
        return ApiService.post(`/docColumn/create/joinColumn?childIds=${ids.map(e => e.id)}`, {...data, ...{childObjects: childObjects}})
    },
    // Values
    getValueList() {
        let paramss = {
            itemsPerPage: 50,
            page: 0
        }
        return ApiService.post(`/directory-type/list-search?keyword=`, paramss)
    },

    //Rows
    getListRowWithChildren({params, search}) {
        let copyParams = Object.assign({}, params)
        copyParams.itemsPerPage = params.limit
        delete copyParams.limit
        return ApiService.post(`/docRow/list-with-children?search=${search}`, copyParams)
    },
    createRowWithParent(data, ids, childObjects) {
        return ApiService.post(`/docRow/create/joinRow?childIds=${ids.map(e => e.id)}`, {...data, ...{childObjects: childObjects}})
    },
    getListRow({params, search}) {
        let paramss = {
            itemsPerPage: params.limit,
            page: params.page
        }
        return ApiService.post(`/docRow/list?search=${search}`, paramss)
    },
    createRow(data) {
        return ApiService.post(`/docRow/create`, data)
    },
    deleteRow(id) {
        return ApiService.delete(`/docRow/delete/${id}`)
    },
    updateRow(data) {
        return ApiService.post(`/docRow/update`, data)
    },
    statusChangeRow(id, statusId) {
        return ApiService.post(`/docTable/change-status/?id=${id}&statusId=${statusId}`)
    },
    updateRowInfo(data) {
        return ApiService.put(`/docTable/update/${data.id}`, data)
    },
    getListDateTypesChild({params, search}, id) {
        let copyParams = Object.assign({}, params)
        copyParams.itemsPerPage = params.limit
        delete copyParams.limit
        return ApiService.post(`/dateType/listByParentId/${id}?search=${search}`, copyParams)
    },
    reportListForCollection(docTableId, dateTypeId, payload){
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        return ApiService.post(`/docReport/list/for-collection/${docTableId}/${dateTypeId}`, myPayload)
    },
    createAndFillGatherReport(reportInfoForGather, reportData, payload){
        let myPayload = Object.assign({
            reportInfoForGather: reportInfoForGather,
            reportData: reportData,
        }, payload)
        myPayload.page -= 1
        return ApiService.post(`/docReport/create-and-fill/gather-report`, myPayload)
    },
}
