<template>
  <div class="sign-login">
    <van-tabs v-model:active="active" class="container" v-if='false'>
      <van-tab title="登录">
        <van-form @submit="onLogin">
          <van-field border v-model="username" name="username" label="用户名" placeholder="用户名" :rules="[{ validator: validatorUsername }]" />
          <van-field v-model="password" :type="passwordStatus" name="password" label="密码" placeholder="密码" :rules="[{ validator: asyncValidator }]" :right-icon="rightIcon" @click-right-icon="showPassword" />
          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
              登 录
            </van-button>
          </div>
        </van-form>
      </van-tab>
      <van-tab title="注册">
        <van-form @submit="onSign">
          <van-field v-model="user" name="user" label="用户名" placeholder="用户名" :rules="[{ validator: validatorUsername }]" />
          <van-field v-model="psd" :type="psdStatus" name="psd" label="密码" placeholder="密码" :rules="[{ validator: asyncValidator}]" :right-icon="rightIcon1" @click-right-icon="showPsd" />
          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
              注 册
            </van-button>
          </div>
        </van-form>
      </van-tab>
    </van-tabs>

    <div class="container">
      <van-form @submit="onSign">
          <van-field v-model="user" name="user" label="用户名" placeholder="用户名" :rules="[{ validator: validatorUsername }]" />
          <van-field v-model="psd" :type="psdStatus" name="psd" label="密码" placeholder="密码" :rules="[{ validator: asyncValidator}]" :right-icon="rightIcon1" @click-right-icon="showPsd" />
          <van-field v-model="psd" :type="psdStatus" name="psd" label="确认密码" placeholder="确认密码" :rules="[{ validator: asyncValidator}]" :right-icon="rightIcon1" @click-right-icon="showPsd" />
          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
              注 册
            </van-button>
          </div>
        </van-form>
    </div>
    <van-icon name="revoke" class="back-btn" @click="onClickLeft" />
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import request from '@/util/axios'
import { getAES, getDAes } from '@/util/common.js'
import { Toast } from 'vant';
export default defineComponent({
  setup () {
    const { push } = useRouter()
    const { ctx } = getCurrentInstance()
    const $store = ctx.$store
    const data = reactive({
      active: '登录',
      username: '',
      password: '',
      user: '',
      psd: '',
      passwordStatus: 'password', // text password
      psdStatus: 'password',
    })

    const rightIcon = computed(() => {
      return data.passwordStatus === 'password' ? "closed-eye" : "eye-o"
    })

    const rightIcon1 = computed(() => {
      return data.psdStatus === 'password' ? "closed-eye" : "eye-o"
    })

    const showPassword = () => {
      data.passwordStatus = data.passwordStatus === 'password' ? 'text' : 'password'
    }

    const showPsd = () => {
      data.psdStatus = data.psdStatus === 'password' ? 'text' : 'password'
    }

    const validatorUsername = (value) => {
      if (!/[\d|a-z|A-Z]{6,12}/.test(value)) {
        return '输入6到12位之间的数字或子母'
      }
    }

    const asyncValidator = (value) => {
      if (!/[\d|a-zA-Z|@!&_.]{6,12}/.test(value)) {
        return '输入6到12位之间的数字或子母'
      }
    }

    const onLogin = (values) => {
      const data = { ...values, password: getAES(values.password) }
      request.post('/user/login', data)
        .then(res => {
          if (res.code === '0000') {
            // Toast.loading({
            //   duration: 1000, // 持续展示1.5s
            //   forbidClick: true,
            //   message: '登录成功',
            //   onClose: () => {
            //     Toast.clear()
            //     push({ path: '/music' })
            //   }
            // });
            const { islogin, logindate, token, username , id} = res
            const userInfo = { islogin, logindate, token, username , id }
            $store.commit('setUserInfo', userInfo)
            history.go(-1)
          }
        })
        .catch(err => {
          console.log(err, 'err')
        })
    }

    const onSign = (values) => {
      const data = { ...values, psd: getAES(values.psd) }
      request.post('/user/sign', data)
        .then(res => {
          if (res.code === '0000') {
            Toast.loading({
              duration: 1000, // 持续展示1.5s
              forbidClick: true,
              message: '注册成功',
              onClose: () => {
                Toast.clear()
                // push({ path: '/music' })
                history.go(-1)
              }
            });
          }
        })
        .catch(err => {
          console.log(err, 'err')
        })
    }

    const onClickLeft = () => {
      history.go(-1)
    }

    onMounted(() => {
    })

    return {
      ...toRefs(data),
      rightIcon,
      rightIcon1,
      onLogin,
      onSign,
      showPassword,
      showPsd,
      asyncValidator,
      validatorUsername,
      onClickLeft
    }
  }
})
</script>

<style lang='less'>
.sign-login {
  width: 100vw;
  height: 100vh;
  background: url("@/assets/img/loginbg.jpg") no-repeat center;
  background-size: 100% 100%;
  position: relative;
  .container {
    width: calc(100% - 40px);
    margin: 0 20px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
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