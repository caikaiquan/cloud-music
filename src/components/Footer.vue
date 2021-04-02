<template>
  <van-tabbar route active-color="#ee0a24" inactive-color="#000">
    <van-tabbar-item  replace :to="item.path" :icon="item.icon" v-for="(item, index) in barList" :key='index'>{{item.text}}</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  setup () {
    const data = reactive({
      active: 0,
      barList: [
        {
          text: '音乐',
          path: '/music',
          icon: 'music-o'
        },
        // {
        //   text: '朋友圈',
        //   path: '/blog',
        //   icon: 'chat-o'
        // },
        {
          text: '我的',
          path: '/user',
          icon: 'user-o'
        },
        // {
        //   text: '音乐',
        //   path: '/music2',
        //   icon: 'user-o'
        // }
      ]
    })
    return {
      ...toRefs(data),
    }
  }
})
</script>

<style lang='less' scoped>
footer {
  width: 100%;
  height: 50px;
  position: absolute;
  left: 0;
  bottom: 0;
  background: #ccc;
}
</style>