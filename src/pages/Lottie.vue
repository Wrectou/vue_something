<template>
  <div class="Lottie-box">
    <h3>Lottie</h3>
    <Lottie :options="defaultOptions" :height="260" :width="260" @animCreated="handleAnimation" />
    <div class="button-box">
      <button @click="play">play</button>
      <button @click="pause">pause</button>
      <button @click="stop">stop</button>
    </div>
  </div>
</template>

<script>
import * as animationData from '@/assets/lottie.json'
import Lottie from 'vue-lottie/src/lottie.vue'

export default {
  name: 'lottie',
  data() {
    return {
      defaultOptions: {
        animationData: animationData
      },
      animationSpeed: 1,
      anim: {}, // 这里可以看到 lottie 对象的全部属性
    }
  },
  components: {
    Lottie
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim
      console.log(anim) 
    },
    stop: function () {
      this.anim.stop()
    },
    play: function () {
      this.anim.play()
    },
    pause: function () {
      this.anim.pause()
    },
  },
}
</script>

<style lang="scss" scoped>
.button-box{
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>