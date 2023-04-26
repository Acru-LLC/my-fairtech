const state = {
    mainPageStoredDataForDominant: {
        regionId: null,
        isRepublic: false,
        openedTypeIds: []
    },
    mainPageStoredDataForNatural: {
        regionId: null,
        isRepublic: false,
        openedTypeIds: []
    }
};

const getters = {}

const actions = {};

const mutations = {
    setMainPageStoredData (state, { data, reestrType }) {
        if (reestrType == 'dominant') {
            state.mainPageStoredDataForDominant = data
        } else if (reestrType == 'natural') {
            state.mainPageStoredDataForNatural = data
        }
    }
};

export const reestrContractors = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}