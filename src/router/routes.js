import ShowRouters from '@/pages/ShowRouters/index.vue'

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
    component: () => import('@/pages/VuexDemo/index.vue')
  },{
    path: '/lottie',
    name: 'lottie',
    component: () => import('@/pages/Lottie/index.vue')
  },{
    path: '/cacelAxios',
    name: 'cacel-axios',
    component: () => import('@/pages/cancelAxios/index.vue')
  },
  {
    path: '*',
    redirect: '/showRouters'
  }
]