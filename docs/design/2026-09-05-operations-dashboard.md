# 运维工作台首页

## 背景

项目已有登录能力和 `/index` 空布局容器，但登录后的页面只有 Element Plus 的 Header、Aside、Main、Footer 占位内容，需要建立后台系统的首个可用工作台界面。

## 目标

- 建立稳定的顶栏、侧栏和主工作区布局。
- 首屏呈现集群健康、节点、工作负载和告警等核心运维信息。
- 支持侧栏折叠、菜单切换和退出登录。
- 在桌面与移动宽度下保持内容可读且不重叠。

## 非目标

- 本次不接入真实 K8s API。
- 本次不实现集群、工作负载等二级业务页面。
- 本次不引入图表库或重构全局状态管理。

## 方案

- `src/views/layout/layout.vue`：路由级应用外壳，只组合四个布局区域并处理必要的共享布局状态。
- `src/views/layout/components/Header.vue`：页头品牌、环境信息、通知和用户操作。
- `src/views/layout/components/Aside.vue`：用户侧边菜单、路由导航与折叠展示。
- `src/views/layout/components/Main.vue`：主内容区域容器，通过 `RouterView` 提供业务页面出口。
- `src/views/layout/components/Footer.vue`：页脚平台标识、版本和服务状态。
- `src/views/dashboard/Index.vue`：指标、资源进度、工作负载和事件概览等总览业务内容。

首页使用静态演示数据建立信息层级，为后续 API 接入保留清晰的组件边界。图标统一使用项目已安装的 Element Plus Icons。

## 数据或状态流

- `layout.vue` 持有侧栏折叠状态，并通过 props 将其传给 `Aside.vue`。
- 顶栏通过事件通知布局切换侧栏或执行退出；侧栏活动项直接从当前路由派生。
- 用户信息从现有 `localStorage.userInfo` 读取，不新增重复认证状态。
- 概览数据暂为组件内只读常量，后续可替换为 API 或 Pinia 数据。

## 接口与路由影响

- 继续使用现有 `/index` 地址，父路由加载 `layout.vue`，默认子路由由 `Main.vue` 内的 `RouterView` 加载 Dashboard 页面。
- 退出登录复用 `src/api/login.js` 中的 `logout()`。
- 无新增接口和 Mock。

## 异常处理

- 用户信息缺失或解析失败时显示默认用户名称。
- 退出接口失败时复用现有清理逻辑，并提示本地登录状态已清除。
- 移动端隐藏非关键环境文字，侧栏切换为紧凑图标导航。

## 验证方案

- 运行 `npm run test:run`。
- 运行 `npm run build`。
- 浏览器验证桌面和移动视口，无内容遮挡或横向溢出。
- 验证侧栏折叠、菜单选择和用户退出交互。

## 变更记录

- 2026-09-05：创建首页工作台初始设计。
- 2026-09-05：将首页专用组件统一归档到 `src/views/layout/components/`。
- 2026-09-05：布局组件按区域统一命名为 Header、Aside、Main 和 Footer。
- 2026-09-05：将四个区域组件的导入和编排迁移至 `layout.vue`，并将其设为 `/index` 的直接路由入口。
- 2026-09-05：将应用外壳迁移到 `src/layouts/`，总览内容迁移到 `src/views/dashboard/`，并采用 `RouterView` 嵌套路由架构。
- 2026-09-05：恢复并锁定五个布局文件，禁止删除、改名或移动。
- 2026-09-05：根据项目约定将五个文件确立为正式实现：四个组件各自维护固定区域，`layout.vue` 仅负责组合。
- 2026-09-05：按 Element Plus `el-container` 骨架重置四个区域组件内容，`Main.vue` 保留 `RouterView` 作为业务页面出口。
- 2026-09-05：移除 `/index` 默认 Dashboard 子路由，主内容区暂时保持空白，等待后续业务页面接入。
- 2026-09-05：为内层布局容器显式指定纵向方向，修正 Header、Main、Footer 横向排列问题。
