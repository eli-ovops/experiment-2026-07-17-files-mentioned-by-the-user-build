# Mindloop 落地页

深色单色新闻通讯 / 内容平台落地页。当前交付级别为 **L0 本地 Mock Demo**：订阅表单仅做前端格式校验和成功反馈，不连接真实邮件服务、数据库或生产环境。

## 本地运行

```bash
npx pnpm@10.13.1 install --frozen-lockfile
npx pnpm@10.13.1 dev
```

构建与检查：

```bash
npx pnpm@10.13.1 lint
npx pnpm@10.13.1 build
```

## 技术栈

React 19、Vite 7、TypeScript、Tailwind CSS、shadcn/ui 结构、Framer Motion、hls.js、Lucide React，以及本地 Fontsource 字体。

## 已知边界

- MP4 与 HLS 视频来自需求附件指定的远程地址，离线环境会显示黑色背景但不影响内容可读性。
- `public/` 中的头像和平台图标是原创单色占位图，不代表真实订阅者或第三方官方商标。
- Privacy、Terms 尚无独立正式文案；正式上线前需由项目方提供并确认。
- 未部署到预览站或生产站，未连接真实订阅、邮件、分析或 CMS。
