import TodoList from '@/pages/TodoList.vue'

export const routes = [
  {
    path: '/todoList',
    name: 'todo-list',
    component: TodoList
  },{
    path: '/about',
    name: 'about',
    component: () => {return import('@/pages/About.vue')}
  },
]