<template>
  <div class="blog">
    <div class="blog-container">
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Footer from '@/components/Footer.vue'
export default defineComponent({
  components: { Footer },
  setup () {
    return {}
  }
})
</script>

<style lang='less'>
.blog {
  width: 100%;
  height: 100vh;
  .blog-container {
    width: 100%;
    height: calc(100% - 50px);
  }
}
</style>