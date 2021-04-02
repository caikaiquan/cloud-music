<template>
  <div class="user">
    <div class="contanter">
      <!-- <van-cell is-link title="基础用法" @click="show = true" /> -->
      <div class="user-info">
        <div class="user-img">
          <div class="upload-box" v-if='!userImg'>
            <span class="add-text">上传头像</span>
            <!-- <van-uploader v-model="fileList" class="uploader-btn" /> -->
            <van-uploader :after-read="afterRead" preview-size='120px' class="uploader-btn" image-fit='cover' />
          </div>
          <img class="img-content" :src="userImg" alt="" v-if='userImg'>
        </div>
        <!-- <p class="login-text" @click="handleLogin">点击登录</p> -->
        <p class="user-name">{{userName}}</p>
      </div>
      <div class="menu-box">
        <van-cell icon="friends-o" :title="userName ? '切换账号' : '登录/注册'" is-link to="/login" />
        <van-cell icon="service-o" title="搜索歌曲" is-link to="/search" />
        <!-- <van-cell icon="gem-o" title="上传图片" is-link to="/upload" v-if="isAdmin"/> -->
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, getCurrentInstance, computed } from 'vue'
import { useRouter } from 'vue-router'
import request from '@/util/axios'
import Footer from '@/components/Footer.vue'
import { dealImage } from '@/util/common.js'
export default defineComponent({
  components: { Footer },
  setup () {
    const { push } = useRouter()
    const { ctx } = getCurrentInstance()
    const $store = ctx.$store
    let userinfo = $store.getters.userInfo

    console.log(userinfo, 'userinfo')
    const isAdminUser = () => {
      request.post('/get/isadmin', {})
        .then(res => {
          if (res.code === '0000') {
            console.log('管理员信息', userinfo)
            data.isAdmin = res.isAdmin
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    }
    // 用户信息存在才会校验是否是管理员权限登录
    userinfo.islogin && isAdminUser()

    const data = reactive({
      isAdmin: false,
      userName: computed(() => {
        return userinfo.username
      }),
      fileList: [],
      userImg: userinfo.base64 || ""
    })

    const handleLogin = () => {
      push('/login')
    }

    // 图片上传
    const afterRead = async (file) => {
      const res = await dealImage(file.content, 120)
      request.post('/update/userimg', { base64: res, id: userinfo.id })
        .then(res => {
          console.log(res, 'res')
          if (res.code === '0000' && res.base64) {
            data.userImg = res.base64
            userinfo = { ...userinfo, base64: res.base64 }
            $store.commit('setUserInfo', userinfo)
            sessionStorage.setItem('userInfo', JSON.stringify(userinfo))
          }
        })
        .catch(err => {
          console.log(err, '123132')
        })
    };


    return {
      ...toRefs(data),
      handleLogin,
      afterRead
    }
  }
})
</script>

<style lang='less'>
.user {
  width: 100%;
  height: 100%;
  padding-top: 1px;
  background: url("@/assets/img/user.jpg") no-repeat center top;
  background-size: 100% 230px;
  .contanter {
    width: 100%;
    height: 100%;
    .user-info {
      width: 100%;
      height: 230px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      & > .user-img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background: #fff;
        // position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .add-text {
          color: #666;
          font-size: 16px;
        }

        .uploader-btn {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 50%;
          overflow: hidden;
          .van-uploader__upload {
            margin: 0;
          }
          opacity: 0;
        }

        .img-content {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .user-name {
        height: 30px;
        line-height: 30px;
        color: #fff;
      }

      // .login-text {
      //   margin-top: 10px;
      //   color: #fff;
      // }
    }

    .menu-box {
      margin: 20px;
      border-radius: 5px;
      overflow: hidden;
    }
  }
}
</style>