<template>
  <van-nav-bar :title="title" @click-left="onClickLeft"/>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    title: String,
    onClickLeft: Function
  },
  setup(){
  }
})
</script>

<style lang='less'>
.van-nav-bar {
  height: 50px;
  line-height: 50px;
  color: #333;
  .van-nav-bar__content {
    height: 50px;
    line-height: 50px;
    background: rgba(73, 148, 223, 0.65);
  }
  .van-nav-bar__title {
    font-size: 22px;
    font-weight: 600;
    color: #fff;
  }
  .van-nav-bar__left {
    i {
      color: #fff;
      font-size: 22px;
    }
  }
  &::after{
    border-bottom-width: 0;
  }
}
</style>