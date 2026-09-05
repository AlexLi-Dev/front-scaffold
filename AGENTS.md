# AGENTS.md

## 项目概览

这是一个基于 Vue 3 的后台管理前端脚手架，目前处于基础设施和登录认证原型阶段。

- 构建工具：Vite 8
- UI 框架：Element Plus
- 路由：Vue Router 4，当前使用 Hash History
- 状态管理：Pinia 4
- HTTP 客户端：Axios
- 本地接口：`vite-plugin-mock` + Mock.js
- 源码语言：JavaScript，不要在没有明确需求时迁移到 TypeScript
- 模块格式：ES Modules（`package.json` 中设置了 `"type": "module"`）

## 常用命令

```bash
npm install
npm run dev
npm run build
npm run preview
```

- 本地开发默认由 Vite 提供服务。
- Mock 接口依赖 Vite 开发服务器；不要用直接打开 `index.html` 的方式验证登录。
- 项目当前没有配置测试、Lint 或格式化脚本，不要声称运行过不存在的检查。
- 完成代码修改后至少运行 `npm run build`，并报告构建警告和无法完成的验证。

## 目录职责

```text
front-scaffold/
├── mock/                 # 开发环境 Mock 接口
│   ├── auth.js           # 登录、退出、用户信息
│   └── user.js           # 用户列表
├── public/               # 原样复制的静态资源
├── src/
│   ├── api/              # Axios 实例及按业务划分的接口函数
│   │   ├── index.js      # 请求封装、请求/响应拦截器
│   │   └── login.js      # 认证登陆相关接口
│   ├── assets/           # 经 Vite 处理的图片和资源
│   ├── components/       # 可复用组件；当前首页组件也暂放在这里
│   ├── config/           # API 地址、Token Header 等配置
│   ├── router/           # 路由表和全局路由守卫
│   ├── store/            # Pinia store
│   ├── views/            # 路由级页面
│   ├── App.vue           # 根组件，只承载 RouterView 和全局基础样式
│   ├── main.js           # 应用启动、插件和全局图标注册
│   └── style.css         # 全局样式
├── vite.config.js        # Vue 与 Mock 插件配置
└── package.json
```

不要把 `dist/`、`node_modules/`、IDE 配置或 `*.bak` 文件当作功能源码。除非任务明确要求，不要修改或扩展备份文件。

## 当前功能边界

当前已实现：

- `/login` 登录页、Element Plus 表单校验和加载状态。
- `/api/auth/login` Mock 登录接口。
- 登录成功后将 Token 写入 `localStorage.Authorization`，并将用户信息写入 `localStorage.userInfo`。
- Axios 请求拦截器将 Token 写入 `Authorization: Bearer <token>`。
- 首页展示登录用户并支持退出。
- 401 响应清理本地认证数据并跳转登录页。

本地 Mock 登录账号为：

```text
username: admin
password: 123456
```

当前首页仍是原型页，Pinia store 仍是演示状态。不要假设后台布局、权限系统、K8s 业务页面或正式后端已经存在。

## Vue 开发约定

- 使用 Vue 3 Composition API 和 `<script setup>`，不要新增 Options API 组件。
- 保持单文件组件顺序为 `<script setup>`、`<template>`、`<style scoped>`。
- 延续当前 JavaScript 代码风格；只有用户明确要求时才引入 TypeScript。
- 路由级组件放在 `src/views/`，可复用 UI 放在 `src/components/`。
- 页面组件以组合和数据编排为主。功能出现多个独立区块或复杂副作用时，拆分子组件或提取到 `src/composables/`。
- 组件文件使用 PascalCase；组合式函数使用 `useXxx` 命名。
- Props 只读，默认采用 props 向下、事件向上的数据流；不要在子组件直接修改父级状态。
- 原始状态保持最少，派生状态使用纯 `computed`；`watch` 只用于副作用。
- 不要直接解构 `reactive()` 对象。需要解构时使用 `toRefs()`。
- Vue 3.5+ 的模板引用优先使用 `useTemplateRef()`；维护现有代码时可保持已有写法，避免无关重构。
- 列表渲染必须提供稳定的 `:key`，不要在同一个元素上同时使用 `v-for` 和 `v-if`。
- 不要用 `v-html` 渲染未经净化的外部或用户内容。
- 组件样式默认使用 `scoped`，全局重置、主题变量和基础排版放在 `src/style.css`。
- 优先使用 CSS 类，避免不断增加内联样式；仅在需要覆盖 Element Plus 内部节点时谨慎使用 `:deep()`。

