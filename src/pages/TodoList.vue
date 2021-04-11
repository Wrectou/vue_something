<template>
  <div class="todo-list-box">
    <h3 class="title">Todos</h3>

    <div class="todo-list">
      <van-skeleton :loading="isLoading" :row="6" />
      <van-swipe-cell v-for="(todo, i) in resetTodosArr" :name="JSON.stringify(todo)" :key="todo.id" :before-close="beforeClose">
        <van-cell :class="[todo.done ? 'done-todo' : '']" :border="false" :value="TimeUtil.formatTime(Number(todo.time))" >
          <template #title>
            <van-checkbox v-model="todo.done" icon-size="16px" @click="checkTodo(todo)">{{todo.todo}}</van-checkbox> 
          </template>
        </van-cell>
        <template #right>
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
      <van-empty v-if="activeTabbar === 0 && todayTodos.length<1 && !isLoading || activeTabbar === 1 && todos.length<1 && !isLoading" description="No-Todo" />
    </div>

    <van-tabbar v-model="activeTabbar">
      <van-tabbar-item icon="todo-list-o" :badge="todayNoDone.length > 0 ? todayNoDone.length : ''">Today</van-tabbar-item>
      <van-tabbar-item icon="orders-o" :dot="allNoDone.length > 0">All</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
import { getTodoList, editTodo, deleteTodo } from '@/api'
import { Tabbar, TabbarItem,   SwipeCell, Cell, Button, Dialog, Checkbox, Empty, Skeleton, Toast } from 'vant'
import { TimeUtil } from '@/utils'

export default {
  name: 'todo-list',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [SwipeCell.name]: SwipeCell,
    [Cell.name]: Cell,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
    [Checkbox.name]: Checkbox,
    [Empty.name]: Empty,
    [Skeleton.name]: Skeleton,
  },
  data() {
    return {
      TimeUtil: new TimeUtil(),
      isLoading: true,
      activeTabbar: 0,
      checked: false,
      todos: [],
      todayTodos: [],
    }
  },
  created() {
    this.getData()
  },
  computed: {
    // tabbar Today 是否显示未完成条数
    todayNoDone() {
      return this.todayTodos.filter(item => !item.done)
    },
    // tabbar All 是否显示红点
    allNoDone() {
      return this.todos.filter(item => !item.done)
    },
    // 根据activeTabbar 排序 todos 完成的按照完成时间从前往后排序，未完成的按照设定时间从前往后排序
    resetTodosArr() {
      let keyText = ''
      if (this.activeTabbar === 0) keyText = 'todayTodos'
      else if (this.activeTabbar === 1) keyText = 'todos'
      let doneArr = [], nowArr = []
      this[keyText].forEach((item) => {
        if (!item.done) nowArr = [item, ...nowArr]
        else doneArr = [...doneArr, item]
      })
      nowArr.sort((a, b) => a.time - b.time)
      doneArr.sort((a, b) => a.donetime - b.donetime)
      return [...nowArr, ...doneArr]
    }
  },
  methods: {
    // 获取todos
    getData() {
      getTodoList().then(res => {
        const {data} = res
        this.isLoading = false
        if (data) {
          // Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。
          let todos = []
          for (const [key, value] of Object.entries(data)) {
            todos.push({...value, dataBaseId: key})
          }
          this.todos = todos
          this.todayTodos = this.todos.filter((item) => this.TimeUtil.isToday(item.time))
          // Object.values()方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。
          // this.todos = Object.values(data)
        } else {
          this.todos = []
          this.todayTodos = []
        }
      },() => this.isLoading = false)
    },
    // 改变todo状态
    checkTodo(item) {
      let params
      if (item.done) params = {...item, donetime: new Date().getTime()}
      else params = {...item, donetime: ''}
      editTodo(params)
        .then(res => {
          this.getData()
        }, err => {
          Toast('状态修改失败！')
          this.getData()
        })
    },
    // 删除todo
    beforeClose({ name, position, instance }) {
      let self = this
      switch (position) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
          Dialog.confirm({ message: '确定删除吗？', beforeClose: (action, done) => {
            let params = JSON.parse(name)
            deleteTodo(params)
              .then(res => {
                self.getData()
                done()
                Toast('删除成功！')
              }, err => {
                Toast('删除失败！')
                this.getData()
              })
          }})
          break;
      }
    },
    
  },
}
</script>

<style lang="scss" scoped>
.todo-list-box{
  padding: 8px;
  width: 100vw;
  min-height: 50vh;
  .title{
    margin: 8px 0;
    text-align: center;
  }
  .todo-list{
    margin: 14px 0 0;
    .van-swipe-cell{
      margin: 8px 0 0;
      .van-cell{
        padding: 10px;
        border-radius: 4px;
        background: #f9f9f9;
        /deep/.van-checkbox__label{
          margin-top: 3px;
        }
      }
      .done-todo{
        opacity: .5;
        text-decoration: line-through;
      }
    }
    .van-skeleton{
      padding: 0;
    }
    .van-empty{
      margin: 22vh 0 0;
    }
  }
}
</style>