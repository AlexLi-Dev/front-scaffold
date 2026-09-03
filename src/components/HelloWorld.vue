<!-- src/components/HelloWorld.vue -->
<template>
  <div class="hello">
    <h1>🚀 蓝鲸K8s运维平台</h1>
    <p>欢迎使用蓝鲸K8s运维平台</p>

    <!-- 根据登录状态显示不同按钮 -->
    <div class="button-group">
      <el-button
        v-if="!isLoggedIn"
        type="primary"
        @click="goToLogin"
        style="margin-top: 20px;"
      >
        登录
      </el-button>

      <div v-else class="user-info">
        <el-tag type="success" size="large">
          {{ username }} 已登录
        </el-tag>
        <el-button
          type="danger"
          @click="handleLogout"
          style="margin-top: 20px; margin-left: 10px;"
        >
          退出登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const isLoggedIn = ref(false)
const username = ref('')

// 检查登录状态
const checkLoginStatus = () => {
  const token = localStorage.getItem('token')
  const userInfo = localStorage.getItem('userInfo')

  if (token && userInfo) {
    isLoggedIn.value = true
    try {
      const info = JSON.parse(userInfo)
      username.value = info.username || info.name || '用户'
    } catch {
      username.value = '用户'
    }
  } else {
    isLoggedIn.value = false
    username.value = ''
  }
}

// 跳转到登录页
const goToLogin = () => {
  router.push('/login')
}

// 退出登录
const handleLogout = () => {
  ElMessageBox.confirm('确认退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 清除本地存储
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('username')

    // 更新状态
    isLoggedIn.value = false
    username.value = ''

    ElMessage.success('已退出登录')
    router.push('/login')
  }).catch(() => {
    ElMessage.info('已取消退出')
  })
}

// 组件挂载时检查登录状态
onMounted(() => {
  checkLoginStatus()
})
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

.button-group {
  margin-top: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

:deep(.el-tag) {
  font-size: 16px;
  padding: 10px 20px;
}
</style>