import { createStore } from "vuex";
export default createStore({
  state: {
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
    }
  },
  modules: {}
});