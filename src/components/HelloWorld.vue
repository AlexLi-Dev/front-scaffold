<!-- src/components/HelloWorld.vue -->
<template>
  <div class="hello">
    <h1>🚀 蓝鲸K8s运维平台</h1>
    <p>欢迎使用蓝鲸K8s运维平台</p>
    <el-button type="primary" @click="Login" style="margin-top: 20px;">
      登录
    </el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const Login = () => {
  router.push('/login')
}
</script>

<style scoped>
.hello {
  text-align: center;
  padding: 40px 20px;
}

h1 {
  color: #3a84ff;
  font-size: 32px;
  margin-bottom: 16px;
}

p {
  color: #666;
  font-size: 16px;
}
</style>