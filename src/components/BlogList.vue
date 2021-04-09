<template>
  <div class="blog-list">
    <div class="blog-card" v-for='index in [1,2,3,4,5]' :key='index'>
      <div class="user-info">
        <img :src="userImg" alt="">
        <p class="user-name">Admin</p>
        <p class="create-time">2021-04-02 17:36:23</p>
      </div>
      <div class="comment-text">
        这里记录的是一段评论
      </div>
      <van-grid :border='false' :column-num="3" gutter='5' class="img-list">
        <van-grid-item>
          <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
        </van-grid-item>
        <van-grid-item>
          <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
        </van-grid-item>
        <van-grid-item>
          <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
        </van-grid-item>
      </van-grid>
      <div class="comment">
        <div class="comment-box">
          <van-icon name="chat-o" size="20" badge="99+" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, reactive, toRefs } from 'vue'
export default defineComponent({
  setup () {
    const { ctx } = getCurrentInstance()
    const $store = ctx.$store
    const userInfo = $store.getters.userInfo
    const userImg = userInfo.base64
    const data = reactive({
      userImg
    })
    return {
      ...toRefs(data)
    }
  }
})
</script>
<style lang='less'>
.blog-list {
  background: #f5f5f5;
  .blog-card {
    padding: 10px;
    background: #fff;
    position: relative;
    &+.blog-card{
      margin-top: 10px;
    }
    .user-info {
      padding-left: 40px;
      position: relative;
      & > img {
        position: absolute;
        left: 0;
        top: 0;
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .user-name {
        font-size: 16px;
      }
      .create-time {
        font-size: 12px;
        color: #777;
      }
    }
    .comment-text {
      margin-top: 10px;
    }

    .img-list{
      margin: 10px -5px;
    }

    .comment {
      display: flex;
      justify-content: center;
      position: absolute;
      top: 20px;
      right: 20px;
      .comment-box{
        display: flex;
        p{
          margin-left: 10px;
        }
      }
    }
  }
}
</style>