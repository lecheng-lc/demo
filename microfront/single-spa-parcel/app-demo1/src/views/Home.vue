<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your APP1 " />
    <div id="parcel"></div>
    阿斯达
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mountParcel } from '../main'
// import { parcelConfig } from '../../../app-main/parcels'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted() {
    window.test=2
    this.loadParcel()
    window.sessionStorage.setItem('hh', 'aa')
  },
  methods: {
    loadParcel() {
      var domElement = document.getElementById('parcel')
      const appDemo = () => System.import("app-demo3")
      appDemo().then(res => {
        Promise.resolve(res)
        // 由于systemjs版本的问题，得用res.default了
        mountParcel(res.default, { domElement })
      }).then(() => {
      })
      // @abandon，新版本的systemjs不再支持这样引入
      // mountParcel(System.import("sample-react-parcel"), { domElement })
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  color: azure;
}
</style>