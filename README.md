# 2025 中国咖啡市场分析 - 数据新闻可视化项目

本项目是一个基于 **React 19** 和 **ECharts 5** 的交互式数据新闻网页，旨在通过可视化的方式深度分析 2025 年中国咖啡市场的现状与趋势。项目采用 **“市场概览 -> 价格战 (消费降级) -> 情绪经济”** 的叙事逻辑，结合沉浸式滚动（Scrollytelling）和丰富的图表交互，探讨了中国咖啡行业在宏观经济增速放缓背景下的逆势增长、价格内卷现状以及品牌如何通过情绪价值寻求破局。

## 1. 核心特性 (Key Features)

### 1.1 沉浸式滚动叙事 (Scrollytelling)
项目摒弃了传统的点击跳转模式，采用单页滚动叙事。用户通过简单的滚轮操作，即可驱动页面的章节流转。
- **动态图表联动**: 随着用户的滚动，侧边的图表（折线图、柱状图、饼图等）会根据当前可视区域的文案自动切换，保持“文随图动”的阅读体验。
- **章节无缝过渡**: 实现了从首页封面到正文内容的平滑过渡，利用 CSS `transform` 和 `opacity` 属性配合 React 状态管理，消除页面割裂感。

### 1.2 高性能交互动画
为了保证在复杂交互下的 60fps 流畅体验，项目采用了混合动画策略：
- **requestAnimationFrame (rAF) 驱动**: 核心的转场动画（如 PageTwo 到 PageThree 的圆形揭示效果）完全由 `rAF` 循环驱动。
- **直接 DOM 操作**: 在高频动画循环中，绕过 React 的 Virtual DOM diff 机制，直接通过 `ref.current.style` 修改 DOM 属性（如 `clip-path`、`transform`），最大程度降低重渲染开销。
- **视差滚动 (Parallax)**: 首页背景图与前景元素采用不同的滚动速率，增强视觉深度。

### 1.3 多维数据可视化
集成 ECharts 5，实现了多样化的数据展示形式：
- **动态折线/柱状图**: 展示市场规模增长与门店扩张趋势，支持数据点的动态高亮与 Tooltip 交互。
- **地图可视化**: 使用 GeoJSON 数据渲染中国地图，直观展示咖啡门店的省份分布密度。
- **情感词云**: 利用 `echarts-wordcloud` 插件，将社交媒体（小红书）上的用户评论转化为动态词云，直观呈现品牌情绪价值。
- **自定义交互组件**: 开发了“联名卡片堆叠”组件，用户可手动拖拽查看不同品牌的联名活动详情。

## 2. 技术实现详解 (Technical Implementation)

### 2.1 技术栈
- **核心框架**: [React 19](https://react.dev/)
- **构建工具**: [Vite 7](https://vitejs.dev/)
- **图表库**: [ECharts 5](https://echarts.apache.org/) + [echarts-for-react](https://github.com/hustcc/echarts-for-react) + [echarts-wordcloud](https://github.com/ecomfe/echarts-wordcloud)
- **图标库**: [Lucide React](https://lucide.dev/)
- **样式**: CSS Modules (组件级样式隔离) + Inline Styles (动态动画)

### 2.2 关键算法与逻辑

#### 2.2.1 圆形遮罩揭示 (Circle Reveal Transition)
这是项目中连接“价格战”与“情绪经济”章节的核心转场效果。
- **原理**: 利用 CSS `clip-path: circle(r px at x y)` 属性。PageThree 初始状态下覆盖在 PageTwo 之上，但 `r=0`（不可见）。
- **交互**: 监听滚轮事件 `wheel`。当用户在 PageTwo 底部继续向下滚动时，计算鼠标位置或屏幕中心作为圆心 `(x, y)`。
- **物理模拟**: 使用线性插值 (Lerp) 算法 `current += (target - current) * 0.1` 平滑更新半径 `r`，实现具有阻尼感的动画效果，避免生硬的线性变化。

#### 2.2.2 滚动监听与图表切换
在 `PageTwo.jsx` 中，实现了一个简易的滚动监听器（Scroll Observer）：
- 监听正文容器的 `scroll` 事件。
- 实时计算每个段落（Section）相对于视口的位置。
- 当某个段落进入视口中心区域时，触发 React State 更新 (`activeChart`)，从而通知右侧图表区域渲染对应的 ECharts 组件。

## 3. 项目文件架构 (Project Structure)

```
/Users/zhiyu/Documents/coffee-g3last/
├── package.json                # 项目依赖配置 (React 19, Vite, ECharts)
├── vite.config.js              # Vite 构建配置
├── index.html                  # 应用入口 HTML
├── src/
│   ├── main.jsx                # React 渲染入口
│   ├── App.jsx                 # 主应用组件 (包含全局状态管理与核心转场逻辑)
│   ├── App.css                 # 全局样式
│   ├── assets/                 # 静态资源目录
│   │   ├── bg1.png, bg2.png... # 背景图片
│   │   ├── part1 素材/         # 第一章相关图片资源
│   │   ├── part2-1素材/        # 第二章相关图片资源
│   │   └── ...
│   ├── components/             # React 组件库
│   │   ├── Hero.jsx            # [组件] 首页/封面 (全屏背景 + 标题动画)
│   │   ├── PageTwo.jsx         # [组件] 第二章：市场概览与价格战 (Scrollytelling 容器)
│   │   ├── PageThree.jsx       # [组件] 第三章：情绪经济 (圆形揭示效果的目标页面)
│   │   ├── PageFour.jsx        # [组件] 结语页
│   │   ├── ChartSection.jsx    # [图表] 通用图表容器组件
│   │   ├── StoreCountChartSection.jsx # [图表] 门店数量增长趋势图
│   │   ├── ProvinceBarChartSection.jsx # [图表] 省份分布条形图
│   │   ├── CityPieChartSection.jsx    # [图表] 城市等级分布饼图
│   │   ├── ProportionChartSection.jsx # [图表] 现制咖啡占比图
│   │   ├── ComparisonChartSection.jsx # [图表] 市场规模对比图
│   │   ├── PriceWarTimeline.jsx       # [交互] 价格战时间轴组件
│   │   ├── CollabCardStack.jsx        # [交互] 联名活动卡片堆叠组件
│   │   ├── StickyWordCloudSection.jsx # [图表] 情绪词云组件
│   │   └── Slider.jsx                 # [交互] 图片滑动对比组件
│   └── data/
│       └── priceWarData.js     # 价格战相关静态数据
```

## 4. 快速开始 (Getting Started)

1.  **环境准备**: 确保本地已安装 Node.js (推荐 v18+)。
2.  **安装依赖**:
    ```bash
    npm install
    ```
3.  **启动开发环境**:
    ```bash
    npm run dev
    ```
    浏览器访问 `http://localhost:5173` 即可预览。
4.  **生产构建**:
    ```bash
    npm run build
    ```
    构建产物将输出至 `dist/` 目录。

## 5. 贡献者 (Contributors)
Coffee G3 Team
