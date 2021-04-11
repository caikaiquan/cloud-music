<template>
  <div class="blog-list">
    <div class="blog-card" v-for="item in blogList" :key="item['_id']">
      <div class="user-info">
        <img :src="item.userImg" alt="" />
        <p class="user-name">{{item.username}}</p>
        <p class="create-time">{{item.createTime}}</p>
      </div>
      <div class="comment-text">{{item.common}}</div>
      <van-grid
        :border="false"
        :column-num="3"
        gutter="5"
        class="img-list"
      >
        <van-grid-item v-for='(img, i) in item.imgList' :key='i' @click='showImages(item.imgList, i)'>
          <van-image :src="img" />
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
import { ImagePreview } from 'vant'
export default defineComponent({
  props: {
    blogList: Array
  },
  setup () {
    const { ctx } = getCurrentInstance()
    const $store = ctx.$store
    const userInfo = $store.getters.userInfo
    const userImg = userInfo.base64
    const data = reactive({
      userImg
    })

    const showImages = (list, index) => {
      ImagePreview({
        images: list,
        startPosition: index,
      });
    }

    return {
      ...toRefs(data),
      showImages
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
    & + .blog-card {
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

    .img-list {
      margin: 10px -5px;
    }

    .comment {
      display: flex;
      justify-content: center;
      position: absolute;
      top: 20px;
      right: 20px;
      .comment-box {
        display: flex;
        p {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>