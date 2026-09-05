import { beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import ElementPlus, { ElMessage } from 'element-plus'
import Login from '../src/views/Login.vue'
import { login } from '../src/api/login'

const mocks = vi.hoisted(() => ({
  push: vi.fn(),
}))

const createLocalStorage = () => {
  const values = new Map()

  return {
    clear: () => values.clear(),
    getItem: (key) => values.has(key) ? values.get(key) : null,
    removeItem: (key) => values.delete(key),
    setItem: (key, value) => values.set(key, String(value)),
  }
}

vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mocks.push }),
}))

vi.mock('../src/api/login', () => ({
  login: vi.fn(),
}))

const mountLogin = () => mount(Login, {
  global: {
    plugins: [ElementPlus],
  },
  attachTo: document.body,
})

const controls = (wrapper) => {
  const inputs = wrapper.findAll('input')
  const buttons = wrapper.findAll('button')

  return {
    username: inputs[0],
    password: inputs[1],
    submit: buttons.find((button) => button.text().includes('登录')),
    reset: buttons.find((button) => button.text().includes('重置')),
  }
}

const fillCredentials = async (wrapper, username = 'admin', password = '123456') => {
  const form = controls(wrapper)
  await form.username.setValue(username)
  await form.password.setValue(password)
  return controls(wrapper)
}

describe('登录页', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createLocalStorage())
    vi.spyOn(ElMessage, 'success').mockImplementation(() => {})
    vi.spyOn(ElMessage, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
    localStorage.clear()
    document.body.innerHTML = ''
  })

  it.each([
    ['', '', '空用户名和空密码'],
    ['admin', '', '只有用户名'],
    ['', '123456', '只有密码'],
    ['   ', '123456', '用户名只有空格'],
    ['admin', '   ', '密码只有空格'],
  ])('%s / %s：%s时禁用登录按钮', async (username, password) => {
    const wrapper = mountLogin()
    const form = await fillCredentials(wrapper, username, password)

    expect(form.submit.attributes('disabled')).toBeDefined()
    expect(login).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('两个字段均有非空字符时启用登录按钮', async () => {
    const wrapper = mountLogin()
    const form = await fillCredentials(wrapper)

    expect(form.submit.attributes('disabled')).toBeUndefined()
    wrapper.unmount()
  })

  it('登录成功后保存认证信息并跳转首页', async () => {
    login.mockResolvedValue({
      code: 0,
      message: '登录成功',
      data: {
        token: 'mock-token',
        userInfo: { username: 'admin', name: '管理员' },
      },
    })
    const wrapper = mountLogin()
    const form = await fillCredentials(wrapper)

    await form.submit.trigger('click')
    await flushPromises()

    expect(login).toHaveBeenCalledWith({ username: 'admin', password: '123456' })
    expect(localStorage.getItem('Authorization')).toBe('mock-token')
    expect(JSON.parse(localStorage.getItem('userInfo'))).toMatchObject({ username: 'admin' })
    expect(ElMessage.success).toHaveBeenCalledWith('登录成功')
    expect(mocks.push).toHaveBeenCalledWith('/index')
    wrapper.unmount()
  })

  it('业务失败时显示服务端消息且不保存认证信息', async () => {
    login.mockResolvedValue({ code: 400, message: '账号已停用', data: null })
    const wrapper = mountLogin()
    const form = await fillCredentials(wrapper)

    await form.submit.trigger('click')
    await flushPromises()

    expect(ElMessage.error).toHaveBeenCalledWith('账号已停用')
    expect(localStorage.getItem('Authorization')).toBeNull()
    expect(mocks.push).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('接口异常时显示响应中的错误消息', async () => {
    login.mockRejectedValue({ response: { data: { message: '用户名或密码错误' } } })
    const wrapper = mountLogin()
    const form = await fillCredentials(wrapper, 'admin', '654321')

    await form.submit.trigger('click')
    await flushPromises()

    expect(ElMessage.error).toHaveBeenCalledWith('用户名或密码错误')
    expect(mocks.push).not.toHaveBeenCalled()
    wrapper.unmount()
  })

  it('请求期间禁用按钮以避免重复提交', async () => {
    let resolveLogin
    login.mockReturnValue(new Promise((resolve) => {
      resolveLogin = resolve
    }))
    const wrapper = mountLogin()
    let form = await fillCredentials(wrapper)

    await form.submit.trigger('click')
    await flushPromises()
    form = controls(wrapper)

    expect(form.submit.attributes('disabled')).toBeDefined()
    expect(login).toHaveBeenCalledTimes(1)

    resolveLogin({ code: 0, data: {} })
    await flushPromises()
    wrapper.unmount()
  })

  it('重置按钮清空表单并重新禁用登录按钮', async () => {
    const wrapper = mountLogin()
    let form = await fillCredentials(wrapper)

    await form.reset.trigger('click')
    await flushPromises()
    form = controls(wrapper)

    expect(form.username.element.value).toBe('')
    expect(form.password.element.value).toBe('')
    expect(form.submit.attributes('disabled')).toBeDefined()
    wrapper.unmount()
  })
})
