<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="router-view"></router-view>
    </transition>
  </div>
</template>

<script>
import { setSessionStorage, getSessionStorage } from '@/utils'

export default {
  name: 'App',
  data() {
    return {
      transitionName: 'left-router',
    }
  },
  watch: {
    $route(to, from) {
      let routesArr = getSessionStorage('routers') && getSessionStorage('routers').split(',') || []
      if (routesArr.length === 0) {
        routesArr.push(from.path)
        routesArr.push(to.path)
      } else {
        if (routesArr.includes(to.path)) {
          this.transitionName = 'right-router';
          routesArr.splice(routesArr.indexOf(to.path) + 1, 100);
        } else {
          this.transitionName = 'left-router';
          routesArr.push(to.path);
        }
      }
      setSessionStorage('routers', routesArr.join(','));
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  background: #f3f3f3;
}

.router-box{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
}

.router-view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transition: all .3s ease-in-out;
}

.left-router-enter, .right-router-leave-active{
  opacity: 0;
  transform: translateX(100px);
}

.right-router-enter, .left-router-leave-active{
  opacity: 0;
  transform: translateX(-100px);
}
</style>
