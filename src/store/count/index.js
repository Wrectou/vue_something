import { INCREMENT, DECREMENT, INCREMENTNUM, DECREMENTNUM } from '@/store/mutation-types'

export const count = {
  namespaced: true,
  state: {
    count: 999
  },
  mutations: {
    [INCREMENT](state) {
      state.count ++
    },
    [DECREMENT]: state => {
      state.count --
    },
    [INCREMENTNUM](state, payload) {
      state.count += payload
    },
    [DECREMENTNUM](state, payload) {
      state.count -= payload.amount
    },
  },
}