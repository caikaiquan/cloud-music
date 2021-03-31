import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/music',
    component: () => import('@/views/Home/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Music/Music.vue'),
        meta: { title: '音乐' }
      },
    ]
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
    redirect: '/music'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next ) => {
  // 返回 false 以取消导航
  // return false
  const userInfo = sessionStorage.getItem('userInfo')
  if(!userInfo && to.path !== '/login' && false){
    next({path: '/login'})
  } else {
    document.title = to.meta.title
    next()
  }
})

export default router
