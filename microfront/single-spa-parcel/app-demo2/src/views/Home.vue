<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div id="parcel"></div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { mountParcel } from '../main'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted() {
    window.test = 4
    this.loadParcel()
  },
  methods: {
    loadParcel() {
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  color: red;
}
</style>

