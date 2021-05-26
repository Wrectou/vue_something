<template>
  <div class="Lottie-box">
    <h3>Lottie</h3>
    <Lottie :options="defaultOptions" :height="260" :width="340" @animCreated="handleAnimation" />
    <div class="button-box">
      <button @click="play">play</button>
      <button @click="pause">pause</button>
      <button @click="stop">stop</button>
    </div>
    <!-- tabbar -->
    <van-tabbar v-model="active" active-color="#f43b32">
      <van-tabbar-item @click="handleTabbarIndex">
        <template #icon="props">
          <Lottie :options="indexLottieOptions" :height="22" :width="22" @animCreated="handleIndexAnimation" />
        </template>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o" @click="handleTabbarSetting">
        <span>设置</span>
      </van-tabbar-item>
      <van-tabbar-item @click="handleTabbarMe">
        <template #icon="props">
          <Lottie :options="meLottieOptions" :height="22" :width="22" @animCreated="handleMeAnimation" />
        </template>
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
import Lottie from 'vue-lottie/src/lottie.vue'
import * as animationData from '@/assets/lottie.json'   // 正方形转圈段
import * as iconanimationData from '@/assets/icon.json'   // 图标动画
import * as indexIcon from '@/assets/01.json'   // indexIcon
import * as meIcon from '@/assets/04.json'   // meIcon
import * as bannerIcon from '@/assets/banner.json'   // banner

export default {
  name: 'lottie',
  data() {
    return {
      defaultOptions: {
        animationData: bannerIcon
      },
      anim: {}, // 这里可以看到 lottie 对象的全部属性
      // tabbar
      active: 0,
      indexLottieOptions: {
        animationData: indexIcon,
        loop: false,
        autoplay: true,
      },
      meLottieOptions: {
        animationData: meIcon,
        loop: false,
        autoplay: false,
      },
      indexAnimation: {},
      meAnimation: {},
    }
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    Lottie,
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim
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
    // tabbar
    handleIndexAnimation(anim) {
      this.indexAnimation = anim
    },
    handleMeAnimation(anim) {
      this.meAnimation = anim
    },
    handleTabbarIndex() {
      this.meAnimation.stop()
      this.indexAnimation.play()
    },
    handleTabbarMe() {
      this.indexAnimation.stop()
      this.meAnimation.play()
    },
    handleTabbarSetting() {
      this.indexAnimation.stop()
      this.meAnimation.stop()
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