# Changelog

本文件记录项目的重要功能、行为和工程能力变化，格式参考 Keep a Changelog。

项目目前没有正式版本号或 Git Tag，因此已提交内容暂按日期归档；尚未提交的开发内容统一记录在 `[Unreleased]`。

## [Unreleased]

### Added

- 确立并保留 `views/layout` 下的 `layout.vue`、`Header.vue`、`Aside.vue`、`Main.vue`、`Footer.vue` 五个正式布局文件。
- 增加 K8s 运维工作台首页，包含响应式顶栏、可折叠导航、集群概览、资源利用率、工作负载和事件列表。
- 增加首页功能设计归档，记录组件边界、状态流和验证方案。
- 引入 Vitest、Vue Test Utils 和 happy-dom，增加 `npm test` 与 `npm run test:run` 测试命令。
- 增加登录页组件测试，覆盖按钮启用条件、登录成功、业务失败、接口异常、防止重复提交和表单重置。
- 建立本 Changelog，并增加 `docs/design/` 功能设计归档目录、文档模板和维护规则。

### Changed

- 为布局内层 `el-container` 显式设置 `direction="vertical"`，确保 Header、Main、Footer 按上下顺序排列。
- 移除 `/index` 默认加载的 Dashboard 业务页面，当前主内容区保持为空，仅保留布局容器和后续 `RouterView` 扩展出口。
- 将首页布局还原为 Element Plus 的 `el-container` 结构，由 `Header.vue`、`Aside.vue`、`Main.vue`、`Footer.vue` 分别提供区域内容，并由 `layout.vue` 统一组合。
- 重构首页工程边界：布局外壳由 `views/layout/layout.vue` 组合四个固定区域组件，总览业务页独立在 `views/dashboard/`，并通过 `Main.vue` 内的 `RouterView` 渲染。
- 侧栏导航改为路由驱动；尚未实现的业务入口保留为禁用状态，避免以切换标题伪装成独立页面。
- 明确 Header、Aside、Main、Footer 分别负责页头、侧边菜单、主内容出口和页脚，`layout.vue` 仅负责组合与共享布局状态。
- 登录成功和已登录访问登录页时统一进入 `/index`，并为该路由启用登录保护。
- 扩展 `AGENTS.md`，要求功能变更同步维护 `[Unreleased]`，并将功能设计归档到独立文件。
- 清理路由文件中重复的路由守卫注释。

## 2026-09-05

### Added

- 增加项目级 `AGENTS.md`，记录技术栈、目录职责、开发约定、认证规则和验证要求。
- 引入 Vue 开发辅助 Skills，覆盖 Vue 组件、响应式、路由、Pinia、测试和问题排查等实践。
- 增加 `skills-lock.json`，记录项目使用的本地 Skills。

### Changed

- 将 Token 的本地存储键统一为配置项 `CONFIG.TOKEN_NAME`，当前键名为 `Authorization`。
- 登录保存、路由守卫、首页状态读取、Axios 请求头注入、401 清理和退出清理统一使用相同的 Token 配置。
- 登录成功时清理旧的 `localStorage.token`，避免新旧 Token 键并存。
- 登录按钮仅在用户名和密码均包含非空字符时启用，请求期间保持禁用状态。

### Fixed

- 移除 `src/config/api.js` 中未使用的请求模块导入，消除配置模块与请求模块之间的循环依赖。

## 2026-09-04

### Added

- 为登录表单增加必填、长度、字符范围和空格校验，并加入加载状态与错误提示。
- 接入 `vite-plugin-mock` 和 Mock.js，在开发环境提供本地接口。
- 增加 `/api/auth/login`、`/api/auth/logout` 和 `/api/user/info` 认证 Mock 接口。
- 增加 `/api/user/list` 分页用户列表 Mock 接口。
- 封装 Axios 请求实例，支持统一超时、JSON 请求头、GET/DELETE 参数处理和响应数据解包。
- 增加请求拦截器，在存在 Token 时注入 Bearer Authorization Header。
- 增加响应拦截器，统一处理 HTTP 错误、请求超时、网络异常和 401 登录失效。
- 增加 `src/api/login.js`，集中提供登录、退出和获取用户信息接口。
- 增加 `src/config/api.js`，集中维护认证接口地址、Token Header 名和 Bearer 前缀。
- 首页增加登录状态、当前用户展示、退出确认和退出登录流程。

### Changed

- 登录页由前端占位交互升级为调用 Mock 接口的完整异步登录流程。
- 登录成功后保存 Token 与用户信息，并跳转到首页。
- README 增加 Vue Router、Pinia、Axios、Element Plus、表单派生状态和 Mock 数据的学习记录。

## 2026-09-03

### Added

- 初始化 Vue 3 + Vite 项目，建立应用入口、根组件、全局样式和静态资源。
- 接入 Vue Router，并建立首页与 `/login` 路由。
- 路由使用 Hash History，并增加基于本地 Token 的全局导航守卫框架。
- 接入 Pinia，增加示例 Store 和状态修改 Action。
- 接入 Axios，为后续 API 请求提供基础客户端。
- 接入 Element Plus 与图标库，并在应用入口完成全局注册。
- 增加后台管理系统登录页面，包含用户名、密码、登录和重置控件。
- 增加项目首页原型，并保留初始 Vite/Vue 示例组件作为参考文件。

### Changed

- 根组件调整为通过 `RouterView` 渲染路由页面。
- README 增加项目初始化、Vue Router、Pinia 和 Axios 的搭建说明。
