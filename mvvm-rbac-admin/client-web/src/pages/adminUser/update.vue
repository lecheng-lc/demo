<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { apiRole, apiAdminUserOne,apiAdminUser } from '../../api/request'
const router = useRouter()
const route = useRoute()
let id = ref<any>('')
let username = ref('')
let password = ref('')
let avatar = ref('')
let phone = ref('')
let avatarShow = ref('')
let data = reactive<any>({})
let roleData = ref<any>('')
let roleId = ref('')
id.value = route.query.id
const getRoleData = () => {
  apiRole()
    .then(res => {
      console.log(res.data)
      roleData.value = res.data.data
    })
    .catch(err => {
      console.log(err)
    })
}
getRoleData()
const getData = () => {
  apiAdminUserOne({id:id.value})
    .then((res: any) => {
      data = res.data
      username.value = res.data.data.username
      password.value = res.data.data.password
      avatar.value = res.data.data.avatar
      phone.value = res.data.data.phone
      roleId.value = res.data.data.roleId
    })
    .catch((err: any) => {
      console.log(err)
    })
}
getData()
const uploadImg = (event: any) => {
  avatar = event.target.files[0]
  var windowURL = window.URL || window.webkitURL
  avatarShow.value = windowURL.createObjectURL(event.target.files[0])
}
const delNowImg = () => {
  avatarShow.value = ''
  avatar.value = ''
}
const onSubmit = () => {
  let formData = new FormData()
  let data = JSON.stringify({
    id: id.value,
    username: username.value,
    password: password.value,
    phone: phone.value
  })
  formData.append('avatar', avatar.value)
  formData.append('data', data)
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  apiAdminUser(formData, 'put', config)
    .then(res => {
      console.log(res.data)
      router.push({
        path: '/adminUser/list'
      })
    })
    .catch(err => {
      console.log(err)
    })
}
</script>
<template>
  <div class="app-phone-create">
    <div class="app-form">
      <label>
        <span>管理员角色</span>
        <select v-model="roleId">
          <option v-for="item in roleData" :key="item.id" :value="item.id">{{item.title}}</option>
        </select>
      </label>
      <label>
        <span>用户名</span>
        <input type="text" v-model="username">
      </label>
      <label>
        <span>用户密码</span>
        <input type="text" v-model="password">
      </label>
      <label>
        <span>用户手机号码</span>
        <input type="text" v-model="phone">
      </label>
      <label v-if="!avatar">
        <span>用户头像</span>
        <input v-if="!avatarShow" type="file" @change="uploadImg($event)">
      </label>
      <div v-else class="show-avartar">
        <img v-if="avatar && avatarShow" :src="avatarShow" alt="">
        <img v-else :src="'http://localhost:7001'+avatar" alt="">
        <span class="delete-avatar" @click="delNowImg">删除头像</span>
      </div>
      <label>
        <span></span>
        <button @click="onSubmit()">提交</button>
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .show-avartar{
    img{
      width:100px;
      height:100px;
      object-fit: cover;
    }
  }
  .delete-avatar{
    margin-left: 10px;
  }
</style>

