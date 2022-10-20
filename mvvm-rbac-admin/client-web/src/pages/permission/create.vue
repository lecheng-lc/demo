<template>
  <div class="app-role-create">
    <div class="app-form">
      <label>
        <span>层级</span>
        <select v-model="permissionId">
          <option value="0">顶层模块</option>
          <option v-for="item in dealedOptions" :key="item.id" :value="item.id">{{item.name}}
          </option>
        </select>
      </label>
      <label>
        <span>路由名</span>

        <p><input type="radio" value="1" v-model="type">模块</p>
        <p><input type="radio" value="2" v-model="type">菜单</p>
        <p><input type="radio" value="3" v-model="type">操作</p>
      </label>
      <label>
        <span>路由名</span>
        <input type="text" v-model="name">
      </label>
      <label>
        <span>路由标题</span>
        <input type="text" v-model="title">
      </label>
      <label>
        <span></span>
        <button @click="onSubmit()">提交</button>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive ,computed} from 'vue'
import { useRouter } from 'vue-router'
import { rolePermision, permissionByCreate } from '../../api/request'
const router = useRouter()
let permissionId = ref('')
let permissionData = ref<any>([])
let name = ref('')
let title = ref('')
let type = ref(1)
const onSubmit = () => {
  rolePermision({
    permissionId: permissionId.value,
    name: name.value,
    title: title.value,
    type: type.value
  }, 'post')
    .then(res => {
      console.log(res.data)
      router.push({
        path: '/permission/list'
      })
    })
    .catch(err => {
      console.log(err)
    })
}
const dealedOptions = computed(()=>{
  return permissionData.value.length && permissionData.value.filter((item:any)=>{
    return item.type === 1
  })
})
const getPermissionData = () => {
  permissionByCreate()
    .then(res => {
      console.log(res.data)
      permissionData.value = res.data.data as any
      permissionId.value = permissionData.value[0].id
    })
    .catch(err => {
      console.log(err)
    })
}
getPermissionData()
</script>
