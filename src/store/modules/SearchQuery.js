const initialQuery = {
  user_query: '',
  type: 'any',
  page: 0,
  filters: {
    lastSeen: null,
    size: null,
  },
};

function stateToQueryParams(state) {
  // Return query params for consumption by $router.push({query})
  // Inverse of setQueryFromParams()

  const { query } = state;

  return {
    q: query.user_query,
    last_seen: query.filters.lastSeen,
    size: query.filters.size,
    type: query.type,
    page: query.page,
  };
}

function queryParamsToState(params) {
  // Inverse of getters.queryParams
  return {
    user_query: params.q || initialQuery.user_query,
    type: params.type || initialQuery.type,
    page: Number(params.page) || initialQuery.page,
    filters: {
      lastSeen: params.last_seen || initialQuery.filters.lastSeen,
      size: params.size || initialQuery.filters.size,
    },
  };
}

function getLastSeenFilters(lastSeen) {
  if (lastSeen) {
    return [`last-seen:${lastSeen}`];
  }

  return [];
}

function getSizeFilters(size) {
  if (size) {
    if (Array.isArray(size)) {
      return size.map((value) => `size:${value}`);
    }

    // Singular value
    return [`size:${size}`];
  }

  return [];
}

function getFilters(filters) {
  const lastSeenFilters = getLastSeenFilters(filters.lastSeen);
  const sizeFilters = getSizeFilters(filters.size);
  return [...lastSeenFilters, ...sizeFilters];
}

function apiQueryString(state) {
  return [state.query.user_query, ...getFilters(state.query.filters)].join(' ');
}

const getters = {
  stateToQueryParams,
  apiQueryString,
};

const mutations = {
  // Mutations relating to query composition
  setRouteParams(state, params) {
    state.query = queryParamsToState(params);
  },
  setUserQuery(state, q) {
    state.query.user_query = q;
  },
  setType(state, type) {
    state.query.type = type;
  },
  incrementPage(state) {
    state.query.page += 1;
  },
  decrementPage(state) {
    if (state.query.page >= 1) {
      // Never decrease below 0
      state.query.page -= 1;
    }
  },
  setLastSeenFilter(state, lastSeen) {
    state.query.filters.lastSeen = lastSeen;
  },
  setSizeFilter(state, size) {
    state.query.filters.size = size;
  },
};

const state = () => ({ ...initialQuery }); // Copy fields, prevent reference.

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
