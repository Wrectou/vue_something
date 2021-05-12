import ShowRouters from '@/pages/ShowRouters.vue'

export const routes = [
  {
    path: '/showRouters',
    name: 'show-routers',
    component: ShowRouters
  },
  {
    path: '/todoList',
    name: 'todo-list',
    component: () => import('@/pages/TodoList/index.vue')
  },
  {
    path: '/addTodo',
    name: 'add-todo',
    component: () => import('@/pages/TodoList/AddTodo.vue')
  },{
    path: '/vuexDemo',
    name: 'vuex-demo',
    component: () => import('@/pages/VuexDemo.vue')
  },{
    path: '/lottie',
    name: 'lottie',
    component: () => import('@/pages/Lottie.vue')
  },
  {
    path: '*',
    redirect: '/showRouters'
  }
]