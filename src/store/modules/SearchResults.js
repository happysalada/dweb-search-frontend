import { DefaultApi } from 'ipfs-search-client';

const api = new DefaultApi();

const initialResults = {
  total: 0,
  max_score: 0.0,
  hits: [],
};

const actions = {
  search({ rootState, commit }) {
    commit('setLoading');

    api.searchGet(
      rootState.query.getters.apiQueryString,
      rootState.query.type,
      rootState.query.page,
    ).then((results) => {
      commit('setResults', results);
    }).catch((err) => {
      commit('setError');
      console.error('Error from searchApi.searchGet', err);
    });
  },
};

const mutations = {
  // Mutations relating to search results
  setLoading(state) {
    state.results = initialResults;
    state.loading = true;
    state.error = false;
  },
  setError(state) {
    state.loading = false;
    state.error = true;
  },
  setResults(state, results) {
    state.loading = false;
    state.results = results;
  },
};

const state = () => ({
  loading: false,
  error: false,
  results: initialResults,
});

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
