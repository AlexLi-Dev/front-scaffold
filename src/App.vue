<script setup>
</script>

<template>
  <router-view></router-view>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  width: 100%;
  height: 100%;
  background: #ffffff; /* 设置白色背景 */
}

#app {
  display: flex;
  flex-direction: column;
}
</style>