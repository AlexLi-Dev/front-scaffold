# Vue Skill 使用说明

本项目的 Vue Skill 位于 `.agents/skills/`。在需求中直接点名 Skill，或描述对应类型的任务，系统会自动加载相关 Skill。

| Skill | 主要用途 | 适用场景 | 调用示例 | 文件路径 |
| --- | --- | --- | --- | --- |
| `vue-best-practices` | Vue 3、Composition API、`<script setup>`、组件拆分、响应式和 Composable | 新建或重构 Vue 组件、设计组件边界、优化数据流 | `按照 vue-best-practices 重构这个组件` | `.agents/skills/vue-best-practices/SKILL.md` |
| `vue-router-best-practices` | Vue Router 4、路由配置、嵌套路由、导航守卫和路由参数 | 增加页面路由、调整权限、处理路由跳转 | `使用 vue-router-best-practices 检查当前路由守卫` | `.agents/skills/vue-router-best-practices/SKILL.md` |
| `vue-pinia-best-practices` | Pinia Store、跨页面状态和响应式状态管理 | 用户认证、全局设置、跨页面共享数据 | `使用 vue-pinia-best-practices 设计认证 Store` | `.agents/skills/vue-pinia-best-practices/SKILL.md` |
| `vue-testing-best-practices` | Vitest、Vue Test Utils、组件测试和交互测试 | 为组件补测试、验证表单和用户交互 | `按照 vue-testing-best-practices 给 Login.vue 增加测试` | `.agents/skills/vue-testing-best-practices/SKILL.md` |
| `vue-debug-guides` | Vue 运行时错误、警告、响应式和异步问题排查 | 页面报错、组件不更新、登录或请求异常 | `使用 vue-debug-guides 排查这个运行时错误` | `.agents/skills/vue-debug-guides/SKILL.md` |
| `vue-jsx-best-practices` | Vue JSX / TSX 的属性、事件和渲染写法 | 使用 `.jsx`、`.tsx` 或 render 函数开发组件 | `使用 vue-jsx-best-practices 重写这个 JSX 组件` | `.agents/skills/vue-jsx-best-practices/SKILL.md` |
| `vue-options-api-best-practices` | Options API 的 `data()`、`methods`、`computed` 和 `this` | 维护旧版 Options API 组件 | `按照 vue-options-api-best-practices 修复这个 Options API 组件` | `.agents/skills/vue-options-api-best-practices/SKILL.md` |
| `create-adaptable-composable` | 创建支持普通值、`ref` 和 `computed` 输入的可复用 Composable | 封装跨组件、可响应式复用逻辑 | `使用 create-adaptable-composable 创建一个分页 Composable` | `.agents/skills/create-adaptable-composable/SKILL.md` |

## 推荐使用顺序

| 开发任务 | 推荐 Skill |
| --- | --- |
| Vue 组件开发或重构 | `vue-best-practices` |
| 页面布局和路由调整 | `vue-best-practices` + `vue-router-best-practices` |
| 跨页面状态管理 | `vue-pinia-best-practices` |
| 组件测试 | `vue-testing-best-practices` |
| 运行时错误排查 | `vue-debug-guides` |
| JSX / TSX 组件 | `vue-jsx-best-practices` |
| 复用逻辑封装 | `create-adaptable-composable` |
| 维护旧 Options API 代码 | `vue-options-api-best-practices` |

## 综合示例

```text
请使用 vue-best-practices 和 vue-router-best-practices，
把当前首页改造成布局路由，要求：
1. layout.vue 只负责组合布局组件
2. Main.vue 使用 RouterView
3. Dashboard 作为独立业务页面
4. 更新 AGENTS.md 和 CHANGELOG.md
5. 最后运行测试和构建
```

如果没有明确指定 Skill，也可以直接描述任务。系统会根据任务类型自动匹配相关 Skill。
