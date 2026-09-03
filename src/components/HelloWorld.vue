<!-- src/components/HelloWorld.vue -->
<template>
  <div class="hello">
    <h1>🚀 蓝鲸K8s运维平台</h1>
    <p>欢迎使用蓝鲸K8s运维平台</p>

    <div class="button-group">
      <template v-if="!isLoggedIn">
        <el-button type="primary" @click="goToLogin">
          登录
        </el-button>
      </template>

      <template v-else>
        <div class="user-info">
          <el-tag type="success" size="large" effect="plain">
            👋 {{ username }}
          </el-tag>
          <el-button type="danger" plain @click="handleLogout">
            退出登录
          </el-button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { logout } from '../api/login'  // ✅ 导入 logout

const router = useRouter()

// 状态
const token = ref('')
const userInfo = ref(null)

// 计算属性
const isLoggedIn = computed(() => !!token.value && !!userInfo.value)
const username = computed(() => {
  if (!userInfo.value) return ''
  return userInfo.value.username || userInfo.value.name || '用户'
})

// 检查登录状态
const checkLoginStatus = () => {
  token.value = localStorage.getItem('token') || ''

  const info = localStorage.getItem('userInfo')
  if (info) {
    try {
      userInfo.value = JSON.parse(info)
    } catch {
      userInfo.value = null
    }
  } else {
    userInfo.value = null
  }
}

// 跳转到登录页
const goToLogin = () => {
  router.push('/login')
}

// ✅ 退出登录 - 简化版，清理逻辑在 logout 中
const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确认退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })

    // ✅ 调用 logout，内部自动清理数据
    await logout()

    // ✅ 更新状态
    token.value = ''
    userInfo.value = null

    ElMessage.success('已退出登录')
    router.push('/login')
  } catch (error) {
    if (error !== 'cancel') {
      console.error('退出登录失败:', error)
      ElMessage.error('退出登录失败，请重试')
    }
  }
}

onMounted(() => {
  checkLoginStatus()
})
</script>

<style scoped>
.hello {
  text-align: center;
  padding: 40px 20px;
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: #3a84ff;
  font-size: 32px;
  margin-bottom: 16px;
}

p {
  color: #666;
  font-size: 16px;
  margin-bottom: 20px;
}

.button-group {
  margin-top: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

:deep(.el-tag) {
  font-size: 16px;
  padding: 10px 24px;
  border-radius: 20px;
}

:deep(.el-button) {
  border-radius: 20px;
  padding: 12px 28px;
  font-weight: 500;
}
</style>