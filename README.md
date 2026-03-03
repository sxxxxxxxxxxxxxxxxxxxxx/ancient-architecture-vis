# 中国古代建筑 · 数据可视化 🏛️

本项目是一个基于 **React + Three.js + Tailwind CSS** 构建的“新中式极简水墨风” 3D 交互式数据可视化平台。旨在通过前沿的 WebGL 图形技术与现代化的网页排版，全景展示中国古代建筑的演变脉络、营造法式与结构之美。

## ✨ 核心特性 

*   **东方美学设计 (Neo-Chinese Aesthetics)**：全局采用“宣纸白 + 焦墨 + 朱砂红”配色系统。融入画轴边缘装裱、巨型错层水印排版与悬浮墨尘粒子特效，呈现“Awwwards 获奖级”的博物馆展陈视觉体验。
*   **3D 沉浸式交互 (3D Interactive Scene)**：内置 Three.js 渲染的古代建筑模型（支持高精度 PBR 材质、HDRI 环境光），用户可 360 度自由旋转拖拽，沉浸式观赏斗拱层叠与屋顶构造。
*   **多维数据可视化 (Data Visualization)**：
    *   **朝代时间轴**：梳理 4000+ 载建筑历史脉络。
    *   **斗拱结构解析**：通过雷达图与图表解构榫卯智慧。
    *   **地域分布热力图**：呈现现存古建的地理分布规律。
    *   **屋顶与材质演变**：洞察庑殿、歇山等建筑制式及其建造材料的流变。

## 🛠️ 技术栈

*   **前端框架**: React 18, Vite
*   **3D 渲染**: Three.js, `@react-three/fiber`, `@react-three/drei`
*   **动画库**: GSAP, Framer Motion
*   **样式方案**: Tailwind CSS, PostCSS, CSS 原生变量
*   **图表与图标**: Recharts, Lucide React

---

## 🚀 本地运行与部署指南

请确保您的计算机上已安装了 [Node.js](https://nodejs.org/) (建议版本 18+)。

### 1. 安装依赖

在项目根目录下，打开终端并运行以下命令：

```bash
npm install
# 或者使用 yarn / pnpm
# yarn install
# pnpm install
```

### 2. 本地开发服务器

依赖安装完成后，启动本地开发环境进行预览：

```bash
npm run dev
```
运行后，终端会输出一个本地访问地址（通常是 `http://localhost:5173`），在浏览器中打开即可查看。

### 3. 构建生产版本 (用于部署)

当准备将项目发布到生产服务器时，需要先打包压缩代码：

```bash
npm run build
```
执行完毕后，项目根目录会生成一个 `dist` 文件夹，里面包含了所有经过压缩优化的静态文件（HTML, CSS, JS, 图片等）。

### 4. 部署 (Deployment)

您可以将 `dist` 文件夹下的所有内容，直接部署到任何静态文件托管服务上。常见的免费静态托管服务包括：

*   **Vercel / Netlify**: 
    1. 在平台关联您的本 GitHub 仓库。
    2. 设置 `Build Command` 为 `npm run build`。
    3. 设置 `Output Directory` 或 `Publish directory` 为 `dist`。
*   **GitHub Pages**:
    可以使用 `gh-pages` 分支进行部署，或通过 GitHub Actions 自动构建部署。
*   **传统 Nginx/Apache 服务器**:
    只需将 `dist` 目录内的所有文件复制到服务器的 Web 根目录即可。

## 🤝 参与贡献

欢迎提交 Issue 和 Pull Request，一起来丰富中国古代建筑的数字宇宙！

---
*甲辰年制 · 榫卯之合*
