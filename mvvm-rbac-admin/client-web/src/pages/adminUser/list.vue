<template>
  <div class="phoneBrands-list">
    <table>
      <thead>
        <tr>
          <th>序号</th>
          <th>头像</th>
          <th>角色</th>
          <th>管理员名字</th>
          <th>电话号码</th>
          <th>创建时间</th>
          <th>最后修改时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in data" :key="item.id">
          <td>{{index+1}}</td>
          <td>
            <img :src="'http://localhost:7001' + item.avatar" alt="">
          </td>
          <td>{{item.role.title}}</td>
          <td>{{item.username}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.createdAt}}</td>
          <td>{{item.updatedAt}}</td>
          <td>
            <button v-if="hasPermission('adminUserUpdate')" @click="updateItem(item.id)" class="warning">编辑</button>
            <button v-if="hasPermission('adminUserDelete')" @click="delItem(item.id)" class="dialog">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="app-page">
      <button @click="prevPage">上一页</button>
      <span>总页数{{pages}}/</span>
      <span>总条数{{count}}/</span>
      <span>当前第{{page}}页/</span>
      <button @click="nextPage">下一页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import routerStore from '../../store/module/router'
import { apiAdminUser, deleteApiAdminUser } from '../../api/request'
import PageHeaderVue from '../../components/PageHeader.vue';
const routerStoreInstance = routerStore()
const router = useRouter()
let data = reactive<any>({})
let limit = ref<any>('')
let page = ref<any>('')
let pages = ref<any>(0)
let count = ref<any>(0)
let permissionArr = reactive<any[]>([])
const hasPermission = (item: any) => {
  return permissionArr.includes(item)
}
const permissionArrFn = () => {
  let newArr: any[] = []
  var i = 0
  function toArr(data: any) {
    data.forEach((item: any, index: number) => {
      newArr[i] = item.name
      i++
      if (item.children) {
        toArr(item.children)
      }
    })
    return newArr
  }
  permissionArr = toArr(routerStoreInstance)
}
permissionArrFn()
const getData = () => {
  let params: any = {}
  if (limit.value) {
    params.limit = limit.value
  }
  if (page) {
    params.page = page.value
  }
  apiAdminUser({ params })
    .then(res => {
      console.log(res.data)
      data = res.data.data.rows
      count.value = res.data.data.count
      pages.value = Math.ceil(count / limit)
    })
    .catch(err => {
      console.log(err)
    })
}
getData()
const updateItem = (id: string) => {
  router.push({
    path: '/adminUser/update',
    query: {
      id: id
    }
  })
}
const delItem = (id: string) => {
  deleteApiAdminUser({ id }, 'delete').then((res: any) => {
    console.log(res)
    getData()
  })
    .catch((err: any) => {
      console.log(err)
    })
}
const prevPage = () => {
  page.value--
  if (page.value < 1) {
    page.value = 1
    return
  }
  getData()
}
const nextPage = () => {
  page.value++
  if (PageHeaderVue.value > pages.value) {
    page.value = pages.value
    return
  }
  getData()
}
</script>

<style>

</style>
