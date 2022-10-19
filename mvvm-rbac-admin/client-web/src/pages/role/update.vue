<template>
  <div class="app-phone-create">
    <div class="app-form">
      <label>
        <span>手机名字</span>
        <input type="text" v-model="title" />
      </label>
      <label>
        <span>手机描述</span>
        <input type="text" v-model="description" />
      </label>
      <label>
        <span></span>
        <button @click="onSubmit()">提交</button>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {adminUserStore} from '../../store/module/adminUser'
import { apiRole, putApiRole } from '../../api/request'
const router = useRouter()
const adminUserInstance = adminUserStore()
let title = ref('')
let id = ref<any>(adminUserInstance.adminUser.id)
let description = ref('')
const getRoleData = () => {
  apiRole({ id:id.value })
    .then((res) => {
      title.value = res.data.data[0].title
      description.value = res.data.data[0].description
    })
    .catch((err) => {
      console.log(err)
    })
};
getRoleData()
const onSubmit = () => {
  putApiRole({
    id:id.value,
    title: title.value,
    description: description.value
  })
    .then((res) => {
      console.log(res.data);
      router.push({
        path: "/role/list",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>
