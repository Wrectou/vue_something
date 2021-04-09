<template>
  <div class="todo-list-box">
    <h3 class="title">Todos</h3>

    <div class="todo-list">
      <van-skeleton :loading="isLoading" :row="6" />
      <van-swipe-cell v-for="(todo, i) in resetTodosArr" :key="todo.id" :before-close="beforeClose">
        <van-cell :class="[todo.done ? 'done-todo' : '']" :border="false" :value="formatTime(Number(todo.time))" >
        <!-- <van-cell :class="[todo.done ? 'done-todo' : '']" :border="false" :value="formatTime(Number(todo.time))" @click="handleDone(todo, i)"> -->
          <template #title>
            <van-checkbox v-model="todo.done" icon-size="16px" @click="checkTodo">{{todo.todo}}</van-checkbox> 
            <!-- <van-checkbox v-model="todo.done" ref="checkboxs" icon-size="16px">{{todo.todo}}</van-checkbox>  -->
          </template>
        </van-cell>
        <template #right>
          <van-button square type="danger" text="删除" />
        </template>
      </van-swipe-cell>
      <van-empty v-if="todos.length<1 && !isLoading" description="No-Todos" />
    </div>

    <van-tabbar v-model="activeTabbar" @change="tabbarChange">
      <van-tabbar-item icon="todo-list-o" :badge="todayNoDone.length > 0 ? todayNoDone.length : ''">Today</van-tabbar-item>
      <van-tabbar-item icon="orders-o" dot>All</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { getTodoList } from '@/api'
import { Tabbar, TabbarItem,   SwipeCell, Cell, Button, Dialog, Checkbox, Empty, Skeleton } from 'vant'
import { formatTime } from '@/utils'

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
      formatTime: formatTime,
      isLoading: true,
      activeTabbar: 0,
      checked: false,
      todos: [],
    }
  },
  created() {
    this.getData()
    setTimeout(() => {
      this.getData()
    }, 2000)
  },
  computed: {
    todayNoDone() {
      return this.todos.filter(item => !item.done)
    },
    resetTodosArr() {
      let doneArr = [],
          nowArr = [];
      this.todos.forEach((item) => {
        if (!item.done) nowArr = [item, ...nowArr]
        else doneArr = [...doneArr, item]
      })
      nowArr.sort((a, b) => a.id - b.id)
      doneArr.sort((a, b) => a.donetime - b.donetime)
      return [...nowArr, ...doneArr]
    }
  },
  methods: {
    getData() {
      getTodoList().then(res => {
        const {data} = res
        this.isLoading = false
        // Object.values()方法返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用for...in循环的顺序相同 ( 区别在于 for-in 循环枚举原型链中的属性 )。
        this.todos = Object.values(data)
        // Object.entries()方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。
        // let todos = []
        // for (const [key, value] of Object.entries(data)) {
        //   todos.push(value)
        // }
      },() => this.isLoading = false)
    },
    tabbarChange(i) {
      console.log(i);
    },
    // handleDone(item, i) {
    //   this.$refs.checkboxs[i].toggle()
    // },
    checkTodo(e) {
      console.log(e);
      console.log(e.target.ariaChecked);
    },
    beforeClose({ position, instance }) {
      switch (position) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close();
          break;
        case 'right':
          Dialog.confirm({message: '确定删除吗？',}).then(() => {
            instance.close();
            // axios------
          },() =>{});
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