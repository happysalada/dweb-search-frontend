import Vue from 'vue';
import Vuex from 'vuex';
import SearchQuery from './modules/SearchQuery';
import SearchResults from './modules/SearchResults';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // TOOD: Use central helper listing types, create store
    // for each dynimcally.
    query: SearchQuery,
    results: {
      modules: {
        any: SearchResults,
        text: SearchResults,
        audio: SearchResults,
        video: SearchResults,
      },
    },
  },
  strict: true,
});
