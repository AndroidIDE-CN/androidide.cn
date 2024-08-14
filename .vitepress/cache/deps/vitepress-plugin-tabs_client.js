import {
  reactive,
  watch
} from "./chunk-E3OB6IAV.js";
import "./chunk-PZ5AY32C.js";

// node_modules/.pnpm/vitepress-plugin-tabs@0.5.0_vitepress@1.3.2_@algolia+client-search@4.24.0_@types+node@22.2.0__75foar5tdxghhr3xtlykrkoxui/node_modules/vitepress-plugin-tabs/src/client/index.ts
import PluginTabs from "C:/Users/31150/Sources/AIDE-WebSeite/node_modules/.pnpm/vitepress-plugin-tabs@0.5.0_vitepress@1.3.2_@algolia+client-search@4.24.0_@types+node@22.2.0__75foar5tdxghhr3xtlykrkoxui/node_modules/vitepress-plugin-tabs/src/client/PluginTabs.vue";
import PluginTabsTab from "C:/Users/31150/Sources/AIDE-WebSeite/node_modules/.pnpm/vitepress-plugin-tabs@0.5.0_vitepress@1.3.2_@algolia+client-search@4.24.0_@types+node@22.2.0__75foar5tdxghhr3xtlykrkoxui/node_modules/vitepress-plugin-tabs/src/client/PluginTabsTab.vue";

// node_modules/.pnpm/vitepress-plugin-tabs@0.5.0_vitepress@1.3.2_@algolia+client-search@4.24.0_@types+node@22.2.0__75foar5tdxghhr3xtlykrkoxui/node_modules/vitepress-plugin-tabs/src/client/useTabsSelectedState.ts
var injectionKey = "vitepress:tabSharedState";
var ls = typeof localStorage !== "undefined" ? localStorage : null;
var localStorageKey = "vitepress:tabsSharedState";
var setLocalStorageValue = (v) => {
  if (!ls) return;
  ls.setItem(localStorageKey, JSON.stringify(v));
};
var provideTabsSharedState = (app) => {
  const state = reactive({});
  watch(
    () => state.content,
    (newStateContent, oldStateContent) => {
      if (newStateContent && oldStateContent) {
        setLocalStorageValue(newStateContent);
      }
    },
    { deep: true }
  );
  app.provide(injectionKey, state);
};

// node_modules/.pnpm/vitepress-plugin-tabs@0.5.0_vitepress@1.3.2_@algolia+client-search@4.24.0_@types+node@22.2.0__75foar5tdxghhr3xtlykrkoxui/node_modules/vitepress-plugin-tabs/src/client/index.ts
var enhanceAppWithTabs = (app) => {
  provideTabsSharedState(app);
  app.component("PluginTabs", PluginTabs);
  app.component("PluginTabsTab", PluginTabsTab);
};
export {
  enhanceAppWithTabs
};
//# sourceMappingURL=vitepress-plugin-tabs_client.js.map
