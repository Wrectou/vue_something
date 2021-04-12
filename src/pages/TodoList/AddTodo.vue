<template>
  <div class="add-todo-box">
    <van-nav-bar
      title="Add Todo"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="add-todo">
      <van-cell-group class="todo-box">
        <van-field v-model="todoObj.todo" label="Todo" placeholder="Please Input Todo Name" />
        <van-field
          readonly
          clickable
          name="datetimePicker"
          :value="showTime"
          label="Time"
          placeholder="Click Choose Todo Time"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-datetime-picker
            type="datetime"
            confirm-button-text = "confirm"
            cancel-button-text = "cancel"
            v-model="currentDate"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
      </van-cell-group>
      <van-button class="button" plain block :loading="isLoading" type="info" loading-text="Loading..." @click="handleAddTodo">Add</van-button>
    </div>
  </div>
</template>

<script>
import { addTodo } from '@/api'
import { NavBar, CellGroup, Field, Button, DatetimePicker, Popup, Toast, } from 'vant'
import { TimeUtil } from '@/utils'
import { nanoid } from 'nanoid'

export default {
  name: 'add-todo',
  components: {
    [NavBar.name]: NavBar,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
    [Toast.name]: Toast,
  },
  data() {
    return {
      TimeUtil: new TimeUtil(),
      currentDate: new Date(),
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2025, 10, 1),
      showTime: '',
      showPicker: false,
      todoObj: {
        done: false,
        donetime: '',
        id: '',
        time: '',
        todo: ''
      },
      isLoading: false,
    }
  },
  methods: {
    // 时间选择器
    onConfirm(time) {
      this.showTime = this.TimeUtil.formatTime(time)
      this.todoObj.time = new Date(time).getTime()
      this.showPicker = false
    },
    // 添加todo按钮
    handleAddTodo() {
      if (this.todoObj.todo == '') {
        Toast('todo name required')
      } else if (this.todoObj.time == '') {
        Toast('todo time required')
      } else {
        this.isLoading = true
        this.todoObj.id = nanoid()
        addTodo(this.todoObj)
          .then(res => {
            Toast('add success')
            this.isLoading = false
            this.todoObj.todo = ''
            this.showTime = ''
            this.todoObj.time = ''
            setTimeout(() => { this.$router.go(-1) }, 500)
          }, err => {
            Toast('add error')
            this.isLoading = false
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.add-todo-box {
  .title {
    margin: 8px 0;
    text-align: center;
  }
  .add-todo {
    padding: 8px;
    .todo-box {
      margin: 16px 0 0;
      .van-cell{
        padding: 10px;
      }
    }
    .button{
      margin: 60px 0 0;
      height: 40px;
    }
  }
}
</style>