<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your APP1 " />
    <button @click="loadCanvas">加载canvas</button>
    <div id="parcel"></div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { mountParcel } from '../main'
// import { parcelConfig } from '../../../app-main/parcels'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted() {
    window.aaa = 222
    this.loadParcel()
  },
  methods: {
    loadCanvas(){
      window.event.emit('test', '测试参数')
      import('html2canvas').then(res=>{
        console.log('异步加载资源')
      })
    },
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