## 状态管理约定

- 仅当状态跨页面或跨多个功能组件共享时使用 Pinia。
- 页面局部表单和瞬时 UI 状态保留在组件内。
- Store 中集中定义状态变更 action，避免多个组件各自维护同一份认证或用户状态。
- 扩展认证功能时，应逐步把 `localStorage` 读写集中到认证 store 或专用模块，不要继续在多个组件复制存取逻辑。

## 路由约定

- 路由配置统一维护在 `src/router/index.js`。
- 页面组件优先使用动态导入，避免继续增大首屏包。
- 需要登录的路由必须显式设置 `meta.requiresAuth: true`。
- 登录成功后若存在 `route.query.redirect`，应优先返回原目标地址；否则进入首页。
- 不要同时混用 Hash History 和 HTML5 History。当前部署方式没有服务端回退配置，因此保持 Hash History，除非任务明确要求迁移。

## API 与 Mock 约定

- 所有业务请求通过 `src/api/index.js` 的请求封装发出，不要在页面内直接创建新的 Axios 实例。
- API 地址集中维护在 `src/config/api.js` 或对应业务 API 模块中。
- 按业务域拆分 API 文件，例如认证使用 `src/api/login.js`。
- 页面负责交互反馈，API 层负责请求、协议适配和通用错误处理。
- 新增前端调用时，同步提供可用于本地开发的 Mock 接口，除非已有可访问的正式后端。
- Mock 响应保持统一结构：`{ code, message, data }`。
- 认证协议必须一致：Token 存储键和请求 Header 名都使用 `CONFIG.TOKEN_NAME`（当前为 `Authorization`）；新增受保护 Mock 接口时应校验该 Header，不要改用 Cookie 作为唯一认证来源。
- 不要在提交代码中保留 Token、密码、完整请求头或用户数据的调试日志。

## 登录交互约定

- 用户名和密码均包含非空字符后，登录按钮才可点击。
- 提交前始终调用 Element Plus 表单校验，不能仅依赖按钮禁用状态。
- 请求期间显示 loading 并阻止重复提交。
- 登录失败应显示明确的服务端消息或合理的兜底提示。
- 登录成功后先保存认证信息，再执行路由跳转。
- 退出接口失败时也需要清理本地认证数据，但页面提示应区分“本地已退出”和“服务端退出失败”。

## 修改与验证规则

- 修改前先阅读目标文件和调用链，不要根据文件名猜测行为。
- 保持修改范围贴合任务，不要顺手整理无关格式、备份文件或脚手架资源。
- 工作区可能包含用户未提交的修改；先运行 `git status --short`，保留并兼容这些修改。
- 不要使用 `git reset --hard`、`git checkout --` 或其他会丢失用户工作的命令。
- 涉及登录、路由或 Mock 的修改，应在浏览器中验证至少以下路径：
  - 空输入和单字段输入时按钮状态正确。
  - `admin / 123456` 登录成功并进入首页。
  - 错误凭据显示失败提示。
  - 刷新后登录状态符合预期。
  - 退出后返回登录页。
- 最终说明具体修改、验证结果、构建警告和仍存在的限制。

## 已知注意事项

- 当前路由守卫只保护带 `meta.requiresAuth` 的路由；新增业务页面时不要遗漏该元信息。
- `getUserInfo` 和用户列表 Mock 尚未接入页面，不要把存在 API 文件等同于功能已完成。
- Element Plus 当前为全量注册，生产构建可能出现大包警告；除非任务针对性能，不要在功能修改中顺带更换导入方案。
- README 同时承担学习记录用途，代码行为以当前源码为准。行为变化后，应在任务明确涉及文档或旧说明会误导使用者时同步更新 README。
