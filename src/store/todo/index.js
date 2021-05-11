
import { getTodoList } from '@/api'
import { TimeUtil } from '@/utils'

let timeUtil = new TimeUtil()

const state = {
  todoList: [],
}

const getters = {
  getTodayTodoList: state => {
    return state.todoList.filter(item => timeUtil.isToday(item.time))
  }
}

const mutations = {
  updateTodoList: (state, payload) => {
    state.todoList = payload.todos
  },
}

const actions = {
  getTodoList(context) {
    getTodoList()
      .then(res => {
        const {data} = res
        let todos = []
        for(let [key, value] of Object.entries(data)) {
          value.paramsId = key
          todos.push(value)
        }
        context.commit({type: 'updateTodoList', todos})
      })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}