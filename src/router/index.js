import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/music',
    component: () => import('@/views/Music/Music.vue'),
    meta: { title: '音乐' }
  },
  {
    path: '/search',
    component: () => import('@/views/Search/Search.vue'),
    meta: { title: '搜索' }
  },
  {
    path: '/user',
    component: () => import('@/views/User/user.vue'),
    meta: { title: '搜索' }
  },
  {
    path: '/playlist',
    component: () => import('@/views/Music/Playlist.vue'),
    meta: { title: '音乐' }
  },
  {
    path: '/play',
    component: () => import('@/views/Music/Play.vue'),
    meta: { title: '音乐' }
  },
  {
    path: '/login',
    component: () => import('@/views/LoginSign/index.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/sign',
    component: () => import('@/views/LoginSign/sign.vue'),
    meta: { title: '注册' }
  },
  {
    path: '/upload',
    component: () => import('@/views/Uploader/Uploader.vue'),
    meta: { title: '上传文件' }
  },
  {
    path: '/blog',
    component: () => import('@/views/Blog/Blog.vue'),
    meta: { title: '朋友圈' }
  },
  {
    redirect: '/music'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  // 返回 false 以取消导航
  // return false
  const userInfo = sessionStorage.getItem('userInfo')
  if (!userInfo && to.path !== '/login' && false) {
    next({ path: '/login' })
  } else {
    document.title = to.meta.title
    next()
  }
})

export default router
