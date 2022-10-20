<template>
  <div class="login-page" style="display: flex;align-items: center;">
    <a-form>
      <a-form-item label="账户">
        <a-input v-model:value="username" />
      </a-form-item>
      <a-form-item label="密码">
        <a-input v-model:value="password" />
      </a-form-item>
      <div style="text-align: center;">
        <a-button type="primary" @click="loginAction">登录</a-button>
        <a-button type="primary"  style="margin-left: 50px;" @click="openRegister">注册</a-button>
      </div>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { adminUserStore } from '../store/module/adminUser'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const adminUserInstance = adminUserStore()
const router = useRouter()
let username = ref('admin')
let password = ref('123456')
const loginAction = () => {
  adminUserInstance.login({
    username: username.value,
    password: password.value
  })
    .then((res: any) => {
      console.log(res)
      if (res.data.ok) {
        router.push({
          path: '/'
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
}
const openRegister = () => {
  router.push({
    path: '/register'
  })
}
</script>
<style lang="scss">
.login-page {
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
}
</style>

