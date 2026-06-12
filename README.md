# 情报屋

《无头骑士异闻录》的非官方中日双语小型百科网站。

## 技术栈

- React 19 + TypeScript
- Vite
- Ant Design
- React Router
- i18next / react-i18next
- AntV G6

## 页面路由

```text
/                    主页
/network             池袋关系网
/terms/characters    名词 / 角色
/terms/factions      名词 / 阵营
/works               作品
/about               关于
```

## 本地开发

```bash
npm install
npm run dev
```

构建和代码检查：

```bash
npm run build
npm run lint
```

## 数据与素材

- `assets/js/data.js`：人物、阵营、出场阶段与关系数据。
- `src/content.ts`：日文人物简介和中日双语作品资料。
- `src/i18n.ts`：中日文界面翻译。
- `assets/images/avatars/`：人物头像目录。
- `docs/data-sources.md`：资料范围与来源说明。

本站为非商业爱好者项目，原作及相关权利归成田良悟、KADOKAWA
及相关权利方所有。
