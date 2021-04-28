<template>
  <div class="about-box">
    <h3>vuexDemo</h3>
    count: {{getVuexData}}
    <br/>
    <van-button type="primary" @click="increment">+</van-button>
    <van-button type="primary" @click="incrementNum">+10</van-button>
    <van-button type="primary" @click="decrement">-</van-button>
    <van-button type="primary" @click="decrementNum(10)">-10</van-button>
    <br/>
    <br/>
    <div class="todos">
      <p v-for="item in todos" :key=item.paramsId>{{item.todo}}<br/><br/></p>
    </div>
    <br/>
    <!-- <van-button type="primary" @click="getTodo">getTodo</van-button> -->
    <van-button type="primary" @click="getTodos">getTodos</van-button>
  </div>
</template>

<script>
import { Button } from 'vant'
import { mapMutations, mapActions } from 'vuex'

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
    getVuexData() {
      return this.$store.state.count.count
    },
    todos() {
      return this.$store.state.todo.todos
    }
  },
  methods: {
    ...mapMutations('count',['decrement', 'decrementNum']),
    increment() {
      this.$store.commit('count/increment')
    },
    // incrementNum() {
    //   this.$store.commit('incrementNum', 10)
    // },
    incrementNum() {
      // this.$store.commit('incrementNum', {amount:10})
      this.$store.commit({type: 'count/incrementNum', amount: 10})
    },
    // decrement() {
    //   this.$store.commit('decrement')
    // },
    // decrementNum() {
    //   this.$store.commit('decrementNum', 10)
    // },
    // ...mapActions(['getTodos']),
    // getTodo() {
    //   this.$store.dispatch('getTodos')
    // },
    getTodos() {
      this.$store.dispatch('todo/getTodos')
    },
  },
}
</script>

<style lang="scss" scoped>
.about-box{
  width: 100vw;
  min-height: 50vh;
}
</style>