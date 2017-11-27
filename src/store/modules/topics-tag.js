import { normalize, schema } from 'normalizr'
import trimHtml from 'trim-html'
import * as types from '../mutation-types'
import paginate from './paginate'
import { baseUrl } from '../api'

const namespace = 'topics'

// schema
const topicSchema = new schema.Entity('items')

// actions
const actions = {
  fetchTopics({ commit, state }, { tab, page }) {
    if (state.isFetching) return

    commit(types.PAGINATE_REQUEST)

    return fetch(`${baseUrl}/topics?tab=${tab || ''}&page=${page}`)
      .then(res => res.json())
      .then(json => {
        json.data.forEach(a => {
          a.subtitle = trimHtml(a.content, {
            preserveTags: false,
            limit: 200
          }).html
        })
        const normalizedData = normalize(json.data, [topicSchema])

        let fetchStatus = {}
        normalizedData.result.forEach(a => {
          fetchStatus[a] = 'none'
        })

        commit(
          `${namespace}/${types.ENTITIES}`,
          { ...normalizedData, fetchStatus },
          { root: true }
        )
        commit(types.PAGINATE_SUCCESS, {
          ...normalizedData,
          page: page
        })
        return json
      })
      .catch(error => {
        commit(types.PAGINATE_FAILURE, { error })
        throw new Error(error)
      })
  }
}

// getters
const getters = {
  items(state, getters, rootState) {
    return state.ids.map(id => rootState[namespace].entities[id])
  },
  isData(state) {
    return state.ids.length > 0
  },
  getById: (state, getters, rootState) => id => {
    return rootState[namespace].entities[id]
  }
}

export default {
  ...paginate,
  namespaced: true,
  actions,
  getters
}
