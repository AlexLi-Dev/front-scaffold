<script setup>
import Aside from './components/Aside.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <Aside />
      <el-container direction="vertical">
        <Header />
        <Main />
        <Footer />
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  min-height: 100vh;
}

.common-layout :deep(.el-container) {
  min-height: 100vh;
}
</style>
