<template>
  <div id="app">
    <!-- <router-link to="/login" tag="button" replace>首页</router-link>
    <router-link to="/404" tag="button" replace>荒原</router-link> -->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {
    }
  }
</script>

<style>
  @import "assets/css/base.css";
  /* #app {
    position: relative;
  } */
</style>
