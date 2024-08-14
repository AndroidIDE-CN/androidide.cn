import type {DefaultTheme} from "vitepress";

export const themeConfig: DefaultTheme.Config = {
    i18nRouting: true,
    socialLinks: [
        { icon: 'github', link: 'https://github.com/ZeroAicy/AIDE-Plus' }
    ],
    footer: {
        copyright: 'Copyright ©2024 AIDE+ by <a href="https://github.com/ZeroAicy">ZeroAicy</href>'
    },
    search: {
        // 本地离线搜索
        provider: "local",
        // 多语言搜索配置
        options: {
            locales: {
                /* 默认语言 */
                zh: {
                    translations: {
                        button: {
                            buttonText: "搜索",
                            buttonAriaLabel: "搜索文档",
                        },
                        modal: {
                            noResultsText: "无法找到相关结果",
                            resetButtonTitle: "清除查询结果",
                            footer: {
                                selectText: "选择",
                                navigateText: "切换",
                            },
                        },
                    },
                },
                en: {
                    translations: {
                        button: {
                            buttonText: "Search",
                            buttonAriaLabel: "Search for Documents",
                        },
                        modal: {
                            noResultsText: "Unable to find relevant results",
                            resetButtonTitle: "Clear Query Results",
                            footer: {
                                selectText: "select",
                                navigateText: "switch",
                            },
                        },
                    },
                }
            },
        },
    },
};