<template>
  <div class="home">
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script >
import { defineComponent } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default defineComponent({
  name: 'home',
  components: { Header, Footer },
  setup () {
    return {
    }
  }
})
</script>

<style lang='less' scoped>
@color: red;
.home {
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
}
</style>