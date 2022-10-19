<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="Title"
    :breadcrumb="{ routes }"
    sub-title="This is a subtitle"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
const routes = [
  {
    path: 'index',
    breadcrumbName: 'First-level Menu',
  },
  {
    path: 'first',
    breadcrumbName: 'Second-level Menu',
  },
  {
    path: 'second',
    breadcrumbName: 'Third-level Menu',
  },
];
export default defineComponent({
  setup() {
    return {
      routes,
    };
  },
});
</script>