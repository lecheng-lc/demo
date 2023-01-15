<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
export default {
  mounted() {
    setTimeout(()=>{
      console.log(window.rootStore)
    },1000)
    window.rootStore.commit('app1/increment',{})
    // console.log(this.$store)
    // console.log(this.$store.commit('test/increment2'))
  }
}
</script>
