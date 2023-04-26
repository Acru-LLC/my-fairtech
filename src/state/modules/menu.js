import ProjectService from "@/shared/services/projectService";

export const state = {
  loaded: false,
  applicationDXACount: 0,
  descendedDXACount: 0,
  applicationCount: 0,
  descendedCount: 0,
  resolutionCount: 0,
  outgoingCount: 0,
  incomeCount: 0,
  all: 0,
};

export const mutations = {
  setLoaded(state, value) {
    state.loaded = value;
  },
  setApplicationDXACount(state, value) {
    state.applicationDXACount = value;
  },
  setDescendedDXACount(state, value) {
    state.descendedDXACount = value;
  },
  setApplicationCount(state, value) {
    state.applicationCount = value;
  },
  setResolutionCount(state, value) {
    state.resolutionCount = value;
  },
  setDescendedCount(state, value) {
    state.descendedCount = value;
  },
  setOutgoingCount(state, value) {
    state.outgoingCount = value;
  },
  setIncomeCount(state, value) {
    state.incomeCount = value;
  },
  setAll(state, value) {
    state.all = value;
  },
}

export const actions = {
  async toggleLoaded({ commit, state}) {
    commit('setLoaded', !state.loaded)
  },
  async fetchLetterAllCount({ commit, state, dispatch }) {
    if (state.loaded) {
      return;
    }
    commit('setLoaded', true);
    dispatch('fetchLetterAllCountForce')
    setInterval(() => {
      dispatch('fetchLetterAllCountForce')
    }, 15000)
  },
  async fetchLetterAllCountForce({ commit }) {
    commit('setLoaded', true);
    ProjectService.fetchLetterAllCount()
      .then(({ data }) => {
        const applicationDXA = data.applicationDXACount || 0
        const descendedDXA = data.descendedDXACount || 0
        const application = data.applicationCount || 0
        const resolution = data.resolutionCount || 0
        const descended = data.descendedCount || 0
        const outgoing = data.outgoingCount || 0
        const income = data.incomeCount || 0
        const all = applicationDXA + descendedDXA + application + resolution + descended + outgoing + income;
        commit('setApplicationDXACount', applicationDXA);
        commit('setDescendedDXACount', descendedDXA);
        commit('setApplicationCount', application);
        commit('setResolutionCount', resolution);
        commit('setDescendedCount', descended);
        commit('setOutgoingCount', outgoing);
        commit('setIncomeCount', income);
        commit('setAll', all);
      })
      .catch(() => {
      })
  },
}
