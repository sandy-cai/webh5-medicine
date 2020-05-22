<template>
  <div id="app-box">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title" img-set="/static/logo.png"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title" img-set="/static/logo.png"></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>

#app-box {
  font-family: -apple-system-font,Helvetica Neue,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
