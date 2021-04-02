<template>
  <div class="music">
    <div class="container">
      <van-dropdown-menu>
        <van-dropdown-item v-model="cat" :options="catList" />
        <van-dropdown-item v-model="order" :options="orderList" />
      </van-dropdown-menu>
      <div class="music-container">
        <GridItem :playlist='playlist'></GridItem>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, watch, toRefs } from 'vue'
import useScrollHooks from '@/hooks/useScrollHooks'
import Header from '@/components/Header.vue'
import Swipe from '@/components/Swipe.vue'
import GridItem from '@/components/GridItem.vue'
import request from '@/util/axios'
import Footer from '@/components/Footer.vue'
export default defineComponent({
  name: 'music',
  components: { Header, Swipe, GridItem, Footer },
  setup () {
    const cats = ["全部", "华语", "欧美", "日语", "韩语", "粤语", "小语种", "流行", "摇滚", "民谣", "电子", "舞曲", "说唱", "轻音乐", "爵士", "乡村", "R&B/Soul", "古典", "民族", "英伦", "金属", "朋克", "蓝调", "雷鬼", "世界音乐", "拉丁", "另类/独立", "New Age", "古风", "后摇", "Bossa Nova", "清晨", "夜晚", "学习", "工作", "午休", "下午茶", "地铁", "驾车", "运动", "旅行", "散步", "酒吧", "怀旧", "清新", "浪漫", "性感", "伤感", "治愈", "放松", "孤独", "感动", "兴奋", "快乐", "安静", "思念", "影视原声", "ACG", "儿童", "校园", "游戏", "70后", "80后", "90后", "网络歌曲", "KTV", "经典", "翻唱", "吉他", "钢琴", "器乐", "榜单", "00后"]
    const catList = cats.map(item => ({ text: item, value: item }))
    const toBottom = useScrollHooks('.music-container')
    const data = reactive({
      limit: 18,
      offset: 0,
      playlist: [],
      cat: "华语",
      order: 'hot',
      catList: catList,
      orderList: [{ text: 'Hot', value: 'hot' }, { text: 'New', value: 'new' }]
    })
    const getPlaylist = (type) => {
      const option = {
        limit: data.limit,
        offset: data.playlist.length,
        cat: data.cat,
        order: data.order
      }
      request.get('/playlist/list', { params: option })
        .then(res => {
          if (res.code === 200 && res.playlists && res.playlists.length) {
            res.playlists = res.playlists.map(item => {
              if (/^http\:/.test(item.coverImgUrl)) {
                item.coverImgUrl = item.coverImgUrl.replace(/^http\:/, 'https:')
              }
              return item
            })
            if (type === 'clear') {
              data.playlist = res.playlists
            } else if (!type) {
              data.playlist = [...data.playlist, ...res.playlists]
            }
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    }
    onMounted(() => {
      getPlaylist()
    })
    watch([toBottom, () => data.cat, () => data.order], ([newToBottom, newCat, newOrder], [oldToBottom, oldCat, oldOrder]) => {
      if (newToBottom) {
        getPlaylist()
      }
      if (newCat !== oldCat) {
        getPlaylist('clear')
      }

      if (newOrder !== oldOrder) {
        getPlaylist('clear')
      }

    })
    return {
      ...toRefs(data)
    }
  }
})
</script>

<style lang='less' scoped>
.music {
  width: 100%;
  height: 100%;
  .container {
    height: calc(100% - 50px);
    .music-container {
      width: 100%;
      height: calc(100% - 50px);
      overflow-y: auto;
      padding: 10px;
    }
  }
}
</style>