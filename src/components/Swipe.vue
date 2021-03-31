<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="item in images" :key="item.id">
      <img :src="item.url" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  setup () {
    const data = reactive({
      images: [
        {
          url: 'http://p1.music.126.net/oeH9rlBAj3UNkhOmfog8Hw==/109951164169407335.jpg',
          id: 1
        },
        {
          url: 'http://p1.music.126.net/xhWAaHI-SIYP8ZMzL9NOqg==/109951164167032995.jpg',
          id: 2
        },
        {
          url: 'http://p1.music.126.net/Yo-FjrJTQ9clkDkuUCTtUg==/109951164169441928.jpg',
          id: 3
        }
      ]
    })
    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang='less'>
.van-swipe {
  height: 150px;
  .van-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>