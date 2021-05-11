import Vue from 'vue'
import Vuex from 'vuex'
import { count } from '@/store/count'
import todo from '@/store/todo'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    count,
    todo,
  }
})