import Vue from 'vue'
import Vuex from 'vuex'
import { getTodoList } from '@/api'
import { TimeUtil } from '@/utils'

const timeUtil = new TimeUtil()

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    count: 0,
    todos: []
  },
  getters: {
    getTodayTodo: state => {
      return state.todos.filter(item => timeUtil.isToday(item.time))
    }
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
    updateTodoList: (state, payload) => {
      state.todos = payload.todos
    }
  },
  actions: {
    getTodos: async context => {
      // console.log(context);
      const {data} = await getTodoList()
      let todos = []
      for (let [key, value] of Object.entries(data)) {
        value.paramsId = key
        todos.push(value)
      }
      context.commit({type: 'updateTodoList', todos})
    }
  },
})