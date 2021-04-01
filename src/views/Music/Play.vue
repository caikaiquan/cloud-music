<template>
  <div class="play">
    <div class="img-box"></div>
    <img class="bg" :src="picUrl" alt="">
    <div class="cd-box" :class="{'playing': playing}">
      <img :src="picUrl" alt="" :style="{transform:'translate(-50%, -50%) rotate('+rotateNum+'deg)'}">
    </div>
    <audio :src="musicUrl" id="audio">
      <!-- autoplay="autoplay" -->
      您的浏览器不支持 audio 标签。
    </audio>
    <div class="slider-content">
      <p class="text-left">{{currentTime}}</p>
      <van-slider bar-height='5' button-size='14' active-color='#fff' inactive-color='#969696' @input="sliderInput" v-model="sliderValue" @drag-start="dragStart" @drag-end="dragEnd" @change="sliderChange" />
      <p class="text-right">{{durationTime}}</p>
    </div>
    <div class="control">
      <img src="@/assets/img/pre.png" alt="" @click='changeMusicPlay("pre")'>
      <van-icon :name="playing ? 'pause-circle-o':'play-circle-o'" @click="changePlay" />
      <img src="@/assets/img/next.png" alt="" @click='changeMusicPlay("next")'>
    </div>
    <van-icon name="revoke" class="back-btn" @click="onClickLeft" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import { computed, defineComponent, getCurrentInstance, onMounted, onUnmounted, reactive, watch, toRefs } from 'vue'
import { Toast, Dialog } from 'vant';

import request from '@/util/axios'
export default defineComponent({
  components: { Toast, Header, Dialog },
  setup () {
    let Auto = null
    let IntervalRotate = null
    const { ctx } = getCurrentInstance()
    const $store = ctx.$store
    const playList = ctx.$store.getters.getPlayList
    const url = ctx.$store.getters.getPlayUrl
    const query = ctx.$router.currentRoute.value.query || {}
    const id = query.id
    const name = query.name
    const data = reactive({
      currentId: Number(id), // 当前播放的id
      picUrl: url,
      name: name,
      musicUrl: '',
      playing: false,
      rotateNum: 0,
      duration: 0, // 音乐总时长
      MusiccurrentTime: 0,
      sliderValue: 0,
      dragStatus: false, // 是否是拖动的状态
      autoPlay: false, // 是否自动播放
      firstPlay: computed(() => {
        return $store.getters.firstPlay
      })
    })

    const onClickLeft = () => {
      history.go(-1)
    }
    // 获取音乐地址
    const getPlayUrl = () => {
      request.get('/play/url', { params: { id: data.currentId } })
        .then(
          res => {
            const musicUrl = res.data[0].url
            if (musicUrl) {
              data.musicUrl = res.data[0].url
              setTimeout(() => {
                changePlay()
              }, 100);
            } else {
              Dialog.confirm({
                message: '获取歌曲失败, 切换歌曲',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: '下一首',
                cancelButtonText: '上一首'
              })
                .then(() => {
                  changeMusicPlay("next")
                })
                .catch(() => {
                  changeMusicPlay("pre")
                })
            }
          }
        )
        .catch(err => {
          console.log(err)
        })
    }
    getPlayUrl()
    // 开始播放
    const playMusic = () => {
      const Auto = document.getElementById('audio')
      if (Auto.duration && Auto.play) {
        data.duration = Auto.duration
        Auto.play()
      } else {
        setTimeout(() => {
          console.log('playMusic-setTimeout')
          pauseMusic()
          setTimeout(() => {
            playMusic('playMusic-setTimeout')
          }, 30)
        }, 80)
      }
    }

    // 暂停播放
    const pauseMusic = () => {
      const Auto = document.getElementById('audio')
      Auto.pause()
    }
    // 切换播放状态
    const changePlay = () => {
      if (data.firstPlay) {
        $store.commit('changeFirstplay')
        return
      }
      data.playing = !data.playing
      if (data.playing) {
        const Auto = document.getElementById('audio')
        IntervalRotate = setInterval(() => {
          if (Auto.currentTime >= data.duration && data.duration !== 0) {
            changeMusicPlay("next")
            return
          }
          data.MusiccurrentTime = Auto.currentTime
          if (!data.dragStatus) { // 只有在不拖动滑块的情况下 计算滑块值
            data.sliderValue = data.duration === 0 ? 0 : data.MusiccurrentTime / data.duration * 100
          }
          data.rotateNum++
          if (data.rotateNum >= 360) {
            data.rotateNum = 0
          }
        }, 55);
        playMusic()
      } else if (IntervalRotate && !data.playing) {
        pauseMusic()
        clearInterval(IntervalRotate)
      } else {
        pauseMusic()
      }
    }

    // 转换播放时间格式
    const currentTime = computed(() => {
      return formatTime(data.MusiccurrentTime)
    })

    // 总时长时间格式
    const durationTime = computed(() => {
      return formatTime(data.duration)
    })

    // 时间格式化
    const formatTime = (time) => {
      if (time === 0 || time === '0') {
        return "00:00"
      }
      const mm = Math.floor(time / 60)
      const ss = Math.floor(time % 60)
      return `${mm < 10 ? "0" + mm : mm}:${ss < 10 ? '0' + ss : ss}`
    }

    // 切换上一首下一首 状态处理
    const changeMusicPlay = (type) => {
      pauseMusic()
      if (IntervalRotate) {
        data.rotateNum = 0
        clearInterval(IntervalRotate)
      }
      if (Auto) {
        Auto = null
      }
      data.playing = false
      const index = playList.findIndex((item) => item.id === data.currentId)
      let currentIndex = 0
      if (type === 'pre') {
        currentIndex = index > 0 ? index - 1 : playList.length - 1
      } else if (type === 'next') {
        currentIndex = index < playList.length - 1 ? index + 1 : 0
      }
      data.currentId = playList[currentIndex].id
      const picUrl = playList[currentIndex].al.picUrl
      data.picUrl = picUrl
      $store.dispatch('setPlayUrl', picUrl)
      getPlayUrl()
    }
    // 进度条拖动
    // dragStart dragEnd
    const dragStart = () => {
      data.dragStatus = true
    }

    const dragEnd = () => {
      data.dragStatus = false
    }
    // 进度条拖动触发  (方法不生效)
    const sliderInput = (value) => {
      // console.log(111)
      // console.log(value, 'inputvalue')
    }

    // 进度变化且结束拖动后触发
    const sliderChange = (value) => {
      if (Auto) {
        Auto.currentTime = data.duration * value / 100
      }
    }

    watch([() => data.dragStatus], ([newDragStatus]) => {
      // console.log(newDragStatus, 'newDragStatus')
    })


    onMounted(() => {

    })

    onUnmounted(() => {
      if (IntervalRotate) {
        clearInterval(IntervalRotate)
      }
    })

    return {
      ...toRefs(data),
      currentTime,
      durationTime,
      onClickLeft,
      changePlay,
      changeMusicPlay,
      dragStart,
      dragEnd,
      sliderChange,
      sliderInput,
    }
  }
})
</script>

