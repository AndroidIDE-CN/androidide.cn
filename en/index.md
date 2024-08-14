---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "AIDE Plus"
  tagline: "A modified version of AIDE. We currently support aapt2/d8/Java11 syntax. var/Project is too large to cause the analyzer to crash, etc., and restore some confusion. Please download and view more, or go to the change log to view"
  actions:
    - theme: brand
      text: Download method
      link: /use/download_link
      type: primary
    - theme: brand
      text: Send Problem
      link: /check_problem
    - theme: brand
      text: Donate
      link: /donate
    - theme: brand
      text: Change Log
      link: /changelog
      type: primary


features:
  - title: Aapt2
    icon: markdown
    # link: 
    details: 经过修改已经支持aapt2
  - title: Java高版本特性部分支持
    details: 经过修改已经支持D8，并且Java中的接口默认方法，Java11的var推导，更多请查看 更新日志 
  - title: Gradle
    details: 经过重写已经支持Gradle里面配置大部分
  - title: 完整的Gradle
    details: 只需要安装AIDE-Termux，然后安装恢复包，在AIDE+运行即可
---

