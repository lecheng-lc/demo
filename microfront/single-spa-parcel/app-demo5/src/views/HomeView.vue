<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button class="post" @click="testPost">点我尝试进行通信</button>
  </div>
</template>

<script>
// import vuex2 from '../store/index2'
export default {
  name: 'HomeView',
  components: {
  },
  mounted(){
    window.bbb = 22
  },
  methods:{
    testPost() {
      this.$eventEmitter && this.$eventEmitter.emit('test','测试参数a', '测试参数b')
    }
  }
}
</script>
