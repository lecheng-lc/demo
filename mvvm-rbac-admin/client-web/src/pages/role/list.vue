<script lang="ts" setup>
import { reactive, toRef } from 'vue'
import { useRouter } from 'vue-router'
import { adminUserStore } from '../../store/module/adminUser'
import { apiRole, deleApiRole } from '../../api/request'
const adminUser = adminUserStore().adminUser
const router = useRouter()
let data = reactive<any>({})
const handleOpen1 = () => {
  console.log('我是提示信息1')
}
const getData = () => {
  apiRole().then(res => {
    if (res.data.ok) {
      data = res.data.data
    }
  })
    .catch(err => {
      console.log(err)
    })
}
const updateItem = (id: string) => {
  router.push({
    path: '/role/update',
    query: {
      id: id
    }
  })
}
const delItem = (id: string) => {
  deleApiRole({ id })
    .then(res => {
      console.log(res)
      getData()
    })
    .catch(err => {
      console.log(err)
    })
}
const openAuth = (id: string) => {
  router.push({
    path: '/role/auth',
    query: {
      id: id
    }
  })
}
</script>
<template>
  <div class="phoneBrands-list">
    <table class="app-tables border center">
      <thead>
        <tr>
          <th>序号</th>
          <th>标题</th>
          <th>描述</th>
          <th>创建时间</th>
          <th>最后修改时间</th>
          <th v-if="adminUser.username=== 'admin'">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in data" :key="item.id">
          <td>{{index+1}}</td>
          <td>{{item.title}}</td>
          <td>{{item.description}}</td>
          <td>{{item.createdAt}}</td>
          <td>{{item.updatedAt}}</td>
          <td v-if="adminUser.username=== 'admin'">
            <button @click="openAuth(item.id)" class="info">授权</button>
            <button @click="updateItem(item.id)" class="warning">编辑</button>
            <button @click="delItem(item.id)" class="dialog">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <button @click="handleOpen1">打开提示 1</button> -->
  </div>
</template>



<style>

</style>
