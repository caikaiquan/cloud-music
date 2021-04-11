<template>
  <div class="edit-container">
    <van-field
      v-model="message"
      rows="5"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="输入分享内容..."
      show-word-limit
    />
    <van-uploader v-model="fileList" multiple :max-count="9" />
    <van-button type="primary" class="publish" @click="dispatchBlog"
      >发布</van-button
    >
    <van-icon name="revoke" class="back-btn" @click="onClickLeft" />
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { Dialog } from 'vant'
import request from '@/util/axios'
import { dealImage } from '@/util/common'
export default defineComponent({
  setup () {
    const { push } = useRouter()
    const { ctx } = getCurrentInstance()
    const userInfo = ctx.$store.getters.userInfo
    const data = reactive({
      message: '',
      fileList: []
    })

    const onClickLeft = () => {
      history.go(-1)
    }

    // 发布blog
    const dispatchBlog = async () => {
      if (!data.fileList.length && !data.message) {
        Dialog.alert({
          message: '请输入发布内容或者上传图片！！！',
          theme: 'round-button',
        })
      }

      if (!userInfo.id) {
        Dialog.alert({
          message: '只有登陆用户才能发布内容！！！',
          theme: 'round-button',
        })
      }

      let fileList = []
      for (let i = 0; i <= data.fileList.length - 1; i++) {
        const base64 = await dealImage(data.fileList[i].content, 750)
        const file = { ...data.fileList[i], content: base64 }
        fileList.push(file)
      }
      const option = {
        files: fileList,
        common: data.message,
      }
      request.post('/blog/dispatch', option)
        .then(res => {
          console.log('res', res)
          if (res.code === '0000') {
            push('/blog')
          }
        })
        .catch(err => {
          console.log(err, 'err')
        })
      // /blog/dispatch
    }

    return {
      ...toRefs(data),
      onClickLeft,
      dispatchBlog
    }
  }
})
</script>

<style lang='less'>
.edit-container {
  height: 100%;
  position: relative;
  .van-uploader {
    width: 100%;
  }
  .van-uploader__wrapper {
    display: flex;
    flex-wrap: wrap;
    & > div {
      width: 33.333%;
      height: 120px;
      box-sizing: border-box;
      margin: 0;
    }
    .van-uploader__preview {
      .van-uploader__preview-image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .publish {
    width: 120px;
    margin: 20px auto 0 auto;
    position: absolute;
    bottom: 20px;
    right: 20px;
  }

  .back-btn {
    position: absolute;
    left: 20px;
    bottom: 25px;
    font-size: 28px;
    z-index: 2;
  }
}
</style>