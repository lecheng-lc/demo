<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your APP3 " />
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
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.home {
  color: blue;
}
.carControlArea {
  margin: auto;
  margin-top: 32rpx;
  border-radius: 20rpx;
  width: 686rpx;
  border-radius: 40rpx;
}

.carControlArea .carControlArea-containertop {
  /* height: 250rpx; */
  margin-bottom: 60rpx;
}

.carControlArea .carControlArea-container {
  display: flex;
  justify-content: space-around;
  align-items: center;

  /* height: 210rpx; */
}

.carControlArea .control-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 30rpx;
  color: rgba(31, 51, 95, 1);
}

.carControlArea .control-item .image-area {
  /* width: 140rpx; */
  /* height: 180rpx; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.carControlArea .control-item .img {
  width: 140rpx;
  /* height: 180rpx;  */
}

.carControlArea .control-item .loading-img {
  width: 48rpx;
  height: 48rpx;
  animation: spin 0.5s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.carControlArea .control-item .cm-name-blue {
  /* color: rgba(85,136,255);
font-weight:600; */
}

.carControlArea .control-item .loading-area {
  display: flex;
  align-items: center;
  justify-content: center;
}

.carControlArea .control-item .loading-area .imgarea {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>