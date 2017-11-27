import * as types from '../mutation-types'
import union from 'lodash/union'

const state = () => {
  return {
    isFetching: false,
    page: 0,
    ids: [],
    isAllLoaded: false
  }
}

const mutations = {
  [types.PAGINATE_REQUEST](state) {
    state.isFetching = true
  },
  [types.PAGINATE_SUCCESS](state, { result, page, totalPage }) {
    state.ids = union(page !== 1 ? state.ids : [], result)
    state.page = page
    state.isAllLoaded = page >= totalPage
    state.isFetching = false
  },
  [types.PAGINATE_FAILURE](state, ids) {
    state.isFetching = false
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
