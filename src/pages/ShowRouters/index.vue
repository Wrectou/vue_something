<template>
  <div class="show-routers-box">
    <div class="router-box">
      <van-button type="primary" size="mini" v-for="item in routerList" :key="item.name" @click="goRouter(item)">{{item.name}}</van-button>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant'

export default {
  name: 'show-router',
  components: {
    [Button.name]: Button
  },
  data() {
    return {
      routerList: [
        {name: 'TodoList', link: '/TodoList'},
        {name: 'VuexDemo', link: '/vuexDemo'},
        {name: 'Lottie', link: '/lottie'},
        {name: 'cacelAxios', link: '/cacelAxios'},
      ]
    }
  },
  methods: {
    goRouter(item) {
      this.$router.push(item.link)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
