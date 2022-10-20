
<script setup lang="ts">
import {adminUserStore} from '../../store/module/adminUser'
import { ref } from 'vue'
import { rolePermision, apiPermission, roleAuth, apiAuth } from '../../api/request'
import { useRoute, useRouter } from 'vue-router'
const adminUserInstance = adminUserStore()
const route = useRoute()
const router = useRouter()
let data = ref<any>('')
let checkData = ref<any>({})
let roleId = ref<any>(adminUserInstance.adminUser.id)

const byStatusAddCheck = (arr: any) => {
  arr.map((item: any) => {
    if (item.status === 1) {
      item.check = true
    } else {
      item.check = false
    }
    if (item.createdAt) {
      delete item.createdAt
    }
    if (item.updatedAt) {
      delete item.updatedAt
    }
    if (item.permissionId) {
      delete item.permissionId
    }
    if (item.type) {
      delete item.type
    }
    if (item.status) {
      delete item.status
    }
    if (item.children && item.children.length > 0) {
      byStatusAddCheck(item.children)
    }
  })
  return arr
}
const getData = (checkData: any) => {
  apiPermission().then(res => {
    console.log(res.data)
    data.value = res.data.data
    checkData.forEach((someItem: any) => {
      data.value.forEach((allItem1: any) => {
        if (someItem.id === allItem1.id) {
          allItem1.check = true
        }
        allItem1.children.forEach((allItem2: any) => {
          if (someItem.id === allItem2.id) {
            allItem2.check = true
          }
          allItem2.children.forEach((allItem3: any) => {
            if (someItem.id === allItem3.id) {
              allItem3.check = true
            }
          })
        })
      })
    })
  })
    .catch(err => {
      console.log(err)
    })
}
const getCheckData = () => {
  roleAuth({
    roleId: roleId.value
  }).then((res: any) => {
    console.log(res.data)
    let newArr: any[] = []
    var i = 0
    function toArr(data: any) {
      data.forEach((item: any, index: number) => {
        newArr[i] = {
          id: item.id
        }
        i++
        if (item.children) {
          toArr(item.children)
        }
      })
      return newArr
    }
    checkData.value = toArr(res.data.data)
    getData(checkData.value)
  })
    .catch(err => {
      console.log(err)
    })
}
const postData = () => {
  console.log(1234)
  let arr: any[] = []
  var i = 0
  function toArr(data: any[]) {
    data.forEach((item: { id: any; name: any; check: any; children: any; }, index: any) => {
      arr[i] = {
        id: item.id,
        name: item.name,
        check: item.check
      }
      i++
      if (item.children) {
        toArr(item.children)
      }
    })
    return arr
  }
  let result = toArr(data.value).filter(item => item.check)
  result.forEach(item => {
    delete item.check
  })
  apiAuth({
    roleId: roleId.value,
    data: result
  },'post')
    .then((res: any) => {
      console.log(res)
      router.push({
        path: '/role/list'
      })
    })
    .catch((err: any) => {
      console.log(err)
    })
}
const hangleItem2 = (item2: any) => {
  console.log(item2.check)
}
const hangleItem3 = (item3: any) => {
  console.log(item3.check)
}
getCheckData()
</script>
<template>
  <div>
    <ul class="ul-item">
      <li v-for="(item) in data" :key="item.id">
        <label>
          <input disabled type="checkbox" v-model="item.check">
          <span>{{item.title}}</span>
        </label>
        <ul class="ul-item2" v-if="item.children && item.children.length >0">
          <li v-for="(item2) in item.children" :key="item2.id">
            <label @change="hangleItem2(item2)">
              <input type="checkbox" v-model="item2.check">
              <span>{{item2.title}}</span>
            </label>
            <ul class="ul-item3" v-if="item2.children && item2.children.length >0">
              <li v-for="(item3) in item2.children" :key="item3.id">
                <label @change="hangleItem3(item3)">
                  <input type="checkbox" v-model="item3.check">
                  <span>{{item3.title}}</span>
                </label>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <button @click="postData">确定</button>
    </ul>
  </div>
</template>


<style lang="scss">
.ul-item {
  input {
    margin-right: 10px;
  }

  >li {
    >label {
      display: flex;
      align-items: center;
      height: 40px;
      border-bottom: 1px solid #ccc;
    }

    >.ul-item2 {
      >li {
        display: flex;
        align-items: center;
        height: 40px;
        border-bottom: 1px solid #ccc;

        >label {
          width: 200px;
          flex: 0 0 200px;
        }

        >.ul-item3 {
          flex: 1;
          display: flex;

          >li {
            width: 200px;
            flex: 0 0 200px;
          }
        }
      }
    }
  }
}
</style>
