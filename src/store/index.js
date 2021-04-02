import { createStore } from "vuex";

const userJson = sessionStorage.getItem('userInfo')
const userInfo = userJson ? JSON.parse(userJson) : {};
export default createStore({
  state: {
    userInfo,
    listData: { 1: 10 },
    num: 10,
    playList: [],
    playUrl: '',
    firstPlay: true,
    
  },
  mutations: {
    setData (state, value) {
      state.listData = value
    },
    addNum (state, value) {
      state.num = value
    },
    setPlayList (state, list) {
      state.playList = list
    },
    setPlayUrl(state, url){
      state.playUrl = url
    },
    changeFirstplay: (state) => {
      state.firstPlay = false
    },
    setUserInfo: ( state, userinfo ) => {
      state.userInfo = userinfo
    }
  },
  actions: {
    setData (context, value) {
      context.commit('setData', value)
    },
    addNum ({ commit }, value) {
      commit('addNum', value)
    },
    setPlayList ({ commit }, list) {
      commit('setPlayList', list)
    },
    setPlayUrl({ commit }, url){
      commit('setPlayUrl', url)
    }
  },
  getters: {
    getNum (state) {
      return state.num
    },
    getPlayList(state){
      return state.playList
    },
    getPlayUrl(state){
      return state.playUrl
    },
    firstPlay(state){
      return state.firstPlay
    },
    userInfo(state) {
      return state.userInfo
    }
  },
  modules: {}
});