import type {HeadConfig} from "vitepress";

export const head: HeadConfig[] = [
    ['link', {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
    }], ['link', {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: ''
    }], ['link', {
        href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap',
        rel: 'stylesheet'
    }], ['script',
        {},
        `var _hmt = _hmt || []; (function () {
            var hm = document.createElement("script");
            hm.src = "";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();`
    ], ['link', {
        rel: "stylesheet",
        href: "https://unpkg.com/mdui@2/mdui.css"
    }], ['script', {
        src: 'https://unpkg.com/mdui@2/mdui.global.js',
    }]
];