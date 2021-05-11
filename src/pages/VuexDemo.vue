<template>
  <div class="about-box">
    <h3>vuexDemo</h3>
    count: {{count}}
    <br/>
    <van-button type="primary" @click="increment">+</van-button>&emsp;
    <van-button type="primary" @click="incrementNum">+10</van-button>&emsp;
    <van-button type="primary" @click="decrement">-</van-button>&emsp;
    <van-button type="primary" @click="decrementNum(10)">-10</van-button>&emsp;
    <br/>
    <br/>
    <div class="todos">
      <h4>todoList:</h4>
      <br/>
      <p v-for="item in todoList" :key=item.paramsId>{{item.todo}}<br/><br/></p>
    </div>
    <div class="todos">
      <h4>getTodayTodoList:</h4>
      <br/>
      <p v-for="item in getTodayTodoList" :key=item.paramsId>{{item.todo}}<br/><br/></p>
    </div>
    <br/>
    <br/>
    <br/>
    <van-button type="primary" @click="getTodos">getTodos</van-button>
  </div>
</template>

<script>
import { Button } from 'vant'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { INCREMENT, DECREMENT, INCREMENTNUM, DECREMENTNUM } from '@/store/mutation-types'

export default {
  name: 'vuex-demo',
  data() {
    return {

    }
  },
  components: {
    [Button.name]: Button
  },
  computed: {
    ...mapState('count',['count']),
    ...mapState('todo',['todoList']),
    // count() {
    //   return this.$store.state.count.count
    // },
    // todoList() {
    //   return this.$store.state.todo.todoList
    // },
    ...mapGetters('todo',['getTodayTodoList']),
    // getTodayTodoList() {
    //   return this.$store.getters['todo/getTodayTodoList']
    // }
  },
  methods: {
    ...mapMutations('count',{'increment': INCREMENT, 'decrement': DECREMENT }),
    incrementNum() {
      console.log('incrementNum');
      this.$store.commit(`count/${INCREMENTNUM}`, 10)
    },
    decrementNum(num) {
      this.$store.commit({type:`count/${DECREMENTNUM}`, amount: num})
    },
    ...mapActions('todo',{getTodos: 'getTodoList'}),
    // getTodos() {
    //   this.$store.dispatch('todo/getTodoList')
    // },
  },
}
</script>

<style lang="scss" scoped>
.about-box{
  width: 100vw;
  min-height: 50vh;
}
</style>