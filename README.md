# 池袋关系网

基于 AntV G6 的《无头骑士异闻录》人物关系浏览工具。

## 项目结构

```text
.
├── archive.html
├── index.html
├── assets
│   ├── css
│   │   └── styles.css
│   ├── images
│   │   ├── avatar-placeholder.svg
│   │   └── avatars
│   │       └── README.md
│   └── js
│       ├── data.js
│       ├── app.js
│       └── archive.js
├── docs
│   └── data-sources.md
└── README.md
```

- `data.js`: 角色、阵营与关系数据。
- `app.js`: G6 图谱、筛选、搜索和人物详情交互。
- `archive.js`: 人物与阵营目录、搜索和详情弹窗。
- `styles.css`: 页面视觉与响应式布局。

头像接入方式见 `assets/images/avatars/README.md`。
出场范围的数据口径与来源见 `docs/data-sources.md`。
