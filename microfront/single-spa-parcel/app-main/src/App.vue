<template>
  <div id="app">
    <div id="nav">
      <router-link to="/app1">app1应用</router-link> | 
      <router-link to="/app2">app2应用</router-link> | 
      <router-link to="/app3">app3应用</router-link> | 
      <router-link to="/app4">app4应用</router-link> 
    </div>
    <router-view />
  </div>
</template>
<script>
// import * as singleSpa from 'single-spa';
export default {
  mounted() {
    window.event.on('test', (res)=>{
      console.log(`${res}`)
    })
  },
  updated()  {
    // const mountedAppNames = singleSpa.getMountedApps();
    // console.log(mountedAppNames);
    // console.log('getAppStatus')
    // const status = singleSpa.getAppStatus('app1');
    // console.log(status);
    // console.log('checkActivityFunctions')
    // const appsForACertainRoute = singleSpa.checkActivityFunctions({pathname: '/app1 '});
    // console.log(appsForACertainRoute); // ['app2']
    // const activeWhen = singleSpa.pathToActiveWhen('/settings');
    // activewhen(new URL('http://localhost/settings')); // true
    // activewhen(new URL('http://localhost/settings/password')); // true
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
