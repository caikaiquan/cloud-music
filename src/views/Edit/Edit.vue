<template>
  <div class="edit-container">
    <van-field v-model="message" rows="5" autosize type="textarea" maxlength="50" placeholder="输入分享内容..." show-word-limit />
    <van-uploader v-model="fileList" multiple :max-count="9" />
    <van-button type="primary" class="publish">发布</van-button>
    <van-icon name="revoke" class="back-btn" @click="onClickLeft" />
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup(){
    const { push } = useRouter()
    const data = reactive({
      message: '',
      fileList: []
    })

    const onClickLeft = () => {
      history.go(-1)
    }

    return {
      ...toRefs(data),
      onClickLeft
    }
  }
})
</script>

<style lang='less'>
.edit-container{
  height: 100%;
  position: relative;
  .van-uploader{
    width: 100%;
  }
  .van-uploader__wrapper{
    display: flex;
    flex-wrap: wrap;
    &>div{
      width: 33.333%;
      height: 120px;
      box-sizing: border-box;
      margin: 0;
    }
    .van-uploader__preview{
      .van-uploader__preview-image{
        width: 100%;
        height: 100%;
      }
    }
  }
  .publish{
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