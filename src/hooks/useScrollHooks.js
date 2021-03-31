import { ref, onMounted, onUnmounted } from 'vue'
const useScrollHooks = (Element) => {
  let dom = null
  const status = ref(false)
  const scroll = (e) => {
    const scrollHeight = e.target.scrollHeight  // 内容实际高度
    const clientHeight = e.target.clientHeight  // 可见区域高度
    const scrollTop = e.target.scrollTop        // 滚动被卷去的高度
    if (scrollHeight < (clientHeight + scrollTop + 50)) {
      status.value = true
    } else {
      status.value = false
    }
  }
  onMounted(() => {
    dom = document.querySelector(Element)
    dom.addEventListener('scroll', scroll)
  })
  onUnmounted(() => {
    if (dom) {
      dom.removeEventListener('scroll', scroll)
    }
  })
  return status
}

export default useScrollHooks