<style lang='less'>
.play {
  position: relative;
  padding-top: 1px;
  width: 100vw;
  height: 100vh;
  .img-box {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .bg {
    width: 100%;
    height: 100%;
    filter: blur(20px);
    opacity: 0.8;
    position: absolute;
    top: 0;
    left: 0;
  }
  .cd-box {
    width: 320px;
    height: 320px;
    margin: 80px auto;
    background: url("@/assets/img/disc.png") no-repeat center;
    background-size: 100% 100%;
    position: relative;
    z-index: 2;
    & > img {
      width: 195px;
      height: 195px;
      position: absolute;
      left: 50%;
      top: 50%;
      border-radius: 50%;
    }
    &.playing::after {
      transform: rotate(0deg);
    }
    &::after {
      content: "";
      width: 120px;
      height: 175px;
      position: absolute;
      left: 175px;
      top: -92px;
      background: url("@/assets/img/needle.png") no-repeat center;
      background-size: 100% 100%;
      transform: rotate(-15deg);
      transform-origin: 24px 0px;
      transition: transform 0.25s;
    }
  }
  .slider-content {
    width: 100%;
    padding: 0 20px;
    margin-bottom: 40px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    p {
      color: #fff;
      font-size: 14px;
      font-family: "din";
      &.text-left {
        margin-right: 10px;
      }
      &.text-right {
        margin-left: 10px;
      }
    }
  }
  .control {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    margin-top: 10px;
    i {
      font-size: 40px;
      margin: 0 20px;
      color: #fff;
    }
    img {
      height: 32px;
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