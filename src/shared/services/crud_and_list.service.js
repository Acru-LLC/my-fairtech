import ApiService from "@/shared/services/api.service";
import store from "@/state/store";
import id from "vue2-datepicker/locale/es/id";
/*
 * {{ mainUrl }}
 * MUST BE SENT TO THESE FUNCTIONS*/
const FILE_ENTITY_SAVE_URL = 'file-entity/save'
const crudAndListsService = {
    fetchByDepId: function (mainUrl, depId, withLoader = false) {
        return ApiService.get(`${mainUrl}/get-by-depId/${depId}`, withLoader);
    },
    downloadIntegrationData: function (mainUrl, depId, withLoader = false) {
        return ApiService.post(`${mainUrl}`, withLoader);
    },
    saveFileEntity: function (url, payload, appendUrl) {
        if (appendUrl) {
            return ApiService.post(`${FILE_ENTITY_SAVE_URL}/${url}/${appendUrl}`, payload);
        } else {
            return ApiService.post(`${FILE_ENTITY_SAVE_URL}/${url}`, payload);
        }
    },
    create: function (mainUrl, payload, appendUrl, withLoader = false) {
        if (appendUrl) {
            return ApiService.post(`${mainUrl}/create/${appendUrl}`, payload, withLoader);
        } else {
            return ApiService.post(`${mainUrl}/create`, payload, withLoader);
        }
    },
    update: function (mainUrl, payload, appendUrl, withLoader = false) {
        if (appendUrl) {
            return ApiService.put(`${mainUrl}/update/${appendUrl == 'withoutAppendUrl' ? '' : appendUrl}`, payload, withLoader);
        } else {
            return ApiService.put(`${mainUrl}/update/${payload.id}`, payload, withLoader);
        }
    },
    createNotification: function (mainUrl, payload, appendUrl) {
        if (appendUrl) {
            return ApiService.post(`${mainUrl}/create/${appendUrl}`, payload);
        } else {
            return ApiService.post(`${mainUrl}/create`, payload);
        }
    },
    updateNotification: function (mainUrl, payload, appendUrl) {
        if (appendUrl) {
            return ApiService.put(`${mainUrl}/update/${appendUrl}`, payload);
        } else {
            return ApiService.put(`${mainUrl}/update/`, payload);
        }
    },
    getAppealType( searchData){
        return ApiService.post(`/appeal_types/list-search-open?keyword=`, searchData.params.params)
    },
    getListDocType: function (type = '', keyword = '', payload) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        return ApiService.post(`pharm_document/list-search-open?keyword=${keyword ? keyword : ''}&type=${type ? type : ''}`, myPayload)
    },
    async sendAppeal(bodyFormData){
        // console.log(bodyFormData);
        const requestData = {
            method: 'post',
            url: '/outer-cabinet/send-appeal',
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data'}
        };
        try {
            const response = await ApiService.customRequest(requestData);
            return response.data;
        } catch (error) {
            return error.response.data
        }
      // return ApiService.post(`/outer-cabinet/send-appeal?applier_type=${params.applier_type}&applier_jshshir=${params.applier_jshshir}&applier_fullname=${params.applier_fullname}&applier_zipcode=${params.applier_zipcode}&applier_phone=${params.applier_phone}&applier_address=${params.applier_address}&appeal_type=${params.appeal_type}&appeal_description=${params.appeal_description}&appeal_file=${params.appeal_file}`);
    },
    getAppealCount(){
        return ApiService.get('/outer-cabinet/appeal-count')
    },
    getPharmacyFile(id){
        return ApiService.getFile(`pharm/doer/get/docx/file/${id}`)
    },
    getConfirmPharmacy(id){
        return ApiService.post(`/pharm/confirm-pharmacy?mNumber=${id}`)
    },
    getById: async function (mainUrl, id, withLoader = false, mutationName, appendUrl = null) {
        if (appendUrl) {
            let res = await ApiService.get(`${mainUrl}/get/${appendUrl}/${id}`, withLoader);
            if (res.data && mutationName) store.commit(mutationName, res.data);
            return res;
        } else {
            let res = await ApiService.get(`${mainUrl}/get/${id}`, withLoader);
            if (res.data && mutationName) store.commit(mutationName, res.data);
            return res;
        }
    },
    getEmpty: function (mainUrl, appendUrl = null, withLoader = false) {
        if (appendUrl) {
            return ApiService.get(`${mainUrl}/get/empty/${appendUrl}`, withLoader);
        } else {
            return ApiService.get(`${mainUrl}/get/empty`, withLoader);
        }
    },
    getEmptyCustomUrl: function (customUrl, withLoader = false) {
        return ApiService.get(`${customUrl}`, withLoader);
    },
    deleteById: function (mainUrl, id, appendUrl) {
        if (appendUrl) {
            return ApiService.delete(`${mainUrl}/delete/${id}/${appendUrl}`);
        } else {
            return ApiService.delete(`${mainUrl}/delete/${id}`);
        }
    },
    getList: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.get(`${mainUrl}/${appendUrl}`, payload ? myPayload : payload, withLoader);
        } else {
            return ApiService.get(`${mainUrl}`, payload ? myPayload : payload, withLoader);
        }
    },
    getListGet: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.get(`${mainUrl}/${appendUrl}`, payload ? myPayload : payload, withLoader);
        } else {
            return ApiService.get(`${mainUrl}`, payload ? myPayload : payload, withLoader);
        }
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
    searchListWithKeyword: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.post(
                `${mainUrl}/list-search/${appendUrl}?keyword=${myPayload.keyword ? myPayload.keyword : ''}`,
                myPayload, withLoader
            );
        } else {
            return ApiService.post(
                `${mainUrl}/list-search?keyword=${myPayload.keyword ? myPayload.keyword : ''}`,
                myPayload, withLoader
            );
        }
    },

    getListWithDepartmentTypeByCode: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.get(
                `${mainUrl}/?code=${myPayload.keyword ? myPayload.keyword : ''}`,
                myPayload, withLoader
            );
        } else {
            return ApiService.get(
                `${mainUrl}/?code=${myPayload.keyword ? myPayload.keyword : ''}`,
                myPayload, withLoader
            );
        }
    },
    searchListWithoutKeyword: function (mainUrl, payload, appendUrl, withLoader = false, url) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.post(
                `${mainUrl}/list-search/${url}/${appendUrl}`,
                myPayload, withLoader
            );
        } else {
            return ApiService.post(
                `${mainUrl}/list-search`,
                myPayload, withLoader
            );
        }
    },
    searchListIncomeNotification: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.post(
                `${mainUrl}/income-notifications/${appendUrl}`,
                myPayload, withLoader
            );
        } else {
            return ApiService.post(
                `${mainUrl}/income-notifications?keyword=${myPayload.keyword ? myPayload.keyword : ''}&statusId=${myPayload.statusId ? myPayload.statusId : ''}&placedDate=${myPayload.placedDate ? myPayload.placedDate : ''}`,
                myPayload, withLoader
            );
        }
    },
    searchListOutgoingNotification: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.post(
                `${mainUrl}/outgoing-notifications/${appendUrl}`,
                myPayload, withLoader
            );
        } else {
            return ApiService.post(
                `${mainUrl}/outgoing-notifications?keyword=${myPayload.keyword ? myPayload.keyword : ''}&statusId=${myPayload.statusId ? myPayload.statusId : ''}&placedDate=${myPayload.placedDate ? myPayload.placedDate : ''}`,
                myPayload, withLoader
            );
        }
    },
    searchListIncomeAndOutgoingReports: function (mainUrl, payload, url, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.post(
                `${mainUrl}/list-search/${url}/${appendUrl}`,
                myPayload, withLoader
            );
        } else {
            return ApiService.post(
                `${mainUrl}/list-search/${url}?keyword=${myPayload.keyword ? myPayload.keyword : ''}&statusId=${myPayload.statusId ? myPayload.statusId : ''}&createdDate=${myPayload.createdDate ? myPayload.createdDate : ''}`,
                myPayload, withLoader
            );
        }
    },
    searchListWithoutPage: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.post(
                `${mainUrl}/list-search/${appendUrl}`,
                myPayload, withLoader
            );
        } else {
            return ApiService.post(
                `${mainUrl}/list-search`,
                myPayload, withLoader
            );
        }
    },
    searchListWithKeywordForPetrolStations: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1

        return ApiService.post(
            `${mainUrl}/list-search?keyword=${myPayload.keyword ? myPayload.keyword : ''}&districtIds=${myPayload.districtIds ? myPayload.districtIds : ''}&contractorIds=${myPayload.contractorIds ? myPayload.contractorIds : ''}&regionId=${myPayload.regionId ? myPayload.regionId : ''}`,
            myPayload, withLoader
        );
    },
    searchListWithKeywordForSugarStations: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1

        return ApiService.post(
            `${mainUrl}/list-search?keyword=${myPayload.keyword ? myPayload.keyword : ''}&districtIds=${myPayload.districtIds ? myPayload.districtIds : ''}&contractorIds=${myPayload.contractorIds ? myPayload.contractorIds : ''}&regionId=${myPayload.regionId ? myPayload.regionId : ''}`,
            myPayload, withLoader
        );
    },
    searchListWithKeywordForBakeryStations: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1

        return ApiService.post(
            `${mainUrl}/list-search?keyword=${myPayload.keyword ? myPayload.keyword : ''}&districtIds=${myPayload.districtIds ? myPayload.districtIds : ''}&contractorIds=${myPayload.contractorIds ? myPayload.contractorIds : ''}&regionId=${myPayload.regionId ? myPayload.regionId : ''}`,
            myPayload, withLoader
        );
    },
    searchListWithKeywordForFlourStations: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1

        return ApiService.post(
            `${mainUrl}/list-search?keyword=${myPayload.keyword ? myPayload.keyword : ''}&districtIds=${myPayload.districtIds ? myPayload.districtIds : ''}&contractorIds=${myPayload.contractorIds ? myPayload.contractorIds : ''}&regionId=${myPayload.regionId ? myPayload.regionId : ''}`,
            myPayload, withLoader
        );
    },
    searchListWithKeywordByRegion: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.post(
                `${mainUrl}/list-search/${appendUrl}?keyword=${myPayload.keyword ? myPayload.keyword : ''}&regionId=${myPayload.regionId ? myPayload.regionId : ''}`,
                myPayload, withLoader
            );
        } else {
            return ApiService.post(
                `${mainUrl}/list-search?keyword=${myPayload.keyword ? myPayload.keyword : ''}&regionId=${myPayload.regionId ? myPayload.regionId : ''}`,
                myPayload, withLoader
            );
        }
    },
    searchListWithKeywordByRegionAndDistrict: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.post(
                `${mainUrl}/list-search/${appendUrl}?keyword=${myPayload.keyword ? myPayload.keyword : ''}`,
                myPayload, withLoader
            );
        } else {
            return ApiService.post(
                `${mainUrl}/list-search?keyword=${myPayload.keyword ? myPayload.keyword : ''}&regionId=${myPayload.regionId ? myPayload.regionId : ''}&districtId=${myPayload.districtId ? myPayload.districtId : ''}`,
                myPayload, withLoader
            );
        }
    },
    searchListWithKeywordByRegionAndDistrictAndQuarter: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.post(
                `${mainUrl}/list-search/${appendUrl}?keyword=${myPayload.keyword ? myPayload.keyword : ''}`,
                myPayload, withLoader
            );
        } else {
            return ApiService.post(
                `${mainUrl}/list-search?keyword=${myPayload.keyword ? myPayload.keyword : ''}&regionId=${myPayload.regionId ? myPayload.regionId : ''}&districtId=${myPayload.districtId ? myPayload.districtId : ''}&quarterId=${myPayload.quarterId ? myPayload.quarterId : ''}`,
                myPayload, withLoader
            );
        }
    },
    searchListRegionTreeWithKeyword: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        return ApiService.get(
            `${mainUrl}/${appendUrl}?keyword=${myPayload.keyword ? myPayload.keyword : ''}`,
            myPayload, withLoader
        );
    },
    searchListWithKeywordByRegionAndDistrictAndContractor: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.post(
                `${mainUrl}/list-search/${appendUrl}?keyword=${myPayload.keyword ? myPayload.keyword : ''}&regionId=${myPayload.regionId ? myPayload.regionId : ''}&districtIds=${myPayload.districtIds ? myPayload.districtIds : ''}&contractorIds=${myPayload.contractorIds ? myPayload.contractorIds : ''}&designTypeIds=${myPayload.designTypeIds ? myPayload.designTypeIds : ''}&givenDate=${myPayload.givenDate ? myPayload.givenDate : ''}&expireDate=${myPayload.expireDate ? myPayload.expireDate : ''}&isUzAvtoyul=${myPayload.isUzAvtoyul ? myPayload.isUzAvtoyul : ''}`,
                myPayload, withLoader
            );
        } else {
            return ApiService.post(
                `${mainUrl}/list-search?keyword=${myPayload.keyword ? myPayload.keyword : ''}&regionId=${myPayload.regionId ? myPayload.regionId : ''}&districtIds=${myPayload.districtIds ? myPayload.districtIds : ''}&contractorIds=${myPayload.contractorIds ? myPayload.contractorIds : ''}&designTypeIds=${myPayload.designTypeIds ? myPayload.designTypeIds : ''}&givenDate=${myPayload.givenDate ? myPayload.givenDate : ''}&expireDate=${myPayload.expireDate ? myPayload.expireDate : ''}&isUzAvtoyul=${myPayload.isUzAvtoyul ? myPayload.isUzAvtoyul : ''}`,
                myPayload, withLoader
            );
        }
    },
    searchListWithKeywordByRegionAndDistrictAndContractorByAvtoyul: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.post(
                `${mainUrl}/list-search/${appendUrl}?keyword=${myPayload.keyword ? myPayload.keyword : ''}&regionId=${myPayload.regionId ? myPayload.regionId : ''}&districtIds=${myPayload.districtIds ? myPayload.districtIds : ''}&contractorIds=${myPayload.contractorIds ? myPayload.contractorIds : ''}&designTypeIds=${myPayload.designTypeIds ? myPayload.designTypeIds : ''}&givenDate=${myPayload.givenDate ? myPayload.givenDate : ''}&expireDate=${myPayload.expireDate ? myPayload.expireDate : ''}&isUzAvtoyul=${(!!myPayload.isUzAvtoyul)}`,
                myPayload, withLoader
            );
        } else {
            return ApiService.post(
                `${mainUrl}/list-search?keyword=${myPayload.keyword ? myPayload.keyword : ''}&regionId=${myPayload.regionId ? myPayload.regionId : ''}&districtIds=${myPayload.districtIds ? myPayload.districtIds : ''}&contractorIds=${myPayload.contractorIds ? myPayload.contractorIds : ''}&designTypeIds=${myPayload.designTypeIds ? myPayload.designTypeIds : ''}&givenDate=${myPayload.givenDate ? myPayload.givenDate : ''}&expireDate=${myPayload.expireDate ? myPayload.expireDate : ''}&isUzAvtoyul=${(!!myPayload.isUzAvtoyul)}`,
                myPayload, withLoader
            );
        }
    },
    searchListByContractor: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.post(
                `${mainUrl}/list-search/${appendUrl}?keyword=${myPayload.keyword ? myPayload.keyword : ''}&regionId=${myPayload.regionId ? myPayload.regionId : ''}&districtIds=${myPayload.districtIds ? myPayload.districtIds : ''}&designTypeIds=${myPayload.designTypeIds ? myPayload.designTypeIds : ''}`,
                myPayload, withLoader
            );
        } else {
            return ApiService.post(
                `${mainUrl}/list-search-by-contractorId?keyword=${myPayload.keyword ? myPayload.keyword : ''}&regionId=${myPayload.regionId ? myPayload.regionId : ''}&districtIds=${myPayload.districtIds ? myPayload.districtIds : ''}&contractorIds=${myPayload.contractorIds ? myPayload.contractorIds : ''}&designTypeIds=${myPayload.designTypeIds ? myPayload.designTypeIds : ''}&givenDate=${myPayload.givenDate ? myPayload.givenDate : ''}&expireDate=${myPayload.expireDate ? myPayload.expireDate : ''}`,
                myPayload, withLoader
            );
        }
    },
    searchListNotificationByConstructionId: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.post(
                `${mainUrl}/list-search/${appendUrl}?placedDate=${myPayload.placedDate ? myPayload.placedDate : ''}&keyword=${myPayload.keyword ? myPayload.keyword : ''}`,
                myPayload, withLoader
            );
        } else {
            return ApiService.post(
                `${mainUrl}/list-search?placedDate=${myPayload.placedDate ? myPayload.placedDate : ''}&keyword=${myPayload.keyword ? myPayload.keyword : ''}`,
                myPayload, withLoader);
        }
    },
    searchByKeyword: function (mainUrl, keyword, appendUrl) {
        if (appendUrl) {
            return ApiService.post(`${mainUrl}/list-search/${appendUrl}`);
        } else {
            return ApiService.post(`${mainUrl}/search-by-keyword?keyword=${keyword}`);
        }
    },
    searchListWithoutPagination: function (mainUrl, payload, appendUrl) {
        return ApiService.post(`${mainUrl}/list-search`);
    },
    searchByDepId: function (mainUrl, payload) {
        let searchPayload = Object.assign({}, payload.data)
        searchPayload.page -= 1
        return ApiService.post(
            `${mainUrl}/list-search/by-department/${payload.depId}`,
            searchPayload
        );
    },
    searchWithoutDep: function (mainUrl, payload) {
        let searchPayload = Object.assign({}, payload.data)
        searchPayload.page -= 1
        return ApiService.post(
            `${mainUrl}/list-search/without-department`,
            searchPayload
        );
    },
    createPending: function (mainUrl, payload, appendUrl) {
        if (appendUrl) {
            return ApiService.put(`${mainUrl}/${appendUrl}`, payload);
        } else {
            return ApiService.put(`${mainUrl}`, payload);
        }
    },
    returnAllDoc: function (mainUrl, payload, appendUrl) {
        if (appendUrl) {
            return ApiService.put(`${mainUrl}/${appendUrl}`, payload);
        } else {
            return ApiService.put(`${mainUrl}`, payload);
        }
    },
    getLetterId(data) {
        return ApiService.get(`letter/upload?fileName=${data.fileName ? data.fileName : ''}&regNumber=${data.regNumber ? data.regNumber : ''}&date=${data.date ? data.date : ''}&docTypeId=${data.docTypeId ? data.docTypeId : ''}`)
    },
    post: function (url, payload, withLoader = false) {
        return ApiService.post(url, payload, withLoader);
    },

    searchListWithKeywordAndPersonType: function (mainUrl, payload, appendUrl, withLoader = false) {
        let myPayload = Object.assign({}, payload)
        myPayload.page -= 1
        if (appendUrl) {
            return ApiService.post(
                `${mainUrl}/list-search/${appendUrl}?keyword=${myPayload.keyword ? myPayload.keyword : ''}&personType=${myPayload.personType ? myPayload.personType : ''}&categoryId=${myPayload.categoryId ? myPayload.categoryId : ''}`,
                myPayload, withLoader
            );
        } else {
            return ApiService.post(
                `${mainUrl}/list-search?keyword=${myPayload.keyword ? myPayload.keyword : ''}&personType=${myPayload.personType ? myPayload.personType : ''}&categoryId=${myPayload.categoryId ? myPayload.categoryId : ''}`,
                myPayload, withLoader
            );
        }
    },
};
export default crudAndListsService;

