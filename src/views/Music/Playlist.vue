<template>
  <div class="play-list">
    <!-- <Header title="" left-arrow :onClickLeft="onClickLeft" /> -->
    <div class="detail-mask">
      <img :src="playlist.coverImgUrl" alt="">
    </div>
    <div class="mark"></div>
    <div class="detail-container">
      <img :src="playlist.coverImgUrl" alt="">
      <p>{{playlist.name}}</p>
    </div>
    <div class="music-list">
      <div class="music-item" v-for="(item,index) in tracks" :key="index" @click='playMusic(item.id, item.al.name, item.al.picUrl)'>
        <div class="index">{{index + 1}}</div>
        <div class="name-groups">
          <p>{{item.name}}</p>
          <p>{{item.ar[0].name}}</p>
        </div>
      </div>
    </div>
    <van-icon name="revoke" class="back-btn" @click="onClickLeft"/>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, reactive, toRefs } from 'vue'
import Header from '@/components/Header.vue'
import { useRouter } from 'vue-router'
import request from '@/util/axios'
export default defineComponent({
  name: 'playlist',
  components: {
    Header
  },
  setup () {
    const { push } = useRouter()
    const { ctx } = getCurrentInstance()
    const query = ctx.$router.currentRoute.value.query || {}
    const $store = ctx.$store
    const id = query.id
    const data = reactive({
      playlist: {},
      tracks: []
    })
    const onClickLeft = () => {
      push('/music')
    }
    const getPlaylistDetail = () => {
      request.get('/playlist/detail', { params: { id } })
        .then(res => {
          if (res.code === 200) {
            data.playlist = res.playlist
            data.tracks = res.playlist.tracks
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    }
    const playMusic = (id, name, url) => {
      $store.dispatch('setPlayList', data.tracks)
      $store.dispatch('setPlayUrl', url)
      push({ path: '/play', query: { id } })
    }
    getPlaylistDetail()
    return {
      ...toRefs(data),
      onClickLeft,
      playMusic
    }
  }
})
</script>

<style lang='less'>
.play-list {
  position: relative;
  .detail-mask {
    width: 100%;
    height: 160px;
    overflow: hidden;
    filter: blur(20px);
    opacity: 0.4;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .mark {
    position: absolute;
    width: 100%;
    height: 160px;
    background-color: #333;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .detail-container {
    width: 100%;
    height: 160px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    padding: 20px 10px 20px 20px;
    display: flex;
    align-items: center;
    img {
      width: 120px;
      height: 120px;
      vertical-align: middle;
    }
    & > p {
      padding-left: 10px;
      font-size: 16px;
      font-weight: 500;
      line-height: 25px;
      color: #fff;
    }
  }

  .music-list {
    height: calc(100vh - 160px);
    overflow-y: auto;
    .music-item {
      display: flex;
      height: 50px;
      .index {
        flex-shrink: 0;
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        color: #333;
      }
      .name-groups {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:nth-child(1) {
            font-size: 16px;
          }
          &:nth-child(2) {
            margin-top: 5px;
            font-size: 12px;
            color: #888;
          }
        }
      }
    }
  }
  .back-btn{
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 28px;
  }
}
</style>