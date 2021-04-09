<template>
  <div class="blog">
    <div class="blog-container">
      <van-row class="search-bar">
        <van-col span="3" class="edit-col-box">
          <van-icon name="edit" class="edit-btn" @click="handleEdit"/>
        </van-col>
        <van-col span="21">
          <van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" shape='round'>
            <template #action>
              <van-button class="search-btn" type="primary" block @click="onSearch" size="small">搜 索</van-button>
            </template>
          </van-search>
        </van-col>
      </van-row>
      <div class="content">
        <blog-list></blog-list>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import Footer from '@/components/Footer.vue'
import BlogList from '@/components/BlogList.vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  components: { Footer, BlogList },
  setup () {
    const { push } = useRouter()

    const data = reactive({
      value: ''
    })

    const onSearch = (value) => {
      console.log(value, 'value')
    }

    const handleEdit = () => {
      push('/edit')
    }

    return {
      ...toRefs(data),
      onSearch,
      handleEdit
    }
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
    .search-bar {
      .edit-col-box {
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        .edit-btn {
          font-size: 22px;
          padding: 10px;
        }
      }
      .van-search {
        padding: 5px;
      }

      .search-btn {
        border-radius: 5px;
      }
    }

    .content {
      width: 100%;
      height: calc(100% - 44px);
      overflow-y: auto;
      background: #ccc;
    }
  }
}
</style>