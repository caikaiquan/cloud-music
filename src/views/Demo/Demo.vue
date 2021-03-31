<template>
  <div class="demo">
    {{num}}
    <br>
    <van-button type="primary" @click="addNum">Add Num</van-button>
    <p class="text">style vars</p>
  </div>
</template>

<script setup="props">
import { ref, reactive } from 'vue'
const num = ref(99)
const state = reactive({
  color: "red",
});
const addNum = () => {
  num.value++
}
// return {
//   num
// } 
</script>


<style >
.text {
  color: v-bind("state.color");
}
</style>