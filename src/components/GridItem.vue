<template>
  <div class="grid-list">
    <div class="grid-item" v-for="(item,index) in playlist" :key="index" @click='goPlayDetail(item)'>
      <img :src="item.coverImgUrl" alt="">
      <p class="text">{{item.name}}</p>
      <p class="playnum">
        <van-icon name="service-o" />
        {{ switchCount(item.playCount, 2) }}
      </p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { switchCount } from '@/util/common.js'
export default defineComponent({
  props: {
    playlist: Array
  },
  setup () {
    const { push } = useRouter()
    const goPlayDetail = (item) => {
      push({ path: '/playlist', query: { id: item.id } })
    }
    return {
      switchCount,
      goPlayDetail
    }
  }
})
</script>

<style lang='less'>
.grid-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .grid-item {
    width: calc(33.333% - 8px);
    position: relative;
    img {
      width: 100%;
      height: 100px;
    }
    .text {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      margin: 5px 0 10px 0;
    }
    .playnum {
      position: absolute;
      right: 3px;
      top: 3px;
      color: #fff;
      font-size: 12px;
      display: flex;
      align-items: center;
      i {
        margin-right: 3px;
      }
    }
  }
}
</style>