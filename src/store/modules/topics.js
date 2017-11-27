import { normalize, schema } from 'normalizr'
import * as types from '../mutation-types'
import entities from './entities'
import { baseUrl } from '../api'

const state = () => {
  return {
    ...entities.state()
  }
}

// mutations
const mutations = {
  ...entities.mutations
}

// schema
const topicSchema = new schema.Entity('items')

// actions
const actions = {
  fetchTopicById({ commit, state }, id) {
    let status = state.fetchStatus[id]
    if (status && status !== 'none' && status !== 'failed') return
    commit(types.ENTITY_REQUEST, { result: id })
    return fetch(`${baseUrl}/topic/${id}`)
      .then(res => res.json())
      .then(json => {
        const normalizedData = normalize(json.data, topicSchema)
        console.log(normalizedData)
        commit(types.ENTITY_SUCCESS, normalizedData)
        return json
      })
      .catch(error => {
        commit(types.ENTITY_FAILURE, { result: id, error })
        throw error
      })
  }
}

// getters
const getters = {
  getById: (state, getters) => id => {
    return state.entities[id]
  },

  getByRouteId(state, getters, { route: { params: { id } } }) {
    return getters.getById(id) || {}
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
