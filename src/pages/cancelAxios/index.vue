<template>
  <div class="cancel-axios-box">
    <h3>cancelAxios</h3>
    <div class="button-box">
      <button @click="request">request</button>
      <button @click="cancelRequset">cancelRequset</button>
    </div>
  </div>
</template>

<script>
import { getTodoList } from '@/api'

export default {
  name: 'cancel-axios',
  data() {
    return {}
  },
  methods: {
    request() {
      getTodoList()
        .then(res => {
          console.log(res.data);
        })
    },
    cancelRequset() {
      this.cancelAxios()
      console.log(this);
    }
  },
}
</script>

<style lang="scss" scoped>
.button-box{
  margin: 100px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>