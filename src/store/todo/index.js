import { TimeUtil } from '@/utils'
import { getTodoList } from '@/api'

const timeUtil = new TimeUtil()

const state = {
  todos: [],
}

const getters = {
  getTodayTodo: state => {
    return state.todos.filter(item => timeUtil.isToday(item.time))
  }
}

const mutations = {
  updateTodoList: (state, payload) => {
    state.todos = payload.todos
  }
}

const actions = {
  getTodos: async context => {
    const {data} = await getTodoList()
    let todos = []
    for (let [key, value] of Object.entries(data)) {
      value.paramsId = key
      todos.push(value)
    }
    context.commit({type: 'updateTodoList', todos})
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}