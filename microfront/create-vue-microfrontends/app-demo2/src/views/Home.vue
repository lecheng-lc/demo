<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div id="parcel"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mountParcel } from '../main'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted() {
      this.loadParcel()
  },
  methods: {
      loadParcel() {
        // var domElement = document.getElementById('parcel')
        // /*global System*/
        // console.log(mountParcel)
        // mountParcel(() => System.import("sample-react-parcel"), { domElement })
      }
  }
}
</script>
<style lang="scss" scoped>
.home{
  color:red;
}
</style>

