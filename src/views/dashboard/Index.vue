<script setup>
import { ElMessage } from 'element-plus'
import {
  BellFilled,
  Box,
  CircleCheck,
  Cpu,
  Grid,
  Operation,
  Refresh,
} from '@element-plus/icons-vue'

const metrics = [
  { label: '集群', value: '4', detail: '全部运行正常', icon: Grid, tone: 'blue' },
  { label: '节点', value: '12', detail: '12 在线 · 0 异常', icon: Cpu, tone: 'green' },
  { label: '工作负载', value: '86', detail: '83 正常 · 3 更新中', icon: Box, tone: 'cyan' },
  { label: '活跃告警', value: '3', detail: '1 条需要关注', icon: BellFilled, tone: 'amber' },
]

const workloads = [
  { name: 'gateway-api', namespace: 'production', status: '运行中', replicas: '6 / 6', age: '18 天' },
  { name: 'order-service', namespace: 'production', status: '运行中', replicas: '8 / 8', age: '12 天' },
  { name: 'metrics-server', namespace: 'kube-system', status: '更新中', replicas: '2 / 3', age: '43 天' },
  { name: 'message-worker', namespace: 'production', status: '运行中', replicas: '4 / 4', age: '7 天' },
]

const events = [
  { title: 'Deployment 扩容完成', detail: 'order-service · 6 → 8 副本', time: '4 分钟前', type: 'success' },
  { title: '节点内存使用率偏高', detail: 'worker-prod-03 · 82%', time: '18 分钟前', type: 'warning' },
  { title: '镜像版本更新', detail: 'gateway-api · v2.8.1', time: '1 小时前', type: 'info' },
]

const handleRefresh = () => {
  ElMessage.success('数据已刷新')
}

const showWorkloadsNotice = () => {
  ElMessage.info('工作负载页面正在建设中')
}
</script>

