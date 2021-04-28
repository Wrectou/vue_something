export const count = {
  namespaced: true,
  state: {
    count: 0,
  },
  mutations: {
    increment: state => {
      state.count ++
    },
    // incrementNum: (state, payload) => {
    //   state.count += payload
    // },
    incrementNum: (state, payload) => {
      state.count += payload.amount
    },
    decrement(state) {
      state.count --
    },
    decrementNum: (state, payload) => {
      state.count -= payload
    },
  },
}