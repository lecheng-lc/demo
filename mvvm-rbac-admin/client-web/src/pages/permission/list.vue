<template>
  <div class="phoneBrands-list">
    <table class="app-tables border center">
      <thead>
        <tr>
          <th>序号</th>
          <th>类型</th>
          <th>name</th>
          <th>title</th>
          <th>创建时间</th>
          <th>最后修改时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody v-for="(item,index) in data" :key="item.id">
        <tr style="background:#00aaee;">
          <td>{{index+1}}</td>
          <td v-if="item.permissionId === 0">顶级模块</td>
          <td v-else-if="item.permissionId === 1">模块</td>
          <td v-else-if="item.permissionId === 2">菜单</td>
          <td v-else>操作</td>
          <td>{{item.name}}</td>
          <td>{{item.title}}</td>
          <td>{{item.createdAt}}</td>
          <td>{{item.updatedAt}}</td>
          <td>
            <button @click="updateItem(item.id)" class="app-btn-blue">编辑</button>
            <button @click="delItem(item.id)" class="app-btn-red">删除</button>
          </td>
        </tr>
        <tr v-for="(item2,index2) in item.children" :key="item2.id">
          <td>{{index2+1}}</td>
          <td v-if="item2.permissionId === 0">顶级模块</td>
          <td v-else-if="item2.permissionId === 1">模块</td>
          <td v-else-if="item2.permissionId === 2">菜单</td>
          <td v-else>操作</td>
          <td>{{item2.name}}</td>
          <td>{{item2.title}}</td>
          <td>{{item2.createdAt}}</td>
          <td>{{item2.updatedAt}}</td>
          <td>
            <button @click="updateItem(item2.id)" class="app-btn-blue">编辑</button>
            <button @click="delItem(item2.id)" class="app-btn-red">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { apiPermission, deleteApiPermisssion } from '../../api/request'
const router = useRouter()
let data = ref<any>('')
const getData = () => {
  apiPermission()
    .then(res => {
      console.log(res.data)
      data = res.data.data[0].children
    })
    .catch(err => {
      console.log(err)
    })
}
const updateItem = (id: string) => {
  router.push({
    path: '/permission/update',
    query: {
      id: id
    }
  })
}
getData()
const delItem = (id: string) => {
  deleteApiPermisssion({ id })
    .then(res => {
      console.log(res)
      getData()
    })
    .catch(err => {
      console.log(err)
    })
}
</script>

<style>

</style>
