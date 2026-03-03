# BCharts

基于 [AntV G2](https://g2.antv.antgroup.com/) 和 [G2Plot](https://g2plot.antv.antgroup.com/) 的 React 图表库。

## 项目背景

本项目基于 [BizCharts](https://github.com/alibaba/BizCharts) v4.1.11 魔改，主要目的是支持 React 19。BizCharts 官方已停止维护，无法兼容新版 React，故在此 fork 基础上进行适配。

## 特性

- **React 19 支持**：适配最新版 React
- **TypeScript**：完整的类型定义
- **丰富的图表类型**：40+ 开箱即用的图表组件
- **双模式**：支持 G2 声明式语法与 G2Plot 配置式图表
- **灵活扩展**：通过 `createPlot` 快速创建自定义图表

## 安装

通过 Git Tag 安装（本项目未发布至 npm 仓库）：

```bash
npm install https://github.com/guanyun/bcharts.git#v1.0.x
```

### 依赖要求

- React 19.1.0
- React DOM 19.1.0

## 快速开始

### 使用 G2Plot 图表（推荐）

```tsx
import React from "react";
import { LineChart, BarChart, PieChart } from "bcharts";

function App() {
  const lineData = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
  ];

  return <LineChart data={lineData} xField="year" yField="value" smooth />;
}
```

### 使用 G2 声明式语法

```tsx
import React from "react";
import { Chart, View, Geom, Tooltip, Legend, Axis } from "bcharts";

function App() {
  const data = [
    { type: "A", value: 10 },
    { type: "B", value: 20 },
    { type: "C", value: 15 },
  ];

  return (
    <Chart data={data} height={400}>
      <Axis name="type" />
      <Axis name="value" />
      <Tooltip />
      <Legend />
      <Geom type="interval" position="type*value" color="type" />
    </Chart>
  );
}
```

## 支持的图表类型

| 分类   | 图表                                                                                                                                                                                |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 折线图 | LineChart, StepLineChart, TinyLineChart                                                                                                                                             |
| 柱状图 | BarChart, ColumnChart, GroupedBarChart, GroupedColumnChart, StackedBarChart, StackedColumnChart, PercentStackedBarChart, PercentStackedColumnChart, RangeBarChart, RangeColumnChart |
| 面积图 | AreaChart, StackedAreaChart, PercentStackedAreaChart                                                                                                                                |
| 饼图   | PieChart, DonutChart                                                                                                                                                                |
| 玫瑰图 | RoseChart, StackedRoseChart, GroupedRoseChart                                                                                                                                       |
| 散点图 | ScatterChart, BubbleChart                                                                                                                                                           |
| 热力图 | HeatmapChart, DensityHeatmapChart                                                                                                                                                   |
| 迷你图 | TinyLineChart, TinyAreaChart, TinyColumnChart                                                                                                                                       |
| 其他   | RadarChart, FunnelChart, GaugeChart, LiquidChart, WaterfallChart, WordCloudChart, CalendarChart, TreemapChart, BulletChart, HistogramChart, RingProgressChart, ProgressChart        |

## 核心 API

### 图表组件

- `Chart` - 图表容器
- `View` - 视图层
- `Tooltip` - 提示框
- `Legend` - 图例
- `Axis` - 坐标轴
- `Coordinate` / `Coord` - 坐标系
- `Facet` - 分面
- `Slider` - 缩略轴
- `Effects` - 动画效果
- `Interaction` - 交互

### 几何标记 (Geometry)

- `Interval` - 柱状图、条形图
- `Line` - 折线图
- `Area` - 面积图
- `Point` - 散点图
- `Polygon` - 多边形
- `Heatmap` - 热力图
- `Schema` - 自定义图形
- `Edge` - 边
- `Label` - 标签

### 工具函数

- `createPlot` - 创建自定义 G2Plot 图表
- `Util` - 工具方法集合
- `Annotation` - 图形标注
- `GComponents` - G2 图形组件
- `G2` - G2 底层 API

## 开发

```bash
# 安装依赖
npm install

# 构建（UMD + lib）
npm run build

# 仅构建 UMD
npm run build:umd

# 仅构建 lib（TypeScript 编译）
npm run build:lib

# 分析打包体积
npm run analyze
```

## 构建产物

- `lib/` - ESM/CommonJS 模块，供 `import` 使用
- `dist/bizcharts.umd.min.js` - UMD 格式，可通过 `bcharts/umd` 引入

## License

MIT
