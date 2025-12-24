# Coffee Market Data Visualization Project (coffee-g3last)

## 项目简介 (Project Introduction)

本项目是一个关于**中国咖啡市场**的数据可视化叙事网页（Scrollytelling）。通过交互式图表和流畅的滚动动效，深入分析了中国咖啡行业的市场规模、增长趋势、门店分布以及现制咖啡的崛起。

项目旨在通过数据讲述故事，探讨以下关键议题：
- 中国咖啡市场与新式茶饮市场的规模及增速对比。
- 现制咖啡在整体咖啡市场中的地位变化。
- 咖啡门店在各省份及城市层级的分布情况。
- 市场竞争格局（如价格战、情绪经济等）。

## 核心功能 (Key Features)

- **交互式数据图表**: 使用 **ECharts** 展示动态图表，支持用户交互。
- **滚动叙事 (Scrollytelling)**: 随着页面滚动，图表和文字内容通过动效流畅切换，引导用户阅读。
- **多维度数据分析**:
  - **市场概览**: 包含市场规模、增速对比。
  - **结构分析**: 现制咖啡占比分析。
  - **地理分布**: 省份及城市层级的门店分布热力图/饼图。
  - **深度专题**: 包含价格战时间轴、词云分析等。
- **视觉体验**: 结合高质量插画与数据图表，提供沉浸式的阅读体验。

## 技术架构与实现 (Technical Architecture & Implementation)

### 1. 核心技术栈 (Tech Stack)

*   **前端框架**: [React 19](https://react.dev/)
    *   利用 Hooks (`useState`, `useEffect`, `useRef`) 管理状态与生命周期。
    *   使用 Functional Components 构建模块化 UI。
*   **构建工具**: [Vite](https://vitejs.dev/)
    *   提供极速的冷启动和热更新 (HMR) 体验。
*   **数据可视化**:
    *   **ECharts 5**: 强大的底层图表库，支持复杂的交互和定制。
    *   **echarts-for-react**: React 组件封装，简化 ECharts 的声明式调用。
    *   **echarts-wordcloud**: 用于生成词云图表。
*   **样式与动画**:
    *   **CSS3**: Flexbox 布局，CSS Transitions。
    *   **Inline Styles**: 在组件层面通过内联样式实现动态布局调整。
    *   **requestAnimationFrame**: 用于高性能的自定义滚动动效。

### 2. 技术实现细节 (Implementation Details)

#### 2.1 滚动叙事 (Scrollytelling) 引擎
本项目采用了多种技术手段实现流畅的滚动叙事体验：

*   **Intersection Observer API**:
    *   在 `StickyWordCloudSection` 等组件中，使用 `IntersectionObserver` 监听文字段落与视口的交叉状态。
    *   通过设置 `rootMargin: '-45% 0px -45% 0px'`，精确检测当前阅读焦点的段落，从而触发右侧图表的即时切换与更新。
*   **Sticky Positioning**:
    *   利用 CSS `position: sticky` 将图表容器固定在视口特定位置，配合左侧滚动的文字流，实现经典的 "Sticky Scrollytelling" 布局。
*   **自定义高性能动效**:
    *   在 `App.jsx` 中，通过 `requestAnimationFrame` 实现了一个自定义的动画循环 (Animation Loop)。
    *   监听用户的滚轮事件 (`wheel`) 和触摸事件 (`touchmove`)，计算 `deltaY` 来驱动 `clip-path` 的半径变化，实现了从封面到内容的圆形揭示 (Circle Reveal) 转场效果。
    *   使用 `Lerp` (Linear Interpolation) 算法对动画数值进行平滑处理，确保视觉体验的丝滑流畅。

#### 2.2 数据可视化集成
*   **组件化封装**:
    *   将不同类型的图表封装为独立组件（如 `ChartSection`, `ProportionChartSection`），内部管理各自的 ECharts 配置项 (`option`)。
*   **动态数据渲染**:
    *   图表数据（如 `csvData`）与视图分离，通过预处理函数（如 `formatGrowthRate`）将原始数据转换为图表可用的格式。
    *   利用 React 的状态更新机制，当滚动到不同叙事节点时，自动触发图表的数据刷新或样式重绘。

#### 2.3 响应式与布局
*   采用 **Flexbox** 布局实现左右分栏（文字/图表）的自适应排列。
*   使用百分比宽度 (`width: '88%'`) 和 `calc()` 计算属性，确保在不同屏幕尺寸下内容的合理展示。
*   针对移动端和桌面端进行了适配逻辑处理，例如根据窗口大小动态更新最大遮罩半径 (`maxRadius`)。

## 项目文件框架 (Project Structure)

项目主要文件结构如下：

```
coffee-g3last/
├── public/                 # 静态资源文件
├── src/
│   ├── assets/             # 图片及多媒体素材
│   │   ├── part1 素材/     # 第一部分素材
│   │   ├── part2-1素材/    # 第二部分素材
│   │   ├── part4_assets/   # 第四部分素材
│   │   └── ...
│   ├── components/         # React 组件
│   │   ├── Hero.jsx        # 首页/头图组件
│   │   ├── PageTwo.jsx     # 第二页组件
│   │   ├── PageThree.jsx   # 第三页组件
│   │   ├── PageFour.jsx    # 第四页组件
│   │   ├── ChartSection.jsx          # 通用图表容器
│   │   ├── ProportionChartSection.jsx # 占比图表组件
│   │   ├── StoreCountChartSection.jsx # 门店数量图表组件
│   │   ├── ProvinceBarChartSection.jsx # 省份分布图表组件
│   │   └── ...
│   ├── data/               # 静态数据文件
│   │   └── priceWarData.js # 价格战相关数据
│   ├── App.jsx             # 主应用入口，包含滚动逻辑
│   ├── main.jsx            # 渲染入口
│   └── index.css           # 全局样式
├── package.json            # 项目依赖及脚本配置
├── vite.config.js          # Vite 配置文件
└── README.md               # 项目说明文档
```

## 安装与运行 (Installation & Usage)

确保你的本地环境已安装 [Node.js](https://nodejs.org/) (推荐 v16+)。

1.  **克隆项目或下载源码**
    ```bash
    git clone <repository-url>
    cd coffee-g3last
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **启动开发服务器**
    ```bash
    npm run dev
    ```
    启动后，在浏览器访问控制台输出的地址（通常是 `http://localhost:5173`）。

4.  **构建生产版本**
    ```bash
    npm run build
    ```

## 贡献 (Contribution)

欢迎提出改进建议或提交 Pull Request。

## 许可证 (License)

[MIT License](LICENSE)
