import Vue from 'vue'
import Vuex from 'vuex'
import todo from '@/store/todo'
import { count } from '@/store/count'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    todo,
    count,
  }
})