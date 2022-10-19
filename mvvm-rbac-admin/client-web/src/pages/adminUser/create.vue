<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiRole, apiAdminUser } from '../../api/request'
const router = useRouter()
let roleData = reactive<any>({})
let roleId = ref<string>('')
let username = ref<string>('')
let password = ref<string>('')
let avatar = ref<string>('')
let phone = ref<string>('')
let avatarShow = ref<any>('')
const uploadImg = (event: any) => {
  avatar.value = event.target.files[0]
  var windowURL = window.URL || window.webkitURL
  avatarShow.value = windowURL.createObjectURL(event.target.files[0])
}
const delNowImg = () => {
  avatarShow.value = ''
  avatar.value = ''
}
const getRoleData = () => {
  apiRole()
    .then(res => {
      console.log(res.data)
      roleData = res.data.data
      roleId.value = roleData[0].id
    })
    .catch(err => {
      console.log(err)
    })
}
getRoleData()
const onSubmit = () => {
  let formData = new FormData()
  let data = JSON.stringify({
    roleId: roleId.value,
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
  apiAdminUser(formData, 'POST', config)
    .then((res: { data: any; }) => {
      console.log(res.data)
      router.push({
        path: '/adminUser/list'
      })
    })
    .catch((err: any) => {
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
        <span>名字</span>
        <input type="text" v-model="username">
      </label>
      <label>
        <span>密码</span>
        <input type="text" v-model="password">
      </label>
      <label>
        <span>手机号码</span>
        <input type="text" v-model="phone">
      </label>
      <label v-if="!avatarShow">
        <span>头像</span>
        <input type="file" @change="uploadImg($event)">
      </label>
      <div v-else class='avatarShow'>
        <span>头像</span>
        <img :src="avatarShow" alt="">
        <!-- <span @click="delNowImg()">删除</span> -->
        <button @click="delNowImg()" class="dialog">删除</button>
      </div>
      <label>
        <span></span>
        <button @click="onSubmit()">提交</button>
      </label>
    </div>
  </div>
</template>

