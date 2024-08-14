import {DefaultTheme} from "vitepress";
import {LocaleSpecificConfig} from "vitepress/types/shared";
import getNavs from "../navs/zh.mjs";
import getSidebar from "../sidebars/zh.mjs";

export const zhConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
    themeConfig:{
        nav: getNavs,
        sidebar: getSidebar
    }

}
