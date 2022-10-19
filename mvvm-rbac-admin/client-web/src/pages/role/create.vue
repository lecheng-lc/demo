<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiRole } from '../../api/request'
const title = ref('')
const description = ref('')
const router = useRouter()
const onSubmit = () => {
  apiRole({
    title: title.value,
    description: description.value
  }).then(() => {
    router.push({
      path: '/role/list'
    })
  })
    .catch(err => {
      console.log(err)
    })
}
</script>
<template>
  <div class="app-role-create">
    <div class="app-form">
      <label>
        <span>角色标题</span>
        <input type="text" v-model="title">
      </label>
      <label>
        <span>角色描述</span>
        <input type="text" v-model="description">
      </label>
      <label>
        <span></span>
        <button @click="onSubmit()">提交</button>
      </label>
    </div>
  </div>
</template>


