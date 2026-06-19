<div align="center" style="background:#ffffff;color:#171719;padding:36px 24px;border:1px solid #e7e7df;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <img src="./public/brand-helmet.svg" alt="DRRR情报屋猫耳头盔标志" width="96" />
  <h1 style="margin:18px 0 8px;font-size:42px;letter-spacing:0;color:#171719;">DRRR 情报屋</h1>
  <p style="margin:0 auto 18px;max-width:720px;color:#55565a;font-size:16px;line-height:1.8;">
    《无头骑士异闻录》非官方中日双语档案站。以池袋人物关系图为中心，整理角色、阵营、作品资料与官方资源入口。
  </p>
  <p>
    <img alt="React" src="https://img.shields.io/badge/React-19-171719?style=flat-square&labelColor=f4f500" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-171719?style=flat-square&labelColor=f4f500" />
    <img alt="Vite" src="https://img.shields.io/badge/Vite-7.3-171719?style=flat-square&labelColor=f4f500" />
    <img alt="License" src="https://img.shields.io/badge/非官方-爱好者项目-171719?style=flat-square&labelColor=f4f500" />
  </p>
</div>

<div style="height:6px;background:#f4f500;margin:0 0 26px;border-bottom:3px solid #171719;"></div>

## 项目介绍

DRRR 情报屋是一个面向《无头骑士异闻录》读者与观众的小型资料站。项目把分散在动画、小说、OVA、音乐、漫画与官方站点中的信息重新组织成可检索的档案，并用交互式关系图呈现池袋群像之间的连接。

## 功能模块

| 模块 | 入口 | 说明 |
| --- | --- | --- |
| 池袋关系网 | `/network` | 使用 AntV G6 绘制人物关系图，支持阵营筛选、关系筛选、节点聚焦和双人关系查询。 |
| 角色档案 | `/terms?view=characters` | 收录角色身份、别名、阵营归属、出场范围和直接关系。 |
| 阵营名录 | `/terms?view=factions` | 整理 DOLLARS、黄巾贼、蓝色平方、粟楠会等势力与关联人物。 |
| 作品资料 | `/works` | 覆盖 TV 动画、OVA、小说、漫画、音乐与游戏条目。 |
| 资料索引 | `/resources` | 集中整理官方图像、正版视频、广播、音乐与电子书入口。 |
| 关于页面 | `/about` | 说明项目范围、编辑原则、版权声明和联系信息。 |

## 视觉风格

<div style="background:#313235;border:1px solid #deded6;padding:18px;margin:16px 0;color:#fff">
  <strong style="display:inline-block;background:#f4f500;color:#171719;padding:4px 8px;margin-bottom:12px;font-style:italic">FILE 00 / STYLE</strong>
  <ul style="margin:0;padding-left:20px;line-height:1.8;color:#fff;">
    <li>站点主要为黄色为主题色，参考<a href="durarara.com">原作二期动画官网</a>设计的视觉效果。</li>
    <li>正文使用非衬线字体，并使用大量斜体作为区分，优先服务检索、对比和快速定位。</li>
  </ul>
</div>

## 技术栈

| 类型 | 选型 |
| --- | --- |
| 前端框架 | React 19 + TypeScript |
| 构建工具 | Vite |
| UI 组件 | Ant Design |
| 路由 | React Router |
| 国际化 | i18next / react-i18next |
| 关系图 | AntV G6 |
| 数据维护 | TypeScript 数据模块与拆分后的 JS 数据源 |

## 本地开发

项目当前包含 `yarn.lock`，建议使用 Yarn：

```bash
yarn install
yarn dev
```

构建和检查：

```bash
yarn build
yarn lint
```

如果使用 npm，也可以运行同名脚本：

```bash
npm install
npm run dev
```

## 项目结构

```text
src/
  components/          通用组件、搜索、角色抽屉、页面外壳
  pages/               首页、关系网、角色阵营、作品、资料、关于
  styles/              页面样式与专题样式
  data.ts              统一数据导出
  i18n.ts              中日文界面文案
  content.ts           人物简介与作品资料

assets/js/data/        可维护的数据源拆分
public/                图标、OG 图、manifest 等静态资源
docs/data-sources.md   资料范围与来源说明
```

## 数据与素材

资料以公开可访问的官方页面和作品信息为基础，当前重点覆盖本传小说第 1-13 卷与 TV 动画两期的主要人物、阵营和剧情阶段，并补充 OVA、音乐、漫画、游戏与官方图像入口。

人物关系和阵营归属会保留剧情中的重叠身份，因此一个角色可能同时连接帮派、家族、工作关系和都市传说线索。

## 版权说明

本站为非商业爱好者项目。《无头骑士异闻录》及相关角色、名称与作品版权归成田良悟、KADOKAWA 及相关权利方所有。项目中的资料整理仅用于学习、研究与同好交流。

<div align="center" style="margin-top:36px;padding-top:24px;border-top:1px solid #deded6;">
  <img src="./public/logo_black.png" alt="Anuluca" width="120" />
  <p style="margin:12px 0 0;color:#55565a;font-size:13px;">
    Designed and engineered by Anuluca. © 2026 Anuluca. All rights reserved.
  </p>
</div>