<template>
  <div class="dashboard-main">
    <div class="page-heading">
      <div>
        <p class="eyebrow">BLUEOPS / 集群总览</p>
        <h1>集群总览</h1>
        <p>生产环境资源与工作负载的实时运行状态</p>
      </div>
      <el-button :icon="Refresh" @click="handleRefresh">刷新数据</el-button>
    </div>

    <section class="metrics-grid" aria-label="核心指标">
      <article v-for="metric in metrics" :key="metric.label" class="metric-card">
        <div class="metric-icon" :class="metric.tone">
          <component :is="metric.icon" />
        </div>
        <div class="metric-copy">
          <span>{{ metric.label }}</span>
          <strong>{{ metric.value }}</strong>
          <small>{{ metric.detail }}</small>
        </div>
      </article>
    </section>

    <section class="dashboard-grid">
      <article class="panel resource-panel">
        <div class="panel-header">
          <div>
            <h2>资源利用率</h2>
            <p>生产集群最近采样</p>
          </div>
          <el-tag type="success" effect="plain" size="small">健康</el-tag>
        </div>
        <div class="resource-list">
          <div class="resource-item">
            <div class="resource-meta"><span>CPU</span><strong>58%</strong></div>
            <el-progress :percentage="58" :stroke-width="8" :show-text="false" color="#1769e0" />
            <small>74.2 / 128 Core</small>
          </div>
          <div class="resource-item">
            <div class="resource-meta"><span>内存</span><strong>72%</strong></div>
            <el-progress :percentage="72" :stroke-width="8" :show-text="false" color="#12a594" />
            <small>368 / 512 GiB</small>
          </div>
          <div class="resource-item">
            <div class="resource-meta"><span>存储</span><strong>46%</strong></div>
            <el-progress :percentage="46" :stroke-width="8" :show-text="false" color="#dd8b16" />
            <small>5.5 / 12 TiB</small>
          </div>
        </div>
      </article>

      <article class="panel health-panel">
        <div class="panel-header">
          <div>
            <h2>集群健康度</h2>
            <p>关键控制面组件</p>
          </div>
          <CircleCheck class="health-check" />
        </div>
        <div class="health-score">
          <strong>96</strong><span>/ 100</span>
        </div>
        <div class="health-items">
          <span><i></i>API Server 正常</span>
          <span><i></i>Scheduler 正常</span>
          <span><i></i>etcd 正常</span>
        </div>
      </article>
    </section>

    <section class="dashboard-grid lower-grid">
      <article class="panel workloads-panel">
        <div class="panel-header">
          <div>
            <h2>工作负载</h2>
            <p>近期活跃的 Deployment</p>
          </div>
          <el-button text type="primary" @click="showWorkloadsNotice">查看全部</el-button>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>名称</th><th>命名空间</th><th>状态</th><th>副本</th><th>运行时间</th></tr></thead>
            <tbody>
              <tr v-for="item in workloads" :key="item.name">
                <td><Box class="row-icon" />{{ item.name }}</td>
                <td>{{ item.namespace }}</td>
                <td><span class="workload-status" :class="{ updating: item.status === '更新中' }"><i></i>{{ item.status }}</span></td>
                <td>{{ item.replicas }}</td>
                <td>{{ item.age }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>

      <article class="panel events-panel">
        <div class="panel-header">
          <div><h2>最近事件</h2><p>集群操作与异常</p></div>
          <Operation class="panel-icon" />
        </div>
        <div class="event-list">
          <div v-for="event in events" :key="event.title" class="event-item">
            <span class="event-dot" :class="event.type"></span>
            <div><strong>{{ event.title }}</strong><span>{{ event.detail }}</span></div>
            <time>{{ event.time }}</time>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
.dashboard-main {
  flex: 1;
  min-width: 0;
  padding: 28px;
  overflow: auto;
  color: #1d2532;
  background: #f4f6f9;
  text-align: left;
}

.page-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 22px; }
.eyebrow { margin-bottom: 5px; font-size: 10px; font-weight: 700; color: #1769e0; }
.page-heading h1 { margin: 0; font-size: 25px; line-height: 1.25; color: #171d28; letter-spacing: 0; }
.page-heading p:not(.eyebrow) { margin-top: 5px; font-size: 12px; color: #778195; }

.metrics-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
.metric-card { min-height: 122px; padding: 18px; display: flex; align-items: flex-start; gap: 14px; background: #ffffff; border: 1px solid #e4e8ef; border-radius: 7px; }
.metric-icon { width: 38px; height: 38px; display: grid; flex: 0 0 38px; place-items: center; border-radius: 7px; }
.metric-icon :deep(svg) { width: 19px; height: 19px; }
.metric-icon.blue { color: #1769e0; background: #eaf2ff; }
.metric-icon.green { color: #248a46; background: #eaf7ee; }
.metric-icon.cyan { color: #087f73; background: #e5f6f4; }
.metric-icon.amber { color: #b56800; background: #fff3df; }
.metric-copy { display: flex; min-width: 0; flex-direction: column; }
.metric-copy span { font-size: 12px; color: #667085; }
.metric-copy strong { margin: 3px 0; font-size: 25px; line-height: 1.15; color: #151b26; }
.metric-copy small { overflow: hidden; font-size: 10px; color: #8a94a5; text-overflow: ellipsis; white-space: nowrap; }

.dashboard-grid { margin-top: 14px; display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(240px, .8fr); gap: 14px; }
.lower-grid { grid-template-columns: minmax(0, 1.7fr) minmax(280px, 1fr); }
.panel { padding: 18px; background: #ffffff; border: 1px solid #e4e8ef; border-radius: 7px; }
.panel-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
.panel-header h2 { margin: 0; font-size: 14px; line-height: 1.3; color: #202735; letter-spacing: 0; }
.panel-header p { margin-top: 3px; font-size: 10px; color: #8a94a5; }
.panel-icon { width: 18px; color: #7a8495; }

.resource-list { margin-top: 18px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.resource-meta { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 11px; color: #596477; }
.resource-meta strong { color: #252d3a; }
.resource-item small { display: block; margin-top: 6px; font-size: 9px; color: #8a94a5; }
.health-check { width: 24px; color: #24a148; }
.health-score { margin-top: 16px; display: flex; align-items: baseline; }
.health-score strong { font-size: 34px; line-height: 1; color: #1f8f47; }
.health-score span { margin-left: 3px; font-size: 11px; color: #8993a4; }
.health-items { margin-top: 14px; display: flex; flex-wrap: wrap; gap: 8px 14px; }
.health-items span { font-size: 9px; color: #687386; }
.health-items i { width: 5px; height: 5px; display: inline-block; margin-right: 5px; background: #2aa852; border-radius: 50%; }

.table-wrap { margin: 14px -18px -18px; overflow-x: auto; }
table { width: 100%; min-width: 590px; border-collapse: collapse; }
th { padding: 9px 14px; font-size: 9px; font-weight: 600; color: #7a8495; background: #f8f9fb; text-align: left; }
td { padding: 11px 14px; font-size: 10px; color: #596477; border-top: 1px solid #edf0f4; }
td:first-child { display: flex; align-items: center; gap: 7px; font-weight: 600; color: #273040; }
.row-icon { width: 14px; color: #1769e0; }
.workload-status { display: inline-flex; align-items: center; gap: 5px; color: #258746; }
.workload-status i { width: 6px; height: 6px; background: #2aa852; border-radius: 50%; }
.workload-status.updating { color: #b56800; }
.workload-status.updating i { background: #dc8b18; }

.event-list { margin-top: 10px; }
.event-item { padding: 10px 0; display: grid; grid-template-columns: 8px minmax(0, 1fr) auto; align-items: start; gap: 9px; border-bottom: 1px solid #edf0f4; }
.event-item:last-child { border-bottom: 0; }
.event-dot { width: 7px; height: 7px; margin-top: 4px; background: #1769e0; border-radius: 50%; }
.event-dot.success { background: #2aa852; }
.event-dot.warning { background: #dc8b18; }
.event-item div { display: flex; min-width: 0; flex-direction: column; }
.event-item strong { font-size: 10px; color: #303847; }
.event-item span:not(.event-dot) { margin-top: 2px; overflow: hidden; font-size: 9px; color: #8a94a5; text-overflow: ellipsis; white-space: nowrap; }
.event-item time { font-size: 8px; color: #98a1b1; white-space: nowrap; }

@media (max-width: 1050px) {
  .metrics-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .dashboard-grid,
  .lower-grid { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .dashboard-main { padding: 18px 12px; }
  .page-heading { align-items: flex-start; }
  .page-heading h1 { font-size: 21px; }
  .page-heading p:not(.eyebrow) { max-width: 210px; }
  .page-heading :deep(.el-button) { width: 34px; padding: 0; }
  .page-heading :deep(.el-button span) { display: none; }
  .metrics-grid { grid-template-columns: 1fr 1fr; gap: 9px; }
  .metric-card { min-height: 112px; padding: 13px; flex-direction: column; gap: 8px; }
  .metric-copy strong { font-size: 21px; }
  .resource-list { grid-template-columns: 1fr; gap: 14px; }
  .panel { padding: 14px; }
  .table-wrap { margin: 12px -14px -14px; }
}
</style>
