<!--
 * @Descripttion: 
 * @version: 
 * @Author: wanghongkui
 * @Date: 2021-03-01 15:40:03
 * @LastEditTime: 2021-03-04 16:38:30
-->
<template>
  <div class="home">
    <img alt="Vue logo" @click="gogo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your APP1 " />
    <div id="parcel"></div>
    <Test />
    阿斯达
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Test from '../../../test.vue'
import { mountParcel } from '../main'
// import { parcelConfig } from '../../../app-main/parcels'
export default {
  name: 'Home',
  components: {
    HelloWorld,
    Test
  },
  mounted() {
    this.loadParcel()
    window.sessionStorage.setItem('hh', 'aa')
  },
  methods: {
    gogo() {
      // navigateToUrl(document.querySelector('a').href)
    },
    loadParcel() {
      var domElement = document.getElementById('parcel')
      /*global System*/
      const  appDemo = () => System.import("sample-react-parcel")
        console.log(System.import("dayjs"))
       appDemo().then(res=>{
          Promise.resolve(res)
        mountParcel(res.default, { domElement })
        }).then(res=>{
          console.log(res)
          console.log(456)
        })
      // mountParcel(() => System.import("app-demo3"), { domElement })
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