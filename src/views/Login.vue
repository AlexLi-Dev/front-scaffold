<script setup>
</script>

<template>
 <div class="login-container">
  <el-card class="box-card">
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </el-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.item {
  padding: 18px 0;
}

.text {
  font-size:14px;
}

.box-card {
  width: 480px;
}
</style>