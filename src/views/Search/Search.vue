<template>
  <div class="search">
    <div class="container">
      <van-search show-action shape="round" v-model="value" placeholder="请输入搜索关键词" @search="onSearch">
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <div class="music-list">
        <div class="music-item" v-for='item in songs' :key='item.id' @click='playMusic(item.id, item.picUrl)'>
          <p>{{item.name}}</p>
          <p>{{item.album.name}}</p>
        </div>
      </div>
    </div>
    <van-icon name="revoke" class="back-btn" @click="onClickLeft" />
  </div>
</template>

<script>

import { defineComponent, reactive, toRefs, watch, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import Footer from '@/components/Footer.vue'
import { Search } from 'vant'
import request from '@/util/axios'
import useScrollHooks from '@/hooks/useScrollHooks'
export default defineComponent({
  name: 'search',
  components: { Footer, Search },
  setup () {
    const { push } = useRouter()
    const { ctx } = getCurrentInstance()
    const $store = ctx.$store
    const toBottom = useScrollHooks('.music-list')
    const data = reactive({
      value: '',
      songs: [],
      option: {},
      canScroll: true,
      limitNum: 30
    })

    const onSearch = () => {
      data.option = {
        s: data.value,
        offset: 0,
        limit: data.limitNum,
      }
      getSongs(data.option, 'fresh')
    }

    const getSongs = (option, type) => {
      request.post('/search/get', option)
        .then(res => {
          if (res.code === '0000') {
            data.canScroll = res.songs.length >= data.limitNum
            res.songs = res.songs.map(item => ({ ...item, picUrl: item.album.artist.img1v1Url }))
            if (type === 'fresh') {
              data.songs = res.songs
            } else {
              data.songs = [...data.songs, ...res.songs]
            }
          }
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }

    const playMusic = (id, url) => {
      $store.dispatch('setPlayList', data.songs)
      $store.dispatch('setPlayUrl', url)
      push({ path: '/play', query: { id } })
    }

    const onClickLeft = () => {
      history.go(-1)
    }

    watch([toBottom, () => data.cat, () => data.order], ([newToBottom, newCat, newOrder], [oldToBottom, oldCat, oldOrder]) => {
      if (newToBottom && data.canScroll) {
        let option = { ...data.option, offset: data.songs.length }
        getSongs(option, 'add')
      }
    })
    return {
      ...toRefs(data),
      onSearch,
      playMusic,
      onClickLeft
    }
  }
})
</script>

<style lang='less'>
.search {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    .music-list {
      height: calc(100% - 50px);
      background: #fff;
      overflow-y: auto;
      .music-item {
        padding: 10px 20px;
        font-size: 14px;
        p {
          & + p {
            margin-top: 5px;
            font-size: 12px;
            color: #666;
          }
        }
      }
    }
  }
  .back-btn {
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 28px;
    z-index: 2;
  }
}
</style>