<template>
  <div id="app">

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
