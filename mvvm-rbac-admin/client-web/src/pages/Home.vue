<script setup lang="ts">
import { adminUserStore } from '../store/module/adminUser'
import routerStore from '../store/module/router'
import { useRouter } from 'vue-router'
const BASEURL = 'http://localhost:7001'
const adminUserInstance = adminUserStore()
const adminUser = adminUserInstance.adminUser
const router = routerStore().router
const routerInstance = useRouter()
const logoutAction = () => {
  adminUserInstance.logout()
    .then((res: any) => {
      console.log(res)
      if (res.data.ok) {
        routerInstance.push({
          path: '/login'
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
}
</script>
<template>
  <div class="admin-layout">
  
    <nav class="layout-nav">
      <ul>
        <li v-for="item in router" :key="item.id">
          <div v-if="item.meta.type===2">
            <router-link :to="item.path">{{item.meta.title}}</router-link>
            <ul v-if="item.children">
              <li v-for="item2 in item.children" :key="item2.id">
                <div v-if="item2.meta.type===2">
                </div>
                <router-link :to="item2.path">{{item2.meta.title}}</router-link>
                <ul v-if="item2.children">
                  <li v-for="item3 in item2.children" :key="item3.id">
                    <div v-if="item3.meta.type===2">
                    </div>
                    <router-link :to="item3.path">{{item3.meta.title}}</router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
    <header class="layout-header">
      <ul class="header-left">
        <li v-for="(item,index) in <any>$route.meta.breadCrumb" :key="item.id">
          <router-link :to="item.path">{{item.title}} <span
              v-if="index !==  ($route.meta as any).breadCrumb.length-1">/</span>
          </router-link>
        </li>
      </ul>
      <div class="header-right">
        <img :src="BASEURL + adminUser.avatar" alt="">
        <span>{{adminUser.username}}</span>
        <button @click="logoutAction">退出</button>
      </div>
    </header>
    <main class="layout-main">
    </main>

  </div>
</template>


<style lang="scss" scoped>
.admin-layout {
  .layout-nav {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 200px;
    overflow-y: auto;
    overflow-x: hidden;
    background: #304156;
    font-size: 14px;

    &::-webkit-scrollbar {
      display: none;
    }

    ul {

      // padding-left: 20px;
      >li {
        >a {
          display: flex;
          align-items: center;
          height: 50px;
          color: #bfcbd9;
          text-decoration: none;
          border-bottom: 1px solid #000;
          padding-left: 20px;

          &:hover {
            background: #1f2d3d;
            color: #00aaee;
          }
        }

        >ul {
          >li {
            >a {
              padding-left: 40px;
            }

            >ul {
              >li {
                >a {
                  padding-left: 60px;
                }
              }
            }
          }
        }
      }
    }
  }

  .layout-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    margin-left: 200px;
    padding: 0 10px;
    border-bottom: 1px solid #ccc;
    font-size: 14px;

    .header-left {
      display: flex;

      li {
        margin-right: 5px;

        &:hover {
          a {
            color: #00aaee;
          }
        }
      }
    }

    .header-right {
      flex: 0 0 200px;
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      img {
        height: 40px;
        width: auto;
        border-radius: 50%;
        margin: 0 10px;
        border: 1px solid #ccc;
      }
    }
  }

  .layout-main {
    margin-left: 200px;
    padding: 20px;
  }
}
</style>