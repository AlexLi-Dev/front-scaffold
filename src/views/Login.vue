<script setup>
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

// 使用 reactive 定义响应式对象
const userinfo = reactive({
  username: '',
  password: ''
})

// 表单引用
const loginFormRef = ref(null)

// 校验规则
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, message: '用户名只能包含字母、数字、下划线或中文', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' },
    { pattern: /^\S*$/, message: '密码不能包含空格', trigger: 'blur' }
  ]
})

// 计算属性：判断表单是否可提交
const isFormValid = computed(() => {
  return userinfo.username.trim() && userinfo.password.trim()
})

// 登录方法
const handleLogin = async () => {
  if (!loginFormRef.value) return

  try {
    await loginFormRef.value.validate()
    ElMessage.success('登录成功')
    console.log('用户信息:', userinfo)
  } catch (error) {
    ElMessage.error('请完善表单信息')
  }
}

// 重置表单
const resetForm = () => {
  if (loginFormRef.value) {
    loginFormRef.value.resetFields()
  }
}
</script>

<template>
  <div class="login-container">
    <el-card class="box-card">
      <div class="login-header">
        <h2>后台管理系统</h2>
      </div>
      <br>

      <el-form
        ref="loginFormRef"
        :model="userinfo"
        :rules="rules"
        label-width="0"
      >
        <el-form-item prop="username">
          <el-input
            v-model="userinfo.username"
            placeholder="请输入用户名"
            prefix-icon="Avatar"
            clearable
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="userinfo.password"
            placeholder="请输入密码"
            prefix-icon="Lock"
            show-password
            clearable
          />
        </el-form-item>

        <el-form-item>
          <div style="display: flex; gap: 10px;">
            <el-button
              type="primary"
              style="flex: 1; border-radius: 20px;"
              :disabled="!isFormValid"
              @click="handleLogin"
            >
              登录
            </el-button>
            <el-button
              style="border-radius: 20px;"
              @click="resetForm"
            >
              重置
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f2f5;
}

.box-card {
  width: 400px;
  padding: 20px 30px 30px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.login-header h2 {
  font-size: 26px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: #667eea;
  text-align: center;
}

:deep(.el-input__wrapper) {
  border-radius: 4px;
}

:deep(.el-form-item) {
  margin-bottom: 18px;
}

:deep(.el-form-item:last-child) {
  margin-bottom: 0;
}

:deep(.el-button.is-disabled) {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>