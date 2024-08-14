import { defineConfig } from 'vitepress'
import {docsConfig} from "./src/docs.mjs";
import {head} from "./src/head.mjs";
import {themeConfig} from "./src/theme.mjs";
import {zhConfig} from "./src/configs/zh.mjs";
import {tabsMarkdownPlugin} from "vitepress-plugin-tabs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...docsConfig,
  head,
  themeConfig,
  locales: {
    zh: { label: '简体中文', lang: 'zh-CN', link: '/', ...zhConfig },
    en: { label: 'English', lang: 'en-US', link: '/en/' },
  },
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    }
  }
})
