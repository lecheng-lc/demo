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
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { apiRole, putApiRole } from "../../api/request";
const route = useRoute();
const router = useRouter();
let title = ref("");
let id = ref<any>("");
let description = ref("");
id = route.query.id;
const getRoleData = () => {
  apiRole({ id })
    .then((res) => {
      console.log(res.data);
      title.value = res.data.data[0].title;
      description.value = res.data.data[0].description;
    })
    .catch((err) => {
      console.log(err);
    });
};
getRoleData();
const onSubmit = () => {
  putApiRole({
    id: id,
    title: title,
    description: description,
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
