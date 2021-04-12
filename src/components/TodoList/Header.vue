<template>
  <h3 class="title">
    Todos
    <van-icon class="add" name="add-o" color="#1989fa" size="20" @click="addTodo" />
  </h3>
</template>

<script>
import { Icon } from 'vant'

export default {
  components: {
    [Icon.name]: Icon
  },
  methods: {
    addTodo() {
     this.$emit("childAddTodo", "childAddTodolalala!!!");
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  position: relative;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .add{
    position: absolute;
    right: 0;
  }
}
</style>